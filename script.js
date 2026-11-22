/* script.js — rendering + animations. Content lives in data.js */
(function () {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Render content ---------- */
  $('#tagline').textContent = S.tagline;
  $('#heroName').textContent = S.name;
  $('#year').textContent = new Date().getFullYear();
  $('#photo').src = S.photo;
  $('#aboutText').innerHTML = S.about.map(p => `<p>${esc(p)}</p>`).join('');
  $('#stats').innerHTML = S.stats.map(s => `<div class="stat"><b data-n="${s.num}" data-suffix="${s.suffix || ''}">0</b><small>${esc(s.label)}</small></div>`).join('');
  const chips = (id, arr) => $(id).innerHTML = arr.map(x => `<span>${esc(x)}</span>`).join('');
  chips('#courses', S.courses); chips('#skills', S.skills); chips('#langs', S.languages);

  $('#education').innerHTML = S.education.map(e => `<div class="tl"><span class="when">${esc(e.when)}</span><h4>${esc(e.title)}</h4><div class="where">${esc(e.where)}</div><p>${esc(e.note)}</p></div>`).join('');
  $('#experience').innerHTML = S.experience.map(e => `<div class="tl"><span class="when">${esc(e.when)}</span><h4>${esc(e.title)}</h4><div class="where">${esc(e.where)}</div>${e.points.length ? '<ul>' + e.points.map(p => `<li>${esc(p)}</li>`).join('') + '</ul>' : ''}</div>`).join('');
  $('#achievements').innerHTML = S.achievements.map(a => `<li>${esc(a)}</li>`).join('');

  /* Blog */
  let activeTag = 'all', query = '';
  const fmt = d => new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const allTags = ['all', ...new Set(S.posts.flatMap(p => p.tags || []))];
  const tagBox = $('#tagFilter');
  allTags.forEach(t => { const s = el('span', 'tag' + (t === 'all' ? ' active' : ''), '#' + t); s.onclick = () => { activeTag = t; [...tagBox.children].forEach(c => c.classList.toggle('active', c === s)); drawPosts(); }; tagBox.appendChild(s); });
  $('#search').addEventListener('input', e => { query = e.target.value.toLowerCase(); drawPosts(); });

  function renderMath(node) {
    if (window.renderMathInElement) renderMathInElement(node, { delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }, { left: '$$', right: '$$', display: true }], throwOnError: false });
  }
  function drawPosts() {
    const box = $('#posts'); box.innerHTML = '';
    const list = S.posts.filter(p => (activeTag === 'all' || (p.tags || []).includes(activeTag)) && (p.title + p.excerpt + (p.tags || []).join(' ')).toLowerCase().includes(query));
    if (!list.length) box.appendChild(el('p', 'empty', 'No posts found.'));
    list.forEach(p => {
      const c = el('article', 'post', `<time>${fmt(p.date)}</time><h4>${esc(p.title)}</h4><p>${p.excerpt}</p><div class="tags">${(p.tags || []).map(t => `<i>#${esc(t)}</i>`).join('')}</div>`);
      c.onclick = () => openPost(p);
      tilt(c); box.appendChild(c);
    });
    renderMath(box);
  }
  const modal = $('#modal'), mBody = $('#modalBody');
  function openPost(p) {
    mBody.innerHTML = `<time>${fmt(p.date)} · ${(p.tags || []).map(t => '#' + esc(t)).join(' ')}</time><h2>${esc(p.title)}</h2>${p.body}`;
    renderMath(mBody); modal.classList.add('open'); document.body.style.overflow = 'hidden';
    history.replaceState(null, '', '#post-' + p.id);
  }
  function closeAll() { document.querySelectorAll('.modal').forEach(m => m.classList.remove('open')); document.body.style.overflow = ''; if (location.hash.startsWith('#post-')) history.replaceState(null, '', '#blog'); }
  $('#closeModal').onclick = closeAll; $('#closeLb').onclick = closeAll;
  document.querySelectorAll('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m) closeAll(); }));
  addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
  drawPosts();
  if (location.hash.startsWith('#post-')) { const p = S.posts.find(x => '#post-' + x.id === location.hash); if (p) openPost(p); }

  /* PDFs */
  $('#pdfs').innerHTML = S.pdfs.length ? S.pdfs.map(p => `<div class="pdf reveal"><div class="ico">PDF</div><div><h4>${esc(p.title)}</h4><p>${esc(p.desc || '')}</p><a href="${esc(p.file)}" target="_blank" rel="noopener">Open ↗</a><a href="${esc(p.file)}" download>Download ↓</a></div></div>`).join('') : '<p class="empty">PDFs coming soon.</p>';
  if (S.cv) $('#pdfs').insertAdjacentHTML('afterbegin', `<div class="pdf reveal"><div class="ico">CV</div><div><h4>Curriculum Vitae</h4><p>Education, research, teaching and positions.</p><a href="${esc(S.cv)}" target="_blank" rel="noopener">Open ↗</a><a href="${esc(S.cv)}" download>Download ↓</a></div></div>`);

  /* Gallery */
  const lb = $('#lightbox');
  $('#galleryGrid').innerHTML = '';
  S.gallery.forEach(g => {
    const f = el('figure', 'reveal', `<img loading="lazy" src="${esc(g.src)}" alt="${esc(g.caption)}"><figcaption>${esc(g.caption)}</figcaption>`);
    f.onclick = () => { $('#lbImg').src = g.src; $('#lbCap').textContent = g.caption; lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
    $('#galleryGrid').appendChild(f);
  });

  /* Contact */
  const links = [['✉ Email', 'mailto:' + S.email], ['in LinkedIn', S.linkedin], ['GitHub', S.github], ['Instagram', S.instagram]].filter(l => l[1]);
  $('#links').innerHTML = links.map(l => `<a href="${esc(l[1])}" target="_blank" rel="noopener">${l[0]}</a>`).join('');

  /* ---------- UI behaviours ---------- */
  const nav = $('#menu');
  $('#burger').onclick = () => nav.classList.toggle('open');
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });
  const root = document.documentElement;
  try { if (localStorage.getItem('theme') === 'light') root.classList.add('light'); } catch (e) { }
  $('#themeBtn').onclick = () => { root.classList.toggle('light'); try { localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark'); } catch (e) { } };

  addEventListener('scroll', () => { const h = document.documentElement; $('#progress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%'; }, { passive: true });

  const cur = $('#cursor');
  addEventListener('mousemove', e => { cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'; });
  document.addEventListener('mouseover', e => cur.classList.toggle('big', !!e.target.closest('a,button,.post,figure,.chips span')));

  function tilt(c) {
    c.addEventListener('mousemove', e => { const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`; });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  }

  // Reveal on scroll + counters
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in'); io.unobserve(en.target);
    en.target.querySelectorAll?.('[data-n]').forEach(count);
  }), { threshold: .15 });
  document.querySelectorAll('.reveal,.tl').forEach((n, i) => { n.style.transitionDelay = (i % 4) * 90 + 'ms'; io.observe(n); });
  function count(n) { const to = +n.dataset.n, suf = n.dataset.suffix; let t0; const step = t => { t0 = t0 || t; const k = Math.min((t - t0) / 1400, 1); n.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }

  // Typing effect
  (function typer() {
    const t = $('#typed'); let i = 0, j = 0, del = false;
    if (reduce) { t.textContent = S.roles[0]; return; }
    (function tick() {
      const w = S.roles[i];
      t.textContent = w.slice(0, j);
      if (!del && j === w.length) { del = true; return setTimeout(tick, 1600); }
      if (del && j === 0) { del = false; i = (i + 1) % S.roles.length; }
      j += del ? -1 : 1; setTimeout(tick, del ? 25 : 55);
    })();
  })();

  /* ---------- Canvas helpers ---------- */
  function fit(c) { const d = Math.min(devicePixelRatio || 1, 2), r = c.getBoundingClientRect(); c.width = r.width * d; c.height = r.height * d; const g = c.getContext('2d'); g.setTransform(d, 0, 0, d, 0, 0); return { g, w: r.width, h: r.height }; }
  const visible = new Map();
  const vio = new IntersectionObserver(es => es.forEach(e => visible.set(e.target, e.isIntersecting)));
  const isVis = c => visible.get(c) !== false;
  function loop(canvas, draw) {
    vio.observe(canvas);
    let ctx = fit(canvas);
    addEventListener('resize', () => ctx = fit(canvas));
    (function f(t) { if (isVis(canvas)) draw(ctx.g, ctx.w, ctx.h, t / 1000); requestAnimationFrame(f); })(0);
  }

  /* ---------- 1. Background: drifting math symbols + network, mouse-reactive ---------- */
  (function bg() {
    const c = $('#bg'); let g = c.getContext('2d'), W, H; const mouse = { x: -999, y: -999 };
    const syms = ['∑', '∫', 'π', '∞', '∂', 'λ', 'ε', 'δ', '√', '∀', '∃', 'ℝ', 'ℂ', '≅', '∇', 'φ', 'ζ', '⊗'];
    let pts = [];
    function size() { W = c.width = innerWidth; H = c.height = innerHeight; const n = Math.min(Math.floor(W * H / 22000), 80); pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, s: syms[Math.random() * syms.length | 0], z: .5 + Math.random(), sym: Math.random() < .35 })); }
    size(); addEventListener('resize', size);
    addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    (function f() {
      g.clearRect(0, 0, W, H);
      const light = root.classList.contains('light'), a = light ? '30,40,110' : '140,170,255', gold = light ? '168,115,10' : '242,195,91';
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
        if (d < 120) { p.x += dx / d * 1.6; p.y += dy / d * 1.6; }
        if (p.sym) { g.font = `${18 * p.z}px 'Cormorant Garamond',serif`; g.fillStyle = `rgba(${gold},.35)`; g.fillText(p.s, p.x, p.y); }
        else { g.beginPath(); g.arc(p.x, p.y, 1.6 * p.z, 0, 7); g.fillStyle = `rgba(${a},.6)`; g.fill(); }
      });
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 130) { g.strokeStyle = `rgba(${a},${(1 - d / 130) * .22})`; g.beginPath(); g.moveTo(pts[i].x, pts[i].y); g.lineTo(pts[j].x, pts[j].y); g.stroke(); }
      }
      if (!reduce) requestAnimationFrame(f);
    })();
  })();

  /* ---------- 2. Hero: Fourier epicycles (DFT) drawing a curve ---------- */
  (function fourier() {
    // Target curve: a rose-like hypotrochoid, sampled as complex numbers
    const N = 220, pts = [];
    for (let k = 0; k < N; k++) {
      const t = k / N * 2 * Math.PI;
      pts.push({ re: (Math.cos(t) * 2 + Math.cos(-5 * t) * .8) * 1, im: (Math.sin(t) * 2 + Math.sin(-5 * t) * .8) });
    }
    // DFT
    const X = [];
    for (let k = 0; k < N; k++) {
      let re = 0, im = 0;
      for (let n = 0; n < N; n++) { const a = 2 * Math.PI * k * n / N; re += pts[n].re * Math.cos(a) + pts[n].im * Math.sin(a); im += -pts[n].re * Math.sin(a) + pts[n].im * Math.cos(a); }
      re /= N; im /= N;
      const f = k < N / 2 ? k : k - N;
      X.push({ f, amp: Math.hypot(re, im), ph: Math.atan2(im, re) });
    }
    X.sort((a, b) => b.amp - a.amp);
    const trail = [];
    loop($('#fourier'), (g, w, h, t) => {
      g.clearRect(0, 0, w, h);
      const sc = Math.min(w, h) / 6.2, cx = w * .55, cy = h * .5, tt = (t * .35) % (2 * Math.PI);
      let x = cx, y = cy;
      const gold = css('--gold'), cyan = css('--cyan');
      for (let i = 0; i < Math.min(X.length, 40); i++) {
        const e = X[i], px = x, py = y, a = e.f * tt + e.ph;
        x += e.amp * sc * Math.cos(a); y += e.amp * sc * Math.sin(a);
        g.strokeStyle = cyan; g.globalAlpha = .22; g.beginPath(); g.arc(px, py, e.amp * sc, 0, 7); g.stroke();
        g.globalAlpha = .6; g.beginPath(); g.moveTo(px, py); g.lineTo(x, y); g.stroke();
      }
      g.globalAlpha = 1;
      trail.unshift({ x, y }); if (trail.length > 700) trail.pop();
      g.lineWidth = 2.4; g.lineJoin = 'round';
      for (let i = 1; i < trail.length; i++) { g.strokeStyle = gold; g.globalAlpha = 1 - i / trail.length; g.beginPath(); g.moveTo(trail[i - 1].x, trail[i - 1].y); g.lineTo(trail[i].x, trail[i].y); g.stroke(); }
      g.globalAlpha = 1; g.lineWidth = 1;
      g.fillStyle = gold; g.beginPath(); g.arc(x, y, 4.5, 0, 7); g.fill();
    });
  })();

  /* ---------- 3. Rotating torus wireframe over portrait ---------- */
  loop($('#torus'), (g, w, h, t) => {
    g.clearRect(0, 0, w, h);
    const R = 1.6, r = .6, A = t * .5, B = t * .3, s = w * .2;
    g.lineWidth = 1;
    const proj = (u, v) => {
      let X = (R + r * Math.cos(v)) * Math.cos(u), Y = (R + r * Math.cos(v)) * Math.sin(u), Z = r * Math.sin(v);
      let Y2 = Y * Math.cos(A) - Z * Math.sin(A), Z2 = Y * Math.sin(A) + Z * Math.cos(A);
      let X2 = X * Math.cos(B) + Z2 * Math.sin(B), Z3 = -X * Math.sin(B) + Z2 * Math.cos(B);
      const k = 1 / (1 - Z3 / 9); return [w / 2 + X2 * s * k, h / 2 + Y2 * s * k];
    };
    for (let i = 0; i < 28; i++) { g.strokeStyle = 'rgba(76,201,240,.7)'; g.beginPath(); for (let j = 0; j <= 40; j++) { const p = proj(i / 28 * 6.2832, j / 40 * 6.2832); j ? g.lineTo(...p) : g.moveTo(...p); } g.stroke(); }
    for (let i = 0; i < 16; i++) { g.strokeStyle = 'rgba(242,195,91,.7)'; g.beginPath(); for (let j = 0; j <= 80; j++) { const p = proj(j / 80 * 6.2832, i / 16 * 6.2832); j ? g.lineTo(...p) : g.moveTo(...p); } g.stroke(); }
  });

  /* ---------- 4. Cantor set: depth driven by scroll position ---------- */
  loop($('#cantor'), (g, w, h, t) => {
    g.clearRect(0, 0, w, h);
    const rect = $('#cantor').getBoundingClientRect();
    const prog = Math.max(0, Math.min(1, 1 - rect.top / innerHeight));
    const depth = reduce ? 7 : Math.min(7, prog * 9 + (Math.sin(t) * .15));
    const rows = 8, rh = h / rows;
    (function draw(x0, x1, lvl) {
      if (lvl > depth) return;
      const frac = Math.min(1, depth - lvl + 0.001);
      g.fillStyle = `hsl(${45 - lvl * 6},${90}%,${60 + lvl * 2}%)`; g.globalAlpha = Math.min(1, frac);
      g.fillRect(x0, lvl * rh + 6, (x1 - x0) * Math.min(1, frac * 1.2), rh * .45);
      const L = (x1 - x0) / 3; draw(x0, x0 + L, lvl + 1); draw(x1 - L, x1, lvl + 1);
    })(w * .06, w * .94, 0);
    g.globalAlpha = 1;
  });

  /* ---------- 5. Footer Lissajous ---------- */
  loop($('#lissa'), (g, w, h, t) => {
    g.clearRect(0, 0, w, h);
    const ph = t * .8; g.lineWidth = 1.6; g.strokeStyle = css('--gold'); g.beginPath();
    for (let i = 0; i <= 400; i++) { const u = i / 400 * 6.2832, x = w / 2 + (w / 2 - 6) * Math.sin(3 * u + ph), y = h / 2 + (h / 2 - 6) * Math.sin(2 * u); i ? g.lineTo(x, y) : g.moveTo(x, y); }
    g.stroke();
  });
})();
