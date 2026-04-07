from rest_framework import generics
from .models import DailyReport
from .serializers import DailyReportSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied


class DailyReportListCreateView(generics.ListCreateAPIView):
    serializer_class = DailyReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DailyReport.objects.all()

    def perform_create(self, serializer):

        if not hasattr(self.request.user, "employee_profile"):
            raise PermissionDenied("User is not an employee")

        serializer.save(employee=self.request.user.employe_profile)


class MyReportsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not hasattr(request.user, "employee_profile"):
            return Response(
                {"error": "This user is not an employee"},
                status=403
            )

        employee = request.user.employee_profile
        reports = DailyReport.objects.filter(employee=employee)

        serializer = DailyReportSerializer(reports, many=True)
        return Response(serializer.data)


class TeamReportsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not request.user.managed_teams.exists():
            return Response(
                {"error": "This user is not a manager"},
                status=403
            )

        teams = request.user.managed_teams.all()

        reports = DailyReport.objects.filter(
            employee__team__in=teams
        )

        serializer = DailyReportSerializer(reports, many=True)
        return Response(serializer.data)