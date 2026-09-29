"""Streak vidjet KARTOCHKASINI veb'dagi yangi dizaynga o'tkazadi.

Karta 344x192 ga qat'iy sozlangan, yangi dizayn esa balandroq.
Shuning uchun u yonma-yon joylashtiriladi:
  chapda  — yetti bargli halqa va markazda kun soni
  o'ngda  — muzlatish zaxirasi, oylik challenge, progress
  pastda  — «+500 Coin Olish»
Kartaning boshqa holatlari (bo'sh, xato, muzlatilgan va h.k.)
tegilmaydi — faqat asosiy holat qayta chiziladi."""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
TARGET = ROOT / "index.html"
s = open(TARGET, encoding="utf-8").read()

s = re.sub(r"<style>/\* STCARD:CSS \*/.*?/\* /STCARD:CSS \*/</style>\n", "", s, flags=re.S)
s = re.sub(r"<script>/\* STCARD:JS \*/.*?/\* /STCARD:JS \*/</script>\n", "", s, flags=re.S)

PETALS = [
 ("M 173.56 9.97 A 142 142 0 0 1 244.79 44.27 A 15 15 0 0 1 244.27 64.90 L 222.00 85.00 A 15 15 0 0 1 199.86 84.90 A 82 82 0 0 0 169.81 70.43 A 15 15 0 0 1 155.92 53.18 L 157.75 23.24 A 15 15 0 0 1 173.56 9.97 Z", "#FFE3BD", "#F7B869"),
 ("M 274.17 81.12 A 142 142 0 0 1 291.76 158.19 A 15 15 0 0 1 275.31 170.65 L 245.71 165.77 A 15 15 0 0 1 231.98 148.39 A 82 82 0 0 0 224.56 115.88 A 15 15 0 0 1 229.39 94.26 L 253.94 77.03 A 15 15 0 0 1 274.17 81.12 Z", "#FFE3BD", "#F7B869"),
 ("M 281.28 204.13 A 142 142 0 0 1 231.99 265.94 A 15 15 0 0 1 211.99 260.85 L 197.34 234.66 A 15 15 0 0 1 202.37 213.10 A 82 82 0 0 0 223.17 187.02 A 15 15 0 0 1 243.07 177.32 L 271.86 185.77 A 15 15 0 0 1 281.28 204.13 Z", "#D9EDFB", "#8AC7F0"),
 ("M 189.53 286.39 A 142 142 0 0 1 110.47 286.39 A 15 15 0 0 1 101.98 267.57 L 113.33 239.80 A 15 15 0 0 1 133.32 230.29 A 82 82 0 0 0 166.68 230.29 A 15 15 0 0 1 186.67 239.80 L 198.02 267.57 A 15 15 0 0 1 189.53 286.39 Z", "#D9EDFB", "#8AC7F0"),
 ("M 68.01 265.94 A 142 142 0 0 1 18.72 204.13 A 15 15 0 0 1 28.14 185.77 L 56.93 177.32 A 15 15 0 0 1 76.83 187.02 A 82 82 0 0 0 97.63 213.10 A 15 15 0 0 1 102.66 234.66 L 88.01 260.85 A 15 15 0 0 1 68.01 265.94 Z", "#FFF5DC", "#F6B9A0"),
 ("M 8.24 158.19 A 142 142 0 0 1 25.83 81.12 A 15 15 0 0 1 46.06 77.03 L 70.61 94.26 A 15 15 0 0 1 75.44 115.88 A 82 82 0 0 0 68.02 148.39 A 15 15 0 0 1 54.29 165.77 L 24.69 170.65 A 15 15 0 0 1 8.24 158.19 Z", "#ECECF0", "#DFE1E6"),
 ("M 55.21 44.27 A 142 142 0 0 1 126.44 9.97 A 15 15 0 0 1 142.25 23.24 L 144.08 53.18 A 15 15 0 0 1 130.19 70.43 A 82 82 0 0 0 100.14 84.90 A 15 15 0 0 1 78.00 85.00 L 55.73 64.90 A 15 15 0 0 1 55.21 44.27 Z", "#ECECF0", "#DFE1E6"),
]
DAYS = [("66.20","16.36","fire","Du"),("86.40","41.69","fire","Se"),
        ("79.19","73.28","ice","Ch"),("50","87.33","ice","Pa"),
        ("20.81","73.28","fire","Ju"),("13.60","41.69","off","Sh"),
        ("33.80","16.36","off","Ya")]

svg = "".join(f'<path d="{d}" fill="{f}" stroke="{st}" stroke-width="2"/>' for d, f, st in PETALS)
days = "".join(
  f'<span class="stc__day" style="left:{x}%;top:{y}%">'
  f'<span class="stc__ico stc__ico--{k}">{"🧊" if k=="ice" else "🔥"}</span>'
  f'<b>{lab}</b></span>' for x, y, k, lab in DAYS)

CARD = ('<div class="stc">'
        '<div class="stc__ring">'
        f'<svg viewBox="0 0 300 300" aria-hidden="true">{svg}</svg>{days}'
        '<span class="stc__mid"><span class="stc__fire">🔥</span>'
        '<b class="stc__num">23</b><i class="stc__cap">kun</i></span>'
        '</div>'
        '<div class="stc__side">'
        '<span class="stc__freeze"><span>🧊</span><b>2</b></span>'
        '<p class="stc__ttl">Oylik challenge</p>'
        '<p class="stc__sub">Har kuni kamida 1 ta dars</p>'
        '<div class="stc__nums"><span><b>12</b><i>/31 kun</i></span><span class="stc__pct">56%</span></div>'
        '<div class="stc__bar"><i style="width:56%"></i></div>'
        '</div>'
        '</div>')

CSS = """
/* ============ STREAK KARTOCHKASI — yangi dizayn ============ */
.stc{ display:flex; align-items:center; gap:12px; height:100%; }
.stc__ring{ position:relative; width:124px; height:124px; flex:none; }
.stc__ring>svg{ position:absolute; inset:0; width:100%; height:100%; }
.stc__day{ position:absolute; transform:translate(-50%,-50%); text-align:center; }
.stc__ico{ display:block; font-size:13px; line-height:1; }
.stc__ico--off{ opacity:.5; filter:grayscale(1); }
.stc__day b{ display:block; margin-top:1px; font:600 8px/9px var(--f); color:#5C6678; }
.stc__day:nth-child(2) b,.stc__day:nth-child(3) b,.stc__day:nth-child(6) b{ color:#C2340D; }
.stc__day:nth-child(4) b,.stc__day:nth-child(5) b{ color:#1B6FBF; }
.stc__mid{ position:absolute; inset:0; display:grid; place-content:center; text-align:center; }
.stc__fire{ font-size:17px; line-height:1; }
.stc__num{ display:block; font:800 26px/1 var(--f); color:var(--c-navy); font-variant-numeric:tabular-nums; }
.stc__cap{ display:block; font:600 9px/11px var(--f); font-style:normal; color:#5C6678; }
.stc__side{ min-width:0; flex:1; }
.stc__freeze{
  display:inline-flex; align-items:center; gap:5px; margin-bottom:6px;
  padding:3px 9px; border-radius:var(--r-pill);
  background:#EAF4FD; box-shadow:inset 0 0 0 1px #BFE0F7;
  font:600 12px/15px var(--f); color:#1B6FBF;
}
.stc__freeze span{ font-size:13px; line-height:1; }
.stc__ttl{ margin:0; font:600 15px/18px var(--f); color:var(--c-navy); }
.stc__sub{ margin:2px 0 0; font:500 12px/15px var(--f); color:#5C6678; }
.stc__nums{ margin-top:8px; display:flex; align-items:baseline; justify-content:space-between; font:600 12px/15px var(--f); color:var(--c-navy); }
.stc__nums i{ font-style:normal; color:#5C6678; }
.stc__pct{ font:600 13px/16px var(--f); }
.stc__bar{ margin-top:4px; height:8px; border-radius:var(--r-pill); background:rgba(123,97,255,.15); overflow:hidden; }
.stc__bar i{ display:block; height:100%; border-radius:var(--r-pill); background:#7B61FF; }
/* mukofot tugmasi — aslidagidek amber */
.wcard[data-widget="streak"] .wcard__btn--coin{
  background:#FFFBE8 !important; color:#8A6600 !important;
  box-shadow:inset 0 0 0 2px #F5C518;
}
"""

JS = """
/* Streak kartochkasini yangi dizaynga almashtiradi.
   Karusel holat o'zgarganda qayta chizilgani uchun kuzatuvchi qo'yiladi. */
(function () {
  var MARKUP = %s;
  function apply() {
    document.querySelectorAll('.band [data-widget="streak"][data-state="normal"]').forEach(function (c) {
      var body = c.querySelector('.wcard__body');
      var head = c.querySelector('.wcard__head');
      if (!body || body.dataset.stc) return;
      if (head) head.style.display = 'none';
      body.dataset.stc = '1';
      body.innerHTML = MARKUP;
      var foot = c.querySelector('.wcard__foot');
      if (foot) {
        foot.innerHTML = '<button class="wcard__btn wcard__btn--coin" data-toast="+500 coin hisobingizga qo\\'shildi">+500 Coin Olish</button>';
      }
    });
  }
  var t = document.getElementById('track');
  if (t) new MutationObserver(function(){ setTimeout(apply, 0); }).observe(t, {childList:true, subtree:true});
  document.addEventListener('DOMContentLoaded', apply);
  setTimeout(apply, 300); setTimeout(apply, 1200);
})();
""" % repr(CARD)

i = s.find("</head>")
assert i > 0 and s.count("</head>") == 1
s = s[:i] + "<style>/* STCARD:CSS */" + CSS + "/* /STCARD:CSS */</style>\n" + s[i:]
j = s.find("</body>")
assert j > 0 and s.count("</body>") == 1
s = s[:j] + "<script>/* STCARD:JS */" + JS + "/* /STCARD:JS */</script>\n" + s[j:]
open(TARGET, "w", encoding="utf-8").write(s)
print("streak kartochkasi yangilandi")
