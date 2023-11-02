import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { validateLoginInput } from "@validations/user.validation";

import { UserDocument } from "@models/user.model";
import UserService from "@services/user.service";

export const postLogin = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateLoginInput(req.body);

  if (error) return res.status(400).send({ message: error.details[0].message });

  passport.authenticate("local", (err: Error, user: UserDocument, info: any) => {
    if (err) {
      return next(err);
    }
    if (info && info.message === "Missing credentials") {
      return res.status(400).send({ message: "Missing credentials" });
    }
    if (!user) {
      return res.status(400).send({ message: "Invalid username or password." });
    }

    req.login(user, (err: Error) => {
      if (err) {
        res.status(401).send({ message: "Authentication failed", err });
      }
      res.status(200).send({ message: "Login success", user: UserService.getUser(user) });
    });
  })(req, res, next);
};

export const postLogout = (req: Request, res: Response) => {
  req.logout((err: Error) => {
    if (err) {
      res.status(400).send({ message: 'Logout failed', err });
    }

    req.session.destroy((err: Error) => {
      if (err) {
        res.status(400).send({ message: "Logout failed", err });
      }
      res.clearCookie('connect.sid');
      req.sessionID = "";
      res.status(200).send({ message: "Logout success" });
    });
  });
};


export default {
  postLogin,
  postLogout
};
