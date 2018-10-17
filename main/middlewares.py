from .utils import get_user_from_session
from django.shortcuts import redirect
from django.urls import reverse

"""
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
"""
ADMIN_PAGE = ['/admin', ]

class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path_info = request.path_info
        if path_info in ADMIN_PAGE:
            if not get_user_from_session(request):
                return redirect(reverse('main:admin_login'))
        return self.get_response(request)