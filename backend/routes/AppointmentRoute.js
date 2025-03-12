const express = require('express');
const router = express.Router();
const AppointmentModel = require('../models/AppointmentModel');

// POST request for creating a new appointment
router.post('/appointments', async (req, res) => {
    const { appointmentId, patientName, doctorName, department, date, time } = req.body;

    if (!patientName || !doctorName || !department || !date || !time) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newAppointment = new AppointmentModel({
            appointmentId: Math.floor(Math.random() * 10000), // Auto-generate ID
            patientName,
            doctorName,
            department,
            date,
            time
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error });
    }
});

// GET request to fetch all appointments
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await AppointmentModel.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
});

module.exports = router;
