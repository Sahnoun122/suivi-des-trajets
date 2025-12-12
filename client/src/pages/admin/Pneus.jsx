import React, { useState, useContext } from "react";
import { PneuProvider, PneuContext } from "../../context/PneuContext";
import PneuForm from "../../components/admin/PneuForm";

export default function Pneus() {
  const { pneus, deletePneu } = useContext(PneuContext);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <div className="pneus-page max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Gestion des Pneus
      </h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
        onClick={() => {
          setOpenForm(true);
          setEditData(null);
        }}
      >
        Ajouter un pneu
      </button>

      {openForm && (
        <PneuForm
          closeForm={() => setOpenForm(false)}
          editData={editData}
          setEditData={setEditData}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">N° Série</th>
              <th className="px-4 py-2">Marque</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Kilométrage</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Monté sur</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pneus && pneus.length > 0 ? (
              pneus.map((p) => (
                <tr key={p._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{p.numeroSerie || 'N/A'}</td>
                  <td className="border px-4 py-2">{p.marque || 'N/A'}</td>
                  <td className="border px-4 py-2">{p.type || 'N/A'}</td>
                  <td className="border px-4 py-2">{p.kilometrage || 0}</td>
                  <td className="border px-4 py-2 capitalize">{p.statut || 'N/A'}</td>
                  <td className="border px-4 py-2">
                    {p.monteSur ? 
                      `${p.monteSur.typeMateriel || 'N/A'}${
                        p.monteSur.materielId?.matricule ? ` - ${p.monteSur.materielId.matricule}` :
                        p.monteSur.materielId?.numeroSerie ? ` - ${p.monteSur.materielId.numeroSerie}` :
                        typeof p.monteSur.materielId === 'string' ? ' (référence non trouvée)' :
                        ' (non spécifié)'
                      }` 
                      : 'Non monté'}
                  </td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => {
                        setEditData(p);
                        setOpenForm(true);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => deletePneu(p._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border px-4 py-2 text-center text-gray-500">
                  Aucun pneu trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


