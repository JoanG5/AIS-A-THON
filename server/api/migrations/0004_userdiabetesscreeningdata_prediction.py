# Generated by Django 5.0.4 on 2024-05-03 23:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_userdiabetesscreeningdata_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdiabetesscreeningdata',
            name='prediction',
            field=models.FloatField(help_text="(BETA) Classifier's prediction of the individual's likelihood of having diabetes.", null=True),
        ),
    ]
