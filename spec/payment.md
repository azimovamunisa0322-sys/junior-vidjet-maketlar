# PaymentWidget — `payment`

Манба: `WIDGET-MAP.md` § 4.3, `APP-STYLE.md`, `design/css/tokens.css`, `design/css/card-base.css`. Макет: `design/cards/payment.html` (9 ҳолат, асосийси `days-left`).

## 1. Вазифаси

Ўқувчига кейинги тўлов **қачон** ва **қанча** эканини бир қарашда айтади ва бир босишда тўловга олиб боради. Муддат яқинлашгани (апельсин), ўтгани (пушти-қизил) ёки аккаунт музлатилгани (қулф) ранг билан ажралиб туради; тўлиқ матн, ҳавола, нусхалаш ва молия билан алоқа — пастки панелда.

## 2. Анатомия

Карточка: 297×171 pt, padding 12 → ички қути 273×147 pt, радиус 18 (`--r-card`), фон `--c-card #FFFFFF`, соя `--shadow-card`. Ички элементлар вертикал, оралиқ 8 pt (`gap`). Матн семантикаси: апельсин = бренд/яқин муддат, пушти-қизил = ўтган/музлатилган, сариқ = танга бонуси, кўк = маълумот (демо), slate = ноактив.

| Элемент | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|
| `.wcard__head` | 18 pt; сатр остида сана бўлса 35 pt (18 + 2 + 15) | — | — | чапда матн блоки, ўнгда чип |
| `.wcard__title` | 1 қатор | 15/600, lh 18, ls −0.1 | `--c-text #000000` | доим `To'lov` |
| `.wcard__sub` | 1 қатор, ≤ 30 белги | 12/500, lh 15 | default `--c-text-2 #999999`; `--brand #FF4F28` (1–3 кун, бугун); `--red #ED0000` (ўтган, музлатилган); `--blue #1CB0F6` (демо) | сана / ҳолат |
| `.wcard__chip` | баландлик 22, padding 0 8, pill | 12/600 | default фон `--c-row #F8F8FC` матн `#999999`; `--brand` фон `--c-brand-soft #FFEDE7` матн `#FF4F28`; `--pink` фон `--c-pink-soft #FFE4EA` матн `#ED0000`; `--yellow` фон `#FCF8DC`, чегара 1 pt `#E9BB36`, матн `#D9A621` | иконка 16 pt (`.ic` mask) ёки танга расми 14 pt; иконка–матн оралиғи 4 |
| `.wcard__body` | ≤ 52 pt (амалда 46) | — | — | флекс, `gap` 6 |
| `.wcard__num` (сумма) | 1 қатор, ≤ 14 белги | 20/600, lh 24, ls −0.3 | `#000000` | `450 000 so'm` — мингликлар бузилмас бўш жой билан |
| `.wcard__text.wcard__muted` (изоҳ) | 1 қатор | 13/500, lh 16 | `#999999` | ≤ 28 белги (робот бор бўлса ≤ 201 pt кенглик) |
| `.wcard__note` | 2 қатор, padding 8 10, радиус 12 → 46 pt | 12/500, lh 15 | `--pink` фон `#FFE4EA`; `--blue` фон `#E8F6FE`; матн `#000000` | ≤ 76 белги; `overdue`, `frozen`, `demo-only` да сумма ўрнига |
| `.pay-pr` | `padding-right: 72` | — | — | робот/соат бор ҳолатларда матн блокига қўйилади |
| `.wcard__foot` | 36 pt, `gap` 8 | — | — | 1 асосий тугма + 1 иккиламчи |
| `.wcard__btn` | баландлик 36, padding 0 14, радиус 12 | 13/600 | оқ матн, фон `#FF4F28`; `--ghost` фон `#F8F8FC` матн `#000000` | робот бор ҳолатда `--fit` (мазмун кенглигида, ≈ 98 pt), қолганларда тўлиқ кенглик |
| `.wcard__ibtn` + `.pay-i` | 32×32, радиус 10; ичида 16 pt доира «i», ҳалқа 1.5 pt | 11/600 | фон `#F8F8FC`, ҳалқа ва «i» `--c-slate #93A2C0` | иловада info иконкаси йўқ — матнли «i» |
| `.wcard__art` | 64×64 (роботлар) / 56×56 (`ta_time`) | — | — | `position: absolute; right: 8; bottom: 8`, `pointer-events: none` |

Баландлик йиғиндиси (ички 147 pt): `days-left`, `due-soon`, `due-today`, `bonus` → 35 + 8 + 46 + 8 + 36 = **133**; `overdue`, `frozen`, `demo-only` → 35 + 8 + 46 (note) + 8 + 36 = **133**; `loading` → 33 + 8 + 42 + 8 + 36 = **127**; `error` → 18 + 8 + 38 + 8 + 36 = **108**. Ҳамма ҳолатда ≥ 14 pt заҳира.

Кенглик (SF Pro метрикасидан ўлчанган, 273 pt қаторда): энг кенг сарлавҳа блоки + чип — `frozen`: 120 + 8 + 100 = 228; `overdue`: 95 + 8 + 115 = 218; RU да `Просрочено на 3 дня` чипи билан 259. Робот остидаги матн 201 pt дан кам: `To'lov muddati bugun tugaydi` 166, `Internetni tekshirib, qayta urining` 183, RU `Срок оплаты истекает сегодня` 183.

## 3. Ҳолатлар

Устувор тартиб (бир нечта шарт бажарилса): `frozen` → `demo-only` → `overdue` → `due-today` → `due-soon` → `bonus` → `days-left`. Юкланиш ва хато фақат кэшда маълумот бўлмаганда кўринади; қайта сўровда хато бўлса эски карточка қолади.

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `days-left` (асосий) | `state != 'frozen'`, `daysRemaining ≥ 4` | Кулранг чип `time` + «N kun qoldi»; сана кулранг; сумма + изоҳ; робот `robot.png` 64; `--fit` тугма + «i» | `To'lov` · `Muddat: 15 sentabr` · `7 kun qoldi` · `450 000 so'm` · `Keyingi to'lov summasi` · `To'lov qilish` | `Оплата` · `Срок: 15 сентября` · `Осталось 7 дней` · `450 000 сум` · `Сумма следующего платежа` · `Оплатить` |
| `due-soon` | `1 ≤ daysRemaining ≤ 3` | Чип ва сана апельсин (`--brand`); робот йўқ; тўлиқ тугма + «i» | `Muddat: 11 sentabr` · `3 kun qoldi` · `450 000 so'm` · `Keyingi to'lov summasi` · `To'lov qilish` | `Срок: 11 сентября` · `Осталось 3 дня` · `Сумма следующего платежа` · `Оплатить` |
| `due-today` | `daysRemaining == 0` | Апельсин чип `time` + «Bugun», сана апельсин; сумма; будильник `ta_time.png` 56; `--fit` тугма + «i» | `Muddat: 8 sentabr` · `Bugun` · `450 000 so'm` · `To'lov muddati bugun tugaydi` · `To'lov qilish` | `Срок: 8 сентября` · `Сегодня` · `Срок оплаты истекает сегодня` · `Оплатить` |
| `overdue` | `daysRemaining < 0`, `state != 'frozen'` (веб'да «-3 кун» бўлиб чиқарди) | Пушти чип `hourglass` + «N kun kechikdi», сана қизил; пушти изоҳ (сумма + кейинги қадам); робот йўқ; тўлиқ тугма + «i» | `Muddat: 5 sentabr` · `3 kun kechikdi` · `450 000 so'm to'lanmagan. Hisob muzlatilmasligi uchun bugun to'lang.` · `To'lov qilish` | `Срок: 5 сентября` · `Просрочено на 3 дня` · `Не оплачено 450 000 сум. Оплатите сегодня, чтобы аккаунт не заморозили.` · `Оплатить` |
| `frozen` | `state == 'frozen'` (`daysRemaining` эътиборсиз; бонус яширилади) | Пушти чип `lock` + «Muzlatilgan», сана қизил «o'tdi»; пушти изоҳда илованинг ўз сатри + сумма; тугма «To'lov qilish» (бренд, актив) + ghost «Bog'lanish» | `Muddat o'tdi: 5 sentabr` · `Muzlatilgan` · `Akkauntingiz to'lov qilinmaganligi sababli muzlatildi. To'lov: 450 000 so'm.` · `To'lov qilish` · `Bog'lanish` | `Срок истёк: 5 сентября` · `Заморожен` · `Ваш аккаунт заблокирован из-за неуплаты. К оплате: 450 000 сум.` · `Оплатить` · `Связаться` |
| `bonus` | `reward > 0`, `state != 'frozen'`, `daysRemaining ≥ 4` (1–3 кунда шошилинчлик устун, бонус панелда) | Сариқ чип `coin.png` + «+N coin» (илованинг «+30 coin» пилли); сана кулранг «N kun qoldi · sana»; сумма + изоҳ; робот `add_point.png` 64; `--fit` тугма + «i» | `7 kun qoldi · 15 sentabr` · `+30 coin` · `450 000 so'm` · `Muddatidan oldin to'lang` · `To'lov qilish` | `Осталось 7 дней · 15 сентября` · `+30 coin` · `Оплатите раньше срока` · `Оплатить` |
| `demo-only` | `demoOnly == true` | Сана ўрнида кўк «Demo hisob»; кулранг чип «N kun qoldi» (`daysRemaining` бўлса, бўлмаса чип йўқ); кўк изоҳ; тугма «Batafsil» (панелга) | `Demo hisob` · `7 kun qoldi` · `Demo hisobda onlayn to'lov yo'q. Yozilish uchun menejer bilan bog'laning.` · `Batafsil` | `Демо-аккаунт` · `Осталось 7 дней` · `В демо-аккаунте оплата недоступна. Для записи свяжитесь с менеджером.` · `Подробнее` |
| `loading` | биринчи сўров, кэш йўқ | `days-left` скелети: сарлавҳа 64×16, сана 104×12, чип 96×22, сумма 130×24, изоҳ 128×12, тугма 126×36, «i» 32×32; shimmer 1.2 с | — | — |
| `error` | сўров хато, кэш йўқ | Фақат сарлавҳа; хафа робот `robot4.png` 64; қалин «Yuklab bo'lmadi» + кулранг сабаб; ghost «Qayta urinish» | `To'lov` · `Yuklab bo'lmadi` · `Internetni tekshirib, qayta urining` · `Qayta urinish` | `Оплата` · `Не удалось загрузить` · `Проверьте интернет и повторите` · `Повторить` |

Алоҳида карточка талаб қилмайдиган вариантлар:

- `daysRemaining == null` ва `dueDate` бор → кун Тошкент вақти (UTC+5) бўйича ҳисобланади; иккаласи йўқ → чип ва сана яширилади, сарлавҳа бир қаторли, қолгани `days-left` каби. Веб'даги «bir necha kun» сўзи ишлатилмайди.
- `dueDate` нотўғри форматда → `null` деб қабул қилинади (веб'да `RangeError` билан бутун виджет қулаган).
- `amount ≤ 0` ёки йўқ → сумма қатори ўрнида битта қатор `Keyingi to'lov` (13/500 `#999999`); панелда ҳам сумма қатори яширилади.
- `due-today` + `reward` → карточкада «Bugun» (шошилинчлик устун), бонус панелда «+30 coin» сатри билан.
- Кўплик: UZ да «kun» ўзгармайди; RU да `дней/дня/день` — `intl` plural (веб'даги `{days} дн.` бузилиши такрорланмайди).

## 4. Ҳаракатлар

Ҳамма босиш зонаси ≥ 44 pt (кўринувчи ўлчам кичик бўлса, ноинвазив padding билан кенгайтирилади).

| Элемент | Кўринувчи ўлчам | Ҳаракат | Нима очади |
|---|---|---|---|
| Карточка сирти (чип, сана, сумма, изоҳ) | 297×171 | tap | Тўлов пастки панели (§ 5). `loading` да ҳеч нарса; `error` да «Qayta urinish» билан бир хил |
| `To'lov qilish` | 36 pt (fit ≈ 98 pt ёки тўлиқ) → hit 44 | tap | `actionUrl` бор → пастки панел, ундаги асосий тугма илова ичидаги браузерни очади; `actionUrl` йўқ → панел «Moliya bilan bog'laning» тармоғи билан. Тугма ҳеч қачон бўш экран очмайди |
| «i» (`.wcard__ibtn`) | 32×32 → hit 44×44 | tap | Худди карточка сирти — тафсилот панели |
| `Bog'lanish` (фақат `frozen`) | 36 × ≈ 90 → hit 44 | tap | Панелнинг «Moliya bo'limi» қисми: телефон (`tel:`) ва Telegram ҳаволаси (алоқа маълумоти бэкенддан — очиқ савол) |
| `Batafsil` (фақат `demo-only`) | 36 × тўлиқ | tap | Демо панели: робот + тўлиқ матн + «Tushunarli» |
| `Qayta urinish` (`error`) | 36 × ≈ 107 → hit 44 | tap | Қайта сўров; карточка `loading` скелетига ўтади, муваффақиятда ҳолатга, хатода яна `error` + toast `Xatolik yuz berdi` |
| Ташқи браузердан қайтиш | — | `AppLifecycleState.resumed` | Тўлов қайта сўралади; `payment == null` бўлса карточка анимация билан каруселдан чиқади, toast `To'lov qabul qilindi`; очиқ панел ўзи ёпилади |

Ҳолат ўзгариши (масалан `due-soon` → `due-today`) фақат маълумот янгиланганда, бармоқ остида карточка силжимайди; чип матни ярим тунда ўз-ўзидан алмашмайди (кейинги сўровда).

## 5. Пастки панеллар

Жами 10 та панел. Уч тури бор: **пастки панел** (пастдан чиқади), **тўлиқ экран** (календарь, вақт танлаш), **огоҳлантириш** (бир абзац матн ва тугма). Ёпиш: орқа фонга босиш, ✕ тугмаси ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Асосий тугма |
|---|---|---|---|---|
| `details` | пастки панел | карточка: `days-left`, `due-soon` | сумма, маълумот қаторлари, рўйхат, рангли изоҳ | To'lovga o'tish |
| `due-today` | пастки панел | карточка: `due-today` | сумма, маълумот қаторлари, рўйхат, рангли изоҳ | To'lovga o'tish |
| `overdue` | пастки панел | карточка: `overdue` | сумма, маълумот қаторлари, рангли изоҳ | To'lovga o'tish |
| `frozen` | пастки панел | карточка: `frozen` | сумма, маълумот қаторлари, рўйхат, рангли изоҳ | To'lovga o'tish |
| `bonus` | пастки панел | карточка: `bonus` | сумма, маълумот қаторлари, рангли изоҳ | To'lovga o'tish |
| `demo` | пастки панел | карточка: `demo-only` | маълумот қаторлари, рангли изоҳ | Menejer bilan bog'lanish |
| `qr` | пастки панел | панел: `details`, `due-today` | маълумот қаторлари, рангли изоҳ | Havolani nusxalash |
| `contact` | пастки панел | карточка: `frozen`; панел: `overdue`, `frozen`, `demo`, `no-link`, `error` | рўйхат, рангли изоҳ | Qo'ng'iroq qilish |
| `no-link` | огоҳлантириш | **фақат кўриб чиқиш рўйхатидан** | матн | Moliya bo'limi bilan bog'lanish |
| `error` | огоҳлантириш | карточка: `error` | матн | Qayta urinish |

### Панелларнинг тугмалари

- **`details`** (To'lov): «To'lovga o'tish» · «Havolani nusxalash»
- **`due-today`** (To'lov): «To'lovga o'tish» · «Havolani nusxalash»
- **`overdue`** (To'lov muddati o'tdi): «To'lovga o'tish» · «Moliya bo'limi bilan bog'lanish»
- **`frozen`** (Akkaunt muzlatilgan): «To'lovga o'tish» · «Moliya bo'limi bilan bog'lanish»
- **`bonus`** (Muddatidan oldin to'lang): «To'lovga o'tish» · «Havolani nusxalash»
- **`demo`** (Demo hisob): «Menejer bilan bog'lanish» · «Tushunarli»
- **`qr`** (Boshqa qurilmadan to'lash): «Havolani nusxalash» · «Yopish»
- **`contact`** (Bog'lanish): «Qo'ng'iroq qilish» · «Yopish»
- **`no-link`** (To'lov havolasi hozircha yo'q): «Moliya bo'limi bilan bog'lanish» · «Yopish»
- **`error`** (To'lov ma'lumoti yuklanmadi): «Qayta urinish» · «Moliya bo'limi bilan bog'lanish»

## 6. Расмлар ва иконкалар

| Файл | Қаерда | Ўлчам | Изоҳ |
|---|---|---|---|
| `images/robot.png` | `days-left` | 64 | тинч, нейтрал маскот |
| `images/add_point.png` | `bonus` | 64 | танга кўтарган робот = бонус |
| `images/ta_time.png` | `due-today` | 56 | будильник = «бугун»; апельсин ранги бренд билан мос |
| `images/robot4.png` | `error` | 64 | хафа робот |
| `images/coin.png` | `bonus` чипи ичида | 14 | илованинг «+30 coin» пиллидаги танга |
| `icons/time.svg` | `days-left`, `due-soon`, `due-today`, `demo-only` чипи | 16 | mask: slate `#93A2C0` (кулранг чип) / `#FF4F28` (апельсин чип) |
| `icons/hourglass.svg` | `overdue` чипи | 16 | mask `#ED0000` |
| `icons/lock.svg` | `frozen` чипи | 16 | mask `#ED0000` |
| «i» матн глифи | `.wcard__ibtn` | 16 доира | иловада `info` иконкаси йўқ; 1.5 pt slate ҳалқа |

Веб'даги `robo-coin.png`, `chevron-right.svg`, `info.svg`, antd QR ишлатилмайди. `overdue`, `frozen`, `demo-only` да робот йўқ (изоҳ блоки кенг). Веб'нинг «ҳамма изоҳ сариқ» қоидаси ташланди: сариқ фақат танга бонусида.

## 7. Flutter учун изоҳлар

- **Тузилиш:** `SizedBox(297×171)` → `DecoratedBox` (радиус 18, соя `0 6 18 rgba(28,39,76,.06)`) → `Padding(12)` → `Stack` [ `Column` (head `Row`, `Expanded(body)`, foot `Row`), `Positioned(right: 8, bottom: 8, child: IgnorePointer(Image.asset))` ]. Робот бор ҳолатда body матнига `Padding(right: 72)`.
- **Токенлар:** `ThemeExtension<JuniorTokens>` — ранглар (`brand #FF4F28`, `brandSoft #FFEDE7`, `pinkSoft #FFE4EA`, `red #ED0000`, `yellowSoft #FCF8DC`, `yellowBorder #E9BB36`, `yellowText #D9A621`, `blue #1CB0F6`, `blueSoft #E8F6FE`, `row #F8F8FC`, `text2 #999999`, `slate #93A2C0`), радиуслар (18/12/10/pill), матн стиллари `TextStyle(fontFamily: 'SFpro', fontSize, fontWeight, height: lh/size)`: title 15/600 h1.2, sub 12/500 h1.25, body 13/500 h1.23, num 20/600 h1.2, btn 13/600.
- **Ҳолат:** `enum PaymentCardState { daysLeft, dueSoon, dueToday, overdue, frozen, bonus, demoOnly, loading, error }` — `payment` объектидан соф функция билан (§ 3 устуворлик); виджет фақат `state` + `PaymentVm(amount, dueDate, days, coins)` олади. Кун ҳисоби Тошкент (`UTC+5` қаттиқ) бўйича, `dueDate` парс хатоси → `null`.
- **Динамик:** кун сони, сана (`d MMMM`, ой номлари илова луғатидан, бош ҳарф билан), сумма (`NumberFormat('#,##0', 'uz')` → ажратгич ` ` га алмаштирилади + ` so'm`), бонус сони, RU кўплиги `Intl.plural`.
- **Чип:** `Container` (height 22, pill, `border` фақат сариқда) + `SvgPicture.asset(colorFilter: ColorFilter.mode(color, BlendMode.srcIn))` — CSS mask эквиваленти; танга `Image.asset(coin, 14)`.
- **Тугмалар:** `FilledButton` (36 pt, radius 12, `tapTargetSize: MaterialTapTargetSize.padded` → 48) ёки ўз `InkWell`; ghost — `FilledButton.tonal` фонни `row` га алмаштириб; «i» — `InkResponse(radius: 22)` устида 32 pt `DecoratedBox`. Карточка сирти `InkWell` — `Semantics(button: true, label: 'To'lov, 7 kun qoldi, 450 000 so'm')`.
- **Скелет:** `shimmer` пакети ёки `AnimationController` градиенти 1.2 с, блоклар § 3 ўлчамларида; `error` да `Qayta urinish` refetch чақиради.
- **Матн масштаби:** карточка ичида `MediaQuery.textScalerOf(context).clamp(maxScaleFactor: 1.2)`; сумма `FittedBox(fit: BoxFit.scaleDown)`; сана ва чип `overflow: TextOverflow.ellipsis, maxLines: 1`.
- **Янгилаш:** 60 с + `resumed`; скелет фақат биринчи юклашда; қайта сўров хатосида эски маълумот қолади (`error` карточкаси фақат кэш йўқ бўлганда).
- **Пастки панел:** `showModalBottomSheet(isScrollControlled: true, useSafeArea: true)`; панел очилганда `payment` snapshot; Android back / свайп ёпади.
