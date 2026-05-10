from django.db import models

class MediaItem(models.Model):
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

    def __str__(self):
        return f"{self.title} ({self.category})"