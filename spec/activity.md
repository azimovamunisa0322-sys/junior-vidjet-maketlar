# ActivityWidget — Фаоллик календари (мобил карточка)

Манба: `WIDGET-MAP.md` 4.8-бўлим, услуб `APP-STYLE.md`. Файл: `cards/activity.html`.

## 1. Вазифаси

Ўқувчига шу ойда неча кун фаол бўлганини ва охирги 7 куннинг ҳолатини бир қарашда кўрсатади. Тўлиқ ой календари ва кун тафсилотлари карточкага сиғмайди, улар пастки панелга чиқарилди.

## 2. Анатомия

| Элемент | Ўлчам | Шрифт | Ранг |
|---|---|---|---|
| Карточка | 297×171, радиус 18, ички падинг 12 | — | оқ `#FFFFFF`, соя `0 6px 18px rgba(28,39,76,.06)` |
| Сарлавҳа `Faollik kalendari` | баландлик 18 | 15/600 SF Pro | `--c-text` `#000000` |
| Ой ёзуви `Sentabr 2026` | баландлик 15 | 12/500 | `--c-green-2` `#58CC02` (оддий ҳолат), `--c-brand` огоҳлантиришда, `--c-red` хатода |
| Чип (ўнг юқорида) | баландлик 22, падинг 8 | 12/600 | фон/матн ҳолатга қараб: яшил `--c-green-soft`/`#58CC02`, пушти `--c-pink-soft`/`#ED0000`, нейтрал `--c-row`/`#999999` |
| Кун катаги | 26×26, радиус 9 | 12/600 | ҳолат ранги (пастдаги жадвал) |
| Кун ёзуви `Du…Ya` | 14 | 11/500 | `--c-text-2` `#999999`, бугун `--c-brand` 600 |
| 7 кун қатори | 273×42, кунлар орасида тенг оралиқ (39 px устун) | — | — |
| Легенда қатори | 14 | 11/500 | нуқталар 8×8 радиус 3 |
| Тугма | 273×36, радиус 12 | 13/600 | `--c-brand` `#FF4F28`, матн оқ |
| Робот (бўш ҳолат) | 72×72, ўнг пастда | — | `robot3.png` |

Вертикал йиғинди: 33 (сарлавҳа + ой) + 8 + 56 (қатор + легенда) + 8 + 36 = 141 ≤ 147. Ҳамма ҳолат сиғади.

## 3. Ҳолатлар

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `normal` | Ойда фаоллик бор, бугун бажарилган | 7 кун рангли, чипда фаол кунлар сони, легенда | `Faollik kalendari` · `Sentabr 2026` · `18 faol kun` · `Bajarildi / Qisman / Qaytarildi` · `Kalendarni ochish` | `Календарь активности` · `Сентябрь 2026` · `18 активных дней` · `Выполнено / Частично / Возвращено` · `Открыть календарь` |
| `today-empty` | Бугунги кун ҳали бўш | Бугунги катак пунктир, огоҳлантирувчи ёзув ва рағбат | `Bugun hali bo'sh` · `Bugun darsni bajarsangiz, kun yashil bo'ladi` · `Darsni davom ettirish` | `Сегодня ещё пусто` · `Выполните урок — день станет зелёным` · `Продолжить урок` |
| `perfect-week` | Охирги 7 кун тўлиқ бажарилган | Ҳамма катак яшил, табрик | `Hafta to'liq!` · `Ketma-ket 7 kun — ajoyib natija` | `Неделя полностью!` · `7 дней подряд — отличный результат` |
| `has-rejected` | Ментор амалий вазифани қайтарган | Қайтарилган кун пушти, сабаб ва тугма | `1 vazifa qaytarildi` · `Grafik dizayn — amaliy vazifa qayta topshiriladi` · `Vazifani ko'rish` | `1 задание возвращено` · `Графический дизайн — задание нужно сдать заново` · `Посмотреть задание` |
| `empty-month` | Бу ойда умуман фаоллик йўқ | Робот, тушунтириш, бошлаш тугмаси | `Bu oyda faollik yo'q` · `Birinchi darsni bajaring — kun kalendarda yashil bo'lib qoladi.` · `Darsni boshlash` | `В этом месяце активности нет` · `Выполните первый урок — день станет зелёным.` · `Начать урок` |
| `loading` | Сўров кетмоқда | Скелет: сарлавҳа, 7 катак, тугма | — | — |
| `error` | Сўров хато берди | Карточка йўқолмайди, сабаб ва қайта уриниш | `Yuklab bo'lmadi` · `Ma'lumotni olishning iloji bo'lmadi` · `Internet aloqasini tekshirib, qayta urinib ko'ring.` · `Qayta urinish` | `Не удалось загрузить` · `Не получилось получить данные` · `Проверьте интернет и попробуйте снова.` · `Повторить` |

**Кун ранглари** (веб `activity_*` ҳолатларидан):

| Ҳолат | Класс | Фон | Матн |
|---|---|---|---|
| Тўлиқ бажарилди | `d--full` | `--c-green-soft` `#ECFFDE` | `#58CC02` |
| Қисман | `d--part` | `--c-yellow-soft` `#FCF8DC` | `#D9A621` |
| Қайтарилди | `d--rej` | `--c-pink-soft` `#FFE4EA` | `#ED0000` |
| Кўрилди, топширилмади | `d--view` | `--c-blue-soft` `#E8F6FE` | `#1CB0F6` |
| Бўш | (класссиз) | `--c-row` `#F8F8FC` | `#B4B4B4` |
| Келажак | `d--fut` | шаффоф, пунктир чегара `--c-line` | — |
| Бугун | `d--today` | чегара `--c-brand` 1.5px | ёзув апельсин |

## 4. Ҳаракатлар

| Элемент | Босиш зонаси | Нима қилади |
|---|---|---|
| `Kalendarni ochish` тугмаси | 273×44 | Пастки панелни очади (тўлиқ ой календари) |
| Кун катаги | 39×44 (устун кенглиги) | Шу кун танланади, пастки панел ўша кун тафсилоти билан очилади. Келажак кунлар босилмайди |
| Чип | босилмайди | Фақат маълумот |
| `Darsni davom ettirish` / `Darsni boshlash` | 273×44 | Курс экранига ўтади (маршрут) |
| `Vazifani ko'rish` | 273×44 | Қайтарилган вазифа экранига ўтади |
| `Qayta urinish` | 150×44 | Сўровни қайта юборади |

## 5. Пастки панеллар

Жами 10 та панел. Уч тури бор: **пастки панел** (пастдан чиқади), **тўлиқ экран** (календарь, вақт танлаш), **огоҳлантириш** (бир абзац матн ва тугма). Ёпиш: орқа фонга босиш, ✕ тугмаси ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Асосий тугма |
|---|---|---|---|---|
| `calendar` | тўлиқ экран | карточка: `normal`, `perfect-week`; панел: `day-full`, `day-part`, `day`, `day-view`, `day-empty`, `today`, `empty` | календарь, легенда | Bugungi kunni ochish |
| `day-full` | пастки панел | панел: `calendar` | рангли изоҳ | Darsni qayta ko'rish |
| `day-part` | пастки панел | панел: `calendar` | рангли изоҳ | Amaliy vazifani yuborish |
| `day` | пастки панел | карточка: `has-rejected`; панел: `calendar` | рангли изоҳ | Vazifani ko'rish |
| `day-view` | пастки панел | панел: `calendar` | рангли изоҳ | Testni boshlash |
| `day-empty` | пастки панел | панел: `calendar` | рангли изоҳ, бўш ҳолат | Bugungi kunni ochish |
| `today` | пастки панел | карточка: `today-empty`; панел: `calendar`, `day-empty` | рангли изоҳ | Darsni davom ettirish |
| `empty` | пастки панел | карточка: `empty-month` | рангли изоҳ, легенда, робот расми | Darsni boshlash |
| `month-loading` | тўлиқ экран | панел: `calendar` | календарь, рангли изоҳ | Yuklanmoqda |
| `error` | огоҳлантириш | карточка: `error` | матн | Qayta urinish |

### Панелларнинг тугмалари

- **`calendar`** (Faollik kalendari): «Bugungi kunni ochish» · «Yopish»
- **`day-full`** (3-sentabr, seshanba): «Darsni qayta ko'rish» · «Kalendarga qaytish»
- **`day-part`** (4-sentabr, chorshanba): «Amaliy vazifani yuborish» · «Kalendarga qaytish»
- **`day`** (5-sentabr, payshanba): «Vazifani ko'rish» · «Kalendarni ochish»
- **`day-view`** (6-sentabr, juma): «Testni boshlash» · «Kalendarga qaytish»
- **`day-empty`** (7-sentabr, shanba): «Bugungi kunni ochish» · «Kalendarga qaytish»
- **`today`** (Bugun — 8-sentabr, yakshanba): «Darsni davom ettirish» · «Kalendarni ochish»
- **`empty`** (Bu oyda faollik yo'q): «Darsni boshlash» · «Kalendarni ochish»
- **`month-loading`** (Faollik kalendari): «Yuklanmoqda» · «Yopish»
- **`error`** (Ma'lumotni olishning iloji bo'lmadi): «Qayta urinish» · «Keyinroq»

## 6. Расм ва иконкалар

| Файл | Қаерда |
|---|---|
| `images/robot3.png` | `empty-month` ҳолатида, ўнг пастда 72×72 |
| `icons/hourglass.svg` | `today-empty` ҳинт қаторида, апельсин |
| `icons/succes.svg` | `perfect-week` ҳинт қаторида, яшил |
| `icons/x.svg` | `has-rejected` ва `error` ҳолатларида, қизил |

Иконкалар CSS mask орқали рангланади: `<i class="ic ic--brand" style="--src:url(...)">`.

## 7. Flutter учун изоҳлар

- Карточка: `Container` (радиус 18, `BoxShadow`), карусел `PageView` ёки `ListView` + `SnapScrollPhysics`, кенглик 297, оралиқ 10, ён падинг 46.
- 7 кун қатори: `Row` + `MainAxisAlignment.spaceBetween`, ҳар кун `Column` (катак `Container` 26×26 радиус 9, ёзув `Text`).
- Ранглар ва шрифтлар `ThemeExtension` сифатида, `tokens.css` даги номлар билан бир хил сақлансин.
- Динамик: ой ёзуви, фаол кунлар сони, 7 куннинг ҳолати, ҳинт матни, тугма матни ва мақсади.
- Статик: катак ўлчами, ранг харитаси, легенда матни.
- Пастки панел: `showModalBottomSheet` (`isScrollControlled: true`), баландлик экраннинг 0.85 қисми.
