import { useDriver } from "../../context/DriverContext";
import { useState } from "react";

export default function TripReport() {
  const { trips, updateTripDetails } = useDriver();
  const [form, setForm] = useState({
    tripId: "",
    odometreDebut: "",
    odometreFin: "",
    carburantDepart: "",
    carburantFin: "",
    remarques: "",
  });

  const availableTrips = trips.filter((t) => t.statut !== "termine");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    updateTripDetails(form.tripId, form);
    alert("Données enregistrées ✅");
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Saisie véhicule</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Trajet</label>
          <select
            name="tripId"
            value={form.tripId}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Sélectionner un trajet</option>
            {availableTrips.map((t) => (
              <option key={t._id} value={t._id}>
                {t.origine} → {t.destination}
              </option>
            ))}
          </select>
        </div>

        <Input label="KM départ" name="odometreDebut" onChange={handleChange} />
        <Input label="KM arrivée" name="odometreFin" onChange={handleChange} />
        <Input
          label="Gasoil départ (L)"
          name="carburantDepart"
          onChange={handleChange}
        />
        <Input
          label="Gasoil arrivée (L)"
          name="carburantFin"
          onChange={handleChange}
        />

        <textarea
          name="remarques"
          placeholder="Remarques sur l'état du véhicule"
          className="w-full border rounded-lg p-3"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
          Valider le trajet
        </button>
      </form>
    </div>
  );
}

function Input({ label, name, onChange }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        name={name}
        onChange={onChange}
        className="w-full border p-3 rounded-lg"
      />
    </div>
  );
}
