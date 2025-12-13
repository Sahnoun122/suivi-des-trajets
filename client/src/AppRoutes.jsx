import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import DriverNavbar from "./components/driver/DriverNavbar";
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverTrips from "./pages/driver/DriverTrips";
import CurrentTrip from "./pages/driver/CurrentTrip";
import TripReport from "./pages/driver/TripReport";
import DriverOrders from "./pages/driver/DriverOrders";
function DriverPage({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DriverNavbar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/driver"
        element={
          <PrivateRoute role="driver">
            <DriverPage>
              <DriverDashboard />
            </DriverPage>
          </PrivateRoute>
        }
      />

      <Route
        path="/driver/trips"
        element={
          <PrivateRoute role="driver">
            <DriverPage>
              <DriverTrips />
            </DriverPage>
          </PrivateRoute>
        }
      />

      <Route
        path="/driver/current-trip"
        element={
          <PrivateRoute role="driver">
            <DriverPage>
              <CurrentTrip />
            </DriverPage>
          </PrivateRoute>
        }
      />

      <Route
        path="/driver/trip-report"
        element={
          <PrivateRoute role="driver">
            <DriverPage>
              <TripReport />
            </DriverPage>
          </PrivateRoute>
        }
      />

      <Route
        path="/driver/order"
        element={
          <PrivateRoute role="driver">
            <DriverPage>
              <TripReport />
            </DriverPage>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
