import TruckModel from "../models/Truck.model.js";

export const createTruck = async (req, res, next) => {
  try {
    const truck = await TruckModel.create(req.body);
    res.status(201).json(truck);
  } catch (err) {
    next(err);
  }
};

export const getTrucks = async (req, res, next) => {
  try {
    const trucks = await TruckModel.find()
      .populate("driver")
      .populate("remorques");
    res.status(200).json(trucks);
  } catch (err) {
    next(err);
  }
};

export const updateTruck = async (req, res, next) => {
  try {
    const truck = await TruckModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!truck) {
      const error = new Error("Camion non trouvé");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(truck);
  } catch (err) {
    next(err);
  }
};

export const deleteTruck = async (req, res, next) => {
  try {
    const truck = await TruckModel.findByIdAndDelete(req.params.id);

    if (!truck) {
      const error = new Error("Camion non trouvé");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: "Camion supprimé", truck });
  } catch (err) {
    next(err);
  }
};
