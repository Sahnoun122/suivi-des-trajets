import { useFuelLog } from "../../context/FuelLogContext";
import { useState } from "react";
import FuelLogForm from "../../components/driver/FuelLogForm";

export default function FuelLogsPage() {
  const { logs, loading } = useFuelLog();
  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="text-gray-600 font-medium">Chargement des données...</span>
        </div>
      </div>
    );
  }

  const validLogs = logs?.filter(log => log && log._id) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Journal de Carburant
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Suivi des consommations et maintenance des véhicules
              </p>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors shadow-lg text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Nouvel</span> enregistrement
            </button>
          </div>
          
          {/* Statistiques rapides */}
          {validLogs.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <div className="ml-2 sm:ml-3">
                    <p className="text-blue-600 text-xs sm:text-sm font-semibold">Total logs</p>
                    <p className="text-blue-900 text-lg sm:text-xl font-bold">{validLogs.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-green-600 text-sm font-semibold">Total litres</p>
                    <p className="text-green-900 text-xl font-bold">
                      {validLogs.reduce((sum, log) => sum + (log.litres || 0), 0).toFixed(1)}L
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-yellow-600 text-sm font-semibold">Coût total</p>
                    <p className="text-yellow-900 text-xl font-bold">
                      {validLogs.reduce((sum, log) => sum + (log.cout || 0), 0).toFixed(2)}€
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-purple-600 text-sm font-semibold">Prix moyen/L</p>
                    <p className="text-purple-900 text-xl font-bold">
                      {validLogs.length > 0 ? (
                        validLogs.reduce((sum, log) => sum + (log.cout || 0), 0) / 
                        validLogs.reduce((sum, log) => sum + (log.litres || 0), 0)
                      ).toFixed(3) : '0.000'}€
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal du formulaire */}
        {showForm && <FuelLogForm close={() => setShowForm(false)} />}

        {/* Liste des logs */}
        <div className="space-y-4">
          {validLogs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun log de carburant</h3>
              <p className="text-gray-600 mb-6">Commencez par enregistrer votre première consommation de carburant.</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Ajouter un log
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {validLogs.map((log) => (
                <div key={log._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-900">Carburant</h3>
                        <p className="text-gray-600 text-sm">Log #{log._id.slice(-6)}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Validé
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">🚛 Camion</span>
                      <span className="font-semibold text-gray-900">
                        {log.camionId?.matricule || log.camionId}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">📍 Trajet</span>
                      <span className="font-semibold text-gray-900">
                        {log.trajetId?.reference || log.trajetId}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <p className="text-blue-600 text-sm font-medium">Litres</p>
                        <p className="text-blue-900 text-lg font-bold">{log.litres}L</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <p className="text-green-600 text-sm font-medium">Coût</p>
                        <p className="text-green-900 text-lg font-bold">{log.cout}€</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">📊 Odomètre</span>
                      <span className="font-semibold text-gray-900">{log.odometre?.toLocaleString()} km</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">👤 Saisi par</span>
                      <span className="font-semibold text-gray-900">
                        {typeof log.enregistrePar === 'object' 
                          ? (log.enregistrePar?.name || "Inconnu") 
                          : (log.enregistrePar || "Inconnu")
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
