import mongoose from "mongoose";
import Task from "../models/Task.js";
const {
  Types: {
    ObjectId: { isValid },
  },
} = mongoose;

export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find({});
    return res.status(200).json({ allTasks });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    if (!isValid(taskId)) return res.status(404).json({ error: `Invalid id ${taskId}` });

    const task = await Task.findById(req.params.id).exec();
    if (!task) return res.status(404).json({ error: `No task with id ${taskId}` });

    return res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      name: req.body.name,
      isCompleted: req.body.isCompleted,
    });

    return res.status(201).json({ newTask });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const { name, isCompleted } = req.body;
    if (!isValid(taskId)) return res.status(404).json({ error: `Invalid id ${taskId}` });

    const task = await Task.findByIdAndUpdate(
      taskId,
      { name: name, isCompleted: isCompleted },
      {
        new: true, //returns already updated task
        runValidators: true,
      }
    );
    if (!task) return res.status(404).json({ error: `No task with id ${taskId}` });

    return res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    if (!isValid(taskId)) return res.status(404).json({ error: `Invalid id ${taskId}` });

    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ error: `No task with id ${taskId}` });

    return res.status(200).json({ task });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
