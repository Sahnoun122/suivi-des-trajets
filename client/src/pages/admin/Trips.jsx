import { useTrip } from "../../context/TripContext";
import { Link } from "react-router-dom";

const Trips = () => {
  const { trips, loading } = useTrip();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trajets</h1>
          <p className="text-gray-600">Aperçu de tous les trajets</p>
        </div>
        <Link
          to="/admin/trip"
          className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Gérer les Trajets
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Trajets</h3>
            <p className="text-3xl font-bold text-gray-900">{trips.length}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">En Cours</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {trips.filter(t => t.statut === 'en_cours').length}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Terminés</h3>
            <p className="text-3xl font-bold text-green-600">
              {trips.filter(t => t.statut === 'termine').length}
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-4">Accédez à la gestion complète des trajets</p>
          <Link
            to="/admin/trip"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Voir tous les trajets
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Trips;