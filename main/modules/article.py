from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from django.utils import timezone
from django.db.models import F
import os
from urllib.parse import urljoin
from ..models import *
from ..serializers import *
from .core import *
from ..decorators import *


class ImageView(GenericAPIView):
    # 上传图片接口
    @login_required
    def post(self, request):
        """
        上传成功：
        {"uploaded":1, "fileName":"图片名称", "url":"图片访问路径"}
        上传失败：
         {"uploaded":0, "error":{"message":"失败原因"}}
        """
        upload_path = 'main/static/main/images/'
        url = '/static/main/images/'
        success = {"uploaded": 1, "fileName": "图片名称", "url": "图片访问路径"}
        fail = {"uploaded": 0, "error": {"message": "失败原因"}}
        try:
            img = request.FILES['upload']
            upload_path = os.path.join(upload_path, img.name)
            url = urljoin(url, img.name)
            with open(upload_path, 'wb') as f:
                for i in img: f.write(i)
            success.update({'fileName': img.name, 'url': url})
            return Response(success)
        except Exception as e:
            msg = e.__repr__()
            fail['error']['message'] = msg
            print(msg)
            return Response(msg)


class ArticleView(BaseListView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    pk_field = 'id'
    # 文章接口（List）
    def get_dataset(self, request):
        tagid = request.GET.get('tagid', None)
        path_info = request.path_info
        try:
            dataset = self.queryset.order_by('-id')
            if tagid:
                dataset = dataset.filter(tagid=tagid)
            elif path_info == '/hot':  # 热门
                dataset = dataset.filter(is_hot=1)
            elif path_info == '/ad':  # 广告
                dataset = dataset.filter(tagid=7)
            elif path_info == '/carousel':  # 轮播图
                dataset = dataset.filter(is_carousel=1)
            else:
                dataset = dataset.filter(tagid__lte=6)
            return dataset
        except Exception as e:
            print(e.__repr__())
            return self.queryset.none()


class ArticleDetailView(GenericAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleDetailSerializer

    def get(self, request):  # 获取文章详情
        try:
            id = request.GET['id']
            article = self.queryset.get(id=id)
            # 更新浏览数
            article.view = F('view') + 1
            article.save()
            data = self.get_serializer(article).data
            return Response({'data': data, 'success': True, 'msg': ''})
        except Exception as e:
            msg = '文章不存在'
            print(e.__repr__())
            return Response({'data': '', 'success': False, 'msg': msg})

    @login_required
    def post(self, request):  # 添加文章
        try:
            params = request.data['params']
            path_info = request.path_info
            if path_info == '/hot/detail':  # 热门
                params['is_hot'] = 1
            else:
                params['is_hot'] = 0
            if path_info == '/ad/detail':
                params['tagid'] = 7
            if path_info == '/carousel/detail':
                params['is_carousel'] = 1
            else:
                params['is_carousel'] = 0
            in_date = timezone.now()
            article = Article.objects.create(title=params['title'], content=params['detail'],
                                             introduction=params['introduction'], in_date=in_date,
                                             coverPicture=params['coverPicture'], tagid=params['tagid'],
                                             is_hot=params['is_hot'], is_carousel=params['is_carousel'])
            article.save()
            # 返回创建的文章对象
            data = self.get_serializer(article).data
            return Response({'data': data, 'success': True, 'msg': ''})
        except Exception as e:
            msg = '参数错误'
            print(e.__repr__())
            return Response({'data': '', 'success': False, 'msg': msg})

    @login_required
    def put(self, request):  # 修改文章
        try:
            params = request.data['params']
            # path_info = request.path_info
            params['content'] = params['detail']
            in_date = timezone.now()
            # 以下属性不允许修改
            id = params.pop('id')
            # 获取文章
            article = self.queryset.get(id=id)
            for key, value in params.items():
                setattr(article, key, value)
            article.in_date = in_date  # 更新文章发布时间（也可以说是最近修改时间）
            article.save()
            # 返回修改后的文章对象
            data = self.get_serializer(article).data
            return Response({'data': data, 'success': True, 'msg': '修改成功'})
        except Exception as e:
            msg = '参数错误'
            print(e.__repr__())
            return Response({'data': '', 'success': False, 'msg': msg})