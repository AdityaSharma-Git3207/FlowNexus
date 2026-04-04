from django.db import models
from django.conf import settings
from apps.teams.models import Team


class EmployeeProfile(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="employee_profile"
    )

    team = models.ForeignKey(
        Team,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="employees"
    )

    designation = models.CharField(max_length=255)

    joined_date = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.designation}"