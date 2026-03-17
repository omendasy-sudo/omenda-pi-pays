/*
  Omenda Pi Browser link connector
  Normalizes same-origin links so page-to-page navigation stays in-app.
*/
(function () {
  "use strict";

  function normalizeInternalLink(anchor) {
    if (!anchor) return;

    var rawHref = anchor.getAttribute("href");
    if (!rawHref || rawHref.charAt(0) === "#") return;

    // Keep non-web schemes untouched.
    if (/^(mailto:|tel:|sms:|whatsapp:|javascript:|pi:)/i.test(rawHref)) return;

    var parsed;
    try {
      parsed = new URL(rawHref, window.location.href);
    } catch (_e) {
      return;
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return;

    if (parsed.origin === window.location.origin) {
      anchor.setAttribute("href", parsed.pathname + parsed.search + parsed.hash);

      // Prevent opening local pages in a separate tab/window.
      if (anchor.getAttribute("target") === "_blank") {
        anchor.removeAttribute("target");
      }

      var rel = anchor.getAttribute("rel") || "";
      if (/\bnoopener\b|\bnoreferrer\b/i.test(rel)) {
        anchor.removeAttribute("rel");
      }
    }
  }

  function normalizeAllLinks() {
    var links = document.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i++) {
      normalizeInternalLink(links[i]);
    }
  }

  function init() {
    normalizeAllLinks();

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || !target.closest) return;
      var link = target.closest("a[href]");
      if (!link) return;
      normalizeInternalLink(link);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
