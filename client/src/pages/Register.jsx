import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    licenseNumber: "",
    role: "driver",
    status: "inactive",
  });

  const gere = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Le nom est obligatoire";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      newErrors.email = "Email invalide";
    if (!form.phone.trim() || form.phone.length < 8)
      newErrors.phone = "Téléphone invalide";
    if (!form.password.trim() || form.password.length < 6)
      newErrors.password = "Mot de passe trop court";
    if (!form.licenseNumber.trim())
      newErrors.licenseNumber = "Numéro de licence obligatoire";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hadlRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await register(form);
    alert("Connexion avec succès");
    navigate("/dashboard");
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
        <form
          onSubmit={hadlRegister}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Inscription</h2>

          <div>
            <label className="block mb-1">Nom</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={gere}
              className="w-full p-2 border rounded-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={gere}
              className="w-full p-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Téléphone</label>
            <input
              type="number"
              name="phone"
              value={form.phone}
              onChange={gere}
              className="w-full p-2 border rounded-lg"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={gere}
              className="w-full p-2 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Numéro de licence</label>
            <input
              type="text"
              name="licenseNumber"
              value={form.licenseNumber}
              onChange={gere}
              className="w-full p-2 border rounded-lg"
            />
            {errors.licenseNumber && (
              <p className="text-red-500 text-sm">{errors.licenseNumber}</p>
            )}
          </div>

          <button className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            S'inscrire
          </button>
        </form>
      </div>
    </>
  );
}
