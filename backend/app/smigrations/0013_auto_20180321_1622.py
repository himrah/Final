# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-03-21 16:22
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_auto_20180321_0234'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comments',
            name='c_image',
        ),
        migrations.AddField(
            model_name='comments',
            name='photo_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='app.Photos'),
        ),
        migrations.AlterField(
            model_name='interest',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='interest', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='rating',
            name='r_image',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='rating', to='app.Photos'),
        ),
        migrations.AlterField(
            model_name='views',
            name='v_image',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='views', to='app.Photos'),
        ),
    ]
