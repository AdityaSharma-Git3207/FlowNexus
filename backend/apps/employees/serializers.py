from rest_framework import serializers
from .models import EmployeeProfile


class TeamMemberSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="user.username")
    team = serializers.CharField(source="team.name")

    class Meta:
        model = EmployeeProfile
        fields = ["id", "username", "designation", "team"]