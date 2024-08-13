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
from .serializers import ProductSerializer, ProductDetailSerializer, CategorySerializer, ProductReviewSerializer

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

        return products.order_by(sorting, status=status.HTTP_200_OK)


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

    related_products = list(product.category.products.filter(parent=None).exclude(id=product.id))
    if len(related_products) >= 3:
        related_products = random.sample(related_products, 3)

    if product.parent:
        parent_slug = product.parent.slug
        return redirect('product_detail', category_slug=category_slug, slug=parent_slug)

    serializer = ProductDetailSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)


class CategoryDetailAPIView(generics.GenericAPIView):
    serializer_class = ProductSerializer
    pagination_class = PageNumberPagination

    def get(self, request, slug, *args, **kwargs):
        category = get_object_or_404(Category, slug=slug)
        products = category.products.filter(parent=None)

        paginator = self.pagination_class()
        paginated_products = paginator.paginate_queryset(products, request)

        serialized_products = self.get_serializer(paginated_products, many=True)
        serialized_category = CategorySerializer(category)

        return paginator.get_paginated_response({
            'category': serialized_category.data,
            'products': serialized_products.data
        })

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.filter(parent=None)
    serializer_class = CategorySerializer