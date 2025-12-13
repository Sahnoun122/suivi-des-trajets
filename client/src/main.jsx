import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TruckProvider } from "./context/TruckContext"; 
import { RemorqueProvider } from "./context/RemorqueContext";
import { PneuProvider } from "./context/PneuContext";
import { MaintenanceProvider } from "./context/MaintenanceContext";
import { TripProvider } from "./context/TripContext";
import { DriverProvider } from "./context/DriverContext";
import { FuelLogProvider } from "./context/FuelLogContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TruckProvider>
      <RemorqueProvider>
        <PneuProvider>
          <MaintenanceProvider>
            <TripProvider>
              <DriverProvider>
                <FuelLogProvider>
                  <App />
                </FuelLogProvider>
              </DriverProvider>
            </TripProvider>
          </MaintenanceProvider>
        </PneuProvider>
      </RemorqueProvider>
    </TruckProvider>
  </AuthProvider>
);
