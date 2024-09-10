from rest_framework import generics, filters, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

import random

from django.shortcuts import get_object_or_404, redirect
from django.db.models import Q
from django.utils import timezone

from .models import Product, Category, ProductReview
from .serializers import ProductSerializer, ProductDetailSerializer, CategorySerializer, ProductReviewSerializer, RelatedProductSerializer

class ProductSearchView(generics.ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        instock = self.request.query_params.get('instock')
        price_from = self.request.query_params.get('price_from', 0)
        price_to = self.request.query_params.get('price_to', 100000)
        sorting = self.request.query_params.get('sorting', '-date_added')

        products = Product.objects.filter(
            Q(title__icontains=query) | Q(description__icontains=query)
        ).filter(
            price__gte=price_from
        ).filter(
            price__lte=price_to
        )

        if instock:
            products = products.filter(num_available__gte=1)

        return products.order_by(sorting)


@api_view(['GET', 'POST'])
def product_detail_view(request, category_slug, slug):
    product = get_object_or_404(Product, slug=slug)
    product.num_visits += 1
    product.save()

    if request.method == 'POST':
        if request.user.is_authenticated:
            stars = request.data.get('stars', 3)
            content = request.data.get('content', '')
            ProductReview.objects.create(product=product, user=request.user, stars=stars, content=content)
            return Response({"detail": "Review submitted successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

    # Fetch related products
    related_products = list(product.category.products.filter(parent=None).exclude(id=product.id))
    if len(related_products) >= 3:
        related_products = random.sample(related_products, 3)

    # Serialize related products
    related_products_serializer = RelatedProductSerializer(related_products, many=True)

    if product.parent:
        parent_slug = product.parent.slug
        return redirect('product_detail', category_slug=category_slug, slug=parent_slug)

    # Include related products in the response
    serializer = ProductDetailSerializer(product)
    response_data = serializer.data
    response_data['related_products'] = related_products_serializer.data

    return Response(response_data, status=status.HTTP_200_OK)


class CategoryDetailAPIView(generics.GenericAPIView):
    serializer_class = ProductSerializer
    pagination_class = PageNumberPagination

    def get(self, request, slug, *args, **kwargs):
        category = get_object_or_404(Category, slug=slug)
        products = category.products.filter(parent=None)

        # Use DRF's built-in pagination method
        paginated_products = self.paginate_queryset(products)

        if paginated_products is not None:
            serialized_products = self.get_serializer(paginated_products, many=True)
            return self.get_paginated_response({
                'category': CategorySerializer(category).data,
                'products': serialized_products.data
            })

        # If pagination is not needed, serialize all products
        serialized_products = self.get_serializer(products, many=True)
        return Response({
            'category': CategorySerializer(category).data,
            'products': serialized_products.data
        })

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(parent=None)
    serializer_class = CategorySerializer