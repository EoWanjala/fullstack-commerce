from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics, views
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import Payment

from apps.order.models import Order, OrderItem
from apps.store.models import Product
from apps.cart.cart import Cart

from .serializers import PaymentDetailSerializer
from django.conf import settings
import json

from django.db import transaction

import logging
logger = logging.getLogger(__name__)

class InitiatePaymentView(views.APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        # Get the order data from the request
        order_data = request.data.get('order')
        cart_items = order_data.get('items')  # Cart items are sent as part of the order data

        if not order_data or not cart_items:
            return Response({'error_message': 'Order data or cart items are missing.'}, status=status.HTTP_400_BAD_REQUEST)

        user = request.user

        # Create the order
        order = Order.objects.create(
            user=user,
            first_name=order_data.get('first_name', user.first_name),
            last_name=order_data.get('last_name', user.last_name),
            email=order_data.get('email', user.email),
            address=order_data.get('address'),
            zipcode=order_data.get('zipcode'),
            place=order_data.get('place'),
            phone=order_data.get('phone')
        )
        print(f"Order created with ID: {order.id}")

        total_cost = 0

        # Add each cart item to the order
        for item in cart_items:
            product_instance = get_object_or_404(Product, pk=item['id'])
            quantity = item['quantity']
            total_price = float(product_instance.price) * quantity
            total_cost += total_price

            # Create order item
            OrderItem.objects.create(
                order=order,
                product=product_instance,
                price=product_instance.price,
                quantity=quantity
            )

        # Save total cost to the order
        order.total_cost = total_cost
        order.save()

        # Create the payment and link it to the order
        payment = Payment.objects.create(
            amount=total_cost,
            email=user.email,
            user=user,
            order=order  # Linking payment to the order
        )
        payment.save()

        return Response({
            'order': {
                'id': order.id,
                'total_cost': total_cost
            },
            'payment': PaymentDetailSerializer(payment).data,
            'paystack_pub_key': settings.PAYSTACK_PUBLIC_KEY
        }, status=status.HTTP_201_CREATED)


    
class VerifyPaymentView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, ref):
        try:
            cart = Cart(request)
            payment = get_object_or_404(Payment, ref=ref)
            verified = payment.verify_payment()

            if verified:
                order = get_object_or_404(Order, id=payment.order_id)
                order.paid = True
                order.save()

                order_info = {
                    'id': order.id,
                    'total_cost': order.total_cost
                }
                cart.clear()
                return Response({
                    'placed_order': order_info,
                    'payment': PaymentDetailSerializer(payment).data
                }, status=status.HTTP_200_OK)
            return Response({
                'message': 'Invalid payment. Please contact support.'
            }, status=status.HTTP_400_BAD_REQUEST)
        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found for this reference'}, status=status.HTTP_404_NOT_FOUND)

