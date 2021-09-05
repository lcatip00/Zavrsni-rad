from .models import Account
from .serializers import (
    AccountCreateSerializer,
    AccountDetailSerializer,
    ProfileImageSerializer,
)
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

User = get_user_model()


# Create your views here.
class AccountCreateAPIView(CreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountCreateSerializer


class AccountDetailAPIView(RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer
    lookup_field = 'slug'


class AccountUpdateAPIView(RetrieveUpdateDestroyAPIView):
    queryset =Account.objects.all()
    serializer_class = AccountDetailSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = 'slug'

    def delete(self, request, slug):

        user = Account.objects.get(slug=slug)
        if request.user == user:
            user.delete()
            content = {
                'status': 'Profile deleted'
            }
            return Response(content, status=status.HTTP_200_OK)
        else:
            content = {
                'status': 'You are not allowed to delete this profile'
            }
            return Response(content)


class MyAccountDetailsView(ListAPIView):
    serializer_class = AccountDetailSerializer
    authentication_classes = [TokenAuthentication]

    def get_queryset(self):
        queryset = Account.objects.filter(id=self.request.user.id)
        return queryset


class UpdateProfileImageView(UpdateAPIView):
    queryset = Account.objects.all()
    serializer_class = ProfileImageSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'
