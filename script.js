// Tailwind Config
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  }
}

// Default config
const defaultConfig = {
  background_color: '#09090b',
  surface_color: '#131316',
  text_color: '#e4e4e7',
  primary_color: '#6d5afc',
  secondary_color: '#3f3f46',
  font_family: 'Outfit',
  font_size: 16,
  hero_headline: 'Infrastructure for\ndigital excellence',
  hero_subtext: 'We architect, build, and scale digital systems that drive measurable growth. From strategy to deployment — precision at every layer.',
  services_heading: 'Engineered for scale',
  cta_button_text: 'Start a Project'
};

// Navigation
function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.remove('active');
    l.style.color = 'rgba(228,228,231,0.6)';
  });
  const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
    activeLink.style.color = document.documentElement.style.getPropertyValue('--text') || '#e4e4e7';
  }
  document.getElementById('app').scrollTo(0, 0);
  lucide.createIcons();
}

function toggleMobile() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// Contact form - Web3Forms Integration
async function handleSubmit(event) {
  event.preventDefault();

  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const successMsg = document.getElementById("form-success");

  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.success) {
      form.reset();
      submitBtn.style.display = 'none'; // Hides button upon success
      successMsg.classList.remove("hidden");
      lucide.createIcons(); // Reloads the checkmark icon
    } else {
      alert("Something went wrong. Please try again.");
      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;
    }
  } catch (error) {
    alert("Network error. Please check your connection and try again.");
    submitBtn.innerText = "Send Message";
    submitBtn.disabled = false;
  }
}

// Bento card mouse tracking
document.addEventListener('mousemove', (e) => {
  document.querySelectorAll('.bento-card').forEach(card => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
  });
});

// Element SDK
function applyConfig(config) {
  const root = document.documentElement;
  root.style.setProperty('--bg', config.background_color || defaultConfig.background_color);
  root.style.setProperty('--surface', config.surface_color || defaultConfig.surface_color);
  root.style.setProperty('--text', config.text_color || defaultConfig.text_color);
  root.style.setProperty('--primary', config.primary_color || defaultConfig.primary_color);
  root.style.setProperty('--secondary', config.secondary_color || defaultConfig.secondary_color);

  const textColor = config.text_color || defaultConfig.text_color;
  const primary = config.primary_color || defaultConfig.primary_color;
  const font = config.font_family || defaultConfig.font_family;
  const baseSize = config.font_size || defaultConfig.font_size;

  document.body.style.fontFamily = `${font}, Outfit, sans-serif`;

  const headline = document.getElementById('hero-headline');
  if (headline) headline.innerHTML = (config.hero_headline || defaultConfig.hero_headline).replace(/\n/g, '<br>');

  const subtext = document.getElementById('hero-subtext');
  if (subtext) subtext.textContent = config.hero_subtext || defaultConfig.hero_subtext;

  const sh = document.getElementById('services-heading');
  if (sh) sh.textContent = config.services_heading || defaultConfig.services_heading;

  const heroCta = document.getElementById('hero-cta');
  if (heroCta) heroCta.textContent = 'Learn more';

  const navCta = document.getElementById('nav-cta');
  if (navCta) navCta.textContent = 'Learn more';

  document.body.style.fontSize = baseSize + 'px';

  document.querySelectorAll('.nav-link').forEach(l => {
    l.style.setProperty('color', l.classList.contains('active') ? textColor : `rgba(228,228,231,0.6)`);
  });

  const style = document.getElementById('dynamic-nav-style');
  if (style) style.remove();
  const s = document.createElement('style');
  s.id = 'dynamic-nav-style';
  s.textContent = `.nav-link::after { background: ${primary}; } .bento-card:hover { border-color: ${primary}40; } .bento-card::before { background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${primary}0f, transparent 40%); } input:focus, textarea:focus, select:focus { border-color: ${primary} !important; }`;
  document.head.appendChild(s);

  document.querySelectorAll('.btn-primary').forEach(b => {
    b.style.background = primary;
  });

  document.querySelectorAll('.process-line').forEach(l => {
    l.style.background = `linear-gradient(to bottom, ${primary}, transparent)`;
  });

  document.querySelectorAll('.pricing-popular').forEach(c => {
    c.style.borderColor = `${primary}80`;
  });
}

// Init SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => { applyConfig(config); },
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
        { get: () => config.surface_color || defaultConfig.surface_color, set: (v) => { config.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); } },
        { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
        { get: () => config.primary_color || defaultConfig.primary_color, set: (v) => { config.primary_color = v; window.elementSdk.setConfig({ primary_color: v }); } },
        { get: () => config.secondary_color || defaultConfig.secondary_color, set: (v) => { config.secondary_color = v; window.elementSdk.setConfig({ secondary_color: v }); } }
      ],
      fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); } },
      fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); } }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['hero_headline', config.hero_headline || defaultConfig.hero_headline],
      ['hero_subtext', config.hero_subtext || defaultConfig.hero_subtext],
      ['services_heading', config.services_heading || defaultConfig.services_heading],
      ['cta_button_text', config.cta_button_text || defaultConfig.cta_button_text]
    ])
  });
}

// Initialize components
applyConfig(defaultConfig);
lucide.createIcons();
