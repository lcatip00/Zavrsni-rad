from .models import Vote
from .serializers import VoteSerializer
from accounts.models import Account
from posts.models import Post
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


# Create your views here.
class CreateVoteLike(CreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]


    def create(self, request, *args, **kwargs):

        account = Account.objects.get(id=request.user.id)
        post = Post.objects.get(id=request.data['post'])
        vote = getVoteObject(request.user.id, request.data['post'])
        if vote == None:
            create_obj = Vote.objects.create(account=account, post=post, vote=True)
            content = {
                'status': 'Like '
            }
            return Response(content, status=status.HTTP_200_OK)
        elif vote.vote == True:
            vote.delete()
            content = {
                'status': 'Remove Like '
            }
            return Response(content, status=status.HTTP_200_OK)
        else:
            vote.delete()
            create_obj = Vote.objects.create(account=account, post=post, vote=True)
            content = {
                'status': 'You already vote dislike'
            }
            return Response(content, status=status.HTTP_200_OK)


class CreateVoteDislike(CreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def create(self, request, *args, **kwargs):

        account = Account.objects.get(id=request.user.id)
        post = Post.objects.get(id=request.data['post'])

        # check if vote already exists
        vote = getVoteObject(request.user.id, request.data['post'])

        # if vote does not exists, then create vote
        if vote == None:
            create_obj = Vote.objects.create(account=account, post=post, vote=False)
            content = {
                'status': 'Like '
            }
            return Response(content, status=status.HTTP_200_OK)
        # iv vote false exists then remove
        elif vote.vote == False:
            vote.delete()
            content = {
                'status': 'Remove Like '
            }
            return Response(content, status=status.HTTP_200_OK)
        else:
            vote.delete()
            create_obj = Vote.objects.create(account=account, post=post, vote=False)
            content = {
                'status': 'You already vote like'
            }
            return Response(content, status=status.HTTP_200_OK)


# function to check if vote already exists
def getVoteObject(userId, postId):

    try:
        vote = Vote.objects.get(account=userId, post=postId)
        return vote
    except:
        return None
