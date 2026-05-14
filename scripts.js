const desktopThemeCheckbox = document.getElementById('theme-checkbox');
const mobileThemeCheckbox = document.getElementById('mobile-theme-checkbox');
const htmlEl = document.documentElement;
const bgCanvas = document.getElementById('bg-canvas');

const syncToggles = (isChecked) => {
    if (desktopThemeCheckbox) desktopThemeCheckbox.checked = isChecked;
    if (mobileThemeCheckbox) mobileThemeCheckbox.checked = isChecked;
};

const setTheme = (theme) => {
    if (theme === 'light') {
        htmlEl.classList.add('light');
        syncToggles(true);
        bgCanvas.style.opacity = '0';
        if (stars) stars.material.color.setHex(0x334155);
    } else {
        htmlEl.classList.remove('light');
        syncToggles(false);
        bgCanvas.style.opacity = '1';
        if (stars) stars.material.color.setHex(0xaaaaaa);
    }
    localStorage.setItem('theme', theme);
};

if (desktopThemeCheckbox) {
    desktopThemeCheckbox.addEventListener('change', () => {
        setTheme(desktopThemeCheckbox.checked ? 'light' : 'dark');
    });
}
if (mobileThemeCheckbox) {
    mobileThemeCheckbox.addEventListener('change', () => {
        setTheme(mobileThemeCheckbox.checked ? 'light' : 'dark');
    });
}

const savedTheme = localStorage.getItem('theme') || 'dark';

// --- 3D Background Animation with Mouse Interaction ---
let scene, camera, renderer, stars;
let mouseX = 0;
let mouseY = 0;

function init3D() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const starGeo = new THREE.BufferGeometry();
    const starCount = 8000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 800;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        transparent: true
    });
    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);

    setTheme(savedTheme); // Set initial theme after 3D setup
    animate3D();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouseX = event.clientX - window.innerWidth / 2;
    mouseY = event.clientY - window.innerHeight / 2;
}

function animate3D() {
    requestAnimationFrame(animate3D);
    camera.position.x += (mouseX * 0.0002 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.0002 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    stars.rotation.y += 0.0001;
    renderer.render(scene, camera);
}

init3D();

// --- On-scroll reveal animation ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
revealElements.forEach(el => revealObserver.observe(el));

// --- Certificate Modal Logic ---
const modal = document.getElementById('certificate-modal');
const modalImage = document.getElementById('modal-image');
const closeModalBtn = document.getElementById('close-modal');
const certificateCards = document.querySelectorAll('.certificate-card');

certificateCards.forEach(card => {
    card.addEventListener('click', () => {
        modalImage.src = card.getAttribute('data-src');
        modal.classList.add('visible');
    });
});

const hideModal = () => modal.classList.remove('visible');

closeModalBtn.addEventListener('click', hideModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
});

// --- Loading Animation & Dynamic Contact Link Logic ---
window.addEventListener('load', () => {
    // Force dark mode on initial load, ignoring localStorage
    setTheme('dark');

    const loaderContainer = document.getElementById('loader-container');
    const mainContent = document.getElementById('main-content');

    loaderContainer.style.opacity = '0';
    setTimeout(() => {
        loaderContainer.style.display = 'none';
        mainContent.style.visibility = 'visible';
    }, 500);

    const contactLink = document.getElementById('contact-link');
    const mailtoLink = 'mailto:shivakoushik2005@gmail.com';
    const gmailLink = 'https://mail.google.com/mail/?view=cm&fs=1&to=shivakoushik2005@gmail.com';
    contactLink.href = window.innerWidth <= 768 ? mailtoLink : gmailLink;
});

