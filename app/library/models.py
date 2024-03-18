from django.db import models
from django.conf import settings

import logging

logger = logging.getLogger(__name__)
# Create your models here.

def get_pack_types():
    return {i: x for i,x in settings.PACKTYPES}

def get_save_path(instance, filename):
    logging.warning(instance.pack)
    return 'uploads/{0}/Sounds/{1}'.format(instance.pack, filename)

class Pack(models.Model):
    type = models.CharField(max_length=3, choices=get_pack_types)
    name = models.CharField(max_length=100)
    cover = models.ImageField(upload_to="uploads/artworks/")

    def __str__(self):
        return f"{self.name}"
    
class Sample(models.Model):
    pack = models.ForeignKey(Pack, on_delete=models.CASCADE,related_name="samples")
    file = models.FileField(upload_to=get_save_path)

    def __str__(self):
        return f"{self.file}"

