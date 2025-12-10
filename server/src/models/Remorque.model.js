import mongoose from "mongoose";

const remorqueSchema = new mongoose.Schema(
  {
    matricule: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["benne", "frig", "plateau", "autre"],
      required: true,
    },
    poidsVide: Number,
    poidsMax: Number,

    status: {
      type: String,
      enum: ["active", "maintenance", "inactive"],
      default: "active",
    },

    truck: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Remorque", remorqueSchema);
