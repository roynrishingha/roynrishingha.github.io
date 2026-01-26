document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".hero__content > *, .hero__visual, .section-title, .section-subtitle, .card, .capability-item, .timeline__item, .project-item, .tech-note",
  );

  const revealOptions = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: "0px 0px -50px 0px", // Offset slightly so it triggers before bottom
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Only animate once
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
      const xMove = (x - rect.width / 2) * 0.3; // 0.3 = Magnetic strength
      const yMove = (y - rect.height / 2) * 0.3;

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
