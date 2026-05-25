from rest_framework import serializers
from .models import ClubProfiles, Product, Category, Cart, CartItem,ClubProfile,UserProfile,State,District,Tournament
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)
    product_image = serializers.ImageField(source='product.image', read_only=True)
    class Meta:
        model = CartItem
        fields = '__all__'
    
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total = serializers.ReadOnlyField()
    class Meta:
        model = Cart
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data.get('email', '')
        password = validated_data['password']
        user = User.objects.create_user(username=username, email=email, password=password)
        return user
    
    
class ClubProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClubProfile
        fields = '__all__'
        


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['id', 'name']


class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = ['id', 'name', 'state']
    
from .models import Player
from .models import MainMasterUser

class PlayerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = '__all__'
        read_only_fields = ['user']

class ClubProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = ClubProfiles
        fields = '__all__'
        read_only_fields = ['user']

class TournamentSerializer(serializers.ModelSerializer):

    banner = serializers.ImageField(required=False)

    class Meta:
        model = Tournament
        fields = '__all__'
        read_only_fields = [
            'created_by',
            'created_at',
            'updated_at',
        ]

    def validate(self, data):

        # Date Validation
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        if start_date and end_date:
            if end_date < start_date:
                raise serializers.ValidationError(
                    "End date cannot be before start date."
                )

        # Football Validation
        if data.get('sport') == 'football':

            if not data.get('format'):
                raise serializers.ValidationError(
                    "Football format is required."
                )

            if data.get('format') not in ['5s', '6s', '7s', '11s']:
                raise serializers.ValidationError(
                    "Invalid football format."
                )

        # Cricket Validation
        if data.get('sport') == 'cricket':

            if not data.get('overs'):
                raise serializers.ValidationError(
                    "Overs field is required for cricket."
                )

        # Badminton Validation
        if data.get('sport') == 'badminton':

            if not data.get('category'):
                raise serializers.ValidationError(
                    "Category is required for badminton."
                )

        # Volleyball Validation
        if data.get('sport') == 'volleyball':

            if not data.get('set_format'):
                raise serializers.ValidationError(
                    "Set format is required for volleyball."
                )

        return data