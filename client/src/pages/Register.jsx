import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";


export default function Register() {
  const { register } = useContext(AuthContext);
const navigate = useNavigate();
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

  const hadlRegister = async (e) => {
    e.preventDefault();
    await register(form);
    alert("connetcions avec succces ");
  };

  return (
    <form onSubmit={hadlRegister}>
      <input type="text" name="name" value={form.name} onChange={gere} />
      <input type="text" name="email" value={form.email} onChange={gere} />
      <input type="number" name="phone" value={form.phone} onChange={gere} />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={gere}
      />
      <input
        type="text"
        name="licenseNumber"
        value={form.licenseNumber}
        onChange={gere}
      />
      <button>Register</button>
    </form>
  );
}
