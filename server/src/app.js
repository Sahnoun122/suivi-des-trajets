import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

const app = express();
const PORT = 5000;

dotenv.config();
connectDB();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`server demarer ${PORT}`);
});
