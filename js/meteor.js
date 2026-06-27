/**
 * Meteor Shower Physics Engine
 * Handles spawning, movement, collision detection, spacecraft, and explosions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('meteorCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        // Handle high DPI displays for crisp rendering
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize);
    resize();

    const meteors = [];
    const particles = [];
    
    // Configuration
    const SPAWN_RATE = 0.002; // 40% of previous 0.005
    const PRIMARY_COLOR = '96, 165, 250'; // #60A5FA Sky Blue
    const WHITE_COLOR = '248, 250, 252'; // #F8FAFC Slate White

    class Meteor {
        constructor() {
            // Base speed much slower (1 to 2.5)
            const speed = (Math.random() * 1.5) + 1;
            
            // Spawn top-left or top-right
            const isLeft = Math.random() > 0.5;
            
            // X position anywhere from edge to middle
            if (isLeft) {
                this.x = Math.random() * (width * 0.5);
                // Angle down-right (approx 45 degrees with slight variance)
                const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1);
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
            } else {
                this.x = width - (Math.random() * (width * 0.5));
                // Angle down-left (approx 135 degrees with slight variance)
                const angle = (Math.PI * 3/4) + (Math.random() * 0.2 - 0.1);
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
            }
            
            this.y = -50;
            
            // 10% chance for a slightly bigger comet
            const isBig = Math.random() > 0.9;
            this.radius = isBig ? (Math.random() * 2 + 2) : (Math.random() * 1 + 0.5);
            
            // Much shorter, realistic fireballs
            this.tailLength = (Math.random() * 20) + 15;
            if (isBig) this.tailLength *= 1.5;
            
            this.color = isBig ? PRIMARY_COLOR : WHITE_COLOR;
            this.active = true;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Real-time particle shedding (smoke/fire trail)
            if (Math.random() > 0.4) {
                // Shed particles slightly behind the head
                const offset = Math.random() * 5;
                const speedMag = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                const px = this.x - (this.vx / speedMag * offset);
                const py = this.y - (this.vy / speedMag * offset);
                particles.push(new Particle(px, py, this.color, true));
            }
            
            // Deactivate if far off screen
            if (this.y > height + this.tailLength || this.x < -this.tailLength || this.x > width + this.tailLength) {
                this.active = false;
            }
        }

        draw() {
            // Normalize velocity to get exact direction vector
            const speedMag = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            const dirX = this.vx / speedMag;
            const dirY = this.vy / speedMag;
            
            // Perpendicular normals for the cone base
            const normX = -dirY;
            const normY = dirX;
            
            const tailEndX = this.x - (dirX * this.tailLength);
            const tailEndY = this.y - (dirY * this.tailLength);
            
            // 1. Teardrop/Cone Volumetric Flame
            ctx.beginPath();
            ctx.moveTo(tailEndX, tailEndY);
            ctx.lineTo(this.x + (normX * this.radius), this.y + (normY * this.radius));
            ctx.arc(this.x, this.y, this.radius, Math.atan2(normY, normX), Math.atan2(-normY, -normX), false);
            ctx.closePath();
            
            const flameGrad = ctx.createLinearGradient(this.x, this.y, tailEndX, tailEndY);
            flameGrad.addColorStop(0, `rgba(${this.color}, 0.9)`);
            flameGrad.addColorStop(0.3, `rgba(${this.color}, 0.5)`);
            flameGrad.addColorStop(1, `rgba(${this.color}, 0)`);
            
            ctx.fillStyle = flameGrad;
            ctx.fill();
            
            // 2. 3D Spherical Head (Offset Radial Gradient)
            const focusX = this.x + (dirX * this.radius * 0.5);
            const focusY = this.y + (dirY * this.radius * 0.5);
            
            const headGrad = ctx.createRadialGradient(focusX, focusY, 0, this.x, this.y, this.radius * 2);
            headGrad.addColorStop(0, '#FFFFFF'); 
            headGrad.addColorStop(0.3, `rgba(${this.color}, 1)`);
            headGrad.addColorStop(1, `rgba(${this.color}, 0)`); 
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = headGrad;
            ctx.fill();
        }
    }



    class Particle {
        constructor(x, y, color, isTrail = false) {
            this.x = x;
            this.y = y;
            
            if (isTrail) {
                // Smoky trail physics (drift slowly, die fast)
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.5;
                this.decay = Math.random() * 0.05 + 0.03; 
            } else {
                // Explosion physics
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3 + 1;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.radius = Math.random() * 2 + 0.5;
                this.decay = Math.random() * 0.02 + 0.015;
            }
            
            this.life = 1.0;
            this.color = color;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
            ctx.fill();
        }
    }

    function createExplosion(x, y) {
        // Spawn 15-25 particles
        const count = Math.floor(Math.random() * 10) + 15;
        
        for (let i = 0; i < count; i++) {
            let color = WHITE_COLOR;
            if (Math.random() > 0.5) color = PRIMARY_COLOR;
            
            particles.push(new Particle(x, y, color));
        }
    }

    function checkCollisions() {
        // Meteor vs Meteor
        for (let i = 0; i < meteors.length; i++) {
            if (!meteors[i].active) continue;
            
            for (let j = i + 1; j < meteors.length; j++) {
                if (!meteors[j].active) continue;
                
                const m1 = meteors[i];
                const m2 = meteors[j];
                
                const dx = m1.x - m2.x;
                const dy = m1.y - m2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                // Collision!
                if (dist < (m1.radius + m2.radius + 15)) {
                    m1.active = false;
                    m2.active = false;
                    
                    const midX = (m1.x + m2.x) / 2;
                    const midY = (m1.y + m2.y) / 2;
                    createExplosion(midX, midY);
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Randomly spawn meteors
        if (Math.random() < SPAWN_RATE) {
            meteors.push(new Meteor());
        }

        // Update and draw meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i];
            m.update();
            if (!m.active) {
                meteors.splice(i, 1);
            } else {
                m.draw();
            }
        }

        checkCollisions();

        // Update and draw explosion particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            if (p.life <= 0) {
                particles.splice(i, 1);
            } else {
                p.draw();
            }
        }

        requestAnimationFrame(animate);
    }

    // Start engine
    animate();
});
