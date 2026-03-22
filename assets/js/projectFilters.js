// Filtros de proyectos - FUNCIONES GLOBALES
function renderProjectFilter(categories) {
    const filterSelect = document.getElementById("projectFilter");
    if (filterSelect && categories && categories.length > 0) {
        filterSelect.innerHTML = "";
        // Opción "Todas"
        const todasOption = document.createElement("option");
        todasOption.value = "todas";
        todasOption.textContent = window.currentLang === "es" ? "Todas" : "All";
        filterSelect.appendChild(todasOption);

        // Opciones de categorías
        categories.forEach((cat) => {
            if (cat.id !== "todas") {
                const option = document.createElement("option");
                option.value = cat.id;
                option.textContent = cat.name;
                filterSelect.appendChild(option);
            }
        });

        // Event listener para cambio
        filterSelect.onchange = function () {
            filterProjects(this.value, window.translations[window.currentLang].projects);
        };
    }
}

function filterProjects(categoryId, allProjects) {
    let filteredProjects = allProjects;
    if (categoryId !== "todas") {
        filteredProjects = allProjects.filter(
            (project) => project.category === categoryId,
        );
    }

    const projectsWrapper = document.querySelector(".projects-wrapper");
    if (projectsWrapper) {
        projectsWrapper.innerHTML = generateProjectCardsHTML(filteredProjects);
        // Reset sliders
        if (window.resetSlidersAnimation) {
            window.resetSlidersAnimation();
        }
        initializeSliders();
    }
}