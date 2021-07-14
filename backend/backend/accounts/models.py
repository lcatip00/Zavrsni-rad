from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


def upload_location(instance, filename):
    # file will be uploaded to MEDIA_ROOT / user_<id>/<filename>
    return 'user_{0}/{1}/{2}'.format(instance.id, "profile_pictures",filename)


# Create your models here.
class Account(AbstractUser):

    description = models.CharField(max_length=1000, null=True, blank=True)
    profile_image = models.ImageField(upload_to=upload_location, null=True, blank=True, height_field="height",
                                      width_field="width",
                                      default="../media/default_profile_picture/default.png")
    height = models.IntegerField(default=0)
    width = models.IntegerField(default=0)
    slug = models.SlugField(unique=True, blank=True)

    def __str__(self):
        return str(self.username)


def create_slug(instance, new_slug=None):
    slug = slugify(instance.username)
    if new_slug is not None:
        slug = new_slug
    qs = Account.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" %(slug, qs.first().id)
        return create_slug(instance, new_slug=new_slug)
    return slug


def pre_save_account_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_slug(instance)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


pre_save.connect(pre_save_account_receiver, sender=Account)