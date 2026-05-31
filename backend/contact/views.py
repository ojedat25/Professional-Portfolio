import html
import json

import resend
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from portfolio.rate_limit import rate_limit

CONTACT_RATE_LIMIT_MAX = 5
CONTACT_RATE_LIMIT_WINDOW = 3600


def _parse_json_body(request):
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return None
    if not isinstance(payload, dict):
        return None
    return payload


def _strip_optional_string(payload, field_name):
    value = payload.get(field_name)
    if value is None:
        return ""
    if not isinstance(value, str):
        return None
    return value.strip()


@csrf_exempt
@require_POST
@rate_limit(
    key_prefix="contact",
    max_requests=CONTACT_RATE_LIMIT_MAX,
    window_seconds=CONTACT_RATE_LIMIT_WINDOW,
    error_message="Too many submissions. Please try again later.",
)
def submit_contact(request):
    payload = _parse_json_body(request)
    if payload is None:
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    message = _strip_optional_string(payload, "message")
    if message is None or not message:
        return JsonResponse({"error": "Message is required"}, status=400)
    if len(message) > 10000:
        return JsonResponse({"error": "Message is too long (max 10,000 characters)"}, status=400)

    email = _strip_optional_string(payload, "email")
    if email is None:
        return JsonResponse({"error": "Invalid email field"}, status=400)

    phone = _strip_optional_string(payload, "phone")
    if phone is None:
        return JsonResponse({"error": "Invalid phone field"}, status=400)

    name = _strip_optional_string(payload, "name")
    if name is None:
        return JsonResponse({"error": "Invalid name field"}, status=400)

    if not email and not phone:
        return JsonResponse(
            {"error": "Provide an email or phone number"},
            status=400,
        )

    if not settings.RESEND_API_KEY or not settings.RESEND_FROM_EMAIL or not settings.CONTACT_RECIPIENT_EMAIL:
        return JsonResponse(
            {"error": "Email service is not configured"},
            status=502,
        )

    email_line = html.escape(email or "(not provided)")
    phone_line = html.escape(phone or "(not provided)")
    message_line = html.escape(message)
    html_body = (
        "<p><strong>Email:</strong> "
        f"{email_line}</p>"
        "<p><strong>Phone:</strong> "
        f"{phone_line}</p>"
        "<p><strong>Message:</strong></p>"
        f"<p style=\"white-space: pre-wrap;\">{message_line}</p>"
    )

    resend.api_key = settings.RESEND_API_KEY

    safe_name = name.replace("\r", "").replace("\n", "")
    if safe_name:
        from_field = f"{safe_name} via Portfolio <{settings.RESEND_FROM_EMAIL}>"
    else:
        from_field = settings.RESEND_FROM_EMAIL

    email_params = {
        "from": from_field,
        "to": [settings.CONTACT_RECIPIENT_EMAIL],
        "subject": "Portfolio contact form",
        "html": html_body,
    }
    if email:
        email_params["reply_to"] = email

    try:
        resend.Emails.send(email_params)
    except Exception:
        return JsonResponse(
            {"error": "Failed to send message. Please try again later."},
            status=502,
        )

    return JsonResponse({"status": "sent"})
