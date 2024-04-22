from django.shortcuts import render
from django.urls import get_resolver
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view

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
            return HttpResponse({"message": "Form submitted successfully!"})
        except Exception as e:
            return Response({"message": f"Error: {e}"})
        
