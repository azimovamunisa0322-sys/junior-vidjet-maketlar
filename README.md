# Junior — «Bugungi reja» bosh sahifasi, mobil maket

Veb bosh sahifasining (`junior-academy.vercel.app`, «2. Bugungi reja» varianti)
telefon uchun 1:1 ko'chirilgan varianti.

**Havola:** https://azimovamunisa0322-sys.github.io/junior-vidjet-maketlar/

Kompyuterda ochsangiz — telefon ramkasi ichida. Telefonda ochsangiz —
ramkasiz, to'liq ekran. Ekran kengligi aynan 390 pt.

## Nima ko'chirilgan

Veb sahifadagi hamma qism, veb tartibida:

| # | Blok | Izoh |
|---|---|---|
| 1 | Header | logo, XP, coin, bildirishnoma, menyu |
| 2 | Hero | `0/4 dars` halqasi, «Bugun sizni uzoq kutdim!», `+300 coin` (qulflangan) |
| 3 | Kunlik reja | 3 ta dars qatori, «Hozir shuni qiling» belgisi, `+100 coin`, «Boshlash» |
| 4 | Barcha kurslarim | yig'iladigan, 11 ta kurs: progress halqasi, holat chipi, dars soni, kategoriya |
| 5 | Nega aynan shuncha dars? | yig'iladigan izoh |
| 6 | O'yinlar | gorizontal karusel, 3 ta o'yin |
| 7 | Streak | halqali, 7 kunlik, Joriy / Eng yaxshi |
| 8 | Keyingi vebinar ×2 | **jonli** teskari sanoq |
| 9 | Oylik challenge | binafsha gradient, progress |
| 10 | Mentor yordami | 24/7, «Mentorga yozish» |
| 11 | Kunlik vazifalar | 0/3, uchta qator |
| 12 | Do'stingizni taklif qiling | +1000 coin |
| 13 | Aktivlik kalendari | Sentyabr 2026, 7 faol kun |
| 14 | Pastki navigatsiya | Asosiy · Reyting · Sertifikat · CoinShop · Profil |

Vidjetlarning dizayni va mantig'i o'zgartirilmagan — faqat bitta ustunga
joylashtirilgan.

## Ranglar va o'lchamlar

Hammasi veb versiyaning CSS'idan olingan:

```
brand-500 #fe5b1a   ink-900 #10131a   surface #f5f6f8
brand-600 #ef4308   ink-700 #333a4a   coin    #fec802
brand-50  #fff3ed   ink-500 #6b7280   xp      #7b61ff
brand-100 #ffe3d4   ink-300 #9aa3b2   go      #24ae3c
```

Shrift: **Roboto** 400–900. Animatsiyalar (`jr-float`, `jr-pop`, `jr-flame`,
`jr-rise`, `jr-nudge`, `jr-spin`) ham veb versiyadan.

## Tahrirlash

`index.html` — yig'ilgan fayl, **qo'lda tahrirlanmaydi** (rasmlar base64).
Manba `src/` da:

```
src/part1.html   asos CSS, telefon ramkasi
src/part2.css    header, hero, kunlik reja
src/part3.css    barcha kurslarim, o'yinlar
src/part4.css    vidjetlar, pastki navigatsiya
src/part5.html   header + hero + kunlik reja
src/part6.html   o'yinlar
src/part7.html   8 ta vidjet + pastki navigatsiya
src/part8.html   JS: kurslar ro'yxati, sanoq, kalendar
src/assets/      rasmlar (kichraytirilgan)
```

O'zgartirgandan keyin:

```
cd src && python3 build.py
```

`index.html` qayta yig'iladi. Keyin commit + push — Pages 1–2 daqiqada yangilanadi.

## Eski maket

Bundan oldin shu havolada Flutter ilovasi uslubidagi vidjet maketlari turgan edi
(66 ta holat, profil, bottom sheet'lar). U **git tarixida saqlangan**:

```
git show 5b200bf:index.html > eski-maket.html
```
