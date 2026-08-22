# Django Backend

Initial Django backend scaffold.

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

## Endpoints

- `GET /api/health/` returns a basic service health response.
