const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('app-wrapper');
const buttons = document.querySelectorAll('.glow-target');

canvas.width = 1400;
canvas.height = 1400;

let mouse = { x: -1000, y: -1000 };
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

// Audio logic (Needs a click to start)
const sparkSound = new Audio('https://www.myinstants.com/media/sounds/spark.mp3');
function playSpark() {
    const s = sparkSound.cloneNode();
    s.volume = 0.1;
    s.playbackRate = 0.7 + Math.random();
    s.play().catch(() => {});
}

class FireParticle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * 300;
        this.y = canvas.height;
        this.size = Math.random() * 80 + 40;
        this.speedY = Math.random() * 5 + 3;
        this.speedX = Math.random() * 4 + 1;
        this.life = 1;
        this.decay = Math.random() * 0.006 + 0.003;
    }
    update() {
        
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) {
            this.x += dx / 20;
            this.life -= 0.01; // Fire 'dies' slightly faster if disturbed
        }

        this.y -= this.speedY;
        this.x += this.speedX;
        this.life -= this.decay;
        if (this.life <= 0) this.reset();
    }
    draw() {
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = `rgba(255, ${this.life * 160}, 0, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Spark {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * 150;
        this.y = canvas.height - 100;
        this.sx = (Math.random() - 0.1) * 15;
        this.sy = -(Math.random() * 20 + 5);
        this.life = 1;
    }
    update() {
        this.x += this.sx;
        this.y += this.sy;
        this.sy += 0.3; // Gravity
        this.life -= 0.02;
        if (this.life <= 0) {
            this.reset();
            if(Math.random() > 0.8) playSpark();
        }
    }
    draw() {
        ctx.fillStyle = `rgba(255, 200, 50, ${this.life})`;
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}

let particles = Array.from({length: 130}, () => new FireParticle());
let sparks = Array.from({length: 20}, () => new Spark());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
    let flash = Math.random() > 0.985;
    if (flash) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        wrapper.style.transform = `translate(${Math.random()*6-3}px, ${Math.random()*6-3}px)`;
    } else {
        wrapper.style.transform = `none`;
    }

    particles.forEach(p => { p.update(); p.draw(); });
    sparks.forEach(s => { s.update(); s.draw(); });

   
    buttons.forEach(btn => {
        if (flash || Math.random() > 0.7) btn.classList.add('active-glow');
        else btn.classList.remove('active-glow');
    });

    requestAnimationFrame(animate);
}

// Initial interaction to start the engine
window.addEventListener('click', () => { animate(); }, { once: true });
