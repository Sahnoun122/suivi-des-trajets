import mongoose from "mongoose";
import User from "./src/models/user.model.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/truck-management");
    console.log("MongoDB connecté");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error.message);
    process.exit(1);
  }
};

const updateUserStatus = async () => {
  try {
    await connectDB();
    
    const result = await User.updateMany(
      { $or: [{ status: { $exists: false } }, { status: null }] },
      { $set: { status: "active" } }
    );
    
    console.log(`${result.modifiedCount} utilisateurs mis à jour avec le statut 'active'`);
    
    const users = await User.find({}, { name: 1, email: 1, role: 1, status: 1 });
    console.log("Utilisateurs dans la base:");
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Rôle: ${user.role} - Statut: ${user.status}`);
    });
    
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
  } finally {
    mongoose.disconnect();
    console.log("Déconnexion de MongoDB");
  }
};

updateUserStatus();