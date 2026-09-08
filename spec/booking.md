# BookingWidget — `booking`

Манба: `WIDGET-MAP.md` 4.2, `APP-STYLE.md`, `design/css/tokens.css`, `design/css/card-base.css`. Макет: `design/cards/booking.html` (11 ҳолат, асосийси `demo-upcoming`).

## 1. Вазифаси

Талабанинг битта банд қилинган Demo Day ёки қўшимча дарси ҳақида қисқа хулоса: қачон, қанча вақт қолди ва битта асосий ҳаракат (тафсилот, қайта ёзилиш, менторга ёзиш). Веб карточкадаги модул/мавзу/ментор тафсилотлари, прогресс, тўлиқ саноқ ва кўчириш/бекор қилиш оқимлари пастки панелга кўчади; карточка фақат «нима бўлаётганини» бир қарашда айтади.

## 2. Анатомия

Карточка `297×171 pt`, падинг `12`, ички қути `273×147`, радиус `--r-card` 18, фон `--c-card` `#FFFFFF`, соя `--shadow-card`. Тик оқим, элементлар ораси `--s-2` 8 pt. Баландлик бюджети: сарлавҳа 18 (+15 сатр) + 8 + тана ≤ 52 + 8 + пастки қатор 36 ≤ 147.

| Элемент | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|
| `.wcard__title` | 18 pt қатор, ≤ 22 белги | SF Pro 15/600 | `--c-text` `#000000` | Тадбир тури: `Demo Day`, `Qo'shimcha dars`; йиғма/бўш/хато карточкада илова атамаси `Mening bandlovlarim` |
| `.wcard__sub` | 15 pt, юқоридан 2 pt, ≤ 30 белги | 12/500 | демо `--c-brand` `#FF4F28`, қўшимча дарс `--c-blue` `#1CB0F6`, қолдирилган `--c-red` `#ED0000`, йиғма `--c-text-2` `#999999` | Сана ва вақт: `12 sentabr, 14:00`, бугун бўлса `Bugun, 14:00` (Тошкент, UTC+5, 24 соат). Сана бир марта чиқади — веб `detail_time` такрори йўқ |
| `.wcard__chip` | 22 pt, падинг 0 8, пилл | 12/600 | нейтрал `--c-row`/`--c-text-2`; бугун — тур ранги (`--chip--brand` `#FFEDE7`/`#FF4F28`, `--chip--blue` `#E8F6FE`/`#1CB0F6`); қолдирилган `--chip--pink` `#FFE4EA`/`#ED0000`; йиғма сон `--chip--brand` | Нисбий саноқ илова идиомасида: `3 kun qoldi` → `3 soat qoldi` → `20 daqiqa qoldi`. Тўрт блокли веб саноқ йўқ. Фаол ҳолатда чип ичида 6 pt `currentColor` нуқта (`.bk-dot--cur`) + `Boshlandi` |
| `.wcard__note` | ≤ 2 қатор (2×15 + 8+8 = 46 pt), радиус `--r-inner` 12, падинг 8 10 | 12/500 | демо `--note--brand` `#FFEDE7`, қўшимча дарс `--note--blue` `#E8F6FE`, қолдирилган `--note--pink` `#FFE4EA`, қоида/блок нейтрал `--c-row` `#F8F8FC`; матн `--c-text` | Битта асосий факт: ментор · курс · модул/мавзу, ёки ҳолат матни, ёки блокланиш сабаби. ≤ 80 белги (робот бўлса ≤ 54) |
| `.bk-list` (фақат `multi`) | 3 × 16 pt қатор, ора 2 = 52 pt | 13/500 ном, 12/500 сана | нуқта 6 pt: `--c-brand` демо, `--c-blue` қўшимча дарс; сана `--c-text-2` | Ном чапда «…» билан қисқаради, сана ўнгда сиқилмайди |
| `.bk-err` (фақат `error`) | 40 pt қатор | 13/500 + 12/500 | `--c-text`, `--c-text-2` | `robot4` 40×40 + икки қатор матн |
| `.wcard__btn` | 36 pt, радиус `--r-btn` 12, падинг 0 14, `flex:1` | 13/600 | `--c-brand` `#FF4F28`, матн `#FFFFFF`; хатода `--btn--ghost` `--c-row`/`--c-text` | Ягона асосий ҳаракат, ≤ 18 белги |
| `.wcard__ibtn` | 32×32 визуал, радиус 10; босиш зонаси 44×44 (шаффоф падинг) | иконка 18 pt | фон `--c-row`, иконка `--c-slate` `#93A2C0`; ўчириш `.bk-ibtn--danger` `--c-pink-soft` + `--c-red`; блокланган `.bk-ibtn--locked` `--c-line-2` `#F0F0F0` + `--c-text-3` `#B4B4B4` | Иккиламчи ҳаракат: `time.svg` кўчириш, `close.svg` ўчириш, `lock.svg` блок, `arrow_right.svg` тафсилот |
| `.wcard__art` | 64 (робот7), 56 (`time_up`), 72 (`robot2`) | — | — | Ўнг томонда, `position:absolute`. Пастда бўлса тана ва пастки қатор `.bk-pad` (72 pt ўнг падинг), юқорида бўлса `.bk-pad--80` |
| Скелет `.sk` | сарлавҳа 16×60 %, сатр 12×40 %, чип 84×22, изоҳ 46, тугма 36, ibtn 32 | — | `#EEF0F3`→`#F6F7F9` градиент, 1,2 с | Асосий ҳолат қолипини такрорлайди |

Кенглик текшируви (SF Pro тахминий: 15/600 ≈ 8,3 pt/белги, 12/600 ≈ 6,6 pt/белги): энг оғир жуфтлик `Qo'shimcha dars` (≈124) + 8 + чип `20 daqiqa qoldi` (≈115) = 247 ≤ 273. Рус тилида сарлавҳа `Доп. занятие` бўлиши шарт — `Дополнительное занятие` чип билан сиғмайди.

## 3. Ҳолатлар

Кўриниш `event.kind`, `event.status`, фаза (`upcoming`/`active`) ва бугунги кун (Тошкент) дан ҳисобланади. Веб'даги «фаза бошқа» (`joinOpen`/`live`/`updating`) бўш жойлари мобилда йўқ: `upcoming` → саноқ чипи, `active`/`live` → `Boshlandi`, `no_show` → `Kelmadi`, қолгани `demo-upcoming` кўринишида қолади.

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `demo-upcoming` (асосий) | `demoDay`, `status ≠ no_show`, тадбир куни бугун эмас, `canReschedule` | Апельсин сана, нейтрал саноқ чипи (кун), апельсин изоҳ (ментор · курс · модул), `Batafsil` + кўчириш ibtn (`time.svg`). Робот йўқ | `Demo Day` / `12 sentabr, 14:00` / `3 kun qoldi` / `Mentor: Aziz Karimov · Blockly Dasturlash · Modul 3` / `Batafsil` | `Demo Day` / `12 сентября, 14:00` / `через 3 дня` / `Ментор: Азиз Каримов · Blockly программирование · Модуль 3` / `Подробнее` |
| `demo-upcoming` + `canReschedule = false` (модификатор, алоҳида чизилмаган) | Кўчириш бэкендда ёпилган | Ўша карточка, ibtn `.bk-ibtn--locked` + `lock.svg`; изоҳ ўрнида сабаб: нейтрал `--c-row` | `Vaqtni ko'chirish yopilgan. Savol bo'lsa mentorga yozing` | `Перенос закрыт. Есть вопрос — напишите ментору` |
| `demo-today` | Тадбир куни бугун, ҳали бошланмаган | `Bugun, HH:mm`, апельсин чип соат/дақиқа, `robot7` (бош бармоқ) ўнг-пастда 64 pt, изоҳ ва пастки қатор `.bk-pad` | `Bugun, 14:00` / `3 soat qoldi` / `Mentor: Aziz Karimov · Blockly Dasturlash` / `Batafsil` | `Сегодня, 14:00` / `через 3 часа` / `Ментор: Азиз Каримов · Blockly программирование` / `Подробнее` |
| `demo-active` | Фаза `active`/`live` | Чип `Boshlandi` (нуқта + матн, апельсин), изоҳ — ментор кутмоқда, асосий тугма `Mentorga yozish` (`ta_chat`), ibtn `arrow_right` тафсилот. Робот йўқ | `Bugun, 14:00` / `Boshlandi` / `Dars boshlandi — Aziz Karimov sizni kutmoqda.` / `Mentorga yozish` | `Сегодня, 14:00` / `Идёт` / `Урок начался — Азиз Каримов ждёт вас.` / `Написать ментору` |
| `demo-missed` | `status = no_show`, `canReschedule` | Қизил сана, пушти чип `Kelmadi` (илова сатри), пушти изоҳ, `time_up` робот 56 pt ўнг-пастда, тугма `Qayta yozilish` (қайта ёзилиш панели). `canReschedule = false` бўлса тугма `Mentorga yozish` — боши берк йўқ | `5 sentabr, 14:00` / `Kelmadi` / `Demo Day'ga kelmadingiz. Yangi vaqt tanlang.` / `Qayta yozilish` | `5 сентября, 14:00` / `Не пришёл` (илова) ёки `Пропущено` / `Вы пропустили Demo Day. Выберите новое время.` / `Записаться снова` |
| `extra-upcoming` | `extraLesson`, `status ≠ no_show`, бугун эмас, `canCancel` | Кўк сана, нейтрал саноқ чипи, кўк изоҳ (ментор · курс · мавзу), `Batafsil` + ўчириш ibtn (`close.svg`, пушти фон, қизил иконка) | `Qo'shimcha dars` / `15 sentabr, 16:00` / `2 kun qoldi` / `Mentor: Aziz Karimov · Grafik dizayn · Mavzu: Qatlamlar` / `Batafsil` | `Доп. занятие` / `15 сентября, 16:00` / `через 2 дня` / `Ментор: Азиз Каримов · Графический дизайн · Тема: Слои` / `Подробнее` |
| `extra-cancel-locked` | `extraLesson`, бошланишига < 30 дақиқа (`canCancel = false`) | Кўк чип дақиқа билан, нейтрал изоҳда илованинг мавжуд сабаби, ibtn `.bk-ibtn--locked` + `lock.svg` (босилса огоҳлантириш). Сабаб карточкада кўринади — ҳинт ўрнига изоҳ | `Bugun, 16:00` / `20 daqiqa qoldi` / `Bekor qilish uchun kech qoldingiz (minimum 30 daqiqa oldin)` / `Batafsil` | `Сегодня, 16:00` / `через 20 минут` / `Слишком поздно отменять (минимум за 30 минут)` (илова) / `Подробнее` |
| `extra-missed` | `extraLesson`, `status = no_show` | Қизил сана, пушти чип, пушти изоҳ, `time_up` робот 56 pt, тугма `Mentorga yozish`. Веб'даги тугмасиз ҳолат ўрнига кейинги қадам | `5 sentabr, 16:00` / `Kelmadi` / `Darsga kelmadingiz. Mentor bilan bog'laning.` / `Mentorga yozish` | `5 сентября, 16:00` / `Не пришёл` / `Вы пропустили урок. Свяжитесь с ментором.` / `Написать ментору` |
| `multi` | `selected.active` да 2+ фаол бандлов (маҳсулот эгаси «бир карточка» вариантини танласа) | Сарлавҳа `Mening bandlovlarim`, кулранг сатр «кейингиси», апельсин сон чипи, 3 қаторли рўйхат (нуқта = тур ранги, ном, сана), тугма `Hammasini ko'rish`. 4+ бўлса учинчи қатор `+N ta yana` | `Mening bandlovlarim` / `Keyingisi: 3 kun qoldi` / `3 ta` / `Demo Day — 12 sentabr, 14:00`, `Qo'shimcha dars — 15 sentabr, 16:00` / `Hammasini ko'rish` | `Мои бронирования` / `Ближайшее: через 3 дня` / `3` / `Demo Day — 12 сентября, 14:00`, `Доп. занятие — 15 сентября, 16:00` / `Показать все` |
| `empty` | Фаол бандлов йўқ (иловада ҳозир шундай карточка бор; веб'да карточка чиқмайди) | Сарлавҳа, `robot2` (қўлини чўзган) ўнг-юқорида 72 pt, кулранг матн `.bk-pad--80`, тугма `Darsga yozilish` (илова маршрути `Qo'shimcha darsga yozilish`) | `Mening bandlovlarim` / `Hozircha sizda bandlovlar mavjud emas` (илова) / `Darsga yozilish` | `Мои бронирования` / `Пока у вас нет бронирований` (илова) / `Записаться на урок` |
| `loading` | Биринчи сўров, маълумот йўқ | `.wcard--skeleton`: сарлавҳа 60 %, сатр 40 %, чип 84×22, изоҳ 46, тугма + ibtn | — | — |
| `error` | Сўров хатоси, кеш йўқ | Сарлавҳа, `robot4` 40 pt + `Yuklab bo'lmadi` + кичик сабаб, `--btn--ghost` `Qayta urinish` (илова сатри). Кеш бўлса — эски карточка + toast | `Yuklab bo'lmadi` / `Internet aloqasini tekshiring` / `Qayta urinish` | `Не удалось загрузить` / `Проверьте интернет` / `Повторить попытку` (илова) |

Матн узунлиги чеклови: изоҳ тўлиқ кенгликда 12/500 ≈ 48 белги/қатор, робот билан (191 pt) ≈ 29 белги/қатор — икки қаторда 54 белгидан ошмасин. Рус вариантлари шу чекловга мос танланган (`Доп. занятие`, `Проверьте интернет`).

## 4. Ҳаракатлар

Ҳамма босиладиган элемент ≥ 44×44 pt (визуал 32 pt ibtn шаффоф падинг билан кенгаяди; чип ва изоҳ босилмайди).

| Элемент | Ҳолатлар | Нима қилади |
|---|---|---|
| Карточка танаси (сарлавҳа + изоҳ зонаси) | ҳамма, `loading`/`error` дан ташқари | Тафсилот пастки панелини очади (5-бўлим). `multi` да рўйхат панели |
| `Batafsil` | `demo-upcoming`, `demo-today`, `extra-upcoming`, `extra-cancel-locked` | Тафсилот пастки панели |
| ibtn `time.svg` «Vaqtni ko'chirish» | демо, `canReschedule` | Тўлиқ экранли кўчириш панели (календарь + слотлар, `WIDGET-MAP.md` 5-бўлим, `DemoDayRescheduleModal` мобил варианти) |
| ibtn `lock.svg` (блокланган) | `extra-cancel-locked`, демо `canReschedule = false` | Компакт огоҳлантириш: илова сатри `Bekor qilish uchun kech qoldingiz (minimum 30 daqiqa oldin)` ёки `Bu darsni bekor qilib bo'lmaydi`, тугма `Tushunarli`. Ўчирилган эмас — босилади ва сабабни кўрсатади |
| ibtn `close.svg` «O'chirish» | `extra-upcoming`, `canCancel` | Тасдиқ панели: `Darsni o'chirishni xohlaysizmi?` / `Bu amalni ortga qaytarib bo'lmaydi` / деструктив `Ha, o'chirish` (`--c-red`) + `Bekor qilish`; `isPending` да иккала тугма ва ёпиш блокланади; натижа toast `Bekor qilindi`; карточка оптимистик янгиланади (`empty` ёки кейинги бандлов) |
| `Mentorga yozish` | `demo-active`, `extra-missed`, демо қолдирилган `canReschedule = false` | Маршрут: илованинг `ta_chat` экрани, ментор олдиндан танланган |
| ibtn `arrow_right.svg` «Batafsil» | `demo-active` | Тафсилот пастки панели |
| `Qayta yozilish` | `demo-missed`, `canReschedule` | Кўчириш панели, сарлавҳаси `Demo Day'ga qayta yozilish`; муваффақиятда карточка `demo-upcoming` га ўтади |
| `Hammasini ko'rish` | `multi` | Рўйхат пастки панели |
| `Darsga yozilish` | `empty` | Маршрут: илованинг мавжуд `Qo'shimcha darsga yozilish` экрани (сана → ментор → вақт) |
| `Qayta urinish` | `error` | Bookings сўровини қайтаради; карточка `loading` га ўтади |
| Саноқ чипи (пассив) | `upcoming` | Фақат кўринаётган карточкада 1 с да янгиланади (кун → соат → дақиқа босқичлари); карточка экрандан чиқса тўхтайди. Тартиб қайта ҳисобланмайди — саҳифа бармоқ остида силжимайди |

## 5. Пастки панел (bottom sheet) мазмуни

Ҳали чизилмаган; карточкадан чиқарилган ҳамма маълумот шу ерда. Пастки панел, тортиш дастаси, скроллланувчи тана, тугмалар пастда қотирилган.

**Тадбир тафсилоти** (`demo-*`, `extra-*`):
- Сарлавҳа `Demo Day` / `Qo'shimcha dars`, ҳолат чипи (карточкадагидек), тўлиқ сана «12 sentabr 2026, 14:00».
- Ментор қатори: `mentor.png` 48×45 + «Aziz Karimov» + `Mentorga yozish` ҳаволаси.
- Курс · модул · мавзу (борлари); демо кунда модул прогресси — илова чеклист трекидек (`--c-line-2` трек, `--c-brand` тўлдирувчи, «Modul 3 · 68 %», 0–100 кламп, қиймат йўқ бўлса қатор йўқ).
- Тўлиқ саноқ «2 kun 5 soat 12 daqiqa» бир қаторда (тўрт блок эмас).
- Ҳаракатлар: демо — `Vaqtni ko'chirish` (блокланган бўлса сўник + сабаб матни тагида); қўшимча дарс — `O'chirish` (контур, қизил; блокланган бўлса сўник + илова сабаби); ҳамма учун `Mentorga yozish`.
- Қолдирилган тадбирда: `time_up` робот ≤ 96 pt, `Kelmadi` чипи, «Nima bo'ldi?» матни, `Qayta yozilish` (демо) / `Mentorga yozish`.

**Рўйхат** (`multi`, `Hammasini ko'rish`):
- Сарлавҳа `Mening faol bandlovlarim` (илова сатри), ҳар бандлов қатори: тур нуқтаси, ном, сана/вақт, саноқ чипи, `›`; босилса тадбир тафсилотига ўтади.
- Пастда `Qo'shimcha darsga yozilish` асосий тугма, `Bandlov tarixi` ҳаволаси.

**Огоҳлантиришлар** (компакт): блокланган бекор/кўчириш — бир абзац + `Tushunarli`; ўчириш тасдиғи — 4-бўлимдаги матн ва икки тугма.

**Қолдирилган тадбирлар авто-панели** (веб'даги авто-модал ўрнига): ҳар ишга туширишда бир марта, ҳамма қолдирилган тадбирлар бир панелда («2 ta dars qoldirildi»), кўрилганлик аккаунт бўйича сақланади. Альтернатива — панелсиз, карточкадаги `Kelmadi` чипи етарли (маҳсулот эгаси ҳал қилади).

## 6. Расмлар ва иконкалар

| Файл | Қаерда | Ўлчам | Изоҳ |
|---|---|---|---|
| `images/robot7.png` | `demo-today` | 64 pt, ўнг-паст (`--art:64px`) | Бош бармоқ — «тайёрсиз». Ландшафт (700×528), қутида 64×48 кўринади |
| `images/time_up.png` | `demo-missed`, `extra-missed`; панелдаги қолдирилган бўлими | 56 pt, ўнг-паст | Хафа робот соат билан, доира фон (оқ карточкада кўринмайди) |
| `images/robot2.png` | `empty` | 72 pt, ўнг-юқори | Қўлини чапга чўзган — матнга ишора |
| `images/robot4.png` | `error` | 40 pt, қатор ичида (`<img>`, `absolute` эмас) | Хафа робот |
| `icons/time.svg` | кўчириш ibtn | 18 pt, `--c-slate` маска | Веб `clock.svg` ўрнида |
| `icons/close.svg` | ўчириш ibtn | 18 pt, `--c-red` маска, фон `--c-pink-soft` | Веб `trash.svg` ўрнида (иловада trash йўқ); `x.svg` глифи 18 pt да жуда кичик |
| `icons/lock.svg` | блокланган ibtn | 18 pt, `--c-text-3` маска, фон `--c-line-2` | Блокланганлик сенсорда кўринади |
| `icons/arrow_right.svg` | `demo-active` тафсилот ibtn | 18 pt, `--c-slate` | Илова қаторларидаги `›` билан бир хил |
| `.bk-dot` (CSS) | `Boshlandi` чипи, `multi` рўйхати | 6 pt доира | Иконка эмас; `currentColor` / `--c-brand` / `--c-blue` |
| Ишлатилмайди | веб `robo-flag.png`, `robo-book.png`, `info.svg`, `trash.svg`, `chevron-right.svg` | — | Илова роботлари ва иконкалари билан алмаштирилди |

Иконкалар SVG ичидаги қатъий рангда, шунинг учун `.ic` маска ёрдамчиси орқали бўялади (`-webkit-mask`). Flutter'да `SvgPicture.asset(..., colorFilter: ColorFilter.mode(color, BlendMode.srcIn))`.

## 7. Flutter учун изоҳлар

- **Токенлар** — `ThemeExtension<JuniorTokens>`: `brand #FF4F28`, `brandSoft #FFEDE7`, `blue #1CB0F6`, `blueSoft #E8F6FE`, `red #ED0000`, `pinkSoft #FFE4EA`, `row #F8F8FC`, `line2 #F0F0F0`, `text #000000`, `text2 #999999`, `text3 #B4B4B4`, `slate #93A2C0`; радиуслар 18/12/10/999; `TextTheme` да `title 15/600`, `body 13/500`, `small 12/500`, `btn 13/600`, оила `SFpro`.
- **Карточка** — `SizedBox(width: 297, height: 171)` → `DecoratedBox` (радиус 18, соя `0 6 18 rgba(28,39,76,.06)`) → `ClipRRect` → `Stack`: 1) `Padding(12)` + `Column(crossAxisAlignment.stretch)`: head `Row(crossAxisAlignment.start)`, `SizedBox(8)`, `Expanded(body)`, `SizedBox(8)`, foot `Row`; 2) `Positioned(right: 8, bottom/top: 8)` робот `Image.asset`. Робот бўлса тана ва пастки қаторга `Padding(right: 72)`.
- **Чип** — `Container(height: 22, padding: 0 8, BorderRadius.circular(999))` + `Text(small, w600)`; фаол чипда `Row` [6 pt `DecoratedBox` доира, 4 pt, матн]. Чип босилмайди (`ExcludeSemantics` эмас — `Semantics(label)` билан ўқилади).
- **Асосий тугма** — `FilledButton` (`minimumSize: Size(0, 36)`, `padding: 0 14`, радиус 12, `textStyle btn`), `Expanded` ичида; `ghost` варианти `FilledButton.tonal` фон `row`. Матн `maxLines: 1, overflow: ellipsis`.
- **Ibtn** — `IconButton(constraints: BoxConstraints.tightFor(32, 32), padding: 0)` визуал 32 pt; босиш зонаси `Material.tapTargetSize = padded` (48) ёки `SizedBox(44)` ичида марказда. Иконка `SvgPicture.asset` 18 pt, `colorFilter` билан. `tooltip` = UZ ёрлиқ (`Vaqtni ko'chirish`, `O'chirish`, `Bekor qilish yopilgan`, `Batafsil`).
- **Изоҳ** — `Container(padding: 8 10, радиус 12, фон семантик)` + `Text(small, maxLines: 2, overflow: ellipsis)`. Баландлиги 46 га қотирилмайди, лекин 2 қатор клампи бор.
- **Рўйхат** (`multi`) — `Column` 3 та `SizedBox(height: 16)` қатор, ора 2; ном `Expanded` + `ellipsis`, сана `Text(small)`. 4+ бандловда учинчи қатор `+N ta yana`.
- **Скелет** — `shimmer` пакети ёки `AnimatedContainer` градиент 1,2 с; шакллар асосий ҳолат билан бир хил.
- **Саноқ** — `Timer.periodic(1 s)` фақат `upcoming` фазада ва карточка `VisibilityDetector` да кўринаётганда; чип матни босқичли: > 24 соат `N kun qoldi`, ≤ 24 соат `N soat qoldi`, < 60 дақиқа `N daqiqa qoldi`; нолга етганда `Boshlandi` (`active`) га ўтади. Карусель тартиби фақат bookings маълумоти янгилангандагина қайта ҳисобланади.
- **Динамик** — `title` (тур), `sub` (сана; `Bugun` Тошкент куни бўйича, қаттиқ UTC+5), чип (фаза/статус/сон), изоҳ матни, робот (бор/йўқ), асосий тугма варианти ва ibtn тури (`canReschedule`/`canCancel`/фаза). Статик — ўлчамлар, ранглар, шрифтлар.
- **Ҳолат машинаси** — `kind × status × phase × today × can*` дан бир `enum BookingCardState` (11 қиймат) ҳисобланади; UI фақат enum'га қарайди. Нотўғри `startsAt` (`DateTime.tryParse == null`) → `error` кўриниши, чип йўқ.
- **Оптимистик янгиланиш** — ўчириш/кўчириш тасдиқлангач карточка дарҳол янги ҳолатга ўтади (`empty`, кейинги бандлов ёки янги вақт), кейин bookings қайта сўралади (веб'даги «эски карточка қолади» муаммоси йўқ).
- **Пастки панел** — `showModalBottomSheet(isScrollControlled: true, useSafeArea: true)` + `DraggableScrollableSheet`; бир вақтда битта панел (навбат), Android back ва свайп ёпади; кўчириш оқими тўлиқ экранли маршрут.
- **Локализация** — сатрлар `uz-UZ`/`ru-RU` да қайта яратилади (веб `home_dashboard.*` калитлари иловада йўқ); мавжудлари қайта ишлатилади: `booking.status_missed` (`Kelmadi`), `booking.cancel`, `booking.cancel_dialog_*`, `booking.error.cancel_too_late`, `booking.error.cannot_cancel`, `booking.home_empty_subtitle`, `booking.book_extra`, `booking.my_bookings_title`, `booking.history_title`, `Qayta urinish`, `Tushunarli`. Рус сарлавҳаси `Доп. занятие` — қисқартма тасдиқланиши керак. Тизим шрифт масштаби ≤ 1,3 гача текширилади; ундан катта бўлса изоҳ 1 қаторга қисқаради.
