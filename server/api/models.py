from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

class UserDiabetesScreeningData(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Associated User")
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

    class Meta:
        verbose_name = "User Diabetes Screening Data"
        verbose_name_plural = "Users' Diabetes Screening Data"

    def __str__(self):
        return f"Diabetes Screening Data for {self.user.username} - ID {self.id}"