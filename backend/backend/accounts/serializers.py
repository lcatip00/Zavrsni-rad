from .models import Account
from django.contrib.auth import get_user_model
from rest_framework.serializers import (
    CharField,
    HyperlinkedIdentityField,
    ModelSerializer,
    ValidationError,
)

User = get_user_model()


class AccountCreateSerializer(ModelSerializer):

    password = CharField(label="Password", style={'input_type': 'password'}, write_only=True)
    password2 = CharField(label="Confirm password", style={'input_type': 'password'}, write_only=True, allow_blank=True)

    class Meta:
        model = User

        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
            'password2',
        ]

        extra_kwargs = {'password':
                        {'write_only': True},
                        'email2':
                        {'write_only': True},
                        }

    def validate_password(self, attrs):
        data = self.get_initial()
        password = data.get('password')
        password2 = data.get('password2')

        if password == "":
            raise ValidationError("Password field is blank")
        if password2 != password:
            raise ValidationError("Password must match.")
        elif len(password) < 8:
            raise ValidationError("Password is too short")
        elif any(str.isdigit(c) for c in password) == False:
            raise ValidationError("Password must contain number")

        return attrs

    def validate_password2(self, validate_data):
        data = self.get_initial()
        password2 = data.get('password2')

        if password2 == "":
            raise ValidationError("Confirm password field is blank ")

        return validate_data

    def validate_email(self, validate_data):
        if validate_data == "":
            raise ValidationError("Email field is required")
        return validate_data

    def create(self, validated_data):
        username = validated_data['username']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        email = validated_data['email']
        password = validated_data['password']

        user_obj = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data

class AccountDetailSerializer(ModelSerializer):

    class Meta:
        model = Account
        fields = [
            'id',
            'username',
            'slug',
            'profile_image',
            'description',
            'first_name',
            'last_name',
            'email',
        ]

class AccountLIstSerializer(ModelSerializer):
    url = HyperlinkedIdentityField(
        view_name='accounts:details',
        lookup_field='slug'
    )

    class Meta:
        model = Account
        fields = [
            'id',
            'url',
            'profile_image',
            'username',
            'slug'
        ]


class ProfileImageSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = [
            'profile_image'
        ]