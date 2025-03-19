const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PatientModel = require('./models/PatientModel'); 
const appointmentRoutes = require('./routes/AppointmentRoute'); 
const patientRoutes = require('./routes/PatientRoute'); 
const path = require('path');
const doctorRoutes = require('./routes/DoctorRoute');

const app = express();

app.use(bodyParser.json());
app.use(cors({ 
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Hospital', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

app.use(appointmentRoutes); 
app.use(patientRoutes);
app.use('/', doctorRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});