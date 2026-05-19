require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const services = [
  { name: 'Deep Clean',        description: 'Full top-to-bottom clean of every room including appliances and fixtures.', price: 14000, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600' },
  { name: 'Standard Clean',    description: 'Regular maintenance clean to keep your home fresh and tidy.', price: 8000,  image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600' },
  { name: 'Office Cleaning',   description: 'Professional cleaning for offices, workstations, and common areas.', price: 19000, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600' },
  { name: 'Sofa Express',      description: 'Upholstery deep-clean to revive sofas and chairs using pro equipment.', price: 7000,  image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600' },
  { name: 'Move-In/Out Clean', description: 'End-of-tenancy or move-in clean for a pristine property handover.', price: 22000, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600' },
  { name: 'Carpet Cleaning',   description: 'Steam and dry solutions for all carpet types, removing stains and allergens.', price: 9000,  image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600' },
  { name: 'Window Cleaning',   description: 'Streak-free interior and exterior window cleaning for any property.', price: 6000,  image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600' },
  { name: 'Post-Construction', description: 'Heavy-duty clean after renovations — dust, debris and residue removal.', price: 27000, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600' },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Service.deleteMany({});
  await Service.insertMany(services);
  console.log('✅ Seeded 8 services');
  await mongoose.disconnect();
}

seed().catch(console.error);
