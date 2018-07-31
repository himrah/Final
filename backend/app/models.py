from django.db import models
from django.contrib.auth.models import User
import os
from datetime import datetime
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys
from django.db.models.signals import post_save
from django.dispatch import receiver
from PIL import Image
#from versatileimagefield.fields import VersatileImageField
from rest_framework.authtoken.models import Token
from django.conf import settings


# Create your models here.

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Profile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    about = models.TextField(blank=True)
    birth_day = models.DateField(null=True,blank=True)
    gender = models.CharField(null=True,blank=True,max_length=10)
    fb = models.CharField(blank=True,max_length=30)
    instagram = models.CharField(blank=True,max_length=30)
    twitter = models.CharField(blank=True,max_length=30)
    website = models.CharField(blank=True,max_length=30)

    def __str__(self):
        return str(self.user)

class IMG(models.Model):
    profile = models.ImageField('Image',upload_to='photos/profile/original')
    th = models.ImageField('Thumb',upload_to='photos/profile/thumbs',null=True,blank=True)
    dd = models.CharField(max_length=20,null=True,blank=True,)
    def save(self,force_insert=False,force_update=False, using=None):
        im = Image.open(self.profile)
        output = BytesIO()
        basewidth = 600
        #img = Image.open('somepic.jpg')
        wpercent = (basewidth/float(im.size[0]))
        hsize = int((float(im.size[1])*float(wpercent)))
        im = im.resize((basewidth,hsize), Image.ANTIALIAS)      
        im = im.convert("RGB")
        im.save(output, format='JPEG', quality=70)
        
        self.th = InMemoryUploadedFile(output,'ImageField', "%s.jpg" %self.profile.name.split('.')[0], 'image/jpeg', sys.getsizeof(output), None)
        super(IMG,self).save()


@receiver(models.signals.post_delete,sender=IMG)
def del_IMG(sender,instance,**kwargs):
    instance.profile.delete_all_created_images()
    instance.profile.delete(save=False)



class Profile_pic(models.Model):
    owner = models.OneToOneField(User,on_delete=models.CASCADE,blank=True, related_name="profile_pic")
    profile_original = models.ImageField(upload_to='photos/profile/original',null=True,blank=True)
    profile_thumbs = models.ImageField(upload_to='photos/profile/thumbs',null=True,blank=True)
    profile_photo = models.ImageField(upload_to='photos/profile/photo',null=True,blank=True)
    def __str__(self):
        return str(self.owner)
    def save(self,force_insert=False,force_update=False, using=None):
        im = Image.open(self.profile_original)
        output = BytesIO()
        basewidth = 600
        #img = Image.open('somepic.jpg')
        wpercent = (basewidth/float(im.size[0]))
        hsize = int((float(im.size[1])*float(wpercent)))
        im = im.resize((basewidth,hsize), Image.ANTIALIAS)      
        im = im.convert("RGB")
        im.save(output, format='JPEG', quality=70)
        
        self.profile_photo = InMemoryUploadedFile(output,'ImageField', "%s.jpg" %self.profile_original.name.split('.')[0], 'image/jpeg', sys.getsizeof(output), None)
        
        weight,height=im.size
        if weight > height:
            r=(weight-height)/2
            imc=im.crop((r,0,height+r,height))
        else:
            r=(height-weight)/2
            imc=im.crop((0,r,weight,height-r))  
        imc = imc.convert("RGB")      
        imc=imc.resize((300,300),Image.ANTIALIAS)
        output = BytesIO()
        imc.save(output, format='JPEG', quality=70)
        output.seek(0)
        self.profile_thumbs = InMemoryUploadedFile(output,'ImageField', "%s.jpg" %self.profile_original.name.split('.')[0], 'image/jpeg', sys.getsizeof(output), None)
        super(Profile_pic,self).save()

def _delete_file(path):
    # Deletes file from filesystem.
    if os.path.isfile(path):
        os.remove(path)


@receiver(models.signals.post_delete,sender=Profile_pic)
def del_IMG(sender,instance,**kwargs):
    print(instance.profile_original.path)
    _delete_file(instance.profile_original.path)
    _delete_file(instance.profile_thumbs.path)
    _delete_file(instance.profile_photo.path)
    


    """
def del_IMG(sender,instance,**kwargs):
    instance.profile_original.delete_all_created_images()
    instance.profile_original.delete(save=False)
"""

class Photos(models.Model):
    caption = models.TextField(null=True)
    original_photo=models.ImageField(upload_to='photos/original')
    thumbs = models.ImageField(upload_to='photos/thumbs/')
    photo = models.ImageField(upload_to='photos/photo')
    created_date=models.DateTimeField(default=datetime.now,null=True)
    upload_by=models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name="photos")
    def __str__(self):
        return str(self.upload_by)+' : '+str(self.created_date)
    def save(self,force_insert=False,force_update=False, using=None):
        #super(Photos,self).save()
        im = Image.open(self.original_photo)
        output = BytesIO()
        #basewidth = 600
        if im.size[0]<=700:
            basewidth = im.size[0]
        else:
            basewidth = 700   

        #img = Image.open('somepic.jpg')
        wpercent = (basewidth/float(im.size[0]))
        hsize = int((float(im.size[1])*float(wpercent)))
        im = im.resize((basewidth,hsize), Image.ANTIALIAS)      
        im = im.convert("RGB")
        im.save(output, format='JPEG', quality=70)
        
        self.photo = InMemoryUploadedFile(output,'ImageField', "%s.jpg" %self.original_photo.name.split('.')[0], 'image/jpeg', sys.getsizeof(output), None)
        weight,height=im.size
        if weight > height:
            r=(weight-height)/2
            imc=im.crop((r,0,height+r,height))
        else:
            r=(height-weight)/2
            imc=im.crop((0,r,weight,height-r))
        imc = imc.convert("RGB")      
        imc=imc.resize((300,300),Image.ANTIALIAS)
        output = BytesIO()
        imc.save(output, format='JPEG', quality=70)
        output.seek(0)
        self.thumbs = InMemoryUploadedFile(output,'ImageField', "%s.jpg" %self.original_photo.name.split('.')[0], 'image/jpeg', sys.getsizeof(output), None)
        super(Photos,self).save()

@receiver(models.signals.post_save ,sender=Photos)
def create_ph(sender,instance,**kwargs):
    instance.upload_by_id=4
    #instance.save()


class Comments(models.Model):
    photo_id = models.ForeignKey(Photos, on_delete=models.CASCADE,null=True,related_name='comments')
    comment_time = models.DateTimeField(default=datetime.now,null=True)
    comment_by = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    comment = models.TextField()
    def __str__(self):
        return str(self.photo_id)+' : '+str(self.comment_by)

class ReplyComments(models.Model):
    comment_id = models.ForeignKey(Comments,on_delete=models.CASCADE,null=True,related_name='replycomment')
    comment_time = models.DateTimeField(default=datetime.now,null=True)
    comment_by = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    comment = models.TextField()
    def __str__(self):
        return str(self.comment)
    

class Connection(models.Model):
    follower = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name="follower")
    following = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name="following")
    def __str__(self):
        return str(self.follower)

class Interest(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True,related_name="interest")
    name=models.CharField(max_length=20,null=True)
    def __str__(self):
        return str(str(self.user)+" : "+str(self.name))

class Views(models.Model):
    photo_id = models.ForeignKey(Photos,on_delete=models.CASCADE,null=True,related_name="views")
    view = models.IntegerField()

class Rating(models.Model):
    photo_id = models.ForeignKey(Photos,on_delete=models.CASCADE,null=True,related_name="rating")
    rate = models.DecimalField(decimal_places=1,max_digits=5)