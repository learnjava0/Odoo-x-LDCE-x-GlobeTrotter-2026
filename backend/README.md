# GlobeTrotter Backend (Django REST Framework)

This is the backend API for **GlobeTrotter** - an AI-powered travel planner platform. It is built using **Django** and **Django REST Framework (DRF)**, utilizing a **PostgreSQL** database to store users, trips, destinations, activities, and budget tracking data.

## 🚀 Tech Stack
- **Framework**: Django 5
- **API**: Django REST Framework (DRF)
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens) via `djangorestframework-simplejwt`
- **CORS**: `django-cors-headers`

## 📁 System Architecture
The backend is split into multiple Django apps:
- `accounts`: Handles custom user model, authentication, and JWT tokens.
- `activities`: Manages individual activities, sightseeing, and costs.
- `analytics`: Provides statistics and aggregations for the Admin Panel.
- `budgets`: Tracks overall expenses dynamically for trips.
- `destinations`: Manages available cities, countries, and popularity scores.
- `trips`: Handles the core logic for trip creation, itinerary stops, and sharing.

## 🛠️ Installation & Setup

### 1. Prerequisites
- Python 3.10+
- PostgreSQL server running locally

### 2. Database Setup
Create a PostgreSQL database named `globe_trotter`:
```bash
# In your terminal (if using psql)
sudo -u postgres psql -c "CREATE DATABASE globe_trotter;"
```
*(Update `backend/config/settings.py` if your database credentials differ from the defaults: user=`postgres`, password='', host=`localhost`)*

### 3. Install Dependencies
Navigate into the `backend` directory and set up a virtual environment (optional but recommended), then install the requirements:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

### 4. Run Migrations
Apply the database schema changes:
```bash
python3 manage.py migrate
```

### 5. Seed Initial Data (Optional)
To test the application properly, you can seed the database with globally diverse cities, activities, and mock users/trips.

Run these scripts in order:
```bash
python3 seed_db.py             # Seeds destinations and activities
python3 seed_more_cities.py    # Adds 20+ additional diverse cities
python3 seed_users_trips.py    # Creates test users, trips, and expenses
```

*Note: You can use the generated Admin user after seeding:* `admin@example.com` / `admin@123`

### 6. Start the Server
Launch the development server:
```bash
python3 manage.py runserver
```
The API will be available at `http://localhost:8000/api/` (or `http://127.0.0.1:8000/api/`).

---

## 🔒 Authentication
All endpoints (except login, token refresh, and destinations) require an Authorization header:
```http
Authorization: Bearer <your_access_token>
```
Get a token by sending a POST request to `/api/auth/login/` with your `email` and `password`.
