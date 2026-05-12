from rest_framework import serializers


class GitHubRepoSerializer(serializers.Serializer):
    """Slim, frontend-friendly shape for a GitHub repo from /users/{user}/repos."""

    id = serializers.CharField(source="name")
    title = serializers.CharField(source="name")
    description = serializers.CharField(allow_null=True, allow_blank=True)
    tags = serializers.ListField(
        source="topics",
        child=serializers.CharField(),
        required=False,
        default=list,
    )
    href = serializers.URLField(source="html_url")
    stars = serializers.IntegerField(source="stargazers_count")
    language = serializers.CharField(allow_null=True, required=False)
    homepage = serializers.CharField(allow_null=True, allow_blank=True, required=False)
    updated_at = serializers.DateTimeField()
