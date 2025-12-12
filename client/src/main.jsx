import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TruckProvider } from "./context/TruckContext"; 
import { RemorqueProvider } from "./context/RemorqueContext";
import { PneuProvider } from "./context/PneuContext";
import { MaintenanceProvider } from "./context/MaintenanceContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TruckProvider>
      <RemorqueProvider>
        <PneuProvider>
          <MaintenanceProvider>
            <App />
          </MaintenanceProvider>
        </PneuProvider>
      </RemorqueProvider>
    </TruckProvider>
  </AuthProvider>
);
