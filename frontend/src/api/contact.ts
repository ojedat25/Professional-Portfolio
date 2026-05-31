import { apiRequest } from "./client";

export type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message: string;
};

export type ContactSuccess = { status: "sent" };

/** POSTs JSON to /api/contact/ (Django + Resend); failures throw ApiError for the form handler. */
export async function submitContact(
  payload: ContactPayload,
): Promise<ContactSuccess> {
  return apiRequest<ContactSuccess>("/contact/", {
    method: "POST",
    body: payload,
  });
}
