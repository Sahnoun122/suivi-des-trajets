import { useState, useContext, useEffect } from "react";
import { useFuelLog } from "../../context/FuelLogContext";
import { TruckContext } from "../../context/TruckContext";
import { useDriver } from "../../context/DriverContext";
import { AuthContext } from "../../context/AuthContext";

export default function FuelLogForm({ close }) {
  const { createLog } = useFuelLog();
  const { trucks } = useContext(TruckContext);
  const { trips } = useDriver();
  const { user } = useContext(AuthContext);
  
  const [form, setForm] = useState({
    camionId: "",
    trajetId: "",
    litres: "",
    cout: "",
    odometre: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Validation simple
    if (!form.camionId || !form.trajetId || !form.litres || !form.cout || !form.odometre) {
      setError("Tous les champs sont requis");
      setLoading(false);
      return;
    }
    
    try {
      const result = await createLog({
        ...form,
        litres: Number(form.litres),
        cout: Number(form.cout),
        odometre: Number(form.odometre),
      });
      
      if (result?.success !== false) {
        setForm({ camionId: "", trajetId: "", litres: "", cout: "", odometre: "" });
        alert("Log de carburant enregistré avec succès!");
        if (close) close();
      } else {
        setError(result.error || "Erreur lors de l'enregistrement");
      }
    } catch (err) {
      setError("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">Enregistrement Carburant</h3>
              <p className="text-gray-300 mt-1">Saisir une nouvelle consommation de carburant</p>
            </div>
            <button
              type="button"
              onClick={close}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Sélection véhicule et trajet */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2-16h14a2 2 0 012 2v3M7 7h0m4 0h.01M17 7h0" />
              </svg>
              Véhicule et mission
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Camion utilisé *
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
                      🚛 {truck.matricule} - {truck.marque} {truck.modele}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trajet associé *
                </label>
                <select
                  name="trajetId"
                  value={form.trajetId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                >
                  <option value="">Sélectionner un trajet</option>
                  {trips?.map((trip) => (
                    <option key={trip._id} value={trip._id}>
                      📍 {trip.reference} - {trip.origine} → {trip.destination}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Données de carburant */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Informations carburant
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantité (Litres) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    name="litres"
                    value={form.litres}
                    onChange={handleChange}
                    required
                    placeholder="45.5"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  />
                  <div className="absolute right-4 top-3 text-gray-500">
                    <span className="text-sm">L</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Coût total *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    name="cout"
                    value={form.cout}
                    onChange={handleChange}
                    required
                    placeholder="65.50"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  />
                  <div className="absolute right-4 top-3 text-gray-500">
                    <span className="text-sm">€</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kilométrage actuel *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="odometre"
                    value={form.odometre}
                    onChange={handleChange}
                    required
                    placeholder="125340"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  />
                  <div className="absolute right-4 top-3 text-gray-500">
                    <span className="text-sm">km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculs automatiques */}
            {form.litres && form.cout && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Calculs automatiques</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Prix par litre :</span>
                    <span className="font-semibold text-blue-900">
                      {(parseFloat(form.cout) / parseFloat(form.litres) || 0).toFixed(3)} €/L
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Coût par 100km* :</span>
                    <span className="font-semibold text-blue-900 text-xs">*estimation moyenne</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={close}
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
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
