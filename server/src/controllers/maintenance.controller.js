import Maintenance from "../models/maintenance.model.js";

export const createMaintenance = async (req, res, next) => {
  try {
    const maintenance = await Maintenance.create(req.body);
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
    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
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
