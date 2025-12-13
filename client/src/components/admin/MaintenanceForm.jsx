import { useState, useContext, useEffect } from "react";
import { useMaintenance } from "../../context/MaintenanceContext";
import { TruckContext } from "../../context/TruckContext";
import { PneuContext } from "../../context/PneuContext";
import { AuthContext } from "../../context/AuthContext";

const MaintenanceForm = ({ editData, onClose }) => {
  const { createMaintenance, updateMaintenance } = useMaintenance();
  const { trucks } = useContext(TruckContext);
  const { pneus } = useContext(PneuContext);
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    type: "",
    description: "",
    camionId: "",
    pneuId: "",
    effectuePar: user?.id || "",
    programmeLe: "",
    effectueLe: "",
    cout: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        type: editData.type || "",
        description: editData.description || "",
        camionId: editData.camionId?._id || editData.camionId || "",
        pneuId: editData.pneuId?._id || editData.pneuId || "",
        effectuePar: editData.effectuePar?._id || editData.effectuePar || user?.id || "",
        programmeLe: editData.programmeLe ? editData.programmeLe.split('T')[0] : "",
        effectueLe: editData.effectueLe ? editData.effectueLe.split('T')[0] : "",
        cout: editData.cout || "",
      });
    } else {
      setForm({
        type: "",
        description: "",
        camionId: "",
        pneuId: "",
        effectuePar: user?.id || "",
        programmeLe: "",
        effectueLe: "",
        cout: "",
      });
    }
  }, [editData, user?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const effectueParId = form.effectuePar || user?.id;
    
    if (!effectueParId) {
      alert("Erreur: Utilisateur non connecté");
      setLoading(false);
      return;
    }
    
    const maintenanceData = {
      type: form.type,
      camionId: form.camionId,
      programmeLe: form.programmeLe,
      effectuePar: effectueParId,
      description: form.description,
    };
    
    if (form.pneuId) {
      maintenanceData.pneuId = form.pneuId;
    }
    
    if (form.effectueLe) {
      maintenanceData.effectueLe = form.effectueLe;
    }
    
    if (form.cout) {
      maintenanceData.cout = parseFloat(form.cout);
    }
    
    try {
      if (editData) {
        await updateMaintenance(editData._id, maintenanceData);
        onClose && onClose();
      } else {
        await createMaintenance(maintenanceData);
        setForm({
          type: "",
          description: "",
          camionId: "",
          pneuId: "",
          effectuePar: user?.id || "",
          programmeLe: "",
          effectueLe: "",
          cout: "",
        });
      }
    } catch (error) {
      alert("Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const getMaintenanceTypeIcon = (type) => {
    const icons = {
      vidange: "🛢️",
      changement_pneu: "🔧",
      inspection: "🔍",
      reparation: "⚙️"
    };
    return icons[type] || "🔧";
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">
                {editData ? "Modifier Maintenance" : "Nouvelle Maintenance"}
              </h3>
              <p className="text-gray-300 mt-1">
                {editData ? "Mise à jour de l'intervention" : "Planifier une nouvelle maintenance"}
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
          {/* Type et description */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Type de maintenance
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type d'intervention *
                </label>
                <div className="relative">
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  >
                    <option value="">Sélectionner le type</option>
                    <option value="vidange">🛢️ Vidange</option>
                    <option value="changement_pneu">🔧 Changement de pneu</option>
                    <option value="inspection">🔍 Inspection</option>
                    <option value="reparation">⚙️ Réparation</option>
                  </select>
                </div>
              </div>
              
              <div className="lg:row-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Détails de l'intervention, pièces à changer, observations..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Véhicule et pneu */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2-16h14a2 2 0 012 2v3M7 7h0m4 0h.01M17 7h0" />
              </svg>
              Véhicule et équipement
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Camion concerné *
                </label>
                <select
                  value={form.camionId}
                  onChange={(e) => setForm({ ...form, camionId: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                >
                  <option value="">Sélectionner un camion</option>
                  {trucks?.map(truck => (
                    <option key={truck._id} value={truck._id}>
                      {truck.matricule} - {truck.marque} {truck.modele}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pneu concerné (optionnel)
                </label>
                <select
                  value={form.pneuId}
                  onChange={(e) => setForm({ ...form, pneuId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                >
                  <option value="">Aucun pneu spécifique</option>
                  {pneus?.map(pneu => (
                    <option key={pneu._id} value={pneu._id}>
                      {pneu.numeroSerie} - {pneu.marque} ({pneu.statut})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Planning et coût */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V5a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6v4m-6 0v10a2 2 0 002 2h8a2 2 0 002-2V11" />
              </svg>
              Planning et informations
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Effectué par
                </label>
                <input
                  type="text"
                  value={user?.name || user?.email || "Utilisateur connecté"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-600"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date programmée *
                </label>
                <input
                  type="date"
                  value={form.programmeLe}
                  onChange={(e) => setForm({ ...form, programmeLe: e.target.value })}
                  min={getCurrentDate()}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date effectuée
                </label>
                <input
                  type="date"
                  value={form.effectueLe}
                  onChange={(e) => setForm({ ...form, effectueLe: e.target.value })}
                  max={getCurrentDate()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                />
              </div>
              
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Coût estimé/réel (€)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={form.cout}
                    onChange={(e) => setForm({ ...form, cout: e.target.value })}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gray-50"
                  />
                  <div className="absolute right-4 top-3 text-gray-500">
                    <span className="text-sm">€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
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
                  {editData ? "Mettre à jour" : "Planifier la maintenance"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;
