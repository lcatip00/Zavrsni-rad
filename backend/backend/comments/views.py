from .models import Comment
from .serializers import (
    CommentCreateSerializer,
    CommentSerializer,
    CommentSerializerUpdate
)
from django.http import Http404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
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


class CommentUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentCreateSerializer
    lookup_field = 'id'

    def get_queryset(self, id):
        try:
            comment = Comment.objects.get(id=id)
        except Comment.DoesNotExist:
            content = {
                'status': 'Not Found'
            }
            raise Http404
        return comment

    def get(self, request, id):
        comment = self.get_queryset(id)
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, id):
        comment = self.get_queryset(id)

        if (request.user == comment.account):  # If creator is who makes request
            serializer = CommentSerializerUpdate(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request,id):
        comment = self.get_queryset(id)
        comment.delete()

        if (request.user == comment.account):  # If creator is who makes request
            comment.delete()
            content = {
                'status': 'NO CONTENT'
            }
            return Response(content, status=status.HTTP_204_NO_CONTENT)
        else:
            content = {
                'status': 'UNAUTHORIZED'
            }
            return Response(content, status=status.HTTP_401_UNAUTHORIZED)


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