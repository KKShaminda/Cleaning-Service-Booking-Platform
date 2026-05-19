import { Link } from 'react-router-dom';

export default function Navbar() {

  return (
    <nav className="bg-teal-700 text-white px-6 py-4 flex items-center justify-between flex-wrap gap-3">
      <Link to="/" className="font-bold text-xl">🧹 SparkleClean</Link>
      <div className="flex items-center gap-4 text-sm font-medium flex-wrap">
        <a href="/#services" className="hover:text-teal-200">Services</a>
        <a href="/#gallery"  className="hover:text-teal-200">Gallery</a>
        <a href="/#contact"  className="hover:text-teal-200">Contact</a>

        
      </div>
    </nav>
  );
}
