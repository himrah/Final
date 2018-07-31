"""fasigner URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
#from fasigner.settings import *
from app.views import *
from django.conf import settings
from rest_framework import routers
from rest_framework.authtoken import views as authtoken_views
from django.conf.urls.static import static
from graphene_django.views import GraphQLView
from schema import *
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_jwt.views import verify_jwt_token
from rest_framework.authtoken.views import obtain_auth_token
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
#import schema

router=routers.DefaultRouter()
router.register('comment',CommentSet),
router.register('user',UserSet),
router.register('upload',ProfilePicUpdate),
router.register('photo',PhotoSet),
router.register('IMG',IMGSet),
router.register('post',PostSet),
router.register('profilepic',ProfilePicUpload)
#router.register('upload',ProfilePicUpdate),
urlpatterns = [
    #graphiql=True,
    #url(r'^graphql', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    url(r'^graphql',csrf_exempt(GraphQLView.as_view(graphiql=True))),
    url(r'^api/',include(router.urls)),

    #url(r'^graphql', PrivateGraphQLView.as_view(graphiql=True)),
    #url(r'^gql', PrivateGraphQLView(GraphQLView.as_view())),    
    url(r'^gql', csrf_exempt(GraphQLView.as_view(graphiql=True))),    
    url(r'abc',PhotoSS.as_view()),

    url(r'^api/',include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^img$',Input,name="input-img"),
    #url(r'^$',Gallery,name='gallery'),
    url(r'^home',home,name='home'),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),    
    #url(r'^',TemplateView.as_view(template_name="index.html"))
#    url(r'^login',Login,name='login'),
#    url(r'^logout',Logout,name='logout'),
#    url(r'^auth',auth,name='auth'),
    
#    url(r'^getcomment/(?P<p_id>.*)/',get_comment,name='getcomment'),
    #url(r'^profile',profile,name='profile'),
#    url(r'^accounts',registration,name='registration'),
#    url(r'^comment/(?P<p_id>.*)/',ajax_comment,name='comment'),
#    url(r'^oauth/', include('social_django.urls', namespace='social')),
#    url(r'^profile/(?P<pk>.*)/',profile,name='profile'),
    #url(r'^profile/$',UpdateProfile,name='updateprofile'),
 #   url(r'^updateprofile/$',UpdateProfile,name='updateprofile'),
#    url(r'^updatepic/$',UpdateProfilePic,name='updateprofilepic'),
    #url(r'^uploading$',uploading,name="img-uploading"),

#url(r'^photos/',static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)),

#static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
#url(r'<username>',csrf_exempt(React),name='react-app')
#url(r'^(?:.*)/?$', base_view), other match
#urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
    #urlpatterns +=[url(r'^$',csrf_exempt(React),name='react-app')]
    #url(r'^.*',csrf_exempt(React),name='react-app')
    urlpatterns += [ url(r'^auth-token/$', obtain_auth_token) ]    
    #urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns +=[url(r'^.*',csrf_exempt(React),name='react-app')]