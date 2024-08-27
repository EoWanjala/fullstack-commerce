from django.contrib import admin

from .models import Userprofile

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ["username", "email", "first_name", "last_name", "place", "address", "phone", "zipcode"]
    list_filter = ["username", "email", "first_name", "last_name", "place"]