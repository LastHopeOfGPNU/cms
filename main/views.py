from django.shortcuts import render


def admin(request):
    return render(request, 'main/backend/admin.html')


def login(request):
    return render(request, 'main/backend/login.html')


def index(request):
    return render(request, 'main/front/index.html')

def frontArticle(request):
    return render(request, 'main/front/detail.html')

def article(request):
    return render(request, 'main/backend/article.html')


def hotList(request):
    return render(request, 'main/backend/hotList.html')


def advert(request):
    return render(request, 'main/backend/advert.html')


def carouselList(request):
    return render(request, 'main/backend/carouselList.html')


def articleDetail(request):
    return render(request, 'main/backend/articleDetail.html')


def hotDetail(request):
    return render(request, 'main/backend/hotDetail.html')


def advertDetail(request):
    return render(request, 'main/backend/advertDetail.html')


def carouselDetail(request):
    return render(request, 'main/backend/carouselDetail.html')


def userInfo(request):
    return render(request,'main/backend/userInfo.html')
