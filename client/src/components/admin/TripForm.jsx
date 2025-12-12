import { useState, useEffect } from "react";
import { useTrip } from "../../context/TripContext";
import { TruckContext } from "../../context/TruckContext";
import { RemorqueContext } from "../../context/RemorqueContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";

const TripForm = ({ editData = null, onClose }) => {
  const { createTrip, updateTrip } = useTrip();
  const { trucks } = useContext(TruckContext);
  const { remorques } = useContext(RemorqueContext);
  const { user } = useContext(AuthContext);
  const [drivers, setDrivers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Récupérer la liste des chauffeurs
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await api.get("/users/drivers");
        setDrivers(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des chauffeurs:", error);
      }
    };
    fetchDrivers();
  }, []);

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
    setError("");
    setLoading(true);
    
    // Validation côté client
    if (!form.chauffeurId || !form.camionId) {
      setError("Veuillez sélectionner au moins un chauffeur et un camion");
      setLoading(false);
      return;
    }
    
    const payload = {
      ...form,
      pointsIntermediaires: form.pointsIntermediaires
        .split(",")
        .map((p) => p.trim()),
      creePar: user?.id || user?._id, // Ajouter l'ID de l'utilisateur connecté
    };
    
    try {
      if (editData) {
        const result = await updateTrip(editData._id, payload);
        if (result?.success || !result?.error) {
          onClose && onClose();
        } else {
          setError(result.error);
        }
      } else {
        const result = await createTrip(payload);
        if (result?.success || !result?.error) {
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
        } else {
          setError(result.error);
        }
      }
    } catch (error) {
      setError("Erreur lors de l'enregistrement du trajet");
    } finally {
      setLoading(false);
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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

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
        
        <select
          name="chauffeurId"
          value={form.chauffeurId}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Sélectionner un chauffeur</option>
          {drivers.map((driver) => (
            <option key={driver._id} value={driver._id}>
              {driver.name || driver.nom || driver.email}
            </option>
          ))}
        </select>
        
        <select
          name="camionId"
          value={form.camionId}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Sélectionner un camion</option>
          {trucks?.map((truck) => (
            <option key={truck._id} value={truck._id}>
              {truck.matricule} - {truck.marque} {truck.model}
            </option>
          ))}
        </select>
        
        <select
          name="remorqueId"
          value={form.remorqueId}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Sélectionner une remorque (optionnel)</option>
          {remorques?.map((remorque) => (
            <option key={remorque._id} value={remorque._id}>
              {remorque.matricule || remorque.numeroSerie} - {remorque.type}
            </option>
          ))}
        </select>
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
        disabled={loading}
        className={`mt-4 px-4 py-2 text-white rounded ${loading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading 
          ? "Enregistrement..." 
          : editData ? "Mettre à jour" : "Créer"
        }
      </button>
    </form>
  );
};

export default TripForm;
