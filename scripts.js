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
const shell = (o) => `<div class="thumb"><img src="${o.img || o.thumb}" alt="${o.t}" loading="lazy"></div><div class="body">${o.badge ? `<span class="badge">${o.badge}</span>` : ''}<h3>${o.t}</h3><p>${o.d}</p>${o.cta ? `<span class="go">${o.cta} →</span>` : ''}</div><i class="shine"></i>`;
$('#project-grid').innerHTML = projects.map((p) => p.link
  ? `<a class="tile reveal" data-tilt href="${p.link}" target="_blank" rel="noopener">${shell(p)}</a>`
  : `<div class="tile reveal" data-tilt>${shell(p)}</div>`).join('');
$('#spot').innerHTML = featured.map((c) => `<button class="feat reveal" data-full="${c.full}" aria-label="Open certificate: ${c.t}">${shell({ ...c, cta: 'View certificate' })}</button>`).join('');
$('#rail').innerHTML = certs.map((c) => `<button class="tile reveal" data-tilt data-full="${c.full}" aria-label="Open certificate: ${c.t}">${shell({ ...c, cta: 'View certificate' })}</button>`).join('');

/* ---------- Marquees ---------- */
$$('[data-words]').forEach((el) => {
  const w = el.dataset.words.split(','), html = [...w, ...w, ...w, ...w].map((x) => `<span>${x}</span>`).join('');
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

/* ---------- Three.js: stars + wireframe knot ---------- */
let mx = 0, my = 0, sy = 0;
if (window.THREE && !reduced) {
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
  cam.position.z = 30;
  const renderer = new THREE.WebGLRenderer({ canvas: $('#bg-canvas'), alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  const pos = new Float32Array((innerWidth < 700 ? 2500 : 6000) * 3);
  for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * 600;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.8, color: 0xaab4c4, transparent: true }));
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(7, 1.8, 140, 16), new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.2 }));
  const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(5, 1), new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.2 }));
  scene.add(stars, knot, ico);
  addEventListener('resize', () => { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
  addEventListener('mousemove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
  (function loop() {
    requestAnimationFrame(loop);
    if (document.hidden) return;
    cam.position.x += (mx * 8 - cam.position.x) * 0.04;
    cam.position.y += (-my * 8 - cam.position.y) * 0.04;
    cam.lookAt(scene.position);
    stars.rotation.y += 0.0002; stars.rotation.x = sy * 0.00004;
    knot.rotation.x += 0.003; knot.rotation.y += 0.004;
    ico.rotation.x -= 0.004; ico.rotation.y += 0.003;
    knot.position.set(-18 + Math.min(sy / 120, 30), 4 + sy / 150, -8);
    ico.position.set(24 - Math.min(sy / 200, 20), -10 - sy / 220, -10);
    renderer.render(scene, cam);
  })();
}

/* ---------- Scroll effects ---------- */
const links = $$('#nav a'), secs = links.map((a) => $(a.getAttribute('href')));
const tl = $('.timeline'), fill = $('#line-fill'), rocket = $('#rocket');
const onScroll = () => {
  sy = scrollY;
  $('#progress').style.width = (sy / (document.documentElement.scrollHeight - innerHeight)) * 100 + '%';
  const r = tl.getBoundingClientRect(), p = Math.max(0, Math.min(1, (innerHeight * 0.6 - r.top) / r.height));
  fill.style.height = p * 100 + '%';
  rocket.style.top = Math.max(0, p * (r.height - 20) - 10) + 'px';
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
    s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;background:${i % 2 ? '#22d3ee' : '#8b5cf6'}`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 700);
  }
});

/* ---------- Certificate rail (buttons + drag) ---------- */
const rail = $('#rail');
$('#next').addEventListener('click', () => rail.scrollBy({ left: 320, behavior: 'smooth' }));
$('#prev').addEventListener('click', () => rail.scrollBy({ left: -320, behavior: 'smooth' }));
let down = false, sx = 0, sl = 0, moved = false;
rail.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; });
addEventListener('pointerup', () => (down = false));
rail.addEventListener('pointermove', (e) => { if (!down) return; if (Math.abs(e.clientX - sx) > 5) moved = true; rail.style.scrollSnapType = 'none'; rail.scrollLeft = sl - (e.clientX - sx); });
rail.addEventListener('pointerup', () => (rail.style.scrollSnapType = ''));

/* ---------- Certificate modal ---------- */
const modal = $('#modal'), mimg = $('#modal-img');
let lastFocus;
const closeModal = () => { modal.classList.remove('open'); lastFocus && lastFocus.focus(); };
$$('[data-full]').forEach((c) => c.addEventListener('click', () => {
  if (moved) { moved = false; return; }
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

/* ---------- Loader ---------- */
const hideLoader = () => setTimeout(() => $('#loader').classList.add('done'), 500);
document.readyState === 'complete' ? hideLoader() : addEventListener('load', hideLoader);
