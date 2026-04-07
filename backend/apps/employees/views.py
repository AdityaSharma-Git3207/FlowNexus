from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import EmployeeProfile
from .serializers import TeamMemberSerializer


class TeamMembersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not request.user.managed_teams.exists():
            return Response(
                {"error": "This user is not a manager"},
                status=403
            )

        teams = request.user.managed_teams.all()

        employees = EmployeeProfile.objects.filter(
            team__in=teams
        )

        serializer = TeamMemberSerializer(employees, many=True)

        return Response(serializer.data)