/**
 * Contact Form Service
 * Handles form submission to external providers (Formspree)
 */

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

/**
 * Email validation regex
 * Accepts all standard email formats including business/company domains
 * Examples: user@company.com, name@business.co.uk, contact@startup.io
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates contact form data
 */
export function validateContactForm(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!data.email || !EMAIL_REGEX.test(data.email.trim())) {
    errors.push("Please enter a valid email address");
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.push("Subject must be at least 3 characters");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Submits contact form data to Formspree
 */
export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  // Validate form data
  const validation = validateContactForm(data);
  if (!validation.valid) {
    return {
      success: false,
      message: "Please correct the following errors:",
      error: validation.errors.join(". "),
    };
  }

  // Check if endpoint is configured
  if (!FORMSPREE_ENDPOINT) {
    return {
      success: false,
      message: "Contact form is temporarily unavailable",
      error: "Please try again later or reach out via email directly.",
    };
  }

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject.trim(),
        message: data.message.trim(),
        _subject: `Portfolio Contact: ${data.subject.trim()}`,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: "Thank you! Your message has been sent successfully. I'll get back to you soon.",
      };
    }

    // Handle Formspree errors with user-friendly messages
    const errorData = await response.json().catch(() => ({}));
    
    // Map common HTTP status codes to user-friendly messages
    const userMessage = response.status === 429 
      ? "Too many requests. Please wait a moment and try again."
      : response.status >= 500
      ? "The server is temporarily unavailable. Please try again later."
      : "Unable to send your message. Please try again.";

    return {
      success: false,
      message: userMessage,
      error: errorData.error || undefined,
    };
  } catch {
    // Network errors - provide user-friendly feedback without exposing details
    return {
      success: false,
      message: "Unable to send your message",
      error: "Please check your internet connection and try again.",
    };
  }
}
