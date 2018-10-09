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


class Article(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    introduction = models.CharField(max_length=200)  # 文章简介
    view = models.IntegerField(default=0)  # 浏览次数
    in_date = models.DateTimeField()  # 发布日期
    coverPicture = models.CharField(max_length=200)  # 封面图
    tagid = models.IntegerField(null=True)


class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    tagname = models.CharField(max_length=200)
    tagid = models.IntegerField(unique=True, null=True)


# 文章与标签的多对多表
class ArticleTag(models.Model):
    id = models.AutoField(primary_key=True)
    article_id = models.IntegerField()
    tag_id = models.IntegerField()
