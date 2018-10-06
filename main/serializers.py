from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('avatar_url', 'domain_name', 'introduction', 'wechat', 'weibo', 'qq', 'nick')
