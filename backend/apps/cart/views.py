from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.conf import settings
from apps.store.serializers import ProductSerializer
from apps.store.models import Product
from .cart import Cart

class CartView(APIView):
    def get(self, request):
        cart = Cart(request)
        cart_data = []

        for item in cart:
            product = item['product']
            url = f'/{product.category.slug}/{product.slug}/'
            product_data = ProductSerializer(product).data  # You can serialize the product here if needed
            print("Serialized Product Data: ", product_data)  
            
            cart_data.append({
                'id': product.id,
                'title': product.title,
                'price': str(product.price),
                'quantity': item['quantity'],
                'url': url,
                'total_price': str(item['total_price']),
                'thumbnail': product.get_thumbnail(),
                'num_available': product.num_available
            })

        total_quantity = cart.get_total_length()
        total_cost = cart.get_total_cost()

        # Get user data if authenticated
        first_name = request.user.first_name if request.user.is_authenticated else ''
        last_name = request.user.last_name if request.user.is_authenticated else ''
        email = request.user.email if request.user.is_authenticated else ''
        address = request.user.address if request.user.is_authenticated else ''
        zipcode = request.user.zipcode if request.user.is_authenticated else ''
        place = request.user.place if request.user.is_authenticated else ''
        phone = request.user.phone if request.user.is_authenticated else ''

        return Response({
            'cart': cart_data,
            'total_quantity': total_quantity,
            'total_cost': total_cost,
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'phone': phone,
            'address': address,
            'zipcode': zipcode,
            'place': place,
        }, status=status.HTTP_200_OK)


    
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
        print("Added to cart")

        return Response({"success": "Product added/updated in cart"}, status=status.HTTP_200_OK)
    
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
