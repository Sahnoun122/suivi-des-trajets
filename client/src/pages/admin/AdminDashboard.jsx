import { useEffect, useState } from "react";
import api from "../../api/api";
import Card from "../../components/admin/Card";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    drivers: 0,
    trucks: 0,
    remorques: 0,
    trips: 0,
    maintenance: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard Administrateur</h1>
        <p className="text-sm sm:text-base text-gray-600">Aperçu de votre flotte et opérations</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 sm:gap-6">
        <Card title="Conducteurs" value={stats.drivers} color="bg-gray-700" />
        <Card title="Camions" value={stats.trucks} color="bg-gray-800" />
        <Card title="Remorques" value={stats.remorques} color="bg-black" />
        <Card title="Pneus" value={stats.pneu} color="bg-gray-600" />
        <Card title="Trajets" value={stats.trips} color="bg-gray-900" />
        <Card
          title="Maintenance"
          value={stats.maintenance}
          color="bg-gray-500"
        />
      </div>
    </div>
  );
}
