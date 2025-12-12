import React, { useState, useContext } from "react";
import {
  RemorqueProvider,
  RemorqueContext,
} from "../../context/RemorqueContext";
import RemorqueForm from "../../components/admin/RemorqueForm";

function RemorquesPageContent() {
  const { remorques, deleteRemorque } = useContext(RemorqueContext);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  return (
    <div className="remorques-page max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Gestion des Remorques
      </h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-700"
        onClick={() => {
          setOpenForm(true);
          setEditData(null);
        }}
      >
        Ajouter une remorque
      </button>

      {openForm && (
        <RemorqueForm
          closeForm={() => setOpenForm(false)}
          editData={editData}
          setEditData={setEditData}
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Matricule</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Poids Vide</th>
              <th className="px-4 py-2">Poids Max</th>
              <th className="px-4 py-2">Statut</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {remorques.map((r) => (
              <tr key={r._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{r.matricule}</td>
                <td className="border px-4 py-2">{r.type}</td>
                <td className="border px-4 py-2">{r.poidsVide}</td>
                <td className="border px-4 py-2">{r.poidsMax}</td>
                <td className="border px-4 py-2 capitalize">{r.statut}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    onClick={() => {
                      setEditData(r);
                      setOpenForm(true);
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => deleteRemorque(r._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Remorques() {
  return (
    <RemorqueProvider>
      <RemorquesPageContent />
    </RemorqueProvider>
  );
}
