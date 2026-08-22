# GlobeTrotter Frontend (React + Vite)

This is the frontend client for **GlobeTrotter** - an AI-powered travel planner platform. It provides a stunning, high-performance user interface for users to visually plan their trips, explore cities, schedule itineraries, track budgets, and view dashboard analytics.

## 🚀 Tech Stack
- **Framework**: React 19 + Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **Charts / Analytics**: Recharts
- **HTTP Client**: Axios

## 🎨 Key Features
- **Dark/Light Mode**: Full theme toggle support seamlessly integrated into Tailwind CSS.
- **Dynamic Builder & Viewer**: A dedicated "Itinerary Builder" to add sections and a "Visual Timeline Viewer" for the finished trip.
- **Admin Dashboard**: Full analytics overview with Recharts (pie/line/bar charts) for user engagement and travel metrics.
- **Budgeting**: Real-time rough estimation calculator and dynamic budget wallet integration.
- **Responsive Navigation**: Sidebar navigation with mobile-friendly design.

## 🛠️ Installation & Setup

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Install Dependencies
Navigate into the `frontend` directory and install the necessary npm packages:

```bash
cd frontend
npm install
```

### 3. Environment Variables
If not already set, make sure the frontend knows where the Django API is running. By default, `axios` is configured to point to `http://127.0.0.1:8000` via interceptors or base URL configurations (see `src/api/client.js`).

### 4. Start the Development Server
Run the Vite development server:

```bash
npm run dev
```

The application will be accessible at: `http://localhost:5173/` (or whichever port Vite automatically assigns).

### 5. Building for Production
To generate a production-ready static bundle:
```bash
npm run build
```
The optimized files will be output to the `dist/` directory, ready to be served by NGINX, Apache, or platforms like Vercel/Netlify.

---

## 🏗️ Folder Structure (High-Level)
- `src/api/` - Axios clients and centralized API service definitions.
- `src/components/` - Reusable UI components (Sidebar, Topbar, User cards, etc).
- `src/context/` - Providers (AuthContext, ThemeContext) holding global state.
- `src/pages/` - Page-level components corresponding to specific routes (Dashboard, Builder, Admin, etc).
- `src/routes/` - Main `AppRoutes.jsx` mapping paths to components.
