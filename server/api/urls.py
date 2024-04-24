from django.urls import path
from . import views

urlpatterns = [
    path("health/", views.health, name="health"),
    path("patient_data/", views.patient_data, name="patient_data"),
]