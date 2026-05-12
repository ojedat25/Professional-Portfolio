from django.urls import path
from django.urls import include
from . import views

urlpatterns = [
    path("repos/", views.get_repos, name="get_repos"),
]