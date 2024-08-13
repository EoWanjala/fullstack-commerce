from PIL import Image, ImageFile
from django.db import models
from autoslug import AutoSlugField
from django.utils import timezone
from django.core.files import File
from django.contrib.auth.models import User

from io import BytesIO

class Category(models.Model):
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null = True)
    title = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from='title', unique=True)
    ordering= models.IntegerField(default=0)
    is_featured = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ('ordering',)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return '/%s/' %(self.slug)
    
class Product(models.Model):
    category= models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    parent=models.ForeignKey('self', related_name='variants', on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from='title', unique=True)
    description = models.TextField(blank=True, null=True)
    price = models.FloatField()
    is_featured = models.BooleanField(default=False)
    num_available = models.IntegerField(default=1)
    num_visits = models.IntegerField(default=0)
    last_visit = models.DateTimeField(blank=True, null=True, default=timezone.now)
    image = models.ImageField(blank=True, null=True)
    thumbnail = models.ImageField(blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering=("-date_added",)

    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return '/%s/%s/' % (self.category.slug, self.slug)
    
    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        else:
            if self.image:
                self.thumbnail = self.make_thubmnail(self.image)
                self.save()
                return self.thumbnail.url
            else:
                return ''
            
    def make_thumbnail(dels, image, size=(300, 200)):
        ImageFile.LOAD_TRUNCATED_IMAGES = True
        img = Image.open(image)
        img.thumbnail(size)
        thumb = BytesIO()
        img.save(thumb, 'JPEG', quality=85)
        thumbnail = File(thumb, name=image.name)
        return thumbnail
    
    def get_rating(self):
        total = sum(int(review['stars']) for review in self.reviews.values())
        if self.reviews.count() > 0:
            return total / self.reviews.count()
        else:
            return 0
        
    def delete(self, *args, **kwargs):
        self.images.all().delete()
        self.reviews.all().delete()
        print(f'Proceeding with deletion of product')
        super(Product, self).delete(*args, **kwargs)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='uploads/', blank=True, null=True)
    thumbnail = models.ImageField(upload_to='uploads/', blank=True, null=True)
    
    def save(self, *args, **kwargs):
        self.thumbnail = self.make_thumbnail(self.image)
        super().save(*args, **kwargs)

    def make_thumbnail(self, image, size=(300, 200)):
        img = Image.open(image)
        img.convert('RGB')
        img.thumbnail(size)
        thumb_io = BytesIO()
        img.save(thumb_io, 'JPEG', quality=85)
        thumbnail = File(thumb_io, name=image.name)
        return thumbnail

class ProductReview(models.Model):
    product = models.ForeignKey(Product, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True)
    stars = models.IntegerField()
    date_added = models.DateTimeField(auto_now_add=True)
