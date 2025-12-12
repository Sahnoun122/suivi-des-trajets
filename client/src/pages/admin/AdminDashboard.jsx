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
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card title="Drivers" value={stats.drivers} color="bg-blue-500" />
        <Card title="Camions" value={stats.trucks} color="bg-green-500" />
        <Card title="Remorques" value={stats.remorques} color="bg-yellow-500" />
        <Card title="Pneu" value={stats.pneu} color="bg-yellow-500" />

        <Card title="Trajets" value={stats.trips} color="bg-red-500" />
        <Card
          title="Maintenance"
          value={stats.maintenance}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
}
