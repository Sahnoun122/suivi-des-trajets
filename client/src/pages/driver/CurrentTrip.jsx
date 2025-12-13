import { useState } from "react";
import { useDriver } from "../../context/DriverContext";

export default function CurrentTrip() {
  const { trips, updateStatus, updateTripDetails } = useDriver();
  const [editingTrip, setEditingTrip] = useState(null);
  const [formData, setFormData] = useState({
    odometreDebut: "",
    odometreFin: "",
    carburantDepart: "",
    carburantFin: "",
    remarques: ""
  });

  const getStatusColor = (statut) => {
    switch (statut) {
      case "planifie": return "bg-blue-100 text-blue-800";
      case "en_cours": return "bg-yellow-100 text-yellow-800";
      case "termine": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (statut) => {
    switch (statut) {
      case "planifie": return "Planifié";
      case "en_cours": return "En cours";
      case "termine": return "Terminé";
      default: return statut;
    }
  };

  const getAvailableActions = (statut) => {
    switch (statut) {
      case "planifie":
        return [{ action: "en_cours", label: "Commencer", color: "bg-yellow-600 hover:bg-yellow-700" }];
      case "en_cours":
        return [{ action: "termine", label: "Terminer", color: "bg-green-600 hover:bg-green-700" }];
      case "termine":
        return [];
      default:
        return [];
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (tripId) => {
    try {
      await updateTripDetails(tripId, formData);
      setEditingTrip(null);
      alert("Trajet mis à jour avec succès!");
    } catch (err) {
      alert("Erreur lors de la mise à jour");
    }
  };

  const startEdit = (trip) => {
    setFormData({
      odometreDebut: trip.odometreDebut || "",
      odometreFin: trip.odometreFin || "",
      carburantDepart: trip.carburantDepart || "",
      carburantFin: trip.carburantFin || "",
      remarques: trip.remarques || ""
    });
    setEditingTrip(trip._id);
  };

  const handleStatusChange = async (tripId, newStatus) => {
    try {
      await updateStatus(tripId, newStatus);
      alert("Statut mis à jour avec succès!");
    } catch (err) {
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  if (trips.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Mes Trajets</h1>
        <p className="text-gray-500">Aucun trajet assigné</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">Mes Trajets</h1>
      
      {trips.filter(trip => trip && trip._id).map((trip) => (
        <div key={trip._id} className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{trip.reference}</h3>
              <p className="text-lg text-gray-700">
                <span className="font-semibold">Route:</span> {trip.origine} → {trip.destination}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(trip.statut || 'planifie')}`}>
              {getStatusLabel(trip.statut || 'planifie')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Odomètre début</p>
              <p className="font-semibold text-gray-800">{trip.odometreDebut || "Non renseigné"} km</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Odomètre fin</p>
              <p className="font-semibold text-gray-800">{trip.odometreFin || "Non renseigné"} km</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Carburant début</p>
              <p className="font-semibold text-gray-800">{trip.carburantDepart || "Non renseigné"} L</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Carburant fin</p>
              <p className="font-semibold text-gray-800">{trip.carburantFin || "Non renseigné"} L</p>
            </div>
          </div>

          {trip.remarques && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Remarques</p>
              <p className="font-semibold text-gray-800">{trip.remarques}</p>
            </div>
          )}

          {editingTrip === trip._id ? (
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Modifier les données du trajet</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Odomètre début (km)</label>
                  <input
                    type="number"
                    name="odometreDebut"
                    value={formData.odometreDebut}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 125000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Odomètre fin (km)</label>
                  <input
                    type="number"
                    name="odometreFin"
                    value={formData.odometreFin}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 125150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Carburant début (L)</label>
                  <input
                    type="number"
                    name="carburantDepart"
                    value={formData.carburantDepart}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 80"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Carburant fin (L)</label>
                  <input
                    type="number"
                    name="carburantFin"
                    value={formData.carburantFin}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 65"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Remarques</label>
                <textarea
                  name="remarques"
                  value={formData.remarques}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Ajoutez vos commentaires..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleSave(trip._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => setEditingTrip(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              {getAvailableActions(trip.statut || 'planifie').map((action) => (
                <button
                  key={action.action}
                  onClick={() => handleStatusChange(trip._id, action.action)}
                  className={`px-4 py-2 text-white rounded-lg font-medium ${action.color}`}
                >
                  {action.label}
                </button>
              ))}
              
              {(trip.statut || 'planifie') !== "termine" && (
                <button
                  onClick={() => startEdit(trip)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Modifier les données
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
