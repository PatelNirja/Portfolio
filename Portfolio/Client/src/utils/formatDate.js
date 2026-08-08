export function formatDate(dateString, options = { month: "short", year: "numeric" }) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function formatDateFull(dateString) {
  return formatDate(dateString, { month: "short", day: "numeric", year: "numeric" });
}
