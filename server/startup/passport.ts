import passport from "passport";
import { UserDocument, User } from "@models/user.model";
import Local from "passport-local";
import { Error } from "mongoose";

export function initPassportJS() {
  passport.use(
    new Local.Strategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(undefined, false, { message: `Username ${username} not found` });
        }
        if (!user.comparePassword(password)) {
          return done(undefined, false, { message: "Incorrect username or password" });
        }
        return done(undefined, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => done(undefined, user));

  passport.deserializeUser((id, done) =>
    User.findById(id, (err: Error, user: UserDocument) => done(err, user))
  );
}
