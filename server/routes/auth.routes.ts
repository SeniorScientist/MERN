import express from "express";

import AuthControllers from "@controllers/auth.controller";
import authHandler from "@middlewares/authHandler";

const router = express.Router();

//  Input : username/password via body
//  HTTP Success : 200, message and user infos.
//  HTTP Errors : 400, 401.
router.post("/login", AuthControllers.postLogin);

//  Input : void, identified by session cookie.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 500, 503.
router.post("/logout", authHandler, AuthControllers.postLogout);

export default router;
