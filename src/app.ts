import express from "express";
import homeRouter from "./routes/homeRoutes.js";

const app = express();

app.use(homeRouter);

export default app;