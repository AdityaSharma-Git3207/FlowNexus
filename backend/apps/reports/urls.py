from django.urls import path
from .views import (
    DailyReportListCreateView, 
    MyReportsView, 
    TeamReportsView,
    ManagerDashboardView,
    ReportStatusView,
    WeeklyReportSummaryView,
    ReportDeadlineStatusView,
)

urlpatterns = [
    path("reports/", DailyReportListCreateView.as_view(), name="reports"),
    path("my-reports/", MyReportsView.as_view()),
    path("team-reports/", TeamReportsView.as_view()),
    path("dashboard/", ManagerDashboardView.as_view(), name="dashboard"),
    path("report-status/", ReportStatusView.as_view(), name="report-status"),
    path("weekly-summary/", WeeklyReportSummaryView.as_view(), name="weekly-summary"),
    path("deadline-status/", ReportDeadlineStatusView.as_view(), name="deadline-status"),
]