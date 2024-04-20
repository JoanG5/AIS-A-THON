from django.shortcuts import render
from django.urls import get_resolver

from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def health(request):
    return Response("Server is up and runnning!")


