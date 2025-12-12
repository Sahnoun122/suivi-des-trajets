import React, { useState, useContext, useEffect } from "react";
import { RemorqueContext } from "../../context/RemorqueContext";

function RemorqueForm({ closeForm, editData, setEditData }) {
  const { createRemorque, updateRemorque } = useContext(RemorqueContext);

  const [formData, setFormData] = useState({
    matricule: "",
    type: "benne",
    poidsVide: 0,
    poidsMax: 0,
    statut: "active",
  });

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData) {
        await updateRemorque(editData._id, formData);
        setEditData(null);
      } else {
        await createRemorque(formData);
      }
      setFormData({
        matricule: "",
        type: "benne",
        poidsVide: 0,
        poidsMax: 0,
        statut: "active",
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
          {editData ? "Modifier Remorque" : "Ajouter Remorque"}
        </h3>

        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="text"
          name="matricule"
          placeholder="Matricule"
          value={formData.matricule}
          onChange={handleChange}
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="benne">Benne</option>
          <option value="frigorifique">Frigorifique</option>
          <option value="plateau">Plateau</option>
          <option value="autre">Autre</option>
        </select>

        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="number"
          name="poidsVide"
          placeholder="Poids vide"
          value={formData.poidsVide}
          onChange={handleChange}
        />
        <input
          className="w-full border border-gray-300 rounded-md p-2"
          type="number"
          name="poidsMax"
          placeholder="Poids max"
          value={formData.poidsMax}
          onChange={handleChange}
        />

        <select
          name="statut"
          value={formData.statut}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="inactive">Inactive</option>
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

export default RemorqueForm;
