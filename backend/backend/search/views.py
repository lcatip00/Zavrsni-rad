from django.shortcuts import render
from accounts.models import Account
from accounts.serializers import AccountLIstSerializer
from categories.models import Category
from categories.serializers import CategoryList
from django.http import JsonResponse
from posts.models import Post
from posts.serializers import PostListSerializer


# Create your views here.
def search(request, search_term):

    if search_term:
        accounts = Account.objects.filter(username__icontains=search_term)
        categories = Category.objects.filter(name__icontains=search_term)
        posts = Post.objects.filter(title__icontains=search_term)

    return JsonResponse({"posts": PostListSerializer(posts, context={'request': request},many=True).data,
                         "categories": CategoryList(categories, many=True, context={'request': request}).data,
                         "accounts": AccountLIstSerializer(accounts, many=True, context={'request': request}).data})
