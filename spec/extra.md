# ExtraLessonWidget — `extra`

Манба: макет `design/cards/extra.html` (7 ҳолат, асосийси `extra-upcoming`), панеллар `design/sheets/extra.html` (7 панел). Асос: `spec/booking.md` нинг эски `extra-upcoming` / `extra-cancel-locked` / `extra-missed` ҳолатлари — улар шу ерга кўчирилди ва кенгайтирилди. Токенлар `design/css/tokens.css`, умумий класслар `design/css/card-base.css`, панел класслари `design/css/sheet.css`. Карусель тартиби (`js/app.js` `WIDGETS`): `webinar` → `booking` → **`extra`** → `payment` → …

## 1. Вазифаси

Талабанинг битта банд қилинган **қўшимча дарси** (ментор билан яккама-якка) ҳақида: қачон бошланади, унгача аниқ қанча вақт қолди ва иккита ҳаракат — `Batafsil` (тафсилот панели) ва ўчириш (иккиламчи иконка-тугма). Илгари бу ҳолатлар `booking` карточкасининг ичида эди; ажратилгандан кейин чип ва изоҳ ўрнини **тўрт блокли тескари саноқ** эгаллади — шу виджетнинг ягона фарқи. Ментор, курс, мавзу, давомийлик ва ўчириш ойнаси қоидалари карточкада эмас, панелда.

## 2. Анатомия

Карточка `344×192 pt`, падинг `--card-pad` 12 → ички қути `320×168 pt`, радиус `--r-card` 18, фон `--c-card` `#FFFFFF`, соя `--shadow-card` `0 6 18 rgba(28,39,76,.06)`. Тик оқим, элементлар ораси `--s-2` 8 pt.

Шрифт шкаласи катталашгандан кейин (`--t-title` 15/18 → **17/21**, `--t-body` 13/16 → **14/18**, `--t-small` 12/15 → **13/16**, `--t-btn` 13/16 → **14/17**) сарлавҳа қатори **35 → 39** га, сатрсиз сарлавҳа **18 → 21** га чиқди. Карточка 192 ва ички қути 168 ўзгармагани учун фарқ `flex` танадан олинди: 81 → **77**, 98 → **95**.

Баландлик бюджети (168 pt), ҳолат бўйича:
- **таймерли** (`extra-upcoming`, `extra-today`, `extra-cancel-locked`): сарлавҳа қатори **39** (21 + 2 + 16) + 8 + тана **77** + 8 + пастки қатор 36 = **168**; таймер **55** pt, тананинг **марказида** (`.wcard__body:has(> .wtimer) { justify-content: center }`) — устида 11, остида 11 pt бўш;
- **`extra-missed`**: **39** + 8 + тана **77** + 8 + 36 = **168**; изоҳ **48** pt (2×16 + 16), танада 29 pt бўш;
- **сатрсиз** (`empty`, `error`): **21** + 8 + тана **95** + 8 + 36 = **168**; матн 18 pt / хато қатори 40 pt;
- **`loading`**: 32 (16 + 4 + 12 — скелет ўлчамлари қатъий, шрифтга боғлиқ эмас) + 8 + **84** + 8 + 36 = **168**.

| Элемент | Класс | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|---|
| Сарлавҳа қатори | `.wcard__head` | 320×**39** (сатр билан) ёки 320×**21** | — | — | `align-items:flex-start`; чип фақат `extra-missed` да (чип 22 pt — қатор баландлигини матн устуни белгилайди) |
| Сарлавҳа | `.wcard__title` | **21 pt** қатор | `--t-title` 600 **17/21**, letter-spacing −0.1 | `--c-text` `#000000` | Ҳамма ҳолатда `Qo'shimcha dars` (≈ **140 pt**, аввал 124) |
| Кичик сатр | `.wcard__sub` + `--blue` / `--red` | **16 pt**, `margin-top 2` | `--t-small` 500 **13/16** | кўк `--c-blue` `#1CB0F6`; қолдирилганда `--c-red` `#ED0000` | `15 sentabr, 16:00` / `Bugun, 16:00` (Тошкент, қаттиқ UTC+5, 24 соат) |
| Чип | `.wcard__chip--pink` | 22 pt, падинг `0 8`, радиус `--r-pill` 999 | 600 **13/16** | фон `--c-pink-soft` `#FFE4EA`, матн `--c-red` `#ED0000` | Фақат `Kelmadi` (≈ **67 pt**, аввал 62). Саноқ чипи йўқ — унинг ўрнида таймер. Баландлик 22 қатъий, матн қатори 16 — сиғади, захира 3 pt |
| Тана | `.wcard__body` | 320×**77** / **95** (flex 1) | — | — | Устун, оралиқ 6; таймерли ҳолатларда `justify-content: center` |
| Таймер | `.wtimer` | 320×**55**; 4 устун × 75,5, gap 6 | — | — | `data-cd="KK:SS:DD:SS"`, ҳар сонияда 4 та `<b>` янгиланади. Танада ягона элемент → марказда (карточка координатасида у **70–125**) |
| Таймер блоки | `.wtimer__b` | 75,5×**55**, падинг `8 0 7`, радиус `--r-inner` 12 | рақам 600 **24/28**, ls **−.6**, tabular-nums; ёрлиқ 500 **10/12**, ls .3, UPPERCASE | фон `--c-row` `#F8F8FC`; рақам `--c-text` `#000000`; ёрлиқ `--c-text-3` `#B4B4B4` | Баландлик 8 + 28 + 12 + 7 = **55**. Ёрлиқлар: `KUN` `SOAT` `DAQIQA` `SONIYA` |
| Таймер «soon» | `.wtimer--soon` | шу ўлчам | шу шрифт | фон `--c-brand-soft` `#FFEDE7`; рақам `--c-brand` `#FF4F28`; ёрлиқ `--c-brand`, `opacity .7` | Дарс **бугун** бўлса ёқилади |
| Изоҳ | `.wcard__note--pink` | ≤ 2 қатор → **48 pt** (2×16 + 8 + 8), падинг `8 10`, радиус 12 | 500 **13/16** | фон `--c-pink-soft` `#FFE4EA`, матн `--c-text` | Фақат `extra-missed`; робот бор → `.ex-pad`, кенглик 248 pt, ≤ **50** белги (аввал 54) |
| Кулранг матн | `.wcard__text.wcard__muted` | 1 қатор **18 pt** | `--t-body` 500 **14/18** | `--c-text-2` `#999999` | Фақат `empty`, `.ex-pad--80` → кенглик 240 pt. `Qo'shimcha dars yo'q` ≈ **124 pt** — 1 қаторда қолади |
| Хато қатори | `.ex-err` | 40 pt, gap 10 | сарлавҳа `--t-body` **14/18**, сабаб `--t-small` **13/16** | `--c-text` / `--c-text-2` `#999999` | `robot4.png` 40×40 `object-fit:contain`, `<img>` (absolute эмас). Матн устуни 18 + 16 = 34 ≤ 40 — робот баландлиги белгилайверади |
| Пастки қатор | `.wcard__foot` | 36 pt, gap 8, `margin-top:auto` | — | — | `extra-missed` да `.ex-pad` |
| Асосий тугма | `.wcard__btn` | 36 pt, радиус `--r-btn` 12, падинг `0 14`, `flex:1` | `--t-btn` 600 **14/17** | фон `--c-brand` `#FF4F28`, матн `#FFFFFF` | ibtn билан бирга кенглиги 280 pt; ёлғиз бўлса 320 pt; `extra-missed` да 248 pt |
| Ghost тугма | `.wcard__btn--ghost` | шу ўлчам | 600 **14/17** | фон `--c-row` `#F8F8FC`, матн `--c-text` | Фақат `error`: `Qayta urinish` |
| Иконка-тугма | `.wcard__ibtn` | визуал 32×32, радиус 10, иконка 18 | — | ўчириш `.ex-ibtn--danger`: фон `--c-pink-soft` `#FFE4EA` + `close.svg` `--c-red` `#ED0000`; блок `.ex-ibtn--locked`: фон `--c-line-2` `#F0F0F0` + `lock.svg` `--c-text-3` `#B4B4B4` | Босиш зонаси 44×44 (шаффоф падинг). Блокланган вариант **ўчирилган эмас** — босилади ва сабабни кўрсатади |
| Робот | `.wcard__art` | `extra-missed`: `time_up.png` 56 pt, `--art:56px`, `.wcard__art--bottom` (right 8, bottom 8); `empty`: `robot3.png` 72 pt (right 8, top 8) | — | — | `pointer-events:none`, `object-fit:contain` |
| Скелет | `.wcard--skeleton .sk` | сарлавҳа 16×60 %, сатр 12×40 % (`margin-top 4`), таймер **55** pt (радиус 12), тугма 36 (`flex:1`), ibtn 32×32 (радиус 10) | — | `#EEF0F3 → #F6F7F9` градиент, 1,2 с | Асосий (таймерли) ҳолат қолипини такрорлайди. ⚠️ `cards/extra.html` даги `.sk--timer` ҳамон **45px** — ҳақиқий таймер 55, иловада 55 қилинсин, акс ҳолда юклашдан ҳақиқий ҳолатга ўтганда тана сакрайди |

Кенглик текшируви — **қайта ҳисобланди** (SF Pro тахминий, янги шкала: 17/600 ≈ **9,4** pt/белги, 13/600 ≈ **7,2**, 13/500 ≈ **5,7**, 14/500 ≈ **6,2**; рақамлар тахмин, рендерда текширилсин): `Qo'shimcha dars` (**140**) + 8 + `Kelmadi` чипи (**67**) = **215** ≤ 320 — захира 126 дан 105 pt га тушди. Таймер устуни 75,5 pt — энг узун ёрлиқ `SONIYA` ≈ **40 pt** (аввал 36), рус `СЕКУНДЫ` ≈ **48 pt** (аввал 43); иккиси ҳам сиғади, лекин рус вариантида захира 27 pt — узунроқ ёрлиқ қўйилмасин.

## 3. Ҳолатлар

Кўриниш `event.kind = extraLesson` + `status` + фаза + бугунги кун (Тошкент) + `canCancel` дан ҳисобланади. `canCancel` = бошланишига ≥ **30 дақиқа**.

| `data-state` | Қачон кўринади | Чип / таймер | Тугмалар | Қайси панелни очади |
|---|---|---|---|---|
| `extra-upcoming` **(асосий)** | `status ≠ no_show`, дарс куни бугун эмас, `canCancel` | Чип йўқ; `.wtimer` нейтрал, `02:03:15:00` (2 кун 3 соат 15 дақиқа) | `Batafsil` (280 pt) + ўчириш ibtn `close.svg` | `extra` / ibtn → `cancel-confirm` |
| `extra-today` | Дарс **бугун**, бошланишига > 30 дақиқа | Чип йўқ; `.wtimer--soon` (апельсин), `00:00:47:12` | `Batafsil` + ўчириш ibtn `close.svg` | `extra` / ibtn → `cancel-confirm` |
| `extra-cancel-locked` | Бошланишига < 30 дақиқа (`canCancel = false`) | Чип йўқ; `.wtimer--soon`, `00:00:20:00` | `Batafsil` + блокланган ibtn `lock.svg` (`.ex-ibtn--locked`) | `extra-locked` / ibtn → `cancel-locked` (огоҳлантириш) |
| `extra-missed` | `status = no_show` | Пушти чип `Kelmadi`; **таймер йўқ**; қизил сатр, пушти изоҳ, `time_up.png` 56 pt | Ягона тугма `Mentorga yozish` (248 pt) | `extra-missed` |
| `empty` | Фаол қўшимча дарс йўқ | Сатр, чип ва таймер йўқ; `robot3.png` 72 pt ўнг-юқорида, кулранг матн | Тўлиқ кенгликдаги `Darsga yozilish` | `book` |
| `loading` | Биринчи сўров, маълумот йўқ | Скелет: сарлавҳа + сатр + таймер қолипи + тугма + ibtn | Босилмайди (`cursor:default`) | — |
| `error` | Сўров хатоси, кэш йўқ | `robot4.png` 40 pt + `Yuklab bo'lmadi` + сабаб қатори | Ghost `Qayta urinish` | `error` (огоҳлантириш) |

Изоҳлар: (1) кэш бор бўлса хатода эски карточка қолади, устига toast чиқади; (2) бир вақтда бир нечта қўшимча дарс банд бўлса карточкада **энг яқини** кўринади, қолгани `booking` виджетининг `multi`/`list` панелида; (3) `startsAt` нотўғри (`DateTime.tryParse == null`) → `error` кўриниши, таймер чизилмайди; (4) `extra-today` → `extra-cancel-locked` ўтиши таймер 30:00 га етганда автоматик бўлади, сўровсиз.

## 4. Амаллар ва панеллар

Ҳамма босиладиган элемент ≥ 44×44 pt; чип, изоҳ ва таймер босилмайди (карточка босишига киради).

| Элемент | Ҳолатлар | Нима қилади |
|---|---|---|
| Карточка танаси | `loading`/`error` дан ташқари ҳаммаси | Карточкадаги биринчи `data-open` панелини очади (`extra`, `extra-locked`, `extra-missed`, `book`) |
| `Batafsil` | `extra-upcoming`, `extra-today` | `extra` панели |
| `Batafsil` | `extra-cancel-locked` | `extra-locked` панели (ўчириш тугмаси ўчирилган ҳолда) |
| ibtn `close.svg` | `extra-upcoming`, `extra-today` (`canCancel`) | `cancel-confirm` тасдиқ панели |
| ibtn `lock.svg` | `extra-cancel-locked` | `cancel-locked` огоҳлантириши. Ўчирилган эмас — сабаб кўрсатилади |
| `Mentorga yozish` | `extra-missed`, панелларнинг биринчи тугмаси | Илованинг `ta_chat` экрани, ментор олдиндан танланган (макетда `mentor` панели `sheets/booking.html` да, `extra` тўпламида дубликати йўқ) |
| `Darsga yozilish` | `empty` | `book` панели → илованинг «Qo'shimcha darsga yozilish» оқими (сана → ментор → вақт) |
| `Qayta urinish` | `error` | Bookings сўровини қайтаради; карточка `loading` га ўтади |

Панеллар (`sheets/extra.html`, жами 7 та). Уч тури: **пастки панел** (`data-kind="sheet"`, пастдан чиқади, радиус `24 24 0 0`, max-height 88 %), **огоҳлантириш** (`alert`, марказда, ён чети 20 pt, радиус 20, max-height 76 %), тўлиқ экран бу виджетда йўқ. Ёпиш: скрим `rgba(28,39,76,.34)`, ✕ тугмаси, Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Тугмалар |
|---|---|---|---|---|
| `extra` | sheet | карточка: `extra-upcoming`, `extra-today` | Кўк сарлавҳа сатри (`.bk-blue` `#1CB0F6`), «Darsga qadar qolgan vaqt» ҳинти (`.s-hint` **12/15**), катта `s-timer` (**63 pt**, рақам 600 24/28 — қатъий, ўзгармади; ёрлиқ `--t-tiny` **12/15**), ментор қатори (`bk-ava` 44×44, радиус 14), 4 та `s-row` (Kurs, Mavzu, Davomiyligi, Boshlanishiga), кўк `s-note`, ҳинт: ўчириш 30 дақиқада ёпилади | `Mentorga yozish` · `Darsni o'chirish` (`s-btn--danger`) |
| `extra-locked` | sheet | карточка: `extra-cancel-locked` | Шу тузилма, лекин `s-timer--soon` (апельсин, `00:00:20:00`), сарлавҳа сатри `Bugun, 16:00 · 20 daqiqa qoldi`, охирги ҳинт `lock.svg` билан | `Mentorga yozish` · `Darsni o'chirish` (`s-btn--disabled`, босилса `cancel-locked`) |
| `extra-missed` | sheet | карточка: `extra-missed` | Қизил сарлавҳа сатри, `time_up.png` 96 pt (`.s-art`), пушти `s-note`, 3 та `s-row` (Mentor, Kurs, Mavzu), ҳинт: 30 дақиқа қоидаси | `Mentorga yozish` · `Qo'shimcha darsga yozilish` (`s-btn--ghost`) |
| `cancel-confirm` | sheet | карточка `extra-upcoming`/`extra-today` ibtn; панел `extra` | 3 та `s-row` (Dars, Sana, Mentor), пушти `s-note` (бўшаган соатни бошқа олиши мумкин), ҳинт `circle.svg` | `Ha, o'chirish` (`s-btn--danger`) · `Bekor qilish` (`s-btn--ghost`) |
| `cancel-locked` | alert | карточка `extra-cancel-locked` ibtn; панел `extra-locked` | Бир абзац: кеч қолинди, дарсга қўшилинг ёки менторга хабар беринг | `Mentorga yozish` · `Tushunarli` |
| `book` | sheet | карточка: `empty`; панел: `extra-missed` | 3 та `s-item` қадам (сана → ментор → вақт, ўнгда 1/2/3), кўк `s-note` (60 дақиқа, 30 дақиқада ёпилади), ҳинт: кунига битта дарс | `Qo'shimcha darsga yozilish` + `arrow_right.svg` · `Yopish` |
| `error` | alert | карточка: `error` | Қизил сатр, бир абзац, ҳинт: алоқа тикланса рўйхат ўзи янгиланади | `Qayta urinish` · `Keyinroq` |

`cancel-confirm` да `Ha, o'chirish` босилгач: `isPending` — иккала тугма ва ёпиш блокланади; муваффақиятда toast `Bekor qilindi`, карточка **оптимистик** равишда `empty` га (ёки кейинги қўшимча дарсга) ўтади, кейин bookings қайта сўралади.

## 5. Таймер

Тўлиқ қоида: `spec/taymer.md`. Шу виджетга тегишли қисми:

| Ўрин | Класс | Макетдаги қиймат | Қачон |
|---|---|---|---|
| Карточка, `extra-upcoming` | `.wtimer` | `data-cd="02:03:15:00"` | Дарс бугун эмас — нейтрал (`--c-row` фон, қора рақам) |
| Карточка, `extra-today` | `.wtimer.wtimer--soon` | `data-cd="00:00:47:12"` | Дарс бугун — апельсин |
| Карточка, `extra-cancel-locked` | `.wtimer.wtimer--soon` | `data-cd="00:00:20:00"` | Бугун ва < 30 дақиқа — апельсин |
| Панел `extra` | `.s-timer` | `data-cd="02:03:15:00"` | Карточкадаги саноқ панелда давом этади |
| Панел `extra-locked` | `.s-timer.s-timer--soon` | `data-cd="00:00:20:00"` | — |

Қоидалар: тўрт блок доим кўринади (нол бўлса ҳам `00`), рақамлар `tabular-nums` — сакрамайди; янгиланиш **1 сонияда бир**, фақат карточка экранда кўринаётганда (`VisibilityDetector`); фон/олд ўтишида (`AppLifecycleState.resumed`) қиймат вақтдан қайта ҳисобланади, санаб турилмайди. «soon» ёқилиши — сана Тошкент бўйича бугун бўлганда (соатга эмас, **кунга** боғлиқ). Нолга етганда карточка `extra-missed` ёки (ментор белгиласа) фаол ҳолатга ўтади; манфий саноқ чизилмайди. `extra-missed`, `empty`, `error` да таймер йўқ, `loading` да унинг ўрнида **55 pt** скелет (маketдаги `.sk--timer` ҳали 45 — тузатилиши керак).

## 6. Матнлар (лотин) ва русча муқобили

| Ўрни | UZ (лотин) | RU | Изоҳ |
|---|---|---|---|
| Сарлавҳа | `Qo'shimcha dars` | `Доп. занятие` | Тўлиқ шакл `Дополнительное занятие` энди ≈**207 pt** (аввал 183): таймерли ҳолатларда сиғади, `extra-missed` да чип билан 207 + 8 + 67 = **282** ≤ 320 — сиғади, лекин захира 38 pt. Қисқа шакл қолдирилсин |
| Сатр | `15 sentabr, 16:00` / `Bugun, 16:00` | `15 сентября, 16:00` / `Сегодня, 16:00` | Тошкент куни |
| Чип | `Kelmadi` | `Не пришёл` | Илова сатри |
| Таймер ёрлиқлари | `KUN` `SOAT` `DAQIQA` `SONIYA` | `ДНИ` `ЧАСЫ` `МИНУТЫ` `СЕКУНДЫ` | Ёрлиқ 9 pt эмас, энди **10 pt**. Устун 75,5 pt — `SONIYA` ≈ 40, `СЕКУНДЫ` ≈ 48 pt, ҳаммаси сиғади. ⚠️ `spec/taymer.md` да RU ёрлиқлари қисқа шаклда (`дн.` `ч` `мин` `сек`) ёзилган — икки ҳужжат орасидаги бу фарқ **шрифт ўзгаришидан олдин ҳам бор эди**, маҳсулот эгаси битта вариантни танласин |
| Изоҳ (missed) | `Darsga kelmadingiz. Mentor bilan bog'laning.` | `Вы пропустили урок. Свяжитесь с ментором.` | ≤ **50** белги (робот бор) — шрифт 12/15 дан 13/16 га ўсгани учун лимит 54 дан тушди. UZ 43, RU 40 белги — иккиси ҳам сиғади, лекин кирилл кенгроқ: RU да **40 белгидан** ошмасин |
| Бўш матн | `Qo'shimcha dars yo'q` | `Дополнительных занятий нет` | — |
| Тугмалар | `Batafsil` · `Mentorga yozish` · `Darsga yozilish` · `Qayta urinish` | `Подробнее` · `Написать ментору` · `Записаться на урок` · `Повторить попытку` | — |
| ibtn ёрлиқлари | `Bekor qilish` · `Bekor qilish yopilgan` | `Отменить` · `Отмена закрыта` | `tooltip` ва `Semantics(label)` |
| Хато | `Yuklab bo'lmadi` · `Internet aloqasini tekshiring` | `Не удалось загрузить` · `Проверьте интернет` | — |
| Панел сарлавҳалари | `Qo'shimcha dars` · `Qo'shimcha darsga kelmadingiz` · `Darsni o'chirishni xohlaysizmi?` · `Darsni o'chirib bo'lmaydi` · `Qo'shimcha darsga yozilish` · `Bandlovlar yuklanmadi` | `Доп. занятие` · `Вы пропустили доп. занятие` · `Отменить занятие?` · `Занятие нельзя отменить` · `Запись на доп. занятие` · `Бронирования не загрузились` | — |
| Панел тугмалари | `Darsni o'chirish` · `Ha, o'chirish` · `Bekor qilish` · `Tushunarli` · `Yopish` · `Keyinroq` | `Отменить занятие` · `Да, отменить` · `Отмена` · `Понятно` · `Закрыть` · `Позже` | — |
| Асосий ҳинт | `Darsni o'chirish boshlanishiga 30 daqiqa qolganda yopiladi.` | `Отмена закрывается за 30 минут до начала.` | `s-hint`, **12/15** (`--t-tiny`) |
| Блок сабаби | `Bekor qilish uchun kech qoldingiz (minimum 30 daqiqa oldin).` | `Слишком поздно отменять (минимум за 30 минут).` | Мавжуд илова сатри `booking.error.cancel_too_late` |

## 7. Flutter учун изоҳлар

- **Карточка** — `SizedBox(344, 192)` → `DecoratedBox` (радиус 18, соя `0 6 18 rgba(28,39,76,.06)`) → `ClipRRect` → `Stack`: 1) `Padding(12)` + `Column(crossAxisAlignment.stretch)`: head `Row(crossAxisAlignment.start)`, `SizedBox(8)`, `Expanded(body)`, `SizedBox(8)`, foot `Row(spacing 8)`; 2) робот `Positioned(right: 8, bottom/top: 8)`. Робот бўлса тана ва пастки қаторга `Padding(right: 72)` (`empty` да 80).
- **Таймер** — алоҳида `ExtraCountdown` виджети: `Row` да 4 та `Expanded(child: _Block)`, ораси `SizedBox(6)`. Блок: `Container(height: 55, padding: EdgeInsets.fromLTRB(0,8,0,7), decoration: BoxDecoration(color, borderRadius: 12))` + `Column[Text(number, 600 **24/28**, FontFeature.tabularFigures(), letterSpacing: **-0.6**), Text(label, 500 **10/12**, letterSpacing: .3, uppercase)]`. Таймер танада ягона элемент бўлгани учун тана `MainAxisAlignment.center`. Ранглар «soon» да `brandSoft/brand`, ёрлиқ `brand.withOpacity(.7)`.
- **Соат** — битта `Timer.periodic(1 s)` бутун карточкага; `ValueNotifier<Duration>` орқали фақат 4 та рақам қайта чизилади (`setState` билан бутун карточка эмас). Виджет экрандан чиқса таймер тўхтайди, қайтганда `DateTime.now()` дан қайта ҳисобланади. 30 дақиқа ва 0 чегараларида аниқ `Timer` қўйилади — ҳолат ўз-ўзидан алмашсин.
- **Токенлар** `ThemeExtension<JuniorTokens>`: `brand #FF4F28`, `brandSoft #FFEDE7`, `blue #1CB0F6`, `blueSoft #E8F6FE`, `red #ED0000`, `pinkSoft #FFE4EA`, `row #F8F8FC`, `line2 #F0F0F0`, `text #000000`, `text2 #999999`, `text3 #B4B4B4`; радиуслар 18/14/12/10/999; матн стиллари **янги шкала** бўйича: `title 17/600 h21`, `body 14/500 h18`, `small 13/500 h16`, `tiny 12/500 h15`, `btn 14/600 h17`; оила `SFpro` (учта оғирлик: 400/500/600).
- **Ibtn** — `IconButton(constraints: BoxConstraints.tightFor(width: 32, height: 32), padding: EdgeInsets.zero)`, `tapTargetSize: padded`; иконка `SvgPicture.asset(..., 18, colorFilter: ColorFilter.mode(color, BlendMode.srcIn))`. Блокланган вариант `onPressed: () => showAlert(...)` — `null` эмас, акс ҳолда сабаб кўринмай қолади.
- **Ҳолат машинаси** — `status × today × canCancel × фаза` дан `enum ExtraCardState` (7 қиймат); UI фақат enum'га қарайди. Динамик қисмлар: сатр матни ва ранги, таймер қиймати ва «soon» байроғи, чип (бор/йўқ), изоҳ, робот, тугма ва ibtn тури. Статик: ўлчамлар, радиуслар, шрифтлар.
- **Панеллар** — `showModalBottomSheet(isScrollControlled: true, useSafeArea: true)` + `DraggableScrollableSheet`; `alert` турлари `showDialog` (`AlertDialog`, радиус 20, ён чети 20). Бир вақтда битта панел; панелдаги `s-timer` карточка билан бир хил манбадан ўқийди.
- **Оптимистик янгиланиш** — ўчириш тасдиқлангач карточка дарҳол `empty` га (ёки кейинги бандловга) ўтади, кейин bookings қайта сўралади. Хатода эски ҳолат қайтарилади + toast.
- **Локализация** — янги калитлар `home.extra.*`; мавжудлари қайта ишлатилади: `booking.cancel`, `booking.cancel_dialog_*`, `booking.error.cancel_too_late`, `booking.error.cannot_cancel`, `booking.status_missed`, `booking.book_extra`. Таймер ёрлиқлари RU да кўпликсиз (доим `ДНИ/ЧАСЫ/МИНУТЫ/СЕКУНДЫ`) — рақам ёнида турибди, `plural` шарт эмас.
- **Матн масштаби** — `MediaQuery.withClampedTextScaling(maxScaleFactor: 1.3)` карточка ичида; таймер рақамлари масштабланмайди (`textScaler: TextScaler.noScaling`), акс ҳолда **55 pt** блок тошади. ⚠️ Базавий шрифт катталашгандан кейин `1.3` чегарасини қурилмада қайта текшириш керак — керак бўлса **1.2**.
- **Скрин ридер** — таймер битта `Semantics(label: 'Boshlanishiga 2 kun 3 soat 15 daqiqa qoldi', liveRegion: false)`, ичидаги рақамлар `ExcludeSemantics`; ҳар сонияда ўқилмаслиги учун label дақиқада бир янгиланади.
