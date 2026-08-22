from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import LoginSerializer, PasswordResetSerializer, RegisterSerializer, UserSerializer


class AuthViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=["post"])
    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            "user": UserSerializer(user, context={"request": request}).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["post"])
    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"user": UserSerializer(serializer.validated_data["user"]).data, **serializer.tokens()})

    @action(detail=False, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def logout(self, request):
        refresh = request.data.get("refresh")
        if refresh:
            RefreshToken(refresh).blacklist()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=["post"])
    def forgot_password(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "If the account exists, password reset instructions have been processed."})


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=["get", "put", "patch", "delete"])
    def me(self, request):
        if request.method == "GET":
            return Response(self.get_serializer(request.user).data)
        if request.method in {"PUT", "PATCH"}:
            serializer = self.get_serializer(request.user, data=request.data, partial=request.method == "PATCH")
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        request.user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
