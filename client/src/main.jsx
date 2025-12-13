import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TruckProvider } from "./context/TruckContext"; 
import { RemorqueProvider } from "./context/RemorqueContext";
import { PneuProvider } from "./context/PneuContext";
import { MaintenanceProvider } from "./context/MaintenanceContext";
import { TripProvider } from "./context/TripContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <AuthProvider>
    <TruckProvider>
      <RemorqueProvider>
        <PneuProvider>
          <MaintenanceProvider>
            <TripProvider>
              <App />
            </TripProvider>
          </MaintenanceProvider>
        </PneuProvider>
      </RemorqueProvider>
    </TruckProvider>
  </AuthProvider>


);
