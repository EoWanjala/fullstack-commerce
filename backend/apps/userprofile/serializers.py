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
    
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Userprofile
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'address', 'phone', 'place', 'zipcode']

    def create(self, validated_data):
        # Extract user data
        user_data = {
            'username': validated_data.get('username'),
            'email': validated_data.get('email'),
            'first_name': validated_data.get('first_name'),
            'last_name': validated_data.get('last_name'),
            'password': validated_data.pop('password'), 
        }
        user = User(**user_data)
        user.set_password(user_data['password']) 
        user.save()

        userprofile = Userprofile.objects.create(user=user, **validated_data)
        return userprofile
