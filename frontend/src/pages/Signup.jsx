import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.phone || !form.password)
      return setError('All fields are required.');
    if (form.password !== form.confirm)
      return setError('Passwords do not match.');
    if (form.password.length < 6)
      return setError('Password must be at least 6 characters.');

    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/signup', {
        name: form.name, email: form.email, phone: form.phone, password: form.password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type} placeholder={placeholder} value={form[key]}
        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">Create an Account</h1>
        <p className="text-gray-400 text-sm text-center mb-6">Sign up to book and manage your cleanings</p>

        {error && <p className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {field('name',    'Full Name',        'text',     'John Perera')}
          {field('email',   'Email Address',    'email',    'john@email.com')}
          {field('phone',   'Phone Number',     'tel',      '+94 77 123 4567')}
          {field('password','Password',         'password', 'Min. 6 characters')}
          {field('confirm', 'Confirm Password', 'password', 'Re-enter password')}

          <button
            type="submit" disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl font-semibold disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
