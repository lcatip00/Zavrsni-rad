from accounts.models import Account
from categories.models import Category
from datetime import datetime
from django.db import models
from django.db.models.signals import pre_save
from django.utils.text import slugify


# Create your models here.
def upload_location(instance, filename):
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'user_{0}/{1}/{2}'.format(instance.account.id, "post_image",filename)


class Post(models.Model):

    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=50, null=False, blank=False, unique=True)
    image = models.ImageField(upload_to=upload_location, null=True, blank=True)
    content = models.CharField(max_length=1000)
    slug = models.SlugField(unique=True, blank=True)
    publish = models.DateField(auto_now=True, auto_now_add=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=None, blank=True, null=True, related_name='post_category')

    def __str__(self):
        return self.title


# function create slug before new post is saved in to the database
def create_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = Post.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" %(slug, qs.first().id)
        return create_slug(instance, new_slug=new_slug)
    return slug


# trigger slug creation
def pre_save_post_receiver(sender, instance, *args, **kwargs):
    instance.publish = datetime.now()
    if not instance.slug:
        instance.slug = create_slug(instance)


# execute some function before object is saved to the database
pre_save.connect(pre_save_post_receiver, sender=Post)
