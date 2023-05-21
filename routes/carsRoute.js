const express = require("express");
const router = express.Router();
const Car = require("../models/carModel")

router.get("/getallcars",async(req, res)=>{

    try{
        const cars = await Car.find()
        res.send(cars)
    }catch(error){
        return res.status(400).json(error);
    }
});

router.post("/addcar",async(req,res)=>{
try {
    const newcar = new Car(req.body)
    await newcar.save()
    res.send('Car added successfully')
} catch (error) {
    return res.status(400).json(error);
}
});

router.post("/editcar",async(req,res)=>{
    try {
        const car = await Car.findOne({_id : req.body._id})
        car.name = req.body.name
        car.image = req.body.image
        car.image1 = req.body.image1
        car.image2 = req.body.image2
        car.fuelType = req.body.fuelType
        car.rentPerHour = req.body.rentPerHour
        car.capacity = req.body.capacity
        car.mileage = req.body.mileage
        car.type = req.body.type
        await car.save()
        res.send('Car details updated successfully')
    } catch (error) {
        return res.status(400).json(error);
    }
    });

        router.post("/deletecar",async(req,res)=>{
        try {
             await Car.findOneAndDelete({_id : req.body.carid})
            
            res.send('Car deleted successfully')
        } catch (error) {
            return res.status(400).json(error);
        }
        });

        


module.exports = router;