from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.http import JsonResponse

from django.conf import settings
from apps.store.serializers import ProductSerializer
from apps.store.models import Product
from .cart import Cart

class CartView(APIView):
    def get(self, request):
        cart = Cart(request)
        cart_data = []

        for item in cart:
            product_data = {
                'id': item['id'],  # From the serialized data
                'title': item['title'],
                'price': str(item['price']),
                'quantity': item['quantity'],
                'url': f'/{item.get("category_slug")}/{item.get("slug")}/',  # Use serialized fields
                'total_price': str(item['total_price']),
                'thumbnail': item.get('thumbnail'),
                'num_available': item.get('num_available')
            }

            cart_data.append(product_data)

        total_quantity = cart.get_total_length()
        total_cost = cart.get_total_cost()

        user_data = {
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'email': request.user.email,
            'address': request.user.address,
            'zipcode': request.user.zipcode,
            'place': request.user.place,
            'phone': request.user.phone,
        } if request.user.is_authenticated else {}

        response_data = {
            'cart': cart_data,
            'total_quantity': total_quantity,
            'total_cost': total_cost,
            **user_data,
        }

        print("Response data: ", response_data)
        return JsonResponse(response_data, status=status.HTTP_200_OK)




    
    def post(self, request):
        cart = Cart(request)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get("quantity", 1))
        update = request.data.get('update_quantity', False)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product Not Found"}, status=status.HTTP_404_NOT_FOUND)
        
        if not update:
            cart.add(product=product, quantity=1, update_quantity=False)
        else:
            cart.add(product=product, quantity=quantity, update_quantity=True)

        # Debugging the cart contents after adding
        cart_data = []
        for item in cart:
            cart_data.append({
                'id': item['id'],
                'title': item['title'],
                'price': str(item['price']),
                'quantity': item['quantity'],
                'url': f'/{item.get("category_slug")}/{item.get("slug")}/',
                'total_price': str(item['total_price']),
                'thumbnail': item.get('thumbnail'),
                'num_available': item.get('num_available')
            })
        
        total_quantity = cart.get_total_length()
        total_cost = cart.get_total_cost()

        response_data = {
            'cart': cart_data,
            'total_quantity': total_quantity,
            'total_cost': total_cost,
        }

        print("Response data after adding item: ", response_data)
        return Response(response_data, status=status.HTTP_200_OK)

    
    def delete(self, request):
        cart = Cart(request)
        product_id = request.data.get('product_id')

        if not cart.has_product(product_id):
            return Response({"error": "Product Not Found in Cart"}, status=status.HTTP_404_NOT_FOUND)
        
        cart.remove(product_id)

        return Response({"success": "Product removed from cart"}, status=status.HTTP_200_OK)
    
    def put(self, request):
        cart = Cart(request)
        cart.clear()
        return Response({"success": "Cart cleared"}, status=status.HTTP_200_OK)
