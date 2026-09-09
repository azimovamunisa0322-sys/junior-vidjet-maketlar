# WebinarWidget — `webinar`

Манба: `WIDGET-MAP.md` 4.1 (`widgets/EventWidgets.jsx` L175–210). Макет: `design/cards/webinar.html` (10 ҳолат, асосийси `upcoming`). Токенлар: `design/css/tokens.css`, умумий класслар: `design/css/card-base.css`.

## 1. Вазифаси

Талабага навбатдаги вебинар (гуруҳ онлайн дарси) қачон бўлишини, мавзусини ва ҳозир кириш мумкинлигини бир қарашда кўрсатади. Ягона амал — «Darsga qo'shilish»: кириш ойнаси очиқ ва бэкенд рухсат берганда ҳаволани очади, қолган ҳолатларда тугма ўчирилган кўринишда туради ва сабаби бир қаторда ёзилади (тўлиқ тескари саноқ, ментор, модул ва ёрдам — пастки панелда).

## 2. Анатомия

Карточка `297×171 pt`, ички падинг `12` → ички қути `273×147 pt`, радиус `18` (`--r-card`), фон `#FFFFFF` (`--c-card`), соя `0 6 18 rgba(28,39,76,.06)`. Устун, элементлар ораси `8 pt`. Баландлик бюджети: сарлавҳа 35 + 8 + тана 60 + 8 + пастки қатор 36 = 147.

| Элемент | Класс | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|---|
| Сарлавҳа қатори | `.wcard__head` | 273×35 (18 + 2 + 15) | — | — | чапда матн устуни, ўнгда чип; `align-items:flex-start` |
| Сарлавҳа | `.wcard__title` | 18 pt қатор | 15/600, letter-spacing −0.1 | `--c-text` `#000000` | `Keyingi vebinar` (104 pt); `ended` да `Vebinar` |
| Кичик сатр (сана, вақт) | `.wcard__sub` | 15 pt қатор, `margin-top 2` | 12/500 | `--c-blue` `#1CB0F6` — режалаштирилган; `--c-green-2` `#58CC02` — якунланган; `--c-text-2` `#999999` — янгиланмоқда | `10 sentabr, 19:30` / `Bugun, 19:30` / `Yakunlandi · 8 sentabr, 19:30` (151 pt) |
| Чип (ҳолат слоти) | `.wcard__chip` + модификатор | 22 pt баланд, падинг `0 8`, радиус pill, иконка 14 | 12/600 | `--blue` (саноқ): фон `--c-blue-soft` `#E8F6FE`, матн `#1CB0F6`; `--green` (кириш очиқ): `#ECFFDE` / `#58CC02`; `--live`: фон `--c-red` `#ED0000`, матн `#fff`; `--pink` (сўник жонли): `#FFE4EA` / `#ED0000`; модификаторсиз (тайёрланмоқда, янгиланмоқда): `--c-row` `#F8F8FC` / `#999999` | Энг кенг чип `23 daqiqa qoldi` = 84 + 14 + 4 + 16 = 118 pt; сарлавҳа 104 + 8 + 118 = 230 ≤ 273. Жонли нуқта `.wb-dot` 8 pt, `currentColor` |
| Тана | `.wcard__body` | 273×60 (flex 1) | — | — | устун, оралиқ 6; ҳолат изоҳи `margin-top:auto` билан пастга ёпишади |
| Мавзу (асосий факт) | `.wcard__text.wcard__text--2` | ≤ 2 қатор × 16 = 32 pt | 13/500; мавзу `<b>` 13/600 | `--c-text`; курс `.wcard__muted` `#999999` | `Sikllar va shartlar · Blockly Dasturlash` (214 pt → 1 қатор; робот ёнида 201 pt да 2 қатор). `event.title`, бўлмаса курс номи |
| Ҳолат изоҳи | `.wcard__hint` | 14 pt, иконка 12, оралиқ 4 | 11/500 | `--c-text-2` `#999999`; иконка slate `#93A2C0`, жонлида `--c-red` | Бир қатор. Робот бор ҳолатларда `.wb-pad` (`padding-right:72`) → матн кенглиги 201 pt |
| Пастки қатор | `.wcard__foot` | 36 pt | — | — | `margin-top:auto` |
| Асосий тугма | `.wcard__btn` | 36 pt, радиус 12, падинг `0 14`, иконка 16, оралиқ 6 | 13/600 | фон `--c-brand` `#FF4F28`, матн `#fff` | `Darsga qo'shilish` + `arrow_right`. `--fit` варианти 151 pt (робот ёнида), акс ҳолда тўлиқ кенглик |
| Ўчирилган тугма | `.wcard__btn--disabled` | шу ўлчам | 13/600 | фон `--c-line-2` `#F0F0F0`, матн ва `lock` иконка `--c-text-3` `#B4B4B4` | Кўриниши ўчирилган, лекин **босилади** → пастки панел / toast (4-бўлим) |
| Ghost тугма | `.wcard__btn--ghost` | шу ўлчам | 13/600 | фон `--c-row` `#F8F8FC`, матн `#000` | фақат `error`: `Qayta urinish` |
| Робот | `.wcard__art.wcard__art--bottom` | 64×64, `right 8`, `bottom 8` (у ≈ 99–163) | — | — | `robot` (кутиш), `robot2` (кириш очиқ), `robot7` (якунланди). Тана матни (у 55–87) роботга етмайди; изоҳ (у 101–115) `.wb-pad` олади |
| Хато қатори | `.wcard__row.wb-row` | 44 pt | 13/600 + 11/500 | — | `robot4` 44×44 + `Yuklab bo'lmadi` + `Internet aloqasini tekshiring` |
| Скелет | `.wcard--skeleton .sk` | сарлавҳа 16×104, сатр 12×90, чип 22×84 (pill), тана 12/74 %, 12/40 %, 10/45 %, тугма 36×151 | — | `#EEF0F3 → #F6F7F9` градиент, 1.2 с | `upcoming` қолипини такрорлайди |

Кенглик текшируви (SF Pro метрикаларидан ҳисобланган): сарлавҳа + чип ≤ 239 pt; изоҳлар роботсиз ≤ 212 pt (лимит 273), робот билан ≤ 193 pt (лимит 201); fit тугма 151 pt, робот чап чегараси 225 pt.

## 3. Ҳолатлар

Фаза `getEventPhase(event, now)` дан (`upcoming` / `joinOpen` / `live` / `active` / `updating` / бошқа). `joinOpen` ва `active` карточкада бир хил чизилади. «Кириш мумкин» = `canJoin === true && joinUrl`. Кун ёрлиғи: Тошкент куни бугун бўлса `Bugun`, акс ҳолда `D oy`. Ҳамма вақт 24 соатли `HH:mm`, Тошкент (қаттиқ UTC+5).

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `upcoming` **(асосий)** | `phase = upcoming`, бошланишига ≥ 1 кун | Кўк сана, кўк чип «N kun qoldi» (`hourglass`), мавзу, изоҳ `time` + «Kirish HH:MM da ochiladi» (HH:MM = `startsAt − joinWindowMinutes`, default 10; `0` бўлса бошланиш вақти), ўчирилган fit тугма `lock`, робот `robot` | `Keyingi vebinar` · `10 sentabr, 19:30` · `2 kun qoldi` · `Sikllar va shartlar · Blockly Dasturlash` · `Kirish 19:20 da ochiladi` · `Darsga qo'shilish` | `Следующий вебинар` · `10 сентября, 19:30` · `Через 2 дня` · `Циклы и условия · Программирование Blockly` · `Вход откроется в 19:20` · `Войти на урок` |
| `upcoming-today` | `phase = upcoming`, бугун; чип бирлиги соат ёки дақиқа | `upcoming` билан бир хил, фақат `Bugun, HH:mm` ва чип «N soat qoldi» / «N daqiqa qoldi» (энг кенг чип) | `Bugun, 19:30` · `23 daqiqa qoldi` / `7 soat qoldi` | `Сегодня, 19:30` · `Через 23 мин` / `Через 7 ч` |
| `join-open` | `phase ∈ {joinOpen, active}`, `canJoin && joinUrl` | Яшил чип «Kirish ochiq» (`check_correct`), изоҳ `user` + ментор ва модул, **фаол** fit тугма + `arrow_right`, робот `robot2` (қўли билан чақиради) | `Kirish ochiq` · `Mentor: Aziz Karimov · Modul 3` · `Darsga qo'shilish` | `Вход открыт` · `Ментор: Азиз Каримов · Модуль 3` · `Войти на урок` |
| `live` | `phase = live`, `canJoin && joinUrl` | Қизил `--live` чип нуқта билан «Jonli efir» (нуқта Flutter да 1.2 с пульс), изоҳ қизил `time` + «Dars boshlandi, hozir qo'shiling», фаол тўлиқ кенгликдаги тугма, роботсиз | `Jonli efir` · `Dars boshlandi, hozir qo'shiling` · `Darsga qo'shilish` | `В эфире` · `Урок начался, присоединяйтесь сейчас` · `Войти на урок` |
| `no-link` | `phase ∈ {joinOpen, active}`, `!joinUrl` ёки `canJoin !== true` (шу жумладан очилиш дақиқасидаги эски `canJoin`) | Кулранг чип «Tayyorlanmoqda» (`hourglass`), изоҳ `circle` + «Havola tez orada shu yerda paydo bo'ladi», ўчирилган тўлиқ тугма `lock`. `canJoin !== true && joinUrl` варианти — шу кўриниш, изоҳ: «Kirish hali berilmagan — mentorga yozing» | `Tayyorlanmoqda` · `Havola tez orada shu yerda paydo bo'ladi` / `Kirish hali berilmagan — mentorga yozing` | `Готовится` · `Ссылка скоро появится здесь` / `Доступ пока не открыт — напишите ментору` |
| `live-no-link` | `phase = live`, `!joinUrl` ёки `canJoin !== true` | Сўник (пушти) чип «Jonli efir», изоҳ қизил `time` + «Dars boshlandi · havola shu yerda chiqadi», ўчирилган тўлиқ тугма. Веб'даги «жонли + ўлик тугма + ҳавола йўқ» уч қатори битта тушунарли хабарга бирлашган | `Jonli efir` · `Dars boshlandi · havola shu yerda chiqadi` | `В эфире` · `Урок начался · ссылка появится здесь` |
| `updating` | `phase = updating` | Кулранг чип «Yangilanmoqda», сана **кулранг** (ўзгариши мумкин), изоҳ `circle` + «Jadval yangilanmoqda, biroz kuting», ўчирилган тўлиқ тугма | `Yangilanmoqda` · `10 sentabr, 19:30` (кулранг) · `Jadval yangilanmoqda, biroz kuting` | `Обновляется` · `Расписание обновляется, подождите` |
| `ended` | фаза бешталикдан ташқарида (тугаган), тадбир ҳали `selected.active` да | Сарлавҳа `Vebinar`, яшил сатр «Yakunlandi · D oy, HH:mm», мавзу, тугма йўқ — пастки қаторда изоҳ `circle` + «Keyingi vebinar haqida xabar beramiz», робот `robot7` (бош бармоқ) | `Vebinar` · `Yakunlandi · 8 sentabr, 19:30` · `Keyingi vebinar haqida xabar beramiz` | `Вебинар` · `Завершён · 8 сентября, 19:30` · `О следующем вебинаре сообщим` |
| `loading` | биринчи сўров, маълумот йўқ | Скелет: сарлавҳа + сатр + чип, 2 сатр мавзу, изоҳ сатри, fit тугма | — | — |
| `error` | сўров хатоси, кэш йўқ | `robot4` 44 pt + «Yuklab bo'lmadi» + изоҳ «Internet aloqasini tekshiring», ghost тугма «Qayta urinish» | `Yuklab bo'lmadi` · `Internet aloqasini tekshiring` · `Qayta urinish` | `Не удалось загрузить` · `Проверьте подключение к интернету` · `Повторить попытку` |

Веб ҳолатларининг бирлаштирилиши: `joinOpen`/`active` × {кириш мумкин, ҳавола йўқ, рухсат йўқ} → `join-open` / `no-link`; `live` × {…} → `live` / `live-no-link`; `updating` × {ҳавола йўқ, рухсат йўқ} → `updating`; «бугун» ёрлиғи ва мавзу заҳиралари (`title` → `webinar_topic {course}` → `course`) — матн варианти, алоҳида ҳолат эмас. `startsAt` нотўғри → `error` кўриниши («Sana aniqlanmadi» изоҳи билан). Қолдирилган вебинар (`missedEvents`) бу виджетда чизилмайди (8-савол).

Саноқ чипи қоидаси: фақат энг катта бирлик — `N kun qoldi` (≥ 24 соат), `N soat qoldi` (≥ 60 дақиқа), `N daqiqa qoldi`; дақиқада бир янгиланади; `joinOpen` бошланиши билан чип `Kirish ochiq` га ўтади (веб'да саноқ ≈ 10 дақиқада йўқолар эди — бу ерда алмашиш аниқ ҳолат). Тўрт блокли тўлиқ саноқ — пастки панелда.

RU узунлик изоҳлари: `Следующий вебинар` 150 pt → чипга 115 pt қолади, шунинг учун RU чиплар «Через N дн./ч/мин» шаклида (≤ 78 pt); `Присоединиться к уроку` (155 pt) fit тугмада 205/213 pt — чегарада, `Войти на урок` (88 pt) тавсия этилади; `Циклы и условия · Программирование Blockly` 272 pt — тўлиқ кенгликда 1 қатор, робот ёнида 2 қатор.

## 4. Ҳаракатлар

| Элемент | Босиш зонаси | Ҳаракат | Нима очади |
|---|---|---|---|
| Карточка танаси (сарлавҳа, сана, чип, мавзу, изоҳ, робот) | бутун карточка 297×171 | `InkWell`, суриш билан аралашмаслиги учун `tap` фақат ҳаракатсиз босишда | Тафсилот **пастки панели** (5-бўлим) |
| `Darsga qo'shilish` (фаол: `join-open`, `live`) | 36 pt тугма, босиш зонаси ≥ 44 pt (`MaterialTapTargetSize.padded`); fit варианти ≥ 151×44 | `joinUrl` ни очиш: Zoom/Meet схемалари → тизим иловаси, `http(s)` → илова ичидаги браузер (`url_launcher`, `LaunchMode.inAppBrowserView`/`externalApplication`). Аналитика воқеаси `webinar_join`. Очилмаса toast «Havolani ochib bo'lmadi» + панелда «Havolani nusxalash» | Ташқи URL |
| `Darsga qo'shilish` (ўчирилган кўриниш: `upcoming`, `no-link`, `live-no-link`, `updating`) | шу ўлчам, `enabled`, `Semantics(enabled:false)` эмас — `hint` билан | Тафсилот панелини сабаб қаторига очади (ёки қисқа toast: изоҳ матни). Веб'даги «босса ҳеч нарса бўлмайди» олиб ташланди | Пастки панел |
| `Qayta urinish` (`error`) | 273×44 | Сўровни қайта юбориш → `loading` → натижа | Йўқ |
| Чип, изоҳ | алоҳида босилмайди | карточка босишига киради | — |
| Автоматик | — | Чип дақиқада бир; фаза ўзгарганда (`upcoming → joinOpen`, `joinOpen → live`) карточка **дарҳол** қайта чизилади ва bookings сўрови қайта юборилади (очилиш дақиқасидаги эски `canJoin` муаммоси); илова фонга ўтиб қайтганда (`AppLifecycleState.resumed`) ва push босилганда ҳам қайта сўраш. Карусель тартиби фақат маълумот янгилангандагина, фойдаланувчи каруселни ушлаб турганда эмас | — |

## 5. Пастки панеллар

Жами 3 та панел. Уч тури бор: **пастки панел** (пастдан чиқади), **тўлиқ экран** (календарь, вақт танлаш), **огоҳлантириш** (бир абзац матн ва тугма). Ёпиш: орқа фонга босиш, ✕ тугмаси ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Асосий тугма |
|---|---|---|---|---|
| `details` | пастки панел | карточка: `upcoming`, `upcoming-today`, `updating` | маълумот қаторлари, рангли изоҳ | Darsga qo'shilish |
| `join` | пастки панел | карточка: `join-open`, `live` | маълумот қаторлари, рангли изоҳ | Darsga qo'shilish |
| `no-link` | огоҳлантириш | карточка: `no-link`, `live-no-link` | матн | Tushunarli |

### Панелларнинг тугмалари

- **`details`** (Sikllar va shartlar): «Darsga qo'shilish» · «Yopish»
- **`join`** (Sikllar va shartlar): «Darsga qo'shilish»
- **`no-link`** (Havola hali tayyor emas): «Tushunarli»

## 6. Расмлар ва иконкалар

| Ном | Файл | Қаерда | Ўлчам |
|---|---|---|---|
| Робот (кутиш) | `app-assets/images/robot.png` (440×440) | `upcoming`, `upcoming-today`, ўнг паст | 64×64 |
| Робот (қўлини чўзган) | `app-assets/images/robot2.png` (512×427) | `join-open` — «киринг» | 64×53 (contain) |
| Робот (бош бармоқ) | `app-assets/images/robot7.png` (700×528) | `ended` | 64×48 |
| Робот (хафа) | `app-assets/images/robot4.png` (512×554) | `error`, қатор ичида | 44×44 |
| `hourglass.svg` | `app-assets/icons/` | саноқ ва «tayyorlanmoqda»/«yangilanmoqda» чиплари (mask, силуэт) | 14 |
| `check_correct.svg` | `app-assets/icons/` | «Kirish ochiq» чипи, `--c-green-2` | 14 |
| `time.svg` | `app-assets/icons/` | изоҳ: очилиш вақти (slate), жонли (`--c-red`) | 12 |
| `user.svg` | `app-assets/icons/` | изоҳ: ментор | 12 |
| `circle.svg` | `app-assets/icons/` | изоҳ: маълумот белгиси (иловада `info` иконкаси йўқ) | 12 |
| `lock.svg` | `app-assets/icons/` | ўчирилган тугма, `--c-text-3` | 16 |
| `arrow_right.svg` | `app-assets/icons/` | фаол тугма, оқ | 16 |
| Жонли нуқта | CSS `.wb-dot` (Flutter: `Container` доира) | `live` (оқ), `live-no-link` (қизил) | 8 |

Ишлатилмайди: веб `robo-webinar.png`, `clock.svg`, `calendar.svg`, `chevron-right.svg`, `info.svg`; эмодзи `🔓` ва `🔴` олиб ташланди (маъноси аниқланмаган; жонли учун нуқта элемент). `check.svg`/`succes.svg` маска сифатида тўлиқ доира бўлиб қолади — ишлатилмасин.

## 7. Flutter учун изоҳлар

- **Виджет дарахти:** `Material(color: tokens.card, borderRadius: 18, elevation 0 + BoxShadow)` → `InkWell(onTap: openSheet)` → `Padding(12)` → `Column(spacing 8)`: `_Head` (`Row`, `crossAxisAlignment.start`: `Column[Text title, Text sub]` + `Spacer` + `_Chip`), `Expanded(_Body)`, `_Foot`. Робот — `Stack` ичида `Positioned(right: 8, bottom: 8, child: Image.asset(..., width: 64, height: 64, fit: BoxFit.contain))`, `IgnorePointer`.
- **Токенлар** `ThemeExtension<JuniorTokens>`: ранглар (`brand #FF4F28`, `blue #1CB0F6`, `blueSoft #E8F6FE`, `green2 #58CC02`, `greenSoft #ECFFDE`, `red #ED0000`, `pinkSoft #FFE4EA`, `row #F8F8FC`, `line2 #F0F0F0`, `text2 #999999`, `text3 #B4B4B4`, `slate #93A2C0`), радиуслар (`card 18`, `btn 12`, `pill`), `TextStyle` лар (`title 15/600 h18`, `body 13/500 h16`, `small 12/500 h15`, `tiny 11/500 h14`, `btn 13/600 h16`) — оила `SFpro` (`pubspec` да учта оғирлик).
- **Чип:** `Container(height: 22, padding: EdgeInsets.symmetric(horizontal: 8), decoration: BoxDecoration(color, borderRadius: StadiumBorder))` + `Row[SvgPicture.asset(icon, width: 14, colorFilter), SizedBox(4), Text]`. Саноқ рақамлари `FontFeature.tabularFigures()`. Жонли нуқта: `AnimatedOpacity`/`AnimationController` 1.2 с, `live` да оқ, `live-no-link` да қизил, пульссиз.
- **Мавзу:** `Text.rich(TextSpan[bold title, muted ' · course'])`, `maxLines: 2`, `overflow: ellipsis`; робот бор ҳолатларда изоҳ `Padding(right: 72)`.
- **Изоҳ:** `Row[SvgPicture 12, SizedBox(4), Expanded(Text tiny, maxLines 1, ellipsis)]`, `Column` ичида `MainAxisAlignment.end` (карточкадаги `margin-top:auto`).
- **Тугмалар:** `FilledButton` (`minimumSize: Size(0, 36)`, `tapTargetSize: padded`, `shape: RoundedRectangleBorder(12)`), ўчирилган кўриниш — `style` орқали (`line2` фон, `text3` матн), лекин `onPressed` бор (панел/toast). Fit варианти `Align(alignment: centerLeft)` ичида; тўлиқ кенглик `SizedBox(width: double.infinity)`.
- **Динамик қисмлар:** сарлавҳа (`Keyingi vebinar` / `Vebinar`), сатр матни ва ранги (кўк/яшил/кулранг), чип (матн, ранг, иконка, нуқта), мавзу (`title ?? course ?? 'Kurs'`), изоҳ (матн ва иконка ранги), тугма (фаол/ўчирилган, иконка, fit/тўлиқ), робот (бор/йўқ, қайси расм). Ҳаммаси `WebinarCardState` enum (10 қиймат) + `WebinarEvent` моделидан ҳисобланади; фаза `getEventPhase` нинг Dart нусхаси, сервер вақти офсети билан.
- **Соат:** карточкада `Timer.periodic(1 min)` + фаза чегараларида аниқ `Timer` (очилиш ва бошланиш вақтига); секундли тик фақат панелдаги саноқда. Скрин ридер: чип `Semantics(label: 'Boshlanishiga 2 kun qoldi')`, live region эмас.
- **Матн масштаби:** `MediaQuery.withClampedTextScaling(maxScaleFactor: 1.3)` карточка ичида; сарлавҳа 1 қатор `ellipsis`.
- **Юкланиш/хато:** `shimmer` пакети ёки `AnimatedContainer` градиент; `error` да `Qayta urinish` → `ref.refresh(bookingsProvider)`. Маълумот бор бўлса хатода эски карточка қолади, тепада `pull-to-refresh`.
- **Локализация:** `uz-UZ` / `ru-RU` калитлари янги (`home.webinar.*`), веб `home_dashboard.*` калитлари иловада йўқ. Кўплик: `N kun/soat/daqiqa qoldi` — UZ да ўзгармайди, RU да `intl` `plural` («Через 2 дня / 5 дней / 1 день»).
