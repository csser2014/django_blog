#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.contrib.syndication.views import Feed
from .models import Blog
from django.core.urlresolvers import reverse
from markdown import markdown
from django.utils.feedgenerator import Rss201rev2Feed


class ExtendedRSSFeed(Rss201rev2Feed):
    mime_type = 'application/xml'
    """
    Create a type of RSS feed that has content:encoded elements.
    """
    def root_attributes(self):
        attrs = super(ExtendedRSSFeed, self).root_attributes()
        attrs['xmlns:content'] = 'http://purl.org/rss/1.0/modules/content/'
        return attrs

    def add_item_elements(self, handler, item):
        super(ExtendedRSSFeed, self).add_item_elements(handler, item)
        handler.addQuickElement(u'content:encoded', item['content_encoded'])


class LatestBlogFeed(Feed):
    feed_type = ExtendedRSSFeed

    title = '订阅我爱Gvim的博客'
    link = '/feed/'
    description = '这是一个关于Linux和python的博客'
    author = '我爱Gvim'

    def items(self):
        return Blog.objects.order_by('-publish_time')[:10]

    def item_extra_kwargs(self, item):
        return {'content_encoded': self.item_content_encoded(item)}

    def item_title(self, item):
        return u'标题%s' % item.title

    def item_description(self, item):
        return markdown(item.content)

    def item_link(self, item):
        return reverse('post', args=[item.slug])

    def item_content_encoded(self, item):
        return markdown(item.content)
