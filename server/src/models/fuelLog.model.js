import mongoose from "mongoose";

const fuelLogSchema = new mongoose.Schema(
  {
    camionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
      required: true,
    },
    trajetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    litres: { type: Number, required: true },
    cout: { type: Number, required: true },
    odometre: { type: Number, required: true },
    enregistrePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("FuelLog", fuelLogSchema);
