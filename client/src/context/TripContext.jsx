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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createTrip = async (tripData) => {
    try {
      const res = await api.post("/trips", tripData);
      setTrips((prev) => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTrip = async (id, tripData) => {
    try {
      const res = await api.put(`/trips/${id}`, tripData);
      setTrips((prev) =>
        prev.map((trip) => (trip._id === id ? res.data : trip))
      );
    } catch (err) {
      console.error(err);
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
    fetchTrips();
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
