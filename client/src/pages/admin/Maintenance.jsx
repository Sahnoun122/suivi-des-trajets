import { useState } from "react";
import { useMaintenance } from "../../context/MaintenanceContext";
import MaintenanceForm from "../../components/admin/MaintenanceForm";

const MaintenancePage = () => {
  const { maintenances, fetchMaintenances } = useMaintenance();
  const [editMaintenance, setEditMaintenance] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleEdit = (m) => {
    setEditMaintenance(m);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setEditMaintenance(null);
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    setEditMaintenance(null);
  };

  return (
    <div className="maintenance-page max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Gestion des Maintenances
      </h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
        onClick={handleAdd}
      >
        Ajouter une maintenance
      </button>

      {openForm && (
        <MaintenanceForm
          editData={editMaintenance}
          onClose={closeForm}
        />
      )}

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
