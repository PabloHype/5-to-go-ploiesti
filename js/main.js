/* 5 to go Ploiești – funcționalitate demo */
(function () {
  "use strict";

  /* 1. Meniu mobil */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () { nav.classList.toggle("open"); });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { nav.classList.remove("open"); }
    });
  }

  /* 2. Anul curent și data ultimei actualizări */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
  document.querySelectorAll("[data-date]").forEach(function (el) {
    el.textContent = new Date().toLocaleDateString("ro-RO");
  });

  /* 3. Status „Deschis / Închis” – pe baza programului din index.html */
  var schedule = { 0: [9, 17], 1: [7, 20], 2: [7, 20], 3: [7, 20], 4: [7, 20], 5: [7, 20], 6: [8, 18] };
  var badge = document.getElementById("openBadge");
  if (badge) {
    var now = new Date();
    var h = now.getHours() + now.getMinutes() / 60;
    var s = schedule[now.getDay()];
    var open = h >= s[0] && h < s[1];
    badge.textContent = open ? "● Deschis acum" : "● Închis acum";
    badge.classList.add(open ? "open" : "closed");
  }

  /* 4. Recenzii – versiune demo (salvate local, în browser) */
  var STORAGE_KEY = "tgg_reviews";
  var DEFAULT_REVIEWS = [
    { name: "Andreea M.", rating: 5, text: "Cea mai bună cafea din zonă, iar personalul e super de treabă!" },
    { name: "Radu P.", rating: 5, text: "Frappe-ul de la 5 to go e favoritul meu. Rapid, bun, la prețul corect." },
    { name: "Ioana D.", rating: 4, text: "Îmi place că e chiar în Sala Sporturilor – perfect după antrenament." }
  ];

  function getSaved() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch (e) { return []; }
  }

  function stars(n) {
    var safe = Math.max(1, Math.min(5, n || 0));
    return "⭐".repeat(safe);
  }

  function renderReviews() {
    var wrap = document.getElementById("reviewsList");
    if (!wrap) { return; }
    var all = getSaved().concat(DEFAULT_REVIEWS);
    wrap.innerHTML = all.map(function (r) {
      return '<article class="card review">' +
        '<div class="stars">' + stars(r.rating) + '</div>' +
        '<p>„' + r.text + '”</p>' +
        '<footer>– ' + r.name + '</footer>' +
        '</article>';
    }).join("");
  }
  renderReviews();

  var form = document.getElementById("reviewForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("revName").value.trim();
      var rating = parseInt(document.getElementById("revRating").value, 10);
      var text = document.getElementById("revText").value.trim();
      if (!name || !text) { return; }
      var saved = getSaved();
      saved.unshift({ name: name, rating: rating, text: text });
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch (e2) {}
      renderReviews();
      form.reset();
      alert("Mulțumim pentru recenzie! (Demo: recenzia este salvată doar local, în browserul tău.)");
    });
  }

  /* 5. Banner cookie */
  var banner = document.getElementById("cookieBanner");
  if (banner) {
    var consent = null;
    try { consent = localStorage.getItem("cookie_consent"); } catch (e3) {}
    if (!consent) { banner.classList.add("show"); }
    var accept = document.getElementById("cookieAccept");
    var decline = document.getElementById("cookieDecline");
    if (accept) {
      accept.addEventListener("click", function () {
        try { localStorage.setItem("cookie_consent", "all"); } catch (e4) {}
        banner.classList.remove("show");
      });
    }
    if (decline) {
      decline.addEventListener("click", function () {
        try { localStorage.setItem("cookie_consent", "necessary"); } catch (e5) {}
        banner.classList.remove("show");
      });
    }
  }
})();
