const router = require('express').Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// POST — customer submits a booking (requires login)
router.post('/', auth, async (req, res) => {
  try {
    const { service, name, email, phone, address, date, time } = req.body;
    if (!service || !name || !email || !phone || !address || !date || !time)
      return res.status(400).json({ error: 'All fields are required.' });

    const booking = await Booking.create({
      customerId: req.user.id,
      service, name, email, phone, address, date, time,
    });
    res.status(201).json(booking);
  } catch (err) {
    console.error('POST /bookings error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings/mine — customer's own bookings
router.get('/mine', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/bookings — all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('GET /bookings error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// PATCH mark completed (admin)
router.patch('/:id/complete', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
