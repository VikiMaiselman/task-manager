import express from "express";
import { config } from "dotenv";
import { router } from "./routers/tasks.js";
import { connectToDb } from "./db/connect.js";

const PORT = 3000;
const app = express();
config();

// middlewares
app.use(express.json());

app.use("/api/tasks", router);

const startApp = async () => {
  try {
    await connectToDb(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`The server is up and listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
startApp();
