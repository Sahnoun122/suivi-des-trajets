import React, { useState, useContext } from "react";
import { RemorqueContext } from "../../context/RemorqueContext";

function RemorqueForm({ closeForm }) {
  const { createRemorque } = useContext(RemorqueContext);

  const [formData, setFormData] = useState({
    matricule: "",
    type: "benne",
    poidsVide: 0,
    poidsMax: 0,
    statut: "active",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRemorque(formData);
      closeForm();
    } catch (err) {
      alert("Erreur création remorque");
    }
  };

  return (
    <div className="popup-form">
      <form onSubmit={handleSubmit}>
        <h3>Ajouter une remorque</h3>
        <input
          type="text"
          name="matricule"
          placeholder="Matricule"
          value={formData.matricule}
          onChange={handleChange}
          required
        />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="benne">Benne</option>
          <option value="frigorifique">Frigorifique</option>
          <option value="plateau">Plateau</option>
          <option value="autre">Autre</option>
        </select>
        <input
          type="number"
          name="poidsVide"
          placeholder="Poids vide"
          value={formData.poidsVide}
          onChange={handleChange}
        />
        <input
          type="number"
          name="poidsMax"
          placeholder="Poids max"
          value={formData.poidsMax}
          onChange={handleChange}
        />
        <select name="statut" value={formData.statut} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit">Ajouter</button>
        <button type="button" onClick={closeForm}>
          Annuler
        </button>
      </form>
    </div>
  );
}

export default RemorqueForm;
