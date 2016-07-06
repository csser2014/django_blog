# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(help_text='\u4f5c\u8005\u59d3\u540d', max_length=30, verbose_name='\u4f5c\u8005\u59d3\u540d')),
                ('email', models.EmailField(help_text='\u90ae\u7bb1\u5730\u5740', max_length=254, verbose_name='\u90ae\u7bb1\u5730\u5740', blank=True)),
                ('website', models.URLField(help_text='\u7f51\u5740', verbose_name='\u7f51\u5740', blank=True)),
            ],
            options={
                'verbose_name': '\u4f5c\u8005',
                'verbose_name_plural': '\u4f5c\u8005',
            },
        ),
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(help_text='\u6587\u7ae0\u6807\u9898', max_length=100, verbose_name='\u6587\u7ae0\u6807\u9898')),
                ('summary', models.TextField(help_text='\u6587\u7ae0\u6458\u8981', verbose_name='\u6587\u7ae0\u6458\u8981')),
                ('content', models.TextField(help_text='\u6587\u7ae0\u5185\u5bb9', verbose_name='\u6587\u7ae0\u5185\u5bb9')),
                ('publish_time', models.DateTimeField(auto_now_add=True)),
                ('update_time', models.DateTimeField(auto_now=True)),
                ('stick', models.BooleanField(default=False, help_text='\u662f\u5426\u7f6e\u9876', verbose_name='\u662f\u5426\u7f6e\u9876')),
                ('is_publish', models.BooleanField(default=True)),
                ('readtimes', models.IntegerField(default=0)),
                ('slug', models.SlugField(null=True, blank=True, help_text='\u81ea\u5b9a\u4e49\u6587\u7ae0\u540d\u79f0', unique=True, verbose_name='\u81ea\u5b9a\u4e49\u6587\u7ae0\u540d\u79f0')),
                ('author', models.ForeignKey(verbose_name='\u6587\u7ae0\u7684\u4f5c\u8005', to='blog.Author', help_text='\u6587\u7ae0\u7684\u4f5c\u8005')),
            ],
            options={
                'verbose_name': '\u6587\u7ae0',
                'verbose_name_plural': '\u6587\u7ae0',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(help_text='\u5206\u7c7b\u76ee\u5f55\u540d\u79f0', max_length=128, verbose_name='\u5206\u7c7b\u76ee\u5f55\u540d\u79f0')),
                ('descript', models.TextField(help_text='\u5206\u7c7b\u76ee\u5f55\u63cf\u8ff0', verbose_name='\u5206\u7c7b\u76ee\u5f55\u63cf\u8ff0', blank=True)),
                ('slug', models.SlugField(null=True, blank=True, help_text='\u81ea\u5b9a\u4e49\u76ee\u5f55\u540d\u79f0', unique=True, verbose_name='\u81ea\u5b9a\u4e49\u76ee\u5f55\u540d\u79f0')),
            ],
            options={
                'verbose_name': '\u5206\u7c7b\u76ee\u5f55',
                'verbose_name_plural': '\u5206\u7c7b\u76ee\u5f55',
            },
        ),
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('url', models.URLField(help_text='\u53cb\u60c5\u94fe\u63a5\u5730\u5740', verbose_name='\u53cb\u60c5\u94fe\u63a5\u5730\u5740')),
                ('name', models.CharField(help_text='\u53cb\u60c5\u94fe\u63a5\u540d\u79f0', max_length=128, verbose_name='\u53cb\u60c5\u94fe\u63a5\u540d\u79f0')),
                ('descript', models.TextField(help_text='\u53cb\u60c5\u94fe\u63a5\u63cf\u8ff0', null=True, verbose_name='\u53cb\u60c5\u94fe\u63a5\u63cf\u8ff0', blank=True)),
                ('create_date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': '\u53cb\u60c5\u94fe\u63a5',
                'verbose_name_plural': '\u53cb\u60c5\u94fe\u63a5',
            },
        ),
        migrations.CreateModel(
            name='Media',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=120)),
                ('image', models.ImageField(upload_to=b'uploads/%Y/%m/%d')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('blog', models.ForeignKey(to='blog.Blog')),
            ],
            options={
                'verbose_name': '\u56fe\u7247\u8d44\u6e90',
                'verbose_name_plural': '\u56fe\u7247\u8d44\u6e90',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(help_text='\u6807\u7b7e\u540d', max_length=64, verbose_name='\u6807\u7b7e\u540d')),
                ('create_time', models.DateTimeField(auto_now_add=True)),
                ('slug', models.SlugField(null=True, blank=True, help_text='\u81ea\u5b9a\u4e49\u540d\u79f0', unique=True, verbose_name='\u81ea\u5b9a\u4e49\u540d\u79f0')),
                ('color', models.CharField(max_length=32, choices=[(b'blue', b'blue'), (b'violet', b'violet'), (b'green', b'green'), (b'orange', b'orange'), (b'gold', b'gold')])),
            ],
            options={
                'verbose_name': '\u6807\u7b7e',
                'verbose_name_plural': '\u6807\u7b7e',
            },
        ),
        migrations.AddField(
            model_name='blog',
            name='category',
            field=models.ForeignKey(verbose_name='\u6587\u7ae0\u5206\u7c7b', to='blog.Category', help_text='\u6587\u7ae0\u5206\u7c7b'),
        ),
        migrations.AddField(
            model_name='blog',
            name='tags',
            field=models.ManyToManyField(to='blog.Tag', blank=True),
        ),
    ]
