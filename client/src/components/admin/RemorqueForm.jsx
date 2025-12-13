import React, { useState, useContext, useEffect } from "react";
import { RemorqueContext } from "../../context/RemorqueContext";

function RemorqueForm({ closeForm, editData, setEditData }) {
  const { createRemorque, updateRemorque } = useContext(RemorqueContext);

  const [formData, setFormData] = useState({
    matricule: "",
    type: "benne",
    poidsVide: 0,
    poidsMax: 0,
    statut: "active",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editData) {
        await updateRemorque(editData._id, formData);
        setEditData(null);
      } else {
        await createRemorque(formData);
      }
      setFormData({
        matricule: "",
        type: "benne",
        poidsVide: 0,
        poidsMax: 0,
        statut: "active",
      });
      closeForm();
    } catch (err) {
      alert("Erreur lors de la sauvegarde !");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: "bg-green-100 text-green-800",
      maintenance: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800"
    };
    return badges[status] || badges.active;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">
                {editData ? "Modifier Remorque" : "Nouvelle Remorque"}
              </h3>
              <p className="text-gray-300 mt-1">
                {editData ? "Mise à jour des informations" : "Ajouter une nouvelle remorque à la flotte"}
              </p>
            </div>
            <button
              type="button"
              onClick={closeForm}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informations générales */}
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
                  placeholder="ex: REM001"
                  value={formData.matricule}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type de remorque
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                >
                  <option value="benne">🚛 Benne</option>
                  <option value="frigorifique">❄️ Frigorifique</option>
                  <option value="plateau">📦 Plateau</option>
                  <option value="autre">⚙️ Autre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Poids à vide (kg)
                </label>
                <input
                  type="number"
                  name="poidsVide"
                  placeholder="Poids sans charge"
                  value={formData.poidsVide}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Poids maximum (kg)
                </label>
                <input
                  type="number"
                  name="poidsMax"
                  placeholder="Charge maximale"
                  value={formData.poidsMax}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Statut
                </label>
                <div className="relative">
                  <select
                    name="statut"
                    value={formData.statut}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  >
                    <option value="active">✅ Active</option>
                    <option value="maintenance">🔧 En maintenance</option>
                    <option value="inactive">❌ Inactive</option>
                  </select>
                  <div className="absolute right-4 top-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(formData.statut)}`}>
                      {formData.statut === 'active' ? 'Actif' : formData.statut === 'maintenance' ? 'Maintenance' : 'Inactif'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={closeForm}
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
                  {editData ? "Mettre à jour" : "Ajouter la remorque"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RemorqueForm;
