import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  const menu = [
    { label: "Dashboard", path: "/admin" },
    { label: "Chauffeurs", path: "/admin/drivers" },
    { label: "Camions", path: "/admin/trucks" },
    { label: "Remorques", path: "/admin/remorques" },
    { label: "Pneus", path: "/admin/pneus" },

    { label: "Trajets", path: "/admin/trips" },
    { label: "Maintenance", path: "/admin/maintenance" },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col h-screen">
      <div className="p-6 font-bold text-xl">Admin Transport</div>
      <nav className="flex-1 px-4">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded mb-2 font-medium transition
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={logout}
        className="p-4 text-red-500 hover:bg-red-50 font-medium"
      >
        Déconnexion
      </button>
    </aside>
  );
}
