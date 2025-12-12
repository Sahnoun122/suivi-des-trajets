import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TruckProvider } from "./context/TruckContext"; // <-- à créer
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TruckProvider>
      <App />
    </TruckProvider>
  </AuthProvider>
);
