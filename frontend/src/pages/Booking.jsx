import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Booking() {
  const navigate = useNavigate();
  useEffect(() => { if (localStorage.getItem('token')) navigate('/dashboard', { replace: true }); }, [navigate]);
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [form, setForm]   = useState({ service: searchParams.get('service') || '', name: '', email: '', phone: '', address: '', date: '', time: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get('/api/services').then(r => setServices(r.data)).catch(console.error);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.service) e.service = 'Select a service';
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    if (!form.phone.trim())   e.phone   = 'Phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.date)           e.date    = 'Date is required';
    if (!form.time)           e.time    = 'Time is required';
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    try {
      await axios.post('/api/bookings', form);
      setSuccess(true);
    } catch (err) {
      alert(err.response?.data?.error || 'Submission failed.');
    }
  };

  const field = (name, label, type = 'text') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type} value={form[name]} min={type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
        onChange={e => { setForm(p => ({ ...p, [name]: e.target.value })); setErrors(p => ({ ...p, [name]: '' })); }}
        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors[name] ? 'border-red-400' : 'border-gray-300'}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  if (success) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center bg-white p-10 rounded-2xl shadow-lg">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-500 mb-6">We'll contact you shortly to confirm your appointment.</p>
        <a href="/" className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-700">Back to Home</a>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Book a Cleaning</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">

        {/* Service select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
          <select
            value={form.service}
            onChange={e => { setForm(p => ({ ...p, service: e.target.value })); setErrors(p => ({ ...p, service: '' })); }}
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.service ? 'border-red-400' : 'border-gray-300'}`}
          >
            <option value="">— Select a service —</option>
            {services.map(s => <option key={s._id} value={s.name}>{s.name} — ${s.price}</option>)}
          </select>
          {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
        </div>

        {field('name',    'Full Name')}
        {field('email',   'Email',  'email')}
        {field('phone',   'Phone Number', 'tel')}

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={form.address} rows={2}
            onChange={e => { setForm(p => ({ ...p, address: e.target.value })); setErrors(p => ({ ...p, address: '' })); }}
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none ${errors.address ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {field('date', 'Date', 'date')}
          {field('time', 'Time', 'time')}
        </div>

        <button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-semibold">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
