import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user } = useContext(AuthContext);
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]); 

  const gere = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlLogin = async (e) => {
    e.preventDefault();
    try {
      await login(form);
    } catch (error) {
      alert("Erreur: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <form onSubmit={handlLogin}>
      <input
        type="text"
        name="email"
        value={form.email}
        onChange={gere}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={gere}
        placeholder="Password"
      />
      <button>Login</button>
    </form>
  );
}
