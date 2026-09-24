"""Mavjud maketdagi UI/UX kamchiliklarini tuzatuvchi qatlam.
Hech narsa o'chirilmaydi — faqat ustidan yoziladi, shuning uchun
bu skriptni olib tashlasa maket avvalgi holiga qaytadi."""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
TARGET = ROOT / "index.html"
s = open(TARGET, encoding="utf-8").read()

s = re.sub(r"<style>/\* POLISH:START \*/.*?/\* POLISH:END \*/</style>\n", "", s, flags=re.S)

CSS = """
/* ============================================================
   SAYQAL QATLAMI — maketning o'z uslublari ustidan yoziladi.
   Uch narsani tuzatadi: tartib chizig'i, tegish maydonlari,
   kichik matn kontrasti.
   ============================================================ */

/* ---------- 1. Tartib chizig'i ----------
   Vidjet kartasi 344 px (dasturchi uchun spetsifikatsiya, tegilmaydi),
   lekin u 390 px ekranda markazlangani uchun 23 px dan boshlanardi —
   hero, darslar va o'yinlar esa 16 px dan. Endi hammasi 16 px dan
   boshlanadi; o'ngda 30 px keyingi karta ko'rinib turadi, karuselda
   shunday bo'lishi kerak ham. */
.band .track{ padding-left:16px !important; scroll-padding-left:16px !important; }

/* ---------- 2. Tegish maydonlari ----------
   Apple HIG 44x44 pt talab qiladi. Kartalar 192 px ga qat'iy
   sozlangani uchun tugmalarning KO'RINISHI o'zgarmaydi — faqat
   ko'rinmas tegish maydoni kengaytiriladi. */
/* DIQQAT: .tabbar button emas — markazdagi .fab absolute joylashgan,
   unga position:relative berilsa o'ng chetga emas, chap chetga tushib
   qoladi. Faqat oddiy tab tugmalari olinadi. */
.wcard__btn, .wcard__ibtn, .game, .more, .tabbar .tab{ position:relative; }
.wcard__btn::after, .wcard__ibtn::after{
  content:""; position:absolute; left:0; right:0;
  top:50%; transform:translateY(-50%); height:44px;
}
.wcard__ibtn::after{ left:-6px; right:-6px; }
.more::after{
  content:""; position:absolute; inset:-12px -8px;
}

/* ---------- 3. Kichik matn kontrasti ----------
   Oq va och-kulrang fonda #1CB0F6 -> 2.44, #93A2C0 -> 2.43,
   #B4B4B4 -> 2.02 edi. WCAG AA uchun 4.5 kerak.
   Rang tizimi o'zgarmaydi: fon va to'ldirishlar avvalgidek,
   faqat MATN to'qroq variantga o'tadi. */
.wcard__when, .wcard__sub, .wcard__meta{ color:#0A6E9F; }
.wcard__note, .wcard__cap, .wcard__hint{ color:#5C6678; }
.game__t span{ color:#5C6678; }
.game__cat{ color:#4F5769; }
/* MATN tokenlari to'qlashtirildi. Bular nomidan ko'rinib turibdiki
   faqat matn uchun — fon va to'ldirishlarga tegilmadi:
     --c-text-2  #999999 (2.85)  -> #5C6678 (5.8)
     --c-text-3  #B4B4B4 (2.02)  -> #5C6678 (5.8)
   Brend va holat ranglarining FONI avvalgidek qoladi, faqat ular
   ustidagi matn to'qroq variantga o'tadi. */
:root{
  --c-text-2:#5C6678;
  --c-text-3:#5C6678;
}
/* ---------- 4. To'ldirilgan yuzalar ----------
   Oq matn #FF4F28 fonda 3.28 beradi, AA uchun 4.5 kerak.
   Brend rangi (--c-brand #FF4F28) O'ZGARMAYDI — u ingichka
   aksentlarda (chap chiziq, halqa, chegara) qoladi. Faqat TO'LDIRILGAN
   yuzalar — tugmalar, belgilar, ikonka plitkalari — #D8390F ga o'tadi,
   shunda ularning ustidagi oq matn 4.65 bo'ladi.
   Bitta qoida: to'ldirilgan = to'q, aksent = yorqin. */
.wcard__btn:not(.wcard__btn--dis),
.plan__go--fill,
.plan__item--now .plan__step,
.plan__allic,
.game__play,
.ai-b--me, .ai-send, .lb-chip, .nf-badge, .pf-out,
.dot.is-active, .nf-dot,
.ic--brand, .pf-ic--brand{
  background-color:#D8390F !important;
}
.plan__go--fill{ border-color:#D8390F !important; }

/* holat chiplari va aksent matnlar — fon o'zgarmaydi, matn to'qlashadi */
.wcard__chip--go, .wcard__chip--ok, .s-chip--go, .d__c{ color:#2F7A00; }
.wcard__chip, .ck-eyebrow b, .ck-hero__kind, .d__l{ color:#C2340D; }
.game--locked .game__t b{ color:#5C6678; }

/* qolgan aksent matnlar — och fonda o'qilmasdi */
.ck-eyebrow b, .ck-hero__kind, .rf-coin, .d__l{ color:#C2340D !important; }
.d--full .d__c, .d--today .d__c{ color:#2F7A00 !important; }
.d--part .d__c{ color:#8A6600 !important; }
.d--view .d__c{ color:#0A6E9F !important; }
.pay-i, .rc-i{ color:#5C6678 !important; }
.game__t b{ color:var(--c-navy); }

/* teskari sanoq yorliqlari (kun / soat / daqiqa / soniya) 10 px va
   #B4B4B4 edi — 1.96. Endi 5.6. */
.wtimer__b span, .wtimer__b small, .wtimer__b i{ color:#5C6678 !important; }
.wtimer__b > *:last-child{ color:#5C6678; }
.tabbar button span{ color:inherit; }
"""

i = s.find("</head>")
assert i > 0 and s.count("</head>") == 1, "</head> aniqlanmadi"
s = s[:i] + "<style>/* POLISH:START */" + CSS + "/* POLISH:END */</style>\n" + s[i:]
open(TARGET, "w", encoding="utf-8").write(s)
print("sayqal qatlami qo'yildi")
