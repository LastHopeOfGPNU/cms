from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('avatar_url', 'domain_name', 'introduction', 'wechat', 'weibo', 'qq', 'nick')


class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ('id', 'title', 'view', 'in_date', 'introduction', 'coverPicture')


class ArticleDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'view', 'in_date', 'coverPicture', 'introduction')
