import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logout, getDashboardRoute } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role) {
      const dashboardRoute = getDashboardRoute(user.role);
      if (dashboardRoute !== "/dashboard") {
        navigate(dashboardRoute);
      }
    }
  }, [user, navigate, getDashboardRoute]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Bonjour {user?.name}</h1>
        <p className="text-gray-600 mb-4">Redirection vers votre tableau de bord...</p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(getDashboardRoute(user?.role))}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Aller au tableau de bord
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
