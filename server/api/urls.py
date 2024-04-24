from django.urls import path
from . import views
from .views import CustomTokenObtainPairView


urlpatterns = [
    path("health/", views.health, name="health"),
    path("patient_data/", views.patient_data, name="patient_data"),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
]