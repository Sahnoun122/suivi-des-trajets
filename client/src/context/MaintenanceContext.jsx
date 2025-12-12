import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMaintenances = async () => {
    try {
      setLoading(true);
      const res = await api.get("/maintenances");
      setMaintenances(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createMaintenance = async (data) => {
    try {
      const res = await api.post("/maintenances", data);
      fetchMaintenances();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMaintenance = async (id, data) => {
    try {
      const res = await api.put(`/maintenances/${id}`, data);
      fetchMaintenances();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchMaintenances();
  }, []);

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
