from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from ..utils import *
from ..models import *
from ..serializers import *
from hashlib import md5
from time import time
import os
from cms.settings import STATIC_ROOT


def create_user(username, password):
    password = pwGen(password)
    user = User.objects.create(username=username, password=password)
    user.save()
    return user


class UserLoginView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

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
            # 放入用户信息
            data = self.get_serializer(user).data
            login_success['data'] = data
            return Response(login_success)
        except Exception as e:
            print(e.__repr__())
            return Response(login_fail)


class UserView(GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request):
        try:
            user = self.queryset.order_by('-id')[0]
        except:
            user = None
        data = self.get_serializer(user).data
        return Response({'data': data, 'msg': '', 'success': True})

    # 修改用户信息
    def put(self, request):
        edit_success = {'data': '', 'msg': '修改成功', 'success': True}
        edit_fail = {'data': '', 'msg': '修改失败', 'success': False}
        try:
            params = request.data['params']
            # 这几样东西不能修改
            params.pop('id', None)
            params.pop('username', None)
            params.pop('password', None)
            params.pop('cookie', None)
            user = self.queryset.order_by('-id')[0]
            for key, value in params.items():
                setattr(user, key, value)
            user.save()
            data = self.get_serializer(user).data
            edit_success.update({'data': data})
            return Response(edit_success)
        except Exception as e:
            print(e.__repr__())
            return Response(edit_fail)


class UploadAvatarView(GenericAPIView):
    STATIC_PATH = 'static/'

    def post(self, request):
        try:
            file = request.FILES['file']
            user = get_user_from_session(request)
            path = os.path.join(STATIC_ROOT, 'main')
            img_name = 'avatar%s' % os.path.splitext(file.name)[1]
            filename = os.path.join(path, img_name)
            with open(filename, 'wb') as img:
                for line in file: img.write(line)
            user.avatar_url = STATIC_ROOT + img_name
            user.save()
            return Response({'data': self.STATIC_PATH + img_name, 'success': True, 'msg': ''})
        except Exception as e:
            print(e.__repr__())
            return Response({'data': '', 'success': False, 'msg': ''})
