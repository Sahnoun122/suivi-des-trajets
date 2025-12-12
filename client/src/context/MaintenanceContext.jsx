import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMaintenances = async () => {
    try {
      setLoading(true);
      const res = await api.get("/maintenance");
      setMaintenances(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createMaintenance = async (data) => {
    try {
      const res = await api.post("/maintenance", data);
      setMaintenances([...maintenances, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateMaintenance = async (id, data) => {
    try {
      const res = await api.put(`/maintenance/${id}`, data);
      setMaintenances(maintenances.map((m) => (m._id === id ? res.data : m)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MaintenanceContext.Provider
      value={{
        maintenances,
        loading,
        fetchMaintenances,
        createMaintenance,
        updateMaintenance,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = () => useContext(MaintenanceContext);
