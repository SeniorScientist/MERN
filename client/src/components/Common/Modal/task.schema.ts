import * as yup from "yup";

export const taskSchema = {
  title: yup.string().min(2).max(50).required(),
  descrption: yup.string().max(255),
};