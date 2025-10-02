const navbar = document.querySelector('.navbar');
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('shrunk');
        header.classList.add('shrunk');
    } else {
        navbar.classList.remove('shrunk');
        header.classList.remove('shrunk');
    }
});

function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Función para reinicializar la animación de sliders después de actualizar el DOM
function resetSlidersAnimation() {
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');

    if (projectsWrapper) {
        projectsWrapper.style.transition = 'none';
        projectsWrapper.style.transform = 'translateX(0)';
        setTimeout(() => {
            projectsWrapper.style.transition = '';
        }, 50);
    }

    if (testimonialsWrapper) {
        testimonialsWrapper.style.transition = 'none';
        testimonialsWrapper.style.transform = 'translateX(0)';
        setTimeout(() => {
            testimonialsWrapper.style.transition = '';
        }, 50);
    }
}

window.resetSlidersAnimation = resetSlidersAnimation;

/**
 * SELECTOR DE IDIOMA: Sistema de cambio de idioma con dropdown persistente.
 * Guarda la selección en localStorage y recarga la página para aplicar traducciones.
 * Maneja eventos de clic en dropdown, selección de idioma y cierre automático.
 * Elimina event listeners antiguos para evitar duplicados.
 */
document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownBtn = document.getElementById('lang-btn');
    const dropdownList = document.getElementById('lang-list');
    const langItems = dropdownList.querySelectorAll('li');

    const savedLang = localStorage.getItem('selectedLang') || 'es';

    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    langItems.forEach(item => {
        item.addEventListener('click', () => {
            const selectedLang = item.getAttribute('data-lang');
            if (selectedLang) {
                localStorage.setItem('selectedLang', selectedLang);
                langItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                dropdownBtn.innerHTML = item.textContent + ' <i class="fas fa-chevron-down"></i>';
                dropdown.classList.remove('show');
                loadLanguage(selectedLang);
                window.location.reload();
            }
        });
    });

    loadLanguage(savedLang);

    langItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-lang') === savedLang) {
            item.classList.add('active');
            dropdownBtn.innerHTML = item.textContent + ' <i class="fas fa-chevron-down"></i>';
        }
    });

    document.addEventListener('click', () => {
        dropdown.classList.remove('show');
    });

    const langEsBtn = document.getElementById('lang-es');
    const langEnBtn = document.getElementById('lang-en');
    if (langEsBtn) langEsBtn.replaceWith(langEsBtn.cloneNode(true));
    if (langEnBtn) langEnBtn.replaceWith(langEnBtn.cloneNode(true));
});
