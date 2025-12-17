import { useDriver } from "../../context/DriverContext";

export default function DriverTrips() {
  const { trips, downloadPDF } = useDriver();

  const getStatusBadge = (status) => {
    const badges = {
      planifie: "bg-blue-100 text-blue-800",
      en_cours: "bg-yellow-100 text-yellow-800", 
      termine: "bg-green-100 text-green-800",
      annule: "bg-red-100 text-red-800"
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status) => {
    const texts = {
      planifie: "Planifié",
      en_cours: "En cours",
      termine: "Terminé", 
      annule: "Annulé"
    };
    return texts[status] || status;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Mes Trajets</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Consultez l'ensemble de vos trajets assignés et téléchargez les rapports
          </p>
          
          {trips?.length > 0 && (
            <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div className="ml-2 sm:ml-3">
                    <p className="text-blue-600 text-xs sm:text-sm font-semibold">Total</p>
                    <p className="text-blue-900 text-lg sm:text-xl font-bold">{trips.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-yellow-600 text-sm font-semibold">En cours</p>
                    <p className="text-yellow-900 text-xl font-bold">
                      {trips.filter(trip => trip.statut === 'en_cours').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-green-600 text-sm font-semibold">Terminés</p>
                    <p className="text-green-900 text-xl font-bold">
                      {trips.filter(trip => trip.statut === 'termine').length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V5a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6v4m-6 0v10a2 2 0 002 2h8a2 2 0 002-2V11" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-blue-600 text-sm font-semibold">Planifiés</p>
                    <p className="text-blue-900 text-xl font-bold">
                      {trips.filter(trip => trip.statut === 'planifie').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 sm:space-y-4">
          {!trips || trips.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun trajet assigné</h3>
              <p className="text-gray-600">Vos prochains trajets apparaîtront ici une fois assignés.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trips.map((trip) => (
                <div key={trip._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">{trip.reference || "Trajet"}</h3>
                        <p className="text-gray-600 text-sm">Mission transport</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(trip.statut)}`}>
                      {getStatusText(trip.statut)}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">📍 Origine</span>
                      <span className="font-semibold text-gray-900">{trip.origine}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">🎯 Destination</span>
                      <span className="font-semibold text-gray-900">{trip.destination}</span>
                    </div>
                    
                    {trip.dateDebut && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium">📅 Date début</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(trip.dateDebut).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {trip.dateFin && (
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span className="text-gray-600 font-medium">🏁 Date fin</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(trip.dateFin).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => downloadPDF && downloadPDF(trip._id)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Télécharger PDF
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
