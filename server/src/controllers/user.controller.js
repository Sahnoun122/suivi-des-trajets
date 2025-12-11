import User from "../models/user.model.js";

export const getDrivers = async (req, res, next) => {
  try {
    const drivers = await User.find({ role: "driver" });
    res.status(200).json(drivers);
  } catch (err) {
    next(err);
  }
};

export const toggleDriverStatus = async (req, res, next) => {
  try {
    const driverId = req.params.id;
    const driver = await User.findById(driverId);

    if (!driver) {
      return res.status(404).json({ message: "Driver non trouvé" });
    }

    driver.status = driver.status === "active" ? "inactive" : "active";
    await driver.save();

    res.status(200).json({
      message: `Le compte du driver est maintenant ${driver.status}`,
      driver,
    });
  } catch (err) {
    next(err);
  }
};
