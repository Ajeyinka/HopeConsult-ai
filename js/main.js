"use strict";


// Switch the transparent hero navigation to a solid white bar on scroll.
const header = document.querySelector(".site-header");

if (header) {
  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

// Mobile navigation and accessible dropdowns
const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");

if (menu && nav) {
  menu.addEventListener("click", () => {
    const isOpen = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!isOpen));
    menu.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    nav.classList.toggle("is-open", !isOpen);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    nav.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
      dropdown.classList.remove("open");
      dropdown.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".dropdown-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    button.closest(".dropdown").classList.toggle("open", !isOpen);
  });
});

// Current year in the footer
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

// Resource category filters
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
    document.querySelectorAll("[data-category]").forEach((card) => {
      card.hidden = button.dataset.filter !== "all" &&
        card.dataset.category !== button.dataset.filter;
    });
  });
});

// Consultation form: conditional fields, file-size check, and submission
const form = document.querySelector("#consultation-form");
if (form) {
  const details = document.querySelector("#opportunity-details");

  form.querySelectorAll('[name="has_opportunity"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      details.hidden = form.querySelector('[name="has_opportunity"]:checked')?.value !== "yes";
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.querySelector("#form-message");
    const attachment = form.querySelector('[name="attachment"]').files[0];

    if (attachment && attachment.size > 10 * 1024 * 1024) {
      message.textContent = "Please upload a file smaller than 10 MB.";
      return;
    }

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      message.textContent = "This form is not connected yet. Please email info@hopeimpactconsulting.online with your request and attachment.";
      return;
    }

    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    submit.textContent = "Sending…";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      details.hidden = true;
      message.style.color = "#1b5744";
      message.textContent = "Thank you. Your request has been submitted.";
    } catch (error) {
      message.textContent = "Submission failed. Please email info@hopeimpactconsulting.online instead.";
    } finally {
      submit.disabled = false;
      submit.textContent = "Submit Request →";
    }
  });
}
