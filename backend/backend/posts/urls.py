from django.contrib import admin
from django.urls import path, include
from .views import *


app_name="posts"

urlpatterns = [
    path('', PostListAPIView.as_view(), name='list'),
    path('create/', PostCreateAPIView.as_view(), name='create'),
    path('delete/<slug>/', DeletePostView.as_view(), name="DeletePost"),
    path('change-delete/<slug>/', GetDeleteUpdatePost.as_view(), name='GetDeleteUpdatePost'),
    path('followedPosts/', MyFollowedPostsApiView.as_view(), name='followedPosts'),
    path('<slug>/', PostDetailsAPIVIew.as_view(), name='details'),
    path('<slug>/update/', UpdatePostApiView.as_view(), name='update'),


]
