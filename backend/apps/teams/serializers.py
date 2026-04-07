from rest_framework import serializers
from .models import Team


class TeamDeadlineSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ["deadline"]