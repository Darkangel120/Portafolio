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

    const heroName = document.getElementById('hero-name');
    if (heroName) heroName.textContent = t.hero.name;
    const heroDescription = document.getElementById('hero-description');
    if (heroDescription) heroDescription.textContent = t.hero.description;
    const heroCta = document.getElementById('hero-cta');
    if (heroCta) heroCta.textContent = t.hero.ctaText;
    typeWriter(t.hero.role);

    for (let i = 0; i < t.about.length; i++) {
        const elem = document.getElementById(`about-text-${i}`);
        if (elem) elem.textContent = t.about[i].text;
    }

    /**
     * CARGA DINÁMICA DE SKILLS: Esta sección genera el HTML completo de la sección de habilidades
     * desde el archivo assets/data/skills.json. El JSON contiene categorías (programming, frameworks, databases, tools)
     * con arrays de objetos que incluyen nombre, icono y nivel de habilidad. Se mapean a elementos HTML
     * con barras de progreso y iconos FontAwesome o SVG personalizados para lenguajes como C# y C++.
     */
    const skillsSection = document.getElementById('skills');
    if (skillsSection && t.skillsExtra && t.skillsExtra.skills) {
        const skillsHTML = `
            <h2 id="skills-title"><i class="fas fa-cog"></i> Habilidades Técnicas</h2>
            <div class="skill-subsection">
                <h4 id="skills-sub-title-0"><i class="fas fa-laptop-code"></i> Lenguajes de Programación & Desarrollo Web</h4>
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
                <h4 id="skills-sub-title-1"><i class="fas fa-rocket"></i> Frameworks & Librerías</h4>
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
                <h4 id="skills-sub-title-2"><i class="fas fa-database"></i> Bases de Datos</h4>
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
                <h4 id="skills-sub-title-3"><i class="fas fa-tools"></i> Herramientas de Desarrollo</h4>
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
                <p id="skills-legend" style="text-align: center;">Básico: 20% | Intermedio: 40-60% | Avanzado: 80-100%</p>
            </div>
        `;
        skillsSection.innerHTML = skillsHTML;
    }

    const projectsWrapper = document.querySelector('.projects-wrapper');
    if (projectsWrapper) {
        projectsWrapper.innerHTML = generateProjectCardsHTML(t.projects);
    }

    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    if (testimonialsWrapper) {
        testimonialsWrapper.innerHTML = generateTestimonialCardsHTML(t.testimonials);
    }

    initializeSliders();

    if (window.resetSlidersAnimation) {
        window.resetSlidersAnimation();
    }

    const experienceJobTitle = document.getElementById('experience-job-title');
    if (experienceJobTitle) experienceJobTitle.textContent = t.experience[0].title;
    const experiencePeriod = document.getElementById('experience-period');
    if (experiencePeriod) experiencePeriod.textContent = t.experience[0].period;
    const experienceDesc = document.getElementById('experience-desc');
    if (experienceDesc) experienceDesc.textContent = t.experience[0].description;
    const highlightsContainer = document.querySelector('.experience-highlights');
    if (highlightsContainer) {
        highlightsContainer.innerHTML = t.experience[0].highlights.map(highlight => `
            <div class="highlight-item">
                <i class="fas fa-check-circle"></i>
                <span>${highlight}</span>
            </div>
        `).join('');
    }

    const contactDesc = document.getElementById('contact-desc');
    if (contactDesc) contactDesc.textContent = t.contact.description;
    const contactDirectTitle = document.getElementById('contact-direct-title');
    if (contactDirectTitle) contactDirectTitle.textContent = t.contact.direct_contact;
    const contactIds = ['email', 'github', 'linkedin', 'instagram'];
    for (let i = 0; i < t.contact.links.length; i++) {
        const elem = document.getElementById(`contact-${contactIds[i]}-text`);
        if (elem) elem.textContent = t.contact.links[i].text;
    }

    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = generateFooterHTML(t.general.footer);
    }
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
