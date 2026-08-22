from collections import defaultdict
from decimal import Decimal

from django.db import transaction
from django.db.models import Sum

from budgets.models import Expense
from .models import ItineraryActivity, Trip, TripStop


def calculate_trip_budget(trip):
    expense_rows = trip.expenses.values("category").annotate(total=Sum("amount"))
    categories = defaultdict(lambda: Decimal("0.00"))
    for row in expense_rows:
        categories[row["category"]] += row["total"] or Decimal("0.00")

    activity_cost = ItineraryActivity.objects.filter(trip_stop__trip=trip).aggregate(total=Sum("estimated_cost"))["total"] or Decimal("0.00")
    categories["Activities"] += activity_cost
    total = sum(categories.values(), Decimal("0.00"))
    days = max(trip.days_count, 1)

    city_cost = []
    for stop in trip.stops.select_related("city"):
        expenses = Expense.objects.filter(trip_stop=stop).aggregate(total=Sum("amount"))["total"] or Decimal("0.00")
        activities = stop.itinerary_activities.aggregate(total=Sum("estimated_cost"))["total"] or Decimal("0.00")
        city_cost.append({"city": stop.city.city_name, "amount": expenses + activities})

    daily = []
    for row in trip.expenses.values("date").annotate(total=Sum("amount")).order_by("date"):
        daily.append({"date": row["date"], "amount": row["total"] or Decimal("0.00")})

    return {
        "total_estimated_cost": total,
        "average_cost_per_day": total / days,
        "categories": dict(categories),
        "city_cost": city_cost,
        "daily_spending": daily,
        "over_budget_warning": total > Decimal("250000.00"),
    }


@transaction.atomic
def duplicate_trip(source, user):
    duplicate = Trip.objects.create(
        user=user,
        name=f"{source.name} Copy",
        description=source.description,
        start_date=source.start_date,
        end_date=source.end_date,
        cover_image=source.cover_image,
        status=Trip.PLANNING,
        is_public=False,
    )
    stop_map = {}
    for stop in source.stops.all():
        stop_map[stop.id] = TripStop.objects.create(
            trip=duplicate,
            city=stop.city,
            arrival_date=stop.arrival_date,
            departure_date=stop.departure_date,
            order=stop.order,
            notes=stop.notes,
        )
    for item in ItineraryActivity.objects.filter(trip_stop__trip=source):
        ItineraryActivity.objects.create(
            trip_stop=stop_map[item.trip_stop_id],
            activity=item.activity,
            date=item.date,
            start_time=item.start_time,
            end_time=item.end_time,
            order=item.order,
            notes=item.notes,
            estimated_cost=item.estimated_cost,
        )
    for expense in source.expenses.all():
        Expense.objects.create(
            trip=duplicate,
            trip_stop=stop_map.get(expense.trip_stop_id),
            category=expense.category,
            description=expense.description,
            amount=expense.amount,
            date=expense.date,
        )
    return duplicate
