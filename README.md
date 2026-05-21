# Cleaning Service Booking Platform

> A full-stack cleaning service booking application with a Node/Express backend and a Vite + React frontend.

## Repository structure

- `backend/` — Express API, MongoDB models, routes, and seed script
- `frontend/` — Vite + React SPA (pages, components, assets)

## Features

- User authentication (signup / login)
- Services management (listing services)
- Booking creation and management
- Admin dashboard page

## Prerequisites

- Node.js (16+ recommended)
- npm or yarn
- A running MongoDB instance (local or hosted)

## Backend — Setup & Run

1. Open a terminal and install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file in `backend/` (example variables):

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

3. (Optional) Seed the database with sample data:

```bash
node seed.js
```

4. Start the backend server:

```bash
npm start
# or
node server.js
```

Check `backend/package.json` for available script names (for example `dev` or `start`).

## Frontend — Setup & Run

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

This should open the frontend (Vite dev server) — by default at `http://localhost:5173` unless configured otherwise.

## API Overview

Common API routes (see `backend/routes/`):

- `POST /api/auth/signup` — create a user
- `POST /api/auth/login` — login and receive a token
- `GET/POST /api/services` — list or create services
- `GET/POST /api/bookings` — list or create bookings

Adjust the exact paths and payloads by checking the route handlers in `backend/routes/`.

## Environment / Configuration

- Ensure `MONGO_URI` points to your database.
- Set a secure `JWT_SECRET` for auth token signing.

## Development notes

- Frontend communicates with the backend API; if running on different ports, configure the frontend base URL or use a proxy during development.
- The backend includes `seed.js` to populate demo data — inspect it before running in a production database.


