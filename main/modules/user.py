from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from ..utils import *
from ..models import *
from hashlib import md5
from time import time


class UserLoginView(GenericAPIView):
    queryset = User.objects.all()

    def post(self, request):
        login_fail = {'data': '', 'msg': '用户名或密码错误', 'success': False}
        login_success = {'data': '', 'msg': '登录成功', 'success': True}
        md5_ins = md5()
        try:
            params = request.data['params']
            username = params['username']
            password = params['password']
            # 验证用户
            user = self.queryset.get(username=username)
            if not pwCheck(password, user.password):  # 密码错误
                return Response(login_fail)
            # 更新cookie
            md5_ins.update(str(time()).encode() + params['username'].encode())
            cookie = md5_ins.hexdigest()
            user.cookie = cookie
            user.save()
            # 放入session
            request.session['cookie'] = cookie
            return Response(login_success)
        except Exception as e:
            print(e.__repr__())
            return Response(login_fail)
