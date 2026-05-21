import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GALLERY = [
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
  'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500',
  'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=500',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500',
  'https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=500',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500',
];

const REVIEWS = [
  { name: 'Sarah M.',  stars: 5, text: 'Absolutely incredible! My home has never looked this clean.' },
  { name: 'James K.',  stars: 5, text: 'Consistent quality every single time. Highly recommended!' },
  { name: 'Priya R.',  stars: 5, text: 'The sofa express service was worth every penny.' },
  { name: 'Tom W.',    stars: 4, text: 'Got my full deposit back thanks to the amazing job they did.' },
  { name: 'Aisha B.', stars: 5, text: 'Booking was super easy and the team arrived right on time.' },
  { name: 'Carlos D.', stars: 5, text: 'Removed stains I thought were permanent. Blown away!' },
];

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('/api/services').then(r => setServices(r.data)).catch(console.error);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-teal-700 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-3">SparkleClean</h1>
        <p className="text-xl text-teal-100 mb-8">Spotless Homes, Stress-Free Life</p>
        <Link to="/booking" className="bg-white text-teal-700 font-bold px-8 py-3 rounded-full text-lg hover:bg-teal-50">
          Book Now
        </Link>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="max-w-4xl mx-auto py-16 px-6 flex flex-col md:flex-row gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600"
          alt="Our team"
          className="w-full md:w-1/2 rounded-2xl object-cover h-64"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">About Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2018, SparkleClean delivers reliable residential and commercial cleaning across Sri Lanka.
            Our fully trained, background-checked team uses eco-friendly products and professional equipment to
            ensure consistently outstanding results. We hold ourselves to the highest cleaning standards so you
            can enjoy a spotless space without the stress.
          </p>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Our Services</h2>
          {services.length === 0 ? (
            <p className="text-center text-gray-400">Loading services…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map(s => (
                <div key={s._id} className="bg-white rounded-xl shadow overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-40 object-cover"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500'; }} />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800">{s.name}</h3>
                    <p className="text-gray-500 text-sm mt-1 mb-3 line-clamp-2">{s.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-teal-700 font-bold">RS.{s.price}</span>
                      <Link to={`/booking?service=${encodeURIComponent(s.name)}`}
                        className="text-xs bg-teal-600 text-white px-3 py-1 rounded-full hover:bg-teal-700">
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GALLERY.map((src, i) => (
            <img key={i} src={src} alt={`gallery-${i}`}
              className="w-full h-40 object-cover rounded-xl hover:opacity-90 transition" />
          ))}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-teal-700 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-xl p-5">
                <p className="text-yellow-400 mb-1">{'★'.repeat(r.stars)}</p>
                <p className="text-gray-600 text-sm mb-3">"{r.text}"</p>
                <p className="font-semibold text-gray-800 text-sm">— {r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT & FOOTER ── */}
      <footer id="contact" className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300 text-sm mb-1">📍 123 Marine Drive, Negombo, Sri Lanka</p>
            <p className="text-gray-300 text-sm mb-1">✉️ hello@sparkleclean.lk</p>
            <p className="text-gray-300 text-sm mb-4">📞 +94 77 123 4567</p>
            <a
              href="https://wa.me/94771234567?text=Hi!%20I'd%20like%20to%20book%20a%20cleaning."
              target="_blank" rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold"
            >
              💬 WhatsApp Us
            </a>
          </div>
          <div>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63303.93228693985!2d79.8399!3d7.2081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2ee9031f8e079%3A0x6e7c2e4a05636b4!2sNegombo!5e0!3m2!1sen!2slk"
              width="100%" height="180" className="rounded-xl border-0" loading="lazy"
            />
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-10">© {new Date().getFullYear()} SparkleClean. All rights reserved.</p>
      </footer>
    </>
  );
}
