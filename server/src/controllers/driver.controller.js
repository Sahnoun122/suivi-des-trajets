import Trip from "../models/Trip.model.js";
import PDFDocument from "pdfkit";

export const getMyTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ chauffeurId: req.user.id })
      .populate("camionId", "matricule marque modele")
      .populate("remorqueId", "matricule type")
      .populate("chauffeurId", "name email phone");
    res.status(200).json(trips);
  } catch (err) {
    next(err);
  }
};


export const downloadTripPDF = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.tripId)
      .populate("camionId")
      .populate("remorqueId")
      .populate("chauffeurId", "name email phone");

    if (!trip) return res.status(404).json({ message: "Trajet introuvable" });
    if (trip.chauffeurId._id.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Accès non autorisé à ce trajet" });
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ordre_mission_${trip.reference}.pdf`
    );
    doc.fontSize(18).text("Ordre de Mission", { align: "center" }).moveDown();

    doc.fontSize(12);
    doc.text(`Référence : ${trip.reference}`);
    doc.text(
      `Chauffeur : ${trip.chauffeurId.name} (${trip.chauffeurId.email || ""})`
    );
    doc.text(`Téléphone : ${trip.chauffeurId.phone || ""}`);
    doc.text(`Origine : ${trip.origine}`);
    doc.text(`Destination : ${trip.destination}`);
    if (trip.pointsIntermediaires && trip.pointsIntermediaires.length) {
      doc.text(
        `Points intermédiaires : ${trip.pointsIntermediaires.join(", ")}`
      );
    }
    doc.text(`Camion : ${trip.camionId?.matricule || "N/A"}`);
    doc.text(`Remorque : ${trip.remorqueId?.matricule || "N/A"}`);
    doc.text(`Statut : ${trip.statut}`);
    doc.moveDown();
    doc.text("Instructions :", { underline: true });
    doc.text(trip.remarques || "—");

    doc.end();
    doc.pipe(res);
  } catch (err) {
    next(err);
  }
};
