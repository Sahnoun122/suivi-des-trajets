import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";

import { generateToken } from "../config/jwt.js";

export const register = async(req , res)=>{

    try {
        const {name , email , phone , role ,password , licenseNumber , status} = req.body;
        console.log( req.body);

        const existeEmail = await userModel.findOne({email});

        if(existeEmail){
            return res.status(400).json({message : "email deja exicte"});
        };

        const hashPassword = await bcrypt.hash(password , 10);
        const user = await userModel.create({
            name ,
            email,
            phone, 
            role,
            licenseNumber,
            status,
            password: hashPassword
        });

        if(user.status && user.status !== 'active'){
            return res.status(403).json({
                message: "Votre compte a été créé mais n'est pas encore activé. Contactez l'administrateur pour l'activation.",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    role: user.role,
                    licenseNumber: user.licenseNumber,
                    status: user.status,
                }
            });
        }

        const token = generateToken({id:user._id , name : user.name , email : user.email,
            phone : user.phone , role : user.role , licenseNumber: user.licenseNumber , status : user.status , 
        });
        res.status(201).json({
          message: "utilisateur cree",
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            licenseNumber: user.licenseNumber,
            status: user.status,
          },
        });

    } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur de serveur" });
}

}

export const login = async(req , res)=>{
    try {
        
        const {email , password}= req.body;
                console.log(req.body);

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(401).json({message : "email ou mot de passe incorecte"})
        }

        if(user.status && user.status !== 'active'){
            return res.status(403).json({message : "Votre compte n'est pas activé. Contactez l'administrateur."})
        }

        const passwordVerfie = await bcrypt.compare(password , user.password);

        if(!passwordVerfie){
        return res.status(401).json({message : "email ou passsord incorrecte "})
        }

       const token = generateToken({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
       });
       res.status(200).json({
         message: "connexion reussie",
         token,
         user: {
           id: user._id,
           name: user.name,
           email: user.email,
           role: user.role,
           status: user.status,
         },
       });

    } catch (error) {
        console.error('erreur lors de la connectiosn ' , error);
        res.status(500).json({message : "erreur serverur lors de la connexion "})
    }
}