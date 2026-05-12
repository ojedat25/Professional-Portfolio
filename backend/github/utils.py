import requests
from django.core.cache import cache

GITHUB_REPOS_CACHE_TTL = 60 * 60


def get_github_repos(username):
    cache_key = f"github_repos:{username}"
    cached = cache.get(cache_key)
    if cached is not None:
        return cached

    try:
        response = requests.get(f"https://api.github.com/users/{username}/repos")
    except requests.RequestException as e:
        return {"error": "Failed to fetch repositories", "message": str(e)}

    if response.status_code != 200:
        return {
            "error": f"Failed to fetch repositories: {response.status_code}",
            "message": response.text,
        }

    data = response.json()
    filtered_data = filter_github_repos(data)
    cache.set(cache_key, filtered_data, GITHUB_REPOS_CACHE_TTL)
    return filtered_data

def filter_github_repos(repos):
    filtered_repos = [repo for repo in repos if "portfolio" in repo.get("topics", [])]
    for repo in filtered_repos:
        repo_tags = repo.get("topics", [])
        if "portfolio" in repo_tags:
            repo["topics"].remove("portfolio")
    return filtered_repos
