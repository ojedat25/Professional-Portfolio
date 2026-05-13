import requests
from django.conf import settings
from django.core.cache import cache

GITHUB_REPOS_CACHE_TTL = 60 * 60
GITHUB_API_BASE = "https://api.github.com"
GITHUB_HEADERS_BASE = {"Accept": "application/vnd.github+json"}


def get_github_repos(username):
    token = settings.GITHUB_TOKEN
    if token:
        cache_key = "github_repos:auth"
        url = f"{GITHUB_API_BASE}/user/repos"
        headers = {**GITHUB_HEADERS_BASE, "Authorization": f"Bearer {token}"}
    else:
        cache_key = f"github_repos:{username}"
        url = f"{GITHUB_API_BASE}/users/{username}/repos"
        headers = dict(GITHUB_HEADERS_BASE)

    cached = cache.get(cache_key)
    if cached is not None:
        return cached

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.exceptions.Timeout:
        return {
            "error": "GitHub request timed out",
            "message": "The request to GitHub exceeded the time limit.",
            "http_status": 504,
        }
    except requests.exceptions.HTTPError as e:
        resp = e.response
        status = resp.status_code if resp is not None else 502
        body = (resp.text[:500] if resp is not None else str(e)).strip()
        return {
            "error": "Failed to fetch repositories",
            "message": body or str(e),
            "http_status": status,
        }
    except requests.RequestException as e:
        return {
            "error": "Failed to fetch repositories",
            "message": str(e),
            "http_status": 502,
        }

    data = response.json()
    filtered_data = filter_github_repos(data)
    cache.set(cache_key, filtered_data, GITHUB_REPOS_CACHE_TTL)
    return filtered_data


def filter_github_repos(repos):
    filtered_repos = [repo for repo in repos if "portfolio" in repo.get("topics", [])]
    for repo in filtered_repos:
        repo["topics"].remove("portfolio")
        repo_name = repo.get("name", "")
        repo["name"] = repo_name.replace("-", " ")
    return filtered_repos
