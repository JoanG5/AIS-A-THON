from django.shortcuts import render
from django.urls import get_resolver
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
import tensorflow as tf
import numpy as np
from .models import UserDiabetesScreeningData


model = tf.keras.models.load_model('api/model.keras')


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


@api_view(['GET'])
def health(request):
    return Response("Server is up and runnning!")

@api_view(['GET', 'POST'])
def patient_data(request):
    if request.method == 'GET':
        all_patients = UserDiabetesScreeningData.objects.all()
        all_patients_list = [patient for patient in all_patients.values()]
        return JsonResponse({"data": all_patients_list}, status=200)

    if request.method == 'POST':
        data = request.data
        user = User.objects.get(id=1) # This is a temporary value. We will change this later on.
        new_user_screening = UserDiabetesScreeningData.objects.create(
            user=user,
            first_name=data['firstName'],
            last_name=data['lastName'],
            middle_name=data['middleName'],
            DOB=str(data['dob']),
            pregnancies=int(data['pregnancies']),
            glucose=int(data['plasmaGlucoseConcentration']),
            blood_pressure=int(data['diastolicBloodPressure']),
            skin_thickness=int(data['tricepsSkinfoldThickness']),
            insulin=int(data['serumInsulin']),
            bmi=float(data['bmi']),
            diabetes_pedigree_function=float(data['diabetesPedigreeFunction']),
            age=int(data['age'])
        )
        try:
            prediction = predict_diabetes(new_user_screening)
            new_user_screening.prediction = prediction
            new_user_screening.save()
            print("Form submitted successfully!")
            return JsonResponse({"message": "Form submitted successfully!", "prediction": prediction}, status=200)
        except Exception as e:
            return JsonResponse({"message": f"Error: {e}"})


def predict_diabetes(screening_data: UserDiabetesScreeningData) -> float:
    """ Takes in user data and returns a prediction of whether the user has diabetes or not """
    # Extract the relevant fields from screening_data
    data = [
        screening_data.pregnancies,
        screening_data.glucose,
        screening_data.blood_pressure,
        screening_data.skin_thickness,
        screening_data.insulin,
        screening_data.bmi,
        screening_data.diabetes_pedigree_function,
        screening_data.age
    ]

    # Convert data to a numpy array and reshape it to have shape 1 row, 8 columns(inferred)
    data = np.array(data).reshape(1, -1)
    try:
        prediction = model.predict(data)
    except Exception as e:
        print(e)
        return None
    return prediction[0][0].item()
