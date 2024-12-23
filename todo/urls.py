from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from newtache.views import TaskEntryListCreateView, TaskCategoryListView, CreateTaskView  # Importez CreateTaskView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from newtache.views import TaskCategoryListCreateView  # Assurez-vous d'importer cette vue
from . import views  # Importation nécessaire pour accéder à TaskDashboardView
from newtache.views import TaskDashboardView  # Remplace 'app_name' par le nom de ton application
from newtache.views import task_category_view  # Importez la vue que vous avez créée
from newtache.views import daily_tasks

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),  # Pour React ou la page principale
    path('api/', include('accounts.urls')),  # Inclure les URLs de l'application accounts sans préfixe
    path('api/task-entry/', TaskEntryListCreateView.as_view(), name='task-entry-list-create'),
    path('api/task-category/', TaskCategoryListView.as_view(), name='task-category-list'),
    path('api/task-category/create/', TaskCategoryListCreateView.as_view(), name='task-category-create'),  # Ajouter cette route
    path('api/task/create-with-category/', CreateTaskView.as_view(), name='task-create-with-category'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/dashboard/tasks/', TaskDashboardView.as_view(), name='task_dashboard'),
    path('api/task-categories/', task_category_view, name='task-category-view'),  # Ajouter cette route
        path('api/daily-tasks/', daily_tasks, name='daily-tasks'),  # Route pour récupérer le nombre de tâches


]


