import simplejson
from userController import models
from django.core import serializers
import json
import hashlib



# Create your views here.
from django.http import HttpResponse,HttpRequest


def logIn(request):

    userInfo = simplejson.loads(request.body)
    username=userInfo['username']
    password=userInfo['password']
    try:
        user=models.User.objects.get(username=username)
        if user.username == username:
            password=password.encode("utf-8")
            encrypt=hashlib.md5()
            encrypt.update(password)
            ps=encrypt.hexdigest()
            print(ps)
            if user.password==ps:
                request.session['userid'] = user.id
                return HttpResponse('success')
            else:
                return HttpResponse('password_error')
        else:
            return HttpResponse('username_error')
    except Exception as e:
        print(e)
        return HttpResponse('error')




def register(request):
    userInfo = simplejson.loads(request.body)
    username=userInfo['username']
    password=userInfo['password']
    try:
        userf=models.User.objects.get(username=username)
        #if userf[0].username is not None:
        return HttpResponse("username exist")
    except Exception as e:
        print(e)
        #return HttpResponse('username exist')


    password=password.encode("utf-8")
    encrypt=hashlib.md5()
    encrypt.update(password)
    ps=encrypt.hexdigest()

    try:
        user=models.User(username=username,password=ps)
        print(ps)
        user.save()
        return HttpResponse('success')
    except Exception as e:
        print(e)
        return HttpResponse('error')




def getInfo(request):
    b=auth(request)
    if not b:
        return HttpResponse('not_logIn')
    userid=request.session['userid']
    try:
        name=models.User.objects.get(id=userid)
        name=models.User.toJson(name)
        print(name)
        data=json.dumps(name,ensure_ascii=False)
        return HttpResponse(data)
    except Exception as e:
        print(e)
        return HttpResponse('error')


def sendWb(request):
    b = auth(request)
    if not b:
        return HttpResponse('not_logIn')
    try:
        content = request.POST['content']
        userid = request.session['userid']
        print(userid,content)
        wb=models.WB(content=content,userid=userid)
        user=models.User.objects.get(id=userid)
        user.WBnum=user.WBnum+1
        wb.save()
        user.save()
        return HttpResponse('success')
    except Exception as e:
        print(e)
        return HttpResponse('error')

def sendP(request):
    b = auth(request)
    if not b:
        return HttpResponse('not_logIn')
    try:
        commit = simplejson.loads(request.body)
        userid = request.session['userid']
        pl=models.Comment(content=commit['content'],WBid=commit['wbid'],userid=userid)
        wb=models.WB.objects.get(id=commit['wbid'])
        wb.plnum=wb.plnum+1
        pl.save()
        wb.save()
        return HttpResponse('success')
    except Exception as e:
        print(e)
        return HttpResponse('error')



def follow(request):
    b = auth(request)
    if not b:
        return HttpResponse('not_logIn')
    followerid=request.GET.get("fid")
    userid=request.session['userid']
    try:
        follow=models.Follow(followId=followerid,userId=userid)
        user=models.User.objects.get(id=userid)
        user.follownum=user.follownum+1
        follower=models.User.objects.get(id=followerid)
        follower.fansnum=follower.fansnum+1
        follow.save()
        user.save()
        follower.save()
        return HttpResponse('success')
    except Exception as e:
        print(e)
        return HttpResponse('error')

def unfollow(request):
    b = auth(request)
    if not b:
        return HttpResponse('not_logIn')
    followerid = request.GET.get("fid")
    userid = request.session['userid']
    try:
        follow = models.Follow.objects.filter(followId=followerid,userId=userid)
        user = models.User.objects.get(id=userid)
        user.follownum = user.follownum - 1
        follower = models.User.objects.get(id=followerid)
        follower.fansnum = follower.fansnum - 1
        follow.delete()
        user.save()
        follower.save()
        return HttpResponse('success')
    except Exception as e:
        print(e)
        return HttpResponse('error')

def getFollowList(request):
    b = auth(request)
    if not b:
        return HttpResponse('not_logIn')
    userid=request.session['userid']
    try:
        followers=models.Follow.objects.filter(userId=userid)
        followlist=[]
        for fid in followers:
            follower=models.User.objects.get(id=fid.followId)
            follower=models.User.toJson(follower)
            followlist.append(follower)
        result=json.dumps(followlist,ensure_ascii=False)
        return HttpResponse(result)
    except Exception as e:
        print(e)
        return HttpResponse('error')

def getFansList(request):
    b = auth(request)
    if not b:
        return HttpResponse('not_logIn')
    userid = request.session['userid']
    try:
        fans= models.Follow.objects.filter(followId=userid)
        result=[]
        for f in fans:
            fan=models.User.objects.get(id=f.userId)
            print(fan)
            fan=models.User.toJson(fan)
            result.append(fan)

        print(result)
        data=json.dumps(result,ensure_ascii=False)
        return HttpResponse(data)
    except Exception as e:
        print(e)
        return HttpResponse('error')

def getMyWbList(request):
    b = auth(request)
    if not b:
        return HttpResponse('not_logIn')
    userid = request.session['userid']
    try:
        wbs=models.WB.objects.filter(userid=userid)
        result=[]
        for w in wbs:
            pls=models.Comment.objects.filter(WBid=w.id)
            pl=[]
            for p in pls:
                pusername = models.User.objects.get(id=p.userid)
                p=models.Comment.toJson(p)
                p['username']=pusername.username
                pl.append(p)
            username=models.User.objects.get(id=userid)
            w=models.WB.toJson(w)
            w['username']=username.username
            w['comment']=pl
            result.append(w)
        data=json.dumps(result,ensure_ascii=False)
        return HttpResponse(data)
    except Exception as e:
        print(e)
        return HttpResponse('error')

def getAllWbList(request):
    try:
        b=auth(request)
        if not b:
            return HttpResponse('not_logIn')
        userid=request.session['userid']
        wbs=models.WB.objects.all()
        result=[]
        followstatus=models.Follow.objects.filter(userId=userid)
        for w in wbs:
            pls = models.Comment.objects.filter(WBid=w.id)
            pl = []
            for p in pls:
                pusername = models.User.objects.get(id=p.userid)
                p = models.Comment.toJson(p)
                p['username']=pusername.username
                pl.append(p)

            username = models.User.objects.get(id=w.userid)
            w=models.WB.listToJson(w)
            w['username']=username.username
            w['comment']=pl
            for f in followstatus:
                if f.followId==w['userid']:
                    w['isfollow']=1
            result.append(w)
        data=json.dumps(result,ensure_ascii=False)
        return HttpResponse(data)
    except Exception as e:
        print(e)
        return HttpResponse('error')

def logout(request):
    b = auth(request)
    if not b:
        return HttpResponse('not_logIn')
    request.session.clear()
    return HttpResponse('success')

def auth(request):
    try:
        userid=request.session['userid']
        return True
    except Exception as e:
        print(e)
        return False
