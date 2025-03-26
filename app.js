import express from "express";
import { config } from "dotenv";
import { router } from "./routers/tasks.js";
import { connectToDb } from "./db/connect.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

const PORT = process.env.PORT || 3000;
const app = express();
config();

// middlewares
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", router);

// more middlewares
app.use(errorHandler);
app.use(notFoundHandler);

const startApp = async () => {
  try {
    await connectToDb(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`The server is up and listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};
startApp();
