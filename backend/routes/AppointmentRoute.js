const express = require('express');
const router = express.Router();
const AppointmentModel = require('../models/AppointmentModel');

// POST 
router.post('/appointments', async (req, res) => {
    const { appointmentId, patientName, doctorName, department, date, time, status } = req.body;

    if (!patientName || !doctorName || !department || !date || !time || !status) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    console.log(req.body);

    try {
        const newAppointment = new AppointmentModel({
            appointmentId: Math.floor(Math.random() * 10000),
            patientName,
            doctorName,
            department,
            date,
            time,
            status,
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error });
    }
});

// GET 
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await AppointmentModel.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
});

// DELETE
router.delete('/appointments/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedAppointment = await AppointmentModel.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting appointment', error });
    }
});




module.exports = router;
