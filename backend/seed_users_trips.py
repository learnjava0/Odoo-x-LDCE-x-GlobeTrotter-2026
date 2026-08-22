import os
import django
import random
from datetime import date, timedelta
from decimal import Decimal
import uuid

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User
from destinations.models import Destination
from trips.models import Trip, TripStop
from budgets.models import Expense

def seed():
    # 1. Create a few users
    users_data = [
        {"email": "alice@example.com", "name": "Alice Explorer"},
        {"email": "bob@example.com", "name": "Bob Backpacker"},
        {"email": "charlie@example.com", "name": "Charlie Globetrotter"},
        {"email": "diana@example.com", "name": "Diana Voyager"},
    ]
    users = []
    for ud in users_data:
        u, created = User.objects.get_or_create(email=ud["email"], defaults={"name": ud["name"]})
        if created:
            u.set_password("password123")
            u.save()
        users.append(u)
    
    # Also grab the main test user if it exists
    main_user = User.objects.filter(email="test@example.com").first()
    if main_user and main_user not in users:
        users.append(main_user)

    # 2. Grab destinations
    cities = list(Destination.objects.all())
    if not cities:
        print("No cities found! Run seed_more_cities.py first.")
        return

    statuses = ["PLANNING", "UPCOMING", "COMPLETED"]
    
    # 3. Create trips for each user
    trip_ideas = [
        ("European Summer Adventure", "Backpacking through the best of Europe.", "https://images.unsplash.com/photo-1542385151-efd5cc19bd06?auto=format&fit=crop&w=800&q=80"),
        ("Asian Cultural Tour", "Exploring vibrant cities and incredible food.", "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?auto=format&fit=crop&w=800&q=80"),
        ("American West Coast", "Road trip down the Pacific Coast Highway.", "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80"),
        ("Weekend Getaway", "A quick trip to clear the mind.", "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80"),
        ("Honeymoon Retreat", "Relaxing luxury in paradise.", "https://images.unsplash.com/photo-1583422409516-2895a77ef244?auto=format&fit=crop&w=800&q=80"),
        ("End of Year Celebration", "Bringing in the new year with friends.", "https://images.unsplash.com/photo-1467226632440-65f0b4957563?auto=format&fit=crop&w=800&q=80")
    ]

    trips_created = 0
    # Make sure every user gets at least 2 trips
    for u in users:
        for _ in range(2):
            idea = random.choice(trip_ideas)
            status = random.choice(statuses)
            start_offset = random.randint(-60, 60)
            length = random.randint(3, 14)

            start = date.today() + timedelta(days=start_offset)
            end = start + timedelta(days=length)

            trip = Trip.objects.create(
                user=u,
                name=f"{u.name.split()[0]}'s {idea[0]}",
                description=idea[1],
                start_date=start,
                end_date=end,
                cover_image=idea[2],
                status=status,
                is_public=random.choice([True, False]),
                public_slug=str(uuid.uuid4())[:8]
            )
            trips_created += 1

            # 4. Create Trip Stops
            # Pick 1-3 random cities
            num_stops = random.randint(1, 3)
            trip_cities = random.sample(cities, num_stops)
            
            current_date = trip.start_date
            for i, city in enumerate(trip_cities):
                stop_days = max(1, length // num_stops)
                stop_end = current_date + timedelta(days=stop_days)
                if i == num_stops - 1:
                    stop_end = trip.end_date

                stop = TripStop.objects.create(
                    trip=trip,
                    city=city,
                    order=i+1,
                    arrival_date=current_date,
                    departure_date=stop_end,
                    notes=f"Excited to visit {city.city_name}!"
                )

                # 5. Add Expenses
                Expense.objects.create(
                    trip=trip,
                    trip_stop=stop,
                    category="Transport",
                    description=f"Flight to {city.city_name}",
                    amount=Decimal(random.randint(100, 600)),
                    date=current_date
                )
                Expense.objects.create(
                    trip=trip,
                    trip_stop=stop,
                    category="Accommodation",
                    description=f"Hotel in {city.city_name}",
                    amount=Decimal(random.randint(50, 200) * stop_days),
                    date=current_date
                )
                Expense.objects.create(
                    trip=trip,
                    trip_stop=stop,
                    category="Food",
                    description=f"Dining in {city.city_name}",
                    amount=Decimal(random.randint(60, 150)),
                    date=current_date + timedelta(days=1)
                )

                current_date = stop_end

    print(f"Successfully generated {len(users)} users and {trips_created} trips complete with stops and budgets!")

if __name__ == '__main__':
    seed()
