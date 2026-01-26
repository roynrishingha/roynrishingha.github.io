const canvas = document.getElementById("sparkCanvas");
const wrapper = document.getElementById("profileWrapper");

if (canvas && wrapper) {
  const ctx = canvas.getContext("2d");
  let width, height;

  // --- CONFIGURATION ---
  const borderThickness = 3;
  const borderRadius = 24; // Must match CSS .profile-image border-radius

  // ALIGNMENT SETTINGS
  const canvasPadding = 30; // Must match CSS #sparkCanvas top/left (-30px)
  const pathOffset = 6; // Distance (px) from image edge to spark center

  const speed = 0.006; // Spark speed

  // Colors
  const rustColor = "rgba(255, 77, 46, 0.25)"; // Dim rust rail
  const particleColors = ["#ffffff", "#ffbf00", "#ff4d2e", "#ff8f00"]; // Fire palette

  let progress = 0;
  let particles = [];

  // --- Resize Canvas ---
  function resizeCanvas() {
    const rect = wrapper.getBoundingClientRect();
    // Canvas covers wrapper + padding on all sides
    width = rect.width + canvasPadding * 2;
    height = rect.height + canvasPadding * 2;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  // --- Get Point Along Rounded Rect Path ---
  function getPointOnPath(pct) {
    // Define the rectangle where the spark travels
    // It is centered in the canvas, larger than the image by pathOffset
    const drawW = width - canvasPadding * 2 + pathOffset * 2;
    const drawH = height - canvasPadding * 2 + pathOffset * 2;

    // Start coordinates (inside the padding area)
    const startX = canvasPadding - pathOffset;
    const startY = canvasPadding - pathOffset;

    const r = borderRadius + pathOffset; // Corner radius increases with offset

    // Perimeter calculations
    const straightW = drawW - 2 * r;
    const straightH = drawH - 2 * r;
    const straightLen = straightW * 2 + straightH * 2;
    const cornerLen = 2 * Math.PI * r;
    const totalLen = straightLen + cornerLen;

    let current = totalLen * pct;

    // 1. Top Edge
    if (current < straightW) {
      return { x: startX + r + current, y: startY };
    }
    current -= straightW;

    // 2. Top-Right Corner
    if (current < (Math.PI * r) / 2) {
      const angle =
        -Math.PI / 2 + (current / ((Math.PI * r) / 2)) * (Math.PI / 2);
      return {
        x: startX + drawW - r + Math.cos(angle) * r,
        y: startY + r + Math.sin(angle) * r,
      };
    }
    current -= (Math.PI * r) / 2;

    // 3. Right Edge
    if (current < straightH) {
      return { x: startX + drawW, y: startY + r + current };
    }
    current -= straightH;

    // 4. Bottom-Right Corner
    if (current < (Math.PI * r) / 2) {
      const angle = 0 + (current / ((Math.PI * r) / 2)) * (Math.PI / 2);
      return {
        x: startX + drawW - r + Math.cos(angle) * r,
        y: startY + drawH - r + Math.sin(angle) * r,
      };
    }
    current -= (Math.PI * r) / 2;

    // 5. Bottom Edge
    if (current < straightW) {
      return { x: startX + drawW - r - current, y: startY + drawH };
    }
    current -= straightW;

    // 6. Bottom-Left Corner
    if (current < (Math.PI * r) / 2) {
      const angle =
        Math.PI / 2 + (current / ((Math.PI * r) / 2)) * (Math.PI / 2);
      return {
        x: startX + r + Math.cos(angle) * r,
        y: startY + drawH - r + Math.sin(angle) * r,
      };
    }
    current -= (Math.PI * r) / 2;

    // 7. Left Edge
    if (current < straightH) {
      return { x: startX, y: startY + drawH - r - current };
    }
    current -= straightH;

    // 8. Top-Left Corner
    const angle = Math.PI + (current / ((Math.PI * r) / 2)) * (Math.PI / 2);
    return {
      x: startX + r + Math.cos(angle) * r,
      y: startY + r + Math.sin(angle) * r,
    };
  }

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      // Physics: Pop out in random directions
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.gravity = 0.08; // Sparks fall slightly
      this.life = 1.0;
      this.decay = Math.random() * 0.04 + 0.02;
      this.size = Math.random() * 2 + 1;
      this.color =
        particleColors[Math.floor(Math.random() * particleColors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += this.gravity;
      this.life -= this.decay;
    }

    draw(ctx) {
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Static Rail
    const contentW = width - canvasPadding * 2;
    const contentH = height - canvasPadding * 2;
    const drawW = contentW + pathOffset * 2;
    const drawH = contentH + pathOffset * 2;
    const startX = canvasPadding - pathOffset;
    const startY = canvasPadding - pathOffset;
    const r = borderRadius + pathOffset;

    ctx.beginPath();
    ctx.roundRect(startX, startY, drawW, drawH, r);
    ctx.strokeStyle = rustColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    // 2. Calculate Position
    progress = (progress + speed) % 1;
    const p = getPointOnPath(progress);

    // 3. Emit Particles (More per frame = denser trail)
    for (let i = 0; i < 12; i++) {
      particles.push(new Particle(p.x, p.y));
    }

    // 4. Update Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].life <= 0) particles.splice(i, 1);
    }

    // 5. Draw Spark Head
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    requestAnimationFrame(animate);
  }

  // Init
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  animate();
}
