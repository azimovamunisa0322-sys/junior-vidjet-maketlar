"""Takroriy pastki «O'yinlar» bo'limini olib tashlaydi.

O'yin endi bosh sahifadagi tezkor doira orqali ochiladi.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[2]
TARGET = ROOT / "index.html"
s = open(TARGET, encoding="utf-8").read()

# Eski qo'shimcha uslublar va butun pastki bo'limni tozalaymiz (idempotent).
s = re.sub(
    r"<style>/\* GAMES:CSS:START \*/.*?/\* GAMES:CSS:END \*/</style>\n",
    "",
    s,
    flags=re.S,
)
s, removed = re.subn(
    r"\n\s*<section class=\"games\">.*?</section>",
    "",
    s,
    count=1,
    flags=re.S,
)

open(TARGET, "w", encoding="utf-8").write(s)
print("pastki o'yinlar bo'limi olib tashlandi:", removed)
