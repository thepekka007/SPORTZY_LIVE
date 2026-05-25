from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.user.username
    
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order {self.id}"
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart {self.id} for {self.user}"
    
    @property
    def total(self):
        return sum(item.subtotal for item in self.items.all())
    
class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    @property
    def subtotal(self):
        return self.product.price * self.quantity

    def __str__(self):
        return f"{self.product.name} × {self.quantity}"

class ClubProfile(models.Model):
        uname = models.CharField(max_length=15, blank=False)
        email = models.CharField(max_length=30, blank=False)
        password = models.CharField(max_length=15, blank=False)
        cpassword = models.CharField(max_length=15, blank=False)
        phone = models.CharField(max_length=15, blank=False)
        club_name = models.CharField(max_length=20,blank=False)
    

class State(models.Model):
    id = models.IntegerField(primary_key=True)  # use your State Code
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class District(models.Model):
    id = models.IntegerField(primary_key=True)   # District ID
    state = models.ForeignKey(
        State,
        db_column='state_id',
        related_name='districts',
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=100)

    class Meta:
        unique_together = ('state', 'name')

    def __str__(self):
        return f"{self.name} ({self.state.name})"


class PostOffice(models.Model):
    district = models.ForeignKey(District, related_name='post_offices', on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    pincode = models.CharField(max_length=10, blank=True, null=True)

    class Meta:
        unique_together = ('district', 'name')  # Prevent duplicates in same district

    def __str__(self):
        return f"{self.name} - {self.district.name}"
    

class Player(models.Model):

    SKILL_CHOICES = (
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
        ('Professional', 'Professional'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='players'
    )

    full_name = models.CharField(max_length=200)

    dob = models.DateField()

    mobile = models.CharField(max_length=15)

    state = models.ForeignKey(
        State,
        on_delete=models.SET_NULL,
        null=True
    )

    district = models.ForeignKey(
        District,
        on_delete=models.SET_NULL,
        null=True
    )

    post_office = models.CharField(
    max_length=100,
    blank=True,
    null=True
)

    skill_level = models.CharField(
        max_length=20,
        choices=SKILL_CHOICES
    )

    sports = models.JSONField(default=list)

    position = models.CharField(max_length=100)

    height = models.CharField(max_length=20)

    weight = models.CharField(max_length=20)

    club = models.ForeignKey(
        ClubProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name
    
class MainMasterUser(models.Model):
    user = models.ForeignKey(
    User,
    on_delete=models.CASCADE,
    related_name='main_master_users'
    )

    account_type = models.CharField(
        max_length=20
    )

class ClubProfiles(models.Model):

    SPORTS_CHOICES = (
        ('Football', 'Football'),
        ('Cricket', 'Cricket'),
        ('Volleyball', 'Volleyball'),
        ('Kabaddi', 'Kabaddi'),
        ('Badminton', 'Badminton'),
        ('Athletics', 'Athletics'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='clubs'
    )

    club_name = models.CharField(max_length=200)

    founded_year = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    registration_number = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    contact_person = models.CharField(max_length=150)

    mobile = models.CharField(max_length=15)

    email = models.EmailField(
        blank=True,
        null=True
    )

    state = models.ForeignKey(
        State,
        on_delete=models.SET_NULL,
        null=True
    )

    district = models.ForeignKey(
        District,
        on_delete=models.SET_NULL,
        null=True
    )

    address = models.TextField(
        blank=True,
        null=True
    )

    pincode = models.CharField(
        max_length=10,
        blank=True,
        null=True
    )

    stadium_name = models.CharField(
        max_length=200,
        blank=True,
        null=True
    )

    home_ground = models.CharField(
        max_length=200,
        blank=True,
        null=True
    )

    total_players = models.PositiveIntegerField(
        default=0
    )

    sports = models.JSONField(default=list)

    achievements = models.TextField(
        blank=True,
        null=True
    )

    instagram = models.URLField(
        blank=True,
        null=True
    )

    facebook = models.URLField(
        blank=True,
        null=True
    )

    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.club_name

class Tournament(models.Model):

    SPORT_CHOICES = (
        ("football", "Football"),
        ("cricket", "Cricket"),
        ("badminton", "Badminton"),
        ("volleyball", "Volleyball"),
    )

    FOOTBALL_FORMATS = (
        ("5s", "5s"),
        ("6s", "6s"),
        ("7s", "7s"),
        ("11s", "11s"),
    )

    CRICKET_FORMATS = (
        ("t10", "T10"),
        ("t20", "T20"),
        ("oneday", "One Day"),
    )

    BADMINTON_FORMATS = (
        ("singles", "Singles"),
        ("doubles", "Doubles"),
        ("mixed", "Mixed Doubles"),
    )

    VOLLEYBALL_FORMATS = (
        ("indoor", "Indoor"),
        ("beach", "Beach"),
    )

    # -----------------------------------
    # BASIC DETAILS
    # -----------------------------------

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="tournaments"
    )

    tournament_name = models.CharField(max_length=255)

    organizer_name = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    contact_number = models.CharField(
        max_length=20
    )

    whatsapp_number = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    location = models.CharField(max_length=255)

    banner = models.ImageField(
        upload_to="tournament_banners/",
        blank=True,
        null=True
    )

    # -----------------------------------
    # SPORT DETAILS
    # -----------------------------------

    sport = models.CharField(
        max_length=50,
        choices=SPORT_CHOICES
    )

    format = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    # -----------------------------------
    # DATE DETAILS
    # -----------------------------------

    start_date = models.DateField()

    end_date = models.DateField()

    registration_deadline = models.DateField(
        blank=True,
        null=True
    )

    # -----------------------------------
    # FINANCIAL DETAILS
    # -----------------------------------

    entry_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    first_prize = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    second_prize = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    third_prize = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    mvp_prize = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    # -----------------------------------
    # FOOTBALL FIELDS
    # -----------------------------------

    squad_limit = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    match_duration = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    # -----------------------------------
    # CRICKET FIELDS
    # -----------------------------------

    overs = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    # -----------------------------------
    # BADMINTON FIELDS
    # -----------------------------------

    category = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    # -----------------------------------
    # VOLLEYBALL FIELDS
    # -----------------------------------

    set_format = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    # -----------------------------------
    # COMMON SPORT FIELDS
    # -----------------------------------

    max_teams = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    # -----------------------------------
    # EXTRA DETAILS
    # -----------------------------------

    description = models.TextField(
        blank=True,
        null=True
    )

    rules = models.TextField(
        blank=True,
        null=True
    )

    # -----------------------------------
    # STATUS
    # -----------------------------------

    is_active = models.BooleanField(default=True)

    is_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    # -----------------------------------
    # STRING REPRESENTATION
    # -----------------------------------

    def __str__(self):
        return self.tournament_name