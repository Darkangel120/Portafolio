const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

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
