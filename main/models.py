from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=255)
    avatar_url = models.CharField(max_length=255, default='')
    domain_name = models.CharField(max_length=200, default='')
    introduction = models.CharField(max_length=255, default='')
    wechat = models.CharField(max_length=200, default='')
    weibo = models.CharField(max_length=200, default='')
    qq = models.CharField(max_length=200, default='')
    nick = models.CharField(max_length=200, default='')
    cookie = models.CharField(max_length=32, blank=True, null=True, default='')