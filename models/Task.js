import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
  },
});

const TaskModel = new model("Task", TaskSchema);
export default TaskModel;
