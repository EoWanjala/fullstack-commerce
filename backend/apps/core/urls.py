from django.urls import path
from .views import IndexView, AllProductsView

urlpatterns = [
    path('index/', IndexView.as_view(), name='index'),
    path('allproducts/', AllProductsView.as_view(), name='all_products'),
]
