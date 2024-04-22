from django.shortcuts import render
from django.urls import get_resolver
from django.http import HttpResponse, JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['badge_id'] = user.username
        # ...

        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
from django.contrib.auth.models import User
from .models import UserDiabetesScreeningData


@api_view(['GET'])
def health(request):
    return Response("Server is up and runnning!")

@api_view(['POST'])
def form_submit(request):
    if request.method == 'POST':
        data = request.data
        user = User.objects.get(id=1) # This is a temporary value. We will change this later on.
        new_user_screening = UserDiabetesScreeningData.objects.create(
            user=user,
            pregnancies=data['pregnancies'],
            glucose=data['plasmaGlucoseConcentration'],
            blood_pressure=data['diastolicBloodPressure'],
            skin_thickness=data['tricepsSkinfoldThickness'],
            insulin=data['serumInsulin'],
            bmi=data['bmi'],
            diabetes_pedigree_function=data['diabetesPedigreeFunction'],
            age=data['age']
        )
        print(new_user_screening)
        try:
            new_user_screening.save()
            print("Form submitted successfully!")
            return JsonResponse({"message": "Form submitted successfully!"}, status=200)
        except Exception as e:
            return JsonResponse({"message": f"Error: {e}"})
        
