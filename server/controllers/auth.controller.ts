import { Request, Response, NextFunction } from "express";
import sanitize from "mongo-sanitize";
import passport from "passport";
import { validateEmail, validateLoginInput } from "@validations/user.validation";

import { UserDocument } from "@models/user.model";
import UserService from "@services/user.service";
import TokenService from "@services/token.service";
import LoggerService from "@services/logger.service";

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateLoginInput(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  let sanitizedInput = sanitize<{ username: string; password: string }>(req.body);

  sanitizedInput.username = req.body.username.toLowerCase();

  passport.authenticate("local", (err: Error, user: UserDocument, info: any) => {
    if (err) {
      return next(err);
    }
    if (info && info.message === "Missing credentials") {
      return res.status(400).send({ message: "Missing credentials" });
    }
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password." });
    }
    if (!user.isVerified)
      return res.status(401).send({
        message: "Your account has not been verified. Please activate your account.",
      });

    req.login(user, (err: Error) => {
      if (err) {
        res.status(401).send({ message: "Authentication failed", err });
      }
      res.status(200).send({ message: "Login success", user: UserService.getUser(user) });
    });
  })(req, res, next);
};

export const postLogout = (req: Request, res: Response) => {
  req.session.destroy((err: Error) => {
    if (err) {
      res.status(500).send({ message: "Logout failed", err });
    }
    req.sessionID = "";
    req.logout();
    res.status(200).send({ message: "Logout success" });
  });
};

export const postVerify = async (req: Request, res: Response) => {
  const { error } = validateEmail(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const sanitizedInput = sanitize<{ email: string }>(req.body);

  try {
    const user = await UserService.findUserBy("email", sanitizedInput.email);
    if (!user) {
      return res.status(404).send({ message: "No user found with this email address." });
    }
    if (user.isVerified) {
      return res.status(400).send({
        message: "This account has already been verified. Please log in.",
      });
    }

    const verificationToken = TokenService.createToken();
    TokenService.setUserId(verificationToken, user.id);

    await TokenService.saveToken(verificationToken);
    try {
      const email = EmailService.createVerificationEmail(user.email, verificationToken.token);
      await EmailService.sendEmail(email);

      return res.status(200).send({ message: `A verification email has been sent.` });
    } catch (error) {
      LoggerService.log.error(error);

      return res.status(503).send({
        message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`,
      });
    }
  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send("An unexpected error occurred");
  }
};

export const getConfirmation = async (req: Request, res: Response) => {
  try {
    const token = await TokenService.findTokenBy("token", req.params.token);

    if (!token) {
      return res.status(404).send({
        message: "We were unable to find a valid token. Your token may have expired.",
      });
    }

    const user = await UserService.findUserById(token._userId);

    if (!user) {
      return res.status(404).send({ message: `We were unable to find a user for this token.` });
    }

    await UserService.saveUser(user);

    return res.status(200).send({ message: "The account has been verified. Please log in." });
  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send("An unexpected error occurred");
  }
};

export default {
  postLogin,
  postLogout,
  postVerify,
  getConfirmation
};
