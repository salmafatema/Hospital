const express = require('express');
const router = express.Router(); 
const Patient = require('../models/PatientModel'); 
const mongoose = require('mongoose');

// POST 
router.post('/', async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json({ message: 'Patient created successfully', data: newPatient });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET 
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE 
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPatient = await Patient.findByIdAndDelete(id);

        if (!deletedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deleted successfully', data: deletedPatient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Updating patient with ID:", id);
        console.log("Update data:", req.body);
        
        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid patient ID format' });
        }

        const updatedPatient = await Patient.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        console.log("Successfully updated patient:", updatedPatient);
        res.status(200).json({ message: 'Patient updated successfully', data: updatedPatient });
    } catch (error) {
        console.error("Error updating patient:", error);
        res.status(500).json({ 
            error: error.message,
            details: error.errors ? Object.values(error.errors).map(err => err.message) : undefined
        });
    }
});

module.exports = router;