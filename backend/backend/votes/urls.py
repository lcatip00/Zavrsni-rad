from .views import *
from django.urls import path


app_name = "votes"

urlpatterns = [
    path('like/', CreateVoteLike.as_view(), name="like"),
    path('dislike/', CreateVoteDislike.as_view(), name="dislike"),
]
