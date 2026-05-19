const router = require('express').Router();
const Service = require('../models/Service');

router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error('GET /services error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
