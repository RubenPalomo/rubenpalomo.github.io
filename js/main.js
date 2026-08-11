(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-navigation]");
  const navigationLinks = navigation
    ? [...navigation.querySelectorAll('a[href^="#"]')]
    : [];

  const closeMenu = () => {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú de navegación");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";

      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Abrir menú de navegación" : "Cerrar menú de navegación",
      );
      navigation.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navigationLinks.forEach((link) =>
      link.addEventListener("click", closeMenu),
    );

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1088) closeMenu();
    });
  }

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const sections = navigationLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleSection) return;

        navigationLinks.forEach((link) => {
          const isCurrent =
            link.getAttribute("href") === `#${visibleSection.target.id}`;

          if (isCurrent) {
            link.setAttribute("aria-current", "true");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.2, 0.5],
      },
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  const contactForm = document.querySelector("#contact-form");
  const formStatus = contactForm?.querySelector(".form-status");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const projectType = String(formData.get("project-type") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = `Proyecto de ${projectType} — ${name}`;
    const body = [
      "Hola Rubén,",
      "",
      `Soy ${name}${company ? `, de ${company}` : ""}.`,
      `Mi email de contacto es ${email}.`,
      `Tipo de proyecto: ${projectType}.`,
      "",
      "Contexto del proyecto:",
      message,
      "",
      "Gracias.",
    ].join("\n");

    if (formStatus) {
      formStatus.textContent =
        "Correo preparado. Si no se abre tu aplicación, escríbeme directamente a ruben.palomof@gmail.com.";
    }

    window.location.href = `mailto:ruben.palomof@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  const newsletterForm = document.querySelector("#newsletter-form");
  const newsletterStatus = newsletterForm?.querySelector(".form-status");
  const newsletterEndpoint = window.NEWSLETTER_ENDPOINT || "/api/newsletter";

  const setNewsletterStatus = (message, type = "success") => {
    if (!newsletterStatus) return;

    newsletterStatus.textContent = message;
    newsletterStatus.dataset.status = type;
  };

  newsletterForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!newsletterForm.checkValidity()) {
      newsletterForm.reportValidity();
      return;
    }

    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const formData = new FormData(newsletterForm);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      consent: formData.get("consent") === "on",
      source: window.location.href,
    };

    submitButton?.setAttribute("disabled", "true");
    setNewsletterStatus("Enviando suscripción...", "pending");

    try {
      const response = await fetch(newsletterEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Newsletter request failed");
      }

      newsletterForm.reset();
      setNewsletterStatus(
        "Suscripción enviada. Gracias por apuntarte.",
        "success",
      );
    } catch (error) {
      setNewsletterStatus(
        "No se ha podido enviar ahora mismo. Escríbeme a ruben.palomof@gmail.com y te apunto manualmente.",
        "error",
      );
    } finally {
      submitButton?.removeAttribute("disabled");
    }
  });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
})();
