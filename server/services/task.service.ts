import SearchDocument from "@models/search.model";
import { Task, TaskDocument } from "@models/task.model";

export const createTask = ({
  title,
  description
}: {
  title: string;
  description: string;
}) => new Task({ title, description });

export const findTaskAll = async (params: SearchDocument) => {
  let query: SearchDocument = { ...params }

  if (!query.sortBy || query.sortBy === "id") {
    query.sortBy = "_id";
  }

  query.page = query.page || 1;
  query.pageSize = query.pageSize || 10;
  query.order = query.order || "asc";

  return {
    tasks: await Task.find({ is_deleted: false })
      .limit(query.pageSize)
      .skip((query.page - 1) * query.pageSize)
      .sort({ [query.sortBy]: query.order === "asc" ? 1 : -1 }),
    count: await Task.count({ is_deleted: false })
  }
}

export const findTaskByTitle = async (title: string) => await Task.findOne({ title: title });

export const findTaskById = async (id: string) => await Task.findById(id);

export const saveTask = async (task: TaskDocument) => await task.save();

export const updateTask = async (task: TaskDocument, title: string, description: string) => {
  task.title = title;
  task.description = description;

  await task.save();
}

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
  deleteMultiTask
};
