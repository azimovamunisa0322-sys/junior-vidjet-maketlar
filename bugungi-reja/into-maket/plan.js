
/* ============================================================
   BUGUNGI REJA — kurslar ro'yxati va yig'iladigan bloklar.
   Vidjetlarning kodiga tegmaydi.
   ============================================================ */
(function () {
  var COURSES = [
    {n:"WebStart",               s:"stop", c:"Muddati tugagan",   p:30,  d:"6/20",  cat:"HTML",    img:"c1"},
    {n:"Dasturlash kursi",       s:"go",   c:"Vaqtida ketyapti",  p:20,  d:"4/63",  cat:"PYTHON",  img:"c2"},
    {n:"Grafik dizayn",          s:"go",   c:"Vaqtida ketyapti",  p:44,  d:"8/36",  cat:"FIGMA",   img:"c3"},
    {n:"Kompyuter Savodxonligi", s:"go",   c:"Vaqtida ketyapti",  p:64,  d:"9/14",  cat:"OFIS",    img:"c4"},
    {n:"Blockly Dasturlash",     s:"go",   c:"Vaqtida ketyapti",  p:33,  d:"4/24",  cat:"ASOSLAR", img:"c5"},
    {n:"Suniy Intellekt",        s:"go",   c:"Vaqtida ketyapti",  p:22,  d:"2/18",  cat:"KIRISH",  img:"c6"},
    {n:"New Year Event",         s:"go",   c:"Vaqtida ketyapti",  p:13,  d:"1/8",   cat:"EVENT",   img:"c7"},
    {n:"Telegram Bot",           s:"idle", c:"Hali boshlanmagan", p:0,   d:"0/21",  cat:"KIRISH",  img:"c8"},
    {n:"Startup maktabi",        s:"idle", c:"Hali boshlanmagan", p:0,   d:"0/12",  cat:"KIRISH",  img:"c9"},
    {n:"2 Test Course",          s:"idle", c:"Hali boshlanmagan", p:0,   d:"0/10",  cat:"TEST",    img:"c10"},
    {n:"Junior Kurs",            s:"go",   c:"Tugatilgan",        p:100, d:"14/14", cat:"YAKUN",   img:"c11"}
  ];
  var STROKE = { go:"#58CC02", stop:"#ED0000", idle:"#B4B4B4" };
  var IMG = window.__PLANIMG__ || {};

  var box = document.getElementById("planCourses");
  if (box) {
    var R = 16, C = 2 * Math.PI * R;
    box.innerHTML = COURSES.map(function (k) {
      var off = C - C * k.p / 100;   // yakuniy holat; boshida C (bo'sh) turadi
      return '<div class="plan__course">' +
        '<img class="plan__cthumb" src="' + (IMG[k.img] || "") + '" alt="">' +
        '<div class="plan__cbody">' +
          '<p class="plan__cname">' + k.n + '</p>' +
          '<span class="plan__cmeta">' +
            '<span class="plan__cstate plan__cstate--' + k.s + '">' + k.c + '</span>' +
            '<span class="plan__ccat">' + k.cat + '</span>' +
          '</span>' +
        '</div>' +
        '<div class="plan__cright">' +
          '<span class="plan__cring">' +
            '<svg width="36" height="36">' +
              '<circle cx="18" cy="18" r="' + R + '" fill="none" stroke="#F0F0F0" stroke-width="4"/>' +
              '<circle cx="18" cy="18" r="' + R + '" fill="none" stroke="' + STROKE[k.s] + '" stroke-width="4" ' +
                      'stroke-linecap="round" stroke-dasharray="' + C.toFixed(2) + '" stroke-dashoffset="' + C.toFixed(2) + '" data-off="' + off.toFixed(2) + '"/>' +
            '</svg>' +
            '<span class="plan__cpct">' + k.p + '%</span>' +
          '</span>' +
        '</div>' +
      '</div>';
    }).join("");
  }

  function fillRings() {
    if (!box) return;
    var cs = box.querySelectorAll("circle[data-off]");
    requestAnimationFrame(function () {
      cs.forEach(function (c) { c.setAttribute("stroke-dashoffset", c.getAttribute("data-off")); });
    });
  }

  function toggle(btnId, boxId, onOpen) {
    var b = document.getElementById(btnId), x = document.getElementById(boxId);
    if (!b || !x) return;
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", String(!open));
      x.classList.toggle("is-open", !open);
      if (!open && onOpen) onOpen();
    });
  }
  toggle("planAllBtn", "planCourses", fillRings);
  toggle("planWhyBtn", "planWhyBody");

  /* ---------- «+300 coin»: qulflangan, bosilganda izoh chiqadi ---------- */
  (function () {
    var btn = document.getElementById("planCoinBtn");
    var tip = document.getElementById("planTip");
    if (!btn || !tip) return;
    var t = null;

    btn.addEventListener("click", function () {
      tip.hidden = false;
      // animatsiyani qaytadan ishga tushirish uchun
      tip.style.animation = "none"; void tip.offsetWidth; tip.style.animation = "";
      btn.classList.remove("is-shake"); void btn.offsetWidth; btn.classList.add("is-shake");

      clearTimeout(t);
      t = setTimeout(function () { tip.hidden = true; btn.classList.remove("is-shake"); }, 2000);
    });
  })();
})();
