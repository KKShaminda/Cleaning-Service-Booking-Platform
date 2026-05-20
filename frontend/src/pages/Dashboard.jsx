import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const STATUS_STYLE = {
  pending:   'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
};

const api = (token) => axios.create({
  headers: { Authorization: `Bearer ${token}` },
});

export default function Dashboard() {
  const navigate  = useNavigate();
  const token     = localStorage.getItem('token');
  const user      = JSON.parse(localStorage.getItem('user') || '{}');

  const [tab, setTab]         = useState('bookings'); // 'bookings' | 'new'
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [form, setForm]         = useState({ service: '', address: '', date: '', time: '' });
  const [errors, setErrors]     = useState({});
  const [success, setSuccess]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const loadBookings = useCallback(() => {
    api(token).get('/api/bookings/mine')
      .then(r => setBookings(r.data))
      .catch(err => {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      });
  }, [token, navigate]);

  useEffect(() => {
    loadBookings();
    axios.get('/api/services').then(r => setServices(r.data)).catch(console.error);
  }, [loadBookings]);

  const validate = () => {
    const e = {};
    if (!form.service) e.service = 'Select a service';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.date)   e.date    = 'Date is required';
    if (!form.time)   e.time    = 'Time is required';
    return e;
  };

  const handleBook = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await api(token).post('/api/bookings', {
        service: form.service,
        name:    user.name,
        email:   user.email,
        phone:   user.phone,
        address: form.address,
        date:    form.date,
        time:    form.time,
      });
      setSuccess(true);
      setForm({ service: '', address: '', date: '', time: '' });
      loadBookings();
      setTimeout(() => { setSuccess(false); setTab('bookings'); }, 2000);
    } catch (err) {
      alert(err.response?.data?.error || 'Booking failed.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
          <p className="text-gray-400 text-sm mt-0.5">{user.email}</p>
        </div>
        <div className="bg-teal-600 text-white w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg">
          {user.name?.[0]?.toUpperCase()}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setTab('bookings')}
          className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
            tab === 'bookings' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          My Bookings {bookings.length > 0 && <span className="ml-1 bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full">{bookings.length}</span>}
        </button>
        <button
          onClick={() => { setTab('new'); setSuccess(false); }}
          className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
            tab === 'new' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          + Book a Service
        </button>
      </div>

      {/* ── MY BOOKINGS ── */}
      {tab === 'bookings' && (
        bookings.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p className="font-medium">No bookings yet</p>
            <button onClick={() => setTab('new')} className="mt-4 bg-teal-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal-700">
              Book your first service
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map(b => (
              <div key={b._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-800">{b.service}</p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {b.date} at {b.time} &nbsp;·&nbsp; {b.address}
                  </p>
                </div>
                <span className={`self-start sm:self-auto text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLE[b.status] || 'bg-gray-100 text-gray-600'}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )
      )}

      {/* ── BOOK A SERVICE ── */}
      {tab === 'new' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-lg">
          {success && (
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
              ✅ Booking confirmed! Redirecting…
            </div>
          )}
          <form onSubmit={handleBook} className="space-y-4">
            {/* Pre-filled info (read-only) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                <input readOnly value={user.name || ''} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                <input readOnly value={user.phone || ''} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500" />
              </div>
            </div>

            {/* Service */}
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

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Address</label>
              <textarea
                value={form.address} rows={2}
                onChange={e => { setForm(p => ({ ...p, address: e.target.value })); setErrors(p => ({ ...p, address: '' })); }}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none ${errors.address ? 'border-red-400' : 'border-gray-300'}`}
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date" value={form.date} min={today}
                  onChange={e => { setForm(p => ({ ...p, date: e.target.value })); setErrors(p => ({ ...p, date: '' })); }}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.date ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time" value={form.time}
                  onChange={e => { setForm(p => ({ ...p, time: e.target.value })); setErrors(p => ({ ...p, time: '' })); }}
                  className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${errors.time ? 'border-red-400' : 'border-gray-300'}`}
                />
                {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl font-semibold disabled:opacity-60"
            >
              {loading ? 'Booking…' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
