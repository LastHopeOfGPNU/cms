# Generated by Django 2.0.2 on 2018-10-08 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('introduction', models.CharField(max_length=200)),
                ('view', models.IntegerField(default=0)),
                ('in_date', models.DateTimeField()),
                ('coverPicture', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='ArticleTag',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('article_id', models.IntegerField()),
                ('tag_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tagname', models.CharField(max_length=200)),
                ('pid', models.IntegerField(default=-1)),
            ],
        ),
    ]
