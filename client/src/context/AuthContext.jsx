import { createContext , useContext , useState , useEffect ,  } from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/api";


const AuthContext = createContext();

export function AuthProvider({children}){

    const[user , setUser]= useState(null);


   useEffect(()=>{

    if(token){
       api
         .post("/auth")
         .then((res) => setUser(res.data.user))
         .catch(() => setUser(null));
 }

   }, []);
  
   const login = async(email , password)=>{
        const res = await api.post("/auth/login" , {email , password});
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
  
   }

   const register = async(name, eamil, phone, password, role, licenseNumber , status)=>{

    const res = await api.post("/auth/rgister", {
      name,
      eamil,
      phone,
      password,
      role,
      licenseNumber,
      status,
    });

    localStorage.setItem("token" , res.data.token);
    setUser(res.data.user);
   };

   const logout= ()=>{
    localStorage.removeItem("token");
    setUser(null)
   };

   return(
    <AuthContext.Provider value={{ user , login , register , logout , }}>
        {children}
    </AuthContext.Provider>
   )

}
