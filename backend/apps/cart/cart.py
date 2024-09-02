from django.conf import settings
from apps.store.serializers import ProductSerializer
from apps.store.models import Product

class Cart(object):
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)

        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        self.cart = cart
    
    def save(self):
        self.session.modified = True
    
    def __iter__(self):
        product_ids = list(self.cart.keys())
        products = Product.objects.filter(id__in=product_ids)

        for product in products:
            product_data = ProductSerializer(product).data  # Serialize product data
            self.cart[str(product.id)]['product_data'] = product_data  # Store serialized data

        for item in self.cart.values():
            product_data = item['product_data']
            item['total_price'] = float(item['price']) * int(item['quantity'])
            item.update(product_data)  # Merge serialized product data
            yield item

    def __len__(self):
        return sum(int(item['quantity']) for item in self.cart.values())
    
    def add(self, product, quantity=1, update_quantity=False):
        
        print(f"Adding product {product.id} to cart with quantity {quantity}")
        product_id = str(product.id)
        price = product.price

        if product_id not in self.cart:
            self.cart[product_id] = {
                'quantity': quantity, 
                'price': price, 
                'id': product_id, 
                'category_slug': product.category.slug, 
                'slug': product.slug, 'thumbnail': str(product.thumbnail.url) if product.thumbnail else None,
                'num_available': product.num_available,
                }
        elif update_quantity:
            self.cart[product_id]['quantity'] = quantity
        else:
            self.cart[product_id]['quantity'] += quantity

        self.session.modified = True

        print("Session Key after adding:", self.session.session_key)
        print("Session Data after adding:", self.session.get(settings.CART_SESSION_ID))

        self.save()
        print("Cart after adding item: ", self.cart) 
    
    def has_product(self, product_id):
        return str(product_id) in self.cart
    
    def remove(self, product_id):
        if str(product_id) in self.cart:
            del self.cart[str(product_id)]
            self.save()
    
    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.session.modified = True

    def get_total_length(self):
        return sum(int(item['quantity']) for item in self.cart.values())
    
    def get_total_cost(self):
        return sum(float(item['price']) * int(item['quantity']) for item in self.cart.values())
