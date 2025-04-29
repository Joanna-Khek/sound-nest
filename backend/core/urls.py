from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('djoser.urls')), # This would generate the /users/ routes
    path('api/', include('users.urls')), # Adds JWT support, if using djoser+jwt
    path('api/', include('song_explorer.urls')), # Your app's URLs
]
