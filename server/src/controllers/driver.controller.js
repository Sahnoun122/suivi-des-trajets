import Trip from "../models/Trajets.model.js";
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
      _id: req.params.tripId,
      chauffeurId: req.user.id,
    })
      .populate("camionId")
      .populate("remorqueId")
      .populate("chauffeurId")
      .populate("creePar");

    if (!trip) return res.status(404).json({ message: "Trajet introuvable" });

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=ordre-mission-${trip.reference}.pdf`
    );

    doc.pipe(res);

    // En-tête
    doc.fontSize(20).font('Helvetica-Bold').text("ORDRE DE MISSION", { align: "center" });
    doc.fontSize(12).font('Helvetica').text(`Généré le: ${new Date().toLocaleString('fr-FR')}`, { align: "center" });
    doc.moveDown(2);

    // Informations générales
    doc.fontSize(16).font('Helvetica-Bold').text("INFORMATIONS GÉNÉRALES", { underline: true });
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');
    doc.text(`Référence : ${trip.reference}`);
    doc.text(`Statut : ${trip.statut.toUpperCase()}`);
    doc.text(`Date de création : ${new Date(trip.createdAt).toLocaleDateString('fr-FR')}`);
    doc.text(`Créé par : ${trip.creePar?.name || 'N/A'}`);
    doc.moveDown();

    // Itinéraire
    doc.fontSize(16).font('Helvetica-Bold').text("ITINÉRAIRE", { underline: true });
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');
    doc.text(`Origine : ${trip.origine}`);
    doc.text(`Destination : ${trip.destination}`);
    if (trip.pointsIntermediaires && trip.pointsIntermediaires.length > 0) {
      doc.text(`Points intermédiaires : ${trip.pointsIntermediaires.join(', ')}`);
    }
    doc.moveDown();

    // Personnel et véhicules
    doc.fontSize(16).font('Helvetica-Bold').text("PERSONNEL ET VÉHICULES", { underline: true });
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');
    doc.text(`Chauffeur : ${trip.chauffeurId?.name || req.user.name}`);
    doc.text(`Email : ${trip.chauffeurId?.email || req.user.email}`);
    doc.text(`Téléphone : ${trip.chauffeurId?.phone || 'N/A'}`);
    doc.text(`Numéro de permis : ${trip.chauffeurId?.licenseNumber || 'N/A'}`);
    doc.moveDown();

    // Informations camion
    if (trip.camionId) {
      doc.text(`Camion - Matricule : ${trip.camionId.matricule}`);
      doc.text(`Marque : ${trip.camionId.marque}`);
      doc.text(`Modèle : ${trip.camionId.modele}`);
      doc.text(`Année : ${trip.camionId.annee || 'N/A'}`);
      doc.text(`Tonnage : ${trip.camionId.tonnage || 'N/A'} tonnes`);
      doc.text(`Statut camion : ${trip.camionId.statut || 'N/A'}`);
    } else {
      doc.text(`Camion : Non assigné`);
    }
    doc.moveDown();

    // Informations remorque
    if (trip.remorqueId) {
      doc.text(`Remorque - Matricule : ${trip.remorqueId.matricule}`);
      doc.text(`Type : ${trip.remorqueId.type}`);
      doc.text(`Poids vide : ${trip.remorqueId.poidsVide || 'N/A'} kg`);
      doc.text(`Poids maximum : ${trip.remorqueId.poidsMax || 'N/A'} kg`);
      doc.text(`Statut remorque : ${trip.remorqueId.statut || 'N/A'}`);
    } else {
      doc.text(`Remorque : Non assignée`);
    }
    doc.moveDown();

    // Données de conduite
    doc.fontSize(16).font('Helvetica-Bold').text("DONNÉES DE CONDUITE", { underline: true });
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');
    doc.text(`Odomètre début : ${trip.odometreDebut || 'Non renseigné'} km`);
    doc.text(`Odomètre fin : ${trip.odometreFin || 'Non renseigné'} km`);
    if (trip.odometreDebut && trip.odometreFin) {
      const distance = trip.odometreFin - trip.odometreDebut;
      doc.text(`Distance parcourue : ${distance} km`);
    }
    doc.moveDown();

    // Carburant
    doc.fontSize(16).font('Helvetica-Bold').text("CARBURANT", { underline: true });
    doc.moveDown();
    doc.fontSize(12).font('Helvetica');
    doc.text(`Carburant départ : ${trip.carburantDepart || 'Non renseigné'} L`);
    doc.text(`Carburant fin : ${trip.carburantFin || 'Non renseigné'} L`);
    if (trip.carburantDepart && trip.carburantFin) {
      const consommation = trip.carburantDepart - trip.carburantFin;
      doc.text(`Consommation : ${Math.abs(consommation)} L`);
    }
    doc.moveDown();

    // Remarques
    if (trip.remarques) {
      doc.fontSize(16).font('Helvetica-Bold').text("REMARQUES", { underline: true });
      doc.moveDown();
      doc.fontSize(12).font('Helvetica');
      doc.text(trip.remarques, { width: 500 });
      doc.moveDown();
    }

    // Pied de page
    doc.fontSize(10).font('Helvetica');
    doc.text("Ce document a été généré automatiquement par le système de gestion des trajets.", 50, doc.page.height - 100, { align: "center" });
    doc.text("Signature du chauffeur : ____________________", 50, doc.page.height - 80);
    doc.text(`Date : ____________________`, 300, doc.page.height - 80);

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
      { _id: req.params.tripId, chauffeurId: req.user.id },
      { statut },
      { new: true }
    );

    if (!trip) return res.status(404).json({ message: "Trajet introuvable" });

    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};


export const updateTripDetails = async (req, res, next) => {
  try {
    const {
      odometreDebut,
      odometreFin,
      carburantDepart,
      carburantFin,
      remarques,
    } = req.body;

    const trip = await Trip.findOne({
      _id: req.params.tripId,
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
