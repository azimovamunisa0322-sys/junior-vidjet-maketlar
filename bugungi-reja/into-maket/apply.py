"""«Bugungi reja» bo'limini maketning index.html iga qo'shadi.
Vidjetlarga, ularning CSS/JS iga umuman tegmaydi — faqat qo'shadi."""
import base64, json, os, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]      # repo ildizi
HERE = pathlib.Path(__file__).parent
ASSETS = ROOT / "bugungi-reja" / "src" / "assets"
TARGET = ROOT / "index.html"

def datauri(p):
    mime = "image/png" if p.suffix == ".png" else "image/jpeg"
    return "data:%s;base64,%s" % (mime, base64.b64encode(p.read_bytes()).decode())

need = ["r1","r2","r3"] + ["c%d" % i for i in range(1, 12)]
imgs = {}
for k in need:
    hit = [p for p in ASSETS.iterdir() if p.stem == k]
    if not hit:
        sys.exit("rasm topilmadi: " + k)
    imgs[k] = datauri(hit[0])

html = open(HERE / "plan.html", encoding="utf-8").read()
css  = open(HERE / "plan.css",  encoding="utf-8").read()
js   = open(HERE / "plan.js",   encoding="utf-8").read()

html = re.sub(r"\{\{IMG:([a-z0-9]+)\}\}", lambda m: imgs[m.group(1)], html)

s = open(TARGET, encoding="utf-8").read()

# avvalgi urinishni tozalab, qaytadan qo'shamiz (idempotent)
s = re.sub(r"\n *<!-- PLAN:START -->.*?<!-- PLAN:END -->", "", s, flags=re.S)
s = re.sub(r"<style>/\* PLAN:CSS:START \*/.*?/\* PLAN:CSS:END \*/</style>\n", "", s, flags=re.S)
s = re.sub(r"\n<script>/\* PLAN:JS:START \*/.*?/\* PLAN:JS:END \*/</script>", "", s, flags=re.S)

# 1) CSS — hujjatning </head> idan oldin ALOHIDA <style> blok.
#    Diqqat: faylda </style> o'nlab marta uchraydi, lekin ular JS satrlari
#    ichidagi ekran shablonlari. </head> esa bitta va hujjat darajasida.
i = s.find("</head>")
assert i > 0 and s.count("</head>") == 1, "</head> aniqlanmadi"
s = s[:i] + "<style>/* PLAN:CSS:START */" + css + "/* PLAN:CSS:END */</style>\n" + s[i:]

# 2) HTML — banner bilan games orasiga
anchor = '            <section class="games">'
assert s.count(anchor) == 1, "games bo'limi aniqlanmadi: %d" % s.count(anchor)
s = s.replace(anchor,
              "            <!-- PLAN:START -->\n" + html + "            <!-- PLAN:END -->\n\n" + anchor, 1)

# 3) JS — </body> dan oldin, rasm lug'ati bilan
j = s.find("</body>")
assert j > 0 and s.count("</body>") == 1, "</body> aniqlanmadi"
s = (s[:j] + "<script>/* PLAN:JS:START */window.__PLANIMG__=" + json.dumps(imgs) + ";"
     + js + "/* PLAN:JS:END */</script>\n" + s[j:])

open(TARGET, "w", encoding="utf-8").write(s)
print("qo'shildi:", round(len(s) / 1024), "KB")
