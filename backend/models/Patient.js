const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'Please enter a valid phone number'] // 10-digit phone validation
    },
    address: {
        type: String,
        required: true,
    },
    medicalHistory: {
        type: String,
        default: 'No history provided'
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);
