from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Team
from .serializers import TeamDeadlineSerializer


class UpdateDeadlineView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, team_id):

        try:
            team = Team.objects.get(id=team_id)
        except Team.DoesNotExist:
            return Response({"error": "Team not found"}, status=404)

        if team.manager != request.user:
            return Response({"error": "Only manager can update deadline"}, status=403)

        serializer = TeamDeadlineSerializer(team, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)