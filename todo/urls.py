"""
URL configuration for todo project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.urls import path
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter
from table1.views import Table1ViewSet



router = DefaultRouter()
router.register(r'table1', Table1ViewSet)




urlpatterns = [
    path('admin/', admin.site.urls),

  

    # React Frontend : toutes les autres routes pointent vers React
    path('', TemplateView.as_view(template_name='index.html')),
    
<<<<<<< HEAD


    path('api/', include('accounts.urls')),  # Inclure les URLs de l'application accounts sans préfixe
=======
        path('api/', include('accounts.urls')),  # Inclure les URLs de l'application accounts sans préfixe
>>>>>>> e950ae1b9a70188cd3b77c22905ff28d83881b3f
         path('api/', include(router.urls)),


]







