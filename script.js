// ============================================
// ARENA HUB — shared behavior
// ============================================

// --- Floating particle background -----------------------------------
function spawnParticles(container, count, colors) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 3 + Math.random() * 6;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    const duration = 9 + Math.random() * 10;
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = (Math.random() * duration) + 's';
    container.appendChild(p);
  }
}

// --- Scroll reveal -----------------------------------------------------
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

// --- Countdown timer -----------------------------------------------------
// Pass a target date string (ISO) via data-target on #countdown
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const target = new Date(el.dataset.target).getTime();

  function tick() {
    const now = Date.now();
    let diff = Math.max(0, target - now);

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    el.querySelector('[data-d]').textContent = String(d).padStart(2, '0');
    el.querySelector('[data-h]').textContent = String(h).padStart(2, '0');
    el.querySelector('[data-m]').textContent = String(m).padStart(2, '0');
    el.querySelector('[data-s]').textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

// --- Nav active link -----------------------------------------------------
function markActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  markActiveNav();
  initReveal();
  initCountdown();
});
