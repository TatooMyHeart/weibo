from django.db import models

# Create your models here.
class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    fansnum = models.IntegerField(default=0)
    follownum = models.IntegerField(default=0)
    WBnum = models.IntegerField(default=0)

    def toJson(temp):
        result={}
        result['id']=temp.id
        result['username']=temp.username
        result['password']=""
        result['fansnum']=temp.fansnum
        result['follownum']=temp.follownum
        result['WBnum']=temp.WBnum
        return result


class WB(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=255)
    time = models.DateField(auto_now_add=True)
    userid = models.IntegerField(default=0)
    plnum = models.IntegerField(default=0)

    def toJson(temp):
        result={}
        result['id']=temp.id
        result['content']=temp.content
        result['time']=temp.time.strftime("%Y-%m-%d")
        result['userid']=temp.userid
        result['plnum']=temp.plnum
        return result
    def listToJson(temp):
        result = {}
        result['id'] = temp.id
        result['content'] = temp.content
        result['time'] = temp.time.strftime("%Y-%m-%d")
        result['userid'] = temp.userid
        result['plnum'] = temp.plnum
        result['isfollow']=0
        return result

class Follow(models.Model):
    id = models.AutoField(primary_key=True)
    userId = models.IntegerField(default=0)
    followId = models.IntegerField(default=0)

    def toJson(temp):
        result={}
        result['id']=temp.id
        result['userId']=temp.userId
        result['followId']=temp.followId
        return result



class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.CharField(max_length=255)
    time = models.DateField(auto_now_add=True)
    WBid = models.IntegerField(default=0)
    userid = models.IntegerField(default=0)

    def toJson(temp):
        result={}
        result['id']=temp.id
        result['content']=temp.content
        result['time']=temp.time.strftime("%Y-%m-%d")
        result['WBid']=temp.WBid
        result['userid']=temp.userid
        return result

