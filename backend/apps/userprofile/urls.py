from django.urls import path
from apps.userprofile import views

urlpatterns = [
    path('register/', views.UserRegisterView.as_view(), name='register'),
    path("login/", views.MyTokenObtainPairView.as_view(), name='login')
]