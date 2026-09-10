# ExtraLessonWidget — `extra`

Манба: макет `design/cards/extra.html` (7 ҳолат, асосийси `extra-upcoming`), панеллар `design/sheets/extra.html` (7 панел). Асос: `spec/booking.md` нинг эски `extra-upcoming` / `extra-cancel-locked` / `extra-missed` ҳолатлари — улар шу ерга кўчирилди ва кенгайтирилди. Токенлар `design/css/tokens.css`, умумий класслар `design/css/card-base.css`, панел класслари `design/css/sheet.css`. Карусель тартиби (`js/app.js` `WIDGETS`): `webinar` → `booking` → **`extra`** → `payment` → …

## 1. Вазифаси

Талабанинг битта банд қилинган **қўшимча дарси** (ментор билан яккама-якка) ҳақида: қачон бошланади, унгача аниқ қанча вақт қолди ва иккита ҳаракат — `Batafsil` (тафсилот панели) ва ўчириш (иккиламчи иконка-тугма). Илгари бу ҳолатлар `booking` карточкасининг ичида эди; ажратилгандан кейин чип ва изоҳ ўрнини **тўрт блокли тескари саноқ** эгаллади — шу виджетнинг ягона фарқи. Ментор, курс, мавзу, давомийлик ва ўчириш ойнаси қоидалари карточкада эмас, панелда.

## 2. Анатомия

Карточка `344×192 pt`, падинг `--card-pad` 12 → ички қути `320×168 pt`, радиус `--r-card` 18, фон `--c-card` `#FFFFFF`, соя `--shadow-card` `0 6 18 rgba(28,39,76,.06)`. Тик оқим, элементлар ораси `--s-2` 8 pt.

Баландлик бюджети (168 pt), ҳолат бўйича:
- **таймерли** (`extra-upcoming`, `extra-today`, `extra-cancel-locked`): сарлавҳа қатори 35 (18 + 2 + 15) + 8 + тана 81 + 8 + пастки қатор 36 = **168**; таймер 45 pt, танада 36 pt бўш (қўшимча 14 pt тананинг бўш жойига тушди);
- **`extra-missed`**: 35 + 8 + тана 81 + 8 + 36 = **168**; изоҳ 46 pt, танада 35 pt бўш (қўшимча 14 pt тананинг бўш жойига тушди);
- **сатрсиз** (`empty`, `error`): 18 + 8 + тана 98 + 8 + 36 = **168** (қўшимча 14 pt танага тушди);
- **`loading`**: 32 (16 + 4 + 12) + 8 + 84 + 8 + 36 = **168** (қўшимча 14 pt скелет танасига тушди).

| Элемент | Класс | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|---|
| Сарлавҳа қатори | `.wcard__head` | 320×35 (сатр билан) ёки 320×18 | — | — | `align-items:flex-start`; чип фақат `extra-missed` да |
| Сарлавҳа | `.wcard__title` | 18 pt қатор | `--t-title` 600 15/18, letter-spacing −0.1 | `--c-text` `#000000` | Ҳамма ҳолатда `Qo'shimcha dars` (≈124 pt) |
| Кичик сатр | `.wcard__sub` + `--blue` / `--red` | 15 pt, `margin-top 2` | `--t-small` 500 12/15 | кўк `--c-blue` `#1CB0F6`; қолдирилганда `--c-red` `#ED0000` | `15 sentabr, 16:00` / `Bugun, 16:00` (Тошкент, қаттиқ UTC+5, 24 соат) |
| Чип | `.wcard__chip--pink` | 22 pt, падинг `0 8`, радиус `--r-pill` 999 | 600 12/15 | фон `--c-pink-soft` `#FFE4EA`, матн `--c-red` `#ED0000` | Фақат `Kelmadi`. Саноқ чипи йўқ — унинг ўрнида таймер |
| Тана | `.wcard__body` | 320×81 / 98 (flex 1) | — | — | Устун, оралиқ 6 |
| Таймер | `.wtimer` | 320×45; 4 устун × 75,5, gap 6 | — | — | `data-cd="KK:SS:DD:SS"`, ҳар сонияда 4 та `<b>` янгиланади |
| Таймер блоки | `.wtimer__b` | 75,5×45, падинг `6 0 5`, радиус `--r-inner` 12 | рақам 600 20/23, ls −.5, tabular-nums; ёрлиқ 500 9/11, ls .3, UPPERCASE | фон `--c-row` `#F8F8FC`; рақам `--c-text` `#000000`; ёрлиқ `--c-text-3` `#B4B4B4` | Ёрлиқлар: `KUN` `SOAT` `DAQIQA` `SONIYA` |
| Таймер «soon» | `.wtimer--soon` | шу ўлчам | шу шрифт | фон `--c-brand-soft` `#FFEDE7`; рақам `--c-brand` `#FF4F28`; ёрлиқ `--c-brand`, `opacity .7` | Дарс **бугун** бўлса ёқилади |
| Изоҳ | `.wcard__note--pink` | ≤ 2 қатор → 46 pt (2×15 + 8 + 8), падинг `8 10`, радиус 12 | 500 12/15 | фон `--c-pink-soft` `#FFE4EA`, матн `--c-text` | Фақат `extra-missed`; робот бор → `.ex-pad`, кенглик 248 pt, ≤ 54 белги |
| Кулранг матн | `.wcard__text.wcard__muted` | 1 қатор 16 pt | `--t-body` 500 13/16 | `--c-text-2` `#999999` | Фақат `empty`, `.ex-pad--80` → кенглик 240 pt |
| Хато қатори | `.ex-err` | 40 pt, gap 10 | сарлавҳа `--t-body` 13/16, сабаб `--t-small` 12/15 | `--c-text` / `--c-text-2` `#999999` | `robot4.png` 40×40 `object-fit:contain`, `<img>` (absolute эмас) |
| Пастки қатор | `.wcard__foot` | 36 pt, gap 8, `margin-top:auto` | — | — | `extra-missed` да `.ex-pad` |
| Асосий тугма | `.wcard__btn` | 36 pt, радиус `--r-btn` 12, падинг `0 14`, `flex:1` | `--t-btn` 600 13/16 | фон `--c-brand` `#FF4F28`, матн `#FFFFFF` | ibtn билан бирга кенглиги 280 pt; ёлғиз бўлса 320 pt; `extra-missed` да 248 pt |
| Ghost тугма | `.wcard__btn--ghost` | шу ўлчам | 600 13/16 | фон `--c-row` `#F8F8FC`, матн `--c-text` | Фақат `error`: `Qayta urinish` |
| Иконка-тугма | `.wcard__ibtn` | визуал 32×32, радиус 10, иконка 18 | — | ўчириш `.ex-ibtn--danger`: фон `--c-pink-soft` `#FFE4EA` + `close.svg` `--c-red` `#ED0000`; блок `.ex-ibtn--locked`: фон `--c-line-2` `#F0F0F0` + `lock.svg` `--c-text-3` `#B4B4B4` | Босиш зонаси 44×44 (шаффоф падинг). Блокланган вариант **ўчирилган эмас** — босилади ва сабабни кўрсатади |
| Робот | `.wcard__art` | `extra-missed`: `time_up.png` 56 pt, `--art:56px`, `.wcard__art--bottom` (right 8, bottom 8); `empty`: `robot3.png` 72 pt (right 8, top 8) | — | — | `pointer-events:none`, `object-fit:contain` |
| Скелет | `.wcard--skeleton .sk` | сарлавҳа 16×60 %, сатр 12×40 % (`margin-top 4`), таймер 46 pt (радиус 12), тугма 36 (`flex:1`), ibtn 32×32 (радиус 10) | — | `#EEF0F3 → #F6F7F9` градиент, 1,2 с | Асосий (таймерли) ҳолат қолипини такрорлайди |

Кенглик текшируви (SF Pro тахминий: 15/600 ≈ 8,3 pt/белги, 12/600 ≈ 6,6): `Qo'shimcha dars` (124) + 8 + `Kelmadi` чипи (62) = 194 ≤ 320. Таймер устуни 75,5 pt — энг узун ёрлиқ `SONIYA` ≈ 36 pt, рус `СЕКУНДЫ` ≈ 43 pt, иккиси ҳам сиғади.

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
| `extra` | sheet | карточка: `extra-upcoming`, `extra-today` | Кўк сарлавҳа сатри (`.bk-blue` `#1CB0F6`), «Darsga qadar qolgan vaqt» ҳинти, катта `s-timer` (62 pt, рақам 600 24/28), ментор қатори (`bk-ava` 44×44, радиус 14), 4 та `s-row` (Kurs, Mavzu, Davomiyligi, Boshlanishiga), кўк `s-note`, ҳинт: ўчириш 30 дақиқада ёпилади | `Mentorga yozish` · `Darsni o'chirish` (`s-btn--danger`) |
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

Қоидалар: тўрт блок доим кўринади (нол бўлса ҳам `00`), рақамлар `tabular-nums` — сакрамайди; янгиланиш **1 сонияда бир**, фақат карточка экранда кўринаётганда (`VisibilityDetector`); фон/олд ўтишида (`AppLifecycleState.resumed`) қиймат вақтдан қайта ҳисобланади, санаб турилмайди. «soon» ёқилиши — сана Тошкент бўйича бугун бўлганда (соатга эмас, **кунга** боғлиқ). Нолга етганда карточка `extra-missed` ёки (ментор белгиласа) фаол ҳолатга ўтади; манфий саноқ чизилмайди. `extra-missed`, `empty`, `error` да таймер йўқ, `loading` да унинг ўрнида 46 pt скелет.

## 6. Матнлар (лотин) ва русча муқобили

| Ўрни | UZ (лотин) | RU | Изоҳ |
|---|---|---|---|
| Сарлавҳа | `Qo'shimcha dars` | `Доп. занятие` | Тўлиқ шакл `Дополнительное занятие` ≈183 pt: таймерли ҳолатларда сиғади, лекин `extra-missed` да чип билан 320 pt га тақалади — қисқа шакл қолдирилсин |
| Сатр | `15 sentabr, 16:00` / `Bugun, 16:00` | `15 сентября, 16:00` / `Сегодня, 16:00` | Тошкент куни |
| Чип | `Kelmadi` | `Не пришёл` | Илова сатри |
| Таймер ёрлиқлари | `KUN` `SOAT` `DAQIQA` `SONIYA` | `ДНИ` `ЧАСЫ` `МИНУТЫ` `СЕКУНДЫ` | Устун 75,5 pt — ҳаммаси сиғади |
| Изоҳ (missed) | `Darsga kelmadingiz. Mentor bilan bog'laning.` | `Вы пропустили урок. Свяжитесь с ментором.` | ≤ 54 белги (робот бор) |
| Бўш матн | `Qo'shimcha dars yo'q` | `Дополнительных занятий нет` | — |
| Тугмалар | `Batafsil` · `Mentorga yozish` · `Darsga yozilish` · `Qayta urinish` | `Подробнее` · `Написать ментору` · `Записаться на урок` · `Повторить попытку` | — |
| ibtn ёрлиқлари | `Bekor qilish` · `Bekor qilish yopilgan` | `Отменить` · `Отмена закрыта` | `tooltip` ва `Semantics(label)` |
| Хато | `Yuklab bo'lmadi` · `Internet aloqasini tekshiring` | `Не удалось загрузить` · `Проверьте интернет` | — |
| Панел сарлавҳалари | `Qo'shimcha dars` · `Qo'shimcha darsga kelmadingiz` · `Darsni o'chirishni xohlaysizmi?` · `Darsni o'chirib bo'lmaydi` · `Qo'shimcha darsga yozilish` · `Bandlovlar yuklanmadi` | `Доп. занятие` · `Вы пропустили доп. занятие` · `Отменить занятие?` · `Занятие нельзя отменить` · `Запись на доп. занятие` · `Бронирования не загрузились` | — |
| Панел тугмалари | `Darsni o'chirish` · `Ha, o'chirish` · `Bekor qilish` · `Tushunarli` · `Yopish` · `Keyinroq` | `Отменить занятие` · `Да, отменить` · `Отмена` · `Понятно` · `Закрыть` · `Позже` | — |
| Асосий ҳинт | `Darsni o'chirish boshlanishiga 30 daqiqa qolganda yopiladi.` | `Отмена закрывается за 30 минут до начала.` | `s-hint`, 11/14 |
| Блок сабаби | `Bekor qilish uchun kech qoldingiz (minimum 30 daqiqa oldin).` | `Слишком поздно отменять (минимум за 30 минут).` | Мавжуд илова сатри `booking.error.cancel_too_late` |

## 7. Flutter учун изоҳлар

- **Карточка** — `SizedBox(344, 192)` → `DecoratedBox` (радиус 18, соя `0 6 18 rgba(28,39,76,.06)`) → `ClipRRect` → `Stack`: 1) `Padding(12)` + `Column(crossAxisAlignment.stretch)`: head `Row(crossAxisAlignment.start)`, `SizedBox(8)`, `Expanded(body)`, `SizedBox(8)`, foot `Row(spacing 8)`; 2) робот `Positioned(right: 8, bottom/top: 8)`. Робот бўлса тана ва пастки қаторга `Padding(right: 72)` (`empty` да 80).
- **Таймер** — алоҳида `ExtraCountdown` виджети: `Row` да 4 та `Expanded(child: _Block)`, ораси `SizedBox(6)`. Блок: `Container(padding: EdgeInsets.fromLTRB(0,6,0,5), decoration: BoxDecoration(color, borderRadius: 12))` + `Column[Text(number, 600 20/23, FontFeature.tabularFigures(), letterSpacing: -0.5), Text(label, 500 9/11, letterSpacing: .3, uppercase)]`. Ранглар «soon» да `brandSoft/brand`, ёрлиқ `brand.withOpacity(.7)`.
- **Соат** — битта `Timer.periodic(1 s)` бутун карточкага; `ValueNotifier<Duration>` орқали фақат 4 та рақам қайта чизилади (`setState` билан бутун карточка эмас). Виджет экрандан чиқса таймер тўхтайди, қайтганда `DateTime.now()` дан қайта ҳисобланади. 30 дақиқа ва 0 чегараларида аниқ `Timer` қўйилади — ҳолат ўз-ўзидан алмашсин.
- **Токенлар** `ThemeExtension<JuniorTokens>`: `brand #FF4F28`, `brandSoft #FFEDE7`, `blue #1CB0F6`, `blueSoft #E8F6FE`, `red #ED0000`, `pinkSoft #FFE4EA`, `row #F8F8FC`, `line2 #F0F0F0`, `text #000000`, `text2 #999999`, `text3 #B4B4B4`; радиуслар 18/14/12/10/999; оила `SFpro` (учта оғирлик: 400/500/600).
- **Ibtn** — `IconButton(constraints: BoxConstraints.tightFor(width: 32, height: 32), padding: EdgeInsets.zero)`, `tapTargetSize: padded`; иконка `SvgPicture.asset(..., 18, colorFilter: ColorFilter.mode(color, BlendMode.srcIn))`. Блокланган вариант `onPressed: () => showAlert(...)` — `null` эмас, акс ҳолда сабаб кўринмай қолади.
- **Ҳолат машинаси** — `status × today × canCancel × фаза` дан `enum ExtraCardState` (7 қиймат); UI фақат enum'га қарайди. Динамик қисмлар: сатр матни ва ранги, таймер қиймати ва «soon» байроғи, чип (бор/йўқ), изоҳ, робот, тугма ва ibtn тури. Статик: ўлчамлар, радиуслар, шрифтлар.
- **Панеллар** — `showModalBottomSheet(isScrollControlled: true, useSafeArea: true)` + `DraggableScrollableSheet`; `alert` турлари `showDialog` (`AlertDialog`, радиус 20, ён чети 20). Бир вақтда битта панел; панелдаги `s-timer` карточка билан бир хил манбадан ўқийди.
- **Оптимистик янгиланиш** — ўчириш тасдиқлангач карточка дарҳол `empty` га (ёки кейинги бандловга) ўтади, кейин bookings қайта сўралади. Хатода эски ҳолат қайтарилади + toast.
- **Локализация** — янги калитлар `home.extra.*`; мавжудлари қайта ишлатилади: `booking.cancel`, `booking.cancel_dialog_*`, `booking.error.cancel_too_late`, `booking.error.cannot_cancel`, `booking.status_missed`, `booking.book_extra`. Таймер ёрлиқлари RU да кўпликсиз (доим `ДНИ/ЧАСЫ/МИНУТЫ/СЕКУНДЫ`) — рақам ёнида турибди, `plural` шарт эмас.
- **Матн масштаби** — `MediaQuery.withClampedTextScaling(maxScaleFactor: 1.3)` карточка ичида; таймер рақамлари масштабланмайди (`textScaler: TextScaler.noScaling`), акс ҳолда 45 pt блок тошади.
- **Скрин ридер** — таймер битта `Semantics(label: 'Boshlanishiga 2 kun 3 soat 15 daqiqa qoldi', liveRegion: false)`, ичидаги рақамлар `ExcludeSemantics`; ҳар сонияда ўқилмаслиги учун label дақиқада бир янгиланади.
