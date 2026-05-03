// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");

toggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((a) => {
  a.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

// Link ativo conforme seção visível
const sections = ["sobre", "solucoes", "skills", "contato"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const linkById = {};
navLinks.forEach((a) => {
  const hash = a.getAttribute("href") || "";
  if (hash.startsWith("#")) linkById[hash.slice(1)] = a;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const link = linkById[id];
      if (!link) return;

      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("is-active"));
        link.classList.add("is-active");
      }
    });
  },
  { root: null, threshold: 0.55 }
);
sections.forEach((sec) => observer.observe(sec));

// Fallback da imagem do hero
const heroImg = document.getElementById("heroImg");
const heroFallback = document.getElementById("heroFallback");

if (heroImg) {
  heroImg.addEventListener("load", () => {
    if (heroFallback) heroFallback.style.display = "none";
    heroImg.style.display = "block";
  });

  heroImg.addEventListener("error", () => {
    heroImg.style.display = "none";
    if (heroFallback) heroFallback.style.display = "block";
  });
}

// =========================
// DARK / LIGHT MODE
// =========================
const THEME_KEY = "tcd_theme";
const htmlEl = document.documentElement;

const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
const themeText = document.getElementById("themeText");

function getSystemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme) {
  htmlEl.setAttribute("data-theme", theme);
  const isDark = theme === "dark";

  if (themeIcon) themeIcon.textContent = isDark ? "🌙" : "☀️";
  if (themeText) themeText.textContent = isDark ? "Modo escuro" : "Modo claro";
  if (themeBtn) themeBtn.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
}

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;
  return getSystemTheme();
}

// aplica ao carregar
applyTheme(loadTheme());

// alterna ao clicar
themeBtn?.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-theme") || "dark";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});

// se usuário NÃO escolheu manualmente, acompanha o tema do sistema
const mq = window.matchMedia("(prefers-color-scheme: light)");
mq?.addEventListener?.("change", () => {
  const saved = localStorage.getItem(THEME_KEY);
  if (!saved) applyTheme(getSystemTheme());
});

// =========================
// TYPEWRITER (HERO TITLE)
// =========================
(function () {
  const el = document.getElementById("typing");
  if (!el) return;

  const words = [
    "Thales Cambraia Dias",
    "Apaixonado por Tecnologia"
  ];

const typingSpeed = 120;   // velocidade digitando (mais lento)
const deleteSpeed = 70;    // velocidade apagando
const holdTime = 2000;     // pausa quando termina a palavra
const betweenTime = 800;   // pausa antes de começar a próxima

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const currentWord = words[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentWord.slice(0, charIndex);

      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(tick, holdTime);
        return;
      }

      setTimeout(tick, typingSpeed);
    } else {
      charIndex--;
      el.textContent = currentWord.slice(0, charIndex);

      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, betweenTime);
        return;
      }

      setTimeout(tick, deleteSpeed);
    }
  }

  tick();
})();
