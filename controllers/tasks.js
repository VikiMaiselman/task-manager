import mongoose from "mongoose";

import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import Task from "../models/Task.js";
import { createCustomError } from "../errors/customError.js";
const {
  Types: {
    ObjectId: { isValid },
  },
} = mongoose;

export const getAllTasks = asyncWrapper(async (req, res) => {
  const allTasks = await Task.find({});
  return res.status(200).json({ allTasks });
});

export const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  if (!isValid(taskId)) return next(createCustomError(`Invalid id ${taskId}`, 404));

  const task = await Task.findById(req.params.id).exec();
  if (!task) return next(createCustomError(`No task with id ${taskId}`, 404));

  return res.status(200).json({ task });
});

export const createTask = asyncWrapper(async (req, res) => {
  const newTask = await Task.create({
    name: req.body.name,
    isCompleted: req.body.isCompleted,
  });
  return res.status(201).json({ newTask });
});

export const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const { name, isCompleted } = req.body;
  // if (!isValid(taskId)) next(createCustomError(`Invalid id ${taskId}`, 404));
  if (!isValid(taskId)) throw new Error(`Invalid id ${taskId}`, 404);

  const task = await Task.findByIdAndUpdate(
    taskId,
    { name: name, isCompleted: isCompleted },
    {
      new: true, //returns already updated task
      runValidators: true,
    }
  ).exec();
  if (!task) return next(createCustomError(`No task with id ${taskId}`, 404));

  return res.status(200).json({ task });
});

export const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  if (!isValid(taskId)) next(createCustomError(`Invalid id ${taskId}`, 404));

  const task = await Task.findByIdAndDelete(taskId).exec();
  if (!task) next(createCustomError(`No task with id ${taskId}`, 404));

  return res.status(200).json({ task });
});
