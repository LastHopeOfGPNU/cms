from django.urls import path
from .modules.user import *
from .modules.article import *
from .views import *


app_name = 'main'
urlpatterns = [
    path('user/login', UserLoginView.as_view(), name='login'),
    path('user/info', UserView.as_view(), name='user_info'),
    path('user/upload_avatar', UploadAvatarView.as_view(), name='user_avatar'),
    # 上传图片api
    path('adjuncts/ckeditor/file_upload', ImageView.as_view()),
    # 文章api
    path('article', ArticleView.as_view(), name='article'),
    path('article/detail', ArticleDetailView.as_view(), name='article_detail'),
    # 轮播api
    path('carousel', ArticleView.as_view(), name='carousel'),
    path('carousel/detail', ArticleDetailView.as_view(), name='carousel_detail'),
    # 广告api
    path('ad', ArticleView.as_view(), name='ad'),
    path('ad/detail', ArticleDetailView.as_view(), name='ad_detail'),
    # 热门api
    path('hot', ArticleView.as_view(), name='hot'),
    path('hot/detail', ArticleDetailView.as_view(), name='hot_detail'),

    # 后台页面
    path('admin', admin, name='admin'),
    path('admin/login', login, name='admin_login'),
    path('admin/article', article, name="admin_article"),
    path('admin/hotList', hotList, name="admin_hotList"),
    path('admin/advert', advert, name="admin_advert"),
    path('admin/carouselList', carouselList, name="admin_carouselList"),
    path('admin/articleDetail', articleDetail, name="admin_articleDetail"),
    path('admin/hotDetail', hotDetail, name="admin_hotDetail"),
    path('admin/advertDetail', advertDetail, name="admin_advertDetail"),
    path('admin/carouselDetail', carouselDetail, name="admin_carouselDetail"),
    path('admin/userInfo', userInfo, name="admin_userInfo"),

    # 前端页面
    path('index', index, name='index'),
    path('front/article', frontArticle, name='article')
]