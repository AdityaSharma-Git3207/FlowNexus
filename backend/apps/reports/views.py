from rest_framework import generics
from .models import DailyReport
from .serializers import DailyReportSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from datetime import date
from apps.employees.models import EmployeeProfile
from datetime import timedelta, time
from django.utils.timezone import now


class DailyReportListCreateView(generics.ListCreateAPIView):
    serializer_class = DailyReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return DailyReport.objects.all()

    def perform_create(self, serializer):

        if not hasattr(self.request.user, "employee_profile"):
            raise PermissionDenied("User is not an employee")

        serializer.save(employee=self.request.user.employee_profile)


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


class ManagerDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not request.user.managed_teams.exists():
            return Response(
                {"error": "This user is not a manager"},
                status=403
            )

        teams = request.user.managed_teams.all()

        employees = EmployeeProfile.objects.filter(team__in=teams)

        today = date.today()

        reports_today = DailyReport.objects.filter(
            employee__in=employees,
            created_at__date=today
        )

        submitted_employee_ids = reports_today.values_list(
            "employee_id", flat=True
        )

        submitted_employees = employees.filter(id__in=submitted_employee_ids)
        missing_employees = employees.exclude(id__in=submitted_employee_ids)

        data = {
            "team_size": employees.count(),
            "submitted_today": submitted_employees.count(),
            "missing_reports": missing_employees.count(),
            "submitted_employees": [
                e.user.username for e in submitted_employees
            ],
            "missing_employees": [
                e.user.username for e in missing_employees
            ],
        }

        return Response(data)


class ReportStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not request.user.managed_teams.exists():
            return Response(
                {"error": "This user is not a manager"},
                status=403
            )

        teams = request.user.managed_teams.all()

        employees = EmployeeProfile.objects.filter(team__in=teams)

        today = date.today()

        reports_today = DailyReport.objects.filter(
            employee__in=employees,
            created_at__date=today
        )

        submitted_ids = reports_today.values_list("employee_id", flat=True)

        data = []

        for employee in employees:
            data.append({
                "employee": employee.user.username,
                "team": employee.team.name if employee.team else None,
                "submitted": employee.id in submitted_ids
            })

        return Response(data)


class WeeklyReportSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not request.user.managed_teams.exists():
            return Response(
                {"error": "This user is not a manager"},
                status=403
            )

        teams = request.user.managed_teams.all()

        employees = EmployeeProfile.objects.filter(team__in=teams)

        today = now().date()
        week_start = today - timedelta(days=today.weekday())

        reports = DailyReport.objects.filter(
            employee__in=employees,
            created_at__date__gte=week_start
        )

        submitted_ids = reports.values_list("employee_id", flat=True).distinct()

        submitted = employees.filter(id__in=submitted_ids)
        missing = employees.exclude(id__in=submitted_ids)

        data = {
            "week_start": week_start,
            "total_reports": reports.count(),
            "employees_submitted": [e.user.username for e in submitted],
            "employees_missing": [e.user.username for e in missing],
        }

        return Response(data)
    


class ReportDeadlineStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if not request.user.managed_teams.exists():
            return Response(
                {"error": "This user is not a manager"},
                status=403
            )

        teams = request.user.managed_teams.all()

        employees = EmployeeProfile.objects.filter(team__in=teams)

        today = now().date()

        reports_today = DailyReport.objects.filter(
            employee__in=employees,
            created_at__date=today
        )

        data = []

        for employee in employees:

            report = reports_today.filter(employee=employee).first()

            if not report:
                status = "missing"

            else:
                deadline = employee.team.deadline if employee.team else time(18, 0)
                submitted_time = report.created_at.time()

                if submitted_time <= deadline:
                    status = "on_time"
                else:
                    status = "late"

            data.append({
                "employee": employee.user.username,
                "team": employee.team.name if employee.team else None,
                "status": status
            })

        return Response(data)