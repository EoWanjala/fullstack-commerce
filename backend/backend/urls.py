from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', include("apps.core.urls")),
    path('store/', include('apps.store.urls')),
    path('userprofile/', include('apps.userprofile.urls')),
    path('api/', include("apps.cart.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "MJ's Technology"
admin.site.site_title = "MJ's Technology"
admin.site.index_title = "Welcome to Mj's Technologies"
 
 