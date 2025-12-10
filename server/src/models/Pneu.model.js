import mongoose from "mongoose";

const pneuSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: true,
      unique: true,
    },

    brand: { type: String, required: true },
    type: { type: String, required: true },

    kilometrage: {
      type: Number,
      default: 0,
    },

    installedAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["good", "to_replace", "damaged"],
      default: "good",
    },

    mountedOn: {
      kind: { type: String, enum: ["Truck", "Remorque"], required: true },
      item: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pneu", pneuSchema);
