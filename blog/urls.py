#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.conf.urls import url
from blog.views import index, post, category, tag, search, archive, tags, \
    links, about, contact, categories
from blog.feeds import LatestBlogFeed
from blog.models import Blog
from django.contrib.sitemaps import GenericSitemap
from django.contrib.sitemaps.views import sitemap
from django.views.decorators.cache import cache_page


info_dict = {
    'queryset': Blog.objects.order_by('-publish_time'),
    'date_field': 'update_time'
}

sitemaps = {
    'blog': GenericSitemap(info_dict, priority=0.2)
}

urlpatterns = [
    # 首页
    url(r'^$', index, name='index'),
    url(r'^p/(?P<p>\d+)/$', index, name='index'),

    # 文章详细页
    url(r'^post/(?P<slug>[a-zA-Z0-9_\-]+)/$', post, name='post'),

    # 文章分类
    url(r'^category/(?P<slug>[a-zA-Z0-9_\-]+)/$', category, name='category'),
    url(r'^category/(?P<slug>[a-zA-Z0-9_\-]+)/p/(?P<p>\d+)/$', category,
        name='category'),

    # 标签
    url(r'^tag/(?P<slug>[a-zA-Z0-9_\-]+)/$', tag, name='tag'),
    url(r'^tag/(?P<slug>[a-zA-Z0-9_\-]+)/p/(?P<p>\d+)/$', tag, name='tag'),

    url(r'^tags/$', tags, name='tags'),

    # 归档
    url(r'^archive/$', archive, name='archive'),
    url(r'^archive/p/(?P<p>\d+)/$', archive, name='archive'),

    # 分类
    url(r'^categories/$', categories, name='categories'),

    # 搜索
    url(r'^search/$', search, name='search'),
    url(r'^search/p/(?P<p>\d+)/$', search, name='search'),

    # 订阅rss
    url(r'^feed|rss/$', LatestBlogFeed()),

    # 链接
    url(r'^links/$', links, name='links'),

    # 关于
    url(r'^about/$', about, name='about'),

    # 联系
    url(r'^contact/$', contact, name='contact'),

    # 网站地图
    url(r'^sitemap\.xml$', cache_page(60 * 60 * 12)(sitemap),
        {'sitemaps': sitemaps})
]
