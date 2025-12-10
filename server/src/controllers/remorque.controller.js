import Remorque from "../models/Remorque.model.js";

export const createRemorque = async (req, res) => {
  try {
    const remorque = await Remorque.create(req.body);
    res.status(201).json(remorque);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getRemorques = async (req, res) => {
  try {
    const remorques = await Remorque.find().populate("truck");
    res.json(remorques);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateRemorque = async (req, res) => {
  try {
    const remorque = await Remorque.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(remorque);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRemorque = async (req, res) => {
  try {
    await Remorque.findByIdAndDelete(req.params.id);
    res.json({ message: "Remorque supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
