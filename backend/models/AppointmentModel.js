const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentId: {
        type: Number,
        required: true,
        unique: true
    },
    patientName: {
        type: String,
        required: true,
    },
    doctorName: {        // Changed to match frontend data
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,  // Changed from Number to String
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
