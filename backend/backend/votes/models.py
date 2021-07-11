from accounts.models import Account
from django.db import models
from posts.models import Post


# Create your models here.
class Vote(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    vote = models.BooleanField(null=True, default=None)
