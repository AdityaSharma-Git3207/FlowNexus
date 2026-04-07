from rest_framework import generics
from .models import DailyReport
from .serializers import DailyReportSerializer


class DailyReportListCreateView(generics.ListCreateAPIView):
    queryset = DailyReport.objects.all()
    serializer_class = DailyReportSerializer