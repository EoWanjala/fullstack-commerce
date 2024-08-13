from django.urls import path
from .views import ProductSearchView, product_detail_view, CategoryDetailAPIView, CategoryListView

urlpatterns = [
    path('search/', ProductSearchView.as_view(), name='product_search'),
    path('category/<slug:slug>/', CategoryDetailAPIView.as_view(), name='category_detail'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('<slug:category_slug>/<slug:slug>/', product_detail_view, name='product_detail'),
]
