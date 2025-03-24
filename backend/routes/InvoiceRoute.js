const express = require('express');
const router = express.Router();
const Invoice = require('../models/InvoiceModel');

// GET all invoices
router.get('/invoices', async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ date: -1 });
        res.json(invoices);
    } catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ message: 'Error fetching invoices', error: error.message });
    }
});

// POST new invoice
router.post('/invoices', async (req, res) => {
    try {
        // Generate invoice ID
        const invoiceCount = await Invoice.countDocuments();
        const invoiceId = `INV${String(invoiceCount + 1).padStart(3, '0')}`;

        const newInvoice = new Invoice({
            invoiceId,
            patientName: req.body.patientName,
            amount: req.body.amount,
            date: req.body.date,
            dueDate: req.body.dueDate,
            status: req.body.status,
            paymentMethod: req.body.paymentMethod,
            paymentDate: req.body.paymentDate
        });

        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        console.error('Error creating invoice:', error);
        res.status(400).json({ message: 'Error creating invoice', error: error.message });
    }
});

module.exports = router;
