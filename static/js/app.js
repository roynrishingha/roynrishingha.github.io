/**
 * app.js — Homepage interactions
 * Scroll reveal animations, 3D tilt, magnetic buttons, smooth scroll.
 * Loaded only on index.html.
 */

(function () {
  // --- Scroll Reveal ---
  var revealElements = document.querySelectorAll(
    ".hero__content > *, .hero__visual, .section-title, .section-subtitle, .card, .capability-item, .timeline__item, .project-item",
  );

  var delayCounter = 0;
  var resetTimeout;

  var revealOnScroll = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = delayCounter * 0.1 + "s";
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);

          delayCounter++;
          clearTimeout(resetTimeout);
          resetTimeout = setTimeout(function () {
            delayCounter = 0;
          }, 150);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach(function (el) {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition =
      "opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)";
    revealOnScroll.observe(el);
  });

  // Inject visibility class
  var style = document.createElement("style");
  style.textContent =
    ".is-visible { opacity: 1 !important; transform: translateY(0) !important; }";
  document.head.appendChild(style);

  // --- 3D Tilt Effect (Profile Image) ---
  var profileWrapper = document.querySelector(".profile-wrapper");
  var profileImage = document.querySelector(".profile-image");

  if (profileWrapper && profileImage) {
    profileWrapper.addEventListener("mousemove", function (e) {
      var rect = profileWrapper.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      var xPct = (x / rect.width - 0.5) * 2;
      var yPct = (y / rect.height - 0.5) * 2;

      var rotateX = yPct * -10;
      var rotateY = xPct * 10;

      profileWrapper.style.transform =
        "perspective(1000px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) scale3d(1.05, 1.05, 1.05)";
      profileImage.style.filter = "brightness(" + (1 + Math.abs(xPct) * 0.1) + ")";
    });

    profileWrapper.addEventListener("mouseleave", function () {
      profileWrapper.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      profileImage.style.filter = "brightness(1)";
    });
  }

  // --- Magnetic Buttons ---
  var buttons = document.querySelectorAll(".btn");

  buttons.forEach(function (btn) {
    btn.addEventListener("mousemove", function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      var xMove = (x - rect.width / 2) * 0.5;
      var yMove = (y - rect.height / 2) * 0.5;

      btn.style.transform = "translate(" + xMove + "px, " + yMove + "px)";
    });

    btn.addEventListener("mouseleave", function () {
      btn.style.transform = "translate(0, 0)";
    });
  });

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
