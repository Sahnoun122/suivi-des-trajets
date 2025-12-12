import Trip from "../models/Trajets.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Truck from "../models/Truck.model.js";
import Remorque from "../models/Remorque.model.js";

export const createTrip = async (req, res, next) => {
  try {
    // Validation des ObjectId
    const { chauffeurId, camionId, remorqueId } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(chauffeurId)) {
      return res.status(400).json({ message: "ID chauffeur invalide" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(camionId)) {
      return res.status(400).json({ message: "ID camion invalide" });
    }
    
    if (remorqueId && !mongoose.Types.ObjectId.isValid(remorqueId)) {
      return res.status(400).json({ message: "ID remorque invalide" });
    }
    
    // Vérifier l'existence des objets référencés
    const chauffeur = await User.findById(chauffeurId);
    if (!chauffeur) {
      return res.status(404).json({ message: "Chauffeur non trouvé" });
    }
    
    const camion = await Truck.findById(camionId);
    if (!camion) {
      return res.status(404).json({ message: "Camion non trouvé" });
    }
    
    if (remorqueId) {
      const remorque = await Remorque.findById(remorqueId);
      if (!remorque) {
        return res.status(404).json({ message: "Remorque non trouvée" });
      }
    }
    
    // Ajouter le champ creePar (utilisateur actuel)
    const tripData = {
      ...req.body,
      creePar: req.user?.id || req.body.creePar
    };
    
    if (!tripData.creePar) {
      return res.status(400).json({ message: "Le champ creePar est requis" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(tripData.creePar)) {
      return res.status(400).json({ message: "ID utilisateur créateur invalide" });
    }
    
    const trip = await Trip.create(tripData);
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
};

export const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find()
      .populate("chauffeurId", "name email phone")
      .populate("camionId", "matricule marque modele")
      .populate("remorqueId", "matricule type");
    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
};

export const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trip) return res.status(404).json({ message: "Trajet non trouvé" });
    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trajet non trouvé" });
    res.status(200).json({ message: "Trajet supprimé", trip });
  } catch (err) {
    next(err);
  }
};

