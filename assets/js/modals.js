function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
    document.body.style.overflow = '';
}

function openImageModal(imageSrc) {
    const imageModal = document.getElementById('imageModal');
    const imageModalImg = document.getElementById('imageModalImg');

    if (imageModal && imageModalImg) {
        imageModalImg.src = imageSrc;
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Reset zoom and position
        currentScale = 1;
        currentX = 0;
        currentY = 0;
        updateImageTransform();

        // Enable dragging
        enableDrag(imageModalImg);
    }
}

let currentScale = 1;
let currentX = 0;
let currentY = 0;

function updateImageTransform() {
    const imageModalImg = document.getElementById('imageModalImg');
    imageModalImg.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
}

function enableDrag(element) {
    let isDragging = false;
    let startX, startY;

    element.style.cursor = 'grab';

    element.onmousedown = function(e) {
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        element.style.cursor = 'grabbing';
        e.preventDefault();
    };

    document.onmouseup = function() {
        isDragging = false;
        element.style.cursor = 'grab';
    };

    document.onmousemove = function(e) {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        updateImageTransform();
    };
}

// Zoom controls
document.getElementById('zoomIn').addEventListener('click', () => {
    currentScale += 0.1;
    updateImageTransform();
});

document.getElementById('zoomOut').addEventListener('click', () => {
    if (currentScale > 0.2) {
        currentScale -= 0.1;
        updateImageTransform();
    }
});

document.getElementById('resetZoom').addEventListener('click', () => {
    currentScale = 1;
    currentX = 0;
    currentY = 0;
    updateImageTransform();
});

function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }

    if (event.target.classList.contains('image-modal')) {
        closeImageModal();
    }
});

/**
 * MODAL DE PROYECTOS: Carga y muestra información detallada de proyectos desde archivos JSON.
 * Obtiene datos dinámicos según el idioma actual y genera HTML estructurado con secciones:
 * - Acerca del proyecto (lista de puntos)
 * - Características (grid con iconos)
 * - Tecnologías utilizadas (stack técnico)
 * - Capturas de pantalla (galería con modal de imágenes)
 * Maneja errores de carga y muestra mensaje alternativo.
 * @param {HTMLElement} card - Elemento de tarjeta del proyecto que contiene data-project
 */
function openProjectModal(card) {
    const projectName = card.dataset.project;
    if (!projectName) return;

    fetch(`assets/data/${window.currentLang.toUpperCase()}/${projectName}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const logoSrc = data.logo;
            const projectTitleElement = document.getElementById('projectTitle');
            projectTitleElement.innerHTML = logoSrc ? `<img src="${logoSrc}" alt="Logo del proyecto" style="width: 50px; height: auto; margin-right: 10px; vertical-align: middle;"> ${data.title}` : data.title;

            const content = document.getElementById('projectContent');
            const modalTitles = window.translations[window.currentLang].general.modal;
            content.innerHTML = `
                <div class="modal-section modal-about">
                    <h3><i class="fas fa-info-circle"></i> ${modalTitles.about}</h3>
                    <ul>
                        ${data.about.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-section modal-features">
                    <h3><i class="fas fa-star"></i> ${modalTitles.features}</h3>
                    <div class="features-grid">
                        ${data.features.map(f => `<div class="feature-item"><i class="${f.icon}"></i><p>${f.text}</p></div>`).join('')}
                    </div>
                </div>
                <div class="modal-section modal-tech">
                    <h3><i class="fas fa-cogs"></i> ${modalTitles.tech}</h3>
                    <div class="tech-stack">
                        ${data.tech.map(t => `<div class="tech-item"><i class="${t.icon}"></i><h4>${t.title}</h4><p>${t.desc}</p></div>`).join('')}
                    </div>
                </div>
                <div class="modal-section screenshots-section">
                    <h3><i class="fas fa-image"></i> ${modalTitles.screenshots}</h3>
                    <div class="screenshots-grid">
                        ${data.screenshots.map(s => `<div class="screenshot-card" onclick="openImageModal('${s.src}')"><img src="${s.src}" alt="${s.alt}" loading="lazy"><h4>${s.title}</h4><p>${s.desc}</p></div>`).join('')}
                    </div>
                </div>
            `;

            openModal('projectModal');
        })
        .catch(error => {
            console.error('Error loading project data:', error);
            document.getElementById('projectTitle').textContent = 'Error';
            document.getElementById('projectContent').innerHTML = '<p>Error al cargar los datos del proyecto.</p>';
            openModal('projectModal');
        });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeImageModal();
    }
});
