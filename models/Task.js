import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const TaskModel = new model("Task", TaskSchema);
export default TaskModel;
