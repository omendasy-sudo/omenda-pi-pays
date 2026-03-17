/* ═══════════════════════════════════════════════════════════
   Omenda Pi Pays — GCV Price Mode Switcher
   Toggle between Standard ($0.17/π) and GCV ($314,159/π) rates.
   Shared across all HTML pages. Syncs across tabs.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var GCV_KEY = "omenda_gcv";
  var STD_RATE = 0.17;
  var GCV_RATE = 314159;

  function getMode() {
    return localStorage.getItem(GCV_KEY) || "standard";
  }

  function getRate() {
    return getMode() === "gcv" ? GCV_RATE : STD_RATE;
  }

  function convert(piAmount) {
    return piAmount * getRate();
  }

  function formatUsd(piAmount) {
    var usd = convert(piAmount);
    if (usd >= 1e9) return "$" + (usd / 1e9).toFixed(2) + "B";
    if (usd >= 1e6) return "$" + (usd / 1e6).toFixed(2) + "M";
    if (usd >= 1e3) return "$" + (usd / 1e3).toFixed(2) + "K";
    return "$" + usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function setMode(mode) {
    localStorage.setItem(GCV_KEY, mode);
    applyMode(mode);
    updateAllPrices();
    window.dispatchEvent(new CustomEvent("gcvchange", { detail: { mode: mode, rate: mode === "gcv" ? GCV_RATE : STD_RATE } }));
  }

  function toggleMode() {
    setMode(getMode() === "standard" ? "gcv" : "standard");
  }

  function normalizeInternalLink(anchor) {
    if (!anchor) return;
    var rawHref = anchor.getAttribute("href");
    if (!rawHref || rawHref.charAt(0) === "#") return;

    // Keep special schemes untouched.
    if (/^(mailto:|tel:|sms:|whatsapp:|javascript:|pi:)/i.test(rawHref)) return;

    var parsed;
    try {
      parsed = new URL(rawHref, window.location.href);
    } catch (_e) {
      return;
    }

    var isHttp = parsed.protocol === "http:" || parsed.protocol === "https:";
    if (!isHttp) return;

    // Force same-origin links to open in-app (same tab) for Pi Browser UX.
    if (parsed.origin === window.location.origin) {
      anchor.setAttribute("href", parsed.pathname + parsed.search + parsed.hash);
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

  function installLinkNormalizer() {
    normalizeAllLinks();

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target) return;
      var link = target.closest ? target.closest("a[href]") : null;
      if (!link) return;
      normalizeInternalLink(link);
    });
  }

  // ── Update toggle button appearance ──
  function applyMode(mode) {
    var btn = document.getElementById("gcv-toggle-btn");
    if (!btn) return;
    var isGcv = mode === "gcv";
    btn.textContent = isGcv ? "GCV" : "STD";
    btn.title = isGcv ? "GCV Mode: $314,159/π — Click for Standard" : "Standard: $0.17/π — Click for GCV";
    btn.style.background = isGcv ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.06)";
    btn.style.borderColor = isGcv ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.10)";
    btn.style.color = isGcv ? "#f59e0b" : "#a1a1aa";

    // Update rate stat if present
    var rateEl = document.getElementById("pi-rate-display");
    if (rateEl) {
      rateEl.textContent = isGcv ? "$314,159" : "$0.17";
    }
    var rateLabel = document.getElementById("pi-rate-label");
    if (rateLabel) {
      rateLabel.textContent = isGcv ? "GCV Pi Rate" : "Live Pi Rate";
    }
  }

  // ── Scan and update all price <small> elements ──
  function updateAllPrices() {
    // Update elements with data-pi attribute
    var els = document.querySelectorAll("[data-pi]");
    for (var i = 0; i < els.length; i++) {
      var pi = parseFloat(els[i].getAttribute("data-pi"));
      if (!isNaN(pi)) {
        els[i].textContent = "\u2248 " + formatUsd(pi);
      }
    }

    // Also update card-price <small> children (for inline product cards)
    var cards = document.querySelectorAll(".card-price small");
    for (var j = 0; j < cards.length; j++) {
      var parent = cards[j].closest(".card-price");
      if (parent) {
        // Extract Pi amount from parent text (format: "300 π")
        var match = parent.textContent.match(/([\d,]+(?:\.\d+)?)\s*[π\u03C0]/);
        if (match) {
          var piVal = parseFloat(match[1].replace(/,/g, ""));
          if (!isNaN(piVal)) {
            cards[j].textContent = "\u2248 " + formatUsd(piVal);
          }
        }
      }
    }
  }

  // ── Create GCV toggle button ──
  function createGcvToggle() {
    var btn = document.createElement("button");
    btn.id = "gcv-toggle-btn";
    btn.setAttribute("aria-label", "Toggle GCV price mode");
    btn.style.cssText = [
      "background:rgba(255,255,255,0.06)",
      "border:1px solid rgba(255,255,255,0.10)",
      "color:#a1a1aa",
      "height:38px",
      "padding:0 12px",
      "border-radius:10px",
      "cursor:pointer",
      "font-size:11px",
      "font-weight:700",
      "letter-spacing:0.5px",
      "display:inline-flex",
      "align-items:center",
      "justify-content:center",
      "transition:all 0.2s ease",
      "flex-shrink:0",
    ].join(";") + ";";

    var mode = getMode();
    btn.textContent = mode === "gcv" ? "GCV" : "STD";
    btn.title = mode === "gcv" ? "GCV Mode: $314,159/π — Click for Standard" : "Standard: $0.17/π — Click for GCV";

    btn.addEventListener("mouseenter", function () {
      btn.style.transform = "scale(1.08)";
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.transform = "scale(1)";
    });
    btn.addEventListener("click", toggleMode);

    return btn;
  }

  // ── Inject into nav (next to theme toggle) ──
  function injectToggle() {
    var themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn && themeBtn.parentNode) {
      themeBtn.parentNode.insertBefore(createGcvToggle(), themeBtn);
      return;
    }
    var navRight = document.querySelector(".nav-right");
    if (navRight) {
      var langSelector = navRight.querySelector(".lang-selector");
      if (langSelector) {
        navRight.insertBefore(createGcvToggle(), langSelector);
      } else {
        navRight.insertBefore(createGcvToggle(), navRight.firstChild);
      }
      return;
    }
    // Fallback: fixed position
    var container = document.createElement("div");
    container.style.cssText = "position:fixed;top:12px;right:100px;z-index:9999;";
    container.appendChild(createGcvToggle());
    document.body.appendChild(container);
  }

  // ── Cross-tab sync ──
  window.addEventListener("storage", function (e) {
    if (e.key === GCV_KEY && e.newValue) {
      applyMode(e.newValue);
      updateAllPrices();
    }
  });

  // ── Init ──
  function init() {
    installLinkNormalizer();
    injectToggle();
    applyMode(getMode());
    updateAllPrices();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ── Public API ──
  window.OmendaGcv = {
    STD_RATE: STD_RATE,
    GCV_RATE: GCV_RATE,
    getMode: getMode,
    getRate: getRate,
    setMode: setMode,
    toggle: toggleMode,
    convert: convert,
    formatUsd: formatUsd,
    updateAllPrices: updateAllPrices,
  };
})();
