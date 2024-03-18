from django.db import models
from django.conf import settings


# Create your models here.

def get_pack_types():
    return {i: x for i,x in settings.PACKTYPES}

class Pack(models.Model):
    type = models.CharField(max_length=3, choices=get_pack_types)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"
    
class Sample(models.Model):
    file = models.FileField(upload_to='uploads/')
    pack = models.ForeignKey(Pack, on_delete=models.CASCADE,related_name="samples")

