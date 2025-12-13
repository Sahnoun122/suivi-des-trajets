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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Enregistrement Carburant</h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sélection du camion */}
          <div>
            <label className="block text-sm font-medium mb-1">Camion</label>
            <select
              name="camionId"
              value={form.camionId}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un camion</option>
              {trucks?.map((truck) => (
                <option key={truck._id} value={truck._id}>
                  {truck.matricule} - {truck.marque} {truck.modele}
                </option>
              ))}
            </select>
          </div>

          {/* Sélection du trajet */}
          <div>
            <label className="block text-sm font-medium mb-1">Trajet</label>
            <select
              name="trajetId"
              value={form.trajetId}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sélectionner un trajet</option>
              {trips?.map((trip) => (
                <option key={trip._id} value={trip._id}>
                  {trip.reference} - {trip.origine} → {trip.destination}
                </option>
              ))}
            </select>
          </div>

          {/* Litres de carburant */}
          <div>
            <label className="block text-sm font-medium mb-1">Litres de carburant</label>
            <input
              type="number"
              step="0.1"
              name="litres"
              value={form.litres}
              onChange={handleChange}
              required
              placeholder="Ex: 45.5"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Coût */}
          <div>
            <label className="block text-sm font-medium mb-1">Coût (€)</label>
            <input
              type="number"
              step="0.01"
              name="cout"
              value={form.cout}
              onChange={handleChange}
              required
              placeholder="Ex: 65.50"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Odomètre */}
          <div>
            <label className="block text-sm font-medium mb-1">Odomètre (km)</label>
            <input
              type="number"
              name="odometre"
              value={form.odometre}
              onChange={handleChange}
              required
              placeholder="Ex: 125340"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={close}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 px-4 py-2 text-white rounded-md ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
