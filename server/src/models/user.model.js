import mongoose from "mongoose";

const userShema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["admin", "driver"], default: "driver" },
  password: { type: String, required: true },
  licenseNumber: { type: String },
  status : {type : String , enum : ["active" , "inactive"]},
  createdAt : {type : Date , default : Date.now}
});

export default mongoose.model("User", userShema);