# Generated by Django 3.1.1 on 2021-03-04 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0004_remove_category_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='slug',
            field=models.SlugField(blank=True, unique=True),
        ),
    ]
