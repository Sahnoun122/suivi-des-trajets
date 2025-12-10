import mongoose from "mongoose";

const pneuSchema = new mongoose.Schema(
  {
    numeroSerie: { type: String, required: true, unique: true },

    marque: { type: String, required: true },
    type: { type: String, required: true },

    kilometrage: { type: Number, default: 0 },

    installeLe: { type: Date, default: Date.now },

    statut: {
      type: String,
      enum: ["bon", "a_remplacer", "endommagé"],
      default: "bon",
    },

    monteSur: {
      typeMateriel: {
        type: String,
        enum: ["Camion", "Remorque"],
        required: true,
      },
      materielId: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Pneu", pneuSchema);
