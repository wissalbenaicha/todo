# accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import status
from .models import User  # Assure-toi que tu as un modèle User avec les champs appropriés


class SignUpView(APIView):
    def post(self, request):
        # Utilisation du serializer pour valider les données
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():  # Si les données sont valides
            # Sauvegarde l'utilisateur dans la base de données
            serializer.save()
            return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# views.py
# accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class LoginView(APIView):
    def post(self, request):
        emailuser = request.data.get('emailuser')
        passworduser = request.data.get('passworduser')

        if not emailuser or not passworduser:
            return Response({"detail": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(emailuser=emailuser)
            if user.passworduser == passworduser:  # Vérification du mot de passe
                refresh = RefreshToken.for_user(user)  # Génération du token
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
