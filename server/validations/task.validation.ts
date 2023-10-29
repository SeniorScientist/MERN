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