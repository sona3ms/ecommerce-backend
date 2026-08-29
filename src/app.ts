import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import homeRouter from "./routes/homeRoutes.js";
import productRouter from "./routes/productRoutes.js";
import swaggerDocument from "./swagger.js";
import cartRoutes from "./routes/cartRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRoutes);
app.use(homeRouter);
app.use(productRouter);
app.use("/cart", cartRoutes);
app.use("/addresses", addressRoutes);
app.use("/coupons", couponRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/orders", orderRoutes);
export default app;