"""«O'yinlar» bo'limini mobil uchun to'ldiradi: uchta o'yin qatori,
kategoriya chipi va qulflangan holat. Maketning o'z uslubida."""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
TARGET = ROOT / "index.html"
s = open(TARGET, encoding="utf-8").read()

# avvalgi urinishni tozalaymiz (idempotent)
s = re.sub(r"\n *<!-- GAMES:START -->.*?<!-- GAMES:END -->", "", s, flags=re.S)
s = re.sub(r"<style>/\* GAMES:CSS:START \*/.*?/\* GAMES:CSS:END \*/</style>\n", "", s, flags=re.S)
s = s.replace('<span class="game__cat">Matematika</span>\n                ', "")

CSS = """
/* ============================================================
   O'YINLAR — mobil ro'yxat: uchta o'yin, kategoriya chipi,
   qulflangan holat. Maketning o'z tokenlari bilan.
   ============================================================ */
.game__t{ gap:4px; }
.game__cat{
  align-self:flex-start; margin-top:1px;
  padding:3px 9px; border-radius:var(--r-pill);
  background:#EFF1F6; color:var(--c-slate);
  font:600 10px/13px var(--f); letter-spacing:.06em; text-transform:uppercase;
}
.game__art--abc{ background:linear-gradient(160deg,#BCA6FF 0%,#8F6FF0 100%); }
.game__art--art{ background:linear-gradient(160deg,#FFC79A 0%,#FF8C4B 100%); }
.game__art--word{ display:grid; place-items:center; grid-template-columns:none; }
.game__art--word b{ font:800 21px/23px var(--f); letter-spacing:.01em; }
.game__art--emoji{ display:grid; place-items:center; grid-template-columns:none; font-size:31px; line-height:1; }

.game--locked .game__art{ filter:saturate(.5); }
.game--locked .game__t b{ color:var(--c-slate); }
.game--locked .game__t span{ color:var(--c-text-3); }
.game__lock{
  flex:0 0 auto; width:40px; height:40px; border-radius:50%;
  background:#C7CDDA; display:flex; align-items:center; justify-content:center;
  box-shadow:0 4px 12px rgba(28,39,76,.12);
}
.game__lock svg{ width:18px; height:18px; color:#fff; }
"""

LOCK_SVG = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" '
            'stroke-linecap="round" stroke-linejoin="round">'
            '<rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 1 1 8 0v3"/></svg>')

def row(art_cls, art_inner, name, meta, cat, toast):
    return (
        '              <button class="game game--locked" type="button" data-toast="' + toast + '">\n'
        '                <span class="game__art ' + art_cls + '">' + art_inner + '</span>\n'
        '                <span class="game__t">\n'
        '                  <b>' + name + '</b>\n'
        '                  <span>' + meta + '</span>\n'
        '                  <span class="game__cat">' + cat + '</span>\n'
        '                </span>\n'
        '                <span class="game__lock">' + LOCK_SVG + '</span>\n'
        '              </button>\n')

NEW = (
    row("game__art--abc game__art--word", "<b>abc</b>", "So‘zlarni top",
        "6+ yosh · 20 daraja · 4 daqiqa", "English", "Bu o‘yin hali ochilmagan") +
    row("game__art--art game__art--emoji", "🎨", "Ranglarni aralashtir",
        "7+ yosh · 15 daraja · 6 daqiqa", "Grafik dizayn", "Bu o‘yin hali ochilmagan")
)

# 1) CSS — </head> dan oldin
i = s.find("</head>")
assert i > 0 and s.count("</head>") == 1, "</head> aniqlanmadi"
s = s[:i] + "<style>/* GAMES:CSS:START */" + CSS + "/* GAMES:CSS:END */</style>\n" + s[i:]

# 2) mavjud o'yinga kategoriya chipi
anchor = "                  <span>4+ yosh · 12 daraja · 5 daqiqa</span>\n"
assert s.count(anchor) == 1, "birinchi o'yin qatori aniqlanmadi: %d" % s.count(anchor)
s = s.replace(anchor, anchor + '                  <span class="game__cat">Matematika</span>\n', 1)

# 3) ikkita qulflangan o'yin — birinchi o'yindan keyin
close = "              </button>\n            </section>"
assert s.count(close) >= 1
s = s.replace(close,
              "              </button>\n\n              <!-- GAMES:START -->\n" + NEW + "              <!-- GAMES:END -->\n            </section>", 1)

open(TARGET, "w", encoding="utf-8").write(s)
print("o'yinlar bo'limi yangilandi:", round(len(s)/1024), "KB")
