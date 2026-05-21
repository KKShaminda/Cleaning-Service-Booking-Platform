import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate  = useNavigate();
  const user      = JSON.parse(localStorage.getItem('user') || 'null');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-teal-700 text-white px-6 py-4 flex items-center justify-between flex-wrap gap-3">
      <Link to="/" className="font-bold text-xl">🧹 SparkleClean</Link>
      <div className="flex items-center gap-4 text-sm font-medium flex-wrap">
        <a href="/#services" className="hover:text-teal-200">Services</a>
        <a href="/#gallery"  className="hover:text-teal-200">Gallery</a>
        <a href="/#contact"  className="hover:text-teal-200">Contact</a>

        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-teal-200">My Dashboard</Link>
            <span className="text-teal-200">Hi, {user.name.split(' ')[0]}</span>
            <button onClick={logout} className="bg-white text-teal-700 px-4 py-1 rounded-full font-semibold hover:bg-teal-50">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"  className="hover:text-teal-200">Login</Link>
            <Link to="/signup" className="bg-white text-teal-700 px-4 py-1 rounded-full font-semibold hover:bg-teal-50">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
