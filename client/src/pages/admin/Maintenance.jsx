import { useState } from "react";
import { useMaintenance } from "../../context/MaintenanceContext";
import MaintenanceForm from "../../components/admin/MaintenanceForm";

const MaintenancePage = () => {
  const { maintenances, fetchMaintenances } = useMaintenance();
  const [editMaintenance, setEditMaintenance] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleEdit = (m) => {
    setEditMaintenance(m);
    setOpenForm(true);
  };

  const handleAdd = () => {
    setEditMaintenance(null);
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    setEditMaintenance(null);
  };

  const getStatusColor = (effectueLe) => {
    return effectueLe ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getTypeColor = (type) => {
    switch(type?.toLowerCase()) {
      case 'preventive': return 'bg-blue-100 text-blue-800';
      case 'corrective': return 'bg-red-100 text-red-800';
      case 'revision': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMaintenances = maintenances.filter(m => {
    const matchesSearch = m.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.camionId?.matricule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.effectuePar?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "effectue" && m.effectueLe) ||
                         (statusFilter === "programme" && !m.effectueLe);
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Maintenances</h1>
          <p className="text-gray-600">Planifiez et suivez les maintenances de votre flotte</p>
        </div>
        <button
          className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-lg"
          onClick={handleAdd}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nouvelle Maintenance
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Rechercher par type, camion ou responsable..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        >
          <option value="all">Tous les statuts</option>
          <option value="programme">Programmé</option>
          <option value="effectue">Effectué</option>
        </select>
      </div>

      {openForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <MaintenanceForm
              editData={editMaintenance}
              onClose={closeForm}
            />
          </div>
        </div>
      )}

      {/* Maintenances Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMaintenances.map((m) => (
          <div key={m._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
            {/* Card Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{m.type}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(m.type)}`}>
                      {m.type}
                    </span>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(m.effectueLe)}`}>
                      {m.effectueLe ? 'Effectué' : 'Programmé'}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Camion</p>
                    <p className="font-medium text-gray-900">{m.camionId?.matricule || "N/A"}</p>
                  </div>
                </div>

                {m.pneuId && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Pneu</p>
                      <p className="font-medium text-gray-900">{m.pneuId.numeroSerie}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Effectué par</p>
                    <p className="font-medium text-gray-900">{m.effectuePar?.name || "Non assigné"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Dates et coût</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date programmée:</span>
                    <span className="font-medium">{new Date(m.programmeLe).toLocaleDateString()}</span>
                  </div>
                  {m.effectueLe && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date effectuée:</span>
                      <span className="font-medium">{new Date(m.effectueLe).toLocaleDateString()}</span>
                    </div>
                  )}
                  {m.cout && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Coût:</span>
                      <span className="font-medium">{m.cout} €</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                onClick={() => handleEdit(m)}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredMaintenances.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune maintenance trouvée</h3>
          <p className="mt-1 text-sm text-gray-500">Aucune maintenance ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
};

export default MaintenancePage;
