import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const PneuContext = createContext();

export function PneuProvider({ children }) {
  const [pneus, setPneus] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPneus = async () => {
    try {
      const res = await api.get("/pneus");
      setPneus(res.data);
    } catch (err) {
      console.error("Error fetching pneus:", err);
    } finally {
      setLoading(false);
    }
  };

  const createPneu = async (data) => {
    const res = await api.post("/pneus", data);
    setPneus((prev) => [...prev, res.data]);
    return res.data;
  };

  const updatePneu = async (id, data) => {
    const res = await api.put(`/pneus/${id}`, data);
    setPneus((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    return res.data;
  };

  const deletePneu = async (id) => {
    await api.delete(`/pneus/${id}`);
    setPneus((prev) => prev.filter((p) => p._id !== id));
  };

  useEffect(() => {
    fetchPneus();
  }, []);

  if (loading) return <div>Loading pneus...</div>;

  return (
    <PneuContext.Provider value={{ pneus, createPneu, updatePneu, deletePneu }}>
      {children}
    </PneuContext.Provider>
  );
}
