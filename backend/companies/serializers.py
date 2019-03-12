# companies/serializers.py

from rest_framework import serializers
from .models import Company, Job

class JobSerializer(serializers.HyperlinkedModelSerializer):
    parent_id = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(),source='company.id')

    class Meta:
        model = Job
        fields = ('id', 'title', 'parent_id')

    def create(self, validated_data):
        subject = Job.objects.create(parent=validated_data['company']['id'], title=validated_data['title'])
        return subject

class CompanySerializer(serializers.HyperlinkedModelSerializer):
    jobs = JobSerializer(many=True, read_only=True)
    class Meta:
        model = Company
        fields = ('id', 'name', 'jobs')