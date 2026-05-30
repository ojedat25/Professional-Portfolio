import { useState, type SubmitEvent } from "react";
import { ExternalLink, GitBranch, Mail, Phone } from "lucide-react";
import { submitContact } from "../api/contact";
import { ApiError } from "../api/errors";
import { siteContent } from "../data/siteContent";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-().]*\d{7,}[\d\s\-().]*$/;

type FieldErrors = {
  email?: string;
  phone?: string;
  message?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

function extractApiErrorMessage(err: ApiError): string {
  const body = err.body;
  if (
    body &&
    typeof body === "object" &&
    "error" in body &&
    typeof (body as { error: unknown }).error === "string"
  ) {
    return (body as { error: string }).error;
  }
  return "Something went wrong. Please try again.";
}

export default function Contact() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");

  const telHref = `tel:${siteContent.phone.replace(/\s/g, "")}`;

  async function handleSubmit(formEvent: SubmitEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setErrors({});
    setSubmitError("");

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();
    const nextErrors: FieldErrors = {};

    if (!trimmedEmail && !trimmedPhone) {
      const contactHint = "Provide an email or phone number";
      nextErrors.email = contactHint;
      nextErrors.phone = contactHint;
    }

    if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (trimmedPhone && !PHONE_REGEX.test(trimmedPhone)) {
      nextErrors.phone = "Enter a valid phone number";
    }

    if (!trimmedMessage) {
      nextErrors.message = "Message is required.";
    } else if (trimmedMessage.length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitState("submitting");

    try {
      await submitContact({
        message: trimmedMessage,
        ...(trimmedEmail ? { email: trimmedEmail } : {}),
        ...(trimmedPhone ? { phone: trimmedPhone } : {}),
      });
      setSubmitState("success");
    } catch (caught) {
      setSubmitState("error");
      if (caught instanceof ApiError) {
        setSubmitError(extractApiErrorMessage(caught));
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    }
  }

  const iconProps = { size: 20, strokeWidth: 2, "aria-hidden": true as const };

  return (
    <div className="contact">
      <p id="contact-label" className="section-label">
        Contact
      </p>
      <div className="contact__grid">
        <div className="contact__form-col">
          {submitState === "success" ? (
            <div className="contact__success" role="status">
              <p className="contact__success-heading">Message sent</p>
              <p className="contact__success-text">
                Thanks for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <>
              {submitState === "error" && submitError ? (
                <p className="contact__submit-error" role="alert">
                  {submitError}
                </p>
              ) : null}
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    className="contact__input"
                    type="text"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(changeEvent) =>
                      setEmail(changeEvent.target.value)
                    }
                    disabled={submitState === "submitting"}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className="contact__error">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-phone">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    className="contact__input"
                    type="text"
                    name="phone"
                    autoComplete="tel"
                    value={phone}
                    onChange={(changeEvent) =>
                      setPhone(changeEvent.target.value)
                    }
                    disabled={submitState === "submitting"}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={
                      errors.phone ? "contact-phone-error" : undefined
                    }
                  />
                  {errors.phone ? (
                    <p id="contact-phone-error" className="contact__error">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>
                <div className="contact__field">
                  <label className="contact__label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="contact__textarea"
                    name="message"
                    rows={5}
                    value={message}
                    onChange={(changeEvent) =>
                      setMessage(changeEvent.target.value)
                    }
                    disabled={submitState === "submitting"}
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                  />
                  {errors.message ? (
                    <p id="contact-message-error" className="contact__error">
                      {errors.message}
                    </p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="button button--primary"
                  disabled={submitState === "submitting"}
                >
                  {submitState === "submitting" ? "Sending…" : "Send message"}
                </button>
              </form>
            </>
          )}
        </div>
        <ul className="contact__links">
          <li>
            <a
              className="contact__link"
              href={`mailto:${siteContent.email}`}
            >
              <Mail className="contact__link-icon" {...iconProps} />
              <span>{siteContent.email}</span>
            </a>
          </li>
          <li>
            <a className="contact__link" href={telHref}>
              <Phone className="contact__link-icon" {...iconProps} />
              <span>{siteContent.phone}</span>
            </a>
          </li>
          <li>
            <a
              className="contact__link"
              href={siteContent.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="contact__link-icon" {...iconProps} />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              className="contact__link"
              href={siteContent.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitBranch className="contact__link-icon" {...iconProps} />
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
