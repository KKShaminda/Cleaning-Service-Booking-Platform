const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service:      { type: String, required: true },
  name:         { type: String, required: true },
  email:        { type: String, required: true },
  phone:        { type: String, required: true },
  address:      { type: String, required: true },
  date:         { type: String, required: true },
  time:         { type: String, required: true },
  status:       { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
