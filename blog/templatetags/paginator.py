# -*- coding:utf-8 -*-

from django import template
from django.template import Library
from django.core.paginator import Paginator, EmptyPage
register = Library()


def get_page_range(current, adjacent, range):
    startPage = max(current - adjacent, 1)
    if startPage <= 2:
        startPage = 1
    endPage = current + adjacent + 1
    if endPage >= range[-1] - 1:
        endPage = range[-1] + 1
    page_numbers = [n for n in xrange(startPage, endPage)
                    if n > 0 and n <= range[-1]]
    return {
        'page_numbers': page_numbers,
        'show_first': 1 not in page_numbers,
        'show_last': range[-1] not in page_numbers,
        'last': range[-1],
    }


class PaginationNode(template.Node):
    def __init__(self, objects, page, per_page=10):
        try:
            self.objects = objects
        except:
			self.objects = ''
        self.per_page = int(per_page)
        self.objects_paginator = template.Variable(objects)
        self.current_page = template.Variable(page)

    def render(self, context):
		objects = self.objects_paginator.resolve(context)
		current = int(self.current_page.resolve(context))
		pagi = Paginator(objects, self.per_page)
		try:
			page = pagi.page(current)
		except EmptyPage:
			context[self.objects] = None
			context['pagi_page'] = None
			context['pagi_current'] = current
			context['pagi_range'] = None
		else:
			context[self.objects] = page.object_list
			context['pagi_page'] = page
			context['pagi_current'] = current
			context['pagi_range'] = get_page_range(current, 2, pagi.page_range)
		return ''

@register.tag
def begin_pagination(parser, token):
	try:
		tag_name, objects, page, per_page = token.split_contents()
		return PaginationNode(objects, page, per_page)
	except:
		tag_name, objects, page = token.split_contents()
		return PaginationNode(objects, page)

@register.inclusion_tag('pagination.html', takes_context=True)
def end_pagination(context):
	if 'pagi_path' in context:
		pagi_path = context['pagi_path']
	else:
		pagi_path = ''
	if 'search_path' in context:
		search_path = context['search_path']
	else:
		search_path = ''
	return {
			'pagi_page': context['pagi_page'],
			'pagi_current': context['pagi_current'],
			'pagi_range': context['pagi_range'],
			'pagi_path': pagi_path,
            'search_path' : search_path,
    }
