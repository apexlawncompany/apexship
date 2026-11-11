// The sign-up guest list. ADMIN_EMAILS is set in Vercel as a comma-separated
// list, e.g. "you@apexlawncompany.com, partner@apexlawncompany.com".
// Comparison ignores capital letters and spaces.
export function isApprovedEmail(email) {
  if (!email) return false;
  const approved = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return approved.includes(email.trim().toLowerCase());
}
