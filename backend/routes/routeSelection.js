const express = require('express');
const router = express.Router();
const Bus = require('../models/Buses');

// Debug log for every request
router.use((req, res, next) => {
    console.log("Incoming Request:", req.method, req.originalUrl);
    next();
});

/**
 * GET /api/routes
 * Fetch buses by query parameters
 * Example: /api/routes?startCity=Delhi&destination=Mumbai
 */
router.get('/routes', async (req, res) => {
    try {
        let { startCity, destination } = req.query;
        startCity = startCity?.trim();
        destination = destination?.trim();

        const buses = await Bus.find({
            startCity: { $regex: new RegExp(`^${startCity}$`, 'i') },
            destination: { $regex: new RegExp(`^${destination}$`, 'i') }
        });

        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

/**
 * POST /api/routes
 * Fetch buses by body payload
 */
router.post('/routes', async (req, res) => {
    try {
        let { startCity, destination } = req.body;
        startCity = startCity?.trim();
        destination = destination?.trim();

        const buses = await Bus.find({
            startCity: { $regex: new RegExp(`^${startCity}$`, 'i') },
            destination: { $regex: new RegExp(`^${destination}$`, 'i') }
        });

        res.json(buses);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

/**
 * GET /api/all
 * Get all buses
 */
router.get('/all', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);
    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
});

/**
 * POST /api/add
 * Add a new bus
 */
router.post('/add', async (req, res) => {
    try {
        const newBus = new Bus(req.body);
        await newBus.save();
        res.json({ success: true, message: "Bus added successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

/**
 * GET /api/:bId
 * Get a bus by ID
 */
router.get('/:bId', async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.bId);
        if (!bus) return res.status(404).json({ status: false, message: "Bus not found" });
        res.json(bus);
    } catch (err) {
        res.status(500).json({ status: false, message: "Error while searching with ID", error: err.message });
    }
});

module.exports = router;
