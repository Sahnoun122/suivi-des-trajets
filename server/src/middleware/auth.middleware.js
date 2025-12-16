import { verifyToken } from "../config/jwt.js";
import User from "../models/user.model.js";


export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // if (user.status && user.status !== 'active') {
    //   return res.status(403).json({ message: "Votre compte n'est pas activé. Contactez l'administrateur." });
    // }

    req.user = user; 
    next();
  } catch (err) {
    console.error("Erreur JWT:", err.message);
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
};

export const roles = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentification requise" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Accès refusé (rôle insuffisant)" });
    }

    next();
  };
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Action réservée à l'administrateur" });
  }
  next();
};

export const isDriver = (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ message: "Authentification requise" });
  if (req.user.role !== "driver")
    return res.status(403).json({ message: "Accès réservé aux chauffeurs" });
  next();
};
