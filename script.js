
document.addEventListener("DOMContentLoaded", () => {
  // AL MAUOOD - Islamic Luxury Store

  const BRAND_NAME = "AL MAUOOD";
  const WHATSAPP_NUMBER = "923096789111";

  // Mobile Navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      });
    });
  }

  // Hero Video
  document.querySelectorAll(".hero-video").forEach(video => {
    video.muted = true;
    video.play().catch(() => {});
  });

  // Product Category Filter
  const categoryButtons = document.querySelectorAll("[data-filter]");
  const products = document.querySelectorAll("[data-category]");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;

      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      products.forEach(product => {
        product.style.display =
          selected === "all" || product.dataset.category === selected
            ? ""
            : "none";
      });
    });
  });

  // Shopping Cart
  let cart = JSON.parse(localStorage.getItem("alMauoodCart")) || [];

  function saveCart() {
    localStorage.setItem("alMauoodCart", JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach(element => {
      element.textContent = count;
    });
  }

  document.querySelectorAll("[data-add-to-cart]").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = Number(button.dataset.price);

      if (!name || !Number.isFinite(price)) return;

      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      saveCart();
      alert(name + " added to your AL MAUOOD cart.");
    });
  });

  // WhatsApp Order
  document.querySelectorAll(".whatsapp-order").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();

      const message = encodeURIComponent(
        "Assalamu Alaikum! I am interested in shopping from " + BRAND_NAME + "."
      );

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
        "_blank"
      );
    });
  });

  // Product Image Gallery
  document.querySelectorAll(".product-gallery").forEach(gallery => {
    const mainImage = gallery.querySelector(".main-image");

    gallery.querySelectorAll(".gallery-thumb").forEach(thumb => {
      thumb.addEventListener("click", () => {
        if (mainImage) mainImage.src = thumb.src;
      });
    });
  });

  // Newsletter
  const newsletter = document.querySelector(".newsletter-form");

  if (newsletter) {
    newsletter.addEventListener("submit", event => {
      event.preventDefault();
      alert("Thank you for your interest in AL MAUOOD.");
      newsletter.reset();
    });
  }

  // Scroll Reveal
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Current Year
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  // Back To Top
  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  updateCartCount();

  console.log(BRAND_NAME + " website ready.");
});
