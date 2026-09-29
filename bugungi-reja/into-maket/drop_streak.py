"""Eski streak vidjetini karuseldan olib tashlaydi.
Uning o'rnini yangi, to'liq o'lchamdagi streak bo'limi egalladi.
WIDGETS ro'yxatidan bitta qator olinadi — kartochka ham, nuqtasi ham,
o'ng paneldagi holat tanlagichi ham o'zi bilan ketadi."""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
TARGET = ROOT / "index.html"
s = open(TARGET, encoding="utf-8").read()

if "/* STREAK:DROPPED */" in s:
    print("allaqachon olib tashlangan"); sys.exit()

qator = "    ['streak',         'Стрик',            'Streak'],\n"
if qator not in s:
    m = re.search(r"\n\s*\['streak',[^\n]*\n", s)
    if not m:
        sys.exit("WIDGETS dagi streak qatori topilmadi")
    qator = m.group(0)

s = s.replace(qator, "\n    /* STREAK:DROPPED — yangi to'liq bo'lim bilan almashtirildi */\n", 1)
open(TARGET, "w", encoding="utf-8").write(s)
print("karuseldan olib tashlandi")
