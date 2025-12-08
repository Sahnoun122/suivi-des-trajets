import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server demarer ${PORT}`);
});
