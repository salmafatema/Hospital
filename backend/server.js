const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Patient = require('../models/Patient'); // Corrected import for the Patient model
const patientsRoutes = require('./routes/patients'); // Import the routes

mongoose.connect('mongodb://localhost:27017/hospital_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

// Use the patients routes
app.use('/api/patients', patientsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
