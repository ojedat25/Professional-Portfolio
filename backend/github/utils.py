from django.http import JsonResponse
import requests

def get_github_repos(username):
    try:
        response = requests.get(f"https://api.github.com/users/{username}/repos")
        data = response.json()
        if response.status_code == 200:
            return data
        else:
            return {"error": f"Failed to fetch repositories: {response.status_code}", "message": response.text}
    except Exception as e:
        return {"error": f"Failed to fetch repositories: {e}", "message": str(e)}