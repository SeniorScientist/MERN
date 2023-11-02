import { Router } from "express";
import UserController from "@controllers/user.controller";
import authHandler from "@middlewares/authHandler";

const router = Router();

router.get("/", authHandler, UserController.getUser);

//  Input : username, email, password via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400,500.
router.post("/register", UserController.postUser);


export default router;
