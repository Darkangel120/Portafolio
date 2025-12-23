let translations = {};
window.translations = translations;
window.currentLang = localStorage.getItem('selectedLanguage') || 'es';
let currentLang = window.currentLang;

/**
 * EFECTO DE MÁQUINA DE ESCRIBIR: Implementa un efecto de escritura y borrado automático
 * en el elemento #typed-text. Escribe el texto carácter por carácter, pausa 3 segundos,
 * luego borra carácter por carácter, y repite el ciclo. Velocidad de escritura: 100ms,
 * velocidad de borrado: 50ms.
 * @param {string} text - El texto a escribir y borrar
 */
function typeWriter(text) {
    const typedTextElement = document.getElementById('typed-text');
    let index = 0;
    let isDeleting = false;

    function type() {
        if (!isDeleting) {
            typedTextElement.textContent = text.substring(0, index + 1);
            index++;
            if (index === text.length) {
                isDeleting = true;
                setTimeout(type, 3000);
                return;
            }
        } else {
            typedTextElement.textContent = text.substring(0, index);
            index--;
            if (index === 0) {
                isDeleting = false;
                setTimeout(type, 500);
                return;
            }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }

    type();
}

/**
 * Carga archivos JSON de traducciones para un idioma específico.
 * Obtiene todos los archivos JSON requeridos en paralelo y los almacena en el objeto translations.
 * @param {string} lang - Código del idioma (ej. 'es', 'en')
 * @returns {Promise<Object|null>} El objeto de traducciones cargado o null si hay error
 */
async function loadTranslations(lang) {
    try {
        const [nav, hero, about, skills, projects, testimonials, experience, contact, general, skillsExtra, music] = await Promise.all([
            fetch(`assets/data/${lang.toUpperCase()}/nav.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/hero.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/about.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/skills.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/projects.json`).then(r => r.json()).catch(() => []),
            fetch(`assets/data/${lang.toUpperCase()}/testimonials.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/experience.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/contact.json`).then(r => r.json()),
            fetch(`assets/data/${lang.toUpperCase()}/general.json`).then(r => r.json()),
            fetch(`assets/data/skills.json`).then(r => r.json()).catch(() => []),
            fetch(`assets/data/${lang.toUpperCase()}/music.json`).then(r => r.json())
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
            skillsExtra,
            music
        };

        return translations[lang];
    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
}



// Función para generar skeletons de proyectos
function generateProjectSkeletonsHTML(count = 3) {
    return Array(count).fill().map(() => `
        <div class="skeleton-project-card">
            <div class="skeleton skeleton-project-image"></div>
            <div class="skeleton skeleton-project-title"></div>
            <div class="skeleton skeleton-project-description"></div>
            <div class="skeleton skeleton-project-description"></div>
            <div class="skeleton skeleton-project-button"></div>
        </div>
    `).join('');
}

// Función para generar skeletons de testimonios
function generateTestimonialSkeletonsHTML(count = 3) {
    return Array(count).fill().map(() => `
        <div class="skeleton-testimonial-card">
            <div class="skeleton skeleton-testimonial-name"></div>
            <div class="skeleton skeleton-testimonial-role"></div>
            <div class="skeleton skeleton-testimonial-text"></div>
            <div class="skeleton skeleton-testimonial-text"></div>
            <div class="skeleton skeleton-testimonial-text"></div>
        </div>
    `).join('');
}

// Función para generar skeletons de habilidades
function generateSkillsSkeletonsHTML() {
    const subsections = ['programming', 'frameworks', 'databases', 'tools'];
    return subsections.map(subsection => `
        <div class="skill-subsection">
            <h4><i class="fas fa-tools"></i> <div class="skeleton" style="height: 1.6rem; width: 200px; display: inline-block;"></div></h4>
            <div class="skills-grid">
                ${Array(4).fill().map(() => `
                    <div class="skeleton-skill-card">
                        <div class="skeleton skeleton-skill-icon"></div>
                        <div class="skeleton-skill-info">
                            <div class="skeleton skeleton-skill-name"></div>
                            <div class="skeleton skeleton-skill-progress"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Función para generar skeletons de about
function generateAboutSkeletonsHTML(count = 5) {
    return `
        <div class="about-grid">
            ${Array(count).fill().map(() => `
                <div class="skeleton-about-card">
                    <div class="skeleton skeleton-about-icon"></div>
                    <div class="skeleton skeleton-about-text"></div>
                    <div class="skeleton skeleton-about-text"></div>
                </div>
            `).join('')}
        </div>
    `;
}

// Función para generar skeletons de experiencia
function generateExperienceSkeletonsHTML() {
    return `
        <div class="experience-timeline">
            <div class="skeleton-experience-card">
                <div class="skeleton-experience-header">
                    <div class="skeleton skeleton-experience-icon"></div>
                    <div class="skeleton-experience-info">
                        <div class="skeleton skeleton-experience-title"></div>
                        <div class="skeleton skeleton-experience-period"></div>
                    </div>
                </div>
                <div class="skeleton-experience-content">
                    <div class="skeleton skeleton-experience-description"></div>
                    <div class="skeleton skeleton-experience-description"></div>
                    <div class="skeleton skeleton-experience-highlight"></div>
                    <div class="skeleton skeleton-experience-highlight"></div>
                    <div class="skeleton skeleton-experience-highlight"></div>
                </div>
            </div>
        </div>
    `;
}



// Función para generar skeletons de contacto
function generateContactSkeletonsHTML() {
    return `
        <p class="contact-description"><div class="skeleton" style="height: 1.2rem; width: 80%; margin: 0 auto;"></div></p>
        <div class="skeleton-contact-container">
            <div class="skeleton-contact-links-container">
                <div class="skeleton skeleton-contact-title"></div>
                <div class="skeleton-contact-link">
                    <div class="skeleton skeleton-contact-icon"></div>
                    <div class="skeleton skeleton-contact-text"></div>
                </div>
                <div class="skeleton-contact-link">
                    <div class="skeleton skeleton-contact-icon"></div>
                    <div class="skeleton skeleton-contact-text"></div>
                </div>
                <div class="skeleton-contact-link">
                    <div class="skeleton skeleton-contact-icon"></div>
                    <div class="skeleton skeleton-contact-text"></div>
                </div>
                <div class="skeleton-contact-link">
                    <div class="skeleton skeleton-contact-icon"></div>
                    <div class="skeleton skeleton-contact-text"></div>
                </div>
            </div>
        </div>
    `;
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

    // Ocultar títulos inicialmente para mostrar solo skeletons
    document.getElementById('about-title').style.display = 'none';
    document.getElementById('skills-title').style.display = 'none';
    document.getElementById('projects-title').style.display = 'none';
    document.getElementById('testimonials-title').style.display = 'none';
    document.getElementById('experience-title').style.display = 'none';
    document.getElementById('contact-title').style.display = 'none';

    setupNavSection(t);
    setupHeroSection(t);
    setupAboutSection(t);
    setupSkillsSection(t);
    setupProjectsSection(t);
    setupTestimonialsSection(t);
    setupExperienceSection(t);
    setupContactSection(t);
    setupFooterSection(t);

    initializeSliders();

    if (window.resetSlidersAnimation) {
        window.resetSlidersAnimation();
    }
}

// Helper functions for each section to reduce complexity

function setupNavSection(t) {
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
        // Close menu when clicking on a nav link
        const navLinkElements = navLinks.querySelectorAll('a');
        navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}

function setupHeroSection(t) {
    const heroName = document.getElementById('hero-name');
    if (heroName) heroName.textContent = t.hero.name;
    const heroDescription = document.getElementById('hero-description');
    if (heroDescription) heroDescription.textContent = t.hero.description;
    const heroCta = document.getElementById('hero-cta');
    if (heroCta) heroCta.textContent = t.hero.ctaText;
    typeWriter(t.hero.role);
}

function setupAboutSection(t) {
    const aboutTitle = document.getElementById('about-title');
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.innerHTML = generateAboutSkeletonsHTML(t.about.length);
        setTimeout(() => {
            if (t.about && aboutTitle) {
                aboutTitle.innerHTML = `<i class="fas fa-user"></i> ${t.general.sections.about}`;
                const icons = ['fas fa-user-graduate', 'fas fa-code', 'fas fa-lightbulb', 'fas fa-book-open', 'fas fa-music'];
                const aboutHTML = `
                    <h2 id="about-title"><i class="fas fa-user"></i> ${t.general.sections.about}</h2>
                    <div class="about-grid">
                        ${t.about.map((item, index) => `
                            <div class="about-card">
                                <i class="${icons[index] || 'fas fa-user'}"></i>
                                <p>${item.text}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
                aboutSection.innerHTML = aboutHTML;
            }
        }, 2000);
    }
}

function setupSkillsSection(t) {
    const skillsTitle = document.getElementById('skills-title');
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsSection.innerHTML = generateSkillsSkeletonsHTML();
        setTimeout(() => {
            if (t.skillsExtra?.skills && skillsTitle) {
                skillsTitle.style.display = 'block';
                skillsTitle.innerHTML = `<i class="fas fa-tools"></i> ${t.general.sections.skills}`;
                const learningText = window.currentLang === 'es' ? 'En proceso de aprendizaje :)' : 'In learning progress :)';
                function generateSkillCard(skill) {
                    let fontSize = skill.name.includes('C#') ? '15' : '13';
                    const iconHTML = skill.icon === 'custom'
                        ? `<svg class="skill-icon" viewBox="0 0 24 24"><text x="12" y="15" text-anchor="middle" font-size="${fontSize}" fill="currentColor" font-weight="bold" font-family="Arial, sans-serif">${skill.name}</text></svg>`
                        : `<i class="${skill.icon} skill-icon"></i>`;
                    return `
                        <div class="skill-card">
                            ${iconHTML}
                            <div class="skill-info">
                                <h5>${skill.name}</h5>
                            </div>
                        </div>
                    `;
                }
                const skillsHTML = `
                    <h2 id="skills-title"><i class="fas fa-tools"></i> ${t.general.sections.skills}</h2>
                    <div class="skill-subsection">
                        <h4 id="skills-sub-title-0"><i class="fas fa-laptop-code"></i> ${t.skills.subsections[0].title}</h4>
                        <div class="skills-grid">
                            ${t.skillsExtra.skills.programming.map(skill => generateSkillCard(skill)).join('')}
                        </div>
                    </div>
                    <div class="skill-subsection">
                        <h4 id="skills-sub-title-1"><i class="fas fa-rocket"></i> ${t.skills.subsections[1].title}</h4>
                        <div class="skills-grid">
                            ${t.skillsExtra.skills.frameworks.map(skill => generateSkillCard(skill)).join('')}
                        </div>
                    </div>
                    <div class="skill-subsection">
                        <h4 id="skills-sub-title-2"><i class="fas fa-database"></i> ${t.skills.subsections[2].title}</h4>
                        <div class="skills-grid">
                            ${t.skillsExtra.skills.databases.map(skill => generateSkillCard(skill)).join('')}
                        </div>
                    </div>
                    <div class="skill-subsection">
                        <h4 id="skills-sub-title-3"><i class="fas fa-tools"></i> ${t.skills.subsections[3].title}</h4>
                        <div class="skills-grid">
                            ${t.skillsExtra.skills.tools.map(skill => generateSkillCard(skill)).join('')}
                        </div>
                    </div>
                    <div class="skills-legend">
                        <p id="skills-legend" style="text-align: center;">${t.skills.legend}</p>
                    </div>
                `;
                skillsSection.innerHTML = skillsHTML;
            }
        }, 2000);
    }
}

function setupProjectsSection(t) {
    const projectsTitle = document.getElementById('projects-title');
    const projectsWrapper = document.querySelector('.projects-wrapper');
    if (projectsWrapper) {
        projectsWrapper.innerHTML = generateProjectSkeletonsHTML(t.projects.length || 3);
        setTimeout(() => {
            if (projectsTitle) {
                projectsTitle.style.display = 'block';
                projectsTitle.innerHTML = `<i class="fas fa-folder-open"></i> ${t.general.sections.projects}`;
            }
            projectsWrapper.innerHTML = generateProjectCardsHTML(t.projects);
            initializeSliders();
        }, 2000);
    }
}

function setupTestimonialsSection(t) {
    const testimonialsTitle = document.getElementById('testimonials-title');
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    if (testimonialsWrapper) {
        testimonialsWrapper.innerHTML = generateTestimonialSkeletonsHTML(t.testimonials.length);
        setTimeout(() => {
            if (testimonialsTitle) {
                testimonialsTitle.style.display = 'block';
                testimonialsTitle.innerHTML = `<i class="fas fa-comments"></i> ${t.general.sections.testimonials}`;
            }
            testimonialsWrapper.innerHTML = generateTestimonialCardsHTML(t.testimonials);
            initializeSliders();
        }, 2000);
    }
}

function setupExperienceSection(t) {
    const experienceTitle = document.getElementById('experience-title');
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
        experienceSection.innerHTML = generateExperienceSkeletonsHTML();
        setTimeout(() => {
            if (t.experience && t.experience.length > 0 && experienceTitle) {
                experienceTitle.style.display = 'block';
                experienceTitle.innerHTML = `<i class="fas fa-briefcase"></i> ${t.general.sections.experience}`;
                const exp = t.experience[0];
                const experienceHTML = `
                    <h2 id="experience-title"><i class="fas fa-briefcase"></i> ${t.general.sections.experience}</h2>
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
                experienceSection.innerHTML = experienceHTML;
            }
        }, 2000);
    }
}

function setupContactSection(t) {
    const contactTitle = document.getElementById('contact-title');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.innerHTML = generateContactSkeletonsHTML();
        setTimeout(() => {
            if (t.contact && contactTitle) {
                contactTitle.style.display = 'block';
                contactTitle.innerHTML = `<i class="fas fa-envelope"></i> ${t.general.sections.contact}`;
                const contactHTML = `
                    <h2 id="contact-title"><i class="fas fa-envelope"></i> ${t.general.sections.contact}</h2>
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
                contactSection.innerHTML = contactHTML;
            }
        }, 2000);
    }
}

function setupFooterSection(t) {
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
            projectCards.forEach((card, index) => {
                if (index === currentIndexProjects) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
            const dots = dotsContainerProjects.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndexProjects);
            });
        }

        // Auto-slide para proyectos cada 8 segundos
        setInterval(() => {
            currentIndexProjects = (currentIndexProjects + 1) % projectCards.length;
            updateProjectsSlider();
        }, 6000);
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
            testimonialCards.forEach((card, index) => {
                if (index === currentIndexTestimonials) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
            const dots = dotsContainerTestimonials.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndexTestimonials);
            });
        }

        // Auto-slide para testimonios cada 6 segundos
        setInterval(() => {
            currentIndexTestimonials = (currentIndexTestimonials + 1) % testimonialCards.length;
            updateTestimonialsSlider();
        }, 6000);
    }
}

// Exportar funciones si se usa módulo
window.loadLanguage = loadLanguage;
window.typeWriter = typeWriter;
window.initializeSliders = initializeSliders;
