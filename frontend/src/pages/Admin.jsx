import { useEffect, useState } from 'react';
import axios from 'axios';

const PASS = import.meta.env.VITE_ADMIN_PASS || 'admin123';

export default function Admin() {
  const [authed, setAuthed]     = useState(false);
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState([]);
  const [error, setError]       = useState('');

  const login = e => {
    e.preventDefault();
    if (password === PASS) { setAuthed(true); setError(''); }
    else setError('Incorrect password.');
  };

  const load = () => axios.get('/api/bookings').then(r => setBookings(r.data));

  useEffect(() => { if (authed) load(); }, [authed]);

  const complete = async id => {
    await axios.patch(`/api/bookings/${id}/complete`);
    load();
  };

  const remove = async id => {
    if (!window.confirm('Delete this booking?')) return;
    await axios.delete(`/api/bookings/${id}`);
    load();
  };

  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={login} className="bg-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Login</h2>
        <input
          type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {error && <p className="text-red-500 text-xs mb-3">{error}</p>}
        <button className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700">
          Login
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">Default: admin123</p>
      </form>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <span className="text-sm text-gray-500">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</span>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-400">No bookings yet.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Customer', 'Service', 'Date & Time', 'Contact', 'Address', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map(b => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{b.name}<br/><span className="text-gray-400 font-normal text-xs">{b.email}</span></td>
                  <td className="px-4 py-3 text-gray-700">{b.service}</td>
                  <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{b.date}<br/><span className="text-gray-400 text-xs">{b.time}</span></td>
                  <td className="px-4 py-3 text-gray-700">{b.phone}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs max-w-[140px] truncate">{b.address}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      b.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {b.status !== 'completed' && (
                        <button onClick={() => complete(b._id)}
                          className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded hover:bg-green-100">
                          ✓ Complete
                        </button>
                      )}
                      <button onClick={() => remove(b._id)}
                        className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded hover:bg-red-100">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
