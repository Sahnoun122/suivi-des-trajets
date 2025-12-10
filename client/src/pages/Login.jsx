import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const gere = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let err = {};

    if (!form.email.trim()) {
      err.email = "Email obligatoire.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Email n'est pas valide.";
    }

    if (!form.password.trim()) {
      err.password = "Mot de passe obligatoire.";
    } else if (form.password.length < 6) {
      err.password = "Le mot de passe doit contenir au moins 6 caractères.";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handlLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await login(form);
    } catch (error) {
      alert("Erreur: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handlLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={gere}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="exemple@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={gere}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
