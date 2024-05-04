# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from datetime import datetime

class UserDiabetesScreeningData(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Associated User")
    first_name = models.CharField(default="", max_length=255, help_text="First name of the individual.")
    last_name = models.CharField(default="", max_length=255, help_text="Last name of the individual.")
    middle_name = models.CharField(default="", max_length=255, help_text="Middle name of the individual.")
    DOB = models.DateField(default=datetime.now, help_text="Date of birth of the individual.")
    pregnancies = models.IntegerField(
        validators=[MinValueValidator(0)], 
        help_text="Number of times pregnant."
    )
    glucose = models.IntegerField(
        validators=[MinValueValidator(0)], 
        help_text="Plasma glucose concentration over 2 hours in an oral glucose tolerance test."
    )
    blood_pressure = models.IntegerField(
        validators=[MinValueValidator(0)],
        help_text="Diastolic blood pressure (mm Hg)."
    )
    skin_thickness = models.IntegerField(
        validators=[MinValueValidator(0)],
        help_text="Triceps skinfold thickness (mm)."
    )
    insulin = models.IntegerField(
        validators=[MinValueValidator(0)],
        help_text="2-Hour serum insulin (mu U/ml)."
    )
    bmi = models.FloatField(
        validators=[MinValueValidator(0)],
        help_text="Body mass index (weight in kg / height in m^2)."
    )
    diabetes_pedigree_function = models.FloatField(
        validators=[MinValueValidator(0)],
        help_text="Diabetes pedigree function, a genetic score of diabetes."
    )
    age = models.IntegerField(
        validators=[MinValueValidator(0)],
        help_text="Age of the individual."
    )
    prediction = models.FloatField(
        null=True,
        help_text="(BETA) Classifier's prediction of the individual's likelihood of having diabetes."
    )

    class Meta:
        verbose_name = "User Diabetes Screening Data"
        verbose_name_plural = "Users' Diabetes Screening Data"

    def __str__(self):
        return f"Diabetes Screening Data for {self.user.username} - ID {self.id}"