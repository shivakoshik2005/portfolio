# Portfolio Project — Technical Documentation

This repository contains a single-page portfolio website built with a mostly “frontend-only” stack:
- **HTML** for the page structure
- **Tailwind CSS (CDN)** for utility styling
- **Custom CSS** for theme variables, glassmorphism, animations, modal, loader, and UI details
- **JavaScript** for:
  - 3D star background (Three.js)
  - theme switching (light/dark)
  - on-scroll reveal animations (IntersectionObserver)
  - certificate modal preview
  - loading screen behavior
  - responsive “contact link” behavior

> Note: There is no separate backend in this project. Everything runs in the browser.

---

## 1) Project Structure (full)

From the workspace, the project folder contains:

```
portfolio/
├── index.html
├── scripts.js
├── styles.css
└── KOLLURI SHIVA KOUSHIK.pdf
```

Everything is served directly from these files (e.g., using GitHub Pages / any static host).

---

## 2) High-level Flow (how the page runs)

### Page lifecycle
1. **Browser loads `index.html`**
2. Tailwind and Three.js are loaded from CDNs in the `<head>`.
3. The page shows a **loader overlay** (`#loader-container`).
4. The main content wrapper (`#main-content`) is initially hidden using:
   - `style="visibility: hidden;"`
5. `scripts.js` is loaded with `defer`, so it runs after HTML parsing.
6. `scripts.js` immediately initializes the **3D background**:
   - creates a Three.js scene
   - renders animated stars on `#bg-canvas`
7. `window.load` fires after all resources are loaded:
   - loader fades out / gets removed from layout
   - `#main-content` becomes visible
   - theme is forced to **dark** on initial load
   - “Say Hello” link is set to `mailto:` or web Gmail depending on screen width

### Interaction flow
- **Theme switch**:
  - user toggles checkbox → JS updates the `<html>` class and localStorage
- **On-scroll reveal**:
  - IntersectionObserver watches elements with `.reveal`
  - when they enter viewport → `.visible` is added
- **Certificate modal**:
  - clicking a `.certificate-card` sets modal image source from `data-src`
  - modal becomes visible; clicking outside or close button hides it

---

## 3) Tech Stack & Why it’s used

### HTML (Structure)
- `index.html` defines sections:
  - `#home`, `#about`, `#projects`, `#certifications`, `#contact`
- A fixed header contains navigation links and theme toggles.

**Why HTML like this?**
- Simple and fast for a portfolio site.
- Anchors (`href="#about"`, etc.) allow smooth navigation.

### Tailwind CSS (Rapid UI)
Tailwind is loaded via:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

**Why Tailwind CDN?**
- No build step (no npm, no bundler).
- Lets you write UI using utility classes directly in HTML.

### Custom CSS (Brand + Effects)
`styles.css` defines:
- Theme variables using CSS custom properties (e.g., `--bg-color`, `--text-primary`)
- Glassmorphism card effect
- Cloud animation and background layers
- Loader animation
- Modal styling
- Reveal animation base states

**Why separate custom CSS?**
- Tailwind covers most layout, spacing, typography.
- Brand effects (glass, modal, loader, background animation) are easier to maintain in plain CSS.

### Three.js (3D background)
Three.js is loaded via:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

JS creates:
- `THREE.Scene()`
- `THREE.PerspectiveCamera()`
- `THREE.WebGLRenderer()` attached to `<canvas id="bg-canvas">`
- a star field using `THREE.Points` and `THREE.BufferGeometry`

**Why Three.js?**
- It provides a performant GPU-accelerated animated background without heavy manual WebGL.

### JavaScript (Behavior)
All dynamic behavior is in `scripts.js`.

**Why IntersectionObserver?**
- Efficient reveal animations without manual scroll listeners.
- Browsers optimize viewport intersection checks.

---

## 4) Detailed Code Interaction (file-by-file)

### 4.1 `index.html` (structure & hooks)
Key elements and their roles:

- **Loader overlay**:
  - `<div id="loader-container"> ... </div>`
- **Main content wrapper**:
  - `<div id="main-content" style="visibility: hidden;"> ... </div>`
- **Background canvas**:
  - `<canvas id="bg-canvas"></canvas>`
- **Clouds** (pure CSS animation):
  - `<div id="clouds-bg">` and children `.cloud x1 ... x5`
- **Theme toggles**:
  - checkboxes:
    - `#theme-checkbox` (desktop)
    - `#mobile-theme-checkbox` (mobile)
- **Reveal animations**:
  - any element with class `.reveal`
- **Certificate modal**:
  - `#certificate-modal`
  - `#modal-image`
  - `#close-modal`
- **Contact link**:
  - `<a id="contact-link" href="#" ...>Say Hello</a>`

Also note:
- The theme switch uses HTML structure where icons are inside the `.slider`.
- This is important because CSS selectors like `input:checked + .slider ...` depend on adjacency.

### 4.2 `styles.css` (what each section does)
Major blocks:

#### Theme Variables
At top:
- `:root` defines dark theme variables
- `html.light` overrides them

The JS toggles `html.light` by adding/removing the `light` class.

#### Reveal animation
Base CSS:
- `.reveal { opacity: 0; transform: translateY(40px); ... }`
- `.reveal.visible { opacity: 1; transform: translateY(0); }`

JS only toggles `.visible`.

#### Background layers
- `#bg-canvas` is fixed and placed behind content using `z-index: -1`.
- `#clouds-bg` is another fixed background layer:
  - gradient background
  - `opacity: 0` by default
  - becomes visible in light mode via:
    - `html.light #clouds-bg { opacity: 1; }`

#### Cloud animation
`.cloud` elements move horizontally with:
- `@keyframes moveclouds`
- each cloud instance uses different:
  - position, scale, opacity
  - duration: `15s`, `18s`, `20s`, etc.

#### Loader animation
- `#loader-container` covers the screen.
- child `.loader` elements use `@keyframes dot1_`, `dot2_`, `dot3_`.

JS hides loader after `window.load`.

#### Modal
- `#certificate-modal` defaults to:
  - `opacity: 0`
  - `pointer-events: none`
- `.visible` class turns it on:
  - `opacity: 1`
  - `pointer-events: auto`

#### Theme switch CSS
This CSS relies on specific HTML ordering:
- `input:checked + .slider` changes background
- `input:checked + .slider:before` moves the knob
- `input:checked + .slider .sun-icon` / `.moon-icon` control icon visibility

### 4.3 `scripts.js` (logic details)

#### Theme synchronization
Variables:
- `desktopThemeCheckbox` = `#theme-checkbox`
- `mobileThemeCheckbox` = `#mobile-theme-checkbox`
- `htmlEl` = `document.documentElement` (`<html>`)
- `bgCanvas` = `#bg-canvas`

Key functions:
- `syncToggles(isChecked)`:
  - keeps both checkboxes aligned
- `setTheme(theme)`:
  - adds `html.light` class for light mode
  - updates checkboxes
  - controls background canvas opacity
  - (attempts) to change star material color when in light mode
  - stores selection in `localStorage`

**Important implementation detail**
- `setTheme('dark')` / `setTheme('light')` is also called during initial `window.load`.
- There is a deliberate design choice: on first load, theme is forced to dark (see below).

#### Why theme is forced to dark on initial load
In `window.addEventListener('load', ...)`:
```js
setTheme('dark');
```
This overrides `localStorage` for the very first view.

**Effect**:
- regardless of previous choice, the first paint is dark
- then user can toggle.

#### Three.js background initialization
Global state:
- `scene, camera, renderer, stars`
- `mouseX, mouseY`

`init3D()` performs:
1. `scene = new THREE.Scene()`
2. `camera = new THREE.PerspectiveCamera(60, width/height, 1, 1000)`
3. `renderer = new THREE.WebGLRenderer({ canvas: ..., alpha: true })`
4. Creates star positions:
   - `starCount = 8000`
   - `positions` is a Float32Array of xyz triples
   - each coordinate is random within a range (`(Math.random() - 0.5) * 800`)
5. Creates a star field:
   - `stars = new THREE.Points(starGeo, starMaterial)`
6. Adds resize and mouse move listeners.
7. Calls `animate3D()`.

##### Mouse interaction
- `onMouseMove` stores offsets from screen center.
- `animate3D` uses offsets to slightly move the camera:
  - camera x/y drift depends on `mouseX` / `mouseY`
  - this creates subtle parallax.

##### Animation loop
`animate3D()` uses:
- `requestAnimationFrame(animate3D)`
- each frame:
  - updates camera position smoothly
  - rotates the star field slightly
  - renders scene

This produces continuous motion while remaining efficient.

#### On-scroll reveal
```js
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
```
- `threshold: 0.1` means the callback triggers when at least 10% is visible.

This avoids manual scroll math.

#### Certificate modal
- The HTML cards have `data-src` attributes.
- JS does:
  - on click → `modalImage.src = card.getAttribute('data-src')`
  - add `.visible` to modal

Closing:
- close button clicks → remove `.visible`
- clicking the dark overlay (the modal itself) also closes

#### Loading & dynamic contact link
On `window.load`:
- fades loader out (opacity to 0)
- after a short delay (500ms), it sets:
  - loader display to `none`
  - main content visibility to `visible`

Contact link logic:
- uses `window.innerWidth <= 768` to decide:
  - mobile: use `mailto:`
  - desktop: use web Gmail compose link

---

## 5) Background: animation & background switching (deep explanation)

This project uses **two** background systems layered together:

### A) Three.js star canvas (`#bg-canvas`)
- Positioned fixed and behind everything.
- It is a WebGL canvas.
- The star “animation” is created by:
  - rotating the `THREE.Points` object slowly:
    - `stars.rotation.y += 0.0001`
  - continuously rendering each frame.
- The “movement” effect comes from updating the **camera** based on mouse position:
  - camera x and y are smoothly attracted to a mouse-influenced offset.

#### Why `alpha: true` on renderer?
- It lets the canvas be transparent.
- The page background color (from CSS variables) shows through.

#### Why `renderer.setClearColor(0x000000, 0)`?
- Sets clear color alpha to 0 (fully transparent), reinforcing the “transparent background” effect.

### B) Pure CSS clouds overlay (`#clouds-bg`)
- A fixed div that uses:
  - gradient background (sky-like)
  - multiple `.cloud` divs that animate horizontally
- Default visibility:
  - `opacity: 0`
- Light-mode visibility:
  - `html.light #clouds-bg { opacity: 1; }`

#### Why CSS clouds instead of Three.js?
- Lighter-weight for a “soft” atmosphere effect.
- Easy to tune cloud scale, opacity, and speed.

### Switching between backgrounds
The theme system changes:
- `html.light` class presence
- `bgCanvas.style.opacity`

In `setTheme`:
- Light mode:
  - adds `html.light`
  - sets `bgCanvas.style.opacity = '0'` → stars become invisible
  - shows clouds via CSS (because `html.light #clouds-bg { opacity: 1; }`)
- Dark mode:
  - removes `html.light`
  - sets `bgCanvas.style.opacity = '1'` → stars become visible
  - clouds remain hidden because their opacity is 0

So, **light mode = clouds + no stars**, **dark mode = stars + no clouds**.

---

## 6) Commands & Syntax Used (and what they mean)

### 6.1 Browser/HTML
- `defer` (in `<script src="./scripts.js" defer></script>`)
  - downloads the script without blocking parsing
  - executes after HTML parsing completes

### 6.2 Tailwind CDN
- `https://cdn.tailwindcss.com`
  - Tailwind runs at runtime and generates styles based on class usage.

### 6.3 Three.js core APIs
- `new THREE.Scene()`
  - container for all 3D objects
- `new THREE.PerspectiveCamera(fov, aspect, near, far)`
  - camera with perspective projection
- `new THREE.WebGLRenderer({ canvas, alpha: true })`
  - renders the scene into a canvas
- `THREE.BufferGeometry()`
  - efficient geometry for large point clouds
- `new THREE.BufferAttribute(positions, 3)`
  - tells Three.js each point has 3 coordinates (x,y,z)
- `new THREE.Points(geometry, material)`
  - draws many points as one renderable object
- `renderer.render(scene, camera)`
  - draws a single frame

### 6.4 IntersectionObserver
- `new IntersectionObserver(callback, options)`
  - watches elements’ intersection with viewport
- `entry.isIntersecting`
  - true when the element crosses the observer threshold
- `threshold: 0.1`
  - triggers when 10% of the element is visible

### 6.5 DOM manipulation
- `document.getElementById(...)`
- `querySelectorAll(...)`
- `element.classList.add('visible')`
- event listeners:
  - `addEventListener('click', ...)`
  - `addEventListener('mousemove', ...)`
  - `addEventListener('resize', ...)`

### 6.6 Local storage
- `localStorage.setItem('theme', theme)`
- `localStorage.getItem('theme')`

Stores preference across sessions.

---

## 7) Where to find and change specific features

- **Main content & sections**: `portfolio/index.html`
- **Theme variables, animations, glass cards, modal, loader**: `portfolio/styles.css`
- **3D background, theme logic, reveal, modal logic, loader behavior**: `portfolio/scripts.js`

To change:
- Number of stars: `scripts.js` → `const starCount = 8000;`
- Cloud animation speed: `styles.css` → `animation: moveclouds <duration>`
- Reveal animation distance/speed:
  - `.reveal` and `.reveal.visible` rules in `styles.css`
- Modal behavior: `scripts.js` certificate modal section

---

## 8) How to run (static hosting)

Because this is frontend-only, you can run it by opening `index.html` in a browser.

Typical options:
- GitHub Pages
- Any static server (VS Code Live Server, etc.)

---

## 9) Notes / Implementation quirks (intentional or as-is)

1. **Initial theme is forced to dark on load**
   - even though theme preference is stored in localStorage
   - `window.load` calls `setTheme('dark')` unconditionally

2. **3D theme integration**
   - `setTheme` tries to update star material color if `stars` exists
   - `init3D()` calls `animate3D()` immediately, so `stars` becomes available after initialization

3. **Z-index layering**
   - `#bg-canvas` and `#clouds-bg` use `z-index: -1`
   - main content is placed with `z-index: 10` via Tailwind class on `<main class="relative z-10">`

---

## 10) Summary

This project is a modern personal portfolio website:
- Tailwind provides fast responsive layout styling
- Custom CSS provides brand theming (light/dark), glassmorphism, loader/modal visuals, and cloud animation
- JavaScript powers:
  - Three.js starfield with mouse parallax
  - theme toggling between starfield and clouds
  - efficient on-scroll reveal effects
  - clickable certificate modal previews
  - loader overlay and responsive contact link generation

The result is a visually rich, single-page experience that remains lightweight because it uses CDN libraries and static assets.

