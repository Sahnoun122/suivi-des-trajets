import { useState } from "react";
import { useMaintenance } from "../context/MaintenanceContext";

const MaintenanceForm = () => {
  const { createMaintenance } = useMaintenance();

  const [form, setForm] = useState({
    type: "",
    description: "",
    camionId: "",
    pneuId: "",
    effectuePar: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMaintenance(form);
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Ajouter Maintenance</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Type de maintenance"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="text"
          placeholder="Camion ID"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, camionId: e.target.value })}
        />

        <input
          type="text"
          placeholder="Pneu ID"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, pneuId: e.target.value })}
        />

        <input
          type="text"
          placeholder="Effectué par (User ID)"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, effectuePar: e.target.value })}
        />

        <input
          type="date"
          className="w-full p-2 border rounded-lg"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded-lg">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default MaintenanceForm;
