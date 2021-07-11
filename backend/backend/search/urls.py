from django.urls import path
from .views import *


app_name="search"

urlpatterns = [
    path('<search_term>/', search, name='search'),
]
