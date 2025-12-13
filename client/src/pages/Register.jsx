import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register, getDashboardRoute } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    licenseNumber: "",
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
      newErrors.email = "Email valide requis";
    if (!form.phone.trim()) newErrors.phone = "Le téléphone est obligatoire";
    if (!form.password || form.password.length < 6)
      newErrors.password = "Mot de passe min 6 caractères";
    if (!form.licenseNumber.trim()) newErrors.licenseNumber = "Numéro de permis obligatoire";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const hadlRegister = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const userData = await register({...form, role: "driver"});
      alert("Inscription avec succès");
      const dashboardRoute = getDashboardRoute(userData.role);
      navigate(dashboardRoute);
    } catch (error) {
      alert("Erreur: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">TruckFlow</h1>
          </div>
        </div>

        <form
          onSubmit={hadlRegister}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Inscription</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={gere}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              placeholder="Votre nom complet"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Adresse Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={gere}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              placeholder="exemple@gmail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={gere}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              placeholder="+33 6 12 34 56 78"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={gere}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Numéro de permis</label>
            <input
              type="text"
              name="licenseNumber"
              value={form.licenseNumber}
              onChange={gere}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 bg-gray-50"
              placeholder="Numéro de permis de conduire"
            />
            {errors.licenseNumber && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.licenseNumber}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white p-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 mt-8 shadow-lg transform hover:scale-[1.02]"
          >
            S'inscrire
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-gray-900 font-semibold hover:text-gray-700 transition-colors">
                Se connecter
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
