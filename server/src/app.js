import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { p } from "framer-motion/client";


import truckRoutes from "./routes/truck.routes.js";
import remorqueRoutes from "./routes/remorque.routes.js";
import pneuRoutes from "./routes/pneu.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import tripRoutes from "./routes/trip.routes.js";


import fuelLogRoutes from "./routes/fuelLog.routes.js";
import maintenanceRoutes from "./routes/maintenance.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());


app.use("/api/auth", authRoutes);

app.use("/api/trucks", truckRoutes);
app.use("/api/remorques", remorqueRoutes);
app.use("/api/pneus", pneuRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/fuelLogs", fuelLogRoutes);
app.use("/api/maintenances", maintenanceRoutes);
app.use("/api/driver", driverRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

export default app;
