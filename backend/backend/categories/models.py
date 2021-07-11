from accounts.models import Account
from django.db import models
from django.db.models.signals import pre_save
from django.utils.text import slugify


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    author = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="author")
    followers = models.ManyToManyField(Account, related_name="followers")
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return self.name


def create_slug(instance, new_slug=None):
    slug = slugify(instance.name)
    if new_slug is not None:
        slug = new_slug
    qs = Category.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" % (slug, qs.first().id)
        return create_slug(instance, new_slug=new_slug)
    return slug


def pre_save_post_receiver(sender, instance, *args, **kwargs):

    if not instance.slug:
        instance.slug = create_slug(instance)


pre_save.connect(pre_save_post_receiver, sender=Category)