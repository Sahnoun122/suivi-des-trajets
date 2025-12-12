import React, { useContext, useState } from "react";
import { TruckContext } from "../../context/TruckContext";
import TruckPopup from "../../components/admin/TruckPopup";

export default function Trucks() {
  const { trucks, deleteTruck } = useContext(TruckContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editTruck, setEditTruck] = useState(null);

  const handleEdit = (truck) => {
    setEditTruck(truck);
    setIsPopupOpen(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Gestion des camions</h1>
      <button
        onClick={() => {
          setEditTruck(null);
          setIsPopupOpen(true);
        }}
      >
        Ajouter un camion
      </button>

      <table
        border="1"
        cellPadding="10"
        style={{ marginTop: 20, width: "100%" }}
      >
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Année</th>
            <th>Tonnage</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trucks.map((truck) => (
            <tr key={truck._id}>
              <td>{truck.matricule}</td>
              <td>{truck.marque}</td>
              <td>{truck.modele}</td>
              <td>{truck.annee}</td>
              <td>{truck.tonnage}</td>
              <td>{truck.statut}</td>
              <td>
                <button onClick={() => handleEdit(truck)}>Modifier</button>
                <button onClick={() => deleteTruck(truck._id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TruckPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        editTruck={editTruck}
      />
    </div>
  );
}
