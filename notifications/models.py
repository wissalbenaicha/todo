from django.db import models
from django.utils import timezone

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('REMINDER', 'Reminder'),
        ('TASK', 'Task Completed'),
        ('MEETING', 'Team Meeting'),
        ('SUMMARY', 'Daily Summary'),
        ('ALERT', 'Priority Alert'),
        ('RECURRING', 'Recurring Reminder'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
