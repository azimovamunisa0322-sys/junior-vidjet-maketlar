# RecommendationWidget — `recommendation`

Макет: `design/cards/recommendation.html` (5 ҳолат). Веб манба: `widgets/EngagementWidgets.jsx` L130–178, харита `WIDGET-MAP.md` 4.7.

## 1. Вазифаси

Бэкенд тавсия қилган битта курсни кўрсатади ва талабани унга бир босишда олиб киради: эгалик бўлмаган курс учун «promo» (`Boshlash`), бошланган курс учун «давом этиш» (`Davom etish`, прогресс). Карточкада фақат курс эскизи, номи, ҳолати ва битта тугма; веб'даги пушти изоҳ ва бэкенд `message` пастки варақда.

## 2. Анатомия

Карточка `344×192 pt`, падинг `12`, ички қути `320×168`, радиус `--r-card` 18, фон `--c-card` `#FFFFFF`, соя `--shadow-card`. Тик оралиқ блоклар орасида `--s-2` 8 pt.

| Элемент | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|
| `.wcard__head` | баландлик 22 (чип бўйича) | — | — | чапда сарлавҳа, ўнгда чип; `align-items: flex-start` |
| `.wcard__title` «Tavsiya etilgan kurs» | 1 қатор, ≤ 22 белги | 15/600, line-height 18 | `--c-text` `#000000` | ўзгармас карточка номи; бэкенд `title` келса ва ≤ 22 белги бўлса алмаштиради (қ. 3-бўлим изоҳи) |
| `.wcard__chip` ҳолат чипи | баландлик 22, падинг 0 8, пилл | 12/600 | `not-started`: фон `--c-row` `#F8F8FC`, матн `--c-text-2` `#999999` (slate = ноактив); `in-progress`: `--chip--brand` фон `--c-brand-soft` `#FFEDE7`, матн `--c-brand` `#FF4F28` | матн: `Boshlanmagan` ёки фоиз `45%` |
| `.wcard__body` | флекс устун, `gap` 6, макс. 52 | — | — | `.rc-row` (40) + прогресс (6) = 52 |
| `.rc-row` | баландлик 40, `gap` 10 | — | — | эскиз + матн устуни |
| `.rc-thumb` курс эскизи | `70×40`, радиус 8, `object-fit: cover` | — | заҳира фон `--c-row` | курс рўйхатидаги (`Kurslar`) айнан шу баннер, нисбат ≈ 216:123 |
| `.rc-thumb--empty` заҳира эскиз | `70×40`, радиус 8 | — | фон `--c-brand-soft` `#FFEDE7`, иконка `book.svg` 20×20 `--c-brand` | баннер URL йўқ ёки юкланмади |
| `.rc-name` курс номи (`.wcard__num`) | 1 қатор, устун кенглиги 240 pt, `…` | 20/600, line-height 24, letter-spacing −0.3 | `--c-text` | ≈ 18–20 лотин белги сиғади; тўлиқ ном варақда |
| `.rc-cap` ҳолат сатри (`.wcard__muted`) | 1 қатор, `…` | 12/500, line-height 15 | `--c-text-2` `#999999` | `Sizga mos kurs` / `Davom etmoqda` |
| `.wcard__progress` | баландлик 6, радиус 3, тўлиқ кенглик 320 | — | трек `--c-line-2` `#F0F0F0`, тўлдириш `--c-brand` | фақат `in-progress`/`no-image`; кенглик = фоиз |
| `.wcard__foot` | баландлик 36, `gap` 8 | — | — | асосий тугма (`flex: 1`) + `i` тугма |
| `.wcard__btn` асосий тугма | баландлик 36, радиус 12, падинг 0 14 | 13/600 | фон `--c-brand`, матн `#FFFFFF` | матн + `arrow_right.svg` 16×16 оқ (маршрутга ўтиш шеврони) |
| `.wcard__ibtn` «i» тугма | `32×32`, радиус 10 | «i» 14/600 | фон `--c-row`, ҳарф `--c-slate` `#93A2C0` | босиш зонаси ≥ 44 pt (Flutter'да падинг билан) |
| `.wcard__btn--ghost.wcard__btn--fit` (хато) | баландлик 36, контент кенглиги | 13/600 | фон `--c-row`, матн `--c-text` | «Qayta urinish» |
| `.wcard__art` робот (хато) | `64×64`, ўнг-паст, 8 pt чекка | — | `robot4.png` | матн блокларига `padding-right: 72` |
| Скелет `.sk` | сарлавҳа 16×60 %, чип 84×22, эскиз 70×40, ном 20×65 %, сатр 12×40 %, тугма 36, `i` 32×32 | — | `#EEF0F3 → #F6F7F9` градиент, 1,2 с | асосий ҳолат тарҳини такрорлайди |

Баландлик ҳисоби (энг тўлиқ ҳолат `in-progress`): head 22 + 8 + body 52 + 8 + foot 36 = **126 ≤ 168**, бўш жой 42 pt. `not-started`: 22 + 8 + 40 + 8 + 36 = 114, бўш жой 54 pt. `error`: 18 + 8 + (16 + 6 + 15) + 8 + 36 = 107, бўш жой 61 pt. Қолган жой (ҳар ҳолатда, янги баландликдан келган +21 pt ҳам) `.wcard__body` га (`flex: 1`) тушади, футер пастга ёпишади.

Матн узунлиги (SF Pro файллари билан CoreText'да ўлчанган): сарлавҳа 15/600 = 132 pt (RU «Рекомендуемый курс» 156); чип «Boshlanmagan» = 98 pt («Не начат» 68) — иккаласи бирга 320 га сиғади. Курс номи 20/600 устунда 240 pt: «Web dasturlash» 138, «Matematika» 105, «Grafik dizayn» 116, «Blockly Dasturlash» 164, «Веб-разработка» 153 сиғади; «Графический дизайн» (198) сиғади, 30–50 белгили реал номлар `…` билан кесилади («Grafik dizayn va animatsiya asoslari» → «Grafik dizayn va animat…») — бу кутилган хатти-ҳаракат, тўлиқ ном варақда.

## 3. Ҳолатлар

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `not-started` **(асосий)** | `is_started !== true` ва `progress ≤ 0` (ёки NaN); шу жумладан синтетик курс `owned = false` | Slate чип, курс баннери, ном, ҳолат сатри, апельсин тугма + `i`. Прогресс йўқ | сарлавҳа `Tavsiya etilgan kurs`; чип `Boshlanmagan`; сатр `Sizga mos kurs`; тугма `Boshlash` | `Рекомендуемый курс`; `Не начат`; `Подходящий курс для вас`; `Начать` |
| `in-progress` | `is_started === true` ёки `progress > 0`; фоиз = `min(99, max(0, round(progress)))` (веб паритети) | Бренд чип фоиз билан, баннер, ном, сатр, прогресс чизиғи (кенглик = фоиз), тугма + `i` | чип `45%`; сатр `Davom etmoqda`; тугма `Davom etish` | `45%`; `В процессе`; `Продолжить` |
| `no-image` | Баннер URL йўқ (`getLocalizedCourseBanner` бўш) ёки `Image` `onError`; `in-progress` ва `not-started` иккаласида ҳам бўлиши мумкин — макетда `in-progress` варианти | Эскиз ўрнида `--c-brand-soft` қути + `book.svg`; қолгани ҳолатга мос. Макетда узун ном `…` билан кесилиши ҳам кўрсатилган | чип `12%`; ном `Grafik dizayn va animatsiya asoslari` → `Grafik dizayn va animat…`; сатр `Davom etmoqda`; тугма `Davom etish` | `12%`; `Графический дизайн и основы анимации` → `Графический дизайн…`; `В процессе`; `Продолжить` |
| `loading` | Биринчи сўров кетаётганда (веб'да карточка умуман йўқ эди) | Скелет: сарлавҳа, чип, эскиз, икки сатр, тугма, `i` | — | — |
| `error` | Сўров хато берди ва кэшда маълумот йўқ (веб'да карточка йўқолар эди ёки эски маълумот билан қоларди) | Сарлавҳа, қизил `x.svg` + «Yuklab bo'lmadi», сабаб сатри, `robot4` ўнг-пастда, ghost «Qayta urinish» | `Yuklab bo'lmadi`; `Internet aloqasini tekshiring`; `Qayta urinish` | `Не удалось загрузить`; `Проверьте подключение`; `Повторить попытку` |

- **Бэкенд `title`** — ≤ 22 белги бўлса `.wcard__title` ўрнига чиқади, узун бўлса карточкада `Tavsiya etilgan kurs` қолади, `title` варақ сарлавҳасига тушади.
- **Бэкенд `message`** — карточкада кўринмайди (жой йўқ, веб'даги пушти изоҳ иловада «хато» рангини беради), фақат варақда. `message` бўлмаса варақда ҳолатга мос стандарт матн.
- **Ном заҳираси** — локал ном бўш → `courseName` → `Sizning kursingiz` (`your_course` муқобили).
- **`course.id` йўқ / 0 / сатр** — веб каталогга (`/courses`) ўтади; мобилда тугма `Kurslarni ko'rish` (17 белги) бўлади ёки карточка яширилади — маҳсулот қарори (қ. очиқ саволлар).
- **Тугалланган курс** (`progress ≥ 99.5`) — веб `99%` кўрсатади, «тугалланган» ҳолати йўқ; мобилда ҳам паритет: `99%` + `Davom etish`. Яшил `Tugallangan` чипи керак бўлса маҳсулот тасдиқлайди.
- **Синтетик курс, `owned = true`** — веб `1%` беради; мобилда `in-progress` `1%` билан чизилади (паритет), лекин бу маълумот сифати муаммоси.
- **Тил ўзгарди** — ном ва баннер қайта локаллашади; баннер қайта юкланаётганда `rc-thumb` бўш `--c-row` фон (скелет эмас).
- **`show` falsy / токен йўқ** — карточка каруселда чиқмайди (веб билан бир хил).

## 4. Ҳаракатлар

| Элемент | Босиш зонаси | Ҳаракат | Нима очади |
|---|---|---|---|
| `.wcard__btn` `Boshlash` / `Davom etish` | 36 pt баландлик, кенглиги 320 − 40; Flutter'да `minHeight: 44` ёки ота-контейнер падинги билан 44 | `Number(course.id)` truthy → курс кириш маршрути (веб `getCourseEntryPath` муқобили); акс ҳолда каталог | Илова ичидаги маршрут (`push`): курс саҳифаси (roadmap / кириш экрани) ёки `Kurslar` каталоги. Эгалик текширилмайди — веб паритети; paywall кераклиги очиқ савол |
| `.wcard__ibtn` «i» | визуал 32×32, босиш ≥ 44×44 (`padding: 6`) | Тафсилот варағини очади | Пастки варақ (5-бўлим) |
| `Qayta urinish` (ghost, `error`) | 36 pt, ≥ 44 билан | Сўровни қайта юборади → `loading` → натижа | Тугма босилганда унинг ўрнида 1 та кичик `CircularProgressIndicator` (ёки бутун карточка `loading`) |
| Карточка танаси, эскиз, ном, чип | — | **Ҳандлер йўқ** — карусель суриш билан тўқнашмаслик учун фақат тугмалар босилади | — |
| Автоматик янгиланиш | — | Экран монтажида, `AppLifecycleState.resumed` да ва pull-to-refresh да; ҳар фокусда эмас (карусель саҳифа сони ўзгармаслиги учун). Сессия давомида карточка олиб ташланмайди: хатода `error`, `show` false бўлганда охирги маълумот сақланади | — |

Toast йўқ: барча натижалар ё маршрут, ё варақ, ё карточка ҳолати.

## 5. Пастки панеллар

Жами 5 та панел. Уч тури бор: **пастки панел** (пастдан чиқади), **тўлиқ экран** (календарь, вақт танлаш), **огоҳлантириш** (бир абзац матн ва тугма). Ёпиш: орқа фонга босиш, ✕ тугмаси ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Асосий тугма |
|---|---|---|---|---|
| `details` | пастки панел | карточка: `not-started` | маълумот қаторлари, рўйхат, рангли изоҳ | Boshlash |
| `progress` | пастки панел | карточка: `in-progress` | маълумот қаторлари, рангли изоҳ | Davom etish |
| `no-image` | пастки панел | карточка: `no-image` | маълумот қаторлари, рангли изоҳ | Davom etish |
| `no-course` | пастки панел | **фақат кўриб чиқиш рўйхатидан** | рангли изоҳ | Kurslarni ko'rish |
| `error` | огоҳлантириш | карточка: `error` | матн | Qayta urinish |

### Панелларнинг тугмалари

- **`details`** (Web dasturlash): «Boshlash» · «Mos kurslarni ko'rish»
- **`progress`** (Matematika): «Davom etish» · «Mos kurslarni ko'rish»
- **`no-image`** (Grafik dizayn va animatsiya asoslari): «Davom etish» · «Mos kurslarni ko'rish»
- **`no-course`** (Sizning kursingiz): «Kurslarni ko'rish» · «Yopish»
- **`error`** (Tavsiyani yuklab bo'lmadi): «Qayta urinish» · «Kurslarni ko'rish»

## 6. Расмлар ва иконкалар

| Нима | Файл | Ўлчам / ранг | Қаерда |
|---|---|---|---|
| Курс эскизи (намуна) | `app-assets/images/web_course.png`, `math_course.png` | 70×40 `cover`, радиус 8 | реал иловада `getLocalizedCourseBanner` — `Kurslar` рўйхатидаги баннер, локал `uz-UZ → uz`, `ru-RU → ru` мослаштирилади |
| Заҳира эскиз иконкаси | `app-assets/icons/book.svg` | 20×20, `--c-brand`, фон `--c-brand-soft` | `no-image`; lucide `Map` ишлатилмайди |
| Тугма шеврони | `app-assets/icons/arrow_right.svg` | 16×16, оқ (mask) | `Boshlash`, `Davom etish` — маршрутга ўтиш белгиси (веб `chevron-right` паритети) |
| «i» | матн ҳарфи, иконка йўқ | 14/600, `--c-slate` | `.wcard__ibtn`; иловада `info` иконкаси йўқ |
| Хато иконкаси | `app-assets/icons/x.svg` | 16×16, `--c-red` `#ED0000` | `error` |
| Робот | `app-assets/images/robot4.png` (хафа) | 64×64, ўнг-паст | фақат `error`; бошқа ҳолатларда робот йўқ — эскиз билан икки расм кўп |
| Прогресс | CSS/`LinearProgressIndicator` | 6 pt, `--c-line-2` / `--c-brand` | `in-progress`, `no-image` |

Веб'даги `robo-*.png`, lucide `Map`, `chevron-right.svg` керак эмас.

## 7. Flutter учун изоҳлар

- **Карточка:** `Container`/`DecoratedBox` (`BoxDecoration`: `color: tokens.card`, `borderRadius: 18`, `boxShadow: tokens.cardShadow`), `Padding(12)`, `Column` (`crossAxisAlignment: stretch`) → `head` `Row(spaceBetween, crossAxisAlignment: start)`, `Expanded(body)`, `foot` `Row`. Ўлчам каруселдан (`PageView` `viewportFraction` ≈ 0.88 — 344 / 390, ёки `SizedBox(344×192)`), ҳамма карточка бир баландликда.
- **Токенлар:** `ThemeExtension<JuniorTokens>` — `card`, `row`, `line2`, `text`, `text2`, `slate`, `brand`, `brandSoft`, `red`, радиуслар `rCard 18 / rInner 12 / rBtn 12`, `TextStyle` лар `title 15w600/18`, `num 20w600/24`, `small 12w500/15`, `btn 13w600/16`; шрифт `SFpro` 400/500/600 (`pubspec` да мавжуд).
- **Эскиз:** `ClipRRect(8)` + `SizedBox(70×40)` + `Image.network(banner, fit: BoxFit.cover, errorBuilder: → заҳира, loadingBuilder: → --c-row бўш қути)`; `CachedNetworkImage` бўлса `errorWidget`/`placeholder`. Заҳира: `Container(color: brandSoft, child: SvgPicture.asset('book.svg', colorFilter: brand, 20))`.
- **Ном:** `Text(name, style: num, maxLines: 1, overflow: TextOverflow.ellipsis, softWrap: false)` ичида `Expanded` (`min-width: 0` муқобили). Сатр: `Text(style: small, color: text2, maxLines: 1, ellipsis)`.
- **Чип:** `Container(height: 22, padding: h8, decoration: pill)` + `Text(12w600)`; ранг ҳолатдан (`started ? brand : slate`).
- **Прогресс:** `ClipRRect(3)` + `LinearProgressIndicator(minHeight: 6, value: progress / 100, backgroundColor: line2, color: brand)`; анимация керак эмас (`value` статик).
- **Тугмалар:** `FilledButton.icon` муқобили — `SizedBox(height: 36)` + `FilledButton(style: shape 12, padding h14)` + `Row([Text, SvgPicture arrow_right 16 white])`; «i» — `SizedBox(44×44)` ичида `Center(Container 32×32)` (босиш зонаси 44, визуал 32). Ghost: `FilledButton.tonal` ёки `Container(color: row)`.
- **Скелет:** `shimmer` пакети ёки `AnimatedContainer` градиент; шакллар 2-бўлимдаги ўлчамларда; `Semantics(label: 'Yuklanmoqda')`.
- **Динамик маълумот:** `courseName` (локал), `bannerUrl` (локал), `progress` (0–99 кламп), `started` (`is_started == true || progress > 0`), `courseId` (маршрут танлови), бэкенд `title`/`message` (варақ). Статик: карточка сарлавҳаси, тугма матнлари, ранглар.
- **Ҳолат машинаси:** `loading → data(notStarted | inProgress) | error`; `noImage` — маълумот ҳолати ичидаги расм флаги, алоҳида ҳолат эмас. `show == false` да виджет рўйхатдан чиқади, лекин сессия давомида қайта ҳисобламаслик (карусель силжимасин).
- **Тил:** `uz-UZ` / `ru-RU`; матнлар `home_dashboard.recommendation.*` калитлари билан илова луғатига қўшилади (веб калитлари иловада йўқ). Мавжуд калитлар қайта ишлатилади: `Boshlash`, `Davom etish`, `Qayta urinish`, `Mos kurslarni ko'rish`.
- **Матн масштаби:** `MediaQuery.textScaler` ≤ 1.2 га клампланади (`TextScaler.clamp(maxScaleFactor: 1.2)`) — 20 pt ном ва 22 pt чип бошқача сиғмайди.
