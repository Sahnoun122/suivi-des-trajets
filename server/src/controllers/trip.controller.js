import Trip from "../models/Trip.model.js";

export const createTrip = async (req, res, next) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (err) {
    next(err);
  }
};

export const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find()
      .populate("chauffeurId", "name email phone")
      .populate("camionId", "matricule marque model")
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
