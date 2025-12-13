import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function DriverNavbar() {
  const { logout } = useContext(AuthContext);

  const menu = [
    { label: "Dashboard", path: "/driver" },
    { label: "Mes trajets", path: "/driver/trips" },
    { label: "Trajet en cours", path: "/driver/current-trip" },
    { label: "Saisie véhicule", path: "/driver/trip-report" },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col h-screen">
      <div className="p-6 font-bold text-xl text-blue-600">Chauffeur Panel</div>

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
