from .models import Userprofile
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserSerializer(serializers.ModelSerializer):
    admin = serializers.SerializerMethodField(source='is_staff', read_only=True)

    class Meta:
        model=User
        fields = ["id", "username", "first_name", "last_name", "email", "admin"]

    def get_admin(self, obj):
        return obj.is_staff
    
class UserRegisterSerializer(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "token"]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
