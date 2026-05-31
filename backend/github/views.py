from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .utils import get_github_repos
from .serializers import GitHubRepoSerializer


@require_GET
def get_repos(request):
    github_result = get_github_repos("ojedat25")

    if isinstance(github_result, dict) and "error" in github_result:
        # utils attaches http_status for upstream failures; body stays {"error", "message"} only.
        response_status_code = int(github_result.get("http_status", 502))
        response_body = {
            field_name: field_value
            for field_name, field_value in github_result.items()
            if field_name != "http_status"
        }
        return JsonResponse(response_body, status=response_status_code)

    # Success path: normalized repo array matches frontend GithubRepo type.
    serializer = GitHubRepoSerializer(github_result, many=True)
    return JsonResponse(serializer.data, safe=False)
