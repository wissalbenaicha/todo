from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from newtache.views import TaskEntryListCreateView, TaskCategoryListCreateView  # Importer la vue correcte
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),  # Pour React ou la page principale
    path('api/', include('accounts.urls')),  # Inclure les URLs de l'application accounts sans préfixe
    path('api/task-entry/', TaskEntryListCreateView.as_view(), name='task-entry-list-create'),
    path('api/task-category/', TaskCategoryListCreateView.as_view(), name='task-category-list-create'),  # Utilisez TaskCategoryListCreateView ici
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
