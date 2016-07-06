#!/usr/bin/env python
# -*- coding: utf-8 -*-


from django.contrib import admin
from .models import Tag, Author, Category, Blog, Link, Media
from django_markdown.admin import MarkdownModelAdmin


class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'website')
    search_fields = ('name', )


class MediaAdmin(admin.TabularInline):
    model = Media


class TagsShipInline(admin.TabularInline):
    model = Blog.tags.through


class TagAdmin(admin.ModelAdmin):
    inlines = [TagsShipInline, ]


class BlogAdmin(MarkdownModelAdmin):
    list_display = ('title', 'id', 'author', 'publish_time', 'update_time')
    list_filter = ('publish_time', )
    search_fields = ('title', )
    ordering = ('-publish_time', )
    inlines = [MediaAdmin, TagsShipInline]
    list_per_page = 10
    exclude = ('tags', )


# 标签
admin.site.register(Tag, TagAdmin)

# 作者
admin.site.register(Author, AuthorAdmin)

# 文章
admin.site.register(Blog, BlogAdmin)

# 分类
admin.site.register(Category)

# 图片
admin.site.register(Media)

# 链接
admin.site.register(Link)
