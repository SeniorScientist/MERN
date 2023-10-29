import TaskService from "@services/task.service";
import { validateCreateTask } from "@validations/task.validation";
import { Request, Response } from "express";
import sanitize from "mongo-sanitize";
import LoggerService from "@services/logger.service";

export const postTask = async (req: Request, res: Response) => {
  // Validate Create task
  const { error } = validateCreateTask(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let sanitizedInput = sanitize<{ title: string; description: string; }>(req.body);

  try {
    let task = await TaskService.findTaskByTitle(sanitizedInput.title);

    if (task) {
      return res.status(400).send({ message: "Title already taken. Input anther title" });
    }

    const newTask = TaskService.createTask(sanitizedInput);

    try {
      await TaskService.saveTask(newTask);

      return res.status(200).send({ message: "Task were newly created." });
    } catch (error) {
      LoggerService.log.error(error);

      return res.status(500).send({ message: "Creation of new task, try again." });
    }
  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send("An unexpected error occurred");
  }
};

export const getAllTask = async (req: Request, res: Response) => {

};

export const updateTask = async (req: Request, res: Response) => {

};

export const deleteTask = async (req: Request, res: Response) => {

};


export default {
  postTask,
  getAllTask,
  updateTask,
  deleteTask
};
