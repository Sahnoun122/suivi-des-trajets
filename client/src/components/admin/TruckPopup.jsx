import React, { useState, useContext, useEffect } from "react";
import { TruckContext } from "../../context/TruckContext";

export default function TruckPopup({ isOpen, onClose, editTruck }) {
  const { addTruck, updateTruck } = useContext(TruckContext);

  const [form, setForm] = useState({
    matricule: "",
    marque: "",
    modele: "",
    annee: "",
    tonnage: "",
    statut: "actif",
  });

  useEffect(() => {
    if (editTruck) {
      setForm(editTruck);
    }
  }, [editTruck]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTruck) {
      updateTruck(editTruck._id, form);
    } else {
      addTruck(form);
    }
    onClose();
    setForm({
      matricule: "",
      marque: "",
      modele: "",
      annee: "",
      tonnage: "",
      statut: "actif",
    });
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          width: 400,
        }}
      >
        <h2>{editTruck ? "Modifier un camion" : "Ajouter un camion"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Matricule"
            name="matricule"
            value={form.matricule}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Marque"
            name="marque"
            value={form.marque}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Modèle"
            name="modele"
            value={form.modele}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Année"
            name="annee"
            type="number"
            value={form.annee}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Tonnage"
            name="tonnage"
            type="number"
            value={form.tonnage}
            onChange={handleChange}
            required
          />
          <select name="statut" value={form.statut} onChange={handleChange}>
            <option value="actif">Actif</option>
            <option value="maintenance">Maintenance</option>
            <option value="inactif">Inactif</option>
          </select>
          <div style={{ marginTop: 10 }}>
            <button type="submit">{editTruck ? "Modifier" : "Ajouter"}</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
