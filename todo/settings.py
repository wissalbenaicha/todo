import os
from pathlib import Path
from datetime import timedelta
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True

BASE_DIR = Path(__file__).resolve().parent.parent

# Clé secrète pour l'environnement de développement
SECRET_KEY = 'django-insecure-c&yx1$k-s6i5oxap04dft2l*td$-nm+dy@rnt0^l%=d5wj3&!z'

# DEBUG activé uniquement pour le développement
DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Applications installées
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'accounts',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'notifications',  # Remplace par le nom exact de ton app
    'newtache',
]

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

CORS_ALLOW_ALL_ORIGINS = True  # Permet l'accès à l'API depuis tous les domaines

# Configuration DRF avec JWT
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# Configuration JWT (Tokens)
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# URL principale
ROOT_URLCONF = 'todo.urls'

# Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'frontend/build'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'todo.wsgi.application'

# Configuration de la base de données
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'todo_db',          
        'USER': 'todo_user',        
        'PASSWORD': 'todo',         
        'HOST': 'localhost',        
        'PORT': '5432',             
     },
    'calendar': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'calendar_db',      # Nom de la base de données pour le calendrier
        'USER': 'calendar_user',    # Utilisateur pour la base de données calendrier
        'PASSWORD': 'calendar', # Mot de passe pour la base de données calendrier
        'HOST': 'localhost',        # Hôte de la base de données
        'PORT': '5432',             # Port de la base de données
    }
}


# Configuration des fichiers statiques
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend/build/static')]

# Configuration des fichiers média (si nécessaire)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Internationalisation
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]

# settings.py

from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'eneimxema@gmail.com'# Ton adresse email
EMAIL_HOST_PASSWORD = 'pvxr jvkg evcj xvda'  # Mot de passe ou mot de passe d'application

FRONTEND_URL = 'http://localhost:3000'  # URL de ton frontend pour les liens de vérification
