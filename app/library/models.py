from django.db import models
from django.conf import settings

import logging

logger = logging.getLogger(__name__)
# Create your models here.

def get_pack_types():
    return {i: x for i,x in settings.PACKTYPES}

def get_category_types():
    return {i: x for i,x in settings.CATEGORYTYPES}

def get_save_path(instance, filename):
    return 'uploads/{0}/Sounds/{1}/{2}'.format(instance.pack, instance.category, filename)

def get_img_save_path(instance, filename):
    return 'uploads/{0}/Artworks/{1}'.format(instance.name, filename)

class Pack(models.Model):
    type = models.CharField(max_length=3, choices=get_pack_types)
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    cover = models.ImageField(upload_to=get_img_save_path)

    def __str__(self):
        return f"{self.name}"
    
class Sample(models.Model):
    pack = models.ForeignKey(Pack, on_delete=models.CASCADE,related_name="samples")
    category = models.CharField(max_length=3, choices=get_category_types)
    file = models.FileField(upload_to=get_save_path)

    def __str__(self):
        return f"{self.file}"

