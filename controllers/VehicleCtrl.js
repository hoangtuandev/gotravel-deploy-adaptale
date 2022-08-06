import { VehicleModel } from '../models/VehicleModel.js';

export const getAllVehicle = async (req, res) => {
    try {
        const vehicles = await VehicleModel.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const createVehicle = async (req, res) => {
    try {
        const newVehicle = req.body;
        const vehicle = new VehicleModel(newVehicle);
        await vehicle.save();

        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const deleteVehicle = async (req, res) => {
    try {
        const vehicle = req.body;
        const result = await VehicleModel.deleteOne({
            _id: vehicle._id,
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

export const updateVehicle = async (req, res) => {
    try {
        const vehicle = req.body;
        const result = await VehicleModel.updateOne(
            { _id: vehicle._id },
            { $set: { pt_ten: vehicle.pt_ten } }
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
