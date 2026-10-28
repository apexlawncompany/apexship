import { html } from "./stat-html";

// Library page: edu.apexship.net/stat
// The (library) folder is a route group, so it organizes files without adding to the URL.
export const dynamic = "force-static";

export function GET() {
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
