import React, { useState, useContext, useEffect } from "react";
import { PneuContext } from "../../context/PneuContext";
import { TruckContext } from "../../context/TruckContext";
import { RemorqueContext } from "../../context/RemorqueContext";

function PneuForm({ closeForm, editData, setEditData }) {
  const { createPneu, updatePneu } = useContext(PneuContext);
  const { trucks } = useContext(TruckContext);
  const { remorques } = useContext(RemorqueContext);

  const [formData, setFormData] = useState({
    numeroSerie: "",
    marque: "",
    type: "",
    kilometrage: 0,
    statut: "bon",
    monteSurType: "Truck",
    materielId: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        numeroSerie: editData.numeroSerie,
        marque: editData.marque,
        type: editData.type,
        kilometrage: editData.kilometrage,
        statut: editData.statut,
        monteSurType: editData.monteSur.typeMateriel,
        materielId: editData.monteSur.materielId,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "monteSurType") {
      setFormData({ ...formData, [name]: value, materielId: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        numeroSerie: formData.numeroSerie,
        marque: formData.marque,
        type: formData.type,
        kilometrage: formData.kilometrage,
        statut: formData.statut,
        monteSur: {
          typeMateriel: formData.monteSurType,
          materielId: formData.materielId,
        },
      };

      if (editData) {
        await updatePneu(editData._id, payload);
        setEditData(null);
      } else {
        await createPneu(payload);
      }
      setFormData({
        numeroSerie: "",
        marque: "",
        type: "",
        kilometrage: 0,
        statut: "bon",
        monteSurType: "Truck",
        materielId: "",
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
      bon: "bg-green-100 text-green-800",
      a_remplacer: "bg-yellow-100 text-yellow-800",
      endommagé: "bg-red-100 text-red-800"
    };
    return badges[status] || badges.bon;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">
                {editData ? "Modifier Pneu" : "Nouveau Pneu"}
              </h3>
              <p className="text-gray-300 mt-1">
                {editData ? "Mise à jour des informations du pneu" : "Ajouter un nouveau pneu à l'inventaire"}
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
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Informations du pneu
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Numéro de série *
                </label>
                <input
                  type="text"
                  name="numeroSerie"
                  placeholder="ex: TY123456"
                  value={formData.numeroSerie}
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
                  placeholder="ex: Michelin, Continental"
                  value={formData.marque}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type/Dimension *
                </label>
                <input
                  type="text"
                  name="type"
                  placeholder="ex: 315/80R22.5"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kilométrage
                </label>
                <input
                  type="number"
                  name="kilometrage"
                  placeholder="Kilomètres parcourus"
                  value={formData.kilometrage}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  État du pneu
                </label>
                <div className="relative">
                  <select
                    name="statut"
                    value={formData.statut}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  >
                    <option value="bon">✅ Bon état</option>
                    <option value="a_remplacer">⚠️ À remplacer bientôt</option>
                    <option value="endommagé">❌ Endommagé</option>
                  </select>
                  <div className="absolute right-4 top-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(formData.statut)}`}>
                      {formData.statut === 'bon' ? 'Bon' : formData.statut === 'a_remplacer' ? 'À remplacer' : 'Endommagé'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              Affectation véhicule
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type de véhicule
                </label>
                <select
                  name="monteSurType"
                  value={formData.monteSurType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                >
                  <option value="Truck">🚛 Camion</option>
                  <option value="Remorque">🚚 Remorque</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Véhicule *
                </label>
                <select
                  name="materielId"
                  value={formData.materielId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                >
                  <option value="">Sélectionner un véhicule</option>
                  {formData.monteSurType === "Truck" && trucks.map(truck => (
                    <option key={truck._id} value={truck._id}>
                      {truck.matricule} - {truck.marque} {truck.modele}
                    </option>
                  ))}
                  {formData.monteSurType === "Remorque" && remorques.map(remorque => (
                    <option key={remorque._id} value={remorque._id}>
                      {remorque.numeroSerie} - {remorque.type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

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
                  {editData ? "Mettre à jour" : "Ajouter le pneu"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PneuForm;
