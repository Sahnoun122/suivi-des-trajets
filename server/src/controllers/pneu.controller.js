import Pneu from "../models/Pneu.model.js";

export const createPneu = async (req, res, next) => {
  try {
    const pneu = await Pneu.create(req.body);
    res.status(201).json(pneu);
  } catch (err) {
    next(err);
  }
};

export const getPneus = async (req, res, next) => {
  try {
    const pneus = await Pneu.find().populate("monteSur.materielId");
    res.status(200).json(pneus);
  } catch (err) {
    next(err);
  }
};

export const updatePneu = async (req, res, next) => {
  try {
    const pneu = await Pneu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!pneu) {
      const error = new Error("Pneu non trouvé");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(pneu);
  } catch (err) {
    next(err);
  }
};

export const deletePneu = async (req, res, next) => {
  try {
    const pneu = await Pneu.findByIdAndDelete(req.params.id);

    if (!pneu) {
      const error = new Error("Pneu non trouvé");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Pneu supprimé", pneu });
  } catch (err) {
    next(err);
  }
};
