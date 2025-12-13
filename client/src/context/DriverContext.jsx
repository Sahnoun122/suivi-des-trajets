import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const res = await api.get("/driver/my-trips");
      setTrips(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const downloadPDF = async (tripId) => {
    try {
      const res = await api.get(`/driver/${tripId}/pdf`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ordre_mission_${tripId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (tripId, statut) => {
    try {
      const res = await api.put(`/driver/${tripId}/status`, { statut });
      setTrips(trips.map((t) => (t._id === tripId ? res.data : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const updateTripDetails = async (tripId, details) => {
    try {
      const res = await api.put(`/driver/${tripId}/details`, details);
      setTrips(trips.map((t) => (t._id === tripId ? res.data : t)));
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
    <DriverContext.Provider
      value={{
        trips,
        loading,
        fetchTrips,
        downloadPDF,
        updateStatus,
        updateTripDetails,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export const useDriver = () => useContext(DriverContext);
