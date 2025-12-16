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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl text-center border border-gray-100 max-w-sm sm:max-w-md w-full mx-4">
        <div className="mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Bonjour {user?.name}</h1>
          <p className="text-sm sm:text-base text-gray-600">Redirection vers votre tableau de bord...</p>
        </div>
        
        <div className="flex flex-col gap-2 sm:gap-3">
          <button
            onClick={() => navigate(getDashboardRoute(user?.role))}
            className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg transform hover:scale-[1.02] text-sm sm:text-base"
          >
            Aller au tableau de bord
          </button>
          <button
            onClick={logout}
            className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 text-sm sm:text-base"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
