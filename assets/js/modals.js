// Variables globales para modales
let currentLang = window.currentLang || 'es';

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal.show');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
    document.body.style.overflow = ''; // Restore scrolling
}

// Image Modal Functions
function openImageModal(imageSrc) {
    const imageModal = document.getElementById('imageModal');
    const imageModalImg = document.getElementById('imageModalImg');

    if (imageModal && imageModalImg) {
        imageModalImg.src = imageSrc;
        imageModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    // Close project modals
    if (event.target.classList.contains('modal')) {
        closeModal();
    }

    // Close image modal
    if (event.target.classList.contains('image-modal')) {
        closeImageModal();
    }
});

// Project Modal Function
function openProjectModal(card) {
    const projectName = card.dataset.project;
    if (!projectName) return;

    fetch(`assets/data/${currentLang.toUpperCase()}/${projectName}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Set title
            document.getElementById('projectTitle').textContent = data.title;

            // Populate content
            const content = document.getElementById('projectContent');
            content.innerHTML = `
                <div class="modal-section">
                    <h3>Sobre el Proyecto</h3>
                    <ul>
                        ${data.about.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="modal-section">
                    <h3>Características Principales</h3>
                    <div class="features-grid">
                        ${data.features.map(f => `<div class="feature-item"><i class="${f.icon}"></i><p>${f.text}</p></div>`).join('')}
                    </div>
                </div>
                <div class="modal-section">
                    <h3>Tecnologías Utilizadas</h3>
                    <div class="tech-stack">
                        ${data.tech.map(t => `<div class="tech-item"><i class="${t.icon}"></i><h4>${t.title}</h4><p>${t.desc}</p></div>`).join('')}
                    </div>
                </div>
                <div class="modal-section screenshots-section">
                    <h3>Capturas de Pantalla</h3>
                    <div class="screenshots-grid">
                        ${data.screenshots.map(s => `<div class="screenshot-card" onclick="openImageModal('${s.src}')"><img src="${s.src}" alt="${s.alt}" loading="lazy"><h4>${s.title}</h4><p>${s.desc}</p></div>`).join('')}
                    </div>
                </div>
            `;

            // Open modal
            openModal('projectModal');
        })
        .catch(error => {
            console.error('Error loading project data:', error);
            // Optionally show error message in modal
            document.getElementById('projectTitle').textContent = 'Error';
            document.getElementById('projectContent').innerHTML = '<p>Error al cargar los datos del proyecto.</p>';
            openModal('projectModal');
        });
}

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closeImageModal();
    }
});
