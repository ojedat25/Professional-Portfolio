import requests
from django.core.cache import cache

GITHUB_REPOS_CACHE_TTL = 60 * 60


def get_github_repos(username):
    cache_key = f"github_repos:{username}" # Cache key for the GitHub repos
    cached = cache.get(cache_key) # Get the cached repos
    if cached is not None:
        return cached # Return the cached repos

    try:
        response = requests.get(f"https://api.github.com/users/{username}/repos") # Get the GitHub repos
    except requests.RequestException as e:
        return {"error": "Failed to fetch repositories", "message": str(e)} # Return an error if the request fails

    if response.status_code != 200:
        return {
            "error": f"Failed to fetch repositories: {response.status_code}",
            "message": response.text,
        } # Return an error if the request fails

    data = response.json() # Get the GitHub repos
    filtered_data = filter_github_repos(data) # Filter the GitHub repos
    cache.set(cache_key, filtered_data, GITHUB_REPOS_CACHE_TTL) # Cache the filtered repos
    return filtered_data # Return the filtered repos

def filter_github_repos(repos):
    # Filter repos that contain "portfolio" in the topics and replace hyphens with spaces in the name
    filtered_repos = [repo for repo in repos if "portfolio" in repo.get("topics", [])] # Filter repos that contain "portfolio" in the topics
    for repo in filtered_repos:
        repo["topics"].remove("portfolio") # Remove "portfolio" from the filtered repostopics
        repo_name = repo.get("name", "") # Get the name of the repo
        repo["name"] = repo_name.replace("-", " ") # Replace hyphens with spaces in the name
    return filtered_repos
