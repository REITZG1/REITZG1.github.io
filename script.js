const data = window.PORTFOLIO_DATA || { roles: [], skills: [], projects: [] };

const root = document.documentElement;
const header = document.querySelector(".site-header");
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const typingText = document.querySelector(".typing-text");
const yearElement = document.querySelector("#current-year");

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
  menuToggle?.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
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

function renderSkills() {
  const container = document.querySelector("#skills-grid");
  if (!container) return;

  container.innerHTML = data.skills.map((skill) => `
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
    return `<span class="project-link" title="Dokumentasi akan ditambahkan" aria-label="Dokumentasi akan ditambahkan">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17h.01M12 13a3 3 0 1 0-3-3"></path><circle cx="12" cy="12" r="9"></circle></svg>
    </span>`;
  }

  return `<a class="project-link" href="${project.url}" target="_blank" rel="noreferrer" aria-label="Buka proyek ${project.title}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
  </a>`;
}

function renderProjects() {
  const container = document.querySelector("#projects-grid");
  if (!container) return;

  container.innerHTML = data.projects.map((project, index) => `
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

renderSkills();
renderProjects();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && typingText && data.roles.length) {
  let roleIndex = 0;
  let characterIndex = data.roles[0].length;
  let deleting = true;

  const type = () => {
    const currentRole = data.roles[roleIndex];

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
      roleIndex = (roleIndex + 1) % data.roles.length;
      delay = 350;
    }

    window.setTimeout(type, delay);
  };

  window.setTimeout(type, 1100);
}

const revealElements = () => {
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
};

requestAnimationFrame(revealElements);

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
