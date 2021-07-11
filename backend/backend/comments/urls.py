from .views import *
from django.urls import path


app_name = "comments"

urlpatterns = [
    path('create/', ComentCreateView.as_view(), name='create'),
    path('get/<id>', CommentUpdateDeleteAPIView.as_view(), name='getComment'),
    path('delete/<id>', DeleteCommentApiView.as_view(), name='deleteComment'),
]
