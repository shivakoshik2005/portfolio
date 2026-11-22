const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer:fine)').matches;

/* ---------- Content (images unchanged from your original site) ---------- */
const projects = [
  { t: 'Swiftly', img: 'https://i.ibb.co/t69gDVf/Swiftly-thumbnail.png', link: 'https://www.figma.com/proto/Hs5gSgIhSukNyMvneXkZVC/swiftly-originals?node-id=0-1&t=nUXZGBppZRqKruN1-1', cta: 'View prototype',
    d: 'An AI-powered hyperlocal delivery application designed for speed and efficiency in local commerce.' },
  { t: 'Shopwiser', img: 'https://i.ibb.co/KxjT745x/shopwiserr.png', link: 'https://shivakoshik2005.github.io/ShopWiser/', cta: 'Open live site',
    d: 'An intelligent gadget configuration tool that helps users find the right electronics for their needs.' },
  { t: 'AI Email Composer', img: 'https://i.ibb.co/Y7YZt7qh/ai-mail-agent.png',
    d: 'An AI-powered email tool that streamlines communication by generating email content for you.' },
  { t: 'College Blog', img: 'https://i.ibb.co/1tRKYYKN/College-Blog.png', link: 'https://github.com/shivakoshik2005/The-Blog-Website.git', cta: 'View code on GitHub',
    d: 'A full-featured Django blog platform where the college community shares articles and updates.' },
  { t: 'UI/UX Designs', img: 'https://i.ibb.co/wh8YvYSR/UX-thumbnail.png',
    d: 'A collection of user-centred designs for web and mobile applications, created in Figma.' }
];
const certs = [
  { t: 'District Level Recognition for my Innovation', thumb: 'https://i.ibb.co/pjdRSHMm/1742830842104.jpg', full: 'https://i.ibb.co/GvM8z9KZ/1742830842170.jpg', d: 'Recognised by the District Collector as an Innovator for my project Swiftly.' },
  { t: 'Represented Telangana at VBYLD 2026', thumb: 'https://i.ibb.co/YBGN7mTk/1769709441610.jpg', full: 'https://i.ibb.co/xqTGcQ7Z/1742830971050.jpg', d: 'Represented Telangana nationally and presented ideas for a Viksit Bharat through Soft Power to Shri Narendra Modi ji.' },
  { t: 'State Level Youth Parliament', thumb: 'https://i.ibb.co/zpXRwdZ/1754490408314.jpg', full: 'https://i.ibb.co/PzmmrGtz/1742988514942.jpg', d: 'Selected for the State Level Youth Parliament under the Government of India\'s Viksit Bharat initiative.' },
  { t: 'Workshop on MCPs by Nxtwave', thumb: 'https://i.ibb.co/dwDJcBzn/1755164796686.jpg', full: 'https://i.ibb.co/BHpjD9qX/image.png', d: 'Took part in a workshop on MCPs and built a project, conducted by Nxtwave.' },
  { t: 'Robo AI Workshop', thumb: 'https://i.ibb.co/XxJhbwgm/image.png', full: 'https://i.ibb.co/rKXkgTpL/Robo-AI-Kolluri-Shiva-Koushik.jpg', d: 'Learned and explored the world of robotics in the Robo AI workshop.' },
  { t: 'Building a Static Website', thumb: 'https://i.ibb.co/SXsh9qR2/image.png', full: 'https://i.ibb.co/PZxh0jfL/BUILDING-STATIC-WEBSITE.jpg', d: 'Completed a project on building a static website with Nxtwave.' },
  { t: 'Cisco Virtual Internship', thumb: 'https://i.ibb.co/V01ByHRz/1762867271456.jpg', full: 'https://i.ibb.co/chDVgB4F/gen-AI-workshop.jpg', d: 'Learned networking and cybersecurity fundamentals and designed a secure virtual college network in Cisco Packet Tracer.' },
  { t: 'Infosys Virtual Internship 6.0', thumb: 'https://i.ibb.co/S7VSHt2Q/1769774202538.jpg', full: 'https://i.ibb.co/2sZz8n9F/CCNA-Cyber-Security.jpg', d: 'Shortlisted for the Infosys Virtual Internship and contributed to the assigned project.' }
];
const shell = (o) => `<div class="thumb"><img src="${o.img || o.thumb}" alt="${o.t}" loading="lazy"></div><div class="body"><h3>${o.t}</h3><p>${o.d}</p>${o.cta ? `<span class="go">${o.cta} →</span>` : ''}</div><i class="shine"></i>`;

$('#project-grid').innerHTML = projects.map((p) => p.link
  ? `<a class="tile reveal" data-tilt href="${p.link}" target="_blank" rel="noopener">${shell(p)}</a>`
  : `<div class="tile reveal" data-tilt>${shell(p)}</div>`).join('');
$('#cert-grid').innerHTML = certs.map((c, i) =>
  `<button class="tile cert reveal" data-tilt data-full="${c.full}" aria-label="Open certificate: ${c.t}">${shell({ ...c, cta: 'View certificate' })}</button>`).join('');

/* ---------- Theme ---------- */
const root = document.documentElement;
let stars, knot, setSceneColor = () => {};
const setTheme = (t) => {
  root.classList.toggle('light', t === 'light');
  localStorage.setItem('theme', t);
  setSceneColor();
};
$('#theme').addEventListener('click', () => setTheme(root.classList.contains('light') ? 'dark' : 'light'));
setTheme(localStorage.getItem('theme') || 'dark');

/* ---------- Three.js: stars + wireframe knot ---------- */
let mx = 0, my = 0, scrollY0 = 0;
if (window.THREE && !reduced) {
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
  cam.position.z = 30;
  const renderer = new THREE.WebGLRenderer({ canvas: $('#bg-canvas'), alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  const n = innerWidth < 700 ? 2500 : 6000, pos = new Float32Array(n * 3);
  for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * 600;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  stars = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.8, transparent: true }));
  knot = new THREE.Mesh(new THREE.TorusKnotGeometry(7, 1.8, 140, 16), new THREE.MeshBasicMaterial({ wireframe: true, transparent: true, opacity: 0.22 }));
  knot.position.set(-18, 4, -8);
  scene.add(stars, knot);
  setSceneColor = () => {
    const l = root.classList.contains('light');
    stars.material.color.setHex(l ? 0x334155 : 0xaab4c4);
    knot.material.color.setHex(l ? 0x0891b2 : 0x22d3ee);
  };
  setSceneColor();
  addEventListener('resize', () => { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
  addEventListener('mousemove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
  (function loop() {
    requestAnimationFrame(loop);
    if (document.hidden) return;
    cam.position.x += (mx * 8 - cam.position.x) * 0.04;
    cam.position.y += (-my * 8 - cam.position.y) * 0.04;
    cam.lookAt(scene.position);
    stars.rotation.y += 0.0002;
    knot.rotation.x += 0.003; knot.rotation.y += 0.004;
    knot.position.x = -18 + Math.min(scrollY0 / 120, 30);
    knot.position.y = 4 + scrollY0 / 150;
    renderer.render(scene, cam);
  })();
}

/* ---------- Scroll: progress bar, timeline fill, active nav ---------- */
const links = $$('#nav a'), secs = links.map((a) => $(a.getAttribute('href')));
const tl = $('.timeline'), fill = $('#line-fill');
const onScroll = () => {
  scrollY0 = scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  $('#progress').style.width = (scrollY / max) * 100 + '%';
  const r = tl.getBoundingClientRect();
  fill.style.height = Math.max(0, Math.min(1, (innerHeight * 0.6 - r.top) / r.height)) * 100 + '%';
  let cur = -1;
  secs.forEach((s, i) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) cur = i; });
  links.forEach((a, i) => a.classList.toggle('active', i === cur));
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Reveal (staggered) + counters ---------- */
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const sib = [...e.target.parentElement.children].indexOf(e.target);
  e.target.style.transitionDelay = Math.min(sib * 0.08, 0.5) + 's';
  e.target.classList.add('visible');
  io.unobserve(e.target);
}), { threshold: 0.12 });
$$('.reveal').forEach((el) => io.observe(el));

const count = (el) => {
  const to = +el.dataset.count, dec = +el.dataset.dec || 0, t0 = performance.now();
  (function step(t) {
    const p = Math.min((t - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = (to * e).toFixed(dec);
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
  el.textContent = w.slice(0, ci);
  if (reduced) { el.textContent = roles[0]; return; }
  if (!del && ci === w.length) { del = true; return setTimeout(type, 1400); }
  if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  ci += del ? -1 : 1;
  setTimeout(type, del ? 35 : 75);
})();

/* ---------- Cursor glow, 3D tilt, magnetic buttons ---------- */
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

/* ---------- Certificate modal ---------- */
const modal = $('#modal'), mimg = $('#modal-img');
let lastFocus;
const closeModal = () => { modal.classList.remove('open'); lastFocus && lastFocus.focus(); };
$$('.cert').forEach((c) => c.addEventListener('click', () => {
  lastFocus = c; mimg.src = c.dataset.full; modal.classList.add('open'); $('#close').focus();
}));
$('#close').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ---------- Contact link + loader ---------- */
$('#contact-link').href = innerWidth <= 768
  ? 'mailto:shivakoushik2005@gmail.com'
  : 'https://mail.google.com/mail/?view=cm&fs=1&to=shivakoushik2005@gmail.com';
const hideLoader = () => setTimeout(() => $('#loader').classList.add('done'), 500);
document.readyState === 'complete' ? hideLoader() : addEventListener('load', hideLoader);
