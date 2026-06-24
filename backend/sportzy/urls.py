from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    
  path('register/', views.register_view),
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/', views.get_products),
  path('products/<int:pk>/', views.get_product),
  path('categories/', views.get_categories),
  path('cart/', views.get_cart),
  path('cart/add/', views.add_to_cart),
  path('cart/remove/', views.remove_from_cart),
  path('cart/update/', views.update_cart_quantity),
  path('orders/create/', views.create_order),
  path('clubregister/', views.create_club),
  path('userprofile/', views.user_profile),
  path('states/', views.get_states),
  path('districts/<int:state_id>/', views.get_districts),
  path('register-player/', views.register_player),
  path('register-club/', views.register_club),
  path('create-tournament/', views.create_tournament, name='create_tournament'),
  path('tournaments/', views.get_tournaments, name='get_tournaments'),
  path('check_user_status/', views.check_user_status, name='check_user_status'),
  path('mytournaments/', views.get_my_tournaments, name='get_my_tournaments'),
  path('tournament/<int:id>/', views.tournaments_by_id, name='tournaments_by_id'),
  path('updatetournament/<int:id>/', views.update_tournament, name='update_tournament'),
  path('toggletournamentstatus/<int:pk>/', views.toggle_tournament_status, name='toggle_tournament_status'),



  
]
