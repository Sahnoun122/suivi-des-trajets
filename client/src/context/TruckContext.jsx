import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const TruckContext = createContext();

export function TruckProvider({ children }) {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTrucks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/trucks");
      setTrucks(res.data);
    } catch (err) {
      console.error(err.message);
    }
    setLoading(false);
  };

  const addTruck = async (truckData) => {
    try {
      const res = await api.post("/trucks", truckData);
      setTrucks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTruck = async (id, truckData) => {
    try {
      const res = await api.put(`/trucks/${id}`, truckData);
      setTrucks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTruck = async (id) => {
    try {
      await api.delete(`/trucks/${id}`);
      setTrucks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTrucks();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <TruckContext.Provider
      value={{ trucks, addTruck, updateTruck, deleteTruck }}
    >
      {children}
    </TruckContext.Provider>
  );
}
