const mongoose = require('./connection')
const Schema = mongoose.Schema

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    registration: { type: String, required: true, unique: true },
    driverEmail: { type: String, default: "No driver"},
    kilometers: { type: Number, required: true },
    nextService: { type: Number, required: true },
    kmRemaining: { type: Number, required: true },
    condition: { type: String, default: 'Satisfactory' }
})

const VehicleModel = mongoose.model('Vehicle', vehicleSchema)

module.exports = VehicleModel