from django.urls import path
from .modules.user import *
from .views import *


app_name = 'main'
urlpatterns = [
    path('user/login', UserLoginView.as_view(), name='login'),
    path('user/info', UserView.as_view(), name='user_info'),
    path('user/upload_avatar', UploadAvatarView.as_view(), name='user_avatar'),

    # 后台页面
    path('admin', admin, name='admin'),
    path('admin/login', login, name='admin_login'),
]