// Variables para el modal y zoom
let currentScale = 1;
let isDragging = false;
let startX, startY, initialX, initialY;
let currentX = 0;
let currentY = 0;

// Función para abrir el modal
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImg.src = imgElement.src;
    modalImg.alt = imgElement.alt;

    // Reset zoom and position
    resetZoom();
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Funciones de zoom
function zoomIn() {
    currentScale += 0.25;
    if (currentScale > 3) currentScale = 3;
    updateImageTransform();
}

function zoomOut() {
    currentScale -= 0.25;
    if (currentScale < 0.25) currentScale = 0.25;
    updateImageTransform();
}

function resetZoom() {
    currentScale = 1;
    currentX = 0;
    currentY = 0;
    updateImageTransform();
}

function fitToScreen() {
    const modalImg = document.getElementById('modalImage');
    const modalBody = document.querySelector('.modal-body');

    const imgRect = modalImg.getBoundingClientRect();
    const bodyRect = modalBody.getBoundingClientRect();

    const scaleX = bodyRect.width / imgRect.width;
    const scaleY = bodyRect.height / imgRect.height;
    currentScale = Math.min(scaleX, scaleY, 1);

    currentX = 0;
    currentY = 0;
    updateImageTransform();
}

function updateImageTransform() {
    const modalImg = document.getElementById('modalImage');
    modalImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
}

// Funciones de drag and drop
document.addEventListener('DOMContentLoaded', function () {
    const modalImg = document.getElementById('modalImage');

    modalImg.addEventListener('mousedown', startDrag);
    modalImg.addEventListener('touchstart', startDrag);

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);

    // Cerrar modal al hacer clic fuera de la imagen
    const modal = document.getElementById('imageModal');
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Soporte para teclado
    document.addEventListener('keydown', function (e) {
        if (modal.style.display === 'block') {
            switch (e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case '+':
                case '=':
                    zoomIn();
                    break;
                case '-':
                    zoomOut();
                    break;
                case '0':
                    resetZoom();
                    break;
            }
        }
    });
});

function startDrag(e) {
    if (currentScale <= 1) return; // No permitir drag si no está zoom

    isDragging = true;
    const modalImg = document.getElementById('modalImage');

    if (e.type === 'touchstart') {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    } else {
        startX = e.clientX;
        startY = e.clientY;
    }

    initialX = currentX;
    initialY = currentY;

    modalImg.style.cursor = 'grabbing';
    e.preventDefault();
}

function drag(e) {
    if (!isDragging) return;

    let clientX, clientY;
    if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    currentX = initialX + (clientX - startX);
    currentY = initialY + (clientY - startY);

    updateImageTransform();
    e.preventDefault();
}

function endDrag(e) {
    if (!isDragging) return;

    isDragging = false;
    const modalImg = document.getElementById('modalImage');
    modalImg.style.cursor = 'move';
}

// Función para el efecto de máquina de escribir
function typeWriter() {
    const text = "Sistema de Gestión Empresarial Completo";
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

// Script para menú responsive
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Iniciar el efecto de máquina de escribir cuando la página cargue
document.addEventListener('DOMContentLoaded', function () {
    typeWriter();
});