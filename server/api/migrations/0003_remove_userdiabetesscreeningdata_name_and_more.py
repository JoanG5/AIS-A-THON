# Generated by Django 5.0.4 on 2024-05-03 03:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_userdiabetesscreeningdata_dob_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdiabetesscreeningdata',
            name='name',
        ),
        migrations.AddField(
            model_name='userdiabetesscreeningdata',
            name='first_name',
            field=models.CharField(default='', help_text='First name of the individual.', max_length=255),
        ),
        migrations.AddField(
            model_name='userdiabetesscreeningdata',
            name='last_name',
            field=models.CharField(default='', help_text='Last name of the individual.', max_length=255),
        ),
        migrations.AddField(
            model_name='userdiabetesscreeningdata',
            name='middle_name',
            field=models.CharField(default='', help_text='Middle name of the individual.', max_length=255),
        ),
    ]
