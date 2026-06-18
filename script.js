const data = window.PORTFOLIO_DATA || { roles: [], skills: [], projects: [] };
const translations = window.TRANSLATIONS || {};

const root = document.documentElement;
const header = document.querySelector(".site-header");
const themeToggle = document.querySelector(".theme-toggle");
const langToggle = document.querySelector(".lang-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const typingText = document.querySelector(".typing-text");
const yearElement = document.querySelector("#current-year");

let currentLang = localStorage.getItem("portfolio-lang") || "id";

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
}

const savedTheme = localStorage.getItem("portfolio-theme");
const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
setTheme(savedTheme || (systemPrefersLight ? "light" : "dark"));

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

function setMenuState(open) {
  navLinks?.classList.toggle("open", open);
  menuToggle?.setAttribute("aria-expanded", String(open));
  const key = open ? "menuClose" : "menuOpen";
  menuToggle?.setAttribute("aria-label", getText(key));
  document.body.classList.toggle("menu-open", open);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) setMenuState(false);
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

function getText(key) {
  return translations[currentLang]?.[key] || key;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = getText(key);
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.dataset.i18nHtml;
    el.innerHTML = getText(key);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    el.setAttribute("aria-label", getText(key));
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.dataset.i18nTitle;
    el.setAttribute("title", getText(key));
  });

  const menuOpen = menuToggle?.getAttribute("aria-expanded") === "true";
  const ariaKey = menuOpen ? "menuClose" : "menuOpen";
  menuToggle?.setAttribute("aria-label", getText(ariaKey));

  root.lang = currentLang;

  const langText = langToggle?.querySelector(".lang-text");
  if (langText) {
    langText.textContent = currentLang === "id" ? "EN" : "ID";
    langToggle.title = currentLang === "id" ? "English" : "Indonesia";
  }
}

function renderSkills() {
  const container = document.querySelector("#skills-grid");
  if (!container) return;

  const skillList = currentLang === "en" && data.skills_en ? data.skills_en : data.skills;

  container.innerHTML = skillList.map((skill) => `
    <article class="skill-card reveal">
      <div class="skill-card-header">
        <span class="skill-icon" aria-hidden="true">${skill.icon}</span>
        <h3>${skill.title}</h3>
      </div>
      <div class="skill-list">
        ${skill.items.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function projectLink(project) {
  if (!project.url) {
    return `<span class="project-link" title="${getText("projMissing")}" aria-label="${getText("projMissing")}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17h.01M12 13a3 3 0 1 0-3-3"></path><circle cx="12" cy="12" r="9"></circle></svg>
    </span>`;
  }

  return `<a class="project-link" href="${project.url}" target="_blank" rel="noreferrer" aria-label="${getText("projMissing")}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
  </a>`;
}

function renderProjects() {
  const container = document.querySelector("#projects-grid");
  if (!container) return;

  const projectList = currentLang === "en" && data.projects_en ? data.projects_en : data.projects;

  container.innerHTML = projectList.map((project, index) => `
    <article class="project-card reveal">
      <div class="project-top">
        <span class="project-index">PROJECT / ${String(index + 1).padStart(2, "0")}</span>
        ${projectLink(project)}
      </div>

      <div class="project-body">
        <h3>${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map((technology) => `<span>${technology}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");
}

function restartTyping() {
  const roles = currentLang === "en" && data.roles_en ? data.roles_en : data.roles;

  if (typingText && roles.length) {
    let roleIndex = 0;
    let characterIndex = roles[0].length;
    let deleting = true;

    const type = () => {
      const currentRole = roles[roleIndex];

      if (deleting) {
        characterIndex -= 1;
      } else {
        characterIndex += 1;
      }

      typingText.textContent = currentRole.slice(0, characterIndex);

      let delay = deleting ? 38 : 68;

      if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        delay = 1500;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
      }

      typingTimer = window.setTimeout(type, delay);
    };

    typingTimer = window.setTimeout(type, 1100);
  }
}

let typingTimer = null;

function renderAll() {
  renderSkills();
  renderProjects();
  applyTranslations();
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(element);
  });
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("portfolio-lang", lang);

  if (typingTimer) {
    window.clearTimeout(typingTimer);
    typingTimer = null;
  }

  renderAll();
  if (!reducedMotion && typingText) {
    restartTyping();
  }
  requestAnimationFrame(initReveal);
}

langToggle?.addEventListener("click", () => {
  setLang(currentLang === "id" ? "en" : "id");
});

renderAll();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && typingText) {
  restartTyping();
}

requestAnimationFrame(initReveal);

const sections = [...document.querySelectorAll("main section[id]")];
const navigationItems = [...document.querySelectorAll(".nav-links a")];

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navigationItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
