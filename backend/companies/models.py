# companies/models.py
from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=200)
    linkedin = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    logo = models.URLField(blank=True)

    def __str__(self):
        return self.name



class Job(models.Model):
    company = models.ForeignKey(Company, related_name='jobs', on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    apply_link = models.URLField()

    def __str__(self):
        return self.title