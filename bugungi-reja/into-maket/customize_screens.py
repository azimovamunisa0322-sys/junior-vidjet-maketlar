"""Profilni soddalashtiradi va mobil o'yinlar ro'yxatini qo'shadi."""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[2]
HERE = pathlib.Path(__file__).parent
TARGET = ROOT / "index.html"

s = open(TARGET, encoding="utf-8").read()
prefix = "window.__SCREENS__="
start = s.find(prefix)
if start < 0:
    raise SystemExit("window.__SCREENS__ topilmadi")
start += len(prefix)

screens, consumed = json.JSONDecoder().raw_decode(s[start:])
end = start + consumed
profile = screens["profile"]

remove_patterns = [
    r'<button class="pf-inf[^>]*data-open="(?:group|curator|mentorinfo)"[^>]*>.*?</button>',
    r'<button class="pf-row"[^>]*data-open="courses"[^>]*>.*?</button>',
    r'<button class="pf-row"[^>]*data-tab="(?:certificates|coinshop|leaders)"[^>]*>.*?</button>',
]
removed = 0
for pattern in remove_patterns:
    profile, count = re.subn(pattern, "", profile, flags=re.S)
    removed += count

screens["profile"] = profile
screens["games"] = open(HERE / "games-screen.html", encoding="utf-8").read()

if 'data-go="help"' not in screens["profile"]:
    help_row = (
        '<button class="pf-row" type="button" data-go="help">'
        '<span class="pf-row__ic pf-ic--blue"><b style="font:800 20px/1 var(--f);color:#fff">?</b></span>'
        '<span class="pf-row__t">Yordam</span>'
        '<span aria-hidden="true" style="font:600 24px/1 var(--f);color:#9AA8C4">›</span>'
        '</button>\n  '
    )
    out_anchor = '<button class="pf-out"'
    if out_anchor not in screens["profile"]:
        raise SystemExit("Profilning Chiqish tugmasi topilmadi")
    screens["profile"] = screens["profile"].replace(out_anchor, help_row + out_anchor, 1)

screens["help"] = open(HERE / "help-screen.html", encoding="utf-8").read()
screens["courses"] = open(HERE / "courses-screen.html", encoding="utf-8").read()

encoded = json.dumps(screens, ensure_ascii=False, separators=(",", ":"))
s = s[:start] + encoded + s[end:]

screen_anchor = "const SCREENS = [['profile', 'Профил'],"
if "['games', 'Ўйинлар']" not in s:
    if screen_anchor not in s:
        raise SystemExit("SCREENS ro'yxati topilmadi")
    s = s.replace(
        screen_anchor,
        "const SCREENS = [['profile', 'Профил'], ['games', 'Ўйинлар'],",
        1,
    )
if "['help', 'Ёрдам']" not in s:
    games_anchor = "['games', 'Ўйинлар'],"
    if games_anchor not in s:
        raise SystemExit("O'yinlar ekrani SCREENS ro'yxatida topilmadi")
    s = s.replace(games_anchor, games_anchor + " ['help', 'Ёрдам'],", 1)
if "['courses', 'Курсларим']" not in s:
    help_anchor = "['help', 'Ёрдам'],"
    if help_anchor not in s:
        raise SystemExit("Yordam ekrani SCREENS ro'yxatida topilmadi")
    s = s.replace(help_anchor, help_anchor + " ['courses', 'Курсларим'],", 1)

open(TARGET, "w", encoding="utf-8").write(s)
print("profil qatorlari olib tashlandi:", removed)
print("o'yinlar ekrani qo'shildi: 4 ta")
print("yordam ekrani qo'shildi")
print("kurslarim ekrani qo'shildi: 11 ta")
