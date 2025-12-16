import FuelLog from "../models/fuelLog.model.js";

export const createFuelLog = async (req, res, next) => {
  try {
    const logData = {
      ...req.body,
      enregistrePar: req.user?.id || req.body.enregistrePar
    };
    
    const log = await FuelLog.create(logData);
    res.status(201).json(log);
  } catch (err) {
    next(err);
  }
};

export const getFuelLogs = async (req, res, next) => {
  try {
    const logs = await FuelLog.find()
      .populate("camionId", "matricule marque modele")
      .populate("trajetId", "reference origine destination")
      .populate("enregistrePar", "name email");
    res.status(200).json(logs);
  } catch (err) {
    next(err);
  }
};
