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
