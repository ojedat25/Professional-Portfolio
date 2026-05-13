from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from django.conf import settings
# Create your views here.
class AdminModeView(APIView):
    def get(self, request):
        return JsonResponse({"message": "Admin mode is enabled"})

class AdminLoginView(APIView):
    def post(self, request):
        password = request.data.get("password")
        if password == settings.ADMIN_PASSWORD_HASH:
            return JsonResponse({"message": "Admin mode is enabled"})
        else:
            return JsonResponse({"message": "Invalid password"}, status=401)

