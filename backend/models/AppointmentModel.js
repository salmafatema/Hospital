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
    doctorName: {
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
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],  // Enum for limited status options
        default: 'Pending'                             // Default value as 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
