from .models import Category
from .serializers import (
    CategoryDetailsSerializer,
    CategoryFollow,
    CategoryList,
    MyCategoreisListSerializer
)
from django.http import JsonResponse
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class CategoryDetails(RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryDetailsSerializer
    lookup_field = 'slug'


class CategoryList(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryList


class MyCategoriesListApiView(ListAPIView):
    serializer_class = MyCategoreisListSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    # return list of followed categories
    def get_queryset(self):
        category = Category.objects.filter(followers__id=self.request.user.id)
        return category


class FollowCategory(CreateAPIView):
    serializer_class = CategoryFollow
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    lookup_field = 'slug'

    def get_queryset(self, slug):
        try:
            category = Category.objects.get(slug=slug)
        except CreateCategory.DoesNotExist:
            content = {
                'status': 'Not Found'
            }
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        return category

    def post(self, request, *args, **kwargs):
        category = self.get_queryset(self.kwargs.get('slug'))
        user = self.request.user

        if(user in category.followers.all()):
            category.followers.remove(user)
            category.save()
            content = {
                'status': 'Unfollow'
            }
            return Response(content, status=status.HTTP_204_NO_CONTENT)
        else:
            category.followers.add(user)
            category.save()
            content = {
                'status': 'Follow'
            }
            return Response(content, status=status.HTTP_201_CREATED)


class IsFollower(ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    lookup_field = 'slug'

    def get_queryset(self, slug):
        category = Category.objects.get(slug=slug)
        return category

    # if user is follower return true else return false
    def get(self, request, *args, **kwargs):
        slug = self.kwargs.get('slug')
        category = self.get_queryset(slug)

        if request.user in category.followers.all():
            content = {'follower': 'true'}
            return Response(content, status=status.HTTP_200_OK)
        else:
            content = {'follower': 'false'}
            return Response(content, status=status.HTTP_200_OK)