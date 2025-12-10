import FuelLog from "../models/fuelLog.model.js";

export const createFuelLog = async (req, res, next) => {
  try {
    const log = await FuelLog.create(req.body);
    res.status(201).json(log);
  } catch (err) {
    next(err);
  }
};

export const getFuelLogs = async (req, res, next) => {
  try {
    const logs = await FuelLog.find().populate(
      "camionId trajetId enregistrePar"
    );
    res.status(200).json(logs);
  } catch (err) {
    next(err);
  }
};
