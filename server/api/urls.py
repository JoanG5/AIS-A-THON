from django.urls import path
from . import views

urlpatterns = [
    path("health/", views.health, name="health"),
    path("form_submit/", views.form_submit, name="form_submit"),
]