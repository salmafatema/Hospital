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
        enum: ['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Dermatology', 'General Medicine'],
        default: 'General Medicine',
        required: true
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
        enum: ['Pending', 'Confirmed', 'Cancelled'],  
        default: 'Pending'                             
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);