# companies/serializers.py

from rest_framework import serializers
from .models import Company, Job

class JobSerializer(serializers.HyperlinkedModelSerializer):
    parent_id = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(),source='company.id')
    parent_name = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), source='company.name')
    parent_city = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(),source='company.city')
    parent_state = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), source='company.state')

    class Meta:
        model = Job
        fields = ('id', 'title', 'description', 'apply_link', 'parent_id', 'parent_name', 'parent_city', 'parent_state')

    def create(self, validated_data):
        subject = Job.objects.create(parent=validated_data['company']['id'], title=validated_data['title'])
        return subject

class CompanySerializer(serializers.HyperlinkedModelSerializer):
    jobs = JobSerializer(many=True, read_only=True)
    class Meta:
        model = Company
        fields = ('id', 
                'name', 
                'city', 
                'state', 
                'twitter',
                'facebook',
                'logo',
                'linkedin', 
                'jobs'
                )
                