async function loadProjects() {
    const response = await fetch("projectDetails.json");
    return await response.json();
}

async function buildProjectGrid() {
    const projects = await loadProjects();
    const grid = document.getElementById("projects-grid");

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'glass-element card';
        card.innerHTML = `
            <div class="project-title">${project.title}</div>
            <img src="images/${project.image}">
            <div class="project-text">${project.shortSummary}</div>
        `;
        card.addEventListener('click', () => openModal(project));
        grid.appendChild(card);
    });
}

function openModal(project) {
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-image').src = `images/${project.image}`;
    document.getElementById('modal-description').textContent = project.longSummary;
    document.getElementById('modal-github').href = project.repoURL;
    document.getElementById('modal-github').classList.add('smallButton');
    document.getElementById('modal-backdrop').classList.add('open');
}

function closeModal() {
    document.getElementById('modal-backdrop').classList.remove('open');
}

buildProjectGrid();