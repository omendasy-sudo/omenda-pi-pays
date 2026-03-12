(function () {
    "use strict";

    if (window.__omendaClearButtonReady) {
        return;
    }
    window.__omendaClearButtonReady = true;

    var style = document.createElement("style");
    style.textContent = [
        "html, body {",
        "  max-width: 100%;",
        "  overflow-x: hidden;",
        "}",
        "img, video, iframe, canvas, svg {",
        "  max-width: 100%;",
        "  height: auto;",
        "}",
        "button, .btn, .btn-primary, .btn-outline, .btn-secondary, .btn-buy, a.btn, .quick-link, .nav-item, [role='button'] {",
        "  min-height: 40px;",
        "}",
        ".omenda-clear-btn {",
        "  position: fixed;",
        "  right: 16px;",
        "  bottom: 16px;",
        "  z-index: 9999;",
        "  border: 1px solid rgba(255,255,255,0.28);",
        "  background: rgba(12,12,16,0.9);",
        "  color: #fafafa;",
        "  font: 600 13px/1.2 Inter, Segoe UI, Arial, sans-serif;",
        "  padding: 10px 14px;",
        "  border-radius: 999px;",
        "  cursor: pointer;",
        "  box-shadow: 0 10px 26px rgba(0,0,0,0.35);",
        "  backdrop-filter: blur(8px);",
        "}",
        ".omenda-clear-btn:hover {",
        "  transform: translateY(-1px);",
        "  background: rgba(35,35,44,0.96);",
        "}",
        "@media (max-width: 640px) {",
        "  body { font-size: 15px; }",
        "  nav, header, main, section, footer, .container, .content, .section, .hero {",
        "    padding-left: 12px !important;",
        "    padding-right: 12px !important;",
        "  }",
        "  .grid, .cards, .card-grid, .services-grid, .links-grid {",
        "    grid-template-columns: 1fr !important;",
        "  }",
        "  .link-card, .card, .panel, .section {",
        "    border-radius: 12px;",
        "  }",
        "  .nav-center {",
        "    display: flex;",
        "    gap: 6px;",
        "    overflow-x: auto;",
        "    white-space: nowrap;",
        "    scrollbar-width: none;",
        "  }",
        "  .nav-center::-webkit-scrollbar { display: none; }",
        "  button, .btn, .btn-primary, .btn-outline, .btn-secondary, .btn-buy, a.btn, .quick-link, .nav-item, [role='button'] {",
        "    min-height: 44px;",
        "    font-size: 14px;",
        "    padding-top: 10px !important;",
        "    padding-bottom: 10px !important;",
        "  }",
        "  .omenda-clear-btn {",
        "    right: 12px;",
        "    bottom: 12px;",
        "    padding: 9px 12px;",
        "    font-size: 12px;",
        "  }",
        "}",
        "@media (max-width: 420px) {",
        "  button, .btn, .btn-primary, .btn-outline, .btn-secondary, .btn-buy, a.btn, .quick-link, .nav-item, [role='button'] {",
        "    width: 100%;",
        "  }",
        "  .nav-right button, .nav-right a, .footer-col a { width: auto; }",
        "  .omenda-clear-btn { right: 12px; bottom: 12px; padding: 9px 12px; font-size: 12px; }",
        "}"
    ].join("\n");
    document.head.appendChild(style);

    var button = document.createElement("button");
    button.type = "button";
    button.className = "omenda-clear-btn";
    button.id = "global-clear-button";
    button.textContent = "Clear";
    button.setAttribute("aria-label", "Clear page inputs");

    button.addEventListener("click", function () {
        var fields = document.querySelectorAll("input, textarea, select");

        fields.forEach(function (field) {
            var tag = (field.tagName || "").toLowerCase();
            var type = (field.type || "").toLowerCase();

            if (type === "button" || type === "submit" || type === "reset" || type === "hidden") {
                return;
            }

            if (type === "checkbox" || type === "radio") {
                field.checked = false;
            } else if (tag === "select") {
                field.selectedIndex = 0;
            } else {
                field.value = "";
            }

            field.dispatchEvent(new Event("input", { bubbles: true }));
            field.dispatchEvent(new Event("change", { bubbles: true }));
        });

        var primaryForms = document.querySelectorAll("form");
        primaryForms.forEach(function (form) {
            if (!form.hasAttribute("data-preserve-values")) {
                form.reset();
            }
        });
    });

    document.body.appendChild(button);
})();
