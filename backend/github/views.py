from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .utils import get_github_repos
from .serializers import GitHubRepoSerializer


@require_GET
def get_repos(request):
    # Fetches repo list from GitHub (authenticated or public, see utils).
    github_result = get_github_repos("ojedat25")

    # Errors come back as a dict with "error" and optional internal "http_status".
    if isinstance(github_result, dict) and "error" in github_result:
        # Prefer the status from utils (e.g. 504 timeout); default to 502 Bad Gateway.
        response_status_code = int(github_result.get("http_status", 502))
        # Do not expose "http_status" in the JSON body—only error fields for the client.
        response_body = {
            field_name: field_value
            for field_name, field_value in github_result.items()
            if field_name != "http_status"
        }
        return JsonResponse(response_body, status=response_status_code)

    # Success: normalize each repo for the frontend serializer.
    serializer = GitHubRepoSerializer(github_result, many=True)
    return JsonResponse(serializer.data, safe=False)
