import Remorque from "../models/Remorque.model.js";

export const createRemorque = async (req, res, next) => {
  try {
    const remorque = await Remorque.create(req.body);
    res.status(201).json(remorque);
  } catch (err) {
    next(err);
  }
};

export const getRemorques = async (req, res, next) => {
  try {
    const remorques = await Remorque.find().populate("truck");
    res.status(200).json(remorques);
  } catch (err) {
    next(err);
  }
};

export const updateRemorque = async (req, res, next) => {
  try {
    const remorque = await Remorque.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!remorque) {
      const error = new Error("Remorque non trouvée");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(remorque);
  } catch (err) {
    next(err);
  }
};

export const deleteRemorque = async (req, res, next) => {
  try {
    const remorque = await Remorque.findByIdAndDelete(req.params.id);

    if (!remorque) {
      const error = new Error("Remorque non trouvée");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Remorque supprimée", remorque });
  } catch (err) {
    next(err);
  }
};
