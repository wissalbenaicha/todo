from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserSerializer
from .models import User
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.core.mail import send_mail
from .serializers import UserSerializer  # Assurez-vous que vous avez un serializer 'UserSerializer'
from accounts.models import User  # Assurez-vous que vous avez un modèle User personnalisé

class SignUpView(APIView):
    def post(self, request):
        # Valide les données de la requête avec le serializer
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            # Sauvegarde de l'utilisateur avec email non vérifié
            user = serializer.save(email_verified=False)

            # Génération du jeton de vérification
            user.generate_verification_token()

            # URL pour la vérification de l'email
            verification_url = f"{settings.FRONTEND_URL}/verify-email?token={user.verification_token}"

            # Paramètres de l'email de vérification
            subject = "Vérifiez votre adresse email"
            message = f"Bonjour {user.nomuser},\n\nCliquez sur le lien suivant pour vérifier votre adresse email :\n{verification_url}\n\nMerci !"
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [user.emailuser]

            # Envoi de l'email de vérification
            send_mail(subject, message, from_email, recipient_list, fail_silently=False)

            # Réponse après inscription réussie
            return Response(
                {"message": "Inscription réussie ! Vérifiez votre email pour activer votre compte."},
                status=status.HTTP_201_CREATED
            )
        else:
            # Affiche les erreurs du serializer pour déboguer
            print(serializer.errors)  # Ajoute cette ligne pour voir les erreurs détaillées dans la console
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from accounts.models import User  # Assurez-vous que votre modèle User est correctement importé
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class LoginView(APIView):
    permission_classes = [AllowAny]  # Permet à tout utilisateur de se connecter, même non authentifié

    def post(self, request):
        # Récupérer l'email et le mot de passe depuis la requête
        emailuser = request.data.get('emailuser')
        passworduser = request.data.get('passworduser')

        # Vérifier que l'email et le mot de passe sont fournis
        if not emailuser or not passworduser:
            return Response({"detail": "Email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Rechercher l'utilisateur dans la base de données par son email
            user = User.objects.get(emailuser=emailuser)

            # Vérifier le mot de passe
            if user.passworduser == passworduser:  # Si vous utilisez un mot de passe en clair, sinon vous devez utiliser un mécanisme de hachage
                # Générer un refresh token et un access token avec SimpleJWT
                refresh = RefreshToken.for_user(user)

                # Renvoi du token dans la réponse
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            # Si l'utilisateur n'existe pas dans la base de données
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User

class VerifyEmailView(APIView):
    def get(self, request):
        token = request.query_params.get('token')  # Récupère le token depuis l'URL
        try:
            # Trouve l'utilisateur avec le token de vérification
            user = User.objects.get(verification_token=token)

            # Vérifie si l'email est déjà vérifié
            if not user.email_verified:
                user.email_verified = True
                user.save()
                return Response({"message": "Votre email a été vérifié avec succès."}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Email verifier."}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"message": "Token invalide ou expiré."}, status=status.HTTP_400_BAD_REQUEST)

