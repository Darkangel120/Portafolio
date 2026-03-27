/* ─── BASE DATA ─────────────────────────────────────── */
const BASE = {
  nombre: "Oswaldo Rafael Gómez Mata",
  email: "dark_angel_12011@hotmail.com",
  telefono: "+58 416 197 7231",
  ubicacion: "Venezuela",
  portfolioURL: "https://darkangel120.github.io/Portafolio",
  portfolio: "Portafolio Web",
  githubURL: "https://github.com/Darkangel120",
  github: "GitHub",
  linkedinURL:
    "https://www.linkedin.com/in/oswaldo-rafael-g%C3%B3mez-mata-5b6570383",
  linkedin: "Linkedin",
};

const EDUCACION = [
  {
    titulo: {
      es: "Ingeniería de Sistemas (En curso)",
      en: "Systems Engineering (In Progress)",
    },
    institucion: "Universidad UNEFA – Venezuela",
    periodo: { es: "2021 – Presente", en: "2021 – Present" },
  },
  {
    titulo: {
      es: "Programación Orientada a Objetos – Python",
      en: "Object-Oriented Programming – Python",
    },
    institucion: { es: "Certificación en línea", en: "Online Certification" },
    periodo: "2025",
  },
  {
    titulo: { es: "Diseño UX/UI", en: "UX/UI Design" },
    institucion: { es: "Certificación en línea", en: "Online Certification" },
    periodo: "2025",
  },
];

const IDIOMAS = [
  {
    es: "Español",
    en: "Spanish",
    nivel: { es: "Nativo", en: "Native" },
    pct: 100,
  },
  {
    es: "Inglés",
    en: "English",
    nivel: {
      es: "A2-B1 (Básico-Intermedio)",
      en: "A2-B1 (Basic-Intermediate)",
    },
    pct: 35,
  },
];

const PROFILES = {
  general: {
    label: { es: "Desarrollador de Software", en: "Software Developer" },
    resumen: {
      es: "Desarrollador con experiencia práctica construyendo aplicaciones web y de escritorio a medida. Enfocado en soluciones intuitivas, escalables y accesibles. Dominio de Python, HTML5, CSS3, JavaScript, Flask, MySQL y Git.",
      en: "Developer with hands-on experience building custom web and desktop applications. Focused on intuitive, scalable, and accessible solutions. Proficient in Python, HTML5, CSS3, JavaScript, Flask, MySQL, and Git.",
    },
    skills: [
      "Python",
      "Flask",
      "HTML5 / CSS3",
      "JavaScript",
      "MySQL",
      "SQLite",
      "Git / GitHub",
      "UX/UI Design",
    ],
    exp: [
      {
        titulo: {
          es: "Desarrollador Independiente",
          en: "Independent Developer",
        },
        empresa: {
          es: "Freelance – Venezuela",
          en: "Self-Employed – Venezuela",
        },
        periodo: { es: "2025 – Presente", en: "2025 – Present" },
        puntos: [
          {
            es: "Desarrollo de aplicaciones web y de escritorio a medida para clientes.",
            en: "Built custom web and desktop applications for clients.",
          },
          {
            es: "Entrega de soluciones funcionales, escalables e intuitivas.",
            en: "Delivered functional, scalable, and intuitive solutions.",
          },
        ],
      },
    ],
  },
  datascience: {
    label: { es: "Científico de Datos", en: "Data Scientist" },
    resumen: {
      es: "Desarrollador con formación en Ingeniería de Sistemas y experiencia práctica en Python, enfocado en análisis de datos, modelado estadístico y visualización. Dominio de pandas, NumPy y Matplotlib para extraer insights accionables desde datos. Gestión de bases de datos con MySQL y SQLite.",
      en: "Systems Engineering student with hands-on Python experience, focused on data analysis, statistical modeling, and visualization. Proficient in pandas, NumPy, and Matplotlib to extract actionable insights from data. Database management with MySQL and SQLite.",
    },
    skills: [
      "Python",
      "pandas",
      "NumPy",
      "Matplotlib / Seaborn",
      "SQL / SQLite",
      "MySQL",
      "Jupyter Notebooks",
      "Git / GitHub",
      "Estadística básica",
    ],
    exp: [
      {
        titulo: {
          es: "Desarrollador & Analista de Datos",
          en: "Developer & Data Analyst",
        },
        empresa: {
          es: "Freelance – Venezuela",
          en: "Self-Employed – Venezuela",
        },
        periodo: { es: "2025 – Presente", en: "2025 – Present" },
        puntos: [
          {
            es: "Procesamiento y análisis de datasets con Python (pandas, NumPy) para proyectos a medida.",
            en: "Processed and analyzed datasets using Python (pandas, NumPy) for custom client projects.",
          },
          {
            es: "Construcción de dashboards y visualizaciones con Matplotlib y Seaborn.",
            en: "Built dashboards and visualizations using Matplotlib and Seaborn.",
          },
          {
            es: "Gestión de bases de datos relacionales (MySQL, SQLite) para almacenamiento de resultados.",
            en: "Managed relational databases (MySQL, SQLite) for results storage.",
          },
        ],
      },
    ],
  },
  backend: {
    label: {
      es: "Desarrollador Backend Python",
      en: "Python Backend Developer",
    },
    resumen: {
      es: "Desarrollador Backend con experiencia en Python y Flask construyendo APIs RESTful y aplicaciones de servidor robustas. Gestión de bases de datos relacionales con MySQL y SQLite. Orientado a código limpio, bien estructurado y mantenible.",
      en: "Backend Developer with Python and Flask experience building RESTful APIs and robust server-side applications. Skilled in relational database management with MySQL and SQLite. Focused on clean, well-structured, and maintainable code.",
    },
    skills: [
      "Python",
      "Flask",
      "REST APIs",
      "MySQL",
      "SQLite",
      "Git / GitHub",
      "Autenticación / JWT",
      "POO / Clean Code",
    ],
    exp: [
      {
        titulo: {
          es: "Desarrollador Backend – Freelance",
          en: "Freelance Backend Developer",
        },
        empresa: {
          es: "Freelance – Venezuela",
          en: "Self-Employed – Venezuela",
        },
        periodo: { es: "2025 – Presente", en: "2025 – Present" },
        puntos: [
          {
            es: "Diseño e implementación de APIs RESTful con Python + Flask.",
            en: "Designed and implemented RESTful APIs using Python + Flask.",
          },
          {
            es: "Modelado y gestión de bases de datos relacionales (MySQL, SQLite).",
            en: "Modeled and managed relational databases (MySQL, SQLite).",
          },
          {
            es: "Desarrollo de aplicaciones de escritorio con lógica de negocio en Python.",
            en: "Developed desktop applications with Python business logic.",
          },
        ],
      },
    ],
  },
  frontend: {
    label: { es: "Desarrollador Frontend", en: "Frontend Developer" },
    resumen: {
      es: "Desarrollador Frontend con sólido dominio de HTML5, CSS3 y JavaScript, con integración de backends en Python/Flask. Diseño de interfaces accesibles, responsivas y centradas en el usuario. Experiencia en UX/UI y buenas prácticas de diseño.",
      en: "Frontend Developer with strong command of HTML5, CSS3, and JavaScript, integrating Python/Flask backends. Designs accessible, responsive, user-centered interfaces. UX/UI experience and solid design best practices.",
    },
    skills: [
      "HTML5 / CSS3",
      "JavaScript (ES6+)",
      "Diseño Responsivo",
      "UX/UI Design",
      "Python / Flask (integración)",
      "Git / GitHub",
      "Accesibilidad Web",
    ],
    exp: [
      {
        titulo: {
          es: "Desarrollador Frontend – Freelance",
          en: "Freelance Frontend Developer",
        },
        empresa: {
          es: "Freelance – Venezuela",
          en: "Self-Employed – Venezuela",
        },
        periodo: { es: "2025 – Presente", en: "2025 – Present" },
        puntos: [
          {
            es: "Maquetación de interfaces responsivas con HTML5, CSS3 y JavaScript.",
            en: "Built responsive interfaces with HTML5, CSS3, and JavaScript.",
          },
          {
            es: "Integración de frontends con APIs Flask/Python.",
            en: "Integrated frontends with Flask/Python APIs.",
          },
          {
            es: "Aplicación de principios UX/UI para mejorar experiencia de usuario.",
            en: "Applied UX/UI principles to improve user experience.",
          },
        ],
      },
    ],
  },
  webdev: {
    label: { es: "Desarrollador Web", en: "Web Developer" },
    resumen: {
      es: "Desarrollador Web especializado en tecnologías frontend nativas: HTML5, CSS3 y JavaScript puro. Construcción de sitios web accesibles, responsivos y optimizados sin dependencia de frameworks pesados.",
      en: "Web Developer specialized in native frontend technologies: HTML5, CSS3, and vanilla JavaScript. Builds accessible, responsive, and optimized websites without reliance on heavy frameworks.",
    },
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript (Vanilla)",
      "Diseño Responsivo",
      "SEO Básico",
      "Git / GitHub",
      "Accesibilidad Web (WCAG)",
      "UX/UI Design",
    ],
    exp: [
      {
        titulo: {
          es: "Desarrollador Web – Freelance",
          en: "Freelance Web Developer",
        },
        empresa: {
          es: "Freelance – Venezuela",
          en: "Self-Employed – Venezuela",
        },
        periodo: { es: "2025 – Presente", en: "2025 – Present" },
        puntos: [
          {
            es: "Creación de sitios web estáticos y dinámicos con HTML5, CSS3 y JS puro.",
            en: "Created static and dynamic websites with HTML5, CSS3, and vanilla JS.",
          },
          {
            es: "Implementación de diseños responsivos compatibles con múltiples dispositivos.",
            en: "Implemented responsive designs compatible with multiple devices.",
          },
          {
            es: "Optimización de rendimiento y accesibilidad web.",
            en: "Optimized web performance and accessibility.",
          },
        ],
      },
    ],
  },
  fullstack: {
    label: {
      es: "Desarrollador Full Stack Python",
      en: "Python Full Stack Developer",
    },
    resumen: {
      es: "Desarrollador Full Stack con dominio end-to-end del stack web: frontend con HTML5/CSS3/JavaScript y backend con Python/Flask. Diseño y gestión de bases de datos relacionales, construcción de APIs RESTful y despliegue de aplicaciones completas.",
      en: "Full Stack Developer with end-to-end web stack mastery: frontend with HTML5/CSS3/JavaScript and backend with Python/Flask. Designs and manages relational databases, builds RESTful APIs, and deploys complete applications.",
    },
    skills: [
      "Python / Flask",
      "HTML5 / CSS3 / JavaScript",
      "REST APIs",
      "MySQL / SQLite",
      "Git / GitHub",
      "UX/UI Design",
      "Aplicaciones de escritorio",
      "POO / Clean Code",
    ],
    exp: [
      {
        titulo: {
          es: "Desarrollador Full Stack – Freelance",
          en: "Freelance Full Stack Developer",
        },
        empresa: {
          es: "Freelance – Venezuela",
          en: "Self-Employed – Venezuela",
        },
        periodo: { es: "2025 – Presente", en: "2025 – Present" },
        puntos: [
          {
            es: "Desarrollo end-to-end de aplicaciones web: frontend (HTML/CSS/JS) + backend (Python/Flask).",
            en: "End-to-end web app development: frontend (HTML/CSS/JS) + backend (Python/Flask).",
          },
          {
            es: "Diseño de APIs RESTful y gestión de bases de datos (MySQL, SQLite).",
            en: "Designed RESTful APIs and managed databases (MySQL, SQLite).",
          },
          {
            es: "Despliegue y mantenimiento de aplicaciones para clientes reales.",
            en: "Deployed and maintained applications for real clients.",
          },
        ],
      },
    ],
  },
};

/* ─── STATE ─────────────────────────────────────────── */
let lang = "es";
let currentFormat = "americana";
let currentProfile = "general";

function t(v) {
  if (typeof v === "string") return v;
  return v[lang] || v.es || "";
}

/* ─── BUILDERS ──────────────────────────────────────── */

function buildAmericana(prof) {
  const p = PROFILES[prof];
  const expHTML = p.exp
    .map(
      (e) => `
    <div class="exp-block">
      <div class="exp-top">
        <div>
          <div class="exp-title">${t(e.titulo)}</div>
          <div class="exp-company">${t(e.empresa)}</div>
        </div>
        <div class="exp-period">${t(e.periodo)}</div>
      </div>
      <ul class="exp-bullets">${e.puntos.map((pt) => `<li>${t(pt)}</li>`).join("")}</ul>
    </div>`,
    )
    .join("");

  const eduHTML = EDUCACION.map(
    (e) => `
    <div class="edu-block">
      <div class="edu-title">${t(e.titulo)}</div>
      <div class="edu-inst">${t(e.institucion)}</div>
      <div class="edu-period">${t(e.periodo)}</div>
    </div>`,
  ).join("");

  const skillsHTML = p.skills
    .map((s) => `<span class="skill-chip">${s}</span>`)
    .join("");
  const langsHTML = IDIOMAS.map(
    (l) => `
    <div class="lang-item">
      <div class="lang-name">${t(l)} <span style="font-weight:400;color:var(--muted);font-size:.78rem">– ${t(l.nivel)}</span></div>
      <div class="lang-bar-outer"><div class="lang-bar-inner" style="width:${l.pct}%"></div></div>
    </div>`,
  ).join("");

  const sumKey = lang === "es" ? "es" : "en";

  document.getElementById("cv-americana").innerHTML = `
    <div class="am-header">
      <div class="am-photo-fallback"><img src = "../assets/img/foto.webp"></div>
      <div>
        <div class="am-name">${BASE.nombre}</div>
        <div class="am-title">${t(p.label)}</div>
        <div class="am-contact">
          <span><i class="fa-solid fa-envelope"></i> ${BASE.email}</span>
          <span><i class="fa-solid fa-phone"></i> ${BASE.telefono}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${BASE.ubicacion}</span>
        </div>
        <div class="am-links">
          <a href="${BASE.portfolioURL}"><i class="fa-solid fa-address-card"></i> ${BASE.portfolio}</a>
          <a href="${BASE.githubURL}"><i class="fa-brands fa-github"></i> ${BASE.github}</a>
          <a href="${BASE.linkedinURL}"><i class="fa-brands fa-linkedin"></i> ${BASE.linkedin}</a>
        </div>
      </div>
    </div>
    <div class="am-body">
      <div class="am-main">
        <div class="am-section">
          <div class="am-h">${lang === "es" ? "Resumen Profesional" : "Professional Summary"}</div>
          <div class="am-summary">${t(p.resumen)}</div>
        </div>
        <div class="am-section">
          <div class="am-h">${lang === "es" ? "Experiencia Laboral" : "Work Experience"}</div>
          ${expHTML}
        </div>
        <div class="am-section">
          <div class="am-h">${lang === "es" ? "Educación" : "Education"}</div>
          ${eduHTML}
        </div>
      </div>
      <div class="am-side">
        <div class="am-section">
          <div class="am-h">${lang === "es" ? "Habilidades" : "Skills"}</div>
          <div class="skills-list">${skillsHTML}</div>
        </div>
        <div class="am-section" style="margin-top:18px">
          <div class="am-h">${lang === "es" ? "Idiomas" : "Languages"}</div>
          ${langsHTML}
        </div>
      </div>
    </div>`;
}

function buildEuropea(prof) {
  const p = PROFILES[prof];
  const expHTML = p.exp
    .map(
      (e) => `
    <div class="eu-exp-block">
      <div class="eu-exp-header">
        <div>
          <div class="eu-exp-title">${t(e.titulo)}</div>
          <div class="eu-exp-company">${t(e.empresa)}</div>
        </div>
        <div class="eu-exp-period">${t(e.periodo)}</div>
      </div>
      <ul class="eu-bullets">${e.puntos.map((pt) => `<li>${t(pt)}</li>`).join("")}</ul>
    </div>`,
    )
    .join("");

  const eduHTML = EDUCACION.map(
    (e) => `
    <div class="eu-exp-block">
      <div class="eu-exp-header">
        <div>
          <div class="eu-exp-title">${t(e.titulo)}</div>
          <div class="eu-exp-company">${t(e.institucion)}</div>
        </div>
        <div class="eu-exp-period">${t(e.periodo)}</div>
      </div>
    </div>`,
  ).join("");

  const skillsHTML = p.skills
    .map((s) => `<span class="eu-skill-chip">${s}</span>`)
    .join("");

  const digitalIcons = [
    { icon: "fa-brands fa-python", label: "Python" },
    { icon: "fa-brands fa-html5", label: "HTML5" },
    { icon: "fa-solid fa-database", label: "MySQL / SQLite" },
    { icon: "fa-brands fa-git-alt", label: "Git / GitHub" },
    {
      icon: "fa-solid fa-pen-ruler",
      label: lang === "es" ? "Diseño UX/UI" : "UX/UI Design",
    },
    {
      icon: "fa-solid fa-desktop",
      label:
        lang === "es" ? "Aplicaciones de escritorio" : "Desktop Development",
    },
  ];
  const digitalHTML = digitalIcons
    .map(
      (d) =>
        `<div class="digital-chip"><i class="${d.icon}"></i> ${d.label}</div>`,
    )
    .join("");

  const cefrRows = [
    {
      id: lang === "es" ? "Español" : "Spanish",
      comprOral: lang === "es" ? "Nativo" : "Native",
      comprLect: lang === "es" ? "Nativo" : "Native",
      interOral: lang === "es" ? "Nativo" : "Native",
      exprOral: lang === "es" ? "Nativo" : "Native",
      escritura: lang === "es" ? "Nativo" : "Native",
    },
    {
      id: lang === "es" ? "Inglés" : "English",
      comprOral: "A2",
      comprLect: "B1",
      interOral: "A2",
      exprOral: "A2",
      escritura: "A2",
    },
  ];
  const cefrHTML = cefrRows
    .map(
      (r) =>
        `<tr><td>${r.id}</td><td>${r.comprOral}</td><td>${r.comprLect}</td><td>${r.interOral}</td><td>${r.exprOral}</td><td>${r.escritura}</td></tr>`,
    )
    .join("");

  const euro = lang === "es";

  document.getElementById("cv-europea").innerHTML = `
    <div class="eu-outer">
      <div class="eu-topband">
        <div class="eu-topband-left">${euro ? "CURRÍCULUM VITAE – Formato Europass" : "CURRICULUM VITAE – Europass Format"}</div>
        <div class="eu-topband-right">🇻🇪 🇪🇺</div>
      </div>
      <div class="eu-header">
        <div class="eu-photo-fallback"><img src = "../assets/img/foto.webp"></i></div>
        <div>
          <div class="eu-name">${BASE.nombre}</div>
          <div class="eu-title">${t(p.label)}</div>
        </div>
      </div>
      <div class="eu-body">
        <div class="eu-section">
          <div class="eu-h"><i class="fa-solid fa-id-card"></i> ${euro ? "Información Personal" : "Personal Information"}</div>
          <div class="eu-info-grid">
            <div>
              <div class="eu-row"><span class="eu-lbl">${euro ? "Correo electrónico" : "Email"}</span><span class="eu-val">${BASE.email}</span></div>
              <div class="eu-row"><span class="eu-lbl">${euro ? "Teléfono" : "Phone"}</span><span class="eu-val">${BASE.telefono}</span></div>
              <div class="eu-row"><span class="eu-lbl">${euro ? "Ubicación" : "Location"}</span><span class="eu-val">${BASE.ubicacion}</span></div>
              <div class="eu-row"><span class="eu-lbl">${euro ? "Nacionalidad" : "Nationality"}</span><span class="eu-val">${euro ? "Venezolano" : "Venezuelan"}</span></div>
            </div>
            <div>
              <div class="eu-row"><span class="eu-lbl">Portfolio</span><span class="eu-val"><a href="${BASE.portfolioURL}">${BASE.portfolio}</a></span></div>
              <div class="eu-row"><span class="eu-lbl">GitHub</span><span class="eu-val"><a href="${BASE.githubURL}">${BASE.github}</a></span></div>
              <div class="eu-row"><span class="eu-lbl">LinkedIn</span><span class="eu-val"><a href="${BASE.linkedinURL}">${BASE.linkedin}</a></span></div>
            </div>
          </div>
        </div>

        <div class="eu-section">
          <div class="eu-h"><i class="fa-solid fa-bullseye"></i> ${euro ? "Puesto Deseado" : "Desired Position"}</div>
          <div class="eu-row"><span class="eu-lbl">${euro ? "Puesto" : "Position"}</span><span class="eu-val"><strong>${t(p.label)}</strong></span></div>
        </div>

        <div class="eu-section">
          <div class="eu-h"><i class="fa-solid fa-user-tie"></i> ${euro ? "Perfil Profesional" : "Professional Profile"}</div>
          <p style="font-size:.85rem;line-height:1.65;color:#333">${t(p.resumen)}</p>
        </div>

        <div class="eu-section">
          <div class="eu-h"><i class="fa-solid fa-briefcase"></i> ${euro ? "Experiencia Laboral" : "Work Experience"}</div>
          ${expHTML}
        </div>

        <div class="eu-section">
          <div class="eu-h"><i class="fa-solid fa-graduation-cap"></i> ${euro ? "Educación y Formación" : "Education and Training"}</div>
          ${eduHTML}
        </div>

        <div class="eu-section">
          <div class="eu-h"><i class="fa-solid fa-laptop-code"></i> ${euro ? "Habilidades Técnicas" : "Technical Skills"}</div>
          <div class="eu-skills-list">${skillsHTML}</div>
        </div>

        <div class="eu-section">
          <div class="eu-h"><i class="fa-solid fa-language"></i> ${euro ? "Competencia Lingüística" : "Language Skills"}</div>
          <table class="cefr-table">
            <thead><tr>
              <th>${euro ? "Idioma" : "Language"}</th>
              <th>${euro ? "Comprensión oral" : "Listening"}</th>
              <th>${euro ? "Comprensión lectora" : "Reading"}</th>
              <th>${euro ? "Interacción oral" : "Spoken Interaction"}</th>
              <th>${euro ? "Expresión oral" : "Spoken Production"}</th>
              <th>${euro ? "Escritura" : "Writing"}</th>
            </tr></thead>
            <tbody>${cefrHTML}</tbody>
          </table>
        </div>

        <div class="eu-section">
          <div class="eu-h"><i class="fa-solid fa-microchip"></i> ${euro ? "Competencia Digital" : "Digital Competence"}</div>
          <div class="digital-grid">${digitalHTML}</div>
        </div>
      </div>
    </div>`;
}

function buildATS(prof) {
  const p = PROFILES[prof];
  const euro = lang === "es";

  const expHTML = p.exp
    .map(
      (e) => `
    <div class="ats-exp-block">
      <div class="ats-exp-row">
        <div class="ats-exp-title">${t(e.titulo)}</div>
        <div class="ats-exp-period">${t(e.periodo)}</div>
      </div>
      <div class="ats-exp-company">${t(e.empresa)}</div>
      <ul class="ats-bullets">${e.puntos.map((pt) => `<li>${t(pt)}</li>`).join("")}</ul>
    </div>`,
    )
    .join("");

  const eduHTML = EDUCACION.map(
    (e) => `
    <div class="ats-edu-block">
      <div class="ats-edu-row">
        <div class="ats-edu-title">${t(e.titulo)}</div>
        <div class="ats-edu-period">${t(e.periodo)}</div>
      </div>
      <div class="ats-edu-inst">${t(e.institucion)}</div>
    </div>`,
  ).join("");

  const skillsText = p.skills
    .map((s, i) => `<span>${s}${i < p.skills.length - 1 ? " •" : ""}</span>`)
    .join(" ");

  const langsHTML = IDIOMAS.map(
    (l) => `
    <div class="ats-lang-item">• ${t(l)}: ${t(l.nivel)}</div>`,
  ).join("");

  document.getElementById("cv-ats").innerHTML = `
    <div class="ats-wrap">
      <div style="font-size:.68rem;color:#888;text-align:right;margin-bottom:8px;letter-spacing:.05em">${euro ? "FORMATO ATS – OPTIMIZADO PARA SISTEMAS DE SEGUIMIENTO DE CANDIDATOS" : "ATS FORMAT – OPTIMIZED FOR APPLICANT TRACKING SYSTEMS"}</div>
      <div class="ats-name">${BASE.nombre}</div>
      <div class="ats-contact">
        <span>${BASE.email}</span> |
        <span>${BASE.telefono}</span> |
        <span>${BASE.ubicacion}</span> |
        <span>${BASE.github}</span> |
        <span>${BASE.portfolio}</span>
      </div>

      <div class="ats-section">
        <div class="ats-h">${euro ? "RESUMEN PROFESIONAL" : "PROFESSIONAL SUMMARY"}</div>
        <div class="ats-summary">${t(p.resumen)}</div>
      </div>

      <div class="ats-section">
        <div class="ats-h">${euro ? "HABILIDADES TÉCNICAS" : "TECHNICAL SKILLS"}</div>
        <div class="ats-skills-wrap">${skillsText}</div>
      </div>

      <div class="ats-section">
        <div class="ats-h">${euro ? "EXPERIENCIA LABORAL" : "WORK EXPERIENCE"}</div>
        ${expHTML}
      </div>

      <div class="ats-section">
        <div class="ats-h">${euro ? "EDUCACIÓN" : "EDUCATION"}</div>
        ${eduHTML}
      </div>

      <div class="ats-section">
        <div class="ats-h">${euro ? "IDIOMAS" : "LANGUAGES"}</div>
        ${langsHTML}
      </div>
    </div>`;
}

/* ─── CONTROLS ──────────────────────────────────────── */
function setFormat(fmt) {
  currentFormat = fmt;
  document
    .querySelectorAll("#format-tabs .tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document.querySelectorAll("#format-tabs .tab-btn").forEach((b) => {
    if (
      b.textContent
        .toLowerCase()
        .includes(
          fmt === "americana" ? "american" : fmt === "europea" ? "euro" : "ats",
        ) ||
      (fmt === "americana" && b.textContent.includes("Americano")) ||
      (fmt === "europea" && b.textContent.includes("Europeo")) ||
      (fmt === "ats" && b.textContent.includes("ATS"))
    )
      b.classList.add("active");
  });
  document
    .querySelectorAll(".cv-view")
    .forEach((v) => v.classList.remove("active"));
  document.getElementById("view-" + fmt).classList.add("active");
  rebuildAll();
}

function setProfile(prof) {
  currentProfile = prof;
  document
    .querySelectorAll("#profile-tabs .tab-btn")
    .forEach((b) => b.classList.remove("active"));
  event.currentTarget.classList.add("active");
  rebuildAll();
}

function setLang(l) {
  lang = l;
  document.getElementById("btnES").classList.toggle("active", l === "es");
  document.getElementById("btnEN").classList.toggle("active", l === "en");
  document.getElementById("printLabel").textContent =
    l === "es" ? "Descargar PDF" : "Download PDF";
  document.documentElement.lang = l;
  rebuildAll();
}

function rebuildAll() {
  buildAmericana(currentProfile);
  buildEuropea(currentProfile);
  buildATS(currentProfile);
}

// Fix profile tab click — attach properly
document.querySelectorAll("#profile-tabs .tab-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll("#profile-tabs .tab-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    const profMap = {
      "🧑‍💻 General": "general",
      "📊 Data Science": "datascience",
      "🐍 Backend Python": "backend",
      "🎨 Frontend": "frontend",
      "🌐 Web Dev": "webdev",
      "⚡ Full Stack": "fullstack",
    };
    currentProfile = profMap[this.textContent.trim()] || "general";
    rebuildAll();
  });
});

// Fix format tab click
document.querySelectorAll("#format-tabs .tab-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll("#format-tabs .tab-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    const fmtMap = {
      "🇺🇸 Americano": "americana",
      "🇪🇺 Europeo": "europea",
      "🤖 ATS": "ats",
    };
    const fmt = fmtMap[this.textContent.trim()] || "americana";
    currentFormat = fmt;
    document
      .querySelectorAll(".cv-view")
      .forEach((v) => v.classList.remove("active"));
    document.getElementById("view-" + fmt).classList.add("active");
    rebuildAll();
  });
});

// Initial build
rebuildAll();
