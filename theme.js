/* ═══════════════════════════════════════════════════════════
   Omenda Pi Pays — Theme Switcher (Dark ⇌ Light)
   Shared across all HTML pages. Works with lang.js pattern.
   Syncs across tabs via localStorage "storage" event.
   ═══════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var THEME_KEY = "omenda_theme";

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || "dark";
  }

  function applyTheme(theme) {
    var root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }
    // Update toggle button icon if present
    var btn = document.getElementById("theme-toggle-btn");
    if (btn) {
      btn.innerHTML = theme === "light" ? "☀️" : "🌙";
      btn.title = theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode";
    }
  }

  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: theme } }));
  }

  function toggleTheme() {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }

  // ── Shared UI polish for button positioning/responsiveness ──
  function injectUiPolishStyle() {
    if (document.getElementById("omenda-ui-polish")) return;
    var style = document.createElement("style");
    style.id = "omenda-ui-polish";
    style.textContent = [
      ".omenda-nav-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}",
      ".omenda-nav-actions>a,.omenda-nav-actions>button{display:inline-flex;align-items:center;justify-content:center;min-height:38px;line-height:1;white-space:nowrap}",
      ".omenda-nav-actions>#pi-username{white-space:nowrap}",
      "a.btn-primary,button.btn-primary,.btn-submit,.btn-buy,.btn-outline{display:inline-flex;align-items:center;justify-content:center;min-height:40px}",
      "@media (max-width:900px){nav{height:auto;min-height:72px;padding-top:8px;padding-bottom:8px}.omenda-nav-actions{gap:8px}.omenda-nav-actions>#pi-username{order:-1;width:100%;text-align:right;display:block}}",
      "@media (max-width:640px){.omenda-nav-actions{width:100%;justify-content:flex-end}.omenda-nav-actions>a,.omenda-nav-actions>button{padding:8px 12px!important;font-size:12.5px!important}}"
    ].join("");
    document.head.appendChild(style);
  }

  function normalizeNavActions() {
    var piBtn = document.getElementById("pi-connect-btn");
    if (piBtn && piBtn.parentElement) {
      piBtn.parentElement.classList.add("omenda-nav-actions");
    }

    var nav = document.querySelector("nav");
    if (!nav) return;

    var candidates = nav.querySelectorAll("div");
    for (var i = 0; i < candidates.length; i += 1) {
      var el = candidates[i];
      var hasActionLink = !!el.querySelector('a[href*="services"]');
      var hasButton = !!el.querySelector("button");
      if (hasActionLink && hasButton) {
        el.classList.add("omenda-nav-actions");
      }
    }
  }

  // ── Create floating toggle button ──
  function createThemeToggle() {
    var btn = document.createElement("button");
    btn.id = "theme-toggle-btn";
    btn.setAttribute("aria-label", "Toggle color mode");
    btn.style.cssText = [
      "background:rgba(255,255,255,0.06)",
      "border:1px solid rgba(255,255,255,0.10)",
      "color:#a1a1aa",
      "width:38px",
      "height:38px",
      "border-radius:10px",
      "cursor:pointer",
      "font-size:18px",
      "display:inline-flex",
      "align-items:center",
      "justify-content:center",
      "transition:all 0.2s ease",
      "flex-shrink:0",
    ].join(";") + ";";

    btn.innerHTML = getTheme() === "light" ? "☀️" : "🌙";
    btn.title = getTheme() === "light" ? "Switch to Dark Mode" : "Switch to Light Mode";

    btn.addEventListener("mouseenter", function () {
      btn.style.background = "rgba(255,255,255,0.12)";
      btn.style.borderColor = "rgba(255,255,255,0.20)";
      btn.style.transform = "scale(1.08)";
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.background = "rgba(255,255,255,0.06)";
      btn.style.borderColor = "rgba(255,255,255,0.10)";
      btn.style.transform = "scale(1)";
    });
    btn.addEventListener("click", toggleTheme);

    return btn;
  }

  // ── Inject into nav ──
  function injectToggle() {
    var existingTheme = document.getElementById("theme-toggle-btn");
    if (existingTheme) return;

    // Try nav-right (desktop nav)
    var navRight = document.querySelector(".nav-right");
    if (navRight) {
      var langSelector = navRight.querySelector(".lang-selector");
      if (langSelector) {
        navRight.insertBefore(createThemeToggle(), langSelector);
      } else {
        var firstChild = navRight.firstChild;
        navRight.insertBefore(createThemeToggle(), firstChild);
      }
      return;
    }
    // Try topbar-nav or header
    var topbar = document.querySelector(".topbar-nav, .topbar-actions, .mobile-header-actions");
    if (topbar) {
      topbar.insertBefore(createThemeToggle(), topbar.firstChild);
      return;
    }
    // Fallback: fixed position
    var container = document.createElement("div");
    container.style.cssText = "position:fixed;top:12px;right:12px;z-index:9999;display:flex;gap:8px;align-items:center;";
    container.appendChild(createThemeToggle());
    document.body.appendChild(container);
  }

  // ── Apply correct button styling in light mode ──
  function updateToggleStyle() {
    var btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    var isLight = getTheme() === "light";
    if (isLight) {
      btn.style.background = "rgba(0,0,0,0.06)";
      btn.style.borderColor = "rgba(0,0,0,0.12)";
      btn.style.color = "#52525b";
    } else {
      btn.style.background = "rgba(255,255,255,0.06)";
      btn.style.borderColor = "rgba(255,255,255,0.10)";
      btn.style.color = "#a1a1aa";
    }
  }

  // ── Cross-tab sync ──
  window.addEventListener("storage", function (e) {
    if (e.key === THEME_KEY && e.newValue) {
      applyTheme(e.newValue);
      updateToggleStyle();
    }
  });

  // ── Init ──
  function init() {
    applyTheme(getTheme());
    injectUiPolishStyle();
    normalizeNavActions();
    injectToggle();
    updateToggleStyle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // ── Public API ──
  window.OmendaTheme = {
    get: getTheme,
    set: setTheme,
    toggle: toggleTheme,
  };
})();
