import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { p } from "framer-motion/client";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());


app.use("/api/auth", authRoutes);


// const PORT = 6000;


// app.listen( PORT, () => {
//   console.log(`server demarrer sur le port ${PORT}`);
// });


export default app;
