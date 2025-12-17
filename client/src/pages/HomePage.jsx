import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const { user, getDashboardRoute } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const dashboardRoute = getDashboardRoute(user.role);
      navigate(dashboardRoute);
    }
  }, [user, navigate, getDashboardRoute]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">TruckFlow</h1>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Link
                to="/login"
                className="px-3 py-2 sm:px-4 sm:py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors border border-gray-300 rounded-lg hover:border-gray-400 text-sm sm:text-base text-center"
              >
                Connexion
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 sm:px-4 sm:py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-lg text-sm sm:text-base text-center"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 lg:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
            Gestion Intelligente de
            <span className="text-gray-700 block">Vos Trajets</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Optimisez la gestion de vos flottes de transport avec notre plateforme moderne. 
            Suivez vos trajets, gérez vos véhicules et votre équipe en temps réel.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              to="/register"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gray-900 text-white text-base sm:text-lg font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Commencer Gratuitement
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-900 text-base sm:text-lg font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 border-2 border-gray-300 hover:border-gray-400 shadow-lg"
            >
              Se Connecter
            </Link>
          </div>
        </div>

        <div className="py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités Principales
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4">
              Tout ce dont vous avez besoin pour gérer efficacement vos transports
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3v10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Suivi des Trajets</h3>
              <p className="text-gray-600">
                Suivez en temps réel tous vos trajets, de la planification à la livraison finale.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Gestion Véhicules</h3>
              <p className="text-gray-600">
                Gérez votre flotte, maintenances, carburant et assignation des conducteurs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Rapports Détaillés</h3>
              <p className="text-gray-600">
                Générez des rapports PDF complets et suivez les performances de votre équipe.
              </p>
            </div>
          </div>
        </div>

        <div className="py-20 text-center bg-white rounded-3xl shadow-2xl mx-4 border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Prêt à optimiser vos transports ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez les entreprises qui font confiance à TruckFlow pour gérer leurs flottes de transport.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Créer un Compte
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-gray-100 text-gray-900 text-lg font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 border border-gray-300"
            >
              J'ai déjà un compte
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">TruckFlow</span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2025 TruckFlow. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}