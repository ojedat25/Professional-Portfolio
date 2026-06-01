import { useState, type SubmitEvent, type SVGProps } from "react";
import { Mail, Phone } from "lucide-react";
import { submitContact } from "../api/contact";
import { ApiError } from "../api/errors";
import { siteContent } from "../data/siteContent";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-().]*\d{7,}[\d\s\-().]*$/;

type FieldErrors = {
  email?: string;
  phone?: string;
  message?: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

type BrandIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  strokeWidth?: number;
};

function GithubIcon({
  size = 20,
  strokeWidth = 2,
  ...props
}: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 19c-4.5 1.5-4.5-2.5-6-3m12 6v-3.5c0-1 .2-1.8.7-2.4-2.3-.3-4.7-1.1-4.7-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.8 5 .6.5.8 1.3.8 2.6V22"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedinIcon({
  size = 20,
  strokeWidth = 2,
  ...props
}: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v2a4 4 0 0 1 2-3Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 9h4v12H2z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4a2 2 0 1 0 0 4a2 2 0 0 0 0-4Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  return err.status === 429
    ? "Too many submissions. Please try again later."
    : "Something went wrong. Please try again.";
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");
  const { ref: revealRef, isVisible } = useRevealOnScroll<HTMLDivElement>();

  const telHref = `tel:${siteContent.phone.replace(/[^\d+]/g, "")}`;

  async function handleSubmit(formEvent: SubmitEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    setErrors({});
    setSubmitError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();
    const nextErrors: FieldErrors = {};

    if (!trimmedEmail && !trimmedPhone) {
      // At least one contact field required so there is a way to reply; each field optional on its own.
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
        name: trimmedName,
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
    <div
      ref={revealRef}
      className={`contact reveal ${isVisible ? "is-visible" : ""}`}
    >
      <div className="editor editor--section">
        <div className="editor__bar">
          <div className="editor__dots" aria-hidden="true">
            <span className="editor__dot editor__dot--red" />
            <span className="editor__dot editor__dot--yellow" />
            <span className="editor__dot editor__dot--green" />
          </div>
          <div className="editor__filename">Contact.tsx</div>
        </div>
        <div className="editor__body">
          <p id="contact-label" className="comment">
            Contact
          </p>
          <div className="contact__grid">
            <div className="contact__form-col">
              {submitState === "success" ? (
                /* Form swaps for confirmation on success; fields stay in state but form unmounts (no resubmit). */
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
                  <form
                    className="contact__form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* noValidate: browser validation off; messages controlled in submit handler. */}
                    <div className="contact__field">
                      <label className="contact__label" htmlFor="contact-name">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        className="contact__input"
                        type="text"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(changeEvent) =>
                          setName(changeEvent.target.value)
                        }
                        disabled={submitState === "submitting"}
                      />
                    </div>
                    <div className="contact__field">
                      <label className="contact__label" htmlFor="contact-email">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        className="contact__input"
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="you@example.com"
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
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        placeholder="(555) 123-4567"
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
                      <label
                        className="contact__label"
                        htmlFor="contact-message"
                      >
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
                        <p
                          id="contact-message-error"
                          className="contact__error"
                        >
                          {errors.message}
                        </p>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="button button--primary"
                      disabled={submitState === "submitting"}
                    >
                      {submitState === "submitting"
                        ? "Sending…"
                        : "Send message"}
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
                  <LinkedinIcon className="contact__link-icon" {...iconProps} />
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
                  <GithubIcon className="contact__link-icon" {...iconProps} />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
