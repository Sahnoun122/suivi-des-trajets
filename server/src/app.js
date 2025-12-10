import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { p } from "framer-motion/client";


import truckRoutes from "./routes/truck.routes.js";
import remorqueRoutes from "./routes/remorque.routes.js";
import pneuRoutes from "./routes/pneu.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());


app.use("/api/auth", authRoutes);

app.use("/api/trucks", truckRoutes);
app.use("/api/remorques", remorqueRoutes);
app.use("/api/pneus", pneuRoutes);

app.use(errorHandler);



// const PORT = 6000;


// app.listen( PORT, () => {
//   console.log(`server demarrer sur le port ${PORT}`);
// });


export default app;
