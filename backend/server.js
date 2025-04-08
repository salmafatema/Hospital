const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const appointmentRoutes = require('./routes/AppointmentRoute'); 
const patientRoute = require('./routes/PatientRoute');
const path = require('path');
const doctorRoutes = require('./routes/DoctorRoute');
const invoiceRoutes = require('./routes/InvoiceRoute');
const medicationRoutes = require('./routes/MedicationRoute');
const laboratoryRoutes = require('./routes/LaboratoryRoute'); 
const authRoutes = require("./routes/AuthRoute");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ 
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection 
mongoose.connect("mongodb://localhost:27017/Hospital", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// MongoDB connection error handler
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});


// // SIGNUP (Secure version)
// app.post('/api/signup', async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const existingUser = await RegisterModel.findOne({ email });
//         if (existingUser) return res.json("Already have an account");

//         const hashedPassword = await bcrypt.hash(password, 10);
//         await RegisterModel.create({ name, email, password: hashedPassword });

//         res.json("Account created");
//     } catch (err) {
//         console.error("Signup error:", err);
//         res.status(500).json("Signup failed");
//     }
// });

// // LOGIN (Secure version)
// app.post("/api/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await UserModel.findOne({ email });
//         if (!user) return res.json("No user found");

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.json("Incorrect password");

//         res.json("Login success");
//     } catch (err) {
//         console.error("Login error:", err);
//         res.status(500).json("Login failed");
//     }
// });


// Mount routes
app.use('/api', appointmentRoutes);
app.use('/api', patientRoute);
app.use('/', doctorRoutes);
app.use('/api', invoiceRoutes);
app.use('/api', medicationRoutes);
app.use('/laboratory', laboratoryRoutes);
app.use("/api", authRoutes);




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