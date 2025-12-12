import React, { useEffect, useState } from "react";
import api from "../../api/api";

function Drivers() {
    
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await api.get("/users/drivers");
      setDrivers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStatus = async (id) => {
    try {
      await api.patch(`/users/drivers/${id}/toggle-status`);
      fetchDrivers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Liste des Drivers</h2>
      <table className="drivers-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver._id}>
              <td>{driver.name}</td>
              <td>{driver.email}</td>
              <td>{driver.phone}</td>
              <td>{driver.status}</td>
              <td>
                <button onClick={() => toggleStatus(driver._id)}>
                  {driver.status === "active" ? "Désactiver" : "Activer"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Drivers;
