import functools

from django.core.cache import cache
from django.http import JsonResponse


def get_client_ip(request) -> str:
    # Render sets CF-Connecting-IP at the edge; X-Forwarded-For[0] is client-spoofable.
    cf_ip = request.META.get("HTTP_CF_CONNECTING_IP")
    if cf_ip:
        return cf_ip.strip()

    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded:
        return forwarded.split(",")[0].strip()

    return request.META.get("REMOTE_ADDR") or ""


def is_rate_limited(
    request,
    *,
    key_prefix: str,
    max_requests: int,
    window_seconds: int,
) -> bool:
    ip = get_client_ip(request)
    if not ip:
        return False

    cache_key = f"rate:{key_prefix}:{ip}"
    # add sets the window TTL on first hit; incr counts later hits in the same window.
    if cache.add(cache_key, 1, timeout=window_seconds):
        count = 1
    else:
        try:
            count = cache.incr(cache_key)
        except ValueError:
            # Key can expire between add and incr under concurrent requests.
            cache.add(cache_key, 1, timeout=window_seconds)
            count = 1

    return count > max_requests


def rate_limit(
    *,
    key_prefix: str,
    max_requests: int,
    window_seconds: int,
    error_message: str = "Too many requests. Please try again later.",
):
    # Shared 429 JSON wrapper so views declare limits via constants, not boilerplate.
    def decorator(view_func):
        @functools.wraps(view_func)
        def wrapper(request, *args, **kwargs):
            if is_rate_limited(
                request,
                key_prefix=key_prefix,
                max_requests=max_requests,
                window_seconds=window_seconds,
            ):
                return JsonResponse({"error": error_message}, status=429)
            return view_func(request, *args, **kwargs)

        return wrapper

    return decorator
