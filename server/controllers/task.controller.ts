import TaskService from "@services/task.service";
import { validateCreateTask, validateUpdateTask, validateDeleteTask } from "@validations/task.validation";
import { Request, Response } from "express";
import sanitize from "mongo-sanitize";
import LoggerService from "@services/logger.service";
import { Schema } from "mongoose";

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

    await TaskService.saveTask(newTask);

    return res.status(200).send({ message: "Task were newly created." });
  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send("An unexpected error occurred");
  }
};

export const getAllTask = async (req: Request, res: Response) => {
  try {

    let tasks = await TaskService.findTaskAll();

    return res.status(200).send({
      message: "Task retrieving was success.",
      list: tasks
    });
  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send("An unexpected error occurred");
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { error } = validateUpdateTask(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let sanitizedInput = sanitize<{ id: typeof Schema.Types.ObjectId; title: string, description: string }>(req.body);

  try {
    let task = await TaskService.findTaskByTitle(sanitizedInput.title);

    if (task) {
      return res.status(400).send({ message: "Task title would be dupplicated. Take another title" });
    }

    task = await TaskService.findTaskById(sanitizedInput.id);

    if (!task) {
      return res.status(400).send({ message: "Task is not existing. Try another task." });
    }

    await TaskService.updateTask(task, sanitizedInput.title, sanitizedInput.description);

    return res.status(200).send({ message: "Task was updated successfully." });

  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send("An unexpected error occurred");
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { error } = validateDeleteTask(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let sanitizedInput = sanitize<{ title: string }>(req.body);

  try {

    let task = await TaskService.findTaskByTitle(sanitizedInput.title);

    if (!task) {
      return res.status(400).send({ message: "Task not existing. Take another title" });
    }

    await TaskService.deleteTaskById(task);

    return res.status(200).send({ message: "Task was deleted successfully." });
  } catch (error) {
    LoggerService.log.error(error);

    return res.status(500).send("An unexpected error occurred");
  }
};


export default {
  postTask,
  getAllTask,
  updateTask,
  deleteTask
};
