# Generated by Django 5.1.1 on 2025-03-22 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaigns', '0002_customuser'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='address',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='phone',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
