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
    
function init() {
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
columns = Math.floor(canvas.width / fontSize);
drops = Array(columns).fill(1);
}

function draw() {
// semi-transparent black fade — creates the trail effect
ctx.fillStyle = 'rgba(12, 12, 12, 0.05)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = '#0000ff';
ctx.font = fontSize + 'px monospace';

for (let i = 0; i < drops.length; i++) {
    const char = Math.floor(Math.random() * 2).toString();

    ctx.fillStyle = Math.random() > 0.95 ? '#fff' : '#555';
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    // reset drop to top randomly after it passes the bottom
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