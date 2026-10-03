
/* ============================================================
   BUGUNGI REJA — kurslar ro'yxati va yig'iladigan bloklar.
   Vidjetlarning kodiga tegmaydi.
   ============================================================ */
(function () {
  var COURSES = [
    {n:"Web dasturlash",         s:"go",   c:"Vaqtida ketyapti",  p:56,  d:"6/20",  cat:"CSS",     img:"c1"},
    {n:"Web dasturlash",         s:"stop", c:"Muddati tugagan",   p:23,  d:"4/63",  cat:"CSS",     img:"c2"},
    {n:"Web dasturlash",         s:"idle", c:"Normal",            p:56,  d:"8/36",  cat:"CSS",     img:"c3"},
    {n:"Kompyuter Savodxonligi", s:"go",   c:"Vaqtida ketyapti",  p:64,  d:"9/14",  cat:"OFIS",    img:"c4"},
    {n:"Blockly Dasturlash",     s:"go",   c:"Vaqtida ketyapti",  p:33,  d:"4/24",  cat:"ASOSLAR", img:"c5"},
    {n:"Suniy Intellekt",        s:"go",   c:"Vaqtida ketyapti",  p:22,  d:"2/18",  cat:"KIRISH",  img:"c6"},
    {n:"New Year Event",         s:"go",   c:"Vaqtida ketyapti",  p:13,  d:"1/8",   cat:"EVENT",   img:"c7"},
    {n:"Telegram Bot",           s:"idle", c:"Hali boshlanmagan", p:0,   d:"0/21",  cat:"KIRISH",  img:"c8"},
    {n:"Startup maktabi",        s:"idle", c:"Hali boshlanmagan", p:0,   d:"0/12",  cat:"KIRISH",  img:"c9"},
    {n:"2 Test Course",          s:"idle", c:"Hali boshlanmagan", p:0,   d:"0/10",  cat:"TEST",    img:"c10"},
    {n:"Junior Kurs",            s:"go",   c:"Tugatilgan",        p:100, d:"14/14", cat:"YAKUN",   img:"c11"}
  ];
  var STROKE = { go:"#00B884", stop:"#ED0000", idle:"#F2B800" };

  var box = document.getElementById("planCourses");
  if (box) {
    var R = 19.5, C = 2 * Math.PI * R;
    box.innerHTML = COURSES.map(function (k, i) {
      var off = C - C * k.p / 100;   // yakuniy holat; boshida C (bo'sh) turadi
      return '<button type="button" class="plan__course" data-toast="' + k.n + ' — kurs sahifasi">' +
        '<span class="plan__cthumb"><i>HELLO</i><img src="' + window.__PLANIMG__.robomentor + '" alt=""><b>ENGLISH</b></span>' +
        '<div class="plan__cbody">' +
          '<p class="plan__cname">' + k.n + '</p>' +
          '<span class="plan__ctopic">CSS asoslari</span>' +
          '<span class="plan__cmeta">' +
            '<span class="plan__cstate plan__cstate--' + k.s + '">' + k.c + '</span>' +
            '<span class="plan__ccat">' + k.cat + '</span>' +
          '</span>' +
        '</div>' +
        '<span class="plan__cring">' +
          '<svg width="44" height="44">' +
            '<circle cx="22" cy="22" r="' + R + '" fill="none" stroke="#F2F4F7" stroke-width="4"/>' +
            '<circle cx="22" cy="22" r="' + R + '" fill="none" stroke="' + STROKE[k.s] + '" stroke-width="4" ' +
                    'stroke-linecap="round" stroke-dasharray="' + C.toFixed(2) + '" stroke-dashoffset="' + C.toFixed(2) + '" data-off="' + off.toFixed(2) + '"/>' +
          '</svg>' +
          '<span class="plan__cpct">' + k.p + '%</span>' +
        '</span>' +
      '</button>';
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
  fillRings();
})();
