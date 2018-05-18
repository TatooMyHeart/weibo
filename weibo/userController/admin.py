from django.contrib import admin

# Register your models here.

from userController import models

admin.site.register(models.User)
admin.site.register(models.Comment)
admin.site.register(models.WB)
admin.site.register(models.Follow)
