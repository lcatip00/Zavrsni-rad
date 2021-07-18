from .models import Comment
from .serializers import (
    CommentCreateSerializer,
    CommentSerializer,
)
from django.http import Http404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    DestroyAPIView,
)


class ComentCreateView(CreateAPIView):
    serializer_class = CommentCreateSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def create(self, request, *args, **kwargs):
        data = {}
        data['account'] = request.user.id
        data['post'] = request.data["post"]
        data['content'] = request.data["content"]
        data['publish'] = request.data["publish"]
        serializer = self.get_serializer(data=data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)

        return Response({'message': 'ok'}, status=status.HTTP_200_OK)


class CommentView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentCreateSerializer


class DeleteCommentApiView(DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    lookup_field = 'id'

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