import { Router } from "express";
import TaskController from "@controllers/task.controller";

const router = Router();

router.get("/", TaskController.getAllTask);

//  Input : title, description via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400,500.
router.post("/create", TaskController.postTask);

//  Input : _id via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400,500.
router.put("/update/:id", TaskController.updateTask);

//  Input : title, description via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400,500.
router.delete("/delete", TaskController.deleteTask);


export default router;
