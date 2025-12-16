import { useState } from "react";
import TripForm from "../../components/admin/TripForm";
import { useTrip } from "../../context/TripContext";

const TripPage = () => {
  const { trips, loading, deleteTrip } = useTrip();
  const [editTrip, setEditTrip] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

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

  const getStatusColor = (statut) => {
    switch(statut) {
      case 'planifie': return 'bg-blue-100 text-blue-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'termine': return 'bg-green-100 text-green-800';
      case 'annule': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTrips = trips.filter(t => {
    if (!t || !t._id) return false;
    
    const matchesStatus = statusFilter === "all" || t.statut === statusFilter;
    
    return matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Gestion des Trajets</h1>
          <p className="text-sm sm:text-base text-gray-600">Planifiez et suivez tous vos trajets</p>
        </div>
        <button
          className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg text-sm sm:text-base"
          onClick={handleAdd}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Nouveau</span> Trajet
        </button>
      </div>

      <div className="flex justify-end mb-4 sm:mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm sm:text-base"
        >
          <option value="all">Tous les statuts</option>
          <option value="planifie">Planifié</option>
          <option value="en_cours">En cours</option>
          <option value="termine">Terminé</option>
          <option value="annule">Annulé</option>
        </select>
      </div>

      {openForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <TripForm editData={editTrip} onClose={closeForm} />
          </div>
        </div>
      )}

      {/* Trips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredTrips.map((t) => (
          <div key={t._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
            {/* Card Header */}
            <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">{t.reference}</h3>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mt-2 ${getStatusColor(t.statut)}`}>
                    {t.statut === 'planifie' ? 'Planifié' :
                     t.statut === 'en_cours' ? 'En cours' :
                     t.statut === 'termine' ? 'Terminé' :
                     t.statut === 'annule' ? 'Annulé' : t.statut}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">De: {t.origine}</p>
                  <p className="text-sm text-gray-500">Vers: {t.destination}</p>
                </div>
              </div>

              {t.pointsIntermediaires?.length > 0 && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Points intermédiaires:</p>
                    <p className="text-sm font-medium text-gray-900">{t.pointsIntermediaires.join(", ")}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Conducteur:</p>
                  <p className="font-medium text-gray-900">
                    {typeof t.chauffeurId === 'object' ? (t.chauffeurId?.name || "Non assigné") : (t.chauffeurId || "Non assigné")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Camion:</p>
                  <p className="font-medium text-gray-900">
                    {t.camionId?.matricule ? `${t.camionId.matricule}` : "Non assigné"}
                  </p>
                </div>
              </div>

              {(t.odometreDebut || t.carburantDepart) && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Données véhicule</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {t.odometreDebut && (
                      <div>
                        <span className="text-gray-500">Odomètre:</span>
                        <span className="ml-2 font-medium">{t.odometreDebut} km</span>
                      </div>
                    )}
                    {t.carburantDepart && (
                      <div>
                        <span className="text-gray-500">Carburant:</span>
                        <span className="ml-2 font-medium">{t.carburantDepart}L</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Card Actions */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                onClick={() => handleEdit(t)}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
                onClick={() => deleteTrip(t._id)}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
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
