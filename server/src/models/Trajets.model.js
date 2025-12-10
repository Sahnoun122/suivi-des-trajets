import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    reference: { type: String, required: true, unique: true },

    origine: { type: String, required: true },
    destination: { type: String, required: true },
    pointsIntermediaires: [{ type: String }],

    chauffeurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    camionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Truck",
      required: true,
    },
    remorqueId: { type: mongoose.Schema.Types.ObjectId, ref: "Remorque" },

    statut: {
      type: String,
      enum: ["planifie", "en_cours", "termine"],
      default: "planifie",
    },

    odometreDebut: Number,
    odometreFin: Number,

    carburantDepart: Number,
    carburantFin: Number,

    creePar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
