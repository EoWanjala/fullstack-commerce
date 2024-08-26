from django.shortcuts import render, redirect
from rest_framework import status, authentication, permissions
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer, UserRegisterSerializer

class UserRegisterView(APIView):
    def post(self, request, format=None):
        data = request.data
        username = data.get("username")
        first_name = data.get("first_name")
        last_name= data.get("last_name")
        email = data.get("email")
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if not all([username, first_name, last_name, email, password, confirm_password]):
            return Response({"detail": "Please Provide all required fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        if password != confirm_password:
            return Response({"detail": "Password do not match"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({"detail": "A user with the username already exists!"}, status=status.HTTP_403_FORBIDDEN)
        
        if User.objects.filter(email=email).exists():
            return Response({"detail": "A user with the email already exists!"}, status=status.HTTP_403_FORBIDDEN)

        user = User.objects.create(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=make_password(password),
        )
        serializer = UserRegisterSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserRegisterSerializer(self.user).data

        for k, v in serializer.items():
            data[k] = v
        
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer