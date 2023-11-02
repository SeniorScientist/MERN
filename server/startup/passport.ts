import passport from "passport";
import { User } from "@models/user.model";
import Local from "passport-local";

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

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user)
    } catch (error) {
      done(error, null);
    }
  });
}
