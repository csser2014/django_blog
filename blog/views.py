#!/usr/bin/env python
# -*- coding: utf-8 -*-

from django.shortcuts import render, get_object_or_404
from django.http import Http404, HttpResponse
from .models import Blog, Tag, Category, Link
from django.core.urlresolvers import reverse
from django.db.models import Q


def index(request, p=1):
    """docstring for index"""
    try:
        blogs = Blog.objects.filter(is_publish=True).order_by('-id')
    except Exception:
        raise Http404
    pagi_path = reverse('index')
    template_var = {'blogs': blogs, 'p': p, 'pagi_path': pagi_path}
    return render(request, 'index.html', template_var)


def post(request, slug):
    """docstring for post"""
    try:
        blog = Blog.objects.get(slug=slug)
        tags = Tag.objects.all()
    except Exception:
        raise Http404
    template_var = {'blog': blog, 'tags': tags}
    return render(request, 'post.html', template_var)


def category(request, slug, p=1):
    category = get_object_or_404(Category, slug=slug)
    blogs = category.blog_set.filter(is_publish=True).order_by('-id')
    pagi_path = reverse('category', args=(slug, ))
    template_var = {'blogs': blogs, 'p': p, 'type': 'category',
                    'category': category, 'pagi_path': pagi_path, 'slug': slug}
    return render(request, 'filter.html', template_var)


def tag(request, slug, p=1):
    """docstring for Tag"""
    try:
        tag = Tag.objects.get(slug=slug)
        blogs = tag.blog_set.all()
    except Tag.DoesNotExist:
        raise Http404
    pagi_path = reverse('tag', args=(slug, ))
    template_var = {'blogs': blogs, 'p': p, 'type': 'tag', 'tag': tag,
                    'pagi_path': pagi_path}
    return render(request, 'filter.html', template_var)


def tags(request):
    """docstring for Tags"""
    try:
        tags = Tag.objects.all()
    except Exception:
        raise Http404
    template_var = {'tags': tags}
    return render(request, 'tags.html', template_var)


def archive(request, p=1):
    """docstring for Archive"""
    try:
        blogs = Blog.objects.filter(is_publish=True).order_by('-publish_time')
        count = Blog.objects.filter(is_publish=True).count()
    except Exception:
        raise Http404
    pagi_path = reverse('archive')
    template_var = {'blogs': blogs, 'p': p, 'pagi_path': pagi_path,
                    'count': count}
    return render(request, 'archive.html', template_var)


def links(request):
    """docstring for Links"""
    try:
        links = Link.objects.order_by('-create_date')
    except Exception:
        raise Http404
    template_var = {'links': links}
    return render(request, 'links.html', template_var)


def about(request):
    """docstring for About"""
    template_var = {}
    return render(request, 'about.html', template_var)


def categories(request):
    """docstring for Category"""
    return HttpResponse("helloworld")


def contact(request):
    """docstring for Contact"""
    template_var = {}
    return render(request, 'contact.html', template_var)


def search(request, p=1):
    pagi_path = reverse('search')
    if 'q' in request.GET:
        q = request.GET['q'].strip()
        search_path = '?q=%s' % (q)
        blogs = Blog.objects.filter(Q(title__icontains=q)
                                    | Q(content__icontains=q))
        template_var = {'blogs': blogs, 'p': p, 'type': 'search', 'q': q,
                        'pagi_path': pagi_path, 'search_path': search_path}
    return render(request, 'filter.html', template_var)
