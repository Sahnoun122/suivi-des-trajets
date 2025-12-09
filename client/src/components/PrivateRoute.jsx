import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { Children } from "react";

const PrivateRoute = ({Children})=>{
    const user = useContext(AuthProvider);

    if(!user){
       return <Navigate to = "/login"/> 
    }

    return Children
}

export default PrivateRoute;