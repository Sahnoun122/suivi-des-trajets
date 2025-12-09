import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    } else {
      setLoading(false); 
    }
  }, [user, navigate]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  return <>{children}</>; 
}
