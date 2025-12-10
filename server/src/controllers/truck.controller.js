import TruckModel from "../models/Truck.model.js";

export const creatTrucker = async(req , res)=>{
    try {
        const Truck = await TruckModel.create(req.body);
        res.status(201).json(Truck)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}


export const getTrucker = async(req , res)=>{
    try {
        const trucks = await TruckModel.find().populate("driver").populate("remorque");
        res.json(trucks)
    } catch (error) {
        res.status(500).json({error : error.message})
        
    }
}


export const updateTrucker = async(req , res)=>{
      try {
        const truck = await TruckModel.findByIdAndUpdate(req.params.id , req.body , {new : true});
        res.json(truck)
      } catch (error) {
        res.status(500).json({error : error.message});
      }


}

export const deleteTruck = async(req , res)=>{
    try {
        const trucks = await TruckModel.findByIdAndDelete(req.params.id);
        res.json(trucks)
    } catch (error) {
        res.status(500).json({error : error.message})
        
    }
}