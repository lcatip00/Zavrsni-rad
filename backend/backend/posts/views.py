from .models import Post
from .serializers import (
    PostCreateSerializer,
    PostDetailsSerializer,
    PostListSerializer,
    PostSerializer,
    PostUpdateSerializer,
)
from categories.models import Category
from django.http import Http404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
)
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


# Create your views here.
class PostCreateAPIView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    parser_classes = [MultiPartParser, FormParser, FileUploadParser]

    def create(self, request, *args, **kwargs):
        # validate if title and description fields are filled
        if((request.data["title"] == '' ) or (request.data["content"] == '')):
            return Response({'message': ['You must fill title and description field']}, status=status.HTTP_400_BAD_REQUEST)

        data = {}
        data['account'] = self.request.user.id
        data['title'] = request.data["title"]
        data['image'] = request.data.get("image")
        data['content'] = request.data["content"]
        data['category'] = request.data["category"]

        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)

        return Response({'message': 'ok'}, status=status.HTTP_200_OK)


class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer


class PostDetailsAPIVIew(RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailsSerializer
    lookup_field = 'slug'


class PostUpdateAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'

    def get_queryset(self, slug):
        try:
            post = Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            content = {
                'status': 'Not Found'
            }
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        return post

    def patch(self, request, slug):

        post = self.get_queryset(slug)
        # serializer = PostSerializer()

        if (request.user == post.account):  # If creator is who makes request
            serializer = PostSerializer(post, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            content = {
                'status': 'UNAUTHORIZED'
            }
            return Response(content, status=status.HTTP_401_UNAUTHORIZED)

    def get(self, request, slug):

        post = self.get_queryset(slug)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request,slug):
        post = self.get_queryset(slug)

        if (request.user == post.account):  # If creator is who makes request
            post.delete()
            content = {
                'status': 'NO CONTENT'
            }
            return Response(content, status=status.HTTP_204_NO_CONTENT)
        else:
            content = {
                'status': 'UNAUTHORIZED'
            }
            return Response(content, status=status.HTTP_401_UNAUTHORIZED)


class MyFollowedPostsApiView(ListAPIView):
    serializer_class = PostListSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        queryset = Post.objects.none()
        categories = Category.objects.filter(followers=self.request.user.id)
        for category in categories:
            queryset |= Post.objects.filter(category=category)
        return queryset

#only author can delete post
class DeletePostView(DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    lookup_field = 'slug'

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            #check if request user is author
            if instance.account.id == request.user.id:
                self.perform_destroy(instance)
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)

class UpdatePostApiView(UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostUpdateSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'