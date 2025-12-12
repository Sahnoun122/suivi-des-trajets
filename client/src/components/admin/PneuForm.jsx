// src/components/pneus/PneuForm.jsx
import React, { useState, useContext, useEffect } from "react";
import { PneuContext } from "../../context/PneuContext";
import { TruckContext } from "../../context/TruckContext";
import { RemorqueContext } from "../../context/RemorqueContext";

function PneuForm({ closeForm, editData, setEditData }) {
  const { createPneu, updatePneu } = useContext(PneuContext);
  const { trucks } = useContext(TruckContext);
  const { remorques } = useContext(RemorqueContext);

  const [formData, setFormData] = useState({
    numeroSerie: "",
    marque: "",
    type: "",
    kilometrage: 0,
    statut: "bon",
    monteSurType: "Truck",
    materielId: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        numeroSerie: editData.numeroSerie,
        marque: editData.marque,
        type: editData.type,
        kilometrage: editData.kilometrage,
        statut: editData.statut,
        monteSurType: editData.monteSur.typeMateriel,
        materielId: editData.monteSur.materielId,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "monteSurType") {
      // Réinitialiser materielId quand on change le type
      setFormData({ ...formData, [name]: value, materielId: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        numeroSerie: formData.numeroSerie,
        marque: formData.marque,
        type: formData.type,
        kilometrage: formData.kilometrage,
        statut: formData.statut,
        monteSur: {
          typeMateriel: formData.monteSurType,
          materielId: formData.materielId,
        },
      };

      if (editData) {
        await updatePneu(editData._id, payload);
        setEditData(null);
      } else {
        await createPneu(payload);
      }
      setFormData({
        numeroSerie: "",
        marque: "",
        type: "",
        kilometrage: 0,
        statut: "bon",
        monteSurType: "Truck",
        materielId: "",
      });
      closeForm();
    } catch (err) {
      alert("Erreur lors de la sauvegarde !");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h3 className="text-xl font-bold text-gray-800">
          {editData ? "Modifier Pneu" : "Ajouter Pneu"}
        </h3>

        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="text"
          name="numeroSerie"
          placeholder="Numéro de série"
          value={formData.numeroSerie}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="text"
          name="marque"
          placeholder="Marque"
          value={formData.marque}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="number"
          name="kilometrage"
          placeholder="Kilométrage"
          value={formData.kilometrage}
          onChange={handleChange}
        />

        <select
          name="statut"
          value={formData.statut}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="bon">Bon</option>
          <option value="a_remplacer">À remplacer</option>
          <option value="endommagé">Endommagé</option>
        </select>

        <select
          name="monteSurType"
          value={formData.monteSurType}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="Truck">Truck</option>
          <option value="Remorque">Remorque</option>
        </select>

        <select
          name="materielId"
          value={formData.materielId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        >
          <option value="">Sélectionner un véhicule</option>
          {formData.monteSurType === "Truck" && trucks.map(truck => (
            <option key={truck._id} value={truck._id}>
              {truck.matricule} - {truck.marque} {truck.modele}
            </option>
          ))}
          {formData.monteSurType === "Remorque" && remorques.map(remorque => (
            <option key={remorque._id} value={remorque._id}>
              {remorque.numeroSerie} - {remorque.type}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editData ? "Modifier" : "Ajouter"}
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={closeForm}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default PneuForm;
