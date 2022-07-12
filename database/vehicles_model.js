const mongoose = require('./connection')
const Schema = mongoose.Schema

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    registration: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User"},
    kilometers: { type: Number, required: true },
    nextService: { type: Number, required: true }
})

const VehicleModel = mongoose.model('Vehicle', vehicleSchema)

module.exports = VehicleModel