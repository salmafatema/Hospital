const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const DoctorModel = require('../models/DoctorModel');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/doctors/'); // Make sure this directory exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// GET all doctors
router.get('/doctors', async (req, res) => {
    try {
        const doctors = await DoctorModel.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching doctors', error });
    }
});

// POST new doctor
router.post('/doctors', upload.single('photo'), async (req, res) => {
    try {
        const doctorData = {
            name: req.body.name,
            speciality: req.body.speciality,
            qualification: req.body.qualification,
            experience: req.body.experience,
            availability: req.body.availability,
            department: req.body.department,
            contact: req.body.contact,
            assignments: req.body.assignments,
            photo: req.file ? `/uploads/doctors/${req.file.filename}` : '/default-avatar.png'
        };

        const doctor = new DoctorModel(doctorData);
        const savedDoctor = await doctor.save();
        
        res.status(201).json({
            success: true,
            message: 'Doctor created successfully',
            data: savedDoctor
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating doctor',
            error: error.message
        });
    }
});

// DELETE doctor
router.delete('/doctors/:id', async (req, res) => {
    try {
        const deletedDoctor = await DoctorModel.findByIdAndDelete(req.params.id);
        
        if (!deletedDoctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Doctor deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting doctor',
            error: error.message
        });
    }
});

module.exports = router;
