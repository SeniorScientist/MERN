import * as yup from "yup";

export const registerSchema = {
  username: yup.string().min(3).max(50).required(),
  email: yup.string().email().min(5).max(255).required(),
  password: yup.string().min(5).max(255).required(),
};