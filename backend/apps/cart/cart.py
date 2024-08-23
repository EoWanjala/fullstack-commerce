from django.conf import settings

from apps.store.models import Product

class Cart(object):
    def __init__(self, request):
        self.session = request.session
        cart = self.session.get(settings.CART_SESSION_ID)

        if not cart:
            cart = self.session[settings.CART_SESSION_ID] = {}
        
        self.cart = cart
    
    def __iter__(self):
        product_ids = self.cart.keys()
        product_clean_ids = [int(p) for p in product_ids]

        products = Product.objects.filter(id__in=product_clean_ids)

        for product in products:
            self.cart[str(product.id)]['product'] = product

        for item in self.cart.values():
            item['total_price'] = float(item['price']) * int(item['quantity'])
            yield item

    
    def __len__(self):
        return sum(item['quantity'] for item in self.cart.values())
    
    def add(self, product, quantity=1, update_quantity=False):
        product_id = str(product.id)
        price = product.price

        print('Product_id:', product_id)

        if product_id not in self.cart:
            self.cart[product_id] = {'quantity': quantity, 'price': price, 'id': product_id}

        if update_quantity:
            self.cart[product_id]['quantity'] = quantity
        else:
            self.cart[product_id]['quantity'] += quantity  # Properly increment

        self.save()
        print("Cart saved: ", self.session.get(settings.CART_SESSION_ID))

    
    def has_product(self, product_id):
        if str(product_id) in self.cart:
            return True
        else:
            return False
    
    def remove(self, product_id):
        if product_id in self.cart:
            del self.cart[product_id]
            self.save()

    
    def save(self):
        self.session.modified = True
        print("Cart saved in session: ", self.cart)
    
    def clear(self):
        del self.session[settings.CART_SESSION_ID]
        self.session.modified = True

    def get_total_length(self):
        return sum(int(item['quantity']) for item in self.cart.values())
    
    def get_total_cost(self):
        return sum(float(item['total_price']) for item in self)