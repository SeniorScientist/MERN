import { Task, TaskDocument } from "@models/task.model";

export const createTask = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => new Task({ title, description });

export const findTaskByTitle = async (title: string) => await Task.findOne({ title: title});

export const saveTask = async (task: TaskDocument) => await task.save();

export const deleteTaskById = async (task: TaskDocument) => await Task.findByIdAndDelete(task._id);

export default {
  createTask,
  findTaskByTitle,
  saveTask,
  deleteTaskById
};
