import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  console.log('user authenticate', req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.locals.login = req.isAuthenticated();
    res.locals.user = req.user || false;
    return next();
  } else {
    res.status(400).send({ message: "Missing credentials" });
  }
}