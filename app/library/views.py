from typing import Any
from django.db.models.query import QuerySet
from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import FileFieldForm
from .models import Sample, Pack
from django.views.generic.list import ListView
from django.conf import settings
from django.shortcuts import get_object_or_404

import logging

logger = logging.getLogger(__name__)

def upload_file(request):
    if request.method == "POST":
        form = FileFieldForm(request.POST, request.FILES)
        if form.is_valid():
            # file is saved
            form.save()
            return HttpResponseRedirect("/success/url/")
    else:
        form = FileFieldForm()
    return render(request, "upload.html", {"form": form})

class SampleList(ListView):
    paginate_by = 20
    model = Sample
                  
    def get_queryset(self) -> QuerySet[Any]:
        if "pack" in self.kwargs:
            self.pack = get_object_or_404(Pack, name=self.kwargs["pack"] )
            return Sample.objects.filter(pack=self.pack)
        if "category" in self.kwargs:
            return Sample.objects.filter(category=self.kwargs["category"])
        qs = super().get_queryset()
        category = self.request.GET.get('ord')
        if category is None:
            return qs
        return qs.order_by(category)
        