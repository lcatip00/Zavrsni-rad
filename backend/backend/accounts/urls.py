from .views import (
    AccountCreateAPIView,
    AccountDetailAPIView,
    AccountListAPIView,
    AccountUpdateAPIView,
    GetAccountAPIView,
    MyAccountDetailsView,
    PatchProfileImageView
)
from django.urls import include, path

app_name = "accounts"

urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('myprofile/', MyAccountDetailsView.as_view(), name='myprofile'),
    path('create/', AccountCreateAPIView.as_view(), name='create'),
    path('<slug>/', AccountDetailAPIView.as_view(), name='details'),
    path('', AccountListAPIView.as_view(), name='list'),
    path('<slug>/update/', AccountUpdateAPIView.as_view(), name='update'),
    path('user/<int:id>', GetAccountAPIView.as_view(), name='user'),
    path('changeProfileImage/<int:id>/', PatchProfileImageView.as_view(), name='changeProfileImage')

]
