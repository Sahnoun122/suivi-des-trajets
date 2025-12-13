import { useEffect, useState } from "react";
import api from "../../api/api";

export default function DriverDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    enCours: 0,
    termine: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/trips?me=true");

        const total = res.data.length;
        const enCours = res.data.filter((t) => t.statut === "en_cours").length;
        const termine = res.data.filter((t) => t.statut === "termine").length;

        setStats({ total, enCours, termine });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Chauffeur</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Trajets assignés" value={stats.total} />
        <StatCard title="Trajet en cours" value={stats.enCours} />
        <StatCard title="Trajets terminés" value={stats.termine} />
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>

        <div className="flex gap-4 flex-wrap">
          <ActionButton label="Voir mes trajets" path="/driver/trips" />
          <ActionButton label="Trajet en cours" path="/driver/current-trip" />
          <ActionButton label="Saisie véhicule" path="/driver/trip-report" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold mt-2 text-blue-600">{value}</p>
    </div>
  );
}

function ActionButton({ label, path }) {
  return (
    <a
      href={path}
      className="px-5 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
    >
      {label}
    </a>
  );
}
