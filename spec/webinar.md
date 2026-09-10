# WebinarWidget — `webinar`

Манба: `WIDGET-MAP.md` 4.1 (`widgets/EventWidgets.jsx` L175–210). Макет: `design/cards/webinar.html` (10 ҳолат, асосийси `upcoming`), панеллар: `design/sheets/webinar.html`. Токенлар: `design/css/tokens.css`, умумий класслар: `design/css/card-base.css`, панел класслари: `design/css/sheet.css`. Саноқ таймери — умумий компонент (`booking`, `extra` да ҳам ишлатилади), тўлиқ тавсифи: `spec/taymer.md`.

## 1. Вазифаси

Талабага навбатдаги вебинар (гуруҳ онлайн дарси) қачон бўлишини ва ҳозир кириш мумкинлигини бир қарашда кўрсатади. Дарсгача вақт бор пайтда карточканинг асосий мазмуни — **тўрт катакли саноқ таймери** (кун · соат · дақиқа · сония): талаба «қанча қолди»ни ўқимайди, кўради. Дарс мавзуси, ментор ва кириш вақти каби тафсилотлар бу пайтда карточкада эмас, `details` панелида туради. Ягона амал — «Darsga qo'shilish»: кириш ойнаси очиқ ва бэкенд рухсат берганда ҳаволани очади, қолган ҳолатларда тугма ўчирилган кўринишда туради ва сабаби панелда ёзилади.

## 2. Анатомия

Карточка `304×178 pt`, ички падинг `12` → ички қути `280×154 pt`, радиус `18` (`--r-card`), фон `#FFFFFF` (`--c-card`), соя `0 6 18 rgba(28,39,76,.06)`. Устун, элементлар ораси `8 pt`.

Баландлик бюджети иккита:

- **Чипли ҳолатлар** (`join-open`, `live`, `no-link`, `live-no-link`, `updating`, `ended`): сарлавҳа 35 + 8 + тана 67 (мавзу 32 + изоҳ 14, оралиқ `auto` 21 — қўшимча 7 pt шу оралиққа тушди) + 8 + пастки қатор 36 = 154.
- **Таймерли ҳолатлар** (`upcoming`, `upcoming-today`): сарлавҳа 35 + 8 + тана 67 (таймер 45 тепага ёпишади, пастда 22 pt бўш — қўшимча 7 pt шу бўш жойга тушди) + 8 + пастки қатор 36 = 154. Танада мавзу ҳам, изоҳ ҳам йўқ.

| Элемент | Класс | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|---|
| Сарлавҳа қатори | `.wcard__head` | 280×35 (18 + 2 + 15) | — | — | чапда матн устуни; чипли ҳолатларда ўнгда чип, таймерли ҳолатларда чип **йўқ** — устун `.wb-hpad` олади; `align-items:flex-start` |
| Сарлавҳа | `.wcard__title` | 18 pt қатор | 15/600, letter-spacing −0.1 | `--c-text` `#000000` | `Keyingi vebinar` (104 pt); `ended` да `Vebinar` |
| Кичик сатр (сана, вақт) | `.wcard__sub` | 15 pt қатор, `margin-top 2` | 12/500 | `--c-blue` `#1CB0F6` — режалаштирилган; `--c-green-2` `#58CC02` — якунланган; `--c-text-2` `#999999` — янгиланмоқда | `10 sentabr, 19:30` / `Bugun, 19:30` / `Yakunlandi · 8 sentabr, 19:30` (151 pt) |
| Ўнг падинг (робот учун) | `.wb-hpad` | `padding-right: 52` (робот 46 + 6) | — | — | фақат `upcoming`, `upcoming-today`. Матн кенглиги 280 − 52 = **228 pt**, ўнг чегараси x 240; робот чап чегараси x 250 → 10 pt зазор |
| Чип (ҳолат слоти) | `.wcard__chip` + модификатор | 22 pt баланд, падинг `0 8`, радиус pill, иконка 14 | 12/600 | `--green` (кириш очиқ): `--c-green-soft` `#ECFFDE` / `--c-green-2` `#58CC02`; `--live`: фон `--c-red` `#ED0000`, матн `#fff`; `--pink` (сўник жонли): `--c-pink-soft` `#FFE4EA` / `#ED0000`; модификаторсиз (тайёрланмоқда, янгиланмоқда): `--c-row` `#F8F8FC` / `--c-text-2` `#999999` | Фақат 5 ҳолатда. Саноқ чипи (`--blue`) **олиб ташланди** — ўрнида таймер. Энг кенг чип `Tayyorlanmoqda` ≈ 78 + 14 + 4 + 16 = 112 pt; сарлавҳа 104 + 8 + 112 = 224 ≤ 280. Жонли нуқта `.wb-dot` 8 pt, `currentColor` |
| Тана | `.wcard__body` | 280×67 (flex 1) | — | — | устун, оралиқ 6; чипли ҳолатларда ҳолат изоҳи `margin-top:auto` билан пастга ёпишади |
| **Саноқ таймери** | `.wtimer` (`+ --soon`) | 280×45; grid 4 устун, gap 6 → катак `65.5×45` | рақам 20/23 600, letter-spacing −0.5, tabular-nums; ёрлиқ 9/11 500, letter-spacing +0.3, UPPERCASE | катак фони `--c-row` `#F8F8FC`, радиус 12 (`--r-inner`); рақам `--c-text` `#000000`; ёрлиқ `--c-text-3` `#B4B4B4`. `--soon`: фон `--c-brand-soft` `#FFEDE7`, рақам `--c-brand` `#FF4F28`, ёрлиқ `#FF4F28` opacity .7 | Катак падинги `6 0 5` → 6 + 23 + 11 + 5 = 45 pt. Танада ягона элемент, тепага ёпишади (у 55–100), пастда 22 pt бўш жой. Ёрлиқлар: `kun` · `soat` · `daqiqa` · `soniya`. Ишлаши, ноль қоидаси ва RU ёрлиқлари — `spec/taymer.md` |
| Мавзу (асосий факт) | `.wcard__text.wcard__text--2` | ≤ 2 қатор × 16 = 32 pt | 13/500; мавзу `<b>` 13/600 | `--c-text`; курс `.wcard__muted` `#999999` | `Sikllar va shartlar · Blockly Dasturlash` (214 pt → 1 қатор; робот ёнида 208 pt да 2 қатор). Таймерли ҳолатларда карточкада **йўқ** — панелнинг сарлавҳаси |
| Ҳолат изоҳи | `.wcard__hint` | 14 pt, иконка 12, оралиқ 4 | 11/500 | `--c-text-2` `#999999`; иконка slate `#93A2C0`, жонлида `--c-red` | Бир қатор. Пастки роботли ҳолатларда `.wb-pad` (`padding-right:72`) → матн кенглиги 208 pt. Таймерли ҳолатларда изоҳ ҳам панелга кўчди |
| Пастки қатор | `.wcard__foot` | 36 pt | — | — | `margin-top:auto` |
| Асосий тугма | `.wcard__btn` | 36 pt, радиус 12, падинг `0 14`, иконка 16, оралиқ 6 | 13/600 | фон `--c-brand` `#FF4F28`, матн `#fff` | `Darsga qo'shilish` + `arrow_right`. `--fit` варианти (151 pt) фақат `join-open` да — робот пастда бўлгани учун; таймерли ҳолатларда робот тепада, шунинг учун тугма **тўлиқ кенглик 280** |
| Ўчирилган тугма | `.wcard__btn--disabled` | шу ўлчам | 13/600 | фон `--c-line-2` `#F0F0F0`, матн ва `lock` иконка `--c-text-3` `#B4B4B4` | Кўриниши ўчирилган, лекин **босилади** → пастки панел (4-бўлим) |
| Ghost тугма | `.wcard__btn--ghost` | шу ўлчам | 13/600 | фон `--c-row` `#F8F8FC`, матн `#000` | фақат `error`: `Qayta urinish` |
| Робот (юқори ўнг) | `.wcard__art`, `--art:46px` | 46×46, `right 8`, `top 8` (x 250–296, у 8–54) | — | — | `upcoming`, `upcoming-today`. Сарлавҳа устуни билан ёнма-ён туради (`.wb-hpad`), таймер у 55 дан бошлангани учун роботга тегмайди |
| Робот (пастки ўнг) | `.wcard__art.wcard__art--bottom`, `--art:64px` | 64×64, `right 8`, `bottom 8` (у ≈ 106–170) | — | — | `robot2` (кириш очиқ, 64×53 contain), `robot7` (якунланди, 64×48). Изоҳ `.wb-pad` олади |
| Хато қатори | `.wcard__row.wb-row` | 44 pt | 13/600 + 11/500 | — | `robot4` 44×44 + `Yuklab bo'lmadi` + `Internet aloqasini tekshiring` |
| Скелет | `.wcard--skeleton .sk` | сарлавҳа 16×104, сатр 12×90, таймер `.sk--timer` 45×280 (радиус 12), тугма 36×280 | — | `#EEF0F3 → #F6F7F9` градиент, 1.2 с | Асосий (таймерли) `upcoming` қолипини такрорлайди: чип йўқ, тана — битта таймер блоки |

Кенглик текшируви (SF Pro метрикаларидан ҳисобланган): сарлавҳа устуни таймерли ҳолатларда ≤ 228 pt (`Keyingi vebinar` 104, `10 sentabr, 19:30` 151 — иккаласи ҳам сиғади); сарлавҳа + чип ≤ 280 pt; изоҳлар роботсиз ≤ 212 pt (лимит 280), пастки робот билан ≤ 193 pt (лимит 208); таймер катагида икки рақам ≈ 23.5 pt ва энг узун ёрлиқ `SONIYA` ≈ 39 pt — катак 65.5 pt га эркин сиғади.

## 3. Ҳолатлар

Фаза `getEventPhase(event, now)` дан (`upcoming` / `joinOpen` / `live` / `active` / `updating` / бошқа). `joinOpen` ва `active` карточкада бир хил чизилади. «Кириш мумкин» = `canJoin === true && joinUrl`. Кун ёрлиғи: Тошкент куни бугун бўлса `Bugun`, акс ҳолда `D oy`. Ҳамма вақт 24 соатли `HH:mm`, Тошкент (қаттиқ UTC+5).

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `upcoming` **(асосий)** | `phase = upcoming`, бошланишига ≥ 1 кун | Кўк сана, чип йўқ; тананинг ҳаммаси — тўрт катакли таймер (`kun/soat/daqiqa/soniya`, оддий кулранг); ўчирилган **тўлиқ кенгликдаги** тугма `lock`; робот `robot` 46 pt юқори ўнгда. Мавзу ва «Kirish 19:20 da ochiladi» изоҳи — `details` панелида | `Keyingi vebinar` · `10 sentabr, 19:30` · таймер `02 kun · 04 soat · 42 daqiqa · 41 soniya` · `Darsga qo'shilish` | `Следующий вебинар` · `10 сентября, 19:30` · таймер (RU ёрлиқлари `spec/taymer.md` да) · `Войти на урок` |
| `upcoming-today` | `phase = upcoming`, бугун | `upcoming` билан бир хил, фақат `Bugun, HH:mm` ва бошланишига < 1 соат қолганда таймер `wtimer--soon` (брендранг): кун ва соат катаклари `00` бўлиб қолади, эътибор дақиқа ва сонияга тушади | `Bugun, 19:30` · таймер `00 kun · 00 soat · 23 daqiqa · 41 soniya` (брендранг) | `Сегодня, 19:30` · таймер (брендранг) |
| `join-open` | `phase ∈ {joinOpen, active}`, `canJoin && joinUrl` | Яшил чип «Kirish ochiq» (`check_correct`), мавзу, изоҳ `user` + ментор ва модул, **фаол** fit тугма + `arrow_right`, робот `robot2` (қўли билан чақиради) | `Kirish ochiq` · `Sikllar va shartlar · Blockly Dasturlash` · `Mentor: Aziz Karimov · Modul 3` · `Darsga qo'shilish` | `Вход открыт` · `Ментор: Азиз Каримов · Модуль 3` · `Войти на урок` |
| `live` | `phase = live`, `canJoin && joinUrl` | Қизил `--live` чип нуқта билан «Jonli efir» (нуқта Flutter да 1.2 с пульс), мавзу, изоҳ қизил `time` + «Dars boshlandi, hozir qo'shiling», фаол тўлиқ кенгликдаги тугма, роботсиз | `Jonli efir` · `Dars boshlandi, hozir qo'shiling` · `Darsga qo'shilish` | `В эфире` · `Урок начался, присоединяйтесь сейчас` · `Войти на урок` |
| `no-link` | `phase ∈ {joinOpen, active}`, `!joinUrl` ёки `canJoin !== true` (шу жумладан очилиш дақиқасидаги эски `canJoin`) | Кулранг чип «Tayyorlanmoqda» (`hourglass`), мавзу, изоҳ `circle` + «Havola tez orada shu yerda paydo bo'ladi», ўчирилган тўлиқ тугма `lock`. `canJoin !== true && joinUrl` варианти — шу кўриниш, изоҳ: «Kirish hali berilmagan — mentorga yozing» | `Tayyorlanmoqda` · `Havola tez orada shu yerda paydo bo'ladi` / `Kirish hali berilmagan — mentorga yozing` | `Готовится` · `Ссылка скоро появится здесь` / `Доступ пока не открыт — напишите ментору` |
| `live-no-link` | `phase = live`, `!joinUrl` ёки `canJoin !== true` | Сўник (пушти) чип «Jonli efir», мавзу, изоҳ қизил `time` + «Dars boshlandi · havola shu yerda chiqadi», ўчирилган тўлиқ тугма | `Jonli efir` · `Dars boshlandi · havola shu yerda chiqadi` | `В эфире` · `Урок начался · ссылка появится здесь` |
| `updating` | `phase = updating` | Кулранг чип «Yangilanmoqda», сана **кулранг** (ўзгариши мумкин), мавзу, изоҳ `circle` + «Jadval yangilanmoqda, biroz kuting», ўчирилган тўлиқ тугма. Таймер кўрсатилмайди — вақтнинг ўзи ишончсиз | `Yangilanmoqda` · `10 sentabr, 19:30` (кулранг) · `Jadval yangilanmoqda, biroz kuting` | `Обновляется` · `Расписание обновляется, подождите` |
| `ended` | фаза бешталикдан ташқарида (тугаган), тадбир ҳали `selected.active` да | Сарлавҳа `Vebinar`, яшил сатр «Yakunlandi · D oy, HH:mm», мавзу, тугма йўқ — пастки қаторда изоҳ `circle` + «Keyingi vebinar haqida xabar beramiz», робот `robot7` (бош бармоқ) | `Vebinar` · `Yakunlandi · 8 sentabr, 19:30` · `Keyingi vebinar haqida xabar beramiz` | `Вебинар` · `Завершён · 8 сентября, 19:30` · `О следующем вебинаре сообщим` |
| `loading` | биринчи сўров, маълумот йўқ | Скелет: сарлавҳа + сана сатри, таймер блоки, тўлиқ кенгликдаги тугма | — | — |
| `error` | сўров хатоси, кэш йўқ | `robot4` 44 pt + «Yuklab bo'lmadi» + изоҳ «Internet aloqasini tekshiring», ghost тугма «Qayta urinish» | `Yuklab bo'lmadi` · `Internet aloqasini tekshiring` · `Qayta urinish` | `Не удалось загрузить` · `Проверьте подключение к интернету` · `Повторить попытку` |

Веб ҳолатларининг бирлаштирилиши: `joinOpen`/`active` × {кириш мумкин, ҳавола йўқ, рухсат йўқ} → `join-open` / `no-link`; `live` × {…} → `live` / `live-no-link`; `updating` × {ҳавола йўқ, рухсат йўқ} → `updating`; «бугун» ёрлиғи ва мавзу заҳиралари (`title` → `webinar_topic {course}` → `course`) — матн варианти, алоҳида ҳолат эмас. `startsAt` нотўғри → `error` кўриниши («Sana aniqlanmadi» изоҳи билан). Қолдирилган вебинар (`missedEvents`) бу виджетда чизилмайди (8-савол).

Саноқ қоидаси: карточкада тўртала катак **доим** кўринади (бўш бирлик `00` бўлиб туради — жойи сакрамайди), рақамлар ҳар сонияда янгиланади, `--soon` чегараси < 1 соат. Таймер нолга етганда карточка `join-open` (ёки `no-link`) ҳолатига ўтади ва таймер ўрнини чип + мавзу эгаллайди. Бирлик ҳисоби, ноль ва орқага кетган вақт қоидалари — `spec/taymer.md`.

RU узунлик изоҳлари: чип олиб ташлангани учун `Следующий вебинар` (150 pt) ва `10 сентября, 19:30` энди 228 pt устунга эркин сиғади — эски «Через N дн./ч/мин» қисқартмаси керак эмас. `Присоединиться к уроку` (155 pt) тўлиқ кенгликдаги тугмага сиғади, `join-open` даги fit тугмада эса чегарада — `Войти на урок` (88 pt) тавсия этилади; `Циклы и условия · Программирование Blockly` 272 pt — тўлиқ кенгликда 1 қатор, робот ёнида 2 қатор.

## 4. Ҳаракатлар

| Элемент | Босиш зонаси | Ҳаракат | Нима очади |
|---|---|---|---|
| Карточка танаси (сарлавҳа, сана, таймер/чип, мавзу, изоҳ, робот) | бутун карточка 304×178 | `InkWell`, суриш билан аралашмаслиги учун `tap` фақат ҳаракатсиз босишда | Тафсилот **пастки панели** (5-бўлим) |
| `Darsga qo'shilish` (фаол: `join-open`, `live`) | 36 pt тугма, босиш зонаси ≥ 44 pt (`MaterialTapTargetSize.padded`); fit варианти ≥ 151×44 | `joinUrl` ни очиш: Zoom/Meet схемалари → тизим иловаси, `http(s)` → илова ичидаги браузер (`url_launcher`, `LaunchMode.inAppBrowserView`/`externalApplication`). Аналитика воқеаси `webinar_join`. Очилмаса toast «Havolani ochib bo'lmadi» + панелда «Havolani nusxalash» | Ташқи URL |
| `Darsga qo'shilish` (ўчирилган кўриниш: `upcoming`, `upcoming-today`, `no-link`, `live-no-link`, `updating`) | 280×36, босиш зонаси ≥ 44; `enabled`, `Semantics(enabled:false)` эмас — `hint` билан | Тафсилот панелини очади (`data-open="details"` / `"no-link"`). Таймерли ҳолатларда бу ягона йўл: мавзу, ментор ва «кириш қачон очилади» фақат панелда | Пастки панел |
| `Qayta urinish` (`error`) | 280×44 | Сўровни қайта юбориш → `loading` → натижа | Йўқ |
| Таймер, чип, изоҳ | алоҳида босилмайди | карточка босишига киради | — |
| Автоматик | — | Таймерли ҳолатларда рақамлар **ҳар сонияда**; чипли ҳолатларда матн дақиқада бир. Фаза ўзгарганда (`upcoming → joinOpen`, `joinOpen → live`) карточка **дарҳол** қайта чизилади ва bookings сўрови қайта юборилади (очилиш дақиқасидаги эски `canJoin` муаммоси); илова фонга ўтиб қайтганда (`AppLifecycleState.resumed`) ва push босилганда ҳам қайта сўраш. Карусель тартиби фақат маълумот янгилангандагина, фойдаланувчи каруселни ушлаб турганда эмас | — |

## 5. Пастки панеллар

Жами 3 та панел. Уч тури бор: **пастки панел** (пастдан чиқади), **тўлиқ экран** (календарь, вақт танлаш), **огоҳлантириш** (бир абзац матн ва тугма). Ёпиш: орқа фонга босиш, ✕ тугмаси ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Асосий тугма |
|---|---|---|---|---|
| `details` | пастки панел | карточка: `upcoming`, `upcoming-today`, `updating` | катта саноқ таймери, маълумот қаторлари, рангли изоҳ, кириш вақти изоҳи | Darsga qo'shilish (ўчирилган) |
| `join` | пастки панел | карточка: `join-open`, `live` | яшил изоҳ, маълумот қаторлари, тайёргарлик изоҳи | Darsga qo'shilish |
| `no-link` | огоҳлантириш | карточка: `no-link`, `live-no-link` | матн | Tushunarli |

### `details` панелининг ичи (карточкадан кўчган мазмун)

Карточкадан олиб ташланган нарсалар шу ерда тўпланган — тепадан пастга:

| Ўрин | Элемент | Мазмун | Ўлчам ва ранг |
|---|---|---|---|
| Сарлавҳа | `.sheet__title` | `Sikllar va shartlar` — **дарс мавзуси** (карточкада энди йўқ) | 19/24 600, letter-spacing −0.2, `--c-text` `#000000` |
| Сарлавҳа сатри | `.sheet__sub.sheet__sub--brand` | `10 sentabr, 19:30 · 2 kun qoldi` | 12/500, `--c-brand` `#FF4F28`, `margin-top 4` |
| 1 | `.s-hint` + `time.svg` | `Darsga qadar qolgan vaqt` | 11/14 500, `--c-text-2` `#999999`; иконка 13 |
| 2 | **`.s-timer`** (`+ --soon`) | тўрт катак: `02 kun` · `04 soat` · `42 daqiqa` · `41 soniya` | grid 4 устун, gap 8; панел кенглиги 390 − 32 = 358 → катак `83.5×62`. Катак падинги `10 0 9`, радиус 14, фон `--c-row` `#F8F8FC`; рақам 24/28 600, letter-spacing −0.6, tabular-nums, `--c-text` `#000000`; ёрлиқ `--t-tiny` 11/14, `margin-top 1`, `--c-text-2` `#999999`. `--soon`: фон `--c-brand-soft` `#FFEDE7`, рақам `--c-brand` `#FF4F28` |
| 3 | `.s-rows` (4 та `.s-row`) | `Kurs — Blockly Dasturlash`, `Mentor — Aziz Karimov`, `Davomiyligi — 60 daqiqa`, `Kirish ochiladi — 19:20 da` | қатор падинги `12 14`, радиус 14, фон `#F8F8FC`; калит 12/500 `#999999`, қиймат 14/18 600 `#000000`; қаторлар ораси 6 |
| 4 | `.s-note.s-note--blue` | дарс мазмуни: `Darsda sikllar, <b>while</b> va <b>for</b> takrorlanishlari amaliy misollarda ko'rsatiladi. Daftar va qalam tayyorlab qo'ying.` | падинг `12 14`, радиус 14, фон `--c-blue-soft` `#E8F6FE`, матн 13/16 500 `#000000` |
| 5 | `.s-hint` + `time.svg` | `Darsga kirish tugmasi boshlanishidan 10 daqiqa oldin ishlay boshlaydi.` — карточкадаги «Kirish 19:20 da ochiladi» изоҳининг ўрнини босади | 11/14 500, `#999999` |

Тана падинги `0 16 8`, элементлар ораси 12; панелдаги таймернинг ишлаши карточкадаги билан бир хил (`spec/taymer.md`), фақат ўлчами катта.

### Панелларнинг тугмалари

- **`details`** (Sikllar va shartlar): «Darsga qo'shilish» (`.s-btn--disabled`, `lock`, фон `--c-line-2` `#F0F0F0`, матн `--c-text-3` `#B4B4B4`) · «Yopish» (`.s-btn--ghost`)
- **`join`** (Sikllar va shartlar): «Darsga qo'shilish» (фаол, `arrow_right`)
- **`no-link`** (Havola hali tayyor emas): «Tushunarli» (`.s-btn--ghost`)

## 6. Расмлар ва иконкалар

| Ном | Файл | Қаерда | Ўлчам |
|---|---|---|---|
| Робот (кутиш) | `app-assets/images/robot.png` (440×440) | `upcoming`, `upcoming-today` — **юқори ўнг**, сарлавҳа ёнида | 46×46 |
| Робот (қўлини чўзган) | `app-assets/images/robot2.png` (512×427) | `join-open` — «киринг», пастки ўнг | 64×53 (contain) |
| Робот (бош бармоқ) | `app-assets/images/robot7.png` (700×528) | `ended`, пастки ўнг | 64×48 |
| Робот (хафа) | `app-assets/images/robot4.png` (512×554) | `error`, қатор ичида | 44×44 |
| `hourglass.svg` | `app-assets/icons/` | фақат «tayyorlanmoqda» / «yangilanmoqda» чиплари (mask, силуэт); саноқ чипи билан бирга бу ердан кетди | 14 |
| `check_correct.svg` | `app-assets/icons/` | «Kirish ochiq» чипи, `--c-green-2` | 14 |
| `time.svg` | `app-assets/icons/` | карточкада: жонли изоҳ (`--c-red`); панелда: «Darsga qadar qolgan vaqt» ва кириш вақти изоҳи (slate) | 12 / панелда 13 |
| `user.svg` | `app-assets/icons/` | изоҳ: ментор | 12 |
| `circle.svg` | `app-assets/icons/` | изоҳ: маълумот белгиси (иловада `info` иконкаси йўқ) | 12 |
| `lock.svg` | `app-assets/icons/` | ўчирилган тугма, `--c-text-3`; панелда 18 | 16 |
| `arrow_right.svg` | `app-assets/icons/` | фаол тугма, оқ | 16 |
| Жонли нуқта | CSS `.wb-dot` (Flutter: `Container` доира) | `live` (оқ), `live-no-link` (қизил) | 8 |

Таймер катакларида иконка йўқ — фақат рақам ва ёрлиқ. Ишлатилмайди: веб `robo-webinar.png`, `clock.svg`, `calendar.svg`, `chevron-right.svg`, `info.svg`; эмодзи `🔓` ва `🔴` олиб ташланди (маъноси аниқланмаган; жонли учун нуқта элемент). `check.svg`/`succes.svg` маска сифатида тўлиқ доира бўлиб қолади — ишлатилмасин.

## 7. Flutter учун изоҳлар

- **Виджет дарахти:** `Material(color: tokens.card, borderRadius: 18, elevation 0 + BoxShadow)` → `InkWell(onTap: openSheet)` → `Padding(12)` → `Column(spacing 8)`: `_Head`, `Expanded(_Body)`, `_Foot`. `_Head` — таймерли ҳолатларда `Padding(right: 52)` ичидаги `Column[Text title, Text sub]` (чипсиз, `Row` шарт эмас), чипли ҳолатларда `Row(crossAxisAlignment.start)`: `Column` + `Spacer` + `_Chip`. Робот — `Stack` ичида `Positioned(right: 8, top: 8, child: Image.asset(width: 46, height: 46))` (таймерли) ёки `Positioned(right: 8, bottom: 8, … 64)` (қолганлари), `IgnorePointer`.
- **Токенлар** `ThemeExtension<JuniorTokens>`: ранглар (`brand #FF4F28`, `brandSoft #FFEDE7`, `blue #1CB0F6`, `blueSoft #E8F6FE`, `green2 #58CC02`, `greenSoft #ECFFDE`, `red #ED0000`, `pinkSoft #FFE4EA`, `row #F8F8FC`, `line2 #F0F0F0`, `text2 #999999`, `text3 #B4B4B4`, `slate #93A2C0`), радиуслар (`card 18`, `inner 12`, `btn 12`, `pill`), `TextStyle` лар (`title 15/600 h18`, `body 13/500 h16`, `small 12/500 h15`, `tiny 11/500 h14`, `btn 13/600 h16`) — оила `SFpro` (`pubspec` да учта оғирлик).
- **Таймер:** алоҳида қайта ишлатиладиган `JuniorCountdown` виджети (вебинар, booking ва extra да бир хил) — `GridView`/`Row` эмас, `Row(children: 4 × Expanded(...), spacing 6)`. Рақам `FontFeature.tabularFigures()` **мажбурий** — акс ҳолда ҳар сонияда кенглик сакрайди. Тўлиқ контракт (кириш параметрлари, ноль ҳолати, ёрлиқ локализацияси, `--soon` чегараси) — `spec/taymer.md`; бу ерда фақат ўлчам: карточкада катак 65.5×45 (рақам 20/23, ёрлиқ 9/11), панелда 83.5×62 (рақам 24/28, ёрлиқ 11/14).
- **Чип:** `Container(height: 22, padding: EdgeInsets.symmetric(horizontal: 8), decoration: BoxDecoration(color, borderRadius: StadiumBorder))` + `Row[SvgPicture.asset(icon, width: 14, colorFilter), SizedBox(4), Text]`. Жонли нуқта: `AnimatedOpacity`/`AnimationController` 1.2 с, `live` да оқ, `live-no-link` да қизил, пульссиз.
- **Мавзу:** `Text.rich(TextSpan[bold title, muted ' · course'])`, `maxLines: 2`, `overflow: ellipsis`; пастки роботли ҳолатларда изоҳ `Padding(right: 72)`.
- **Изоҳ:** `Row[SvgPicture 12, SizedBox(4), Expanded(Text tiny, maxLines 1, ellipsis)]`, `Column` ичида `MainAxisAlignment.end` (карточкадаги `margin-top:auto`).
- **Тугмалар:** `FilledButton` (`minimumSize: Size(0, 36)`, `tapTargetSize: padded`, `shape: RoundedRectangleBorder(12)`), ўчирилган кўриниш — `style` орқали (`line2` фон, `text3` матн), лекин `onPressed` бор (панел). Fit варианти (`join-open`) `Align(alignment: centerLeft)` ичида; қолган ҳамма ҳолатда `SizedBox(width: double.infinity)`.
- **Динамик қисмлар:** сарлавҳа (`Keyingi vebinar` / `Vebinar`), сатр матни ва ранги (кўк/яшил/кулранг), **тана слоти** (таймер ёки мавзу + изоҳ), чип (бор/йўқ, матн, ранг, иконка, нуқта), тугма (фаол/ўчирилган, иконка, fit/тўлиқ), робот (йўқ / 46 тепада / 64 пастда, қайси расм). Ҳаммаси `WebinarCardState` enum (10 қиймат) + `WebinarEvent` моделидан ҳисобланади; фаза `getEventPhase` нинг Dart нусхаси, сервер вақти офсети билан.
- **Соат:** таймерли ҳолатларда `Timer.periodic(1 s)` (фақат карточка экранда кўринганда — `VisibilityDetector`/`TickerMode`), чипли ҳолатларда `Timer.periodic(1 min)`; иккаласида ҳам фаза чегараларига аниқ `Timer` (кириш очилиши ва бошланиш вақтига). Фон/резюмда таймер қайта ҳисобланади — санаб турилмайди. Скрин ридер: таймер `Semantics(label: 'Boshlanishiga 2 kun 4 soat qoldi', liveRegion: false)` — ҳар сонияда ўқилмасин, `ExcludeSemantics` ичидаги рақамлар билан.
- **Матн масштаби:** `MediaQuery.withClampedTextScaling(maxScaleFactor: 1.3)` карточка ичида; сарлавҳа 1 қатор `ellipsis`; таймер ёрлиқлари 1 қатор, катта масштабда ҳам катак кенглиги ўзгармайди (`FittedBox(fit: scaleDown)`).
- **Юкланиш/хато:** `shimmer` пакети ёки `AnimatedContainer` градиент; `error` да `Qayta urinish` → `ref.refresh(bookingsProvider)`. Маълумот бор бўлса хатода эски карточка қолади, тепада `pull-to-refresh`.
- **Локализация:** `uz-UZ` / `ru-RU` калитлари янги (`home.webinar.*`), веб `home_dashboard.*` калитлари иловада йўқ. Таймер ёрлиқлари алоҳида умумий калитлар (`common.timer.*`, `spec/taymer.md`) — вебинарга боғланмасин. RU да `intl` `plural` фақат панел сарлавҳасидаги `· 2 kun qoldi` матнида керак.
