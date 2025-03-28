from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework import viewsets
from .views import TaskViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
