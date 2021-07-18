from .models import Category
from posts.models import Post
from posts.serializers import PostListSerializer
from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
)


class CategoryDetailsSerializer(ModelSerializer):

    posts = SerializerMethodField()

    class Meta:
        model = Category
        fields = [
            'id',
            'name',
            'author',
            'followers',
            'post_category',
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
    url = HyperlinkedIdentityField(
        view_name='categories:details',
        lookup_field='slug'
    )

    class Meta:
        model = Category
        fields = [
            'id',
            'url',
            'author',
            'name',
            'slug',
        ]


class MyCategoreisListSerializer(ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']
