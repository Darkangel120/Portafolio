// Filtros de proyectos - FUNCIONES GLOBALES
function renderProjectFilter(categories) {
    console.log('renderProjectFilter called with categories:', categories); // DEBUG
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
        console.log('Filter select populated with', filterSelect.options.length, 'options'); // DEBUG
    } else {
        console.warn('renderProjectFilter: No select or empty categories'); // DEBUG
    }
}

function filterProjects(categoryId, allProjects) {
    console.log('filterProjects called:', categoryId, 'projects count:', allProjects?.length || 0); // DEBUG
    let filteredProjects = allProjects;
    if (categoryId !== "todas") {
        filteredProjects = allProjects.filter(
            (project) => project.category === categoryId,
        );
    }
    console.log('Filtered projects count:', filteredProjects.length); // DEBUG

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