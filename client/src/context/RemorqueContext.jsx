import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const RemorqueContext = createContext();

export function RemorqueProvider({ children }) {
  const [remorques, setRemorques] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRemorques = async () => {
    try {
      const res = await api.get("/remorques");
      setRemorques(res.data);
    } catch (err) {
      console.error("Erreur fetch remorques:", err);
    }
  };

  const createRemorque = async (data) => {
    try {
      const res = await api.post("/remorques", data);
      setRemorques((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Erreur création remorque:", err);
      throw err;
    }
  };

  const updateRemorque = async (id, data) => {
    try {
      const res = await api.put(`/remorques/${id}`, data);
      setRemorques((prev) => prev.map((r) => (r._id === id ? res.data : r)));
      return res.data;
    } catch (err) {
      console.error("Erreur update remorque:", err);
      throw err;
    }
  };

  const deleteRemorque = async (id) => {
    try {
      await api.delete(`/remorques/${id}`);
      setRemorques((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Erreur delete remorque:", err);
      throw err;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchRemorques().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading remorques...</div>;

  return (
    <RemorqueContext.Provider
      value={{ remorques, createRemorque, updateRemorque, deleteRemorque }}
    >
      {children}
    </RemorqueContext.Provider>
  );
}
