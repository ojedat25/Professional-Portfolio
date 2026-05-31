import { apiRequest } from "./client";

export type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message: string;
};

export type ContactSuccess = { status: "sent" };

/** Submit the portfolio contact form to the Django backend. */
export async function submitContact(
  payload: ContactPayload,
): Promise<ContactSuccess> {
  return apiRequest<ContactSuccess>("/contact/", {
    method: "POST",
    body: payload,
  });
}
