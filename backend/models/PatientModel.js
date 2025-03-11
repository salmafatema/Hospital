const mongoose = require('mongoose');

// Schema
const PatientModelSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    admissionType: { 
        type: String,
        enum: ['Emergency', 'OPD', 'Surgery', 'IPD'],
        default: 'Emergency',
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O-', 'O+'],
        default: 'A+',
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});


module.exports = mongoose.model('Patient', PatientModelSchema);
