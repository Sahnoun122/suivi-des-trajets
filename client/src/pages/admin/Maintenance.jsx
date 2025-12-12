import { useState } from "react";
import { useMaintenance } from "../../context/MaintenanceContext";
import MaintenanceForm from "../../components/admin/MaintenanceForm";
const MaintenancePage = () => {
  const { maintenances, fetchMaintenances } = useMaintenance();
  const [editMaintenance, setEditMaintenance] = useState(null);

  const handleEdit = (m) => {
    setEditMaintenance(m);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-8">
      <MaintenanceForm
        editData={editMaintenance}
        onClose={() => setEditMaintenance(null)}
      />

      <h2 className="text-2xl font-bold mb-4">Liste des Maintenances</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {maintenances.map((m) => (
          <div key={m._id} className="p-4 shadow-md bg-white rounded-xl">
            <h3 className="text-lg font-bold">{m.type}</h3>
            <p>Camion: {m.camionId?.matricule || "N/A"}</p>
            <p>Pneu: {m.pneuId?.numeroSerie || "N/A"}</p>
            <p>Effectué par: {m.effectuePar?.name || "N/A"}</p>
            <p>
              Date programme: {new Date(m.programmeLe).toLocaleDateString()}
            </p>
            <p>
              Date effectué:{" "}
              {m.effectueLe
                ? new Date(m.effectueLe).toLocaleDateString()
                : "N/A"}
            </p>
            <p>Coût: {m.cout || "N/A"}</p>

            <button
              className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              onClick={() => handleEdit(m)}
            >
              Modifier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenancePage;
