from django.http import JsonResponse
from .utils import get_github_repos
from django.views.decorators.http import require_GET


# Create your views here.
@require_GET
def get_repos(request):
    try:
        data = get_github_repos("ojedat25")
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)