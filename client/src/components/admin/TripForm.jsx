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
    remarques: "",
  });

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
        remarques: editData.remarques || "",
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
    
    if (!form.chauffeurId || !form.camionId) {
      setError("Veuillez sélectionner au moins un chauffeur et un camion");
      setLoading(false);
      return;
    }
    
    const payload = {
      ...form,
      remorqueId: form.remorqueId || null,
      pointsIntermediaires: form.pointsIntermediaires
        .split(",")
        .map((p) => p.trim()),
      creePar: user?.id || user?._id,
    };
    
    try {
      if (editData) {
        const result = await updateTrip(editData._id, payload);
        if (result?.success || !result?.error) {
          onClose && onClose();
        } else {
          setError(result.error || "Erreur lors de la mise à jour");
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
            remarques: "",
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {editData ? "Modifier le Trajet" : "Nouveau Trajet"}
          </h2>
          <p className="text-gray-600 mt-1">
            {editData ? "Modifiez les informations du trajet" : "Créez un nouveau trajet pour votre flotte"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Informations Générales
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Référence *
              </label>
              <input
                type="text"
                name="reference"
                placeholder="Référence du trajet"
                value={form.reference}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Statut
              </label>
              <select
                name="statut"
                value={form.statut}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              >
                <option value="planifie">Planifié</option>
                <option value="en_cours">Én Cours</option>
                <option value="termine">Terminé</option>
                <option value="annule">Annulé</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Itinéraire
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Origine *
              </label>
              <input
                type="text"
                name="origine"
                placeholder="Ville ou adresse de départ"
                value={form.origine}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Destination *
              </label>
              <input
                type="text"
                name="destination"
                placeholder="Ville ou adresse d'arrivée"
                value={form.destination}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Points intermédiaires
              </label>
              <input
                type="text"
                name="pointsIntermediaires"
                placeholder="Villes intermédiaires (séparées par des virgules)"
                value={form.pointsIntermediaires}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              />
              <p className="text-sm text-gray-500 mt-1">Exemple: Lyon, Marseille, Nice</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Ressources Assignées
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Conducteur *
              </label>
              <select
                name="chauffeurId"
                value={form.chauffeurId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              >
                <option value="">Sélectionner un conducteur</option>
                {drivers.map((driver) => (
                  <option key={driver._id} value={driver._id}>
                    {driver.name || driver.nom || driver.email}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Camion *
              </label>
              <select
                name="camionId"
                value={form.camionId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              >
                <option value="">Sélectionner un camion</option>
                {trucks?.map((truck) => (
                  <option key={truck._id} value={truck._id}>
                    {truck.matricule} - {truck.marque} {truck.modele}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Remorque
              </label>
              <select
                name="remorqueId"
                value={form.remorqueId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              >
                <option value="">Aucune remorque (optionnel)</option>
                {remorques?.map((remorque) => (
                  <option key={remorque._id} value={remorque._id}>
                    {remorque.matricule || remorque.numeroSerie} - {remorque.type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Données du Véhicule
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Odomètre début (km)
              </label>
              <input
                type="number"
                name="odometreDebut"
                placeholder="Kilomètres de départ"
                value={form.odometreDebut}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Odomètre fin (km)
              </label>
              <input
                type="number"
                name="odometreFin"
                placeholder="Kilomètres d'arrivée"
                value={form.odometreFin}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Carburant départ (L)
              </label>
              <input
                type="number"
                name="carburantDepart"
                placeholder="Litres au départ"
                value={form.carburantDepart}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Carburant fin (L)
              </label>
              <input
                type="number"
                name="carburantFin"
                placeholder="Litres à l'arrivée"
                value={form.carburantFin}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1.586z" />
            </svg>
            Remarques
          </h3>
          
          <textarea
            name="remarques"
            placeholder="Commentaires, instructions spéciales, observations..."
            value={form.remarques}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50 resize-none"
          />
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Enregistrement...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {editData ? "Mettre à jour" : "Créer le trajet"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TripForm;
