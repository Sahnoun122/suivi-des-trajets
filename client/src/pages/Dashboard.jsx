import { useContext } from "react";
import { AuthProvider } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthProvider);

  return (
    <div>
      <h1>مرحباً {user?.name}</h1>
      <button onClick={logout}><Deconnecter></Deconnecter></button>
    </div>
  );
}

export default Dashboard;
