from django.db import models
from apps.employees.models import EmployeeProfile


class DailyReport(models.Model):

    employee = models.ForeignKey(
        EmployeeProfile,
        on_delete=models.CASCADE,
        related_name="reports"
    )

    report_date = models.DateField()

    tasks_done = models.TextField()

    blockers = models.TextField(
        blank=True,
        null=True
    )

    hours_worked = models.DecimalField(
        max_digits=4,
        decimal_places=1
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.employee.user.username} - {self.report_date}"