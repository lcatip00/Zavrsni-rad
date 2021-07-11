from .models import Vote
from django.contrib import admin


# Register your models here.
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'user', 'pk']

    class Meta:
        model = Vote


admin.site.register(Vote)