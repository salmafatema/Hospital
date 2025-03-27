const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AppointmentModel = require('../models/AppointmentModel');

// GET all appointments
router.get('/appointments', async (req, res) => {
    try {
        // Check MongoDB connection
        if (mongoose.connection.readyState !== 1) {
            console.error('MongoDB is not connected');
            return res.status(500).json({ message: 'Database connection error' });
        }

        const appointments = await AppointmentModel.find().sort({ date: 1, time: 1 });
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ 
            message: 'Error fetching appointments', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// POST new appointment
router.post('/appointments', async (req, res) => {
    try {
        // Check MongoDB connection
        if (mongoose.connection.readyState !== 1) {
            console.error('MongoDB is not connected');
            return res.status(500).json({ message: 'Database connection error' });
        }

        console.log('Received appointment data:', req.body); // Debug log

        // Validate required fields
        const requiredFields = ['appointmentId', 'patientName', 'doctorName', 'department', 'date', 'time', 'status'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            console.log('Missing fields:', missingFields); // Debug log
            return res.status(400).json({ 
                message: 'Missing required fields', 
                fields: missingFields 
            });
        }

        // Validate department
        const validDepartments = ['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics', 'Dermatology', 'General Medicine'];
        if (!validDepartments.includes(req.body.department)) {
            console.log('Invalid department:', req.body.department); // Debug log
            return res.status(400).json({ 
                message: 'Invalid department', 
                validDepartments 
            });
        }

        // Validate status
        const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];
        if (!validStatuses.includes(req.body.status)) {
            console.log('Invalid status:', req.body.status); // Debug log
            return res.status(400).json({ 
                message: 'Invalid status', 
                validStatuses 
            });
        }

        // Check if appointment ID already exists
        const existingAppointment = await AppointmentModel.findOne({ appointmentId: req.body.appointmentId });
        if (existingAppointment) {
            console.log('Appointment ID already exists:', req.body.appointmentId); // Debug log
            return res.status(400).json({ message: 'Appointment ID already exists' });
        }

        // Validate date format
        const appointmentDate = new Date(req.body.date);
        if (isNaN(appointmentDate.getTime())) {
            console.log('Invalid date format:', req.body.date); // Debug log
            return res.status(400).json({ message: 'Invalid date format' });
        }

        // Create new appointment
        const appointment = new AppointmentModel({
            appointmentId: req.body.appointmentId,
            patientName: req.body.patientName,
            doctorName: req.body.doctorName,
            department: req.body.department,
            date: appointmentDate,
            time: req.body.time,
            status: req.body.status
        });

        console.log('Creating appointment with data:', appointment); // Debug log

        const newAppointment = await appointment.save();
        console.log('Appointment created successfully:', newAppointment); // Debug log
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error('Error creating appointment:', error); // Debug log
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            console.log('Validation errors:', messages); // Debug log
            return res.status(400).json({ 
                message: 'Validation Error', 
                errors: messages 
            });
        }
        
        if (error.code === 11000) {
            console.log('Duplicate key error:', error); // Debug log
            return res.status(400).json({ 
                message: 'Appointment ID already exists' 
            });
        }
        
        // Log detailed error information
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            code: error.code,
            stack: error.stack
        });
        
        res.status(500).json({ 
            message: 'Error creating appointment', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// DELETE
router.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        // Check MongoDB connection
        if (mongoose.connection.readyState !== 1) {
            console.error('MongoDB is not connected');
            return res.status(500).json({ message: 'Database connection error' });
        }

        const deletedAppointment = await AppointmentModel.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Error deleting appointment', error });
    }
});


module.exports = router;