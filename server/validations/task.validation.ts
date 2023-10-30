import { TaskDocument } from "@models/task.model";
import Joi from "joi";

export function validateCreateTask(
  input: Pick<TaskDocument, "title" | "description">
) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
    descrption: Joi.string().max(255),
  });

  return schema.validate(input);
}

export function validateUpdateTask(
  input: Pick<TaskDocument, "id" | "title" | "description">
) {
  const schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string().min(2).max(50).required(),
    descrption: Joi.string().max(255),
  });

  return schema.validate(input);
}

export function validateDeleteTask(
  input: Pick<TaskDocument, "title">
) {
  const schema = Joi.object({
    title: Joi.string().required()
  });

  return schema.validate(input);
}