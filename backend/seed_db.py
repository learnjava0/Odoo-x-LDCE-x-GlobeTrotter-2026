import os
import django
from datetime import date, timedelta
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User
from destinations.models import Destination
from activities.models import Activity
from trips.models import Trip, TripStop
from budgets.models import Expense

def seed():
    # 1. Create a dummy user
    user, created = User.objects.get_or_create(email="test@example.com", defaults={
        "name": "Test User",
    })
    if created:
        user.set_password("password123")
        user.save()

    # 2. Create Destinations (cities)
    dest_data = [
        {"city_name": "Paris", "country": "France", "region": "Europe", "latitude": 48.8566, "longitude": 2.3522},
        {"city_name": "Tokyo", "country": "Japan", "region": "Asia", "latitude": 35.6762, "longitude": 139.6503},
        {"city_name": "New York", "country": "USA", "region": "Americas", "latitude": 40.7128, "longitude": -74.0060},
        {"city_name": "Sydney", "country": "Australia", "region": "Oceania", "latitude": -33.8688, "longitude": 151.2093},
        {"city_name": "Dubai", "country": "UAE", "region": "Middle East", "latitude": 25.2048, "longitude": 55.2708},
    ]
    dests = []
    for d in dest_data:
        obj, _ = Destination.objects.get_or_create(city_name=d["city_name"], defaults=d)
        dests.append(obj)

    # 3. Create Activities
    act_data = [
        {"name": "Eiffel Tower Visit", "description": "Visit the iconic tower", "city": dests[0], "category": "Sightseeing", "estimated_cost": Decimal('30.00'), "duration": 120},
        {"name": "Sushi Workshop", "description": "Learn to make sushi", "city": dests[1], "category": "Food", "estimated_cost": Decimal('80.00'), "duration": 180},
    ]
    for a in act_data:
        Activity.objects.get_or_create(name=a["name"], city=a["city"], defaults=a)

    # 4. Create a Trip
    trip, t_created = Trip.objects.get_or_create(user=user, name="My World Tour", defaults={
        "description": "A quick trip around some cool places.",
        "start_date": date.today() + timedelta(days=5),
        "end_date": date.today() + timedelta(days=15),
        "status": "PLANNING"
    })

    if t_created:
        stop1 = TripStop.objects.create(trip=trip, city=dests[0], order=1, arrival_date=trip.start_date, departure_date=trip.start_date + timedelta(days=3))
        stop2 = TripStop.objects.create(trip=trip, city=dests[1], order=2, arrival_date=trip.start_date + timedelta(days=4), departure_date=trip.start_date + timedelta(days=7))

        Expense.objects.create(trip=trip, trip_stop=stop1, category="Transport", description="Flight to Paris", amount=Decimal('500.00'), date=trip.start_date)
        Expense.objects.create(trip=trip, trip_stop=stop1, category="Food", description="Dinner in Paris", amount=Decimal('75.00'), date=trip.start_date)

    print("Seeding successful!")

if __name__ == '__main__':
    seed()
