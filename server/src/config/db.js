import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async()=>{
    try {
        await mongoose.connect(
          process.env.MONGO_URI || "mongodb://localhost:27017/suivi-trajets"
        );
        console.log("la connections avec la base de donnes avec succes ")

    } catch (error) {
        console.error("erreur lors de la connections" ,  error.message);
        process.exit(1);
    }
}

export default connectDB;