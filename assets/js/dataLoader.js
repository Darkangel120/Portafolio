let translations = {};
window.translations = translations;
window.currentLang = localStorage.getItem('selectedLanguage') || 'es';
let currentLang = window.currentLang;

/**
 * Carga archivos JSON de traducciones para un idioma específico.
 * Obtiene todos los archivos JSON requeridos en paralelo y los almacena en el objeto translations.
 * @param {string} lang - Código del idioma (ej. 'es', 'en')
 * @returns {Promise<Object|null>} El objeto de traducciones cargado o null si hay error
 */
async function loadTranslations(lang) {
    try {
        const [nav, hero, about, skills, projects, testimonials, experience, contact, general, skillsExtra] = await Promise.all([
            fetch(`assets/data/${lang.toUpperCase()}/nav.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/hero.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/about.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/skills.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/projects.json`).then(r => r.json()).catch(() => []),
            fetch(`assets/data/${lang.toUpperCase()}/testimonials.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/experience.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/contact.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/general.json`).then(r => r.json()),
            fetch(`assets/data/skills.json`).then(r => r.json()).catch(() => [])
        ]);

        translations[lang] = {
            nav,
            hero,
            about,
            skills,
            projects,
            testimonials,
            experience,
            contact,
            general,
            skillsExtra
        };

        return translations[lang];
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}



// Función para generar solo las tarjetas de proyectos
function generateProjectCardsHTML(data) {
    if (!data || data.length === 0) {
        return '<p>No hay proyectos disponibles.</p>';
    }
    return data.map(project => `
        <div class="project-card" data-project="${project.fileName}" onclick="openProjectModal(this)">
            <img src="${project.image}" alt="${project.title}" loading="lazy" />
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <button class="cta-button">${project.ctaText || 'Ver detalles'}</button>
        </div>
    `).join('');
}

// Función para generar solo las tarjetas de testimonios
function generateTestimonialCardsHTML(data) {
    return data.map(testimonial => `
        <div class="testimonial-card">
            <div class="testimonial-content">
                <div class="testimonial-author">
                    <h3>${testimonial.name}</h3>
                    <p class="testimonial-role">${testimonial.role}</p>
                </div>
                <p>"${testimonial.text}"</p>
            </div>
        </div>
    `).join('');
}



function generateFooterHTML(data) {
    return `© 2024 Oswaldo Gómez. ${data}`;
}

/**
 * Carga y aplica traducciones para un idioma específico en toda la página.
 * Actualiza dinámicamente el contenido de navegación, hero, about, skills, projects, testimonials, experience, contact y footer.
 * Maneja la carga de contenido dinámico para skills desde assets/data/skills.json.
 * @param {string} lang - Código del idioma a cargar (ej. 'es', 'en')
 */
async function loadLanguage(lang) {
    document.documentElement.lang = lang;
    if (!translations[lang]) {
        const data = await loadTranslations(lang);
        if (!data) return;
    }

    const t = translations[lang];

    localStorage.setItem('selectedLanguage', lang);
    currentLang = lang;
    window.currentLang = lang;

    // Nav section
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.innerHTML = `
            <li><a href="#hero">${t.nav.inicio}</a></li>
            <li><a href="#about">${t.nav.sobre_mi}</a></li>
            <li><a href="#skills">${t.nav.habilidades}</a></li>
            <li><a href="#projects">${t.nav.proyectos}</a></li>
            <li><a href="#testimonials">${t.nav.testimonios}</a></li>
            <li><a href="#experience">${t.nav.experiencia}</a></li>
            <li><a href="#contact">${t.nav.contacto}</a></li>
        `;
        const menuToggle = document.getElementById('menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    }

    // Hero section
    const heroName = document.getElementById('hero-name');
    if (heroName) heroName.textContent = t.hero.name;
    const heroDescription = document.getElementById('hero-description');
    if (heroDescription) heroDescription.textContent = t.hero.description;
    const heroCta = document.getElementById('hero-cta');
    if (heroCta) heroCta.textContent = t.hero.ctaText;
    typeWriter(t.hero.role);

    // About section
    const aboutTitle = document.getElementById('about-title');
    if (aboutTitle) aboutTitle.innerHTML = `<i class="fas fa-user"></i> ${t.general.sections.about}`;
    const aboutSection = document.getElementById('about');
    if (aboutSection && t.about) {
        const icons = ['fas fa-user-graduate', 'fas fa-code', 'fas fa-lightbulb', 'fas fa-book-open', 'fas fa-music'];
        const aboutHTML = `
            <div class="about-grid">
                ${t.about.map((item, index) => `
                    <div class="about-card">
                        <i class="${icons[index] || 'fas fa-user'}"></i>
                        <p>${item.text}</p>
                    </div>
                `).join('')}
            </div>
        `;
        aboutSection.insertAdjacentHTML('beforeend', aboutHTML);
    }

    // Skills section
    const skillsTitle = document.getElementById('skills-title');
    if (skillsTitle) skillsTitle.innerHTML = `<i class="fas fa-tools"></i> ${t.general.sections.skills}`;
    const skillsSection = document.getElementById('skills');
    if (skillsSection && t.skillsExtra && t.skillsExtra.skills) {
        const skillsHTML = `
            <div class="skill-subsection">
                <h4 id="skills-sub-title-0"><i class="fas fa-laptop-code"></i> ${t.skills.subsections[0].title}</h4>
                <div class="skills-grid">
                    ${t.skillsExtra.skills.programming.map(skill => `
                        <div class="skill-card">
                            ${skill.icon === 'custom' ? `<svg class="skill-icon" viewBox="0 0 24 24"><text x="12" y="15" text-anchor="middle" font-size="${skill.name.includes('C#') ? '15' : '13'}" fill="currentColor" font-weight="bold" font-family="Arial, sans-serif">${skill.name}</text></svg>` : `<i class="${skill.icon} skill-icon"></i>`}
                            <div class="skill-info">
                                <h5>${skill.name}</h5>
                                <div class="progress-bar"><div class="progress-fill" style="width: ${skill.level}%;"></div></div>
                                ${skill.level}%
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="skill-subsection">
                <h4 id="skills-sub-title-1"><i class="fas fa-rocket"></i> ${t.skills.subsections[1].title}</h4>
                <div class="skills-grid">
                    ${t.skillsExtra.skills.frameworks.map(skill => `
                        <div class="skill-card">
                            <i class="${skill.icon} skill-icon"></i>
                            <div class="skill-info">
                                <h5>${skill.name}</h5>
                                <div class="progress-bar"><div class="progress-fill" style="width: ${skill.level}%;"></div></div>
                                ${skill.level}%
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="skill-subsection">
                <h4 id="skills-sub-title-2"><i class="fas fa-database"></i> ${t.skills.subsections[2].title}</h4>
                <div class="skills-grid">
                    ${t.skillsExtra.skills.databases.map(skill => `
                        <div class="skill-card">
                            <i class="${skill.icon} skill-icon"></i>
                            <div class="skill-info">
                                <h5>${skill.name}</h5>
                                <div class="progress-bar"><div class="progress-fill" style="width: ${skill.level}%;"></div></div>
                                ${skill.level}%
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="skill-subsection">
                <h4 id="skills-sub-title-3"><i class="fas fa-tools"></i> ${t.skills.subsections[3].title}</h4>
                <div class="skills-grid">
                    ${t.skillsExtra.skills.tools.map(skill => `
                        <div class="skill-card">
                            <i class="${skill.icon} skill-icon"></i>
                            <div class="skill-info">
                                <h5>${skill.name}</h5>
                                <div class="progress-bar"><div class="progress-fill" style="width: ${skill.level}%;"></div></div>
                                ${skill.level}%
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="skills-legend">
                <p id="skills-legend" style="text-align: center;">${t.skills.legend}</p>
            </div>
        `;
        skillsSection.insertAdjacentHTML('beforeend', skillsHTML);
    }

    // Projects section
    const projectsTitle = document.getElementById('projects-title');
    if (projectsTitle) projectsTitle.innerHTML = `<i class="fas fa-folder-open"></i> ${t.general.sections.projects}`;
    const projectsWrapper = document.querySelector('.projects-wrapper');
    if (projectsWrapper) {
        projectsWrapper.innerHTML = generateProjectCardsHTML(t.projects);
    }

    // Testimonials section
    const testimonialsTitle = document.getElementById('testimonials-title');
    if (testimonialsTitle) testimonialsTitle.innerHTML = `<i class="fas fa-comments"></i> ${t.general.sections.testimonials}`;
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    if (testimonialsWrapper) {
        testimonialsWrapper.innerHTML = generateTestimonialCardsHTML(t.testimonials);
    }

    initializeSliders();

    if (window.resetSlidersAnimation) {
        window.resetSlidersAnimation();
    }

    // Experience section
    const experienceTitle = document.getElementById('experience-title');
    if (experienceTitle) experienceTitle.innerHTML = `<i class="fas fa-briefcase"></i> ${t.general.sections.experience}`;
    const experienceSection = document.getElementById('experience');
    if (experienceSection && t.experience && t.experience.length > 0) {
        const exp = t.experience[0];
        const experienceHTML = `
            <div class="experience-timeline">
                <div class="experience-card">
                    <div class="experience-header">
                        <div class="experience-icon">
                            <i class="${exp.icon}"></i>
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
                            ${exp.highlights.map(highlight => `
                                <div class="highlight-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${highlight}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        experienceSection.insertAdjacentHTML('beforeend', experienceHTML);
    }

    // Contact section
    const contactTitle = document.getElementById('contact-title');
    if (contactTitle) contactTitle.innerHTML = `<i class="fas fa-envelope"></i> ${t.general.sections.contact}`;
    const contactSection = document.getElementById('contact');
    if (contactSection && t.contact) {
        const contactHTML = `
            <p class="contact-description">${t.contact.description}</p>
            <div class="contact-container">
                <div class="contact-links-container">
                    <h3>${t.contact.direct_contact}</h3>
                    <div class="contact-links">
                        <a href="mailto:dark_angel_12011@hotmail.com" class="contact-link email-link" target="_blank">
                            <i class="fas fa-envelope"></i>
                            <span>${t.contact.links[0].text}</span>
                        </a>
                        <a href="https://github.com/Darkangel120" class="contact-link github-link" target="_blank">
                            <i class="fab fa-github"></i>
                            <span>${t.contact.links[1].text}</span>
                        </a>
                        <a href="https://www.linkedin.com/in/oswaldo-gómez-5b6570383" class="contact-link linkedin-link" target="_blank">
                            <i class="fab fa-linkedin"></i>
                            <span>${t.contact.links[2].text}</span>
                        </a>
                        <a href="https://www.instagram.com/dark_angel_1200?igsh=cXp0OHbudGtwdmdp" class="contact-link instagram-link" target="_blank">
                            <i class="fab fa-instagram"></i>
                            <span>${t.contact.links[3].text}</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
        contactSection.insertAdjacentHTML('beforeend', contactHTML);
    }

    // General section (footer)
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = generateFooterHTML(t.general.footer);
    }

    // SkillsExtra section (already handled in skills)
}

// Función para inicializar sliders
function initializeSliders() {
    // Inicializar slider de proyectos
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtnProjects = document.querySelector('.projects-slider .prev-btn');
    const nextBtnProjects = document.querySelector('.projects-slider .next-btn');
    const dotsContainerProjects = document.querySelector('.projects-slider .slider-dots');

    if (projectsWrapper && projectCards.length > 0) {
        let currentIndexProjects = 0;

        // Activar primera tarjeta
        projectCards[0].classList.add('active');

        // Crear puntos
        dotsContainerProjects.innerHTML = '';
        projectCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndexProjects = index;
                updateProjectsSlider();
            });
            dotsContainerProjects.appendChild(dot);
        });

        // Eventos de botones
        if (prevBtnProjects) {
            prevBtnProjects.addEventListener('click', () => {
                currentIndexProjects = (currentIndexProjects - 1 + projectCards.length) % projectCards.length;
                updateProjectsSlider();
            });
        }
        if (nextBtnProjects) {
            nextBtnProjects.addEventListener('click', () => {
                currentIndexProjects = (currentIndexProjects + 1) % projectCards.length;
                updateProjectsSlider();
            });
        }

        function updateProjectsSlider() {
            projectsWrapper.style.transform = `translateX(-${currentIndexProjects * 100}%)`;
            projectCards.forEach((card, index) => {
                card.classList.toggle('active', index === currentIndexProjects);
            });
            const dots = dotsContainerProjects.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndexProjects);
            });
        }
    }

    // Inicializar slider de testimonios
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtnTestimonials = document.querySelector('.testimonials-slider .prev-btn');
    const nextBtnTestimonials = document.querySelector('.testimonials-slider .next-btn');
    const dotsContainerTestimonials = document.querySelector('.testimonials-slider .slider-dots');

    if (testimonialsWrapper && testimonialCards.length > 0) {
        let currentIndexTestimonials = 0;

        // Activar primera tarjeta
        testimonialCards[0].classList.add('active');

        // Crear puntos
        dotsContainerTestimonials.innerHTML = '';
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndexTestimonials = index;
                updateTestimonialsSlider();
            });
            dotsContainerTestimonials.appendChild(dot);
        });

        // Eventos de botones
        if (prevBtnTestimonials) {
            prevBtnTestimonials.addEventListener('click', () => {
                currentIndexTestimonials = (currentIndexTestimonials - 1 + testimonialCards.length) % testimonialCards.length;
                updateTestimonialsSlider();
            });
        }
        if (nextBtnTestimonials) {
            nextBtnTestimonials.addEventListener('click', () => {
                currentIndexTestimonials = (currentIndexTestimonials + 1) % testimonialCards.length;
                updateTestimonialsSlider();
            });
        }

        function updateTestimonialsSlider() {
            testimonialsWrapper.style.transform = `translateX(-${currentIndexTestimonials * 100}%)`;
            testimonialCards.forEach((card, index) => {
                card.classList.toggle('active', index === currentIndexTestimonials);
            });
            const dots = dotsContainerTestimonials.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndexTestimonials);
            });
        }
    }
}

// Exportar funciones si se usa módulo
window.loadLanguage = loadLanguage;
window.typeWriter = typeWriter;
window.initializeSliders = initializeSliders;
window.initializeSliders = initializeSliders;
