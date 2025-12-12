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
      console.error("Erreur fetch pneus:", err);
    }
  };

  const createPneu = async (data) => {
    try {
      const res = await api.post("/pneus", data);
      setPneus((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Erreur création pneu:", err);
      throw err;
    }
  };

  const updatePneu = async (id, data) => {
    try {
      const res = await api.put(`/pneus/${id}`, data);
      setPneus((prev) => prev.map((p) => (p._id === id ? res.data : p)));
      return res.data;
    } catch (err) {
      console.error("Erreur update pneu:", err);
      throw err;
    }
  };

  const deletePneu = async (id) => {
    try {
      await api.delete(`/pneus/${id}`);
      setPneus((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Erreur delete pneu:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchPneus().finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-10">Loading pneus...</div>;

  return (
    <PneuContext.Provider value={{ pneus, createPneu, updatePneu, deletePneu }}>
      {children}
    </PneuContext.Provider>
  );
}
