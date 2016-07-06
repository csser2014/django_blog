#!/usr/bin/env python
# -*- coding: utf-8 -*-


from django.db import models
from django.core.urlresolvers import reverse
from uuslug import uuslug
from django.shortcuts import get_object_or_404
import random
import re


class Author(models.Model):
    name = models.CharField(max_length=30, verbose_name=u'作者姓名',
                            help_text=u'作者姓名')
    email = models.EmailField(blank=True, verbose_name=u'邮箱地址',
                              help_text=u'邮箱地址')
    website = models.URLField(blank=True, verbose_name=u'网址',
                              help_text=u'网址')

    def __unicode__(self):
        return u'%s' % (self.name)

    class Meta:
        verbose_name = u'作者'         # 在Admin中的表现就是显示自定义列名
        verbose_name_plural = u'作者'  # 在Admin中显示的表名


class Tag(models.Model):
    SELECT_COLOR = (
        ('blue', 'blue'),
        ('violet', 'violet'),
        ('green', 'green'),
        ('orange', 'orange'),
        ('gold', 'gold'),
    )  # 标签的颜色
    name = models.CharField(max_length=64, verbose_name=u'标签名',
                            help_text=u'标签名')
    create_time = models.DateTimeField(auto_now_add=True)  # 创建时间
    slug = models.SlugField(blank=True, null=True, unique=True,
                            verbose_name=u'自定义名称', help_text=u'自定义名称')
    color = models.CharField(max_length=32, choices=SELECT_COLOR)

    def __unicode__(self):
        return u'%s' % (self.name)

    class Meta:
        verbose_name = u'标签'
        verbose_name_plural = u'标签'

    def get_absolute_url(self):
        return reverse('tag', args=[self.slug, ])

    def save(self):
        if not self.slug:
            self.slug = uuslug(self.name, instance=self)
        return super(Tag, self).save()


class Category(models.Model):
    name = models.CharField(max_length=128, verbose_name=u'分类目录名称',
                            help_text=u'分类目录名称')
    descript = models.TextField(blank=True, verbose_name=u'分类目录描述',
                                help_text=u'分类目录描述')
    slug = models.SlugField(blank=True, null=True, unique=True,
                            verbose_name=u'自定义目录名称', help_text=u'自定义目录名称')

    def __unicode__(self):
        return u'%s' % (self.name)

    class Meta:
        verbose_name = u'分类目录'
        verbose_name_plural = u'分类目录'

    def get_absolute_url(self):
            return reverse('category', args=[self.slug, ])

    def save(self):
        if not self.slug:
            self.slug = uuslug(self.name, instance=self)
        return super(Category, self).save()


class Blog(models.Model):
    title = models.CharField(max_length=100, verbose_name=u'文章标题',
                             help_text=u'文章标题')
    summary = models.TextField(verbose_name=u'文章摘要', help_text=u'文章摘要')
    author = models.ForeignKey(Author, verbose_name=u'文章的作者',
                               help_text=u'文章的作者')
    tags = models.ManyToManyField(Tag, blank=True)
    content = models.TextField(verbose_name=u'文章内容', help_text=u'文章内容')
    publish_time = models.DateTimeField(auto_now_add=True)  # 发布时间
    update_time = models.DateTimeField(auto_now=True)  # 更新时间
    stick = models.BooleanField(default=False, verbose_name=u'是否置顶',
                                help_text=u'是否置顶')
    category = models.ForeignKey(Category, verbose_name=u'文章分类',
                                 help_text=u'文章分类')
    is_publish = models.BooleanField(default=True)  # 是否公开,默认公开
    readtimes = models.IntegerField(default=0)  # 阅读次数
    slug = models.SlugField(blank=True, null=True, unique=True,
                            verbose_name=u'自定义文章名称', help_text=u'自定义文章名称')

    def __unicode__(self):
        return u'%s' % self.title

    class Meta:
        verbose_name = u'文章'
        verbose_name_plural = u'文章'

    def get_absolute_url(self):
        return reverse('post', args=[self.slug, ])

    def save(self):
        # tags = Tag.objects.all()
        # for tag in tags:
            # self.content = re.sub(u'<a class="keyword"\s*[^>]*>%s</a>'%(tag.name),
                                  # u'%s'%(tag.name), self.content)
        # for tag in tags:
            # self.content = re.sub(u'%s'%(tag.name),
                                  # u'<a class="keyword" href="/tag/%s/">%s</a>'%(tag.slug, tag.name), self.content, 1)
        if not self.slug:
            self.slug = uuslug(self.title, instance=self)
        return super(Blog, self).save()

    # 下一篇文章
    def next(self):
        next = Blog.objects.filter(publish_time__gt=self.publish_time).order_by(
            'publish_time')
        if len(next) > 0:
            return next[0]
        else:
            return ''

    # 上一篇文章
    def prev(self):
        prev = Blog.objects.filter(publish_time__lt=self.publish_time).order_by(
            '-publish_time')
        if len(prev) > 0:
            return prev[0]
        else:
            return ''

    def relativeBlog(self):
        relateTag = self.tags.all()
        if (len(relateTag) > 0):
            tagName = relateTag[random.randint(0, len(relateTag) - 1)]
            tag = get_object_or_404(Tag, name=tagName)
            blogs = tag.blog_set.exclude(title=self.title).order_by('-readtimes')[:8]
            return blogs


class Link(models.Model):
    url = models.URLField(verbose_name=u'友情链接地址',
                          help_text=u'友情链接地址')
    name = models.CharField(max_length=128, verbose_name=u'友情链接名称',
                            help_text=u'友情链接名称')
    descript = models.TextField(null=True, verbose_name=u'友情链接描述',
                                help_text=u'友情链接描述', blank=True)
    create_date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return u'%s %s' % (self.name, self.url)

    class Meta:
        verbose_name = u'友情链接'
        verbose_name_plural = u'友情链接'


class Media(models.Model):
    UPLOAD_ROOT = 'uploads/%Y/%m/%d'
    THUMB_SIZE = '640'
    LOGO_SIZE = '48'

    title = models.CharField(max_length=120)
    image = models.ImageField(upload_to=UPLOAD_ROOT)
    date = models.DateTimeField(auto_now_add=True)
    blog = models.ForeignKey(Blog)

    class Meta:
        verbose_name = u'图片资源'
        verbose_name_plural = u'图片资源'

    def __unicode__(self):
        return u'Media: %s, uploaded at %s' % (
            self.title, self.date.strftime('%I:%M%p, %Y/%m/%d'))

    def get_thumb_url(self):
        return self.image.url

    def get_logo_url(self):
        return self.image.url + '?width=' + self.LOGO_SIZE + '&height=' + self.LOGO_SIZE
