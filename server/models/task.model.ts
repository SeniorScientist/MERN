import { model, Schema, Document } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  description: string;
  is_deleted: boolean;
}

const taskSchema = new Schema<TaskDocument>({
  title: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 255,
    unique: true,
  },
  is_deleted: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
});

export const Task = model<TaskDocument>("Task", taskSchema);

export default Task;
