/**
 * spark.js — Animated spark trail around profile image
 * Homepage only. Uses an object pool to avoid GC pressure.
 */

(function () {
  var canvas = document.getElementById("sparkCanvas");
  var wrapper = document.getElementById("profileWrapper");

  if (!canvas || !wrapper) return;

  var ctx = canvas.getContext("2d");
  var width, height;

  // --- Configuration ---
  var borderRadius = 24;
  var canvasPadding = 30;
  var pathOffset = 6;
  var speed = 0.006;

  var rustColor = "rgba(255, 77, 46, 0.25)";
  var particleColors = ["#ffffff", "#ffbf00", "#ff4d2e", "#ff8f00"];

  var progress = 0;

  // --- Particle Pool ---
  var MAX_PARTICLES = 600;
  var pool = new Array(MAX_PARTICLES);
  var activeCount = 0;

  function initPool() {
    for (var i = 0; i < MAX_PARTICLES; i++) {
      pool[i] = {
        x: 0, y: 0,
        vx: 0, vy: 0,
        gravity: 0.08,
        life: 0,
        decay: 0,
        size: 0,
        color: "",
        active: false,
      };
    }
  }

  function spawnParticle(x, y) {
    // Find an inactive particle in the pool
    for (var i = 0; i < MAX_PARTICLES; i++) {
      if (!pool[i].active) {
        var p = pool[i];
        var angle = Math.random() * Math.PI * 2;
        var spd = Math.random() * 1.5;

        p.x = x;
        p.y = y;
        p.vx = Math.cos(angle) * spd;
        p.vy = Math.sin(angle) * spd;
        p.gravity = 0.08;
        p.life = 1.0;
        p.decay = Math.random() * 0.04 + 0.02;
        p.size = Math.random() * 2 + 1;
        p.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        p.active = true;
        activeCount++;
        return;
      }
    }
    // Pool exhausted — skip this particle (graceful degradation)
  }

  // --- Resize ---
  function resizeCanvas() {
    var rect = wrapper.getBoundingClientRect();
    width = rect.width + canvasPadding * 2;
    height = rect.height + canvasPadding * 2;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  }

  // --- Path Geometry ---
  function getPointOnPath(pct) {
    var drawW = width - canvasPadding * 2 + pathOffset * 2;
    var drawH = height - canvasPadding * 2 + pathOffset * 2;
    var startX = canvasPadding - pathOffset;
    var startY = canvasPadding - pathOffset;
    var r = borderRadius + pathOffset;

    var straightW = drawW - 2 * r;
    var straightH = drawH - 2 * r;
    var straightLen = straightW * 2 + straightH * 2;
    var cornerLen = 2 * Math.PI * r;
    var totalLen = straightLen + cornerLen;

    var current = totalLen * pct;

    // Top edge
    if (current < straightW) {
      return { x: startX + r + current, y: startY };
    }
    current -= straightW;

    // Top-right corner
    if (current < (Math.PI * r) / 2) {
      var angle = -Math.PI / 2 + (current / ((Math.PI * r) / 2)) * (Math.PI / 2);
      return {
        x: startX + drawW - r + Math.cos(angle) * r,
        y: startY + r + Math.sin(angle) * r,
      };
    }
    current -= (Math.PI * r) / 2;

    // Right edge
    if (current < straightH) {
      return { x: startX + drawW, y: startY + r + current };
    }
    current -= straightH;

    // Bottom-right corner
    if (current < (Math.PI * r) / 2) {
      var angle = (current / ((Math.PI * r) / 2)) * (Math.PI / 2);
      return {
        x: startX + drawW - r + Math.cos(angle) * r,
        y: startY + drawH - r + Math.sin(angle) * r,
      };
    }
    current -= (Math.PI * r) / 2;

    // Bottom edge
    if (current < straightW) {
      return { x: startX + drawW - r - current, y: startY + drawH };
    }
    current -= straightW;

    // Bottom-left corner
    if (current < (Math.PI * r) / 2) {
      var angle = Math.PI / 2 + (current / ((Math.PI * r) / 2)) * (Math.PI / 2);
      return {
        x: startX + r + Math.cos(angle) * r,
        y: startY + drawH - r + Math.sin(angle) * r,
      };
    }
    current -= (Math.PI * r) / 2;

    // Left edge
    if (current < straightH) {
      return { x: startX, y: startY + drawH - r - current };
    }
    current -= straightH;

    // Top-left corner
    var angle = Math.PI + (current / ((Math.PI * r) / 2)) * (Math.PI / 2);
    return {
      x: startX + r + Math.cos(angle) * r,
      y: startY + r + Math.sin(angle) * r,
    };
  }

  // --- Animation Loop ---
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw static rail
    var drawW = width - canvasPadding * 2 + pathOffset * 2;
    var drawH = height - canvasPadding * 2 + pathOffset * 2;
    var startX = canvasPadding - pathOffset;
    var startY = canvasPadding - pathOffset;
    var r = borderRadius + pathOffset;

    ctx.beginPath();
    ctx.roundRect(startX, startY, drawW, drawH, r);
    ctx.strokeStyle = rustColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Calculate spark position
    progress = (progress + speed) % 1;
    var pt = getPointOnPath(progress);

    // Emit particles
    for (var i = 0; i < 12; i++) {
      spawnParticle(pt.x, pt.y);
    }

    // Update and draw particles
    activeCount = 0;
    for (var i = 0; i < MAX_PARTICLES; i++) {
      var p = pool[i];
      if (!p.active) continue;

      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.life -= p.decay;

      if (p.life <= 0) {
        p.active = false;
        continue;
      }

      activeCount++;
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Draw spark head
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    requestAnimationFrame(animate);
  }

  // Init
  initPool();
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  animate();
})();
