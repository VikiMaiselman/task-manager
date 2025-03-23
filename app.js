import express from "express";
import router from "./routers/tasks";
const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/tasks", router);

app.listen(PORT, () => {
  console.log(`The server is up and listening on port ${PORT}`);
});
