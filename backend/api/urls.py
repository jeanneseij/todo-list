from django.urls import path
from .views import UserLogin, UserRegister, TaskCreate, TaskList, TaskUpdate, TaskDelete, TaskCompleteUpdate

urlpatterns = [
    path('register/', UserRegister.as_view(), name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('tasks/', TaskList.as_view(), name='task-list'),
    path('create/', TaskCreate.as_view(), name='task-create'),
    path('update/<int:id>/', TaskUpdate.as_view(), name='task-update'),
    path('delete/<int:id>/', TaskDelete.as_view(), name='task-delete'),
    path('task/<int:id>/complete/', TaskCompleteUpdate.as_view(), name='task-complete-update'),
]
