/**
 * analytics.js — Google Analytics event tracking
 * Loaded on all pages via base.html
 */

// Custom event tracking for elements with data-analytics-* attributes
function setupAnalytics() {
  var trackableElements = document.querySelectorAll("[data-analytics-action]");

  trackableElements.forEach(function (el) {
    el.addEventListener("click", function () {
      var action = el.getAttribute("data-analytics-action");
      var category = el.getAttribute("data-analytics-category");

      if (typeof gtag === "function") {
        gtag("event", action, {
          event_category: category,
          event_label: el.href || "button_click",
        });
      }
    });
  });
}

// Email copy tracking
var emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
  emailLink.addEventListener("copy", function () {
    if (typeof gtag === "function") {
      gtag("event", "copy_email", {
        event_category: "Contact",
        event_label: "roynrishingha@gmail.com",
      });
    }
  });
}

setupAnalytics();

// Track high-intent visitors (stayed > 30s)
setTimeout(function () {
  if (typeof gtag === "function") {
    gtag("event", "high_intent_visit", {
      event_category: "Engagement",
      event_label: "30_seconds_plus",
    });
  }
}, 30000);

// Track when specific sections become visible
var sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var sectionName =
          entry.target.getAttribute("id") || "unknown_section";

        if (typeof gtag === "function") {
          gtag("event", "section_view", {
            event_category: "Engagement",
            event_label: sectionName,
          });
        }
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll("section").forEach(function (section) {
  sectionObserver.observe(section);
});

// Track JS errors
window.addEventListener("error", function (event) {
  if (typeof gtag === "function") {
    gtag("event", "javascript_error", {
      event_category: "Error",
      event_label: event.message + " at " + event.filename + ":" + event.lineno,
    });
  }
});
