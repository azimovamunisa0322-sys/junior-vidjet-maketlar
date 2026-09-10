# BookingWidget (Demo Day) — `booking`

Манба: `WIDGET-MAP.md` 4.2, `APP-STYLE.md`, `design/css/tokens.css`, `design/css/card-base.css`, `design/css/sheet.css`. Макет: `design/cards/booking.html` (8 ҳолат, асосийси `demo-upcoming`), `design/sheets/booking.html` (16 панел).

> **Ўзгариш (2026-09-10).** Виджет энди фақат **Demo Day** га тегишли. Қўшимча дарс ҳолатлари (`extra-upcoming`, `extra-cancel-locked`, `extra-missed`) бу карточкадан **чиқарилди** ва алоҳида `extra` виджетига кўчирилди — уларнинг тўлиқ тавсифи [`spec/extra.md`](extra.md) да, макети `design/cards/extra.html` да. Яна иккита ўзгариш: `demo-upcoming` ва `demo-today` да чип олиб ташланиб, ўрнига **тўрт катакли саноқ таймери** (`.wtimer`) қўйилди, `demo` панелида эса **катта таймер** (`.s-timer`) пайдо бўлди. Таймернинг ўзи (қоидалар, бирликлар, тик, RU ёрлиқлар) — [`spec/taymer.md`](taymer.md) да, бу ерда такрорланмайди.
>
> **Муҳим:** `design/sheets/booking.html` дан **ҳеч нарса ўчирилмаган**. `extra`, `extra-locked`, `cancel-locked`, `cancel-confirm`, `extra-missed`, `missed-all` панеллари ўз жойида турибди (айнан шу панелларнинг нусхаси `design/sheets/extra.html` да ҳам бор), чунки улар `booking` виджетининг `list` ва `missed-all` рўйхатларидан очилади. Яъни: **карточка** фақат Demo Day, **панеллар тўплами** эса иккала турни ҳам қамрайди.

## 1. Вазифаси

Талабанинг битта банд қилинган Demo Day ҳақида қисқа хулоса: қачон бўлади, бошланишига қанча қолди ва битта асосий ҳаракат (тафсилот, вақтни кўчириш, қайта ёзилиш, менторга ёзиш). Веб карточкадаги модул/мавзу/ментор тафсилотлари, прогресс ва кўчириш оқими пастки панелга кўчади; карточка «қачон» саволига таймер билан, «нима бўлаётганига» эса битта қатор билан жавоб беради. Икки ва ундан ортиқ фаол бандлов бўлса, карточка йиғма (`multi`) кўринишига ўтади — фақат шу ҳолатда рўйхатда қўшимча дарс қаторлари ҳам кўринади.

## 2. Анатомия

Карточка `297×171 pt` (`--card-w`/`--card-h`), падинг `12` (`--card-pad`) → ички қути `273×147`, радиус `--r-card` 18, фон `--c-card` `#FFFFFF`, соя `--shadow-card` `0 6 18 rgba(28,39,76,.06)`. Тик оқим, элементлар ораси `--s-2` 8 pt.

Баландлик бюджети ҳолат турига қараб:

| Қолип | Ҳолатлар | Ҳисоб |
|---|---|---|
| **Таймерли** | `demo-upcoming`, `demo-today` | сарлавҳа 35 (18 + 2 + 15) + 8 + тана 60 (таймер 45, тагида 15 pt бўш) + 8 + пастки қатор 36 = 147 |
| Изоҳли | `demo-active`, `demo-missed` | сарлавҳа 35 + 8 + тана 60 (изоҳ ≤ 46) + 8 + 36 = 147 |
| Рўйхатли | `multi` | сарлавҳа 35 + 8 + тана 60 (рўйхат 52) + 8 + 36 = 147 |
| Сатрсиз | `empty`, `error` | сарлавҳа 18 + 8 + тана 77 (матн 16 / хато қатори 40) + 8 + 36 = 147 |
| Скелет | `loading` | сарлавҳа 32 (16 + 4 + 12) + 8 + тана + 8 + 36 |

| Элемент | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|
| `.wcard__title` | 18 pt қатор, ≤ 22 белги | `--t-title` 600 15/18, letter-spacing −0.1 | `--c-text` `#000000` | `Demo Day`; йиғма/бўш/хато карточкада илова атамаси `Mening bandlovlarim` |
| `.wcard__sub` | 15 pt қатор, юқоридан 2 pt, ≤ 30 белги | `--t-small` 500 12/15 | демо `--c-brand` `#FF4F28` (`--brand`), қолдирилган `--c-red` `#ED0000` (`--red`), йиғма `--c-text-2` `#999999` | Сана ва вақт: `12 sentabr, 14:00`, бугун бўлса `Bugun, 14:00` (Тошкент, қаттиқ UTC+5, 24 соатли). Сана бир марта чиқади — веб `detail_time` такрори йўқ |
| **`.wtimer`** (таймерли ҳолатлар) | 273×45, 4 устун `1fr`, ора 6 → ҳар катак `63,75×45` | — | — | Чипнинг ўрнини босди. `data-cd="KK:SS:DD:SS"`, `js/app.js` `tickCountdowns()` ҳар 1 с да 4 та `<b>` ни янгилайди. Тўлиқ қоида — [`spec/taymer.md`](taymer.md) |
| `.wtimer__b` | 63,75 кенг, падинг `6 0 5`, радиус `--r-inner` 12 | — | фон `--c-row` `#F8F8FC` | 4 та бир хил катак: кун · соат · дақиқа · сония |
| `.wtimer__b b` (рақам) | 23 pt қатор | 600 20/23, letter-spacing −0.5, `tabular-nums` | `--c-text` `#000000` | Ҳар доим икки хона: `02`, `41` |
| `.wtimer__b span` (ёрлиқ) | 11 pt қатор | 500 9/11, letter-spacing +0.3, UPPERCASE | `--c-text-3` `#B4B4B4` | `kun` · `soat` · `daqiqa` · `soniya`. Энг узуни `soniya` ≈ 39 pt ≤ 63,75 |
| `.wtimer--soon` | шу ўлчам | — | фон `--c-brand-soft` `#FFEDE7`, рақам `--c-brand` `#FF4F28`, ёрлиқ `--c-brand` `opacity .7` | Тадбир **бугун** бўлганда (`demo-today`) ёқилади |
| `.wcard__chip` | 22 pt, падинг `0 8`, радиус `--r-pill` 999 | `--t-small`, 600 | фаол `--chip--brand` фон `--c-brand-soft` `#FFEDE7` / матн `--c-brand` `#FF4F28`; қолдирилган `--chip--pink` фон `--c-pink-soft` `#FFE4EA` / матн `--c-red` `#ED0000`; йиғма сон `--chip--brand` | Энди **фақат** `demo-active` (`Boshlandi`), `demo-missed` (`Kelmadi`) ва `multi` (`3 ta`) да қолди. Фаол чипда 6 pt `currentColor` нуқта (`.bk-dot--cur`) + матн, ора 4 |
| `.wcard__note` | ≤ 2 қатор (2×15 + 8 + 8 = 46), радиус `--r-inner` 12, падинг `8 10` | `--t-small` 500 12/15 | демо `--note--brand` `#FFEDE7`, қолдирилган `--note--pink` `#FFE4EA`; матн `--c-text` `#000000` | Битта асосий факт ёки ҳолат матни. ≤ 80 белги (робот бўлса ≤ 54) |
| `.bk-list` (фақат `multi`) | 3 × 16 pt қатор, ора 2 = 52 | ном `--t-body` 500 13/16, сана `--t-small` 500 12/15 | нуқта 6 pt: `--c-brand` `#FF4F28` демо, `--c-blue` `#1CB0F6` қўшимча дарс; сана `--c-text-2` `#999999` | Ном чапда «…» билан қисқаради, сана ўнгда сиқилмайди. Виджетда қўшимча дарс кўринадиган ягона жой |
| `.bk-err` (фақат `error`) | 40 pt қатор, ора 10 | 500 13/16 + 500 12/15 | `--c-text`, `--c-text-2` | `robot4` 40×40 + икки қатор матн |
| `.wcard__btn` | 36 pt, радиус `--r-btn` 12, падинг `0 14`, `flex: 1 1 auto` | `--t-btn` 600 13/16 | фон `--c-brand` `#FF4F28`, матн `#FFFFFF`; хатода `--ghost` фон `--c-row` `#F8F8FC` / матн `--c-text` | Ягона асосий ҳаракат, ≤ 18 белги, 1 қатор `ellipsis` |
| `.wcard__ibtn` | 32×32 визуал, радиус 10; босиш зонаси 44×44 (шаффоф падинг) | иконка 18 pt | фон `--c-row` `#F8F8FC`, иконка `--c-slate` `#93A2C0` | Иккиламчи ҳаракат: `time.svg` — вақтни кўчириш, `arrow_right.svg` — тафсилот. `bk-ibtn--danger` (`--c-pink-soft`) ва `bk-ibtn--locked` (`--c-line-2` + `--c-text-3`) CSS да қолдирилган, лекин Demo Day карточкасида ишлатилмайди — улар `extra` виджетида |
| `.wcard__art` | 46 (`robot7`, ўнг-**юқори**), 56 (`time_up`, ўнг-паст), 72 (`robot2`, ўнг-юқори), 40 (`robot4`, қатор ичида) | — | — | `position: absolute`, `right 8`, `top/bottom 8`, `object-fit: contain`, `pointer-events: none` |
| Матн падинглари | `.bk-hpad` 52 (сарлавҳа ёнидаги 46 pt робот), `.bk-pad` 72 (пастдаги 56/64 pt робот), `.bk-pad--80` 80 (юқоридаги 72 pt робот) | — | — | Робот остига матн кирмаслиги учун |
| Скелет `.sk` | сарлавҳа 16×60 %, сатр 12×40 % (юқоридан 4), чип 84×22 (pill), изоҳ 46 (радиус 12), тугма 36 (`flex:1`), ibtn 32×32 (радиус 10) | — | `#EEF0F3 → #F6F7F9` градиент, 1,2 с | ⚠ Ҳозирги макетда скелет **эски** (чип + изоҳ) қолипини такрорлайди. Таймерли асосий ҳолатга мослаш учун чип олиб ташланиб, изоҳ ўрнида 45 pt таймер блоки турсин — `cards/extra.html` даги `.sk--timer` каби |

Кенглик текшируви (SF Pro тахминий: 15/600 ≈ 8,3 pt/белги, 12/600 ≈ 6,6 pt/белги, 12/500 ≈ 5,3 pt/белги):

- Таймерли ҳолатларда сарлавҳа қаторида чип йўқ → `Demo Day` (≈ 66 pt) бемалол сиғади; `demo-today` да `.bk-hpad` туфайли жой 221 pt, `Bugun, 14:00` (≈ 79 pt) ва сарлавҳа шу ерга жойлашади.
- Энг оғир жуфтлик энди `demo-active`: `Demo Day` (66) + 8 + чип `Boshlandi` нуқта билан (≈ 85) = 159 ≤ 273.
- Таймер катаги 63,75 pt: икки хонали рақам 20/600 tabular ≈ 25 pt, энг узун ёрлиқ `soniya` ≈ 39 pt — иккаласи ҳам сиғади, RU ёрлиқлари (`дн`, `ч`, `мин`, `сек`) ундан ҳам қисқа.
- Изоҳ тўлиқ кенгликда 12/500 ≈ 48 белги/қатор, робот билан (201 pt) ≈ 38 белги/қатор — икки қаторда 54 белгидан ошмасин.

## 3. Ҳолатлар

Кўриниш `event.status`, фаза (`upcoming`/`active`) ва бугунги кун (Тошкент) дан ҳисобланади. Веб'даги «фаза бошқа» (`joinOpen`/`live`/`updating`) бўш жойлари мобилда йўқ: `upcoming` → таймер, `active`/`live` → `Boshlandi`, `no_show` → `Kelmadi`, қолгани `demo-upcoming` кўринишида қолади.

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `demo-upcoming` **(асосий)** | `demoDay`, `status ≠ no_show`, тадбир куни бугун эмас, `canReschedule` | Апельсин сана, чип **йўқ**, тана тўлиқ кенгликдаги 4 катакли таймер (нейтрал `--c-row` фон), `Batafsil` + кўчириш ibtn (`time.svg`). Робот йўқ. Ментор · курс · модул панелга кўчди | `Demo Day` / `12 sentabr, 14:00` / таймер `02 kun · 04 soat · 42 daqiqa · 41 soniya` / `Batafsil` | `Demo Day` / `12 сентября, 14:00` / `02 дн · 04 ч · 42 мин · 41 сек` / `Подробнее` |
| `demo-today` | Тадбир куни бугун (Тошкент), ҳали бошланмаган | `Bugun, HH:mm`, таймер `--soon` кўринишида (апельсин фон ва рақамлар), `robot7` (бош бармоқ) **ўнг-юқорида 46 pt** — сарлавҳа устуни `.bk-hpad` олади, таймер эса роботнинг тагидан бошлангани учун тўлиқ кенгликда қолади | `Demo Day` / `Bugun, 14:00` / `00 kun · 00 soat · 41 daqiqa · 20 soniya` / `Batafsil` | `Demo Day` / `Сегодня, 14:00` / `00 дн · 00 ч · 41 мин · 20 сек` / `Подробнее` |
| `demo-active` | Фаза `active`/`live` | Таймер ўрнида чип `Boshlandi` (6 pt нуқта + матн, апельсин) ва апельсин изоҳ — ментор кутмоқда; асосий тугма `Mentorga yozish`, ibtn `arrow_right` тафсилот. Робот йўқ | `Bugun, 14:00` / `Boshlandi` / `Dars boshlandi — Aziz Karimov sizni kutmoqda.` / `Mentorga yozish` | `Сегодня, 14:00` / `Идёт` / `Урок начался — Азиз Каримов ждёт вас.` / `Написать ментору` |
| `demo-missed` | `status = no_show`, `canReschedule` | Қизил сана, пушти чип `Kelmadi` (илова сатри), пушти изоҳ, `time_up` робот 56 pt ўнг-пастда, изоҳ ва пастки қатор `.bk-pad`, тугма `Qayta yozilish`. `canReschedule = false` бўлса тугма `Mentorga yozish` — боши берк йўқ | `5 sentabr, 14:00` / `Kelmadi` / `Demo Day'ga kelmadingiz. Yangi vaqt tanlang.` / `Qayta yozilish` | `5 сентября, 14:00` / `Не пришёл` (илова) ёки `Пропущено` / `Вы пропустили Demo Day. Выберите новое время.` / `Записаться снова` |
| `multi` | `selected.active` да 2+ фаол бандлов (маҳсулот эгаси «бир карточка» вариантини танласа) | Сарлавҳа `Mening bandlovlarim`, кулранг сатр «кейингиси», апельсин сон чипи, 3 қаторли рўйхат (нуқта = тур ранги, ном, сана), тугма `Hammasini ko'rish`. 4+ бўлса учинчи қатор `+N ta yana`. Таймер йўқ — рўйхатда нисбий вақт кўрсатилмайди | `Mening bandlovlarim` / `Keyingisi: 3 kun qoldi` / `3 ta` / `Demo Day — 12 sentabr, 14:00`, `Qo'shimcha dars — 15 sentabr, 16:00` / `Hammasini ko'rish` | `Мои бронирования` / `Ближайшее: через 3 дня` / `3` / `Demo Day — 12 сентября, 14:00`, `Доп. занятие — 15 сентября, 16:00` / `Показать все` |
| `empty` | Фаол бандлов йўқ (иловада ҳозир шундай карточка бор; веб'да карточка чиқмайди) | Сарлавҳа, `robot2` (қўлини чўзган) ўнг-юқорида 72 pt, кулранг матн `.bk-pad--80`, тугма `Darsga yozilish` (илова маршрути `Qo'shimcha darsga yozilish`) | `Mening bandlovlarim` / `Hozircha sizda bandlovlar mavjud emas` (илова) / `Darsga yozilish` | `Мои бронирования` / `Пока у вас нет бронирований` (илова) / `Записаться на урок` |
| `loading` | Биринчи сўров, маълумот йўқ | `.wcard--skeleton`: сарлавҳа 60 %, сатр 40 %, чип 84×22, изоҳ 46, тугма + ibtn | — | — |
| `error` | Сўров хатоси, кэш йўқ | Сарлавҳа, `robot4` 40 pt + `Yuklab bo'lmadi` + кичик сабаб, `--btn--ghost` `Qayta urinish` (илова сатри). Кэш бўлса — эски карточка + toast | `Yuklab bo'lmadi` / `Internet aloqasini tekshiring` / `Qayta urinish` | `Не удалось загрузить` / `Проверьте интернет` / `Повторить попытку` (илова) |

Кўчирилган ҳолатлар: `extra-upcoming`, `extra-cancel-locked`, `extra-missed` энди бу жадвалда йўқ — улар `extra` виджетининг ҳолатлари ([`spec/extra.md`](extra.md) 3-бўлим). Ўша виджетда яна `extra-today` ҳолати ҳам қўшилган.

Матн узунлиги чеклови ва рус вариантлари: сарлавҳа `Demo Day` таржима қилинмайди (бренд атамаси), шунинг учун RU да кенглик муаммоси йўқ. Изоҳ RU да `Проверьте интернет` каби қисқа шаклда, 2 қаторга сиғади.

## 4. Ҳаракатлар

Ҳамма босиладиган элемент ≥ 44×44 pt (визуал 32 pt ibtn шаффоф падинг билан кенгаяди; чип, таймер ва изоҳ алоҳида босилмайди).

| Элемент | Ҳолатлар | Нима қилади |
|---|---|---|
| Карточка танаси (сарлавҳа, сана, таймер, изоҳ зонаси) | ҳамма, `loading`/`error` дан ташқари | Карточкадаги биринчи `[data-open]` панелини очади (5-бўлим). `multi` да рўйхат панели |
| `Batafsil` | `demo-upcoming`, `demo-today` | `demo` пастки панели — унда таймер каттароқ кўринишда давом этади |
| ibtn `time.svg` «Vaqtni ko'chirish» | `demo-upcoming`, `demo-today`, `canReschedule` | Тўлиқ экранли `reschedule` панели (календарь + бўш вақтлар, `WIDGET-MAP.md` 5-бўлим, `DemoDayRescheduleModal` мобил варианти) |
| `Mentorga yozish` | `demo-active`, `canReschedule = false` бўлган қолдирилган демо | `mentor` панели → илованинг `ta_chat` экрани, ментор олдиндан танланган |
| ibtn `arrow_right.svg` «Batafsil» | `demo-active` | `demo-active` пастки панели |
| `Qayta yozilish` | `demo-missed`, `canReschedule` | `demo-missed` панели, ундан `reschedule` (сарлавҳаси `Demo Day'ni ko'chirish`); муваффақиятда карточка `demo-upcoming` га ўтади |
| `Hammasini ko'rish` | `multi` | `list` пастки панели. Ундаги қўшимча дарс қатори `extra` панелини очади (нусхаси `extra` виджетида) |
| `Darsga yozilish` | `empty` | `book` панели → илованинг мавжуд `Qo'shimcha darsga yozilish` экрани (сана → ментор → вақт) |
| `Qayta urinish` | `error` | Bookings сўровини қайтаради; карточка `loading` га ўтади |
| Таймер (пассив) | `demo-upcoming`, `demo-today` | Ҳар сонияда янгиланади, фақат карточка экранда кўринганда. Ноль'га етганда карточка `demo-active` га ўтади. Тартиб қайта ҳисобланмайди — саҳифа бармоқ остида силжимайди. Тик, бирлик ва тўхташ қоидалари: [`spec/taymer.md`](taymer.md) |
| Чип (пассив) | `demo-active`, `demo-missed`, `multi` | Босилмайди, карточка босишига киради |

## 5. Пастки панеллар

Жами 16 та панел — **бирортаси ҳам ўчирилмаган**. Улардан 8 таси Demo Day карточкасидан бевосита очилади, қолгани панел ичидан ёки кўриб чиқиш саҳифасининг «Панеллар» рўйхатидан. Қўшимча дарсга тегишли панеллар (`extra`, `extra-locked`, `cancel-locked`, `cancel-confirm`, `extra-missed`) бу ерда сақланиб қолди, чунки `list` ва `missed-all` рўйхатлари уларни очади; ўша панелларнинг нусхаси `sheets/extra.html` да ҳам бор ва иккала файл бир хил бўлиб турилиши керак.

Уч тури бор: **пастки панел** (пастдан чиқади, радиус `24 24 0 0`, макс. баландлик 88 %), **тўлиқ экран** (календарь, вақт танлаш), **огоҳлантириш** (марказда, ён томондан 20 pt, радиус 20). Ёпиш: орқа фонга босиш, ✕ тугмаси ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Асосий тугма |
|---|---|---|---|---|
| `demo` | пастки панел | карточка: `demo-upcoming`, `demo-today`; панел: `list` | **катта таймер** (`.s-timer`) + устидаги `time` иконкали ҳинт, ментор қатори, маълумот қаторлари, модул прогресси, рангли изоҳ | Vaqtni ko'chirish |
| `demo-active` | пастки панел | карточка: `demo-active` | рангли изоҳ, ментор қатори, маълумот қаторлари, прогресс | Mentorga yozish |
| `extra` | пастки панел | панел: `list` (карточкадан эмас — асосий йўли `extra` виджети) | ментор қатори, маълумот қаторлари, кўк изоҳ | Mentorga yozish |
| `extra-locked` | пастки панел | **фақат кўриб чиқиш рўйхатидан** (асосий йўли `extra` виджети) | ментор қатори, маълумот қаторлари, кўк изоҳ | Mentorga yozish |
| `reschedule` | тўлиқ экран | карточка: `demo-upcoming`, `demo-today`; панел: `demo`, `demo-missed` | ментор қатори, календарь, легенда, вақт чиплари, маълумот қаторлари | Tasdiqlash |
| `mentor-updating` | огоҳлантириш | **фақат кўриб чиқиш рўйхатидан** | матн | Mentorga yozish |
| `reschedule-locked` | огоҳлантириш | **фақат кўриб чиқиш рўйхатидан** | матн | Mentorga yozish |
| `cancel-locked` | огоҳлантириш | панел: `extra-locked` (асосий йўли `extra` виджети) | матн | Mentorga yozish |
| `cancel-confirm` | пастки панел | панел: `extra` (асосий йўли `extra` виджети) | маълумот қаторлари, пушти изоҳ | Ha, o'chirish |
| `demo-missed` | пастки панел | карточка: `demo-missed`; панел: `missed-all` | робот расми, пушти изоҳ, маълумот қаторлари | Qayta yozilish |
| `extra-missed` | пастки панел | панел: `missed-all` (асосий йўли `extra` виджети) | робот расми, пушти изоҳ, маълумот қаторлари | Mentorga yozish |
| `missed-all` | пастки панел | **фақат кўриб чиқиш рўйхатидан** (иловага кирганда бир марта) | робот расми, пушти изоҳ, босиладиган рўйхат (демо + қўшимча дарс) | Tushunarli |
| `list` | пастки панел | карточка: `multi` | босиладиган рўйхат (демо → `demo`, қўшимча дарс → `extra`) | Qo'shimcha darsga yozilish |
| `book` | пастки панел | карточка: `empty`; панел: `extra-missed`, `list` | уч қадам рўйхати, кўк изоҳ | Qo'shimcha darsga yozilish |
| `mentor` | пастки панел | карточка: `demo-active`; панел: `demo`, `demo-active`, `extra`, `extra-locked`, `mentor-updating`, `reschedule-locked`, `cancel-locked`, `demo-missed`, `extra-missed` | ментор қатори, кўк изоҳ, бандлов қатори | Chatni ochish |
| `error` | огоҳлантириш | карточка: `error` | матн | Qayta urinish |

### `demo` панелидаги катта таймер

`.s-timer` — карточкадаги `.wtimer` нинг катта варианти, `demo` панелининг танасида, «Demo kunga qadar qolgan vaqt» ҳинтидан кейин туради. Иккиси бир хил `data-cd` дан юрганлиги учун панел очилганда рақамлар карточкадагига мос келади.

| Элемент | Ўлчам | Шрифт | Ранг |
|---|---|---|---|
| `.s-timer` | 4 устун `1fr`, ора 8; панел танаси 358 pt кенг → ҳар катак `83,5×62` | — | — |
| `.s-timer__b` | падинг `10 0 9`, радиус 14 | — | фон `--c-row` `#F8F8FC` |
| `.s-timer__b b` | 28 pt қатор | 600 24/28, letter-spacing −0.6, `tabular-nums` | `--c-text` `#000000` |
| `.s-timer__b span` | 14 pt қатор, юқоридан 1 | `--t-tiny` 500 11/14 | `--c-text-2` `#999999` |
| `.s-timer--soon` | шу ўлчам | — | фон `--c-brand-soft` `#FFEDE7`, рақам `--c-brand` `#FF4F28` |

Ҳинт: `.s-hint` 11/14, `--c-text-2` `#999999`, иконка `time.svg` 13 pt `--c-slate` `#93A2C0`.

### Панелларнинг тугмалари

- **`demo`** (Demo Day): «Vaqtni ko'chirish» · «Mentorga yozish»
- **`demo-active`** (Demo Day): «Mentorga yozish» · «Yopish»
- **`extra`** (Qo'shimcha dars): «Mentorga yozish» · «Darsni o'chirish»
- **`extra-locked`** (Qo'shimcha dars): «Mentorga yozish» · «Darsni o'chirish» (ўчирилган кўриниш)
- **`reschedule`** (Demo Day'ni ko'chirish): «Tasdiqlash» · «Bekor qilish»
- **`mentor-updating`** (Bo'sh vaqtlarni ko'rsatib bo'lmadi): «Mentorga yozish» · «Tushunarli»
- **`reschedule-locked`** (Vaqtni ko'chirib bo'lmaydi): «Mentorga yozish» · «Tushunarli»
- **`cancel-locked`** (Darsni o'chirib bo'lmaydi): «Mentorga yozish» · «Tushunarli»
- **`cancel-confirm`** (Darsni o'chirishni xohlaysizmi?): «Ha, o'chirish» · «Bekor qilish»
- **`demo-missed`** (Demo Day'ga kelmadingiz): «Qayta yozilish» · «Mentorga yozish»
- **`extra-missed`** (Qo'shimcha darsga kelmadingiz): «Mentorga yozish» · «Qo'shimcha darsga yozilish»
- **`missed-all`** (2 ta dars qoldirildi): «Tushunarli»
- **`list`** (Mening faol bandlovlarim): «Qo'shimcha darsga yozilish» · «Bandlov tarixi»
- **`book`** (Qo'shimcha darsga yozilish): «Qo'shimcha darsga yozilish» · «Yopish»
- **`mentor`** (Mentorga yozish): «Chatni ochish» · «Yopish»
- **`error`** (Bandlovlar yuklanmadi): «Qayta urinish» · «Keyinroq»

Панел тугмаси `.s-btn`: 48 pt баланд, радиус 14, 600 15/18, фон `--c-brand` `#FF4F28` / матн `#FFFFFF`; `--ghost` `--c-row` `#F8F8FC` / `--c-text`; `--danger` `--c-pink-soft` `#FFE4EA` / `--c-red` `#ED0000`; `--disabled` `--c-line-2` `#F0F0F0` / `--c-text-3` `#B4B4B4`.

## 6. Расмлар ва иконкалар

| Файл | Қаерда | Ўлчам | Изоҳ |
|---|---|---|---|
| `images/robot7.png` | `demo-today` | **46 pt, ўнг-юқори** (`--art:46px`, `right 8 / top 8`) | Бош бармоқ — «тайёрсиз». Аввал 64 pt ўнг-пастда эди; таймер тананинг тўлиқ кенглигини эгаллагани учун робот сарлавҳа ёнига кўтарилди, сарлавҳа устуни `.bk-hpad` (52 pt) олади. Робот 8…54 y да, таймер 55 y дан бошланади — тегмайди |
| `images/time_up.png` | `demo-missed`; `demo-missed`, `extra-missed`, `missed-all` панелларида | 56 pt ўнг-паст (карточка), панелда `.s-art` 96 pt марказда | Хафа робот соат билан |
| `images/robot2.png` | `empty` | 72 pt, ўнг-юқори | Қўлини чапга чўзган — матнга ишора |
| `images/robot4.png` | `error` | 40 pt, қатор ичида (`<img>`, `absolute` эмас) | Хафа робот |
| `images/mentor.png` | панеллардаги `.bk-ava` | 44×44, радиус 14, фон `--c-row` | Ментор аватари |
| `icons/time.svg` | карточка: кўчириш ibtn; панел: `demo` ҳинти, тугма иконкаси | 18 pt (ibtn), 13 pt (ҳинт) | `--c-slate` `#93A2C0` маска; веб `clock.svg` ўрнида |
| `icons/arrow_right.svg` | `demo-active` тафсилот ibtn; панел қаторлари ва тугмалари | 18 pt / 16 pt | `--c-slate`; илова қаторларидаги `›` билан бир хил |
| `icons/circle.svg` | панел ҳинтлари (маълумот белгиси) | 13 pt | Иловада `info` иконкаси йўқ |
| `icons/lock.svg`, `icons/close.svg` | энди **фақат панелларда** (`extra-locked`, `cancel-confirm`, `cancel-locked`) | 18 pt | Карточкадаги ўрни `extra` виджетига кўчди |
| `icons/flag.svg`, `icons/book.svg` | `list` ва `missed-all` рўйхат қаторлари | 18 pt | Демо `--c-brand`, қўшимча дарс `--c-blue` |
| `.bk-dot` (CSS) | `Boshlandi` чипи, `multi` рўйхати | 6 pt доира | Иконка эмас; `currentColor` / `--c-brand` / `--c-blue` |
| Ишлатилмайди | веб `robo-flag.png`, `robo-book.png`, `info.svg`, `trash.svg`, `chevron-right.svg`, `hourglass.svg` (карточкада) | — | Илова роботлари ва иконкалари билан алмаштирилди. Саноқ чипи йўқолгани учун карточкада `hourglass` ҳам қолмади |

Иконкалар SVG ичидаги қатъий рангда, шунинг учун `.ic` маска ёрдамчиси орқали бўялади (`-webkit-mask`). Flutter'да `SvgPicture.asset(..., colorFilter: ColorFilter.mode(color, BlendMode.srcIn))`.

## 7. Flutter учун изоҳлар

- **Токенлар** — `ThemeExtension<JuniorTokens>`: `brand #FF4F28`, `brandSoft #FFEDE7`, `blue #1CB0F6`, `blueSoft #E8F6FE`, `red #ED0000`, `pinkSoft #FFE4EA`, `row #F8F8FC`, `line2 #F0F0F0`, `text #000000`, `text2 #999999`, `text3 #B4B4B4`, `slate #93A2C0`; радиуслар 18/14/12/10/999; `TextTheme` да `title 15/600 h18`, `body 13/500 h16`, `small 12/500 h15`, `tiny 11/500 h14`, `btn 13/600 h16`, оила `SFpro`.
- **Карточка** — `SizedBox(width: 297, height: 171)` → `DecoratedBox` (радиус 18, соя `0 6 18 rgba(28,39,76,.06)`) → `ClipRRect` → `Stack`: 1) `Padding(12)` + `Column(crossAxisAlignment.stretch)`: head `Row(crossAxisAlignment.start)`, `SizedBox(8)`, `Expanded(body)`, `SizedBox(8)`, foot `Row`; 2) `Positioned(right: 8, top/bottom: 8)` робот `Image.asset` + `IgnorePointer`. Робот пастда бўлса тана ва пастки қаторга `Padding(right: 72)`, юқорида бўлса сарлавҳа устунига `Padding(right: 52)` (46 pt робот) ёки танага `Padding(right: 80)` (72 pt робот).
- **Таймер** — карточкада `Row` да 4 та `Expanded` (ора 6, `SizedBox(width: 6)` билан) → `Container(padding: EdgeInsets.fromLTRB(0, 6, 0, 5), radius 12, color row)` + `Column[Text(20/600, tabularFigures, ls −0.5), Text(9/500, ls +0.3, uppercase, text3)]`. Панелда шу қолип 24/28 рақам, `tiny` ёрлиқ, падинг `10 0 9`, радиус 14, ора 8 билан такрорланади. Ҳисоблаш, тик ва тўхтатиш мантиғи битта `CountdownController` да — [`spec/taymer.md`](taymer.md) га қаранг, бу ерда такрорланмайди. Рақамлар албатта `FontFeature.tabularFigures()` билан, акс ҳолда ҳар сонияда катак эни «сакрайди».
- **Чип** — `Container(height: 22, padding: 0 8, BorderRadius.circular(999))` + `Text(small, w600)`; фаол чипда `Row` [6 pt `DecoratedBox` доира, 4 pt, матн]. Чип босилмайди (`Semantics(label)` билан ўқилади).
- **Асосий тугма** — `FilledButton` (`minimumSize: Size(0, 36)`, `padding: 0 14`, радиус 12, `textStyle btn`), `Expanded` ичида; `ghost` варианти `FilledButton.tonal` фон `row`. Матн `maxLines: 1, overflow: ellipsis`.
- **Ibtn** — `IconButton(constraints: BoxConstraints.tightFor(32, 32), padding: 0)` визуал 32 pt; босиш зонаси `Material.tapTargetSize = padded` (48) ёки `SizedBox(44)` ичида марказда. Иконка `SvgPicture.asset` 18 pt, `colorFilter` билан. `tooltip` = UZ ёрлиқ (`Vaqtni ko'chirish`, `Batafsil`).
- **Изоҳ** — `Container(padding: 8 10, радиус 12, фон семантик)` + `Text(small, maxLines: 2, overflow: ellipsis)`. Баландлиги 46 га қотирилмайди, лекин 2 қатор клампи бор.
- **Рўйхат** (`multi`) — `Column` 3 та `SizedBox(height: 16)` қатор, ора 2; ном `Expanded` + `ellipsis`, сана `Text(small)`. 4+ бандловда учинчи қатор `+N ta yana`.
- **Скелет** — `shimmer` пакети ёки `AnimatedContainer` градиент 1,2 с; шакллар **асосий (таймерли) ҳолат** билан бир хил бўлсин: сарлавҳа 16, сатр 12, тана 45 pt битта блок, тугма 36 + ibtn 32.
- **Динамик** — `sub` (сана; `Bugun` Тошкент куни бўйича, қаттиқ UTC+5), таймер ёки чип (фаза/статус/сон), изоҳ матни, робот (бор/йўқ, қайси расм ва қаерда), асосий тугма варианти ва ibtn тури (`canReschedule`/фаза). Статик — ўлчамлар, ранглар, шрифтлар, таймер ёрлиқлари.
- **Ҳолат машинаси** — `status × phase × today × canReschedule × count` дан бир `enum BookingCardState` (8 қиймат: `demoUpcoming`, `demoToday`, `demoActive`, `demoMissed`, `multi`, `empty`, `loading`, `error`) ҳисобланади; UI фақат enum'га қарайди. Қўшимча дарс энди бу enum'да йўқ — унинг ўз `ExtraCardState` и бор ([`spec/extra.md`](extra.md)). Нотўғри `startsAt` (`DateTime.tryParse == null`) → `error` кўриниши, таймер йўқ.
- **Оптимистик янгиланиш** — кўчириш тасдиқлангач карточка дарҳол янги вақтга ўтади ва таймер қайта ҳисобланади, кейин bookings қайта сўралади (веб'даги «эски карточка қолади» муаммоси йўқ).
- **Пастки панел** — `showModalBottomSheet(isScrollControlled: true, useSafeArea: true)` + `DraggableScrollableSheet`; бир вақтда битта панел (навбат), Android back ва свайп ёпади; кўчириш оқими тўлиқ экранли маршрут. Панел очилганда унинг таймери карточкадаги битта манбадан ўқийди — иккита мустақил таймер яратилмасин.
- **Локализация** — сатрлар `uz-UZ`/`ru-RU` да қайта яратилади (веб `home_dashboard.*` калитлари иловада йўқ); мавжудлари қайта ишлатилади: `booking.status_missed` (`Kelmadi`), `booking.home_empty_subtitle`, `booking.book_extra`, `booking.my_bookings_title`, `booking.history_title`, `Qayta urinish`, `Tushunarli`. Таймер ёрлиқлари янги калитлар (`home.timer.day/hour/min/sec`) ва иккала виджетда бир хил ишлатилади. Тизим шрифт масштаби ≤ 1,3 гача текширилади; ундан катта бўлса таймер ёрлиқлари 1 қаторда `ellipsis` га тушади, рақамлар қисқармайди.
