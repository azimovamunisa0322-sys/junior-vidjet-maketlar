"""Eski «Kurslar» bo'limini bosh ekrandan olib tashlaydi.
Uning o'rnini «Bugungi reja» ichidagi «Barcha kurslarim» egallaydi.
Faqat markup olinadi; CSS va rasmlarga tegilmaydi."""
import pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
TARGET = ROOT / "index.html"
s = open(TARGET, encoding="utf-8").read()

if "<!-- COURSES:REMOVED -->" in s:
    print("kurslar bo'limi allaqachon olib tashlangan"); sys.exit()

i = s.find('<section class="courses">')
if i < 0:
    sys.exit("courses bo'limi topilmadi")

# ichma-ich <section> larni hisobga olib yopilishini topamiz
depth, k, end = 0, i, None
while True:
    o = s.find("<section", k + 1)
    c = s.find("</section>", k + 1)
    if c == -1:
        break
    if o != -1 and o < c:
        depth += 1; k = o
    else:
        if depth == 0:
            end = c + len("</section>"); break
        depth -= 1; k = c
if end is None:
    sys.exit("courses yopilishi topilmadi")

j = s.rfind("\n", 0, i)
out = s[:j + 1] + "            <!-- COURSES:REMOVED — eski «Kurslar» bo'limi olib tashlandi -->\n" + s[end:].lstrip("\n")
open(TARGET, "w", encoding="utf-8").write(out)
print("kurslar bo'limi olib tashlandi:", end - i, "belgi")
