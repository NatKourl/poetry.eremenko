/* Владимир Ерёменко — клиентские скрипты */
(function () {
  "use strict";

  /* ---- Мобильное меню ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---- Защита e-mail от спам-ботов ----
     Адрес не хранится в HTML в открытом виде. Он собирается
     из частей и кодировки только в браузере настоящего человека,
     поэтому простые сборщики адресов его не видят. ---- */
  function buildEmail() {
    // части адреса (Base64), чтобы строка "natk72@gmail.com" не лежала в коде
    var u = atob("bmF0azcy");        // natk72
    var d = atob("Z21haWwuY29t");    // gmail.com
    return u + String.fromCharCode(64) + d;
  }

  var slots = document.querySelectorAll("[data-email]");
  slots.forEach(function (slot) {
    var addr = buildEmail();
    var subject = slot.getAttribute("data-subject") || "";
    var link = document.createElement("a");
    link.href = "mailto:" + addr + (subject ? "?subject=" + encodeURIComponent(subject) : "");
    link.textContent = addr;
    link.className = "email-reveal";
    link.setAttribute("rel", "nofollow");
    slot.innerHTML = "";
    slot.appendChild(link);
  });

  var btns = document.querySelectorAll("[data-email-button]");
  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var addr = buildEmail();
      var subject = btn.getAttribute("data-subject") || "";
      window.location.href =
        "mailto:" + addr + (subject ? "?subject=" + encodeURIComponent(subject) : "");
    });
  });

  /* ---- Лайтбокс для галереи ---- */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var closeBtn = lb.querySelector(".lightbox-close");
    document.querySelectorAll("[data-full]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        lbImg.src = a.getAttribute("data-full");
        lbImg.alt = a.getAttribute("data-alt") || "";
        lb.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });
    function closeLb() {
      lb.classList.remove("open");
      lbImg.src = "";
      document.body.style.overflow = "";
    }
    closeBtn.addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("open")) closeLb();
    });
  }
})();
