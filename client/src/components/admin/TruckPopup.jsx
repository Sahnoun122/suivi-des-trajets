import React, { useState, useContext, useEffect } from "react";
import { TruckContext } from "../../context/TruckContext";

export default function TruckPopup({ isOpen, onClose, editTruck }) {
  const { addTruck, updateTruck } = useContext(TruckContext);

  const [form, setForm] = useState({
    matricule: "",
    marque: "",
    modele: "",
    annee: "",
    tonnage: "",
    statut: "actif",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editTruck) {
      setForm(editTruck);
    } else {
      setForm({
        matricule: "",
        marque: "",
        modele: "",
        annee: "",
        tonnage: "",
        statut: "actif",
      });
    }
  }, [editTruck]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editTruck) {
        await updateTruck(editTruck._id, form);
      } else {
        await addTruck(form);
      }
      onClose();
      setForm({
        matricule: "",
        marque: "",
        modele: "",
        annee: "",
        tonnage: "",
        statut: "actif",
      });
    } catch (error) {
      alert("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      actif: "bg-green-100 text-green-800",
      maintenance: "bg-yellow-100 text-yellow-800",
      inactif: "bg-red-100 text-red-800"
    };
    return badges[status] || badges.actif;
  };

  const getCurrentYear = () => new Date().getFullYear();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">
                {editTruck ? "Modifier Camion" : "Nouveau Camion"}
              </h3>
              <p className="text-gray-300 mt-1">
                {editTruck ? "Mise à jour des informations du véhicule" : "Ajouter un nouveau camion à la flotte"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2-16h14a2 2 0 012 2v3M7 7h0m4 0h.01M17 7h0" />
              </svg>
              Informations générales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Matricule *
                </label>
                <input
                  type="text"
                  name="matricule"
                  placeholder="ex: CAM001"
                  value={form.matricule}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Marque *
                </label>
                <input
                  type="text"
                  name="marque"
                  placeholder="ex: Volvo, Mercedes, Scania"
                  value={form.marque}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Modèle *
                </label>
                <input
                  type="text"
                  name="modele"
                  placeholder="ex: FH16, Actros, R-Series"
                  value={form.modele}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Année *
                </label>
                <input
                  type="number"
                  name="annee"
                  placeholder="2024"
                  value={form.annee}
                  onChange={handleChange}
                  min="1990"
                  max={getCurrentYear() + 1}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Caractéristiques techniques
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tonnage (tonnes) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="tonnage"
                    placeholder="40"
                    value={form.tonnage}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    step="0.5"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  />
                  <div className="absolute right-4 top-3 text-gray-500">
                    <span className="text-sm">T</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Statut du véhicule
                </label>
                <div className="relative">
                  <select
                    name="statut"
                    value={form.statut}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  >
                    <option value="actif">✅ Actif</option>
                    <option value="maintenance">🔧 En maintenance</option>
                    <option value="inactif">❌ Inactif</option>
                  </select>
                  <div className="absolute right-4 top-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(form.statut)}`}>
                      {form.statut === 'actif' ? 'Actif' : form.statut === 'maintenance' ? 'Maintenance' : 'Inactif'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
                  {editTruck ? "Mettre à jour" : "Ajouter le camion"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
