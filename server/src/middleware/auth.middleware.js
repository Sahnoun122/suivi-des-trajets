import { verifyToken } from "../config/jwt";
import userModel from "../models/user.model";


export const authenticateToken = async(req , res , next)=>{
    try {
        const authheader = req.headers['authorization'];
        const token = authheader && authheader.split(' ')[1];

        if(!token){
            return res.status(401).json({message : "token non acces"})
        };

        const decode = verifyToken(token);

        const user = await userModel.findById(decode.id).select("-password");

        if(!user){
            return res.status(401).json({message : "utilisateur non trouver "})
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('erreur dauthentifications ' , error)
        return res.status(403).json({message : "token invalide ou expire "})
    }
}

export const roles = (rolesArray) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "authentification requise" });
    }

    if (!rolesArray.includes(req.user.role)) {
      return res.status(403).json({ message: "acces non autorisé" });
    }

    next();
  };
};
