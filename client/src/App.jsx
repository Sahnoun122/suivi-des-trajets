import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./components/PrivateRoute";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Drivers from "./pages/admin/Drivers";
import Trucks from "./pages/admin/Trucks";
import Remorques from "./pages/admin/Remorques";
import TripPage from "./pages/admin/TripPage";
import MaintenancePage from "./pages/admin/Maintenance";
import Pneus from "./pages/admin/Pneus";

import DriverNavbar from "./components/driver/DriverNavbar";
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverTrips from "./pages/driver/DriverTrips";
import CurrentTrip from "./pages/driver/CurrentTrip";
import TripReport from "./pages/driver/TripReport";

function DriverPage({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DriverNavbar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute adminRequired={true}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="trucks" element={<Trucks />} />
          <Route path="remorques" element={<Remorques />} />
          <Route path="pneus" element={<Pneus />} />
          <Route path="trips" element={<TripPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
        </Route>

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
     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
