import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const FuelLogContext = createContext();

export const FuelLogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/fuelLogs");
      setLogs(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const createLog = async (data) => {
    try {
      const res = await api.post("/fuelLogs", data);
      setLogs([res.data, ...logs]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <FuelLogContext.Provider value={{ logs, loading, fetchLogs, createLog }}>
      {children}
    </FuelLogContext.Provider>
  );
};

export const useFuelLog = () => useContext(FuelLogContext);
