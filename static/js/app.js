document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".hero__content > *, .hero__visual, .section-title, .section-subtitle, .card, .capability-item, .timeline__item, .project-item, .tech-note",
  );

  const revealOptions = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: "0px 0px -50px 0px", // Offset slightly so it triggers before bottom
  };

  let delayCounter = 0;
  let resetTimeout;

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${delayCounter * 0.1}s`;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Only animate once

        delayCounter++;
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          delayCounter = 0;
        }, 150);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => {
    // Add base style for animation if not present in CSS
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition =
      "opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)";

    revealOnScroll.observe(el);
  });

  // Inject class for visibility
  const style = document.createElement("style");
  style.innerHTML = `
        .is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);

  // 3D TILT EFFECT (Hero Profile)
  const profileWrapper = document.querySelector(".profile-wrapper");
  const profileImage = document.querySelector(".profile-image");

  if (profileWrapper && profileImage) {
    profileWrapper.addEventListener("mousemove", (e) => {
      const rect = profileWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate percentage from center (-1 to 1)
      const xPct = (x / rect.width - 0.5) * 2;
      const yPct = (y / rect.height - 0.5) * 2;

      // Rotate calculations (Max 15deg)
      const rotateX = yPct * -10;
      const rotateY = xPct * 10;

      // Apply transform
      profileWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

      // Subtle lighting effect on image
      profileImage.style.filter = `brightness(${1 + Math.abs(xPct) * 0.1})`;
    });

    profileWrapper.addEventListener("mouseleave", () => {
      profileWrapper.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
      profileImage.style.filter = `brightness(1)`;
    });
  }

  // MAGNETIC BUTTONS
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance from center
      const xMove = (x - rect.width / 2) * 0.5; // 0.5 = Stronger magnetic strength
      const yMove = (y - rect.height / 2) * 0.5;

      btn.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)";
    });
  });

  // SMOOTH SCROLL FOR ANCHOR LINKS
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});


/* --- Automatically concatenated scripts --- */

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

document.addEventListener("DOMContentLoaded", () => {
    const lsmdbDiagramContainer = document.querySelector("#lsmdb-diagram-container");
    if (lsmdbDiagramContainer) {
        lsmdbDiagramContainer.textContent =
            `
 Write path                          Read path
 ──────────                          ──────────
  put(key, value)                     get(key)
       │                                  │
       ▼                                  ▼
 ┌───────────┐                    ┌───────────────┐
 │    WAL    │ (crash durability) │ Active MemTbl │  1. freshest writes
 └─────┬─────┘                    └───────┬───────┘
       │                                  │ miss
       ▼                                  ▼
 ┌───────────────┐                ┌───────────────┐
 │ Active MemTbl │                │  Immutable    │  2. flushing
 │  (SkipList)   │                │   MemTable    │
 └────────┬──────┘                └───────┬───────┘
  full?   │                               │ miss
          ▼                               ▼
 ┌───────────────┐                ┌───────────────┐
 │  Immutable    │ background     │  Block Cache  │  3. hot blocks
 │   MemTable    │ flush thread   │  (LRU, RAM)   │
 └────────┬──────┘                └───────┬───────┘
          │                               │ miss
          ▼                               ▼
 ┌─────────────────────────────┐  ┌─────────────────────────────┐
 │  SSTable  L0  (newest)      │  │  SSTable  L0 → L1 → L2…    │
 │  SSTable  L1                │  │  Bloom Filter → Index Block  │
 │  SSTable  L2  …             │  │  → Data Block (mmap)         │
 └─────────────────────────────┘  └─────────────────────────────┘
          ▲
     Compaction: size-tiered, multi-level,
     merges SSTables, resolves tombstones, frees disk
`
            ;
    }
});

function setupAnalytics() {
  const trackableElements = document.querySelectorAll(
    "[data-analytics-action]",
  );

  trackableElements.forEach((el) => {
    el.addEventListener("click", () => {
      const action = el.getAttribute("data-analytics-action");
      const category = el.getAttribute("data-analytics-category");

      if (typeof gtag === "function") {
        gtag("event", action, {
          event_category: category,
          event_label: el.href || "button_click",
        });
      }
    });
  });
}

const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
  emailLink.addEventListener("copy", () => {
    if (typeof gtag === "function") {
      gtag("event", "copy_email", {
        event_category: "Contact",
        event_label: "roynrishingha@gmail.com",
      });
    }
  });
}

setupAnalytics();

// Track High-Intent Visitors (Stayed > 30s)
setTimeout(() => {
  if (typeof gtag === "function") {
    gtag("event", "high_intent_visit", {
      event_category: "Engagement",
      event_label: "30_seconds_plus",
    });
  }
}, 30000);

// Track when specific sections become visible
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionName =
          entry.target.getAttribute("id") || "unknown_section";

        if (typeof gtag === "function") {
          gtag("event", "section_view", {
            event_category: "Engagement",
            event_label: sectionName,
          });
        }
        // Stop tracking once seen
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
); // Trigger when 50% of section is visible

// Observe key sections
document.querySelectorAll("section").forEach((section) => {
  sectionObserver.observe(section);
});

window.addEventListener("error", (event) => {
  if (typeof gtag === "function") {
    gtag("event", "javascript_error", {
      event_category: "Error",
      event_label: `${event.message} at ${event.filename}:${event.lineno}`,
    });
  }
});

