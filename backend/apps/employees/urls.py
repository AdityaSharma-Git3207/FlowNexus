from django.urls import path
from .views import TeamMembersView

urlpatterns = [
    path("team-members/", TeamMembersView.as_view(), name="team-members"),
]