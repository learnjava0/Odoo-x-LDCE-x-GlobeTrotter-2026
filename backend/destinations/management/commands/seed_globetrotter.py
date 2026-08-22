from datetime import date, time
from decimal import Decimal

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from activities.models import Activity
from budgets.models import Expense
from destinations.models import Destination
from trips.models import ItineraryActivity, Trip, TripStop


IMG = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"


class Command(BaseCommand):
    help = "Seed GlobeTrotter demo cities, activities, and Western India Explorer trip."

    def handle(self, *args, **options):
        cities = [
            ("Ahmedabad", "India", "Gujarat", 35, 78),
            ("Mumbai", "India", "Maharashtra", 62, 92),
            ("Delhi", "India", "Delhi NCR", 55, 90),
            ("Goa", "India", "West India", 58, 88),
            ("Jaipur", "India", "Rajasthan", 42, 84),
            ("Bangalore", "India", "Karnataka", 60, 82),
            ("Dubai", "UAE", "Middle East", 82, 91),
            ("Singapore", "Singapore", "Southeast Asia", 86, 93),
            ("Paris", "France", "Europe", 85, 95),
            ("London", "United Kingdom", "Europe", 88, 94),
            ("Tokyo", "Japan", "East Asia", 78, 96),
            ("New York", "USA", "North America", 92, 95),
            ("Rome", "Italy", "Europe", 74, 89),
            ("Barcelona", "Spain", "Europe", 70, 88),
            ("Sydney", "Australia", "Oceania", 84, 87),
        ]
        city_objs = {}
        for name, country, region, cost, pop in cities:
            city_objs[name], _ = Destination.objects.update_or_create(
                city_name=name,
                country=country,
                defaults={"region": region, "description": f"{name} blends local culture, food, landmarks, and memorable day plans.", "image": IMG, "cost_index": cost, "popularity_score": pop},
            )

        activity_names = {
            "Ahmedabad": ["Sabarmati Ashram", "Adalaj Stepwell", "Manek Chowk Food Walk"],
            "Mumbai": ["Gateway of India", "Marine Drive", "Colaba Causeway"],
            "Goa": ["Baga Beach", "Fort Aguada", "Dudhsagar Falls"],
            "Paris": ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
        }
        for city in city_objs.values():
            names = activity_names.get(city.city_name, [f"{city.city_name} Heritage Walk", f"{city.city_name} Food Trail", f"{city.city_name} Sunset Point"])
            for i, name in enumerate(names):
                Activity.objects.update_or_create(
                    city=city,
                    name=name,
                    defaults={
                        "description": f"Experience {name} with enough context to make it easy to add into an itinerary.",
                        "category": ["Culture", "Sightseeing", "Food", "Nature"][i % 4],
                        "image": IMG,
                        "duration": [90, 120, 180][i % 3],
                        "estimated_cost": Decimal([500, 900, 1500][i % 3]),
                        "rating": Decimal("4.6"),
                    },
                )

        User = get_user_model()
        user, _ = User.objects.get_or_create(email="demo@globetrotter.test", defaults={"name": "Demo Traveler"})
        user.name = user.name or "Demo Traveler"
        user.set_password("DemoPass123")
        user.save()

        trip, _ = Trip.objects.update_or_create(
            user=user,
            name="Western India Explorer",
            defaults={"description": "Ahmedabad, Mumbai, and Goa in one polished demo itinerary.", "start_date": date(2026, 10, 10), "end_date": date(2026, 10, 18), "cover_image": IMG, "is_public": True},
        )
        stops = [
            ("Ahmedabad", date(2026, 10, 10), date(2026, 10, 12), 1),
            ("Mumbai", date(2026, 10, 13), date(2026, 10, 15), 2),
            ("Goa", date(2026, 10, 16), date(2026, 10, 18), 3),
        ]
        stop_objs = {}
        for city, arrival, departure, order in stops:
            stop_objs[city], _ = TripStop.objects.update_or_create(trip=trip, city=city_objs[city], defaults={"arrival_date": arrival, "departure_date": departure, "order": order})

        schedule = [
            ("Ahmedabad", "Sabarmati Ashram", date(2026, 10, 10), time(10, 0)),
            ("Ahmedabad", "Adalaj Stepwell", date(2026, 10, 11), time(9, 30)),
            ("Mumbai", "Gateway of India", date(2026, 10, 13), time(10, 0)),
            ("Mumbai", "Marine Drive", date(2026, 10, 14), time(18, 0)),
            ("Goa", "Baga Beach", date(2026, 10, 16), time(16, 0)),
            ("Goa", "Fort Aguada", date(2026, 10, 17), time(10, 0)),
            ("Goa", "Dudhsagar Falls", date(2026, 10, 18), time(8, 0)),
        ]
        for order, (city, name, day, start) in enumerate(schedule, start=1):
            activity = Activity.objects.get(city=city_objs[city], name=name)
            ItineraryActivity.objects.update_or_create(trip_stop=stop_objs[city], activity=activity, defaults={"date": day, "start_time": start, "order": order, "estimated_cost": activity.estimated_cost})

        for category, amount in [("Transport", 15000), ("Accommodation", 25000), ("Food", 15000), ("Other", 5500)]:
            Expense.objects.update_or_create(trip=trip, category=category, description=f"Demo {category}", defaults={"amount": amount, "date": trip.start_date})

        self.stdout.write(self.style.SUCCESS("GlobeTrotter seed data ready. Login: demo@globetrotter.test / DemoPass123"))
