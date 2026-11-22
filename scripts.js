const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer:fine)').matches;

/* ---------- Content (images unchanged from your original site) ---------- */
const projects = [
  { t: 'Swiftly', img: 'https://i.ibb.co/t69gDVf/Swiftly-thumbnail.png', link: 'https://www.figma.com/proto/Hs5gSgIhSukNyMvneXkZVC/swiftly-originals?node-id=0-1&t=nUXZGBppZRqKruN1-1', cta: 'View prototype', d: 'An AI-powered hyperlocal delivery application designed for speed and efficiency in local commerce.' },
  { t: 'Shopwiser', img: 'https://i.ibb.co/KxjT745x/shopwiserr.png', link: 'https://shivakoshik2005.github.io/ShopWiser/', cta: 'Open live site', d: 'An intelligent gadget configuration tool that helps users find the right electronics for their needs.' },
  { t: 'AI Email Composer', img: 'https://i.ibb.co/Y7YZt7qh/ai-mail-agent.png', d: 'An AI-powered email tool that streamlines communication by generating email content for you.' },
  { t: 'College Blog', img: 'https://i.ibb.co/1tRKYYKN/College-Blog.png', link: 'https://github.com/shivakoshik2005/The-Blog-Website.git', cta: 'View code on GitHub', d: 'A full-featured Django blog platform where the college community shares articles and updates.' },
  { t: 'UI/UX Designs', img: 'https://i.ibb.co/wh8YvYSR/UX-thumbnail.png', d: 'A collection of user-centred designs for web and mobile applications, created in Figma.' }
];
const featured = [
  { badge: 'District recognition', t: 'Recognised for my innovation', thumb: 'https://i.ibb.co/pjdRSHMm/1742830842104.jpg', full: 'https://i.ibb.co/GvM8z9KZ/1742830842170.jpg', d: 'The District Collector recognised me as an Innovator for my project Swiftly.' },
  { badge: 'National level', t: 'Represented Telangana at VBYLD 2026', thumb: 'https://i.ibb.co/YBGN7mTk/1769709441610.jpg', full: 'https://i.ibb.co/xqTGcQ7Z/1742830971050.jpg', d: 'Represented Telangana nationally and presented my ideas for a Viksit Bharat through Soft Power to Shri Narendra Modi ji.' },
  { badge: 'State level', t: 'Selected for the State Level Youth Parliament', thumb: 'https://i.ibb.co/zpXRwdZ/1754490408314.jpg', full: 'https://i.ibb.co/PzmmrGtz/1742988514942.jpg', d: "Selected under the Government of India's Viksit Bharat initiative to promote youth participation in politics." }
];
const certs = [
  { t: 'Workshop on MCPs by Nxtwave', thumb: 'https://i.ibb.co/dwDJcBzn/1755164796686.jpg', full: 'https://i.ibb.co/BHpjD9qX/image.png', d: 'Took part in a workshop on MCPs and built a project.' },
  { t: 'Robo AI Workshop', thumb: 'https://i.ibb.co/XxJhbwgm/image.png', full: 'https://i.ibb.co/rKXkgTpL/Robo-AI-Kolluri-Shiva-Koushik.jpg', d: 'Explored the world of robotics and AI.' },
  { t: 'Building a Static Website', thumb: 'https://i.ibb.co/SXsh9qR2/image.png', full: 'https://i.ibb.co/PZxh0jfL/BUILDING-STATIC-WEBSITE.jpg', d: 'Completed a project on building a static website with Nxtwave.' },
  { t: 'Cisco Virtual Internship', thumb: 'https://i.ibb.co/V01ByHRz/1762867271456.jpg', full: 'https://i.ibb.co/chDVgB4F/gen-AI-workshop.jpg', d: 'Learned networking and cybersecurity and designed a secure virtual college network in Packet Tracer.' },
  { t: 'Infosys Virtual Internship 6.0', thumb: 'https://i.ibb.co/S7VSHt2Q/1769774202538.jpg', full: 'https://i.ibb.co/2sZz8n9F/CCNA-Cyber-Security.jpg', d: 'Shortlisted and contributed to the assigned project.' }
];
const shell = (o) => `<div class="thumb"><img src="${o.img || o.thumb}" alt="${o.t}" loading="lazy"></div><div class="body">${o.badge ? `<span class="badge"><i data-ic="trophy"></i>${o.badge}</span>` : ''}<h3>${o.t}</h3><p>${o.d}</p>${o.cta ? `<span class="go">${o.cta} →</span>` : ''}</div><i class="shine"></i>`;
$('#project-grid').innerHTML = projects.map((p) => p.link
  ? `<a class="tile reveal" data-tilt href="${p.link}" target="_blank" rel="noopener">${shell(p)}</a>`
  : `<div class="tile reveal" data-tilt>${shell(p)}</div>`).join('');
$('#spot').innerHTML = featured.map((c) => `<button class="feat reveal" data-full="${c.full}" aria-label="Open certificate: ${c.t}">${shell({ ...c, cta: 'View certificate' })}</button>`).join('');
const certHTML = (c, dup) => `<button class="tile" data-full="${c.full}" ${dup ? 'tabindex="-1" aria-hidden="true"' : ''} aria-label="Open certificate: ${c.t}">${shell({ ...c, cta: 'View certificate' })}</button>`;
const certSet = (dup) => [...certs, ...certs].map((c) => certHTML(c, dup)).join('');
$('#rail').innerHTML = `<div class="cloop">${certSet(false)}${certSet(true)}</div>`;

/* ---------- Marquees ---------- */
$$('[data-words]').forEach((el) => {
  const w = el.dataset.words.split(','), html = Array(8).fill(w).flat().map((x) => `<span>${x}</span>`).join('');
  el.innerHTML = `<div class="track">${html}</div>`;
});

/* ---------- Skill orbit illustration ---------- */
const rings = [
  { size: 52, t: '26s', items: ['Python', 'Java', 'C'] },
  { size: 78, t: '40s', items: ['HTML', 'CSS', 'JS', 'Django'] },
  { size: 100, t: '56s', items: ['Git', 'Figma', 'MySQL', 'Tailwind'] }
];
$('#system').insertAdjacentHTML('beforeend', rings.map((r) => {
  const dots = r.items.map((n, i) => {
    const a = (i / r.items.length) * Math.PI * 2;
    return `<div class="pl" style="left:${50 + 50 * Math.cos(a)}%;top:${50 + 50 * Math.sin(a)}%"><span>${n}</span></div>`;
  }).join('');
  return `<div class="rg" style="--t:${r.t};width:${r.size}%;height:${r.size}%;left:${(100 - r.size) / 2}%;top:${(100 - r.size) / 2}%">${dots}</div>`;
}).join(''));

/* ---------- Split-letter headings ---------- */
$$('.split').forEach((el) => {
  let i = 0;
  el.innerHTML = el.textContent.trim().split(' ').map((w) =>
    `<span class="w">${[...w].map((c) => `<span class="ch" style="--i:${i++}">${c}</span>`).join('')}</span>`).join(' ');
  el.setAttribute('aria-label', el.textContent);
});

/* ---------- Scroll-lit paragraph ---------- */
const lit = $('#lit');
lit.innerHTML = lit.textContent.split(' ').map((w) => `<span class="l">${w}</span>`).join(' ');
const words = $$('.l', lit);

/* ---------- Background: drifting neural network + twinkling stars ---------- */
let sy = 0, mouse = { x: -999, y: -999 };
const bc = $('#bg-canvas'), bx = bc.getContext('2d'), dpr = Math.min(devicePixelRatio, 2);
let W, H, nodes = [], tw = [], pulses = [], tick = 0;
const bgInit = () => {
  W = innerWidth; H = innerHeight; bc.width = W * dpr; bc.height = H * dpr; bx.setTransform(dpr, 0, 0, dpr, 0, 0);
  nodes = Array.from({ length: W < 700 ? 36 : Math.min(85, Math.floor(W / 20)) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: Math.random() * 1.5 + 0.9 }));
  tw = Array.from({ length: W < 700 ? 60 : 140 }, () => ({ x: Math.random() * W, y: Math.random() * H, a: Math.random() * 6.28, s: Math.random() * 0.03 + 0.008 }));
};
bgInit(); addEventListener('resize', bgInit);
addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
const drawBg = () => {
  bx.clearRect(0, 0, W, H);
  const off = -sy * 0.08;
  tw.forEach((t) => { bx.fillStyle = `rgba(190,210,255,${0.12 + 0.4 * Math.abs(Math.sin((t.a += t.s)))})`; bx.fillRect(t.x, (((t.y + off * 0.5) % H) + H) % H, 1.3, 1.3); });
  const P = nodes.map((n) => { if (!reduced) { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1; } return { n, x: n.x, y: (((n.y + off) % H) + H) % H }; });
  const links = [];
  for (let i = 0; i < P.length; i++) {
    for (let j = i + 1; j < P.length; j++) {
      const d = Math.hypot(P[i].x - P[j].x, P[i].y - P[j].y);
      if (d < 150) { bx.strokeStyle = `rgba(100,150,255,${(1 - d / 150) * 0.32})`; bx.lineWidth = 1; bx.beginPath(); bx.moveTo(P[i].x, P[i].y); bx.lineTo(P[j].x, P[j].y); bx.stroke(); links.push([P[i], P[j]]); }
    }
    const dm = Math.hypot(P[i].x - mouse.x, P[i].y - mouse.y);
    if (dm < 190) { bx.strokeStyle = `rgba(170,150,255,${(1 - dm / 190) * 0.55})`; bx.beginPath(); bx.moveTo(P[i].x, P[i].y); bx.lineTo(mouse.x, mouse.y); bx.stroke(); }
  }
  P.forEach((p) => { bx.fillStyle = 'rgba(140,175,255,.85)'; bx.beginPath(); bx.arc(p.x, p.y, p.n.r, 0, 6.283); bx.fill(); });
  if (!reduced && ++tick % 35 === 0 && links.length) pulses.push({ l: links[(Math.random() * links.length) | 0], t: 0 });
  pulses = pulses.filter((q) => (q.t += 0.025) < 1);
  pulses.forEach((q) => { const [a, b] = q.l, x = a.x + (b.x - a.x) * q.t, y = a.y + (b.y - a.y) * q.t; bx.fillStyle = '#c9b8ff'; bx.shadowColor = '#8b7bff'; bx.shadowBlur = 12; bx.beginPath(); bx.arc(x, y, 2.2, 0, 6.283); bx.fill(); bx.shadowBlur = 0; });
};
(function bgLoop() { if (!reduced) requestAnimationFrame(bgLoop); if (!document.hidden) drawBg(); })();

/* ---------- Scroll effects ---------- */
const links = $$('#nav a'), secs = links.map((a) => $(a.getAttribute('href')));
const jsec = $('#journey'), jtrack = $('#jtrack'), jfill = $('#jfill'), jrocket = $('#jrocket'), jcards = $$('.jcard');
$('#jdots').innerHTML = jcards.map((c, i) => `<span style="left:${(i / (jcards.length - 1)) * 100}%">${c.dataset.t}</span>`).join('');
const jdots = $$('#jdots span');
const sizeJ = () => { if (!reduced) jsec.style.height = innerHeight + Math.max(0, jtrack.scrollWidth - innerWidth) + 'px'; };
const jUpdate = () => {
  if (reduced) return;
  const r = jsec.getBoundingClientRect(), p = Math.max(0, Math.min(1, -r.top / (jsec.offsetHeight - innerHeight)));
  jtrack.style.transform = `translate3d(${-p * Math.max(0, jtrack.scrollWidth - innerWidth)}px,0,0)`;
  jfill.style.width = p * 100 + '%'; jrocket.style.left = p * 100 + '%';
  jsec.style.setProperty('--jp', p);
  jcards.forEach((c) => {
    const b = c.getBoundingClientRect(), d = (b.left + b.width / 2 - innerWidth / 2) / innerWidth, a = Math.min(Math.abs(d), 1);
    c.style.transform = `perspective(1000px) rotateY(${-d * 26}deg) scale(${1 - a * 0.16})`;
    c.style.opacity = 1 - a * 0.55;
    c.classList.toggle('active', a < 0.2);
  });
  jdots.forEach((d, i) => d.classList.toggle('on', p >= i / (jcards.length - 1) - 0.03));
};
addEventListener('resize', () => { sizeJ(); onScroll(); });
addEventListener('load', () => { sizeJ(); onScroll(); });
sizeJ();
const onScroll = () => {
  sy = scrollY;
  $('#progress').style.width = (sy / (document.documentElement.scrollHeight - innerHeight)) * 100 + '%';
  jUpdate();
  const lr = lit.getBoundingClientRect(), lp = (innerHeight * 0.85 - lr.top) / (lr.height + innerHeight * 0.3);
  words.forEach((w, i) => w.classList.toggle('on', i / words.length < lp));
  let cur = -1;
  secs.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === cur));
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Reveal (staggered) + counters ---------- */
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  if (!e.target.classList.contains('split')) e.target.style.transitionDelay = Math.min([...e.target.parentElement.children].indexOf(e.target) * 0.08, 0.5) + 's';
  e.target.classList.add('visible');
  io.unobserve(e.target);
}), { threshold: 0.12 });
$$('.reveal,.split').forEach((el) => io.observe(el));
const count = (el) => {
  const to = +el.dataset.count, dec = +el.dataset.dec || 0, t0 = performance.now();
  (function step(t) {
    const p = Math.min((t - t0) / 1400, 1);
    el.textContent = (to * (1 - Math.pow(1 - p, 3))).toFixed(dec);
    if (p < 1) requestAnimationFrame(step);
  })(t0);
};
const cio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { count(e.target); cio.unobserve(e.target); } }), { threshold: 0.6 });
$$('[data-count]').forEach((el) => cio.observe(el));

/* ---------- Typing effect ---------- */
const roles = ['Creative Developer', 'UI/UX Designer', 'Tech Enthusiast', 'Future WWDC attendee'];
let ri = 0, ci = 0, del = false;
(function type() {
  const w = roles[ri], el = $('#typed');
  if (reduced) { el.textContent = roles[0]; return; }
  el.textContent = w.slice(0, ci);
  if (!del && ci === w.length) { del = true; return setTimeout(type, 1400); }
  if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  ci += del ? -1 : 1;
  setTimeout(type, del ? 35 : 75);
})();

/* ---------- Cursor glow, tilt, magnetic, click sparks ---------- */
if (fine && !reduced) {
  const glow = $('#glow');
  addEventListener('mousemove', (e) => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });
  $$('[data-tilt]').forEach((el) => {
    const max = el.classList.contains('hero-photo') ? 12 : 8;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(800px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-6px)`;
      el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
    });
    el.addEventListener('mouseleave', () => (el.style.transform = ''));
  });
  $$('.magnetic').forEach((b) => {
    b.addEventListener('mousemove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    });
    b.addEventListener('mouseleave', () => (b.style.transform = ''));
  });
}
if (!reduced) addEventListener('click', (e) => {
  for (let i = 0; i < 10; i++) {
    const s = document.createElement('i'), a = (i / 10) * Math.PI * 2, d = 30 + Math.random() * 40;
    s.className = 'spark';
    s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;background:${i % 2 ? '#5b9dff' : '#8b7bff'}`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
});

/* ---------- Certificate modal ---------- */
const modal = $('#modal'), mimg = $('#modal-img');
let lastFocus;
const closeModal = () => { modal.classList.remove('open'); lastFocus && lastFocus.focus(); };
$$('[data-full]').forEach((c) => c.addEventListener('click', () => {
  lastFocus = c; mimg.src = c.dataset.full; modal.classList.add('open'); $('#close').focus();
}));
$('#close').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ---------- Contact ---------- */
const email = 'shivakoushik2005@gmail.com';
$('#contact-link').href = innerWidth <= 768 ? `mailto:${email}` : `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
$('#copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(email); } catch (e) {}
  $('#toast').classList.add('show');
  setTimeout(() => $('#toast').classList.remove('show'), 1800);
});


/* ---------- Tech line icons ---------- */
const P = {
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.5 9 2.5 12 0v-5M22 10v6"/>',
  terminal: '<path d="m4 17 6-6-6-6M12 19h8"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  chip: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.1 2.1 0 0 0-2.9-.1z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.9A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22 22 0 0 1-4 2z"/><path d="M9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  bulb: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V18h6v-1.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z"/>',
  spark: '<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/>',
  trophy: '<path d="M8 21h8M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7l10-5z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="m8.2 13.5-1.2 8.5 5-3 5 3-1.2-8.5"/>',
  arrow: '<path d="M7 17 17 7M8 7h9v9"/>'
};
$$('[data-ic]').forEach((el) => { el.innerHTML = `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${P[el.dataset.ic] || ''}</svg>`; });

/* ---------- Loader ---------- */
const hideLoader = () => setTimeout(() => $('#loader').classList.add('done'), 500);
document.readyState === 'complete' ? hideLoader() : addEventListener('load', hideLoader);
