import { Task, TaskDocument } from "@models/task.model";
import { Schema } from "mongoose";

export const createTask = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => new Task({ title, description });

export const findTaskAll = async () => await Task.find({});

export const findTaskByTitle = async (title: string) => await Task.findOne({ title: title});

export const findTaskById = async (id: typeof Schema.Types.ObjectId) => await Task.findById(id);

export const saveTask = async (task: TaskDocument) => await task.save();

export const updateTask = async (task: TaskDocument, title: string, description: string) => {
  task.title = title;
  task.description = description;

  await task.save();
}

export const deleteTaskById = async (task: TaskDocument) => await Task.findByIdAndDelete(task._id);

export default {
  createTask,
  updateTask,
  findTaskAll,
  findTaskByTitle,
  findTaskById,
  saveTask,
  deleteTaskById
};
