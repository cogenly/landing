/** Format a date string as "March 28, 2026" */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Format a date string as "Mar 28, 2026, 2:30 PM" */
export function formatDateTime(date: string) {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Format a number as currency: "$5,000" */
export function formatCurrency(amount: number) {
  return `$${Number(amount).toLocaleString()}`;
}
