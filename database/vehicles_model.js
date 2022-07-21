const mongoose = require('./connection')
const Schema = mongoose.Schema

const vehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    registration: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User"},
    kilometers: { type: Number, required: true },
    nextService: { type: Number, required: true },
    comments: [{ 
        entry: { type: String },
        date: { type: Date, default: Date.now}
    }]
})

const VehicleModel = mongoose.model('Vehicle', vehicleSchema)

module.exports = VehicleModel