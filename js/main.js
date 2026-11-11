/* ═══════════════════════════════════════════════════════════════
   ZeroToEarn — main.js
   Dark mode, mobile nav, search/filter, forms, cookie banner,
   share buttons, read progress. No dependencies.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));

  /* ── Dark mode toggle ──────────────────────────────────────── */
  const root = document.documentElement;
  const THEME_KEY = "zte-theme";
  const themeBtn = $("#theme-toggle");
  if (themeBtn) {
    const paint = () => {
      themeBtn.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
    };
    paint();
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      paint();
    });
  }

  /* ── Mobile navigation ─────────────────────────────────────── */
  const nav = $("#site-nav");
  const navToggle = $("#nav-toggle");
  if (nav && navToggle) {
    navToggle.addEventListener("click", () => nav.classList.toggle("open"));
    $$("a", nav).forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  /* ── Search + category filter (homepage) ───────────────────── */
  const searchInput = $("#search-input");
  const searchCount = $("#search-count");
  const featured = $("#featured");
  const chips = $$(".chip[data-cat]");
  const cards = $$(".posts-grid .card");
  const noResults = $("#no-results");
  let activeCat = "all";

  function applyFilters() {
    if (!cards.length) return;
    const q = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const haystack = ((card.dataset.title || "") + " " + (card.dataset.category || "") + " " + (card.dataset.tags || "")).toLowerCase();
      const okQuery = !q || haystack.includes(q);
      const okCat = activeCat === "all" || card.dataset.category === activeCat;
      const ok = okQuery && okCat;
      card.classList.toggle("hidden", !ok);
      if (ok) shown++;
    });
    if (featured) featured.classList.toggle("hidden", !!(q || activeCat !== "all"));
    if (noResults) noResults.classList.toggle("hidden", shown > 0);
    if (searchCount) {
      searchCount.classList.toggle("hidden", !(q || activeCat !== "all"));
      searchCount.textContent = shown + (shown === 1 ? " guide matches" : " guides match") + (q ? ' "' + q + '"' : "");
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
    $$('button[type="submit"]', searchInput.closest("form") || document).forEach((b) =>
      b.addEventListener("click", (e) => e.preventDefault())
    );
  }
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeCat = chip.dataset.cat;
      applyFilters();
    });
  });

  /* ── Newsletter & contact forms ────────────────────────────── */
  /* These currently show a success message locally so you can test.
     To actually collect emails, connect a free form service such as
     Formspree (https://formspree.io — free tier) and set the form's
     action attribute. Full steps: README.md → "Connect your forms". */
  $$("form[data-fake-submit]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = form.parentElement.querySelector("[data-success]");
      if (success) {
        form.classList.add("hidden");
        success.classList.remove("hidden");
      } else {
        form.reset();
      }
    });
  });

  /* ── Cookie consent banner (required for AdSense in EEA/UK) ── */
  const banner = $("#cookie-banner");
  if (banner) {
    let consent = null;
    try { consent = localStorage.getItem("zte-consent"); } catch (e) {}
    if (!consent) banner.hidden = false;
    const close = (value) => {
      try { localStorage.setItem("zte-consent", value); } catch (e) {}
      banner.hidden = true;
    };
    const accept = $("#cookie-accept");
    const decline = $("#cookie-decline");
    if (accept) accept.addEventListener("click", () => close("all"));
    if (decline) decline.addEventListener("click", () => close("essential"));
  }

  /* ── Share buttons (post pages) ────────────────────────────── */
  $$("[data-share]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const kind = btn.dataset.share;
      const url = encodeURIComponent(location.href);
      const title = encodeURIComponent(document.title);
      if (kind === "copy") {
        const done = () => {
          const old = btn.textContent;
          btn.textContent = "✅";
          setTimeout(() => (btn.textContent = old), 1600);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, done);
        return;
      }
      const links = {
        x: "https://twitter.com/intent/tweet?url=" + url + "&text=" + title,
        facebook: "https://www.facebook.com/sharer/sharer.php?u=" + url,
        whatsapp: "https://wa.me/?text=" + title + "%20" + url,
        linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=" + url
      };
      if (links[kind]) window.open(links[kind], "_blank", "noopener,width=620,height=520");
    });
  });

  /* ── Reading progress bar (post pages) ─────────────────────── */
  const progress = $("#read-progress");
  if (progress) {
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ── Back to top ───────────────────────────────────────────── */
  const toTop = $("#to-top");
  if (toTop) {
    window.addEventListener(
      "scroll",
      () => toTop.classList.toggle("show", window.scrollY > 600),
      { passive: true }
    );
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ── Footer year ───────────────────────────────────────────── */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
