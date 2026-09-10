# StreakWidget — мобил карточка специ (`streak`)

Манба: `WIDGET-MAP.md` §4.5, `APP-STYLE.md`, `design/css/tokens.css`, `design/css/card-base.css`. Макет: `design/cards/streak.html` (8 ҳолат, асосийси `normal`).

## 1. Вазифаси

Талабанинг кунлик фаоллик стрикини кўрсатади: жорий кун сони, охирги 7 куннинг олов/муз қатори ва freeze (музлатиш) баланси, бугун ҳали олов олинмаган бўлса — огоҳлантириш ва «Olovni oling» чақируви. Статистика, ойлик календарь, freeze қоидалари ва `MonthlyChallenge` карточкада эмас, пастки варақда.

## 2. Анатомия

Карточка `304×178 pt`, padding `12`, ички қути `280×154`, радиус `--r-card` 18, фон `--c-card` `#FFFFFF`, соя `--shadow-card`. Блоклар орасидаги вертикал оралиқ `--s-2` 8 pt. Тана (`.wcard__body`) қолган жойни олади, мазмуни вертикал марказда.

| Элемент | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|
| `.wcard__title` — `Streak` | 18 pt баландлик | 15/600 (`--t-title`) | `--c-text` `#000000` | Ҳамма ҳолатда бир хил |
| `.wcard__sub` — ҳолат сатри | 15 pt, юқоридан 2 pt | 12/500 (`--t-small`) | одатда `--c-text-2` `#999999`; `--brand` `#FF4F28` (хавф), `--blue` `#1CB0F6` (freeze), `--green` `#58CC02` (рекорд), `--red` `#ED0000` (нолланди) | ≤ 30 белги, бир қатор |
| `.wcard__chip` — сон / вақт | баландлик 22, padding 0 8, pill | 12/600 | `--brand`: фон `--c-brand-soft` `#FFEDE7`, матн `--c-brand`; `--green`: `--c-green-soft` `#ECFFDE` / `--c-green-2`; `--pink`: `--c-pink-soft` `#FFE4EA` / `--c-red` | Ичида расм 14 pt (`small_fire.png`) ёки иконка 14 pt (`time.svg`, қизил), оралиқ 4 |
| `.wcard__ibtn` — «i» | 32×32, радиус 10 | «i» italic 600 14 | фон `--c-row` `#F8F8FC`, ҳарф `--c-slate` `#93A2C0` | Чип ўрнида, `lost` ва `new-user` да; босиш зонаси 44×44 |
| `.wk` — ҳафта қатори | 280×44 | — | — | 7 устун × 39 pt, `space-between` — қолган 7 pt олти оралиққа тарқалади (≈ 1,2 pt) |
| `.d__c` — кун доираси | 28×28, чегара 2 pt | — | фон: нофаол `--c-row` `#F8F8FC`; фаол `--c-brand-soft` `#FFEDE7`; музлатилган `--c-blue-soft` `#E8F6FE`; келгуси — шаффоф, 1,5 pt пунктир `--c-line` `#DDE1EB` | Ичида расм: олов 18 pt (`small_fire.png`), кулранг олов 16 pt (`small_fire_inactive.png`), муз 16 pt (`streak_freeze.png`) |
| Бугун ҳалқаси | доира чегараси 2 pt | — | `--c-brand`; музлатилган бугун — `--c-blue` | Фақат `today` кунда, доира ўлчамини ўзгартирмайди |
| `.d__l` — ҳафта куни | 14 pt, доирадан 2 pt пастда | 11/500 (`--t-tiny`) | `--c-text-2`; бугун — `--c-brand` 600 (муз бўлса `--c-blue`) | Илованинг ўз 2-ҳарфли жадвали: `Du Se Ch Pa Ju Sh Ya` |
| Боғловчи | 39×2 pt, y = 13 | — | `--c-brand` | Олдинги доира марказидан шу доира марказигача, доиралар **орқасида** (учлари кўринмайди, кўринадиган қисми ≈ 11 pt). Кетма-кет фаол/музлатилган кунлар орасида; музлатилган кун узмайди |
| `.wcard__note--brand` (`new-user`) | 46 pt (2 қатор), padding 8 10, радиус 12, тананинг юқорисига ёпишган | 12/500 | фон `--c-brand-soft`, матн `--c-text` | ≤ 2 қатор, ≈ 70 белги; робот бошидан ≥ 11 pt юқорида тугайди |
| `.wcard__btn` — асосий тугма | баландлик 36, радиус 12, padding 0 14, қолган кенглик | 13/600 (`--t-btn`) | фон `--c-brand`, матн `#FFFFFF`; `--ghost` (`error`): фон `--c-row`, матн `--c-text` | Матн ≤ 18 белги, бир қатор |
| `.frz` — freeze баланси (`--ghost --fit`) | 36 pt баландлик, кенглик ≈ 52, padding 0 12 | 13/600 | фон `--c-row`, матн `--c-text`; баланс 0 — матн `--c-text-3` `#B4B4B4` | Расм 16 pt `streak_freeze.png` (0 да `inactive_freeze.png`) + сон, оралиқ 4; асосий тугмадан 8 pt ўнгда |
| `.err__ic` (`error`) | 32×32 доира | — | фон `--c-pink-soft`, `x.svg` 16 pt `--c-red` | Матн блоки: 13/500 «Yuklab bo'lmadi» + 12/500 `--c-text-2` «Internetni tekshiring» |
| `.wcard__art` робот (`new-user`) | 64×64, ўнг-паст, 8 pt чекка | — | `robot2.png` | Пастки қаторга `padding-right: 72` — тугма робот тагига кирмайди |
| Скелет | асосий ҳолат нусхаси | — | `#EEF0F3 → #F6F7F9` градиент, 1,2 с | Сарлавҳа 58×16, сатр 112×12, чип 66×22, 7 доира 28 + белги 16×10, тугма 36 + 52×36 |

Баландлик ҳисоби (ички 154 pt): `normal / record / today-pending / frozen-today / lost / loading` = 35 (сарлавҳа + сатр) + 8 + 44 (қатор) + 8 + 36 = **131**, қолган **23 pt** — тананинг (`.wcard__body`, `flex: 1`) бўш жойи, қатор шунинг ичида вертикал марказда; `new-user` = 35 + 8 + 46 (изоҳ) + 8 + 36 = **133**, қолган **21 pt** изоҳнинг остида (тана `--top`); `error` = 18 + 8 + 32 + 8 + 36 = **102**, қолган **52 pt** тананинг бўш жойи. Карточка 7 pt баландлашгани тўлиғича шу бўш жойга тушди (16 → 23, 14 → 21, 45 → 52); сарлавҳа + сатр бўлган ҳолатларда тана баландлиги 60 → 67. Ҳеч бир ҳолатда скролл ва кесилиш йўқ.

## 3. Ҳолатлар

Кун қатори — **бугун билан тугайдиган охирги 7 кун** (веб `slice(0,7)` энг эски еттитани олади, бу хато; §7 га қаранг). Макетда бугун = сешанба, 8 сентябр 2026, устунлар `Ch Pa Ju Sh Ya Du Se`.

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `normal` (асосий) | `current_streak > 0`, бугунги кун `active`, freeze баланси ≥ 1 | Сатр кулранг (эng яхши); чип `--brand` олов + сон; қаторда фаол кунлар боғловчи билан, бугун ҳалқада; «Kalendar» + freeze `2` | `Streak` · `Eng yaxshi: 30 kun` · `12 kun` · `Kalendar` · `2` | `Стрик` · `Лучший: 30 дней` · `12 дней` · `Календарь` · `2` |
| `record` | `current_streak ≥ longest_streak > 0` ва бугун `active` | `normal` билан бир хил, лекин сатр ва чип яшил | `Yangi rekord!` · `31 kun` · `Kalendar` | `Новый рекорд!` · `31 день` · `Календарь` |
| `today-pending` | `current_streak > 0`, бугун `today && !active && !frozen` | Сатр апельсин «xavf ostida»; чип `--pink` соат + қолган вақт (Тошкент ярим тунигача); бугунги доира кулранг олов + апельсин ҳалқа, чап боғловчи йўқ; асосий тугма дарсга олиб боради | `5 kun xavf ostida` · `3 soat qoldi` · `Olovni oling` · `2` | `5 дней под угрозой` · `Осталось 3 ч` · `Получи огонёк` · `2` |
| `frozen-today` | бугун `frozen` (баланс камайган) | Сатр кўк; чип `--brand` сон сақланади; бугунги доира муз, кўк ҳалқа ва кўк белги, боғловчи узилмайди; freeze тугмасида камайган сон | `Bugun freeze ishlatildi` · `12 kun` · `Kalendar` · `1` | `Заморозка использована` · `12 дней` · `Календарь` · `1` |
| `lost` | `current_streak = 0`, `longest_streak > 0` (аввал стрик бўлган) | Сатр қизил + рекорд; чип ўрнида «i»; қаторда фаол/муз кунлар ва узилишдан кейинги кулранг кунлар, бугун ҳалқада; асосий тугма қайта бошлайди; freeze `0` кулранг | `Streak nollandi · rekord 30 kun` · `Qaytadan boshlash` · `0` | `Стрик обнулён · рекорд 30 дней` · `Начать заново` · `0` |
| `new-user` | `current_streak = 0`, `longest_streak = 0`, `days = []` | Қатор йўқ: апельсин изоҳ + `robot2`; «i» тугмаси; асосий тугма биринчи дарсга | `Hali streak yo'q` · `Har kuni dars bajaring — streak olovi yonadi va rekordingiz o'sadi.` · `Boshlash` | `Стрика пока нет` · `Занимайтесь каждый день — огонёк стрика загорится, а рекорд будет расти.` · `Начать` |
| `loading` | `streaks` сўрови биринчи марта кутилмоқда | Асосий ҳолат скелети (сарлавҳа, сатр, чип, 7 доира, 2 тугма), 1,2 с shimmer | — | — |
| `error` | Сўров хато берди ва кэш йўқ | Пушти доирада `x`, икки сатр матн, ghost тугма | `Yuklab bo'lmadi` · `Internetni tekshiring` · `Qayta urinish` | `Не удалось загрузить` · `Проверьте интернет` · `Повторить` |

Веб'даги қуйидаги фарқлар мобилда алоҳида ҳолат **эмас**, кун доирасининг варианти: фаол (`active`), нофаол ўтган (`!active`), музлатилган (`frozen`), бугун (ҳалқа), келгуси (пунктир — фақат API Mon–Sun ойна қайтарса). Freeze баланси 0 / 1 / 2 / 2+ — тугмадаги сон (2 дан катта сон ҳам кўринади, веб'да кўринмасди). `longest_streak` фарқлари — фақат сатрдаги сон. `days` 7 дан кам бўлса қатор чапдан пунктир бўш доиралар билан тўлдирилади (белги сақланади).

RU сонлар: `1 день / 2–4 дня / 5+ дней` — Flutter `intl` plural билан; веб `{days}` интерполяцияси кўплик қоидасини бузади.

## 4. Ҳаракатлар

Ҳамма босиладиган элемент учун сенсор зонаси ≥ 44×44 pt (кўринадиган ўлчам кичикроқ бўлса, шаффоф padding билан).

| Элемент | Кўринадиган ўлчам | Ҳаракат | Нима очади |
|---|---|---|---|
| `Kalendar` (`normal`, `record`, `frozen-today`) | ≈ 220×36 | tap | Стрик календари — **тўлиқ экранли варақ** (§5 A) |
| `Olovni oling` (`today-pending`) | ≈ 220×36 | tap | Route: талабанинг жорий дарси (илова «Keyingi darsingiz» мантиғи); дарс йўқ бўлса «Mening kurslarim». Қайтганда `streaks` қайта сўралади |
| `Qaytadan boshlash` (`lost`) | ≈ 220×36 | tap | Ўша route — жорий дарс |
| `Boshlash` (`new-user`) | ≈ 208×36 | tap | Ўша route — биринчи дарс |
| Freeze тугмаси `2` / `1` / `0` | ≈ 52×36 | tap | Компакт варақ «Streak haqida» (§5 B), freeze бўлимига скролл |
| «i» (`lost`, `new-user`) | 32×32 (зона 44) | tap | Компакт варақ «Streak haqida» (§5 B) |
| Ҳафта қатори `.wk` | 280×44 (зона: тана бўйи 67) | tap | Стрик календари (§5 A) — қатор веб'дагидек «ўлик» эмас |
| Кун доираси (алоҳида) | — | long-press | Toast: `Dushanba, faol` / `Juma, freeze` / `Bugun — hali olov yo'q` (ихтиёрий; скрин ридер учун шу матн `semanticsLabel`) |
| `Qayta urinish` (`error`) | 280×36 | tap | `streaks` сўровини қайтаради, карточка `loading` га ўтади |
| Чип, сарлавҳа, сатр | — | йўқ | Ҳандлер йўқ, семантикада матн сифатида ўқилади |

Ўчирилган тугма йўқ: ҳар ҳолатда битта ижро этиладиган ҳаракат бор. Модалларнинг ёпилиши — Android back, свайп-паст, ёпиш тугмаси.

## 5. Пастки панеллар

Жами 7 та панел. Уч тури бор: **пастки панел** (пастдан чиқади), **тўлиқ экран** (календарь, вақт танлаш), **огоҳлантириш** (бир абзац матн ва тугма). Ёпиш: орқа фонга босиш, ✕ тугмаси ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Асосий тугма |
|---|---|---|---|---|
| `calendar` | тўлиқ экран | карточка: `normal`, `record`, `frozen-today` | маълумот қаторлари, рўйхат, легенда, робот расми | Streak qoidalari |
| `about` | пастки панел | карточка: `normal`, `record`, `today-pending`, `frozen-today`, `lost`, `new-user`; панел: `calendar`, `restart`, `start`, `no-freeze` | рўйхат, рангли изоҳ | Tushunarli |
| `today` | пастки панел | карточка: `today-pending` | рўйхат, рангли изоҳ | Darsni boshlash |
| `restart` | пастки панел | карточка: `lost` | маълумот қаторлари, рўйхат, рангли изоҳ | Darsni boshlash |
| `start` | пастки панел | карточка: `new-user` | рўйхат, рангли изоҳ, робот расми | Birinchi darsni boshlash |
| `no-freeze` | огоҳлантириш | карточка: `lost` | матн | Streak qoidalari |
| `error` | огоҳлантириш | карточка: `error` | матн | Qayta urinish |

### Панелларнинг тугмалари

- **`calendar`** (Aktivlik streaki): «Streak qoidalari» · «Yopish»
- **`about`** (Streak nima?): «Tushunarli»
- **`today`** (Bugun olov hali yonmagan): «Darsni boshlash» · «Keyinroq»
- **`restart`** (Streak nolga tushdi): «Darsni boshlash» · «Streak qoidalari»
- **`start`** (Streak bugundan boshlanadi): «Birinchi darsni boshlash» · «Streak nima?»
- **`no-freeze`** (Muzlatish qolmadi): «Streak qoidalari» · «Tushunarli»
- **`error`** (Streak ma'lumoti kelmadi): «Qayta urinish» · «Keyinroq»

## 6. Расмлар ва иконкалар

| Файл | Қаерда | Ўлчам |
|---|---|---|
| `app-assets/images/small_fire.png` | чип (14), фаол кун доираси (18) | 512 манба, 2× да тоза |
| `app-assets/images/small_fire_inactive.png` | нофаол кун доираси (16) | манба 30×30 — 2× экранда 16 pt учун етарли, 3× да юмшоқ; вектор варианти сўралади |
| `app-assets/images/streak_freeze.png` | музлатилган кун (16), freeze тугмаси (16) | 108 манба |
| `app-assets/images/inactive_freeze.png` | freeze тугмаси, баланс 0 (16) | 108 манба |
| `app-assets/images/robot2.png` | `new-user`, ўнг-паст 64 | 512×427 |
| `app-assets/icons/time.svg` (mask, `--c-red`) | `today-pending` чипи | 14 |
| `app-assets/icons/x.svg` (mask, `--c-red`) | `error` | 16 |
| Матн «i» | `.wcard__ibtn` | иловада info иконкаси йўқ; слate чизиқли иконка чиздирилиши мумкин |
| Ишлатилмади | `strayk.png`, `strike.png`, Lottie `fire.json` — карточкага катта; варақ бош қисми учун. Веб `fire.webp`, `freeze.webp`, `info.svg` керак эмас | — |

## 7. Flutter учун изоҳлар

- **Виджет дарахти:** `Container` (304×178, `BoxDecoration` радиус 18, соя) → `Padding(12)` → `Column`: `Row` (сарлавҳа блоки `Column` + `Spacer` + чип / `IconButton`), `Expanded(Center(week row))`, `Row` (тугмалар). Чип — `Container` pill + `Row(Image 14, Text)`. Робот — `Stack` + `Positioned(right: 8, bottom: 8)`, тугмалар қаторига `padding.only(right: 72)`.
- **Ҳафта қатори:** `Row(mainAxisAlignment: spaceBetween)` ичида 7 × `SizedBox(width: 39)` — 280 pt кенгликда олти оралиқ ≈ 1,2 pt; боғловчилар алоҳида `CustomPaint` қатлами доиралар **остида** (`Stack`: паст — чизиқлар, юқори — доиралар), чизиқ `y = 13`, кенглик 2, ранг `brand`. Доира `Container(28, shape: circle, border: 2 шаффоф/brand/blue)`; расм `Image.asset` 18/16.
- **Токенлар:** `ThemeExtension<JuniorTokens>` — `card`, `row`, `line`, `text`, `text2`, `text3`, `slate`, `brand`, `brandSoft`, `blue`, `blueSoft`, `green2`, `greenSoft`, `red`, `pinkSoft`; радиуслар `rCard 18`, `rInner 12`, `rBtn 12`; `TextStyle` лар `title 15/600`, `body 13/500`, `small 12/500`, `tiny 11/500`, `btn 13/600`, оила `SFpro`.
- **Ҳолат машинаси:** `enum StreakCardState { loading, error, newUser, lost, todayPending, frozenToday, record, normal }` — маълумотдан ҳисобланади: `days.isEmpty && current == 0 && longest == 0 → newUser`; `current == 0 → lost`; `today.frozen → frozenToday`; `today != null && !today.active → todayPending`; `current >= longest → record`; акс ҳолда `normal`. `streak == {}` (бўш объект) → `newUser`, «нол билан чиқиш» эмас.
- **Динамик қийматлар:** `current_streak`, `longest_streak`, `freeze_balance`, `days` (охирги 7, бугун охирида; 7 дан кам бўлса чапдан `future`-услубли бўш доиралар), `hoursLeft` — Тошкент ярим тунигача (қаттиқ UTC+5, `DateTime.now().toUtc().add(5h)`); чип матни `N soat qoldi`, 1 соатдан кам бўлса `N daqiqa qoldi`. Таймер **дақиқада бир** (`Timer.periodic(1 min)`), веб'дагидек ҳар сонияда эмас; фақат `today-pending` да ишлайди.
- **Ҳафта куни белгилари:** `Intl` эмас, қаттиқ жадвал `const ['Du','Se','Ch','Pa','Ju','Sh','Ya']` (`DateTime.weekday - 1`). `date` парс қилинмаса (`DateTime.tryParse == null`) — устун ўрни бўйича белги, карточка қуламайди; виджет `ErrorWidget.builder` / try-catch билан ўралади, хатода `error` ҳолати.
- **Скелет:** `shimmer` пакети ёки `AnimatedContainer` градиент, 1,2 с; шакллар §2 жадвалида.
- **Сенсор:** тугмалар `minimumSize: Size(44, 36)` + `MaterialTapTargetSize.padded`; «i» `IconButton(constraints 44)`; қатор `GestureDetector(behavior: opaque)` бутун тана бўйида.
- **Варақлар:** календарь — `showModalBottomSheet(isScrollControlled: true, useSafeArea: true)` тўлиқ баландлик; «Streak haqida» — оддий `showModalBottomSheet` + `DraggableScrollableSheet`. Бир вақтда битта варақ (варақ хости навбати — умумий қоида, §5 WIDGET-MAP).
- **Семантика:** карточка `Semantics(label: 'Streak, 12 kun, eng yaxshi 30')`; ҳар кун `Semantics(label: 'Dushanba, faol')`; freeze тугмаси `'Freeze balansi: 2 tadan 1'`; чип `liveRegion` эмас (дақиқада ўзгаради).
- **Матн масштаби:** `MediaQuery.textScaler.clamp(maxScaleFactor: 1.2)` карточка ичида; сатр ва тугма матни `maxLines: 1, overflow: ellipsis`.
- **Янгилаш:** илова фокусга қайтганда (`AppLifecycleState.resumed`) ва дарсдан қайтганда `streaks` қайта сўралади; жавобгача эски маълумот (placeholder), скелет фақат биринчи юклашда.
