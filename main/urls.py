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

    # 后台页面
    path('admin', admin, name='admin'),
    path('admin/login', login, name='admin_login'),
    path('admin/test', test, name="admin_test")
]