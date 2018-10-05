from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=255)
    avatar_url = models.CharField(max_length=255)
    domain_name = models.CharField(max_length=200)
    introduction = models.CharField(max_length=255)
    wechat = models.CharField(max_length=200)
    weibo = models.CharField(max_length=200)
    qq = models.CharField(max_length=200)
    nick = models.CharField(max_length=200)
    cookie = models.CharField(max_length=32, blank=True, null=True)