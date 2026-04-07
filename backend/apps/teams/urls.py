from django.urls import path
from .views import UpdateDeadlineView

urlpatterns = [
    path("team/<int:team_id>/deadline/", UpdateDeadlineView.as_view()),
]