import React, { useState, useContext } from "react";
import { PneuProvider, PneuContext } from "../../context/PneuContext";
import PneuForm from "../../components/admin/PneuForm";

function PneuPageContent() {
  const { pneus, deletePneu } = useContext(PneuContext);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const getStatusColor = (statut) => {
    switch(statut) {
      case 'neuf': return 'bg-green-100 text-green-800';
      case 'bon': return 'bg-blue-100 text-blue-800';
      case 'moyen': return 'bg-yellow-100 text-yellow-800';
      case 'use': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Gestion des Pneus</h1>
          <p className="text-sm sm:text-base text-gray-600">Suivez l'état et l'utilisation de vos pneus</p>
        </div>
        <button
          className="bg-gray-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg text-sm sm:text-base"
          onClick={() => {
            setOpenForm(true);
            setEditData(null);
          }}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Ajouter un</span> Pneu
        </button>
      </div>

      {openForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <PneuForm
              closeForm={() => setOpenForm(false)}
              editData={editData}
              setEditData={setEditData}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {pneus.length > 0 ? (
          pneus.map((pneu) => (
            <div key={pneu._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-xl flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{pneu.numeroSerie || 'N/A'}</h3>
                      <p className="text-xs sm:text-sm text-gray-500">{pneu.marque || 'Marque non définie'}</p>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(pneu.statut)}`}>
                    {pneu.statut === 'neuf' ? 'Neuf' :
                     pneu.statut === 'bon' ? 'Bon' :
                     pneu.statut === 'moyen' ? 'Moyen' :
                     pneu.statut === 'use' ? 'Usé' : pneu.statut || 'N/A'}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Type:</p>
                    <p className="font-medium text-gray-900">{pneu.type || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Kilémétrage</p>
                    <p className="font-medium text-gray-900">{pneu.kilometrage || 0} km</p>
                  </div>
                </div>

                {pneu.monteSur && (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Monté sur</h4>
                    <p className="text-sm text-gray-600">
                      {pneu.monteSur.typeMateriel || 'N/A'}
                      {pneu.monteSur.materielId?.matricule && ` - ${pneu.monteSur.materielId.matricule}`}
                      {pneu.monteSur.materielId?.numeroSerie && ` - ${pneu.monteSur.materielId.numeroSerie}`}
                    </p>
                    {pneu.monteSur.position && (
                      <p className="text-sm text-gray-500">Position: {pneu.monteSur.position}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setEditData(pneu);
                    setOpenForm(true);
                  }}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Modifier
                </button>
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
                  onClick={() => deletePneu(pneu._id)}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun pneu trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">Aucun pneu disponible.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Pneus() {
  return (
    <PneuProvider>
      <PneuPageContent />
    </PneuProvider>
  );
}


