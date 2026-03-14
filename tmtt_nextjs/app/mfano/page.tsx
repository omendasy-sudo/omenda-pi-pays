import { redirect } from "next/navigation";

// Serve the Pi Blazor SDK reference page.
// The actual HTML lives in /public/mfano.html and is served as a static file.
export default function MfanoPage() {
  redirect("/mfano.html");
}
