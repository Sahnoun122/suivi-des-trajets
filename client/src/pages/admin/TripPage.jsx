import { useState } from "react";
import TripForm from "../../components/admin/TripForm";
import { useTrip } from "../../context/TripContext";
const TripPage = () => {
  const { trips, loading, deleteTrip } = useTrip();
  const [editTrip, setEditTrip] = useState(null);

  const handleEdit = (trip) => {
    setEditTrip(trip);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <p className="text-center">Chargement...</p>;

  return (
    <div className="p-8">
      <TripForm editData={editTrip} onClose={() => setEditTrip(null)} />

      <h2 className="text-2xl font-bold mb-4">Liste des Trajets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map((t) => (
          <div key={t._id} className="p-4 shadow-md bg-white rounded-xl">
            <h3 className="text-lg font-bold">{t.reference}</h3>
            <p>Origine: {t.origine}</p>
            <p>Destination: {t.destination}</p>
            <p>
              Points intermédiaires:{" "}
              {t.pointsIntermediaires?.length > 0
                ? t.pointsIntermediaires.join(", ")
                : "N/A"}
            </p>
            <p>Chauffeur: {t.chauffeurId?.name || "N/A"}</p>
            <p>Camion: {t.camionId?.matricule || "N/A"}</p>
            <p>Remorque: {t.remorqueId?.matricule || "N/A"}</p>
            <p>Statut: {t.statut}</p>
            <p>Odomètre début: {t.odometreDebut || "N/A"}</p>
            <p>Odomètre fin: {t.odometreFin || "N/A"}</p>
            <p>Carburant départ: {t.carburantDepart || "N/A"}</p>
            <p>Carburant fin: {t.carburantFin || "N/A"}</p>

            <div className="mt-2 flex gap-2">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => handleEdit(t)}
              >
                Modifier
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => deleteTrip(t._id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripPage;
