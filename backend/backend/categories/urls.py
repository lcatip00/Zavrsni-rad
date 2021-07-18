from .views import *
from django.urls import path


app_name = "categories"

urlpatterns = [
    path('list/', CategoryList.as_view(), name='list'),
    path('myCategories/', MyCategoriesListApiView.as_view(), name='myCategories'),
    path('<slug>/', CategoryDetails.as_view(), name='details'),
    path('follow/<slug>/', FollowCategory.as_view(), name='follow'),
]
