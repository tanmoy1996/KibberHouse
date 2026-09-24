const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !isoDatePattern.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function isValidStay(checkIn: unknown, checkOut: unknown) {
  return (
    isIsoDate(checkIn) &&
    isIsoDate(checkOut) &&
    Date.parse(`${checkOut}T00:00:00Z`) > Date.parse(`${checkIn}T00:00:00Z`)
  );
}


const phoneCharacters = /^\+?[\d\s().-]+$/;

// Accepts local Indian mobiles (10 digits, starting 6–9, optional leading 0) and
// international numbers (10–15 digits, the E.164 maximum), with common formatting.
export function phoneError(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return "Please enter your phone number.";
  const trimmed = value.trim();
  if (!phoneCharacters.test(trimmed)) return "Use digits only, with an optional + and spaces.";
  const digits = trimmed.replace(/\D/g, "");
  const international = trimmed.startsWith("+");
  if (!international) {
    const local = digits.length === 11 && digits.startsWith("0") ? digits.slice(1) : digits;
    if (local.length === 10) {
      return /^[6-9]/.test(local) ? null : "Indian mobile numbers start with 6, 7, 8 or 9.";
    }
  }
  if (digits.length < 10 || digits.length > 15) {
    return "Enter a full number, with the country code if outside India (e.g. +44 20 7946 0958).";
  }
  return null;
}

export function isValidPhone(value: unknown) {
  return phoneError(value) === null;
}
