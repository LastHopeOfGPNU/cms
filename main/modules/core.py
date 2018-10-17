from rest_framework import generics
from rest_framework.response import Response
from django.core.paginator import PageNotAnInteger, EmptyPage, Paginator
from ..decorators import *


class BaseListView(generics.GenericAPIView):

    def get_dataset(self, request):
        return self.get_queryset()

    def get_data(self, request, objs):
        serializer = self.get_serializer(objs, many=True)
        data = {'success': True, 'data': serializer.data, 'msg': ''}
        return data

    def get(self, request):
        page = request.GET.get('page', 1)
        pagesize = request.GET.get('pagesize', 10)
        dataset = self.get_dataset(request)
        paginaor = Paginator(dataset, pagesize)
        try:
            objs = paginaor.get_page(page)
        except PageNotAnInteger:
            objs = paginaor.get_page(1)
        except EmptyPage:
            objs = paginaor.get_page(paginaor.count)
        data = self.get_data(request, objs)
        data.update({
            'total': dataset.count()
        })
        return Response(data)

    @login_required
    def delete(self, request):
        try:
            pk = request.GET[self.pk_field]
            obj = self.get_queryset().get(pk=pk)
            obj.delete()
        except:
            return Response({'success': False, 'msg': '', 'data': ''})
        return Response({'success': True, 'msg': '', 'data': ''})