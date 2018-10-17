from rest_framework.response import Response
from .utils import get_user_from_session



def login_required(func):
    def wrapper(cls, request):
        user = get_user_from_session(request)
        if user:
            return func(cls, request)
        return Response({'data': '', 'msg': '未登录', 'success': False})
    return wrapper