from .models import Post
from comments.models import Comment
from comments.serializers import CommentSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.serializers import (
    CharField,
    IntegerField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
)
from votes.models import Vote
from votes.serializers import VoteSerializer

User = get_user_model()


class PostCreateSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'account',
            'title',
            'image',
            'content',
            'category',
        ]

    # validate title field
    def validate_title(self, title):
        title_qs =Post.objects.filter(title=title)
        if title_qs.exists():
            raise ValidationError("This post already exists")
        elif title == "":
            raise ValidationError("Title field may not be blank")
        return title

    # validate content field
    def validate_content(self, content):
        if content == "":
            raise ValidationError("Description field may not be blank")
        return content


# return all post data
class PostDetailsSerializer(ModelSerializer):

    username = CharField(source='account.username')
    userId = IntegerField(source='account.id')
    comments = SerializerMethodField()
    likes = serializers.SerializerMethodField('get_likes')
    dislikes = serializers.SerializerMethodField('get_dislikes')

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'image',
            'content',
            'publish',
            'username',
            'userId',
            'comments',
            'likes',
            'dislikes',
            'category',
        ]

    # return all dislikes and users
    def get_dislikes(self, obj):
        post = Post.objects.get(title=obj)
        qs = Vote.objects.filter(vote=False, post=post.id)
        serializer = VoteSerializer(instance=qs, many=True)
        return serializer.data


    # returm all likes and users
    def get_likes(self, obj):
        post = Post.objects.get(title=obj)
        qs = Vote.objects.filter(vote=True, post=post.id)
        serializer = VoteSerializer(instance=qs, many=True)
        return serializer.data

    # return all comments of same post
    def get_comments(self, obj):
        post_qs=Post.objects.get(title=obj)
        comments_qs = Comment.objects.filter(post=post_qs.id)
        comment = CommentSerializer(comments_qs, many=True)
        return comment.data


# return list of posts and some basic info
class PostListSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'image',
            'content',
            'slug',
            'publish',
        ]


class PostSerializer(ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'title', 'image', 'content', 'slug', 'category')


class PostUpdateSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'title',
            'image',
            'content',
        ]
