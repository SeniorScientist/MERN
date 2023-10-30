import * as yup from "yup";

export const loginSchema = {
  username: yup.string().min(4).max(16).required(),
  password: yup.string().min(8).max(64).required(),
};