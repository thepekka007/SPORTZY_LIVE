from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer
from rest_framework import status
import traceback
from .models import MainMasterUser, Product, Category, Cart, CartItem, Order, OrderItem,ClubProfile,State,District,Player,Tournament
from .serializers import ProductSerializer, CategorySerializer, CartSerializer, CartItemSerializer,ClubProfileSerializer,UserSerializer,StateSerializer, DistrictSerializer,PlayerSerializer,ClubProfileSerializer,TournamentSerializer,TournamentListSerializer
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product, context = {'request': request})
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get('product_id')
    product = Product.objects.get(id=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)
    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity += 1
        item.save()
    return Response({'message': 'Product added to cart',"cart":CartSerializer(cart).data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart_quantity(request):
    item_id = request.data.get('item_id')
    quantity = request.data.get('quantity')
   
    if not item_id or quantity is None:
        return Response({'error': 'Item ID and quantity are required'}, status=400)
    
    try:
        item = CartItem.objects.get(id=item_id)
        if int(quantity) < 1:
            item.delete()
            return Response({'error': 'Quantity must be at least 1'}, status=400)
        
        item.quantity = quantity
        item.save()
        serializer = CartItemSerializer(item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item not found'}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    item_id = request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return Response({'message': 'Item removed from cart'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        data = request.data
        name = data.get('name')
        address = data.get('address')
        phone = data.get('phone')
        payment_method = data.get('payment_method','COD')

        #validate Phone Number
        if not phone.isdigit() or len(phone) < 10:
            return Response({'error': 'Invalid phone number'}, status=400)
        
        # Get user's cart
        cart , created = Cart.objects.get_or_create(user=request.user)
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)
        
        total = sum([item.product.price * item.quantity for item in cart.items.all()])

        order = Order.objects.create(user = request.user, total_amount=total)

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )
        # Clear the cart
        cart.items.all().delete()
        return Response({'message': 'Order created successfully', 'order_id': order.id})
    except Exception as e:
        return Response({'error': str(e)}, status=500)
  
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message": "User created successfully", "user": UserSerializer(user).data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_club(request):
    serializer = ClubProfileSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Club created successfully", "data": serializer.data},
            status=status.HTTP_201_CREATED
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
@permission_classes([IsAuthenticated])   
def user_profile(request):
    serializer = UserSerializer(request.user)
    account = MainMasterUser.objects.filter(
        user=request.user
    ).first()
    return Response({
        **serializer.data,
        "account_type": account.account_type if account else 0
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def get_states(request):
    states = State.objects.all().order_by('name')
    serializer = StateSerializer(states, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_districts(request, state_id):

    districts = District.objects.filter(
        state_id=state_id
    ).order_by('name')

    serializer = DistrictSerializer(districts, many=True)

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_player(request):

    serializer = PlayerSerializer(data=request.data)

    if serializer.is_valid():
        player = serializer.save(user=request.user)

        MainMasterUser.objects.get_or_create(
            user=request.user,
            defaults={
                'account_type': 1
            }
        )
        serializer.save(user=request.user)

        return Response({
            "message": "Player Registered Successfully",
            "data": serializer.data
        })

    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_club(request):

    serializer = ClubProfileSerializer(data=request.data)

    if serializer.is_valid():

        club = serializer.save(user=request.user)

        MainMasterUser.objects.get_or_create(
            user=request.user,
            defaults={
                'account_type': 2
            }
        )

        return Response({
            "message": "Club Registered Successfully",
            "data": serializer.data
        })

    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_tournament(request):
    try:
        serializer = TournamentSerializer(
            data=request.data,
            context={"request": request}
        )
        if serializer.is_valid():

            tournament = serializer.save(
                    created_by=request.user
            )

            return Response({
                "message": "Tournament Created Successfully",
                "data": serializer.data
            })

        return Response(
            serializer.errors,
            status=400
        )
    except Exception as e:
        print("ERROR:", str(e))
        print(traceback.format_exc())

        return Response(
            {"error": str(e)},
            status=500
        )
@api_view(['GET'])
@permission_classes([AllowAny])
def get_tournaments(request):

    tournaments = Tournament.objects.order_by('-created_at')
    #.filter(
    #    is_active=True
    #).order_by('-created_at')

    serializer = TournamentListSerializer(
        tournaments,
        many=True,
        context={'request': request}
    )

    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_user_status(request):

    account = MainMasterUser.objects.filter(
        user=request.user
    ).first()

    if not account:
        return Response({
            "registered": False,
            "message": "Please register as a Player or Club first."
        })

    if str(account.account_type) == "0":
        return Response({
            "registered": False,
            "message": "Please register as a Player or Club first."
        })

    return Response({
        "registered": True,
        "account_type": account.account_type
    })