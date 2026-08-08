import express from "express";
import swaggerUi from "swagger-ui-express";

import homeRouter from "./routes/homeRoutes.js";
import productRouter from "./routes/productRoutes.js";
import swaggerDocument from "./swagger.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRoutes);
app.use(homeRouter);
app.use(productRouter);


export default app;