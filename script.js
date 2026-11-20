/* =====================================================
   script.js: rendering, animations and interactions
   ===================================================== */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  try { const saved = localStorage.getItem("theme"); if (saved) root.dataset.theme = saved; } catch (e) {}
  $("#theme-toggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */
  const links = $("#links");
  $("#menu-toggle").addEventListener("click", () => links.classList.toggle("open"));
  $$("a", links).forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));

  /* ---------- Static content from data.js ---------- */
  $("#hero-name").textContent = SITE.name;
  $("#avatar").src = SITE.avatar;
  $("#year").textContent = new Date().getFullYear();
  $("#social").innerHTML = SITE.links.map((l) => `<a class="btn ghost" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("");

  $("#timeline").innerHTML = JOURNEY.map((j) => `
    <div class="tl-item reveal ${j.current ? "current" : ""}">
      <span class="when">${esc(j.when)}</span>
      <h3>${esc(j.title)}</h3>
      <strong>${esc(j.place)}</strong>
      <p>${esc(j.text)}</p>
    </div>`).join("");

  /* ---------- Blog ---------- */
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  $("#post-count").dataset.count = posts.length;
  const allTags = ["All", ...new Set(posts.flatMap((p) => p.tags))];
  let activeTag = "All";

  $("#filters").innerHTML = allTags.map((t, i) => `<button class="filter ${i === 0 ? "on" : ""}" data-tag="${esc(t)}">${esc(t)}</button>`).join("");

  function renderPosts() {
    const q = $("#search").value.trim().toLowerCase();
    const list = posts.filter((p) =>
      (activeTag === "All" || p.tags.includes(activeTag)) &&
      (!q || (p.title + p.excerpt + p.tags.join(" ")).toLowerCase().includes(q)));
    $("#posts").innerHTML = list.map((p) => `
      <button class="card tilt reveal in" data-id="${esc(p.id)}">
        <div class="thumb"><img src="${esc(p.cover)}" alt="" loading="lazy"></div>
        <div class="card-body">
          <span class="meta">${fmtDate(p.date)}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.excerpt)}</p>
          ${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
        </div>
      </button>`).join("");
    $("#posts-empty").hidden = list.length > 0;
    initTilt();
  }
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest(".filter"); if (!b) return;
    activeTag = b.dataset.tag;
    $$(".filter").forEach((x) => x.classList.toggle("on", x === b));
    renderPosts();
  });
  $("#search").addEventListener("input", renderPosts);

  /* ---------- Post modal ---------- */
  const modal = $("#modal");
  function openPost(id) {
    const p = posts.find((x) => x.id === id); if (!p) return;
    $("#modal-cover").src = p.cover;
    $("#modal-meta").textContent = fmtDate(p.date) + "  ·  " + p.tags.join(", ");
    $("#modal-title").textContent = p.title;
    $("#modal-content").innerHTML = p.content;   // your own trusted HTML
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    history.replaceState(null, "", "#post-" + id);
  }
  function closeAll() {
    modal.hidden = true; $("#lightbox").hidden = true;
    document.body.style.overflow = "";
    if (location.hash.startsWith("#post-")) history.replaceState(null, "", "#blog");
  }
  $("#posts").addEventListener("click", (e) => { const c = e.target.closest(".card"); if (c) openPost(c.dataset.id); });
  $$("[data-close]").forEach((el) => el.addEventListener("click", closeAll));
  addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
  if (location.hash.startsWith("#post-")) openPost(location.hash.slice(6));  // shareable post links

  /* ---------- Library ---------- */
  $("#docs").innerHTML = DOCS.length
    ? DOCS.map((d) => `
      <div class="doc reveal">
        <div class="doc-ico">PDF</div>
        <div>
          <h4>${esc(d.title)}</h4>
          <p>${esc(d.desc || "")}</p>
          <div class="links-row">
            <a href="${esc(d.file)}" target="_blank" rel="noopener">Open</a>
            <a href="${esc(d.file)}" download>Download</a>
          </div>
        </div>
      </div>`).join("")
    : `<p class="empty reveal">No documents yet. Add PDFs to the <code>pdfs</code> folder and list them in <code>data.js</code>.</p>`;

  /* ---------- Gallery + lightbox ---------- */
  $("#gallery-grid").innerHTML = GALLERY.map((g) => `
    <figure class="shot reveal" data-src="${esc(g.src)}" data-cap="${esc(g.caption || "")}">
      <img src="${esc(g.src)}" alt="${esc(g.caption || "Gallery image")}" loading="lazy">
      <figcaption>${esc(g.caption || "")}</figcaption>
    </figure>`).join("");
  $("#gallery-grid").addEventListener("click", (e) => {
    const f = e.target.closest(".shot"); if (!f) return;
    $("#lightbox-img").src = f.dataset.src;
    $("#lightbox-cap").textContent = f.dataset.cap;
    $("#lightbox").hidden = false;
  });
  $("#lightbox").addEventListener("click", (e) => { if (e.target.id !== "lightbox-img") closeAll(); });

  /* ---------- Typing effect ---------- */
  (function typing() {
    const el = $("#typed"); let r = 0, i = 0, del = false;
    if (reduceMotion) { el.textContent = SITE.roles[0]; return; }
    (function tick() {
      const word = SITE.roles[r];
      el.textContent = word.slice(0, i);
      if (!del && i === word.length) { del = true; return setTimeout(tick, 1600); }
      if (del && i === 0) { del = false; r = (r + 1) % SITE.roles.length; }
      i += del ? -1 : 1;
      setTimeout(tick, del ? 28 : 65);
    })();
  })();

  /* ---------- Scroll reveal, counters, progress, nav ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      $$("[data-count]", en.target).forEach(countUp);
      if (en.target.matches("[data-count]")) countUp(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    const end = +el.dataset.count; let n = 0;
    const step = () => { n += Math.max(1, end / 40); if (n >= end) return (el.textContent = end); el.textContent = Math.floor(n); requestAnimationFrame(step); };
    end ? step() : (el.textContent = 0);
  }

  const sections = $$("main section[id]");
  function onScroll() {
    const h = document.documentElement;
    $("#progress").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
    $("#nav").classList.toggle("scrolled", h.scrollTop > 20);
    let cur = "";
    sections.forEach((s) => { if (s.getBoundingClientRect().top < 140) cur = s.id; });
    $$(".links a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#to-top").addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Cursor glow ---------- */
  const glow = $(".cursor-glow");
  addEventListener("pointermove", (e) => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });

  /* ---------- 3D tilt on cards ---------- */
  function initTilt() {
    if (reduceMotion || matchMedia("(hover: none)").matches) return;
    $$(".tilt").forEach((el) => {
      if (el.dataset.tilt) return; el.dataset.tilt = 1;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }

  /* ---------- Floating math symbols canvas ---------- */
  (function symbols() {
    const c = $("#bg-canvas"), ctx = c.getContext("2d");
    const glyphs = ["∑", "∫", "π", "∞", "√", "∂", "θ", "λ", "∇", "≈", "∈", "Δ", "φ", "ℝ", "ℤ", "∀", "∃"];
    let w, h, items = [];
    function resize() {
      w = c.width = innerWidth; h = c.height = innerHeight;
      items = Array.from({ length: Math.min(38, Math.floor(w / 36)) }, () => ({
        x: Math.random() * w, y: Math.random() * h, g: glyphs[(Math.random() * glyphs.length) | 0],
        s: 16 + Math.random() * 30, v: 0.15 + Math.random() * 0.4, r: Math.random() * 6.28, rv: (Math.random() - 0.5) * 0.01, a: 0.05 + Math.random() * 0.12
      }));
    }
    resize(); addEventListener("resize", resize);
    function draw() {
      ctx.clearRect(0, 0, w, h);
      const dark = root.dataset.theme === "dark";
      items.forEach((p) => {
        p.y -= p.v; p.r += p.rv; if (p.y < -40) { p.y = h + 40; p.x = Math.random() * w; }
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.globalAlpha = p.a; ctx.fillStyle = dark ? "#9db4ff" : "#4a3fd1";
        ctx.font = `${p.s}px Fraunces, serif`; ctx.fillText(p.g, 0, 0); ctx.restore();
      });
      if (!reduceMotion) requestAnimationFrame(draw);
    }
    draw();
  })();

  renderPosts();
  initTilt();
})();
