import Pneu from "../models/Pneu.model.js";

export const createPneu = async (req, res) => {
  try {
    const pneu = await Pneu.create(req.body);
    res.status(201).json(pneu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPneus = async (req, res) => {
  try {
    const pneus = await Pneu.find().populate("mountedOn.item");
    res.json(pneus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePneu = async (req, res) => {
  try {
    const pneu = await Pneu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(pneu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePneu = async (req, res) => {
  try {
    await Pneu.findByIdAndDelete(req.params.id);
    res.json({ message: "Pneu supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
