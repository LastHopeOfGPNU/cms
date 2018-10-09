from django.shortcuts import render


def admin(request):
    return render(request, 'main/backend/admin.html')


def login(request):
    return render(request, 'main/backend/login.html')


def test(request):
    return render(request, 'main/backend/test.html')


def index(request):
    return render(request, 'main/front/index.html')


def article(request):
    return render(request, 'main/backend/article.html')
