export type InquiryInterest =
  | 'bio-leather'
  | 'bio-thermocol'
  | 'research-collaboration'
  | 'general';

export interface InquiryFormInput {
  name: string;
  organization: string;
  email: string;
  interest: InquiryInterest;
  message: string;
}

export interface InquiryValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface InquiryValidationResult {
  isValid: boolean;
  errors: InquiryValidationErrors;
}

export type PropertyClassification = 'all' | 'design-objective' | 'lab-focus';

export interface MaterialPropertyItem {
  id: string;
  title: string;
  shortDesc: string;
  classification: Exclude<PropertyClassification, 'all'>;
  classificationLabel: string;
  scientificNote: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateInquiry(input: InquiryFormInput): InquiryValidationResult {
  const errors: InquiryValidationErrors = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid work or personal email address.';
  }

  if (trimmedMessage.length < 10) {
    errors.message = 'Please share a brief note on your inquiry (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getInterestLabel(interest: InquiryInterest): string {
  switch (interest) {
    case 'bio-leather':
      return 'Mycelium Bio-Leather';
    case 'bio-thermocol':
      return 'Bio-Thermocol Packaging Alternative';
    case 'research-collaboration':
      return 'Research & R&D Collaboration';
    case 'general':
      return 'Partnership & General Inquiry';
  }
}

export function buildInquiryConfirmation(input: InquiryFormInput): {
  recipientName: string;
  topicLabel: string;
  summary: string;
  mailto: string;
} {
  const recipientName = input.name.trim();
  const topicLabel = getInterestLabel(input.interest);
  const orgSuffix = input.organization.trim() ? ` (${input.organization.trim()})` : '';
  const body = `Hello Urban Hyphae,\n\n${input.message.trim()}\n\n${recipientName}${orgSuffix}\nReply to: ${input.email.trim()}`;
  return {
    recipientName,
    topicLabel,
    summary: `Thank you, ${recipientName}${orgSuffix}. Your inquiry about ${topicLabel} is ready. Open the draft and send it to urbanhyphae@gmail.com.`,
    mailto: `mailto:urbanhyphae@gmail.com?subject=${encodeURIComponent(topicLabel)}&body=${encodeURIComponent(body)}`,
  };
}

export function filterPropertiesByClassification<T extends { classification: Exclude<PropertyClassification, 'all'> }>(
  items: readonly T[],
  filter: PropertyClassification,
): T[] {
  if (filter === 'all') {
    return [...items];
  }
  return items.filter((item) => item.classification === filter);
}
