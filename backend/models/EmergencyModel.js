const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Critical', 'Stable'],
        required: true
    },
    bedNumber: {
        type: String,
        required: true
    },
    admissionDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Emergency', emergencySchema);
