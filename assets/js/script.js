// Script para menú responsive
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
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
document.addEventListener('DOMContentLoaded', function() {
    typeWriter();
});
