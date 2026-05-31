const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');

// Ajustar el canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Control de Música
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

musicBtn.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.textContent = "⏸️ Pausar Música";
        musicBtn.style.background = "#333";
    } else {
        bgMusic.pause();
        musicBtn.textContent = "🎵 Reproducir Música";
        musicBtn.style.background = "linear-gradient(45deg, #ff007f, #ff40a0)";
    }
});

// Datos de la galaxia (Planetas orbitando)
const planetData = [
    { text: "Te Amo", imgUrl: "https://via.placeholder.com/150/ff007f/ffffff?text=❤️" },
    { text: "Mi Amor", imgUrl: "https://via.placeholder.com/150/ff007f/ffffff?text=Love" },
    { text: "Me Encantas", imgUrl: "https://via.placeholder.com/150/ff007f/ffffff?text=Snoopy" },
    { text: "Amor de mi vida", imgUrl: "https://via.placeholder.com/150/ff007f/ffffff?text=SpiderMan" },
    { text: "Siempre Juntos", imgUrl: "https://via.placeholder.com/150/ff007f/ffffff?text=Cute" },
    { text: "I Love You", imgUrl: "https://via.placeholder.com/150/ff007f/ffffff?text=You%26Me" }
];

// Estrellas de fondo
const stars = [];
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2,
        alpha: Math.random(),
        speed: 0.01 + Math.random() * 0.015
    });
}

class Planet {
    constructor(text, imgUrl, orbitRadius, speed, angle) {
        this.text = text;
        this.orbitRadius = orbitRadius;
        this.speed = speed;
        this.angle = angle;
        this.size = 50;
        this.img = new Image();
        this.img.src = imgUrl;
    }

    update() {
        this.angle += this.speed;
    }

    draw() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const x = centerX + Math.cos(this.angle) * this.orbitRadius;
        const y = centerY + Math.sin(this.angle) * this.orbitRadius;

        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff007f";
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 0, 127, 0.25)";
        ctx.fill();
        ctx.strokeStyle = "#ff007f";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, this.size - 4, 0, Math.PI * 2);
        ctx.clip();
        try {
            ctx.drawImage(this.img, x - (this.size - 4), y - (this.size - 4), (this.size - 4) * 2, (this.size - 4) * 2);
        } catch (e) {
            ctx.fillStyle = "#000";
            ctx.fill();
        }
        ctx.restore();

        ctx.fillStyle = "#fff";
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(this.text, x, y + this.size + 18);
    }
}

const planets = planetData.map((data, index) => {
    const orbitRadius = 140 + index * 60;
    const speed = 0.004 + (0.003 * (planetData.length - index));
    const startingAngle = (index * (Math.PI * 2)) / planetData.length;
    return new Planet(data.text, data.imgUrl, orbitRadius, speed, startingAngle);
});

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;
        ctx.fillStyle = rgba(255, 255, 255, ${Math.abs(star.alpha)});
        ctx.fillRect(star.x, star.y, star.size, star.size);
    });

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.save();
    ctx.shadowBlur = 40;
    ctx.shadowColor = "#ffcc00";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = "#ffcc00";
    ctx.fill();
    ctx.restore();

    planets.forEach(planet => {
        planet.update();
        planet.draw();
    });

    requestAnimationFrame(animate);
}

animate();