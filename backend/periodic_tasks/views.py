from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

@require_GET
@method_decorator(csrf_exempt, name="dispatch")
@permission_classes([AllowAny])
def ping(request):
    return JsonResponse({"status": "ok"})
