import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const res = await api.get("/trips");
      setTrips(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des trajets:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTrip = async (tripData) => {
    try {
      const res = await api.post("/trips", tripData);
      await fetchTrips();
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Erreur lors de la création du trajet:", err);
      const errorMessage = err.response?.data?.message || "Erreur lors de la création du trajet";
      return { success: false, error: errorMessage };
    }
  };

  const updateTrip = async (id, tripData) => {
    try {
      const res = await api.put(`/trips/${id}`, tripData);
      await fetchTrips();
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Erreur lors de la mise à jour du trajet:", err);
      const errorMessage = err.response?.data?.message || "Erreur lors de la mise à jour du trajet";
      return { success: false, error: errorMessage };
    }
  };

  const deleteTrip = async (id) => {
    try {
      await api.delete(`/trips/${id}`);
      setTrips((prev) => prev.filter((trip) => trip._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchTrips();
    }
  }, []);

  return (
    <TripContext.Provider
      value={{ trips, loading, fetchTrips, createTrip, updateTrip, deleteTrip }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
