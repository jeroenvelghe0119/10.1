
/* =========================================
   CHAPTER 10 — NAVIGATION SYSTEM
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const tabs = Array.from(document.querySelectorAll(".nav-tab"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  const nextButtons = document.querySelectorAll("[data-go]");
  const backToTop = document.getElementById("back-to-top");

  // Open one section and close every other section.
  function openTab(tabId, options = {}) {
    const selectedPanel = document.getElementById(tabId);
    const selectedTab = tabs.find(
      tab => tab.dataset.tab === tabId
    );

    // Do nothing if the requested section does not exist.
    if (!selectedPanel || !selectedTab) {
      return;
    }

    // Close every section first.
    panels.forEach(panel => {
      panel.classList.remove("active");
      panel.setAttribute("aria-hidden", "true");
    });

    // Deactivate all navigation tabs.
    tabs.forEach(tab => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
      tab.removeAttribute("aria-current");
    });

    // Open the requested section.
    selectedPanel.classList.add("active");
    selectedPanel.setAttribute("aria-hidden", "false");

    // Highlight its navigation button.
    selectedTab.classList.add("active");
    selectedTab.setAttribute("aria-selected", "true");
    selectedTab.setAttribute("aria-current", "page");

    // Update the page title.
    const heading = selectedPanel.querySelector("h2");

    if (heading) {
      document.title =
        heading.textContent.trim() +
        " | Chapter 10";
    }

    // Return the reader to the beginning of the content.
    if (options.scroll !== false) {
      window.scrollTo({
        top: 0,
        behavior: "auto"
      });
    }

    // Move keyboard focus to the new section when requested.
    if (options.focus === true) {
      selectedPanel.focus({
        preventScroll: true
      });
    }
  }

  // Main navigation buttons.
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      openTab(tab.dataset.tab);
    });

    // Keyboard navigation with the arrow keys.
    tab.addEventListener("keydown", event => {
      let nextIndex = index;

      if (event.key === "ArrowRight" ||
          event.key === "ArrowDown") {
        nextIndex = (index + 1) % tabs.length;
      } else if (event.key === "ArrowLeft" ||
                 event.key === "ArrowUp") {
        nextIndex =
          (index - 1 + tabs.length) % tabs.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = tabs.length - 1;
      } else {
        return;
      }

      event.preventDefault();

      tabs[nextIndex].focus();
      openTab(tabs[nextIndex].dataset.tab);
    });
  });

  // Buttons at the bottom of each section.
  nextButtons.forEach(button => {
    button.addEventListener("click", () => {
      const destination = button.dataset.go;

      openTab(destination);
    });
  });

  // Show or hide the back-to-top button.
  function updateBackToTop() {
    if (window.scrollY > 350) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Start with the chapter introduction.
  // Exactly one section is visible at startup.
  panels.forEach(panel => {
    panel.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
  });

  tabs.forEach(tab => {
    tab.classList.remove("active");
    tab.setAttribute("aria-selected", "false");
    tab.removeAttribute("aria-current");
  });

  openTab("chapter", { scroll: false });
  updateBackToTop();
});
