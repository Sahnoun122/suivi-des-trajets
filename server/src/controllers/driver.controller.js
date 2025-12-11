import Trip from "../models/Trip.model.js";
import PDFDocument from "pdfkit";


export const getMyTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ chauffeurId: req.user.id })
      .populate("camionId")
      .populate("remorqueId");

    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
};


export const downloadTripPDF = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      chauffeurId: req.user.id,
    })
      .populate("camionId")
      .populate("remorqueId");

    if (!trip) return res.status(404).json({ message: "Trajet introuvable" });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ordre-mission-${trip.reference}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("ORDRE DE MISSION", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Référence : ${trip.reference}`);
    doc.text(`Origine : ${trip.origine}`);
    doc.text(`Destination : ${trip.destination}`);
    doc.text(`Statut : ${trip.statut}`);
    doc.text(`Chauffeur : ${req.user.name}`);
    doc.text(`Camion : ${trip.camionId?.matricule || "N/A"}`);
    doc.text(`Remorque : ${trip.remorqueId?.matricule || "N/A"}`);

    doc.end();
  } catch (err) {
    next(err);
  }
};


export const updateTripStatus = async (req, res, next) => {
  try {
    const { statut } = req.body;
    const allowed = ["planifie", "en_cours", "termine"];

    if (!allowed.includes(statut)) {
      return res.status(400).json({ message: "Statut invalide" });
    }

    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, chauffeurId: req.user.id },
      { statut },
      { new: true }
    );

    if (!trip) return res.status(404).json({ message: "Trajet introuvable" });

    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};


export const submitTripDetails = async (req, res, next) => {
  try {
    const {
      odometreDebut,
      odometreFin,
      carburantDepart,
      carburantFin,
      remarques,
    } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      chauffeurId: req.user.id,
    });

    if (!trip) return res.status(404).json({ message: "Trajet introuvable" });

    if (odometreFin && trip.odometreDebut && odometreFin < trip.odometreDebut) {
      return res
        .status(400)
        .json({ message: "odometreFin doit être >= odometreDebut" });
    }

    if (odometreDebut !== undefined) trip.odometreDebut = odometreDebut;
    if (odometreFin !== undefined) trip.odometreFin = odometreFin;
    if (carburantDepart !== undefined) trip.carburantDepart = carburantDepart;
    if (carburantFin !== undefined) trip.carburantFin = carburantFin;
    if (remarques !== undefined) trip.remarques = remarques;

    await trip.save();
    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};
