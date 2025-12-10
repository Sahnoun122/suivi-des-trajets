import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  {
    matricule: {
      type: String,
      required: true,
      unique: true,
    },
    marque: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    tonnage: { type: Number, required: true },

    status: {
      type: String,
      enum: ["active", "maintenance", "inactive"],
      default: "active",
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },

    remorques: [{ type: mongoose.Schema.Types.ObjectId, ref: "Remorque" }],
  },
  { timestamps: true }
);

export default mongoose.model("Truck", truckSchema);
