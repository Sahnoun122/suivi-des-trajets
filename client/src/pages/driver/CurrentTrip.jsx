import { useDriver } from "../../context/DriverContext";

export default function CurrentTrip() {
  const { trips, updateStatus } = useDriver();
  const trip = trips.find((t) => t.statut === "en_cours");

  if (!trip) return <p>Pas de trajet en cours</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Trajet en cours</h1>
      <p>
        {trip.origine} → {trip.destination}
      </p>
      <p className="mt-2">Statut : {trip.statut}</p>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => updateStatus(trip._id, "en_cours")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          En cours
        </button>
        <button
          onClick={() => updateStatus(trip._id, "termine")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Terminé
        </button>
      </div>
    </div>
  );
}
