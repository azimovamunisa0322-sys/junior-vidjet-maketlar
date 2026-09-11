# AI chat экрани — `ai`

Макет: `design/screens/ai.html` (тўрт кўриниш), панеллар: `design/sheets/ai.html` (6 та), мантиқ: `design/js/app.js` (`aiView()`, `[data-ai]` эшитгичи, `showTab('ai')`). Токенлар: `design/css/tokens.css`, панел класслари: `design/css/sheet.css`, иконка маскаси: `design/css/card-base.css`.

## 1. Вазифаси

Талаба дарс бўйича саволини ментор (ёки AI ёрдамчи) билан ёзишма орқали ҳал қилади ва шу ернинг ўзидан қўшимча дарсга ёзилади. Экран таб бардаги ўртадаги апелсин FAB тугмасидан очилади (`data-tab="ai"`). Учта иш бир экранга сиғади: **суҳбат**, **қўшимча дарс банд қилиш** (кун → вақт) ва **суҳбатни бошидан бошлаш**. Ментор алмаштириш ва савол мавзусини танлаш — пастки панелларда.

## 2. Анатомия

> **Шрифт шкаласи ҳақида.** Бу экран (`screens/ai.html`, `sheets/ai.html`) чат интерфейси бўлгани учун деярли ҳамма ўлчами CSS да **қатъий** ёзилган — `--t-*` токенларидан фақат учтаси ўқилади. Шунинг учун 2026-09 даги шрифт катталашуви бу ерга деярли таъсир қилмади. Ўзгарганлари: `.scr__sub` (`--t-small` → **13/16**), `.ai-day span` (`--t-tiny` → **12/15**), панелдаги `.sheet__sub` ва `.s-item__t span` (`--t-small` → **13/16**). Қолган ҳамма рақам — пуфакча 14/19, код 11/16, чип 13/600, майдон 14/500, `.s-btn` 15/600, экран сарлавҳаси 26/32 — қатъий ва **ўзгармади**.


Экран `390×844 pt`. Статус бар 47 + контент 699 + таб бар 98 (64 + 34 хавфсиз зона). Экран устун: `min-height: 699`, `.scr__body` падингсиз (`padding: 0`), фон `#FCFCFC` (`--c-bg`). Баландлик бюджети: сарлавҳа 65 + оқим 536 + кириш панели 98 = 699.

| Элемент | Класс | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|---|
| Сарлавҳа блоки | `.scr__head` | 390×65 (6 + 32 + 4 + 15 + 8), падинг `6 16 8` | — | фон `--c-bg` `#FCFCFC`, паст чегара `0 1 0 rgba(28,39,76,.06)` | `position: sticky; top: 0; z-index: 3`; грид `1fr auto`, устунлар ораси 10 |
| Экран номи | `.scr__h1` | 32 pt қатор | 26/600, letter-spacing −0.4 | `--c-text` `#000000` | `AI chat` |
| Ким билан гаплашилмоқда | `.scr__sub[data-ai-who]` | **16 pt** қатор, `margin-top 4` | **13/500** (`--t-small`) | `--c-text-2` `#999999` | `Aziz Karimov · Blockly Dasturlash` — ментор алмашганда шу ер янгиланади |
| «Бошидан бошлаш» тугмаси | `.ai-restart` | 44 pt баланд, падинг `0 14`, радиус `--r-pill`, иконка 15, оралиқ 6 | 12/600 | фон `--c-card` `#FFFFFF`, матн `#000000`, ички чегара 1.5 px `--c-line` `#DDE1EB`, иконка `--c-slate` `#93A2C0` | `grid-row: 1 / span 2` — икки қаторнинг ўнг ёнида; `:active` да `scale(.97)` |
| Суҳбат оқими | `.ai-feed` | 390×536 (flex 1), падинг `10 16 12`, оралиқ 10 | — | — | `justify-content: flex-end` — хабарлар пастга ёпишади, ички кенглик 358 |
| Кун ажратгичи | `.ai-day span` | **21 pt** (**15** + 6), падинг `3 10`, радиус pill | **12/500** (`--t-tiny`) | фон `--c-row` `#F8F8FC`, матн `--c-text-2` `#999999` | Марказда: `Bugun 09:12` |
| Хабар қатори | `.ai-row` | — | — | — | `align-items: flex-end`, оралиқ 8; `--me` да `justify-content: flex-end` |
| Ментор аватари | `.ai-av` | 28×28, доира, иконка 16 | — | фон `--c-brand-soft` `#FFEDE7`, иконка `--c-brand` `#FF4F28` | Фақат чапдаги (ментор) хабарларда |
| Хабар пуфакчаси | `.ai-b` | max-width 270, падинг `9 12` | 14/500 line-height 19 | — | Биринчи сатр `.ai-hi` 600; ичидаги `<p>` `margin-top 8` |
| — ментор пуфакчаси | `.ai-b--ai` | шу ўлчам | 14/500 | фон `--c-row` `#F8F8FC`, матн `#000000` | Радиус `16 16 16 6` (чап пастки бурчак ўткир) |
| — талаба пуфакчаси | `.ai-b--me` | шу ўлчам | 14/500 | фон `--c-brand` `#FF4F28`, матн `#FFFFFF` | Радиус `16 16 6 16` |
| Код бўлаги | `.ai-code` | `margin-top 8`, падинг `9 11`, радиус 10 | 11/500 line-height 16, monospace | фон `--c-card` `#FFFFFF`, чегара 1 px `--c-line` `#DDE1EB`, матн `--c-navy` `#1C274C`, `<b>` `--c-brand` `#FF4F28` | `white-space: pre`, горизонтал сурилади, скроллбар яширин |
| Тез амаллар қатори | `.ai-quick` | `margin 8 −16 0`, падинг `2 16 2 52` | — | — | Экран четигача чўзилади, горизонтал сурилади; чап падинг 52 = 16 + 28 + 8 (пуфакча устуни) |
| Тез амал чипи | `.ai-chip` | 44 pt баланд, падинг `0 16`, радиус pill, иконка 16, оралиқ 6 | 13/600 | фон `--c-card` `#FFFFFF`, чегара 1.5 px `--c-line` `#DDE1EB`, матн `#000000` | `--brand`: матн ва чегара `--c-brand` `#FF4F28`; `--ghost`: матн `#FF4F28`, чегара `#DDE1EB` |
| Ёрлиқ («Mentor») | `.ai-lab` | `padding-left 36` (жами 52) | 11/600 | `--c-text-2` `#999999` | Банд қилиш кўринишларида жавоб устида |
| Кириш панели | `.ai-bar` | 390×98, падинг `10 16 40`, оралиқ 10 | — | фон `--c-bg` `#FCFCFC`, тепа чегара `0 −1 0 rgba(28,39,76,.06)` | `sticky; bottom: 0`, **`z-index` берилмайди** — апелсин FAB панел устидан тўлиқ чизилади; паст падинг 40 = FAB нинг контентга кириб турган 35 pt и |
| Матн майдони | `.ai-field` | 48 pt баланд, падинг `0 16`, радиус pill | 14/500 | фон `--c-row` `#F8F8FC`, чегара 1.5 px `--c-line`, placeholder `--c-text-3` `#B4B4B4` | Фокусда: фон `#FFFFFF`, чегара 1.5 px `--c-brand` `#FF4F28`. Placeholder: `Savolingizni yozing` |
| Юбориш тугмаси | `.ai-send` | 48×48 доира, иконка 20 | — | фон `--c-brand` `#FF4F28`, иконка оқ, соя `0 4 12 rgba(255,79,40,.3)` | `:active` да `scale(.96)` |

Бўш ҳолат ўлчамлари: расм `.ai-empty__art` 116×116 (`object-fit: contain` → robot7 да амалда 116×87), eyebrow `margin-top 14`, 11/600, letter-spacing 1.2, uppercase, `--c-brand` `#FF4F28`; сарлавҳа `margin-top 6`, 20/600, letter-spacing −0.3, `#000000`; матн `margin-top 8`, max-width 250, 14/500 line-height 20, `--c-text-2` `#999999`; тугмалар `min-height 48`, падинг `0 22`, радиус pill, 14/600 — биринчиси `margin-top 14`, фон `#FFFFFF`, чегара `--c-line` `#DDE1EB`, иконка `--c-brand`; иккинчиси (`--brand`) `margin-top 10`, матн `#FF4F28`, чегара `--c-brand-2` `#FE5B1A`. Блок маркази бўйича, падинг `16 24 20`.

## 3. Кўринишлар ва ўтишлар

Тўрт кўриниш `[data-aiview]` атрибути билан белгиланади, бир вақтда фақат биттаси кўринади: `aiView(name)` қолганларига `hidden` қўяди (`[data-aiview][hidden] { display: none !important }`). Сарлавҳа ва кириш панели ҳамма кўринишда жойида қолади.

| `data-aiview` | Қачон кўринади | Ичида нима бор |
|---|---|---|
| `chat` **(асосий)** | Экранга кирилганда доим (`showTab('ai')` → `aiView('chat')`); мавжуд суҳбат бор | Кун ажратгичи `Bugun 09:12`, 5 та хабар (ментор → талаба → ментор → талаба → код бўлакли ментор жавоби), тагида 3 та тез амал чипи |
| `empty` | «Бошидан бошлаш» дан кейин, ментор алмаштирилгач, ва суҳбат тарихи бўш бўлганда | robot7 расми, `Mentor` eyebrow, `Darsni birga tushunamiz` сарлавҳаси, саломлашиш матни (`data-ai-hello`) ва икки тугма |
| `book-day` | «Qo'shimcha darsga yozilish» босилганда (чат чипи ёки бўш ҳолат тугмаси) | Талаба хабари, `Mentor` ёрлиғи, ментор саволи ва 3 та чип: `Orqaga`, `Ertaga, 11-sentabr`, `Shanba, 12-sentabr` |
| `book-time` | Кун танлангач | Танланган кун талаба хабари сифатида, ментор саволи ва 4 та чип: `Orqaga`, `14:00`, `16:00`, `17:00` |

Ўтишлар жадвали (ҳаммаси `[data-ai]` босилишида, `preventDefault` + `stopPropagation` билан):

| Босилган элемент | `data-ai` | Қаердан | Натижа |
|---|---|---|---|
| Таб бардаги FAB | — (`data-tab="ai"`) | ихтиёрий экран | Экран очилади ва **доим** `chat` кўринишига қайтади; очиқ панел ёпилади |
| `Qo'shimcha darsga yozilish` чипи | `book-day` | `chat` | `book-day` |
| `Qo'shimcha darsga yozilish` тугмаси | `book-day` | `empty` | `book-day` |
| `Orqaga` | `empty` | `book-day` | `empty` (бўш ҳолатга қайтади) |
| Кун чипи (`Ertaga…`, `Shanba…`) | `book-time` | `book-day` | `book-time` |
| `Orqaga` | `book-day` | `book-time` | `book-day` |
| Вақт чипи (`14:00`/`16:00`/`17:00`) | — (`data-open="booked"`) | `book-time` | Кўриниш ўзгармайди, устидан `Dars band qilindi` огоҳлантириши очилади |
| Панелдаги `Boshidan boshlash` | `restart` | `restart` панели | Суҳбат тозаланади → `empty`, панел ёпилади |
| Панелдаги ментор қатори | `mentor` | `mentors` панели | Сарлавҳа янгиланади, суҳбат нолдан → `empty`, панел ёпилади |

## 4. «Boshidan boshlash»

Уч қадам: сарлавҳадаги `.ai-restart` тугмаси → тасдиқлаш огоҳлантириши (`data-sheet="restart"`, `data-kind="alert"`) → ундаги биринчи тугма `[data-ai="restart"]`. Босилганда бир йўла учта иш бўлади: суҳбат тозаланади, `empty` кўриниши очилади, панел ёпилади (`aiView('empty'); closeSheet()`).

Огоҳлантириш матни: «Joriy suhbat yopiladi va yangi suhbat boshlanadi. Eski savol-javoblaringiz chat tarixida qoladi.» + изоҳ «Mentor va kurs o'zgarmaydi: Aziz Karimov · Blockly Dasturlash». Яъни **эски суҳбат ўчирилмайди** — у чат тарихида қолади, бэкендда эса янги суҳбат (`conversation`) очилади ва кейинги хабарлар шунга ёзилади. Ментор ва курс ўзгармайди — фақат контекст тозаланади.

## 5. Менторни алмаштириш

`data-sheet="mentors"` панели «Mentorni almashtirish» чипидан очилади. Сарлавҳа: «Qaysi mentoringiz bilan gaplashmoqchisiz?», изоҳ: «Mentorni almashtirsangiz joriy suhbat o'chmaydi — u chat tarixida qoladi.»

Ҳар қатор — босиладиган `.s-item.ai-pick` (падинг `12 14`, радиус 14, фон `--c-row` `#F8F8FC`, оралиқ 12): чапда **ҳарф-аватар** `.ai-ava` 40×40, радиус 12, фон `--c-brand-soft` `#FFEDE7`, ҳарф 16/600 `--c-brand` `#FF4F28`; ўртада исм (14/600 — `.s-item__t b` да қатъий, ўзгармади) ва курс (**13/500** `#999999` — `--t-small`); ўнгда ҳолат. Тўртта ментор + ажратгич (`.s-div` 1 px `--c-line-2` `#F0F0F0`) + `AI yordamchi · 24/7` қатори (ҳарф-аватар ўрнига `.s-item__ic` 36×36 оқ квадрат, ичида `ai.svg` `--c-brand`).

Танланган қатор `.ai-pick--sel`: фон `--c-brand-soft` `#FFEDE7`, чегара 1.5 px `--c-brand` `#FF4F28`, ўнг ёрлиқ ранги `--c-brand`. Онлайн белгиси `.ai-st--on`: 8 pt нуқта + `Onlayn`, ранг `--c-green-2` `#58CC02`. Бошқа қаторларда ўнгда `arrow_right.svg` 16 pt `--c-brand`.

Босилганда: аввалги танлов олиб ташланади, босилгани ажратилади, `data-who` қиймати сарлавҳадаги `[data-ai-who]` га ёзилади, `[data-ai-hello]` матни янгиланади (AI ёрдамчи танланса — «Salom! Dars bo'yicha istalgan savolingizni yozing — darhol javob beraman.», ментор танланса — «Salom! Sizda dars bo'yicha qanday savollaringiz bor?»), сўнг `empty` кўриниши очилиб панел ёпилади. Яъни **ҳар ментор алмаштириш = янги суҳбат**.

## 6. Панеллар

Жами 6 та панел, ҳаммаси `data-widget="ai"`. Икки тури: **пастки панел** (`sheet`, пастдан чиқади, радиус `24 24 0 0`, max-height 88 %) ва **огоҳлантириш** (`alert`, марказда, ён четлар 20, радиус 20, max-height 76 %). Ёпиш: фонга босиш, ✕ (32×32, фон `--c-row`), `Escape` ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Тугмалари |
|---|---|---|---|---|
| `mentors` | пастки панел | `chat`: «Mentorni almashtirish» чипи | 4 ментор + AI ёрдамчи қатори, танлангани ажратилган | `Bekor qilish` |
| `ask` | пастки панел | `chat` ва `empty`: «Savolim bor» | 4 та мавзу (`Dars savoli`, `Uy vazifasi`, `Kod ishlamayapti`, `Boshqa savol`), изоҳ қатори | `Savolni yozish` · `Bekor qilish` |
| `book` | пастки панел | **захира** — макетда ҳеч қаердан очилмайди (чатдаги `book-day`/`book-time` ўрнини босади) | Сана ва давомийлик қаторлари, `Bo'sh vaqtlar` лаби, 6 та вақт чипи (банд вақтлар `--off`), изоҳ | `Band qilish` · `Bekor qilish` |
| `booked` | огоҳлантириш | `book-time`: вақт чипи; `book` панели | Яшил сатр `10-sentabr, payshanba · 16:00`, ментор ва курс қаторлари, бекор қилиш шарти изоҳи | `Yopish` |
| `restart` | огоҳлантириш | сарлавҳадаги `Boshidan boshlash` | Икки абзац матн (4-бўлим) | `Boshidan boshlash` `[data-ai="restart"]` · `Bekor qilish` |
| `error` | огоҳлантириш | юбориш тугмаси (макетда алоқа хатосини кўрсатиш учун) | `no-internet.png` 116 pt кенгликда, «Internet bilan aloqa uzildi. Qaytadan urinib ko'ring.», изоҳ | `Qayta urinish` · `Yopish` |

Панел ичидаги умумий ўлчамлар: сарлавҳа 19/600 letter-spacing −0.2 (қатъий, ўзгармади), изоҳ **13/500** `#999999` (`--t-small`) (`--green` `#58CC02`, `--brand` `#FF4F28`), тана падинг `0 16 8` оралиқ 12, пастки қатор падинг `10 16 32`; тугма `.s-btn` 48 pt, радиус 14, 15/600, асосийси `--c-brand` `#FF4F28` + оқ матн, `--ghost` `--c-row` `#F8F8FC` + қора матн. Вақт чипи `.s-chip` шу экранда 40 эмас, **44 pt** (бармоқ учун), танлангани `--c-brand` фон + оқ матн, банди `--off` `--c-text-3` `#B4B4B4` ва босилмайди.

## 7. Матнлар

| Жой | UZ матн |
|---|---|
| Экран номи, кичик сатр | `AI chat` · `Aziz Karimov · Blockly Dasturlash` |
| Сарлавҳа тугмаси | `Boshidan boshlash` |
| Бўш ҳолат | `Mentor` · `Darsni birga tushunamiz` · `Salom! Sizda dars bo'yicha qanday savollaringiz bor?` · `Savolim bor` · `Qo'shimcha darsga yozilish` |
| AI ёрдамчи танланганда | `Salom! Dars bo'yicha istalgan savolingizni yozing — darhol javob beraman.` |
| Тез амаллар | `Savolim bor` · `Mentorni almashtirish` · `Qo'shimcha darsga yozilish` |
| Кун танлаш | `Qaysi kunga yozaylik? Quyidagi kunlardan birini tanlang (yoki yozing, masalan «ertaga»):` · `Orqaga` · `Ertaga, 11-sentabr` · `Shanba, 12-sentabr` |
| Вақт танлаш | `Yaxshi. Ertaga qaysi vaqt qulay? Band vaqtlar ro'yxatda yo'q.` · `14:00` · `16:00` · `17:00` |
| Кириш панели | placeholder `Savolingizni yozing`, юбориш тугмаси `aria-label="Yuborish"` |

## 8. Вебдаги оқим билан мослиги

Веб версиядаги учта қадам шу тартибда сақланган: (1) ментор рўйхатидан кимга ёзишни танлаш → мобилда `mentors` панели; (2) танлангач бўш «Darsni birga tushunamiz» экрани саломлашиш билан → мобилда `empty` кўриниши; (3) қўшимча дарс суҳбат ичида кун → вақт кетма-кетлигида банд қилинади → мобилда `book-day` → `book-time` → `booked`. Фарқи фақат жойлашувда: вебда ментор рўйхати ёнма-ён устун, мобилда пастки панел; вебдаги «янги чат» тугмаси мобилда сарлавҳадаги `Boshidan boshlash` га айланган. Оқим ва матнлар бир хил — талаба вебдан мобилга ўтганда бошқа кетма-кетликни ўрганиши шарт эмас.

## 9. Расмлар ва иконкалар

| Ном | Файл | Қаерда | Ўлчам |
|---|---|---|---|
| Робот (бош бармоқ) | `app-assets/images/robot7.png` (700×528) | `empty` кўриниши | 116×87 (contain) |
| Интернет йўқ | `app-assets/images/no-internet.png` (783×1077) | `error` панели | кенглик 116, баландлик пропорционал |
| `ai.svg` | `app-assets/icons/` | ментор аватари (`--c-brand`), «Savolim bor» чипи, `mentors` ва `ask` панеллари | 16 (панелда 18) |
| `user.svg` | `app-assets/icons/` | «Mentorni almashtirish» чипи, банд қилиш кўринишларидаги аватар | 16 |
| `book.svg` | `app-assets/icons/` | «Qo'shimcha darsga yozilish» чипи, `ask` панелидаги «Dars savoli» | 16 / 18 |
| `time.svg` | `app-assets/icons/` | `Boshidan boshlash` тугмаси (`--c-slate` `#93A2C0`), `booked` ва `restart` изоҳлари | 15 / 13 |
| `arrow_right.svg` | `app-assets/icons/` | юбориш тугмаси (оқ, 20), `Savolim bor` тугмаси (`--c-brand`), ментор қаторидаги шеврон | 20 / 16 |
| `hourglass.svg` | `app-assets/icons/` | `book` ва `error` панеллари изоҳи | 13 |
| `flag.svg`, `failed.svg` | `app-assets/icons/` | `ask` панелидаги «Uy vazifasi» (`--c-brand`) ва «Kod ishlamayapti» (`--c-red` `#ED0000`) | 18 |
| `circle.svg` | `app-assets/icons/` | `ask` панелидаги маълумот изоҳи | 13 |
| Онлайн нуқтаси | `.ai-dot` (Flutter: `Container` доира) | `mentors` панели, `--c-green-2` `#58CC02` | 8 |

## 10. Flutter учун изоҳлар

- **Нативе экран, WebView эмас.** Экран `Scaffold(resizeToAvoidBottomInset: true)`: `AppBar` ўрнига оддий `Container` (сарлавҳа блоки, `sticky` = `SliverPersistentHeader` ёки устун тепасидаги қатъий блок), ўртада `Expanded(ListView)`, пастда кириш панели. Клавиатура очилганда кириш панели унинг устига кўтарилади, оқим автоматик пастга сурилади.
- **Хабарлар рўйхати тескари тартибда:** `ListView.builder(reverse: true)` — янги хабар индекс 0 да, эски суҳбат юқорига қараб пагинация билан юкланади (`ScrollController` тепага етганда `loadMore`). Макетдаги `justify-content: flex-end` шунинг веб муқобили — хабарлар кам бўлса ҳам пастга ёпишади.
- **Кўринишлар:** тўрттаси битта `enum AiView { chat, empty, bookDay, bookTime }` — `AnimatedSwitcher` ичида; сарлавҳа ва кириш панели алмашмайди, фақат ўртадаги қисм. `book-day`/`book-time` — алоҳида экран эмас, суҳбат оқимининг ичидаги қадам.
- **Пуфакчалар:** `Container(constraints: BoxConstraints(maxWidth: 270), padding: EdgeInsets.symmetric(horizontal: 12, vertical: 9), decoration: BoxDecoration(borderRadius: BorderRadius.only(...)))`. Код бўлаги — `SingleChildScrollView(scrollDirection: Axis.horizontal)` ичида `SelectableText` monospace 11/16, ичидаги сон `TextSpan` билан `--c-brand` рангда.
- **Тез амал чиплари:** `SingleChildScrollView(horizontal)` (чат) ва `Wrap(spacing: 8, runSpacing: 8)` (банд қилиш қадамлари). Макетда `--wrap` варианти чап томондан 36 pt дан бошланади — Flutter да пуфакча устунига (52 pt) текисланг.
- **Кириш панели ва FAB:** таб бардаги FAB контентга 35 pt кириб туради, шунинг учун паст падинг 40. Flutter да буни `Padding(bottom: 40 + MediaQuery.viewPadding.bottom)` эмас, `bottomNavigationBar` баландлигини ҳисобга олган `SafeArea` билан беринг; FAB `Stack` да панелдан **кейин** чизилсин.
- **«Boshidan boshlash» бэкендда:** тасдиқдан кейин `POST /conversations` (ёки шунга тенг чақирув) — янги `conversationId` олинади, локал хабарлар рўйхати тозаланади, эскиси тарихда қолади. Оптимистик тозалаш қилинмасин: жавоб келгунча тугма `loading` ҳолатида турсин, хато бўлса эски суҳбат жойида қолади.
- **Ментор алмаштириш:** танлов ҳам янги суҳбат очади (`mentorId` билан). Сарлавҳадаги исм ва саломлашиш матни сервердан келган ментор объектидан олинади, макетдаги `data-who` — унинг ўрнини босувчи.
- **Юбориш:** хабар аввал локал «юборилмоқда» ҳолатида қўшилади; хато бўлса `error` огоҳлантириши очилади ва матн майдонда сақланиб қолади («Yozgan xabaringiz saqlanadi»). Ментор жавоби push ёки socket орқали келади — экран очиқ бўлса рўйхатга қўшилади, ёпиқ бўлса билдиришнома.
- **Токенлар** `ThemeExtension<JuniorTokens>` дан: `brand #FF4F28`, `brand2 #FE5B1A`, `brandSoft #FFEDE7`, `row #F8F8FC`, `line #DDE1EB`, `line2 #F0F0F0`, `navy #1C274C`, `slate #93A2C0`, `text2 #999999`, `text3 #B4B4B4`, `green2 #58CC02`, `red #ED0000`; шрифт `SFpro` (400/500/600).
- **Матн масштаби ва мослашув:** `MediaQuery.withClampedTextScaling(maxScaleFactor: 1.3)`; сарлавҳадаги исм 1 қатор `ellipsis`, «Boshidan boshlash» тугмаси эса `Icon` + матн — тор экранда матн яширилиб фақат иконка қолиши мумкин.
- **Локализация:** калитлар `ai.*` (`ai.title`, `ai.restart`, `ai.empty.h`, `ai.book.day`, …); вақт ва сана Тошкент (UTC+5) бўйича, 24 соатли `HH:mm`, сана `D-oy, kun nomi`.
