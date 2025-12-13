import { useDriver } from "../../context/DriverContext";

export default function DriverTrips() {
  const { trips, downloadPDF } = useDriver();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Mes trajets</h1>

      {trips.map((trip) => (
        <div key={trip._id} className="bg-white p-5 rounded-xl shadow mb-4">
          <p className="font-bold">
            {trip.origine} → {trip.destination}
          </p>
          <p className="text-sm text-gray-600">Statut : {trip.statut}</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => downloadPDF(trip._id)}
          >
            Télécharger PDF
          </button>
        </div>
      ))}
    </div>
  );
}
