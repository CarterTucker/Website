function copyText(el, text) {

    navigator.clipboard.writeText(text);
    const check = el.closest('.contact-choice').querySelector('.copy-check');
    check.classList.add('show');
    setTimeout(() => check.classList.remove('show'), 1500);

}

const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

const fontSize = 14;
let columns, drops;

const verses = [
    "John 3:16",
    "Romans 14:8",
    "Psalm 103:8"
];

const verseDrops = {};

function init() {

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);

}

function draw() {

    ctx.fillStyle = 'rgba(12, 12, 12, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {

        // randomly trigger a verse on this column
        if (!verseDrops[i] && Math.random() > 0.9997) {
            verseDrops[i] = {
                verse: verses[Math.floor(Math.random() * verses.length)],
                charIndex: 0
            };
        }

        let char;

        if (verseDrops[i]) {
            const vd = verseDrops[i];
            char = vd.verse[vd.charIndex] ?? ' ';
            ctx.fillStyle = '#fff';
            vd.charIndex++;

            // clean up once the verse has fully fallen off screen
            if (vd.charIndex > vd.verse.length + canvas.height / fontSize) {
                delete verseDrops[i];
            }
        } else {
            char = Math.floor(Math.random() * 2).toString();
            ctx.fillStyle = Math.random() > 0.95 ? '#fff' : '#555';
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;

    }

}

document.addEventListener('DOMContentLoaded', () => {
    init();
    setInterval(draw, 50);
});

window.addEventListener('resize', init);


// load JSON
async function loadProjects() {

    const response = await fetch("projectDetails.json");
    return await response.json();

}

// make project cards
async function buildProjectGrid() {

    const projects = await loadProjects();
    const grid = document.getElementById("projects-grid");

    const displayedProjects = projects.slice(0, 3);

    displayedProjects.forEach(project => {

        grid.innerHTML += `
            <div class="glass-element card">
                <div class="project-title">${project.title}</div>
                <img src="images/${project.image}">
                <div class="project-text">${project.shortSummary}</div>
            </div>
        `;

    });

}

// call build function
buildProjectGrid();