from django.urls import path
from . import views
from .views import CustomTokenObtainPairView


urlpatterns = [
    path("health/", views.health, name="health"),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("form_submit/", views.form_submit, name="form_submit"),
]