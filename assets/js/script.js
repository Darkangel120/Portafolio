// Script para menú responsive
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Script para encogimiento de la barra de navegación al hacer scroll
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

// Función para el efecto de máquina de escribir
function typeWriter() {
    const text = "Desarrollador Front End Jr";
    const typedTextElement = document.getElementById('typed-text');
    let index = 0;
    let isDeleting = false;

    function type() {
        if (!isDeleting) {
            typedTextElement.textContent = text.substring(0, index + 1);
            index++;
            if (index === text.length) {
                isDeleting = true;
                setTimeout(type, 3000); // Pausa antes de borrar
                return;
            }
        } else {
            typedTextElement.textContent = text.substring(0, index);
            index--;
            if (index === 0) {
                isDeleting = false;
                setTimeout(type, 500); // Pausa antes de volver a escribir
                return;
            }
        }
        setTimeout(type, isDeleting ? 50 : 100); // Velocidad de borrado vs escritura
    }

    type();
}

// Iniciar el efecto de máquina de escribir cuando la página cargue
document.addEventListener('DOMContentLoaded', function () {
    typeWriter();
});
document.addEventListener('DOMContentLoaded', () => {
    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveLink() {
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

    // Initialize sliders
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
});
