const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PatientModel = require('./models/PatientModel'); // Corrected Model Name

const app = express();

app.use(bodyParser.json());
app.use(cors({ 
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Hospital', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// POST Endpoint
app.post('/patients', async (req, res) => {
    const patientData = req.body;
    console.log('Received patient data:', patientData);

    try {
        const newPatient = new PatientModel(patientData); // Corrected Model Name
        const savedPatient = await newPatient.save();
        console.log('Saved Patient:', savedPatient);
        res.status(201).json({ message: 'Patient added successfully', patient: savedPatient });
    } catch (error) {
        console.error('Error saving patient:', error);
        res.status(500).json({ message: 'Failed to add patient', error: error.message });
    }
});

app.get('/patients', async (req, res) => {
    try {
        const patients = await PatientModel.find();
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Failed to fetch patients', error: error.message });
    }
});

const appointmentRoutes = require('./routes/AppointmentRoute'); // Import appointment routes

app.use(appointmentRoutes); // Use appointment routes

// Server Start


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
