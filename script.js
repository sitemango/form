// ADD THIS AT THE VERY TOP OF script.js (Line 1):
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('bsf_theme') || 'light';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }

  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('bsf_theme', newTheme);
      applyTheme(newTheme);
    });
  }
}

// THEN INSIDE document.addEventListener('DOMContentLoaded', () => { ... }), CALL IT AT THE TOP:
document.addEventListener('DOMContentLoaded', () => {
  initTheme(); // <--- Add this as the first line inside DOMContentLoaded
  
  // ... rest of your script.js code ...
  
  // 1. Fill Text Config
  document.querySelectorAll('[data-festival-name]').forEach(el => el.textContent = CONFIG.festivalName);
  document.querySelectorAll('[data-organizer]').forEach(el => el.textContent = CONFIG.organizer);
  document.querySelectorAll('[data-tagline]').forEach(el => el.textContent = CONFIG.tagline);
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  document.title = CONFIG.festivalName + ' | ' + CONFIG.organizer;

  const about = document.getElementById('aboutParagraph');
  if (about) about.textContent = CONFIG.about.paragraph;

  const vals = document.getElementById('valuesGrid');
  if (vals) vals.innerHTML = CONFIG.about.values.map(v => 
    `<div class="val-card glass-panel"><div class="ico">${v.icon}</div><h4>${v.title}</h4><p class="text-muted">${v.desc}</p></div>`
  ).join('');

  // 2. Render Competitions
  const compGrid = document.getElementById('compGrid');
  if (compGrid) {
    compGrid.innerHTML = CONFIG.competitions.map(c => 
      `<div class="comp-card glass-panel"><div class="ico">${c.icon}</div><h4>${c.name}</h4></div>`
    ).join('');
  }

  // 3. Render Workshops (Separate Section)
  const workshopGrid = document.getElementById('workshopGrid');
  if (workshopGrid) {
    workshopGrid.innerHTML = CONFIG.workshops.map(w => 
      `<div class="comp-card glass-panel"><div class="ico">${w.icon}</div><h4>${w.name}</h4></div>`
    ).join('');
  }
  
  const closing = document.getElementById('closingNote');
  if (closing) closing.innerHTML = `${CONFIG.closingEvent.icon} <strong>${CONFIG.closingEvent.name}</strong> — हा समारोपाचा कार्यक्रम आहे.`;

  // 4. Render Radio Buttons in Form (Single Enroll)
  const selGrid = document.getElementById('compSelectGrid');
  if (selGrid) {
    selGrid.innerHTML = CONFIG.competitions.map(c => 
      `<label class="comp-sel-item">
        <input type="radio" name="competition" value="${c.id}" data-name="${c.name}">
        <span>${c.icon} ${c.name}</span>
      </label>`
    ).join('');
  }

  // 5. Generate Showcase Gallery (Images 1-15)
  const gallery = document.getElementById('imageGallery');
  if (gallery) {
    let imagesHTML = '';
    for (let i = 1; i <= 15; i++) {
      imagesHTML += `<div class="gallery-item glass-panel"><img src="${i}.jpg" alt="Gallery Moment ${i}" loading="lazy"></div>`;
    }
    gallery.innerHTML = imagesHTML;
  }

  // 6. Mobile Nav
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileNav');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }

  // 7. Init Form Validation
  if (typeof initForm === 'function') initForm();

  // 8. Intersection Observer for Minimal Animations
  if ('IntersectionObserver' in window) {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
  }
});
