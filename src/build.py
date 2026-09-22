import base64, os, re, json
import pathlib
SP = str(pathlib.Path(__file__).parent)
A = os.path.join(SP, "assets")

def datauri(path):
    ext = path.rsplit(".", 1)[1].lower()
    mime = "image/png" if ext == "png" else "image/jpeg"
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(path, "rb").read()).decode())

imgs = {fn.rsplit(".",1)[0]: datauri(os.path.join(A, fn))
        for fn in sorted(os.listdir(A)) if fn.endswith((".png", ".jpg"))}

doc = ""
for p in ["part1.html","part2.css","part3.css","part4.css",
          "part5.html","part5b.html","part6.html","part7.html","part8.html"]:
    doc += open(os.path.join(SP, p), encoding="utf-8").read()

doc = doc.replace("\n<script>\n/* ===", "<script>window.__IMG__=" + json.dumps(imgs) + ";</script>\n<script>\n/* ===", 1)

def repl(m):
    k = m.group(1)
    if k not in imgs: raise SystemExit("YO'Q RASM: " + k)
    return imgs[k]
doc = re.sub(r"\{\{IMG:([a-z0-9]+)\}\}", repl, doc)
assert "{{IMG" not in doc and "window.__IMG__" in doc

open(os.path.join(SP, "..", "index.html"), "w", encoding="utf-8").write(doc)
print("build:", round(len(doc)/1024), "KB")
