import Maintenance from "../models/maintenance.model.js";
import mongoose from "mongoose";

export const createMaintenance = async (req, res, next) => {
  try {
    const { type, camionId, pneuId, programmeLe, effectueLe, cout, effectuePar } = req.body;

    const validTypes = ["vidange", "changement_pneu", "inspection", "reparation"];
    if (!type || !validTypes.includes(type)) {
      const error = new Error(`Type de maintenance invalide. Types valides: ${validTypes.join(", ")}`);
      error.statusCode = 400;
      throw error;
    }

    if (!camionId || !mongoose.isValidObjectId(camionId)) {
      const error = new Error("camionId est requis et doit être un ObjectId valide");
      error.statusCode = 400;
      throw error;
    }

    if (!effectuePar || !mongoose.isValidObjectId(effectuePar)) {
      const error = new Error("effectuePar est requis et doit être un ObjectId valide");
      error.statusCode = 400;
      throw error;
    }

    if (pneuId && !mongoose.isValidObjectId(pneuId)) {
      const error = new Error("pneuId doit être un ObjectId valide si fourni");
      error.statusCode = 400;
      throw error;
    }

    if (!programmeLe) {
      const error = new Error("programmeLe est requis");
      error.statusCode = 400;
      throw error;
    }

    const programmation = new Date(programmeLe);
    if (isNaN(programmation.getTime())) {
      const error = new Error("programmeLe doit être une date valide");
      error.statusCode = 400;
      throw error;
    }

    const maintenanceData = {
      type,
      camionId,
      programmeLe: programmation,
      effectuePar,
    };

    if (pneuId) {
      maintenanceData.pneuId = pneuId;
    }

    if (effectueLe) {
      const dateEffectue = new Date(effectueLe);
      if (!isNaN(dateEffectue.getTime())) {
        maintenanceData.effectueLe = dateEffectue;
      }
    }

    if (cout !== undefined && cout !== null) {
      const coutNumber = Number(cout);
      if (!isNaN(coutNumber) && coutNumber >= 0) {
        maintenanceData.cout = coutNumber;
      }
    }

    const maintenance = await Maintenance.create(maintenanceData);
    res.status(201).json(maintenance);
  } catch (err) {
    next(err);
  }
};

export const getMaintenances = async (req, res, next) => {
  try {
    const maints = await Maintenance.find().populate(
      "camionId pneuId effectuePar"
    );
    res.status(200).json(maints);
  } catch (err) {
    next(err);
  }
};

export const updateMaintenance = async (req, res, next) => {
  try {
    const { type, camionId, pneuId, programmeLe, effectueLe, cout, effectuePar } = req.body;
    const updateData = {};

    if (type !== undefined) {
      const validTypes = ["vidange", "changement_pneu", "inspection", "reparation"];
      if (!validTypes.includes(type)) {
        const error = new Error(`Type de maintenance invalide. Types valides: ${validTypes.join(", ")}`);
        error.statusCode = 400;
        throw error;
      }
      updateData.type = type;
    }

    if (camionId !== undefined) {
      if (!mongoose.isValidObjectId(camionId)) {
        const error = new Error("camionId doit être un ObjectId valide");
        error.statusCode = 400;
        throw error;
      }
      updateData.camionId = camionId;
    }

    if (effectuePar !== undefined) {
      if (!mongoose.isValidObjectId(effectuePar)) {
        const error = new Error("effectuePar doit être un ObjectId valide");
        error.statusCode = 400;
        throw error;
      }
      updateData.effectuePar = effectuePar;
    }

    if (pneuId !== undefined) {
      if (pneuId === null || pneuId === "") {
        updateData.pneuId = null;
      } else if (!mongoose.isValidObjectId(pneuId)) {
        const error = new Error("pneuId doit être un ObjectId valide si fourni");
        error.statusCode = 400;
        throw error;
      } else {
        updateData.pneuId = pneuId;
      }
    }

    if (programmeLe !== undefined) {
      const programmation = new Date(programmeLe);
      if (isNaN(programmation.getTime())) {
        const error = new Error("programmeLe doit être une date valide");
        error.statusCode = 400;
        throw error;
      }
      updateData.programmeLe = programmation;
    }

    if (effectueLe !== undefined) {
      if (effectueLe === null || effectueLe === "") {
        updateData.effectueLe = null;
      } else {
        const dateEffectue = new Date(effectueLe);
        if (isNaN(dateEffectue.getTime())) {
          const error = new Error("effectueLe doit être une date valide");
          error.statusCode = 400;
          throw error;
        }
        updateData.effectueLe = dateEffectue;
      }
    }

    if (cout !== undefined) {
      if (cout === null || cout === "") {
        updateData.cout = null;
      } else {
        const coutNumber = Number(cout);
        if (isNaN(coutNumber) || coutNumber < 0) {
          const error = new Error("cout doit être un nombre positif");
          error.statusCode = 400;
          throw error;
        }
        updateData.cout = coutNumber;
      }
    }

    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!maintenance) {
      const error = new Error("Maintenance non trouvée");
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json(maintenance);
  } catch (err) {
    next(err);
  }
};

export const getMaintenance = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      const error = new Error("ID de maintenance invalide");
      error.statusCode = 400;
      throw error;
    }

    const maintenance = await Maintenance.findById(req.params.id).populate(
      "camionId pneuId effectuePar"
    );
    
    if (!maintenance) {
      const error = new Error("Maintenance non trouvée");
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json(maintenance);
  } catch (err) {
    next(err);
  }
};

export const deleteMaintenance = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      const error = new Error("ID de maintenance invalide");
      error.statusCode = 400;
      throw error;
    }

    const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
    
    if (!maintenance) {
      const error = new Error("Maintenance non trouvée");
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json({ message: "Maintenance supprimée avec succès" });
  } catch (err) {
    next(err);
  }
};
