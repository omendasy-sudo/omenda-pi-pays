(function () {
  "use strict";

  function isLocalDevelopment() {
    return /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);
  }

  function hasDesktopPreviewBypass() {
    return new URLSearchParams(window.location.search).get("desktopPreview") === "1";
  }

  function isPhoneUserAgent() {
    var ua = navigator.userAgent || "";
    return /iPhone|iPod|Android.+Mobile|Windows Phone|BlackBerry|Opera Mini|IEMobile|Mobile Safari|PiBrowser/i.test(ua);
  }

  if (isLocalDevelopment() || hasDesktopPreviewBypass() || isPhoneUserAgent()) {
    return;
  }

  var style = document.createElement("style");
  style.textContent = "body{display:none !important;}";
  document.head.appendChild(style);

  function renderPhoneOnlyNotice() {
    var wrapper = document.createElement("div");
    wrapper.style.cssText = [
      "min-height:100vh",
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "padding:24px",
      "background:#09090b",
      "color:#fafafa",
      "font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif"
    ].join(";") + ";";

    wrapper.innerHTML = [
      '<div style="max-width:520px;width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:28px;text-align:center">',
      '<div style="font-size:42px;margin-bottom:14px">📱</div>',
      '<h1 style="margin:0 0 12px;font-size:28px">Phone Only Access</h1>',
      '<p style="margin:0 0 18px;color:#d4d4d8;line-height:1.6">Open this site from a mobile phone or inside Pi Browser to continue.</p>',
      '<p style="margin:0;color:#a1a1aa;font-size:14px">Desktop browsers are blocked for regular users on this site.</p>',
      "</div>"
    ].join("");

    document.body.innerHTML = "";
    document.body.style.margin = "0";
    document.body.appendChild(wrapper);
    style.remove();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderPhoneOnlyNotice, { once: true });
  } else {
    renderPhoneOnlyNotice();
  }
})();