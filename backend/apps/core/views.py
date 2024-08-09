from rest_framework import generics 
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework import status

from apps.store.models import Product, Category
from apps.store.serializers import ProductSerializer, CategorySerializer

class IndexView(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        featured_products = Product.objects.get(is_fetaured=True)
        featured_categories = Category.objects.get(is_fetaured=True)
        popular_products = Product.objects.all().order_by('-num_visits')[:4]
        recently_viewed_products = Product.objects.all().order_by('-last_visit')[:4]

        response_data = {
            'featured_products': ProductSerializer(featured_products, many=True).data,
            'featured_categories': CategorySerializer(featured_categories, many=True).data,
            'popular_products': ProductSerializer(popular_products, many=True).data,
            'recently_viewed_products': ProductSerializer(recently_viewed_products, many=True).data
        }

        return Response(response_data, status=status.HTTP_200_OK)
    
class AllProductsView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class= PageNumberPagination
    page_size = 20