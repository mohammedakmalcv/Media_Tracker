from django.db import models
from django.contrib.auth.models import User

class MediaItem(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    CATEGORY_CHOICES = [
        ('Manga', 'Manga'),
        ('Manhwa', 'Manhwa'),
        ('Game', 'Game'),
    ]
    
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Completed', 'Completed'),
        ('On-Hold', 'On-Hold'),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    current_progress = models.IntegerField(default=0) 
    total_progress = models.IntegerField(null=True, blank=True) 
    image_url = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self):
        return f"{self.title} ({self.category})"