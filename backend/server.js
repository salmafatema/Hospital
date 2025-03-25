const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PatientModel = require('./models/PatientModel'); 
const appointmentRoutes = require('./routes/AppointmentRoute'); 
const patientRoutes = require('./routes/PatientRoute'); 
const path = require('path');
const doctorRoutes = require('./routes/DoctorRoute');
const invoiceRoutes = require('./routes/InvoiceRoute');
const medicationRoutes = require('./routes/MedicationRoute');



const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ 
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection with detailed error handling
mongoose.connect('mongodb://localhost:27017/Hospital', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('MongoDB connected successfully');
    console.log('Database URL:', 'mongodb://localhost:27017/Hospital');
    console.log('Database Name:', 'Hospital');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    console.error('Error details:', {
        name: err.name,
        message: err.message,
        code: err.code
    });
});

// MongoDB connection error handler
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Mount routes
app.use('/', appointmentRoutes);
app.use('/patients', patientRoutes);
app.use('/', doctorRoutes);
app.use('/api', invoiceRoutes);
app.use('/medications', medicationRoutes);



// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    console.error('Error stack:', err.stack);
    res.status(500).json({ 
        message: 'Something went wrong!', 
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
});