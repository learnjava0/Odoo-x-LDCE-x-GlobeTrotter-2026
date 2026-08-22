from rest_framework import permissions, viewsets

from trips.permissions import IsTripOwner
from .models import Expense
from .serializers import ExpenseSerializer


class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated, IsTripOwner]

    def get_queryset(self):
        return Expense.objects.filter(trip__user=self.request.user).select_related("trip", "trip_stop")
