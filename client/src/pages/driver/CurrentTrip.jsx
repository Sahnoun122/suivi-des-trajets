import { useState } from "react";
import { useDriver } from "../../context/DriverContext";

export default function CurrentTrip() {
  const { trips, updateStatus, updateTripDetails } = useDriver();

  const getStatusBadge = (status) => {
    const badges = {
      planifie: "bg-blue-100 text-blue-800",
      en_cours: "bg-yellow-100 text-yellow-800",
      termine: "bg-green-100 text-green-800"
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status) => {
    const texts = {
      planifie: "Planifié",
      en_cours: "En cours", 
      termine: "Terminé"
    };
    return texts[status] || status;
  };

  const getAvailableActions = (status) => {
    switch (status) {
      case "planifie":
        return [{ action: "en_cours", label: "Commencer", color: "bg-yellow-600 hover:bg-yellow-700" }];
      case "en_cours":
        return [{ action: "termine", label: "Terminer", color: "bg-green-600 hover:bg-green-700" }];
      default:
        return [];
    }
  };

  const handleStatusChange = async (tripId, newStatus) => {
    try {
      await updateStatus(tripId, newStatus);
      alert("Statut mis à jour avec succès!");
    } catch (err) {
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  if (!trips || trips.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Trajet en Cours</h1>
            <p className="text-gray-600">Aucun trajet assigné pour le moment</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trajet en Cours</h1>
          <p className="text-gray-600">Gérez vos trajets actifs et mettez à jour les informations</p>
        </div>

        {/* Liste des trajets - Grid 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {trips.filter(trip => trip && trip._id).map((trip) => (
            <div key={trip._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow h-fit">
              {/* En-tête compacte */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-gray-900 truncate">{trip.reference || "Trajet"}</h3>
                    <p className="text-xs text-gray-600 truncate">
                      {trip.origine} → {trip.destination}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${getStatusBadge(trip.statut || 'planifie')}`}>
                  {getStatusText(trip.statut || 'planifie')}
                </span>
              </div>

              {/* Données du trajet - Stack vertical pour optimiser l'espace */}
              <div className="space-y-2 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">Odomètre début</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {trip.odometreDebut ? `${trip.odometreDebut} km` : "—"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">Odomètre fin</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {trip.odometreFin ? `${trip.odometreFin} km` : "—"}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">Carburant début</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {trip.carburantDepart ? `${trip.carburantDepart} L` : "—"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">Carburant fin</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {trip.carburantFin ? `${trip.carburantFin} L` : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Remarques - Plus compactes */}
              {trip.remarques && (
                <div className="mb-4 p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-blue-600 font-medium mb-1">Remarques</p>
                  <p className="text-xs text-blue-900 line-clamp-2">{trip.remarques}</p>
                </div>
              )}

              {/* Boutons d'actions - Empilés verticalement */}
              <div className="space-y-2 pt-3 border-t border-gray-100">
                {getAvailableActions(trip.statut || 'planifie').map((action) => (
                  <button
                    key={action.action}
                    onClick={() => handleStatusChange(trip._id, action.action)}
                    className={`w-full px-3 py-2 text-sm text-white rounded-lg font-medium transition-colors ${action.color}`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
