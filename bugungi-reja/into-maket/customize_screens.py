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

open(TARGET, "w", encoding="utf-8").write(s)
print("profil qatorlari olib tashlandi:", removed)
print("o'yinlar ekrani qo'shildi: 4 ta")
