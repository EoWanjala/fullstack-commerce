from rest_framework import serializers
from .models import Payment
from apps.order.models import Order

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['user', 'amount', 'email', 'verified', 'created_at', 'order']
        read_only_fields = ['ref', 'verified', 'created_at']

    def create(self, validated_data):
         """
        Override the create method to ensure that the 'ref' field is automatically generated
        and that other default behaviors are maintained.

        """
         payment = Payment.objects.create(**validated_data)
         return payment
    
class PaymentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['user', 'amount', 'ref', 'email', 'verified', 'created_at', 'order']

    def to_representation(self, instance):
        """
        Override the to_representation method to include the payment status.
        
        """
        representation = super().to_representation(instance)
        representation['payment_status'] = 'Verified' if instance.verified else 'Pending'
        return representation