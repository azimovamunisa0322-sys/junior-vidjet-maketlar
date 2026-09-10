# MentorWidget — `mentor`

Манба: `WIDGET-MAP.md` 4.4, `APP-STYLE.md`, илованинг `ta_chat.*` сатрлари (`uz-UZ.json` / `ru-RU.json`). Макет: `design/cards/mentor.html` (7 ҳолат, асосийси `online`).

## 1. Вазифаси

Каруселдаги доимий «менторга савол» карточкаси: ўқувчи бир босишда илованинг тайёр AI чат экранига (`ta_chat`) ўтади, карточкада эса чатнинг қисқа ҳолатини кўради — ментор онлайнми, савол жавоб кутяптими, жавоб келдими. Веб'даги сузувчи боғланган панел, статик «online» ёрлиғи ва пушти изоҳ мобилда ташланади: чат алоҳида маршрут, ҳолат реал маълумотдан, ранг илова семантикасидан.

## 2. Анатомия

Карточка `.wcard`: 332×178 pt, падинг 12 → ички қути 308×154, радиус `--r-card` 18, фон `--c-card` `#FFFFFF`, соя `--shadow-card`. Тик оқим: сарлавҳа қатори → 8 → тана → 8 → пастки қатор (пастга ёпишган).

| Элемент | Класс | Ўлчам | Шрифт | Ранг |
|---|---|---|---|---|
| Карточка номи | `.wcard__title` | 1 қатор, 18 pt | 600 15/18 SF Pro | `--c-text` `#000000` |
| Кичик сатр | `.wcard__sub` | 1 қатор, 15 pt, устидан 2 pt | 500 12/15 | одатий `--c-text-2` `#999999`; `--brand` `#FF4F28`; `--blue` `#1CB0F6`; `--green` `#58CC02`; `--red` `#ED0000` |
| Статус чипи | `.wcard__chip` | баландлик 22, падинг 0 8, пилл, иконка 14 (ёки нуқта 8) + 4 оралиқ | 600 12/15 | `--green`: фон `#ECFFDE`, матн `#58CC02`; `--brand`: `#FFEDE7`/`#FF4F28`; `--blue`: `#E8F6FE`/`#1CB0F6`; `--pink`: `#FFE4EA`/`#ED0000`; одатий (оффлайн): `#F8F8FC`/`#999999` |
| Онлайн/оффлайн нуқтаси | `.m-dot` | 8×8, доира | — | `currentColor` (чип матни ранги) |
| Изоҳ блоки | `.wcard__note` | тўлиқ кенглик 308, падинг 8 10, радиус 12, ≤ 2 қатор (`line-clamp`), баландлик 31 / 46 | 500 12/15 | матн `--c-text`; фон одатий `--c-row` `#F8F8FC`; `--blue` `#E8F6FE`; `--green` `#ECFFDE`; `--pink` `#FFE4EA` |
| Асосий тугма | `.wcard__btn` | баландлик 36, радиус 12, падинг 0 14, кенглик 308 (робот бўлса 236) | 600 13/16 | фон `--c-brand` `#FF4F28`, матн `#FFFFFF` |
| Ўчирилган тугма | `.wcard__btn--disabled` | шу ўлчам | 600 13/16 | фон `--c-line-2` `#F0F0F0`, матн `--c-text-3` `#B4B4B4` |
| Иккиламчи тугма | `.wcard__btn--fit` | кенглиги матн бўйича (~116) | 600 13/16 | бренд апельсин (кейинги қадам) |
| Робот | `.wcard__art--bottom` | 64 pt (`robot2`) ёки 60 pt (`robot5`, `robot7`), ўнг-паст бурчакда, чеккадан 8 | — | — |
| Робот ёнидаги пастки қатор | `.m-clear` | `padding-right: 72` — тугма роботга тегмайди | — | — |

Баландлик бюджети (ҳар ҳолатда): сарлавҳа 18 + кичик сатр 17 = 35 → 8 → изоҳ ≤ 46 → 8 → тугма 36 = **133 ≤ 154**. Тана 67 pt жой олади (154 − 35 − 8 − 8 − 36 = 67; ўлчам катталашувидан келган қўшимча 7 pt айнан шу flex танага тушади), изоҳ 46 дан ошмайди (2 қаторли клэмп).

Робот геометрияси: `robot2` 64 pt қути y = 106…170, кўринадиган пикселлар y ≈ 111 дан (расм 512×427, вертикал марказланган); `robot5`/`robot7` 60 pt қути y = 110…170. Изоҳ y = 55…101 да тугайди (юқоридан ўсади, ўзгармади) → робот изоҳга тегмайди; тугма 236 pt кенгликда роботдан чапда.

## 3. Ҳолатлар

Устуворлик (бир вақтда бир нечта шарт бажарилса): `loading` → `locked` → `answered` → `pending` → `online` / `offline` / `ai-only`.

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `online` (асосий) | Бириктирилган ментор бор ва presence API `online` қайтаради; кутилаётган савол ва ўқилмаган жавоб йўқ | Кичик сатр — ментор исми (кулранг); чип яшил нуқта + «Onlayn»; изоҳ нейтрал фон (чат саломлашуви `ta_chat.greeting_question`); `robot2` (қўлини тугмага чўзган); тугма 236 pt | «Mentor yordami» / «Aziz Karimov» / «Onlayn» / «Dars bo'yicha qanday savollaringiz bor?» / «Savolim bor» | «Помощь ментора» / «Азиз Каримов» / «Онлайн» / «Какие вопросы у вас есть по занятию?» / «У меня есть вопрос» |
| `ai-only` | Presence API йўқ ёки жавоб бермади, ёки ментор бириктирилмаган (`ta_chat.mentors_empty`); чат AI режимида ишлайди. **Presence бўлмаса шу ҳолат асосий бўлади** | Кичик сатр апельсин; чип апельсин `ai.svg` + «AI yordamchi»; изоҳ нейтрал; `robot5` (ўйланган); тугма 236 pt | «Mentor yordami» / «24/7 javob beradi» / «AI yordamchi» / «Dars bo'yicha qanday savollaringiz bor?» / «Savolim bor» | «Помощь ментора» / «Отвечает 24/7» / «AI-помощник» / «Какие вопросы у вас есть по занятию?» / «У меня есть вопрос» |
| `offline` | Presence `offline`; кутилаётган савол йўқ | Чип кулранг нуқта + «Oflayn» (slate семантика — ноактив); изоҳ **кўк** (маълумот): савол қолдириш мумкин; робот йўқ; тугма тўлиқ кенглик | «Mentor yordami» / «Aziz Karimov» / «Oflayn» / «Savolingizni qoldiring — mentor onlayn bo'lgach javob beradi.» / «Savolim bor» | «Помощь ментора» / «Азиз Каримов» / «Офлайн» / «Оставьте вопрос — ментор ответит, когда будет онлайн.» / «У меня есть вопрос» |
| `pending` | Ўқувчининг охирги хабарига ҳали жавоб йўқ (`lastMessage.from == student`, `answeredAt == null`) | Кичик сатр кўк — юборилган вақт; чип кўк `hourglass.svg` + «Kutilmoqda»; изоҳ нейтрал — саволнинг ўзи қўштирноқда, 2 қатор + «…»; робот йўқ; тугма «Chatni ochish» | «Mentor yordami» / «Yuborildi: bugun, 14:20» / «Kutilmoqda» / «“Blockly'da takrorlash bloki nega ishlamayapti? Uy vazifasida xato chiqadi…”» / «Chatni ochish» | «Помощь ментора» / «Отправлено: сегодня, 14:20» / «В ожидании» / ««Почему не работает блок повтора в Blockly? В домашнем задании ошибка…»» / «Открыть чат» |
| `answered` | Ментор жавоб берди, ўқувчи ҳали ўқимаган (`lastMessage.from == mentor`, `readAt == null`) | Кичик сатр яшил — ментор исми · вақт; чип яшил `check_correct.svg` + «Javob keldi»; изоҳ **яшил** фон — жавобнинг боши, 2 қатор + «…»; `robot7` (бош бармоқ); тугма 236 pt | «Mentor yordami» / «Aziz Karimov · 15:40» / «Javob keldi» / «“Takrorlash blokini Sikllar bo'limidan oling, ichiga harakat blokini joylang…”» / «Javobni o'qish» | «Помощь ментора» / «Азиз Каримов · 15:40» / «Есть ответ» / ««Возьмите блок повтора из раздела Циклы, вложите в него блок движения…»» / «Читать ответ» |
| `locked` | Аккаунт тўлов сабабли музлатилган (`account.frozen`) — чат `not_authorized` қайтаради | Кичик сатр қизил; чип пушти `lock.svg` + «Yopiq»; изоҳ **пушти** — илованинг ўз сатри (сабаб); ўчирилган «Savolim bor» + апельсин «To'lov qilish» (кейинги қадам). Робот йўқ | «Mentor yordami» / «Chat vaqtincha yopiq» / «Yopiq» / «Akkauntingiz to'lov qilinmaganligi sababli muzlatildi.» / «Savolim bor» (ўчиқ) + «To'lov qilish» | «Помощь ментора» / «Чат временно закрыт» / «Закрыто» / «Ваш аккаунт заблокирован из-за неуплаты» / «У меня есть вопрос» (ўчиқ) + «Оплатить» |
| `loading` | Фақат биринчи юклашда, кэшда ҳолат йўқ бўлса (presence + охирги хабар сўрови кетяпти) | Скелет: сарлавҳа 118×16, кичик сатр 88×12, чип 72×22 пилл, изоҳ 308×46, тугма 308×36. Робот йўқ | — | — |

Ҳолати йўқ нарсалар (онгли қарор):
- **`error` йўқ.** Карточка веб'да шартсиз чиқади ва чатнинг ўзи presence/охирги хабарга боғлиқ эмас. Сўров хато берса карточка `ai-only` га тушади (тугма ишлайди), «Yuklab bo'lmadi» чизилмайди.
- **Токен йўқ** (`ta_chat.error.not_authorized`, кирмаган фойдаланувчи) — карточка каруселда **чиқмайди**. `locked` фақат музлатилган аккаунт учун.
- Веб'даги «чат очиқ», «соат сабабли карточка кўчади», «тугма яна босилди» ҳолатлари мобилда йўқ: чат маршрут, карусель индекси ўзгармайди.

Матн узунлиги текшируви: сарлавҳа 14 белги (≤ 22); кичик сатрлар 12–23 UZ / 12–26 RU (≤ 30); чиплар 5–12 белги; тугмалар UZ 11–14, RU 8–18 белги («У меня есть вопрос» = 18, чегарада — `locked` да иконкасиз қолдирилди, 253 pt га сиғади); изоҳлар 39–61 белги, савол/жавоб клэмп билан кесилади. Сарлавҳа қатори энг кенг ҳолати `pending`: UZ ≈ 252/308 pt, RU («Отправлено: сегодня, 14:20» + «В ожидании») ≈ 270/308 pt — чегарада; рус тилида кичик сатрни «Сегодня, 14:20» деб қисқартириш мумкин.

## 4. Ҳаракатлар

| Элемент | Босиш зонаси | Ҳаракат |
|---|---|---|
| «Savolim bor» / «Chatni ochish» / «Javobni o'qish» | 36 pt кўринадиган, ≥ 44 pt hit-area (тик 4 pt қўшимча) | `push` → мавжуд `ta_chat` экрани (AI chat). Бириктирилган ментор танланган ҳолда очилади; `answered` да тред охирига скролл ва хабар «ўқилди» деб белгиланади; `pending` да тред очилади, ёзиш майдони фокусда эмас. Android back / iOS свайп чатни ёпади, ёзилаётган хабар сақланади; қайтганда карточка ҳолати қайта сўралади |
| Карточканинг ўзи (сарлавҳа, изоҳ, робот) | бутун 332×178 | Тугма билан бир хил (чатни очади) — веб'дагидек «ўлик» юза қолдирилмайди. `locked` да: toast «Chat to'lovdan keyin ochiladi» (RU «Чат откроется после оплаты»). `loading` да ҳаракат йўқ |
| Чип (Onlayn / Kutilmoqda / …) | — | Ҳаракат йўқ, фақат статус (карточка босилиши билан қопланади) |
| «To'lov qilish» (`locked`) | 36 pt, ≥ 44 pt hit-area, кенглик ≈ 116 | `PaymentWidget` тўлов пастки варағини очади (илова ичидаги браузер орқали тўлов; қайтганда тўлов ва аккаунт ҳолати қайта сўралади) |
| «Savolim bor» ўчиқ (`locked`) | — | Босилганда ҳам toast «Chat to'lovdan keyin ochiladi»; сабаб карточканинг пушти изоҳида |

Диалог тўқнашуви: чат маршрути очиқ пайтда уй экранининг автоматик варақлари (қолдирилган тадбир) кўрсатилмайди; қайтганда навбат қайта ишлайди.

## 5. Пастки панеллар

Жами 7 та панел. Уч тури бор: **пастки панел** (пастдан чиқади), **тўлиқ экран** (календарь, вақт танлаш), **огоҳлантириш** (бир абзац матн ва тугма). Ёпиш: орқа фонга босиш, ✕ тугмаси ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Асосий тугма |
|---|---|---|---|---|
| `chat` | пастки панел | карточка: `online`; панел: `answered`, `mentors` | маълумот қаторлари, рўйхат, рангли изоҳ, робот расми | Chatni ochish |
| `ai` | пастки панел | карточка: `ai-only` | маълумот қаторлари, рангли изоҳ | Chatni ochish |
| `offline` | пастки панел | карточка: `offline` | маълумот қаторлари, рўйхат, рангли изоҳ | Savolni yozib qoldirish |
| `pending` | пастки панел | карточка: `pending` | маълумот қаторлари, рангли изоҳ | Chatni ochish |
| `answered` | пастки панел | карточка: `answered` | маълумот қаторлари, рангли изоҳ | Javobni chatda ochish |
| `mentors` | пастки панел | панел: `chat`, `offline`, `pending` | матн | Aziz Karimov bilan davom etish |
| `locked` | огоҳлантириш | карточка: `locked` | рангли изоҳ | To'lovga o'tish |

### Панелларнинг тугмалари

- **`chat`** (Mentor yordami): «Chatni ochish» · «Mentorni almashtirish»
- **`ai`** (AI yordamchi): «Chatni ochish» · «Yopish»
- **`offline`** (Mentor hozir oflayn): «Savolni yozib qoldirish» · «Boshqa mentorni tanlash»
- **`pending`** (Savolingiz yuborildi): «Chatni ochish» · «Mentorni almashtirish»
- **`answered`** (Aziz Karimovdan javob): «Javobni chatda ochish» · «Yangi savol berish»
- **`mentors`** (Mentorni tanlash): «Aziz Karimov bilan davom etish» · «Bekor qilish»
- **`locked`** (Chat vaqtincha yopiq): «To'lovga o'tish» · «Tushunarli»

## 6. Расмлар ва иконкалар

| Файл | Қаерда | Изоҳ |
|---|---|---|
| `images/robot2.png` (512×427) | `online`, 64 pt, ўнг-паст | Қўлини чапга — тугмага — чўзган, дўстона |
| `images/robot5.png` (512×504) | `ai-only`, 60 pt | Ўйланган робот = AI ёрдамчи |
| `images/robot7.png` (700×528) | `answered`, 60 pt | Бош бармоқ = жавоб келди |
| `icons/ai.svg` | `ai-only` чипи, 14 pt, `ic--brand` | Учқун, маска орқали апельсин |
| `icons/hourglass.svg` | `pending` чипи, 14 pt, `ic--blue` | Twemoji қум соати, маска силуэт қилади |
| `icons/check_correct.svg` | `answered` чипи, 14 pt, `ic--green` | Битта галочка (`check.svg`/`succes.svg` тўлдирилган доира бўлгани учун маскада қора диск бўлиб қолади — ишлатилмайди) |
| `icons/lock.svg` | `locked` чипи, 14 pt, `ic--red` | — |
| CSS нуқта `.m-dot` | `online` / `offline` чипи, 8 pt | Иловада «presence dot» иконкаси йўқ; `circle.svg` ҳалқа бўлгани учун CSS доира |

Ишлатилмайди: `images/mentor.png` (одам сурати — карточкада «тирик одам» ваъдаси бўлмасин, чат AI режимида ишлаши мумкин), веб `robo-mentor.png`, `chevron-right.svg`, пушти изоҳ.

## 7. Flutter учун изоҳлар

- **Тузилиш:** `Stack` → [`Container`(332×178, `BoxDecoration(borderRadius: 18, color: card, boxShadow)`, `Padding(12)`, `Column`(head `Row`, `SizedBox(8)`, body `Expanded`, `SizedBox(8)`, foot `Row`)), `Positioned(right: 8, bottom: 8, child: Image.asset(robot, width: art))`]. Пастки қатор робот бўлса `Padding(right: 72)`.
- **Сарлавҳа қатори:** `Row(crossAxisAlignment: start, mainAxisAlignment: spaceBetween)` → `Column`(title `Text(maxLines: 1, overflow: ellipsis)`, sub) + чип `Container(height: 22, padding: 0 8, shape: StadiumBorder)`.
- **Изоҳ:** `Container(decoration: radius 12, color)` + `Text(maxLines: 2, overflow: TextOverflow.ellipsis)` — веб `line-clamp` эквиваленти.
- **Тугмалар:** `FilledButton` (`minimumSize: Size(0, 36)`, `shape: RoundedRectangleBorder(12)`, `textStyle` 600/13); ўчирилган — `FilledButton` `onPressed: null` эмас (toast бериш учун), `style` `disabled` рангли, `onPressed` toast кўрсатади. Босиш зонаси ≥ 44: `MaterialTapTargetSize.padded` ёки `SizedBox(height: 44)` ичида марказлаш. Бутун карточка — `InkWell`/`GestureDetector`.
- **Токенлар:** `ThemeExtension<JuniorTokens>`: `card #FFFFFF`, `row #F8F8FC`, `text #000000`, `text2 #999999`, `text3 #B4B4B4`, `line2 #F0F0F0`, `brand #FF4F28`, `brandSoft #FFEDE7`, `green #58CC02`, `greenSoft #ECFFDE`, `blue #1CB0F6`, `blueSoft #E8F6FE`, `red #ED0000`, `pinkSoft #FFE4EA`; радиуслар `card 18`, `inner 12`, `btn 12`; матн стиллари `title 600/15`, `small 500/12`, `btn 600/13` (`fontFamily: 'SFpro'`).
- **Динамик маълумот:** `mentor.name`, `mentor.presence` (`online | offline | unknown`), `lastMessage` (`from`, `text`, `sentAt`, `readAt`), `account.frozen`. Ҳолат ҳисоблаш: `frozen → locked`; `lastMessage.from == mentor && readAt == null → answered`; `lastMessage.from == student && answer == null → pending`; акс ҳолда presence бўйича `online` / `offline`, presence `unknown` → `ai-only`. Хато → `ai-only`.
- **Вақт:** Тошкент вақти (қаттиқ UTC+5), 24 соатли `HH:mm`; «bugun» — Тошкент куни бўйича; кечаги/олдинги учун «7 sentabr, 14:20». Нотўғри сана → вақт сатри яширилади.
- **Янгилаш:** уй экрани фокусга қайтганда ва чатдан қайтганда; таймер керак эмас (тескари саноқ йўқ). Скелет фақат кэш бўш бўлса; кейинги юклашларда эски ҳолат туради.
- **Скелет:** `AnimatedContainer`/`shimmer` градиент (`#EEF0F3 → #F6F7F9`, 1,2 с); Lottie `loading.json` ишлатилмайди — карусель бир хил бўлсин.
- **Accessibility:** `Semantics(label: 'Mentor yordami, Aziz Karimov onlayn. Savolim bor')`; чип ва робот `excludeSemantics`. Тизим шрифт масштаби ≥ 1,3 да кичик сатр ва чип бир қаторда сиғмайди — `MediaQuery.textScaler.clamp(maxScaleFactor: 1.3)` карточка ичида.
- **Рус тили:** «У меня есть вопрос» тугма матни 18 белги — 236 pt тугмага сиғади (≈ 154 pt), лекин катта шрифт масштабида «Задать вопрос» га тушириш кўзда тутилсин.
