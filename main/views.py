from django.shortcuts import render


def admin(request):
    return render(request, 'main/backend/admin.html')


def login(request):
    return render(request, 'main/backend/login.html')