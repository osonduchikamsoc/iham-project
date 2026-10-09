/* =========================================================
   IHAM PUBLIC SITE — behaviour
   ========================================================= */
(function () {
  "use strict";

  /* The number inspection bookings and enquiries are sent to.
     Digits only, full international format, no + and no spaces. */
  var WHATSAPP_NUMBER = "2349067871178";

  var naira = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  });

  function money(value) {
    return naira.format(value).replace("NGN", "₦").replace(/\s/g, "");
  }

  function properties() {
    return window.IHAM_PROPERTIES || [];
  }

  function findProperty(id) {
    return properties().filter(function (p) {
      return p.id === id;
    })[0];
  }

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  /* -------------------------------------------------------
     MOBILE NAVIGATION
     ------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.innerHTML = open
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 991.98) close();
    });
  }

  /* -------------------------------------------------------
     COUNT-UP STATS
     ------------------------------------------------------- */
  function initCounters() {
    var cells = document.querySelectorAll("[data-count]");
    if (!cells.length) return;

    // No IntersectionObserver, or reduced motion: just show the number.
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!("IntersectionObserver" in window) || reduced) {
      cells.forEach(function (el) {
        el.textContent = format(el, Number(el.dataset.count));
      });
      return;
    }

    function format(el, value) {
      return (el.dataset.prefix || "") + Math.round(value).toLocaleString("en-NG") + (el.dataset.suffix || "");
    }

    function run(el) {
      var target = Number(el.dataset.count);
      var duration = 1600;
      var start = null;

      function step(now) {
        if (start === null) start = now;
        var progress = Math.min((now - start) / duration, 1);
        // ease-out-cubic so it decelerates into the final number
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(el, target * eased);
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    cells.forEach(function (el) {
      el.textContent = (el.dataset.prefix || "") + "0" + (el.dataset.suffix || "");
      io.observe(el);
    });
  }

  /* -------------------------------------------------------
     PROPERTY CARDS
     ------------------------------------------------------- */
  function cardMarkup(p) {
    var specs;
    if (p.track === "land") {
      specs =
        '<span><i class="fa-solid fa-ruler-combined"></i> ' + p.plots + "</span>" +
        '<span><i class="fa-solid fa-layer-group"></i> ' + p.units_left + " plots left</span>" +
        '<span><i class="fa-solid fa-calendar-check"></i> ' + p.payment_plan + "</span>";
    } else {
      specs =
        (p.beds ? '<span><i class="fa-solid fa-bed"></i> ' + p.beds + " Bed</span>" : "") +
        '<span><i class="fa-solid fa-bath"></i> ' + p.baths + " Bath</span>" +
        '<span><i class="fa-solid fa-vector-square"></i> ' + p.size + "</span>";
    }

    return (
      '<article class="property-card">' +
        '<div class="property-thumb">' +
          '<img src="' + p.images[0] + '" alt="' + p.title + '" loading="lazy">' +
          '<span class="property-tag ' + p.track + '">' +
            (p.track === "land" ? "Land Investment" : p.type) +
          "</span>" +
          '<span class="property-status">' + p.status + "</span>" +
        "</div>" +
        '<div class="property-body">' +
          '<div class="property-price">' + money(p.price) +
            (p.track === "land" ? ' <small class="text-muted-token" style="font-size:.7rem;font-weight:500">/ plot</small>' : "") +
          "</div>" +
          "<h3>" + p.title + "</h3>" +
          '<div class="property-loc"><i class="fa-solid fa-location-dot"></i> ' + p.location + "</div>" +
          '<div class="property-specs">' + specs + "</div>" +
          '<a class="btn btn-primary w-100" href="property-details.html?id=' + p.id + '">' +
            'View Details <i class="fa-solid fa-arrow-right ms-1"></i>' +
          "</a>" +
        "</div>" +
      "</article>"
    );
  }

  function initPropertyGrid() {
    var grid = document.querySelector("[data-property-grid]");
    if (!grid) return;

    var limit = Number(grid.dataset.limit || 0);
    var fixedTrack = grid.dataset.track || "";

    function render(track) {
      var list = properties().filter(function (p) {
        if (fixedTrack) return p.track === fixedTrack;
        if (!track || track === "all") return true;
        return p.track === track;
      });

      if (limit) list = list.slice(0, limit);

      if (!list.length) {
        grid.innerHTML =
          '<div class="col-12"><div class="surface text-center p-5">' +
          '<i class="fa-regular fa-folder-open fs-1 text-muted-token mb-3 d-block"></i>' +
          '<p class="text-muted-token mb-0">No listings in this category yet. Check back shortly.</p>' +
          "</div></div>";
        return;
      }

      grid.innerHTML = list
        .map(function (p) {
          return '<div class="col-md-6 col-lg-4">' + cardMarkup(p) + "</div>";
        })
        .join("");
    }

    render("all");

    document.querySelectorAll("[data-filter]").forEach(function (pill) {
      pill.addEventListener("click", function () {
        document.querySelectorAll("[data-filter]").forEach(function (p) {
          p.classList.remove("active");
        });
        pill.classList.add("active");
        render(pill.dataset.filter);
      });
    });
  }

  /* -------------------------------------------------------
     PROPERTY DETAILS PAGE
     ------------------------------------------------------- */
  function initPropertyDetails() {
    var root = document.querySelector("[data-property-detail]");
    if (!root) return;

    var p = findProperty(qs("id")) || properties()[0];
    if (!p) return;

    document.title = p.title + " — IHAM Properties";

    // Banner — use this listing's own photo, not a generic one
    var bannerImg = document.querySelector(".banner-bg");
    if (bannerImg) bannerImg.src = p.images[0];

    setText("[data-field='title']", p.title);
    setText("[data-field='crumb']", p.title);
    setText("[data-field='location']", p.location);
    setText("[data-field='price']", money(p.price) + (p.track === "land" ? " / plot" : ""));
    setText("[data-field='status']", p.status);
    setText("[data-field='type']", p.track === "land" ? "Land Investment" : p.type);
    setText("[data-field='summary']", p.summary);
    setText("[data-field='titledoc']", p.title_doc);

    // Gallery
    var gallery = root.querySelector("[data-gallery]");
    if (gallery) {
      gallery.innerHTML = p.images
        .map(function (src, i) {
          return (
            '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
            '<img src="' + src + '" class="d-block w-100" alt="' + p.title + ' — image ' + (i + 1) + '">' +
            "</div>"
          );
        })
        .join("");
    }

    var thumbs = root.querySelector("[data-gallery-thumbs]");
    if (thumbs) {
      thumbs.innerHTML = p.images
        .map(function (src, i) {
          return (
            '<button type="button" class="gallery-thumb' + (i === 0 ? " active" : "") + '" ' +
            'data-bs-target="#propertyGallery" data-bs-slide-to="' + i + '" ' +
            'aria-label="Show image ' + (i + 1) + '">' +
            '<img src="' + src + '" alt="">' +
            "</button>"
          );
        })
        .join("");

      var carouselEl = document.getElementById("propertyGallery");
      if (carouselEl) {
        carouselEl.addEventListener("slid.bs.carousel", function (e) {
          thumbs.querySelectorAll(".gallery-thumb").forEach(function (t, i) {
            t.classList.toggle("active", i === e.to);
          });
        });
      }
    }

    // Spec strip — different facts matter for land than for a house
    var specs = root.querySelector("[data-specs]");
    if (specs) {
      var rows =
        p.track === "land"
          ? [
              ["fa-ruler-combined", "Plot Size", p.plots],
              ["fa-layer-group", "Plots Remaining", p.units_left],
              ["fa-calendar-check", "Payment Plan", p.payment_plan],
              ["fa-arrow-trend-up", "Projected ROI", p.roi]
            ]
          : [
              ["fa-bed", "Bedrooms", p.beds || "—"],
              ["fa-bath", "Bathrooms", p.baths],
              ["fa-vector-square", "Land Size", p.size],
              ["fa-car", "Parking", p.parking + " cars"]
            ];

      specs.innerHTML = rows
        .map(function (r) {
          return (
            '<div class="col-6 col-lg-3"><div class="spec-tile">' +
            '<i class="fa-solid ' + r[0] + '"></i>' +
            "<strong>" + r[2] + "</strong>" +
            "<span>" + r[1] + "</span>" +
            "</div></div>"
          );
        })
        .join("");
    }

    // Description — blank lines become paragraphs
    var desc = root.querySelector("[data-description]");
    if (desc) {
      desc.innerHTML = p.description
        .split("\n\n")
        .map(function (para) {
          return "<p>" + para + "</p>";
        })
        .join("");
    }

    // Features
    var feats = root.querySelector("[data-features]");
    if (feats) {
      feats.innerHTML = p.features
        .map(function (f) {
          return (
            '<div class="col-sm-6"><div class="feature-check">' +
            '<i class="fa-solid fa-circle-check"></i> ' + f +
            "</div></div>"
          );
        })
        .join("");
    }

    // Documents
    var docs = root.querySelector("[data-docs]");
    if (docs) {
      docs.innerHTML = p.docs
        .map(function (d) {
          return (
            '<li><i class="fa-solid fa-file-shield"></i> ' + d + "</li>"
          );
        })
        .join("");
    }

    // Map for this listing
    var map = root.querySelector("[data-property-map]");
    if (map) {
      map.src =
        "https://maps.google.com/maps?q=" +
        encodeURIComponent(p.map) +
        "&t=&z=14&ie=UTF8&iwloc=&output=embed";
    }

    // Similar listings — same track, excluding this one
    var similar = root.querySelector("[data-similar]");
    if (similar) {
      var others = properties()
        .filter(function (o) {
          return o.track === p.track && o.id !== p.id;
        })
        .slice(0, 3);

      similar.innerHTML = others
        .map(function (o) {
          return '<div class="col-md-6 col-lg-4">' + cardMarkup(o) + "</div>";
        })
        .join("");
    }

    initInspection(p);
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.textContent = value;
    });
  }

  /* -------------------------------------------------------
     BOOK INSPECTION → WHATSAPP
     ------------------------------------------------------- */
  function initInspection(p) {
    var form = document.getElementById("inspectionForm");
    if (!form) return;

    // Cannot book an inspection in the past.
    var dateInput = form.querySelector("#inspDate");
    if (dateInput) {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split("T")[0];
    }

    var propField = form.querySelector("#inspProperty");
    if (propField) propField.value = p.title + " — " + p.location;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      var get = function (id) {
        var el = form.querySelector("#" + id);
        return el ? el.value.trim() : "";
      };

      var date = get("inspDate");
      var pretty = date
        ? new Date(date + "T00:00:00").toLocaleDateString("en-NG", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        : date;

      // These two fields are what makes the admin Insights page possible —
      // they tell us where demand is coming from and who it is coming from.
      var lines = [
        "*NEW INSPECTION REQUEST*",
        "",
        "*Property:* " + p.title,
        "*Location:* " + p.location,
        "*Price:* " + money(p.price) + (p.track === "land" ? " per plot" : ""),
        "",
        "*Name:* " + get("inspName"),
        "*Phone:* " + get("inspPhone"),
        "*Email:* " + get("inspEmail"),
        "*State:* " + get("inspState"),
        "*Occupation:* " + get("inspOccupation"),
        "",
        "*Preferred date:* " + pretty,
        "*Preferred time:* " + get("inspTime")
      ];

      var notes = get("inspNotes");
      if (notes) lines.push("", "*Notes:* " + notes);

      var referrer = get("inspReferrer");
      if (referrer) lines.push("*Referred by (realtor):* " + referrer);

      lines.push("", "_Sent from the IHAM website_");

      var url =
        "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));

      window.open(url, "_blank", "noopener");

      var done = document.getElementById("inspectionSuccess");
      if (done) {
        done.classList.remove("d-none");
        done.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.classList.remove("was-validated");
      form.reset();
      if (propField) propField.value = p.title + " — " + p.location;
    });
  }

  /* -------------------------------------------------------
     TRAINING APPLICATION (design stage — no send)
     ------------------------------------------------------- */
  function initTrainingForm() {
    var form = document.getElementById("trainingForm");
    if (!form) return;

    var preselect = qs("program");
    if (preselect) {
      var select = form.querySelector("#trProgram");
      if (select) select.value = preselect;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      // Design stage: show the confirmation the applicant would receive.
      // Wire this to the backend mailer when it exists.
      var name = form.querySelector("#trName");
      var target = document.getElementById("trainingSuccess");
      if (target) {
        var who = target.querySelector("[data-applicant]");
        if (who && name) who.textContent = name.value.trim().split(" ")[0];
        target.classList.remove("d-none");
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      form.classList.remove("was-validated");
      form.reset();
    });
  }

  /* -------------------------------------------------------
     TESTIMONIALS — one card per slide on small screens
     ------------------------------------------------------- */
  function initTestimonials() {
    var carousel = document.getElementById("testimonialCarousel");
    if (!carousel) return;

    var items = Array.prototype.slice.call(carousel.querySelectorAll(".testimonial-card"));
    var inner = carousel.querySelector(".carousel-inner");
    if (!items.length || !inner) return;

    var lastPerView = null;

    function build() {
      var perView = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      if (perView === lastPerView) return;
      lastPerView = perView;

      var html = "";
      for (var i = 0; i < items.length; i += perView) {
        var group = items.slice(i, i + perView);
        html +=
          '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
          '<div class="row g-4">' +
          group
            .map(function (card) {
              return '<div class="col">' + card.outerHTML + "</div>";
            })
            .join("") +
          "</div></div>";
      }
      inner.innerHTML = html;
    }

    build();

    var timer;
    window.addEventListener("resize", function () {
      clearTimeout(timer);
      timer = setTimeout(build, 180);
    });
  }

  /* -------------------------------------------------------
     REVEAL ON SCROLL
     ------------------------------------------------------- */
  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("revealed");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* -------------------------------------------------------
     BOOT
     ------------------------------------------------------- */
  function init() {
    initNav();
    initCounters();
    initPropertyGrid();
    initPropertyDetails();
    initTrainingForm();
    initTestimonials();
    initReveal();

    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

    document.querySelectorAll("[data-wa-link]").forEach(function (el) {
      el.href = "https://wa.me/" + WHATSAPP_NUMBER;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.IHAM = { money: money, properties: properties, WHATSAPP_NUMBER: WHATSAPP_NUMBER };
})();
