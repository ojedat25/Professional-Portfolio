"""
Root URL map: /api/github/ (repos), /api/contact/ (form), /api/periodic_tasks/ (health ping), /admin/.
"""

from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/github/", include("github.urls")),
    path("api/periodic_tasks/", include("periodic_tasks.urls")),
    path("api/contact/", include("contact.urls")),
]
