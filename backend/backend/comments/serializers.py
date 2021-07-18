from .models import Comment
from rest_framework.serializers import (
    CharField,
    IntegerField,
    ModelSerializer,
)

class CommentCreateSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CommentSerializer(ModelSerializer):
    username = CharField(source='account.username')
    authorId = IntegerField(source='account.id')
    class Meta:
        model = Comment
        fields = [
            'id',
            'content',
            'publish',
            'username',
            'authorId',
        ]
