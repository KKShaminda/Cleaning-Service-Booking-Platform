import Navbar from './components/navbar';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';

function PlaceholderPage({ title, description }) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-lg shadow-slate-200">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">
          SparkleClean
        </p>
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        <p className="text-lg leading-8 text-slate-600">{description}</p>
      </div>
    </main>
  );
}

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/booking"
          element={
            <PlaceholderPage
              title="Book a cleaning"
              description="Booking is not wired up yet, but the route is live so the app always shows a real page instead of a blank screen."
            />
          }
        />
        <Route
          path="/login"
          element={
            <PlaceholderPage
              title="Login"
              description="Authentication pages are still being built. This route is here to keep navigation visible and predictable."
            />
          }
        />
        <Route
          path="/signup"
          element={
            <PlaceholderPage
              title="Sign up"
              description="Create-account flow is pending. The route is now handled explicitly so the UI does not fall through to white space."
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <PlaceholderPage
              title="Dashboard"
              description="The dashboard screen is not implemented yet, but this placeholder keeps the app responsive and visible."
            />
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}

export default App
