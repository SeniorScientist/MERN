import { Task, TaskDocument } from "@models/task.model";

export const createTask = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => new Task({ title, description });

export const findTaskAll = async () => await Task.find({ is_deleted: false });

export const findTaskByTitle = async (title: string) => await Task.findOne({ title: title });

export const findTaskById = async (id: string) => await Task.findById(id);

export const saveTask = async (task: TaskDocument) => await task.save();

export const updateTask = async (task: TaskDocument, title: string, description: string) => {
  task.title = title;
  task.description = description;

  await task.save();
}

export const deleteTaskById = async (task: TaskDocument) => await Task.updateOne({ '_id': task._id }, { $set: { is_deleted: true } });

export const deleteMultiTask = async (tasks: string[]) => {
  await Task.updateMany({ '_id': { '$in': tasks } }, { $set: { is_deleted: true } });
}

export default {
  createTask,
  updateTask,
  findTaskAll,
  findTaskByTitle,
  findTaskById,
  saveTask,
  deleteTaskById,
  deleteMultiTask
};
