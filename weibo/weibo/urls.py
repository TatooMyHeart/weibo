"""weibo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url
from userController import views

urlpatterns = [
    url(r'^logIn/$',views.logIn),
    url(r'^getInfo/$',views.getInfo),
    url(r'^register/$',views.register),
    url(r'^follow/$',views.follow),
    url(r'^getFansList/$',views.getFansList),
    url(r'^getFollowList/$',views.getFollowList),
    url(r'^getMyWbList/$',views.getMyWbList),
    url(r'^getAllWbList/$',views.getAllWbList),
    url(r'^unfollow/$',views.unfollow),
    url(r'^logout/$',views.logout),
    url(r'^sendP/$',views.sendP),
    url(r'^sendWb/$',views.sendWb),
    url(r'^$',views.logIn),
]
