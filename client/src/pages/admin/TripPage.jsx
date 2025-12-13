import { useState } from "react";
import TripForm from "../../components/admin/TripForm";
import { useTrip } from "../../context/TripContext";

const TripPage = () => {
  const { trips, loading, deleteTrip } = useTrip();
  const [editTrip, setEditTrip] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const handleEdit = (trip) => {
    setEditTrip(trip);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setEditTrip(null);
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    setEditTrip(null);
  };

  if (loading) return <p className="text-center">Chargement...</p>;

  return (
    <div className="trip-page max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Gestion des Trajets
      </h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
        onClick={handleAdd}
      >
        Ajouter un trajet
      </button>

      {openForm && (
        <TripForm editData={editTrip} onClose={closeForm} />
      )}

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
            <p>Chauffeur: {t.chauffeurId?.name || "Non assigné"}</p>
            <p>Camion: {t.camionId?.matricule ? `${t.camionId.matricule} - ${t.camionId.marque} ${t.camionId.modele || ''}` : "Non assigné"}</p>
            <p>Remorque: {t.remorqueId?.matricule ? `${t.remorqueId.matricule} - ${t.remorqueId.type}` : "Non assignée"}</p>
            <p>Statut: {t.statut}</p>
            <p>Odomètre début: {t.odometreDebut || "N/A"}</p>
            <p>Odomètre fin: {t.odometreFin || "N/A"}</p>
            <p>Carburant départ: {t.carburantDepart || "N/A"}</p>
            <p>Carburant fin: {t.carburantFin || "N/A"}</p>
            {t.remarques && (
              <p>Remarques: {t.remarques}</p>
            )}

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
