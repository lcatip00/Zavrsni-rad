from .views import *
from django.urls import path


app_name = "categories"

urlpatterns = [
    path('create/', CreateCategory.as_view(), name='create'),
    path('followCategory/<slug>/', Follow.as_view(), name='followCategory'),
    path('list/', CategoryList.as_view(), name='list'),
    path('myCategories/', MyCategoriesListApiView.as_view(), name='myCategories'),
    path('<slug>/', CategoryDetails.as_view(), name='details'),
    path('follow/<slug>/', FollowCategory.as_view(), name='follow'),
    path('delete/<slug>/', CategoryUpdateDelete.as_view(), name='delete'),
]
