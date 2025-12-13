import { useState } from "react";
import { useFuelLog } from "../../context/FuelLogContext";

export default function FuelLogForm({ close }) {
  const { createLog } = useFuelLog();
  const [form, setForm] = useState({
    camionId: "",
    trajetId: "",
    litres: "",
    cout: "",
    odometre: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createLog(form);
    setForm({ camionId: "", trajetId: "", litres: "", cout: "", odometre: "" });
    if (close) close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Saisie véhicule</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Camion ID"
            name="camionId"
            value={form.camionId}
            onChange={handleChange}
          />
          <Input
            label="Trajet ID"
            name="trajetId"
            value={form.trajetId}
            onChange={handleChange}
          />
          <Input
            label="Litres"
            name="litres"
            value={form.litres}
            onChange={handleChange}
          />
          <Input
            label="Coût"
            name="cout"
            value={form.cout}
            onChange={handleChange}
          />
          <Input
            label="Odometre"
            name="odometre"
            value={form.odometre}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-300"
              onClick={close}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded-lg"
      />
    </div>
  );
}
