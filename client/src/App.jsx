import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./components/PrivateRoute";

import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          {/* <Route path="drivers" element={<Drivers />} />
          <Route path="trucks" element={<Trucks />} />
          <Route path="remorques" element={<Remorques />} />
          <Route path="trips" element={<Trips />} />
          <Route path="maintenance" element={<Maintenance />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
