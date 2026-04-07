from django.urls import path
from .views import (
    DailyReportListCreateView, 
    MyReportsView, 
    TeamReportsView)

urlpatterns = [
    path("reports/", DailyReportListCreateView.as_view(), name="reports"),
    path("my-reports/", MyReportsView.as_view()),
    path("team-reports/", TeamReportsView.as_view()),
]