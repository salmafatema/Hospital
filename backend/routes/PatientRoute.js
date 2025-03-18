const express = require('express');
const router = express.Router();
const PatientModel = require('./models/PatientModel');

// POST Request to Create a New Patient
app.post('/patients', async (req, res) => {
  const { fullName, age, gender, phoneNumber, admissionType, bloodGroup, time, date } = req.body;
  
  try {
    const newPatient = new PatientModel({
      fullName,
      age,
      gender,
      phoneNumber,
      admissionType,
      bloodGroup,
      time,
      date
    });
    
    await newPatient.save();
    res.status(201).json({ message: 'Patient created successfully', patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: 'Error creating patient', error });
  }
});

// GET endpoint to fetch all patients
app.get('/patients', async (req, res) => {
  try {
    const patients = await PatientModel.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error });
  }
});
