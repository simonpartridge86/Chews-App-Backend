import express from "express";
import { recipesRouter } from "./router/index.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.static("public"));
app.use(express.json());

app.use("/", recipesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
