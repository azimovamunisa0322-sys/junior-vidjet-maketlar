"""«O'yinlar» bo'limini vidjet karuselidan KEYINGA ko'chiradi.
Tartib: logo -> Bugungi reja -> vidjetlar -> nuqtalar -> O'yinlar."""
import pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
TARGET = ROOT / "index.html"
s = open(TARGET, encoding="utf-8").read()

g = s.find('<section class="games">')
d = s.find('<div class="dots" id="dots"></div>')
if g < 0 or d < 0:
    sys.exit("games yoki dots topilmadi")
if g > d:
    print("tartib allaqachon to'g'ri (o'yinlar nuqtalardan keyin)"); sys.exit()

ge = s.find("</section>", g)
assert s[g:ge].count("<section") == 1, "games ichida ichki <section> bor"
ge += len("</section>")

# bo'lim va uning oldidagi bo'sh qatorni olamiz
start = s.rfind("\n", 0, g)
block = s[start:ge]                    # \n + section
rest = s[:start] + s[ge:]

# endi dots dan keyin joylashtiramiz (indekslar rest ichida qayta hisoblanadi)
d2 = rest.find('<div class="dots" id="dots"></div>')
assert d2 > 0
ins = d2 + len('<div class="dots" id="dots"></div>')
out = rest[:ins] + "\n" + block.lstrip("\n").join(["\n            ", ""]).rstrip() + rest[ins:]

# yuqoridagi qatorni soddalashtiramiz: bloknni o'z holicha qo'yamiz
out = rest[:ins] + "\n" + block.strip("\n") + "\n" + rest[ins:].lstrip("\n")

open(TARGET, "w", encoding="utf-8").write(out)
print("o'yinlar bo'limi nuqtalardan keyinga ko'chirildi")
