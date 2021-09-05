from .views import (
    AccountCreateAPIView,
    AccountDetailAPIView,
    AccountUpdateAPIView,
    MyAccountDetailsView,
    UpdateProfileImageView
)
from django.urls import include, path

app_name = "accounts"

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('myprofile/', MyAccountDetailsView.as_view(), name='myprofile'),
    path('create/', AccountCreateAPIView.as_view(), name='create'),
    path('<slug>/', AccountDetailAPIView.as_view(), name='details'),
    path('<slug>/update/', AccountUpdateAPIView.as_view(), name='update'),
    path('changeProfileImage/<int:id>/', UpdateProfileImageView.as_view(), name='changeProfileImage')

]
