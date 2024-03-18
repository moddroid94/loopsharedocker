from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import FileFieldForm

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
