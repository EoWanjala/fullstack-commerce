from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from apps.order.views import admin_order_pdf

urlpatterns = [
    path('admin/admin_order_pdf/<int:order_id>/', admin_order_pdf, name='admin_order_pdf'),
    path('admin/', admin.site.urls),
    path('home/', include("apps.core.urls")),
    path('store/', include('apps.store.urls')),
    path('userprofile/', include('apps.userprofile.urls')),
    path('api/', include("apps.cart.urls")),
    path('order/', include('apps.order.urls')),
    path('payment/', include('apps.payment.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "MJ's Technology"
admin.site.site_title = "MJ's Technology"
admin.site.index_title = "Welcome to Mj's Technologies"
 
 