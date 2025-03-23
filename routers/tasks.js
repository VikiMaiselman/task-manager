import express from "express";
import { getAllTasks, getTask, createTask, updateTask, deleteTask } from "../controllers/tasks";
export const router = express.Router();

router.get("/", getAllTasks);

router.post("/", createTask);

router.get("/:id", getTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
