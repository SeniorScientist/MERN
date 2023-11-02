import SearchDocument from "@models/search.model";
import { TaskDocument } from "@models/task.model";
import Joi from "joi";

export function validateCreateTask(
  input: Pick<TaskDocument, "title" | "description">
) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(255),
  });

  return schema.validate(input);
}

export function validateGetTask(
  input: Pick<SearchDocument, "page" | "sortBy" | "order">
  ) {
    const schema = Joi.object({
      page: Joi.number().min(1),
      sortBy: Joi.string().min(1),
      order: Joi.string().min(3)
    });

    return schema.validate(input);
}

export function validateUpdateTask(
  input: Pick<TaskDocument, "title" | "description">
) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().max(255),
  });

  return schema.validate(input);
}

export function validateDeleteMultiTask(
  input: any
) {
  const schema = Joi.object({
    ids: Joi.array().required()
  });

  return schema.validate(input);
}