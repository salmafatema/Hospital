const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    speciality: {
        type: String,
        required: true,
        trim: true
    },
    qualification: {
        type: String,
        required: true,
        trim: true
    },
    experience: {
        type: Number,
        required: true,
        min: 0
    },
    availability: {
        type: String,
        required: true,
        enum: ['Available', 'Unavailable', 'On Leave'],
        default: 'Available'
    },
    department: {
        type: String,
        required: true,
        enum: ['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Dermatology', 'General Medicine'],
        default: 'General Medicine'
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    assignments: {
        type: String,
        trim: true
    },
    photo: {
        type: String,
        default: '/default-avatar.png'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
