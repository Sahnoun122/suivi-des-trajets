import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>bonjour {user?.name}</h1>

      <h1>khadija sahnoun</h1>
    </div>
  );
}

export default Dashboard;
