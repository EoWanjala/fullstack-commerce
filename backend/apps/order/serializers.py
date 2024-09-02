from rest_framework import serializers
from .models import Order, OrderItem
from apps.store.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'image']

class OrderItemsSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True) 

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'price', 'quantity']

class OrderListSerializer(serializers.ModelSerializer):
    items = OrderItemsSerializer(many=True, read_only=True)
    total_quantity = serializers.IntegerField(source='get_total_quantity', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'first_name', 'last_name', 'email', 'address', 
            'zipcode', 'place', 'phone', 'created_at', 'paid', 'paid_amount', 
            'used_coupon', 'total_cost', 'payment_intent', 'shipped_date', 
            'status', 'items', 'total_quantity'
        ]
        read_only_fields = ['user', 'created_at', 'total_quantity']

