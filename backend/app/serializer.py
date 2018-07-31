from rest_framework import serializers
from app.models import *
from django.contrib.auth.models import *
from versatileimagefield.serializers import VersatileImageFieldSerializer
from rest_framework.reverse import  reverse


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name')

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comments
        fields = ('id','comment_time','comment_by','comment','photo_id')        

#main post
class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Photos
        fields = ('id','original_photo','photo','thumbs','upload_by')
        read_only_fields = ('photo','thumbs','upload_by')



class PhotoSerializer(serializers.HyperlinkedModelSerializer):
    comments_set = CommentSerializer(required=False,many=True,read_only=True)
    class Meta:
        model = Photos
        fields = ('id','original_photo','thumbs','photo','created_date','upload_by','comments_set')
        read_only_fields = ('th','thumbs','upload_by','comment_set','photo','created_date')

class ProfilePic(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Profile_pic
        fields = ('id','profile_original','profile_thumbs','profile_photo')
        read_only_fields = ('profile_thumbs','profile_photo')

class ProfileSerializer(serializers.HyperlinkedModelSerializer):
    #user = UserSerializer(required=False)
    class Meta:
        model = Profile
        fields = ('id','user_id','about','birth_day')

class ProfilePicSer(serializers.HyperlinkedModelSerializer):
    profile_original = VersatileImageFieldSerializer(
        sizes=[
            ('full_size', 'url'),
            ('thumbnail', 'thumbnail__600x600'),
            ('medium_square_crop', 'crop__400x400'),
            ('small_square_crop', 'crop__50x50')    
        ]
    )
    class Meta:
        model = Profile_pic
        fields = ('id','profile_original')

#    def create(self,validate_data):
#        pic_data = validated_data.pop('album_musician')


class ImageSer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IMG
        fields = ('id','profile','th','dd')
        read_only_fields = ('th','dd')
        
        #serializer.save()
