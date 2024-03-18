from typing import Any
from django.contrib import admin
from .forms import PackForm

# Register your models here.
from .models import Pack, Sample

import logging

logger = logging.getLogger(__name__)

class SampleAdmin(admin.TabularInline):
    model = Sample

@admin.register(Pack)
class PackAdmin(admin.ModelAdmin):
    form = PackForm

    def save_model(self, request: Any, obj: Any, form: Any, change: Any) -> None:
        super().save_model(request, obj, form, change)
        files = request.FILES.getlist('samples')
        for f in files:
            instance = Sample(file=f, pack=obj)
            instance.save()
        

@admin.register(Sample)
class SampleAdmin(admin.ModelAdmin):
    pass