

# Create your views here.
# calendar/views.py
from django.shortcuts import render

def calendar_page(request):
    return render(request, 'index.html')
