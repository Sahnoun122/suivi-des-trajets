import { useFuelLog } from "../../context/FuelLogContext";
import { useState } from "react";
import FuelLogForm from "../../components/driver/FuelLogForm";

export default function FuelLogsPage() {
  const { logs, loading } = useFuelLog();
  const [showForm, setShowForm] = useState(false);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Saisie véhicule / Fuel Logs</h1>
      <button
        className="mb-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
        onClick={() => setShowForm(true)}
      >
        Ajouter un nouveau log
      </button>

      {showForm && <FuelLogForm close={() => setShowForm(false)} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {logs.filter(log => log && log._id).map((log) => (
          <div key={log._id} className="p-4 bg-white rounded-xl shadow">
            <p>
              <strong>Camion ID:</strong>{" "}
              {log.camionId?.matricule || log.camionId}
            </p>
            <p>
              <strong>Trajet ID:</strong>{" "}
              {log.trajetId?.reference || log.trajetId}
            </p>
            <p>
              <strong>Litres:</strong> {log.litres}
            </p>
            <p>
              <strong>Coût:</strong> {log.cout}
            </p>
            <p>
              <strong>Odometre:</strong> {log.odometre}
            </p>
            <p>
              <strong>Enregistré par:</strong>{" "}
              {typeof log.enregistrePar === 'object' ? (log.enregistrePar?.name || "Inconnu") : (log.enregistrePar || "Inconnu")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
