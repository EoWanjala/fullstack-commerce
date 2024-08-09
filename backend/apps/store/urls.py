from django.urls import path
from .views import ProductSearchView, product_detail_view, CategoryDetailView

urlpatterns = [
    path('search/', ProductSearchView.as_view(), name='product_search'),
    path('category/<slug:slug>/', CategoryDetailView.as_view(), name='category_detail'),
    path('<slug:category_slug>/<slug:slug>/', product_detail_view, name='product_detail'),
]
