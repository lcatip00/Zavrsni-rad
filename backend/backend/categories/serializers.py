from .models import Category
from posts.models import Post
from posts.serializers import PostListSerializer
from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
)


class CategoryDetailsSerializer(ModelSerializer):

    posts = SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'followers',
            'posts',
        ]

    def get_posts(self, obj):
        request = self.context.get('request')
        post_list = Post.objects.filter(category=obj.id)
        post = PostListSerializer(post_list, context={"request": request}, many=True)
        return post.data


class CategoryFollow(ModelSerializer):

    class Meta:
        model = Category
        fields =[
            'followers'
        ]


class CategoryList(ModelSerializer):

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'slug',
        ]


class MyCategoreisListSerializer(ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']
