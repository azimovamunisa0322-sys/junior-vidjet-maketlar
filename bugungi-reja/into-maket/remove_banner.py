"""Eski «Salom!» bannerini bosh ekrandan olib tashlaydi.
Faqat markup olinadi; CSS va animatsiyalarga tegilmaydi, chunki
mascot uslublari boshqa ekranlarda ham ishlatiladi."""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
TARGET = ROOT / "index.html"
s = open(TARGET, encoding="utf-8").read()

if "<!-- BANNER:REMOVED -->" in s:
    print("banner allaqachon olib tashlangan"); sys.exit()

i = s.find('<section class="banner" id="banner">')
if i < 0:
    sys.exit("banner topilmadi")
j = s.find("</section>", i)
if j < 0:
    sys.exit("banner yopilishi topilmadi")
j += len("</section>")

# oldidagi bo'sh joyni ham olamiz
k = s.rfind("\n", 0, i)
out = s[:k + 1] + "            <!-- BANNER:REMOVED — eski «Salom!» banneri olib tashlandi -->\n" + s[j:].lstrip("\n")
open(TARGET, "w", encoding="utf-8").write(out)
print("banner olib tashlandi:", j - i, "belgi")
