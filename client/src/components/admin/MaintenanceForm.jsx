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
    
    const effectueParId = form.effectuePar || user?.id;
    
    if (!effectueParId) {
      alert("Erreur: Utilisateur non connecté");
      return;
    }
    
    const maintenanceData = {
      type: form.type,
      camionId: form.camionId,
      programmeLe: form.programmeLe,
      effectuePar: effectueParId,
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
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {editData ? "Modifier Maintenance" : "Ajouter Maintenance"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full p-2 border rounded-lg"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          required
        >
          <option value="">Sélectionner le type de maintenance</option>
          <option value="vidange">Vidange</option>
          <option value="changement_pneu">Changement de pneu</option>
          <option value="inspection">Inspection</option>
          <option value="reparation">Réparation</option>
        </select>

        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="w-full p-2 border rounded-lg"
          value={form.camionId}
          onChange={(e) => setForm({ ...form, camionId: e.target.value })}
          required
        >
          <option value="">Sélectionner un camion</option>
          {trucks?.map(truck => (
            <option key={truck._id} value={truck._id}>
              {truck.matricule} - {truck.marque} {truck.modele}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border rounded-lg"
          value={form.pneuId}
          onChange={(e) => setForm({ ...form, pneuId: e.target.value })}
        >
          <option value="">Sélectionner un pneu (optionnel)</option>
          {pneus?.map(pneu => (
            <option key={pneu._id} value={pneu._id}>
              {pneu.numeroSerie} - {pneu.marque} ({pneu.statut})
            </option>
          ))}
        </select>

        <input
          type="text"
          value={user?.name || user?.email || "Utilisateur connecté"}
          className="w-full p-2 border rounded-lg bg-gray-100"
          disabled
        />

        <div>
          <label className="block text-sm font-medium mb-1">Date programmée *</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg"
            value={form.programmeLe}
            onChange={(e) => setForm({ ...form, programmeLe: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date effectuée</label>
          <input
            type="date"
            placeholder="Date effectuée"
            className="w-full p-2 border rounded-lg"
            value={form.effectueLe}
            onChange={(e) => setForm({ ...form, effectueLe: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Coût</label>
          <input
            type="number"
            placeholder="Coût"
            className="w-full p-2 border rounded-lg"
            value={form.cout}
            onChange={(e) => setForm({ ...form, cout: e.target.value })}
            step="0.01"
            min="0"
          />
        </div>

        <div className="flex gap-2">
          <button 
            type="submit"
            className="flex-1 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            {editData ? "Modifier" : "Ajouter"}
          </button>
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
          >
            Annuler
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default MaintenanceForm;
