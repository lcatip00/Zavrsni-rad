from accounts.models import Account
from django.db import models
from posts.models import Post


# Create your models here.
class Comment(models.Model):

    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.CharField(max_length=10000)
    publish = models.DateField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.content

