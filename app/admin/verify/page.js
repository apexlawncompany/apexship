import { redirect } from "next/navigation";

// The code step now lives on the register page itself, so the password never
// has to be stored in the browser between pages. Old links land here.
export default function VerifyOtpPage() {
  redirect("/admin/register");
}
