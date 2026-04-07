from django.urls import path
from .views import DailyReportListCreateView

urlpatterns = [
    path("reports/", DailyReportListCreateView.as_view(), name="reports"),
]