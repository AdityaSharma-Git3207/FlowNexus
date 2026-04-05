from django.contrib import admin
from .models import DailyReport


@admin.register(DailyReport)
class DailyReportAdmin(admin.ModelAdmin):
    list_display = (
        "employee",
        "report_date",
        "hours_worked",
        "created_at",
    )

    list_filter = ("report_date",)

    search_fields = ("employee__user__username",)