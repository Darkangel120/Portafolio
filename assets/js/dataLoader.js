// Variables globales para traducciones
let translations = {};
window.translations = translations;
window.currentLang = localStorage.getItem('selectedLanguage') || 'es';
let currentLang = window.currentLang;

// Función para cargar archivos JSON
async function loadTranslations(lang) {
    try {
        const [nav, hero, about, skills, testimonials, experience, contact, general] = await Promise.all([
            fetch(`assets/data/${lang.toUpperCase()}/nav.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/hero.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/about.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/skills.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/testimonials.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/experience.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/contact.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/general.json`).then(r => r.json())
        ]);

        translations[lang] = {
            nav,
            hero,
            about,
            skills,
            testimonials,
            experience,
            contact,
            general
        };

        return translations[lang];
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}

// Función para generar HTML dinámico
function generateHTML(section, data) {
    switch (section) {
        case 'nav':
            return generateNavHTML(data);
        case 'hero':
            return generateHeroHTML(data);
        case 'about':
            return generateAboutHTML(data);
        case 'skills':
            return generateSkillsHTML(data);
        case 'projects':
            return generateProjectsHTML(data);
        case 'testimonials':
            return generateTestimonialsHTML(data);
        case 'experience':
            return generateExperienceHTML(data);
        case 'contact':
            return generateContactHTML(data);
        case 'footer':
            return generateFooterHTML(data);
        default:
            return '';
    }
}

function generateNavHTML(data) {
    return `
        <ul class="nav-links" id="nav-links">
            <li><a href="#hero">${data.inicio}</a></li>
            <li><a href="#about">${data.sobre_mi}</a></li>
            <li><a href="#skills">${data.habilidades}</a></li>
            <li><a href="#projects">${data.proyectos}</a></li>
            <li><a href="#testimonials">${data.testimonios}</a></li>
            <li><a href="#experience">${data.experiencia}</a></li>
            <li><a href="#contact">${data.contacto}</a></li>
        </ul>
        <div class="menu-toggle" id="menu-toggle"><i class="fas fa-bars"></i></div>
    `;
}

function generateHeroHTML(data) {
    return `
        <section id="hero" class="hero">
            <div class="hero-content">
                <img src="assets/img/foto.webp" alt="Foto de Oswaldo Gómez" class="hero-photo">
                <div class="hero-text">
                    <h1>${data.name}</h1>
                    <p class="hero-subtitle">@Darkangel120</p>
                    <p class="hero-description"><span id="typed-text"></span> <br>${data.description}</p>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                        <a href="#about" class="cta-button">${data.ctaText}</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function generateAboutHTML(data) {
    const icons = ["fas fa-user-graduate", "fas fa-code", "fas fa-lightbulb", "fas fa-book-open", "fas fa-music"];
    const cards = data.map((card, index) => `
        <div class="about-card">
            <i class="${icons[index] || card.icon}"></i>
            <p>${card.text}</p>
        </div>
    `).join('');
    return `
        <section id="about" class="section about">
            <h2><i class="fas fa-user"></i> Sobre mí</h2>
            <div class="about-grid">
                ${cards}
            </div>
        </section>
    `;
}

function generateSkillsHTML(data) {
    const skillData = [
        {
            icon: "fas fa-laptop-code",
            skills: [
                { name: "Python", icon: "fab fa-python", progress: 60 },
                { name: "HTML5", icon: "fab fa-html5", progress: 60 },
                { name: "CSS3", icon: "fab fa-css3-alt", progress: 60 },
                { name: "JavaScript", icon: "fab fa-js-square", progress: 40 },
                { name: "Java", icon: "fab fa-java", progress: 40 },
                { name: "C#", icon: "svg", progress: 40 },
                { name: "PHP", icon: "fab fa-php", progress: 40 },
                { name: "C++", icon: "svg", progress: 20 }
            ]
        },
        {
            icon: "fas fa-rocket",
            skills: [
                { name: "Flask", icon: "fas fa-flask", progress: 20 },
                { name: "Flet", icon: "fas fa-object-group", progress: 20 }
            ]
        },
        {
            icon: "fas fa-database",
            skills: [
                { name: "MySQL", icon: "fas fa-database", progress: 60 },
                { name: "SQLite", icon: "fas fa-database", progress: 60 },
                { name: "SQL", icon: "fas fa-database", progress: 60 }
            ]
        },
        {
            icon: "fas fa-tools",
            skills: [
                { name: "Git", icon: "fab fa-git-alt", progress: 40 },
                { name: "GitHub", icon: "fab fa-github", progress: 40 }
            ]
        }
    ];
    const subsections = skillData.map((sub, index) => {
        const skills = sub.skills.map(skill => {
            let iconHTML;
            if (skill.icon === 'svg') {
                if (skill.name === 'C#') {
                    iconHTML = `<svg class="skill-icon" viewBox="0 0 24 24"><text x="12" y="15" text-anchor="middle" font-size="15" fill="currentColor" font-weight="bold" font-family="Arial, sans-serif">C#</text></svg>`;
                } else if (skill.name === 'C++') {
                    iconHTML = `<svg class="skill-icon" viewBox="0 0 24 24"><text x="12" y="15" text-anchor="middle" font-size="13" fill="currentColor" font-weight="bold" font-family="Arial, sans-serif">C++</text></svg>`;
                }
            } else {
                iconHTML = `<i class="${skill.icon} skill-icon"></i>`;
            }
            return `
                <div class="skill-card">
                    ${iconHTML}
                    <div class="skill-info">
                        <h5>${skill.name}</h5>
                        <div class="progress-bar"><div class="progress-fill" style="width: ${skill.progress}%;"></div></div>
                        ${skill.progress}%
                    </div>
                </div>
            `;
        }).join('');
        return `
            <div class="skill-subsection">
                <h4><i class="${sub.icon}"></i> ${data.subsections[index].title}</h4>
                <div class="skills-grid">
                    ${skills}
                </div>
            </div>
        `;
    }).join('');
    return `
        <section id="skills" class="section skills">
            <h2><i class="fas fa-cog"></i> Habilidades Técnicas</h2>
            ${subsections}
            <div class="skills-legend">
                <p style="text-align: center;">${data.legend}</p>
            </div>
        </section>
    `;
}

async function generateProjectsHTML(data) {
    const projectCards = await Promise.all(data.map(async project => {
        try {
            const projectData = await fetch(`assets/data/${currentLang.toUpperCase()}/${project.key}.json`).then(r => r.json());
            return `
                <div class="project-card" data-project="${project.key}" onclick="openProjectModal(this)">
                    <h3>${projectData.title}</h3>
                    <p>${projectData.about ? projectData.about[0] : ''}</p>
                    <div class="project-link">${translations[currentLang].general.projects.view_details} <i class="fas fa-eye"></i></div>
                </div>
            `;
        } catch (error) {
            console.error(`Error loading project ${project.key}:`, error);
            return '';
        }
    }));
    return `
        <section id="projects" class="section projects">
            <h2><i class="fas fa-folder-open"></i> Proyectos Destacados</h2>
            <div class="projects-grid">
                ${projectCards.join('')}
            </div>
        </section>
    `;
}

function generateTestimonialsHTML(data) {
    const cards = data.map((testimonial, index) => `
        <div class="testimonial-card ${index === 0 ? 'active' : ''}">
            <div class="testimonial-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <h3>${testimonial.name}</h3>
            <p class="testimonial-role">${testimonial.role}</p>
            <p>${testimonial.text}</p>
        </div>
    `).join('');
    const dots = data.map((_, index) => `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`).join('');
    return `
        <section id="testimonials" class="section testimonials">
            <h2><i class="fas fa-comments"></i> Testimonios</h2>
            <div class="testimonials-slider">
                <button class="slider-btn prev-btn" aria-label="${translations[currentLang].general.previous}"><i class="fas fa-chevron-left"></i></button>
                <div class="testimonials-wrapper">
                    ${cards}
                </div>
                <button class="slider-btn next-btn" aria-label="${translations[currentLang].general.next}"><i class="fas fa-chevron-right"></i></button>
                <div class="slider-dots">
                    ${dots}
                </div>
            </div>
        </section>
    `;
}

function generateExperienceHTML(data) {
    const exp = data[0];
    const highlights = exp.highlights.map(highlight => `
        <div class="highlight-item">
            <i class="fas fa-check-circle"></i>
            <span>${highlight}</span>
        </div>
    `).join('');
    return `
        <section id="experience" class="section experience">
            <h2><i class="fas fa-briefcase"></i> Experiencia Laboral</h2>
            <div class="experience-timeline">
                <div class="experience-card">
                    <div class="experience-header">
                        <div class="experience-icon">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="experience-info">
                            <h3>${exp.title}</h3>
                            <p class="experience-period">${exp.period}</p>
                        </div>
                    </div>
                    <div class="experience-content">
                        <div class="experience-description">
                            <p>${exp.description}</p>
                        </div>
                        <div class="experience-highlights">
                            ${highlights}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function generateContactHTML(data) {
    const hrefs = ["mailto:dark_angel_12011@hotmail.com", "https://github.com/Darkangel120", "https://www.linkedin.com/in/oswaldo-gómez-5b6570383", "https://www.instagram.com/dark_angel_1200?igsh=cXp0OHbudGtwdmdp"];
    const icons = ["fas fa-envelope", "fab fa-github", "fab fa-linkedin", "fab fa-instagram"];
    const classes = ["email-link", "github-link", "linkedin-link", "instagram-link"];
    const texts = data.links.map(link => link.text);
    return `
        <section id="contact" class="section contact">
            <h2><i class="fas fa-envelope"></i> Contacto</h2>
            <p class="contact-description">${data.description}</p>
            <div class="contact-container">
                <div class="contact-links-container">
                    <h3>${data.direct_contact}</h3>
                    <div class="contact-links">
                        ${texts.map((text, index) => `
                            <a href="${hrefs[index]}" class="contact-link ${classes[index]}" target="_blank">
                                <i class="${icons[index]}"></i>
                                <span>${text}</span>
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function generateFooterHTML(data) {
    return `<p>© 2025 Darkangel120. ${data}</p>`;
}

// Función para cargar idioma y actualizar textos
async function loadLanguage(lang) {
    document.documentElement.lang = lang;
    // Cargar traducciones si no están cargadas
    if (!translations[lang]) {
        const data = await loadTranslations(lang);
        if (!data) return;
    }

    const t = translations[lang];

    // Guardar idioma en localStorage
    localStorage.setItem('selectedLanguage', lang);
    currentLang = lang;
    window.currentLang = lang;

    // Actualizar botones de idioma
    document.getElementById('lang-es').classList.toggle('active', lang === 'es');
    document.getElementById('lang-en').classList.toggle('active', lang === 'en');

    // Actualizar navegación
    const navLinks = document.getElementById('nav-links');
    navLinks.innerHTML = `
        <li><a href="#hero">${t.nav.inicio}</a></li>
        <li><a href="#about">${t.nav.sobre_mi}</a></li>
        <li><a href="#skills">${t.nav.habilidades}</a></li>
        <li><a href="#projects">${t.nav.proyectos}</a></li>
        <li><a href="#testimonials">${t.nav.testimonios}</a></li>
        <li><a href="#experience">${t.nav.experiencia}</a></li>
        <li><a href="#contact">${t.nav.contacto}</a></li>
    `;

    // Actualizar hero
    document.getElementById('hero-name').textContent = t.hero.name;
    document.getElementById('hero-description').textContent = t.hero.description;
    document.getElementById('hero-cta').textContent = t.hero.ctaText;

    // Actualizar about
    document.getElementById('about-title').innerHTML = `<i class="fas fa-user"></i> ${t.general.sections.about}`;
    t.about.forEach((card, index) => {
        document.getElementById(`about-text-${index}`).textContent = card.text;
    });

    // Actualizar skills
    document.getElementById('skills-title').innerHTML = `<i class="fas fa-cog"></i> ${t.general.sections.skills}`;
    const skillIcons = ["fas fa-laptop-code", "fas fa-rocket", "fas fa-database", "fas fa-tools"];
    t.skills.subsections.forEach((sub, index) => {
        document.getElementById(`skills-sub-title-${index}`).innerHTML = `<i class="${skillIcons[index]}"></i> ${sub.title}`;
    });
    document.getElementById('skills-legend').textContent = t.skills.legend;

    // Actualizar projects
    document.getElementById('projects-title').innerHTML = `<i class="fas fa-folder-open"></i> ${t.general.sections.projects}`;
    const projectKeys = Array.isArray(t.general.projects) ? t.general.projects : ['inicio-xampp', 'ventasenterprise'];
    const projectsWrapper = document.querySelector('.projects-wrapper');
    projectsWrapper.innerHTML = (await Promise.all(projectKeys.map(async (key, index) => {
        const projectData = await fetch(`assets/data/${lang.toUpperCase()}/${key}.json`).then(r => r.json());
        return `
            <div class="project-card ${index === 0 ? 'active' : ''}" data-project="${key}" onclick="openProjectModal(this)">
                <h3>${projectData.title}</h3>
                <p>${projectData.about ? projectData.about[0] : ''}</p>
                <div class="project-link">${t.general.projects.view_details} <i class="fas fa-eye"></i></div>
            </div>
        `;
    }))).join('');
    const projectDots = document.querySelector('.projects-slider .slider-dots');
    projectDots.innerHTML = projectKeys.map((_, index) => `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`).join('');

    // Actualizar testimonials
    document.getElementById('testimonials-title').innerHTML = `<i class="fas fa-comments"></i> ${t.general.sections.testimonials}`;
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    testimonialsWrapper.innerHTML = t.testimonials.map((testimonial, index) => `
        <div class="testimonial-card ${index === 0 ? 'active' : ''}">
            <div class="testimonial-avatar">
                <i class="fas fa-user-circle"></i>
            </div>
            <h3>${testimonial.name}</h3>
            <p class="testimonial-role">${testimonial.role}</p>
            <p>${testimonial.text}</p>
        </div>
    `).join('');
    const dots = document.querySelector('.testimonials-slider .slider-dots');
    dots.innerHTML = t.testimonials.map((_, index) => `<span class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`).join('');

    // Actualizar experience
    document.getElementById('experience-title').innerHTML = `<i class="fas fa-briefcase"></i> ${t.general.sections.experience}`;
    const exp = t.experience[0];
    document.getElementById('experience-job-title').textContent = exp.title;
    document.getElementById('experience-period').textContent = exp.period;
    document.getElementById('experience-desc').textContent = exp.description;
    exp.highlights.forEach((highlight, index) => {
        document.getElementById(`experience-highlight-${index}`).textContent = highlight;
    });

    // Actualizar contact
    document.getElementById('contact-title').innerHTML = `<i class="fas fa-envelope"></i> ${t.general.sections.contact}`;
    document.getElementById('contact-desc').textContent = t.contact.description;
    document.getElementById('contact-direct-title').textContent = t.contact.direct_contact;
    t.contact.links.forEach((link, index) => {
        document.getElementById(`contact-${['email', 'github', 'linkedin', 'instagram'][index]}-text`).textContent = link.text;
    });

    // Actualizar footer
    document.querySelector('footer').innerHTML = `<p>© 2025 Darkangel120. ${t.general.footer}</p>`;

    // Iniciar efecto de máquina de escribir
    typeWriter(t.hero.role);

    // Re-inicializar sliders y otros scripts
    initializeSliders();
}

// Función para inicializar sliders
function initializeSliders() {
    createSlider(
        '.testimonials-slider',
        '.testimonials-wrapper',
        '.testimonial-card',
        '.testimonials-slider .prev-btn',
        '.testimonials-slider .next-btn',
        '.testimonials-slider .dot'
    );
    createSlider(
        '.projects-slider',
        '.projects-wrapper',
        '.project-card',
        '.projects-slider .prev-btn',
        '.projects-slider .next-btn',
        '.projects-slider .dot'
    );
}

function createSlider(sliderSelector, wrapperSelector, cardSelector, prevBtnSelector, nextBtnSelector, dotSelector) {
    const sliderWrapper = document.querySelector(wrapperSelector);
    const cards = document.querySelectorAll(cardSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const dots = document.querySelectorAll(dotSelector);
    let currentIndex = 0;
    let autoSlideTimer;

    if (!sliderWrapper || cards.length === 0 || !prevBtn || !nextBtn || dots.length === 0) {
        return;
    }

    function updateSlider(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function startAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(() => {
            let newIndex = (currentIndex + 1) % cards.length;
            updateSlider(newIndex);
        }, 8000);
    }

    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = cards.length - 1;
        updateSlider(newIndex);
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= cards.length) newIndex = 0;
        updateSlider(newIndex);
        startAutoSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            updateSlider(index);
            startAutoSlide();
        });
    });

    updateSlider(0);
    startAutoSlide();
}

// Event listeners para botones de idioma
document.getElementById('lang-es').addEventListener('click', () => {
    localStorage.setItem('selectedLanguage', 'es');
    location.reload();
});
document.getElementById('lang-en').addEventListener('click', () => {
    localStorage.setItem('selectedLanguage', 'en');
    location.reload();
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(currentLang);
    // Asegurar que los botones de idioma tengan la clase 'active' correcta
    document.getElementById('lang-es').classList.toggle('active', currentLang === 'es');
    document.getElementById('lang-en').classList.toggle('active', currentLang === 'en');
});
