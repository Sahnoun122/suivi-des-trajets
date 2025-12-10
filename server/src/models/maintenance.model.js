import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["vidange", "changement_pneu", "inspection", "reparation"],
      required: true,
    },

    camionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
      required: true,
    },

    pneuId: { type: mongoose.Schema.Types.ObjectId, ref: "Pneu" },

    programmeLe: Date,
    effectueLe: Date,

    cout: Number,

    effectuePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Maintenance", maintenanceSchema);
