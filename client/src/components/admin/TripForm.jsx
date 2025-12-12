import { useState, useEffect } from "react";
import { useTrip } from "../../context/TripContext";

const TripForm = ({ editData = null, onClose }) => {
  const { createTrip, updateTrip } = useTrip();

  const [form, setForm] = useState({
    reference: "",
    origine: "",
    destination: "",
    pointsIntermediaires: "",
    chauffeurId: "",
    camionId: "",
    remorqueId: "",
    statut: "planifie",
    odometreDebut: "",
    odometreFin: "",
    carburantDepart: "",
    carburantFin: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        reference: editData.reference || "",
        origine: editData.origine || "",
        destination: editData.destination || "",
        pointsIntermediaires: editData.pointsIntermediaires?.join(", ") || "",
        chauffeurId: editData.chauffeurId?._id || "",
        camionId: editData.camionId?._id || "",
        remorqueId: editData.remorqueId?._id || "",
        statut: editData.statut || "planifie",
        odometreDebut: editData.odometreDebut || "",
        odometreFin: editData.odometreFin || "",
        carburantDepart: editData.carburantDepart || "",
        carburantFin: editData.carburantFin || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      pointsIntermediaires: form.pointsIntermediaires
        .split(",")
        .map((p) => p.trim()),
    };
    if (editData) {
      await updateTrip(editData._id, payload);
      onClose && onClose();
    } else {
      await createTrip(payload);
      setForm({
        reference: "",
        origine: "",
        destination: "",
        pointsIntermediaires: "",
        chauffeurId: "",
        camionId: "",
        remorqueId: "",
        statut: "planifie",
        odometreDebut: "",
        odometreFin: "",
        carburantDepart: "",
        carburantFin: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow-md rounded-xl mb-6"
    >
      <h2 className="text-xl font-bold mb-4">
        {editData ? "Modifier Trajet" : "Nouveau Trajet"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="reference"
          placeholder="Référence"
          value={form.reference}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="origine"
          placeholder="Origine"
          value={form.origine}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pointsIntermediaires"
          placeholder="Points intermédiaires (séparés par ,)"
          value={form.pointsIntermediaires}
          onChange={handleChange}
        />
        <input
          type="text"
          name="chauffeurId"
          placeholder="ID Chauffeur"
          value={form.chauffeurId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="camionId"
          placeholder="ID Camion"
          value={form.camionId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="remorqueId"
          placeholder="ID Remorque"
          value={form.remorqueId}
          onChange={handleChange}
        />
        <select name="statut" value={form.statut} onChange={handleChange}>
          <option value="planifie">Planifié</option>
          <option value="en_cours">En cours</option>
          <option value="termine">Terminé</option>
        </select>
        <input
          type="number"
          name="odometreDebut"
          placeholder="Odomètre début"
          value={form.odometreDebut}
          onChange={handleChange}
        />
        <input
          type="number"
          name="odometreFin"
          placeholder="Odomètre fin"
          value={form.odometreFin}
          onChange={handleChange}
        />
        <input
          type="number"
          name="carburantDepart"
          placeholder="Carburant départ"
          value={form.carburantDepart}
          onChange={handleChange}
        />
        <input
          type="number"
          name="carburantFin"
          placeholder="Carburant fin"
          value={form.carburantFin}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {editData ? "Mettre à jour" : "Créer"}
      </button>
    </form>
  );
};

export default TripForm;
