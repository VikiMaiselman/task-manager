import Task from "../models/Task.js";

export const getAllTasks = (req, res) => {
  res.send("all items");
};

export const getTask = (req, res) => {};

export const createTask = (req, res) => {
  try {
    Task.create({
      name: req.body.name,
      isCompleted: false,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = (req, res) => {};

export const deleteTask = (req, res) => {};
