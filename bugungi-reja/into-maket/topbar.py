"""Tepaga logo + coin/XP qatorini qo'yadi (veb versiyadagi header kabi).
Raqamlar maketning o'z ma'lumotidan; ikonkalar ham maketning o'zinikidan
(data-a="a8" tanga, data-a="a20" chaqmoq) — ularni maket JS'i joylaydi."""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
TARGET = ROOT / "index.html"
s = open(TARGET, encoding="utf-8").read()

# avvalgi urinishni olib tashlaymiz (idempotent)
s = re.sub(r"\n *<!-- TOPBAR:START -->.*?<!-- TOPBAR:END -->", "", s, flags=re.S)
s = re.sub(r"<style>/\* TOPBAR:CSS:START \*/.*?/\* TOPBAR:CSS:END \*/</style>\n", "", s, flags=re.S)

CSS = """
/* ============================================================
   TEPA QATOR — logo va o'quvchining umumiy coin / point i.
   Ilgari ular «Salom!» banneri ichida edi; banner olingach
   ko'rinmay qolgan edi. Veb versiyada ham header'da turadi.
   ============================================================ */
.topbar{ display:flex; align-items:center; gap:10px; padding:4px 16px 14px; }
.topbar .logo{ height:30px; width:auto; margin:0; flex:none; }
.topbar__pills{ margin-left:auto; display:flex; align-items:center; gap:8px; }
.tb-pill{
  display:inline-flex; align-items:center; gap:6px;
  height:32px; padding:0 11px; border-radius:var(--r-pill);
  background:#fff; box-shadow:0 2px 6px rgba(28,39,76,.07);
  font:600 15px/18px var(--f); color:var(--c-navy);
}
.tb-pill img{ width:18px; height:18px; flex:none; }
"""

BAR = """            <!-- TOPBAR:START -->
            <div class="topbar">
              <img class="logo" data-a="a28" alt="Junior academy">
              <span class="topbar__pills">
                <span class="tb-pill"><img data-a="a8" alt=""><b data-count="1703">1703</b></span>
                <span class="tb-pill"><img data-a="a20" alt=""><b data-count="1673">1673</b></span>
              </span>
            </div>
            <!-- TOPBAR:END -->"""

# 1) CSS — </head> dan oldin
i = s.find("</head>")
assert i > 0 and s.count("</head>") == 1, "</head> aniqlanmadi"
s = s[:i] + "<style>/* TOPBAR:CSS:START */" + CSS + "/* TOPBAR:CSS:END */</style>\n" + s[i:]

# 2) logo qatorini almashtiramiz.
#    E'TIBOR: asl faylda logodan keyin juftsiz </span> turadi (5b200bf da ham bor),
#    u ham shu yerda olib tashlanadi.
old = '            <img class="logo" data-a="a28" alt="Junior academy">\n            </span>'
if old not in s:
    old = '            <img class="logo" data-a="a28" alt="Junior academy">'
    assert old in s, "logo qatori topilmadi"
assert s.count(old) == 1
s = s.replace(old, BAR, 1)

open(TARGET, "w", encoding="utf-8").write(s)
print("tepa qator qo'yildi")
