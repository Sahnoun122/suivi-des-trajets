import mongoose from "mongoose";

const truckSchema = new mongoose.Schema(
  {
    matricule: { type: String, required: true, unique: true },
    marque: { type: String, required: true },
    modele: { type: String, required: true },
    annee: { type: Number, required: true },
    tonnage: { type: Number, required: true },

    statut: {
      type: String,
      enum: ["actif", "maintenance", "inactif"],
      default: "actif",
    },

    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    remorques: [{ type: mongoose.Schema.Types.ObjectId, ref: "Remorque" }],
  },
  { timestamps: true }
);

export default mongoose.model("Truck", truckSchema);
