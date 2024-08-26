from rest_framework import serializers
from .models import Category, Product, ProductImage, ProductReview

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'parent', 'title', 'slug', 'ordering', 'is_featured']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'thumbnail']

class ProductReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ProductReview
        fields = ['id', 'user', 'content', 'stars', 'date_added']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    rating = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()
    variants = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'category', 'title', 'slug', 'description', 'variants',
            'price', 'is_featured', 'num_available', 'num_visits', 
            'last_visit', 'image', 'thumbnail', 'date_added', 
            'images', 'reviews', 'rating'
        ]

    def get_rating(self, obj):
        return obj.get_rating()

    def get_thumbnail(self, obj):
        # Check if thumbnail exists and return its URL
        if obj.thumbnail:
            return obj.thumbnail.url
        return None
    
    def get_variants(self, obj):
        variants = obj.variants.all()
        return ProductSerializer(variants, many=True).data

class ProductDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    rating = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()
    variants = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'category', 'title', 'slug', 'description', 'parent', 'variants',
            'price', 'is_featured', 'num_available', 'num_visits', 
            'last_visit', 'image', 'thumbnail', 'date_added', 
            'images', 'reviews', 'rating', 'get_absolute_url'
        ]


    def get_rating(self, obj):
        return obj.get_rating()

    def get_thumbnail(self, obj):
        return obj.get_thumbnail()
    
    def get_variants(self, obj):
        variants = obj.variants.all()
        return ProductSerializer(variants, many=True).data
    
class RelatedProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'slug', 'price', 'thumbnail']

