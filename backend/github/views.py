from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .utils import get_github_repos
from .serializers import GitHubRepoSerializer


@require_GET
def get_repos(request):
    data = get_github_repos("ojedat25")
    if isinstance(data, dict) and "error" in data:
        return JsonResponse(data, status=502)

    serializer = GitHubRepoSerializer(data, many=True)
    return JsonResponse(serializer.data, safe=False)
