const canvas = document.getElementById('logoCanvas');
const ctx = canvas.getContext('2d');

// --- CONFIGURACIÓN DEL FONDO ANIMADO (ESTRELLAS) ---
const numStars = 60;
const stars = [];

function initStars() {
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 3 + 1
        });
    }
}
initStars();

// Función para dibujar y animar el fondo
function drawBackground() {
    // --- CAMBIO IMPORTANTE AQUÍ ---
    // En lugar de pintar un fondo sólido, LIMPIAMOS el canvas para que sea transparente.
    // Esto permite que se vea la imagen de fondo de la página web.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Dibujamos y movemos las estrellas (ahora sobre fondo transparente)
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0 - star.radius;
            star.x = Math.random() * canvas.width;
        }
    });
}


// --- CONFIGURACIÓN DEL COHETE ---
let bodyY = 150; 
let targetBodyY = 150;
let windowRadius = 15;
let targetWindowRadius = 15;
let fireY = 220;
let targetFireY = 220;
let fireScale = 1;
let targetFireScale = 1;


// Función principal de dibujado
function drawScene() {
    // 1. Dibujamos las estrellas sobre el canvas transparente
    drawBackground();

    // 2. DIBUJAR EL COHETE (El código del cohete es el mismo)

    // Fuego
    ctx.save();
    ctx.translate(150, fireY);
    ctx.scale(fireScale, fireScale);
    ctx.beginPath();
    ctx.moveTo(-15, 0);
    ctx.lineTo(15, 0);
    ctx.lineTo(0, 50);
    ctx.closePath();
    let gradient = ctx.createLinearGradient(0, 0, 0, 50);
    gradient.addColorStop(0, "yellow");
    gradient.addColorStop(1, "red");
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();

    // Cuerpo
    ctx.save();
    ctx.translate(150, bodyY);
    ctx.beginPath();
    ctx.moveTo(0, -60);
    ctx.lineTo(30, -20);
    ctx.lineTo(30, 50);
    ctx.lineTo(50, 70);
    ctx.lineTo(30, 70);
    ctx.lineTo(-30, 70);
    ctx.lineTo(-50, 70);
    ctx.lineTo(-30, 50);
    ctx.lineTo(-30, -20);
    ctx.closePath();
    ctx.fillStyle = "#e0e0e0";
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(0, -60);
    ctx.lineTo(30, -20);
    ctx.lineTo(-30, -20);
    ctx.closePath();
    ctx.fillStyle = "#ff3344";
    ctx.fill();
    ctx.restore();

    // Ventana
    ctx.save();
    ctx.translate(150, bodyY); 
    ctx.beginPath();
    ctx.arc(0, 10, windowRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#33ccff";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#888";
    ctx.stroke();
    ctx.restore();
}

// Función de animación
function animate() {
    bodyY += (targetBodyY - bodyY) * 0.1;
    windowRadius += (targetWindowRadius - windowRadius) * 0.1;
    fireY += (targetFireY - fireY) * 0.1;
    fireScale += (targetFireScale - fireScale) * 0.1;

    drawScene();
    requestAnimationFrame(animate);
}

// Eventos del ratón
canvas.addEventListener('mouseenter', () => {
    targetBodyY = 110;
    targetWindowRadius = 24;
    targetFireY = 190;
    targetFireScale = 1.8;
});

canvas.addEventListener('mouseleave', () => {
    targetBodyY = 150;
    targetWindowRadius = 15;
    targetFireY = 220;
    targetFireScale = 1;
});

animate();