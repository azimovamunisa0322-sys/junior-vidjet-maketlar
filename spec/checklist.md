# DailyChecklistWidget — `checklist` («Kunlik vazifalar»)

Файллар: карточка `design/cards/checklist.html`, токенлар `design/css/tokens.css`, умумий синфлар `design/css/card-base.css`.
Манба: веб компонент архивда йўқ (`components/Streak/DailyChecklistWidget`), шунинг учун дизайн иловадаги мавжуд «Kunlik vazifalar» карточкаси (`APP-STYLE.md`) ва бэкенд майдонлари (`groups[]`, `pending_rewards[]`, `reward.state`, `active`) асосида чизилган.

## 1. Вазифаси

Талабага **ҳозир қайси вазифани бажариши кераклигини** бир қарашда кўрсатади: карточканинг қаҳрамони — вазифанинг ўзи (номи ва тури), унинг ёнида мукофот (`+30 coin`), тепада қанча вақт қолгани ва `N/3` ҳисоблагичи, пастда битта тугма. Тугма кейинги вазифага олиб боради ёки тайёр мукофотни олдиради; курслар бўйича тўлиқ рўйхат карточкага сиғмайди ва пастки панелга кўчирилган.

Карусел контекстидаги қарор: «Kunlik vazifalar» энди катта сарлавҳа эмас — у бренд рангидаги кичик ЁРЛИҚ, шунинг учун виджет каруселда дарҳол танилади, ажралиб туради, асосий жойни эса вазифа блоки эгаллайди.

## 2. Анатомия

Карточка: 297×171 pt, ички padding 12 → ички қути 273×147 pt, радиус 18 (`--r-card`), фон `--c-card` `#FFFFFF`, соя `--shadow-card`. Ички блоклар вертикал устун, оралиқ 8 pt (`--s-2`). Тана ичида оралиқ 6 pt ва `justify-content: center`. Бутун карточка босилади (пастки панел очади).

| Элемент | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|
| `.wcard__head` | баландлиги 22 pt (чип бўйича), `align-items: center` | — | — | чапда ёрлиқ блоки, ўнгда чип ёки «i» тугма, оралиқ 8 |
| `.ck-eyebrow` | флекс қатор, оралиқ 6, `min-width: 0` | — | — | ёрлиқ + нуқта + вақт; сиғмаса вақт `…` билан кесилади |
| `.ck-eyebrow b` «KUNLIK VAZIFALAR» | 1 қатор, 14 pt, кенглиги 111 pt | 11/600, `letter-spacing .6`, `text-transform: uppercase` | `--c-brand` `#FF4F28` | сарлавҳа эмас — бренд ёрлиғи; матн манбада «Kunlik vazifalar», катта ҳарф CSS/код орқали |
| `.ck-dot` ажратгич | 3×3 доира | — | `--c-line` `#DDE1EB` | ёрлиқ билан вақт орасида; `no-tasks` ва `error` да йўқ |
| `.ck-eyebrow span` вақт | 1 қатор, 14 pt, эллипсис | `--t-tiny` 11/500 | `--c-text-2` `#999999` | «7 soat qoldi» — иловадаги идиома, соат аниқлигида |
| `.ck-eyebrow span.ck-red` | ўша | 11/**600** | `--c-red` `#ED0000` | ≤ 2 соат қолганда (`due-soon`) |
| `.wcard__chip` — ҳисоблагич «N/3» | 22 pt, padding 0 8, pill, 1 pt шаффоф чегара | 12/600 | `0/3` → фон `--c-row` `#F8F8FC`, матн `--c-text-2` `#999999`; `1/3`, `2/3` → `--chip--brand`: фон `--c-brand-soft` `#FFEDE7`, матн `--c-brand` `#FF4F28`; `3/3` → `--chip--green`: фон `--c-green-soft` `#ECFFDE`, матн `--c-green-2` `#58CC02` | ранг қоидаси: бошланмаган = кулранг, жараёнда = апельсин (фаол), тугалланган = яшил |
| `.wcard__ibtn.ck-i` «i» | 32×32, радиус 10 | `--t-title` 15/600 | фон `--c-row`, матн `--c-slate` `#93A2C0` | фақат `no-tasks` да, тушунтириш очади |
| `.wcard__body` | `flex: 1`, оралиқ 6, `justify-content: center` | — | — | вазифа блоки + прогресс |
| **`.ck-hero` — вазифа блоки** | баландлиги **57 pt** (9 + 24 + 15 + 9), радиус 12 (`--r-inner`), padding `9 10 9 13` | — | фон `--c-brand-soft` `#FFEDE7`; чап чекка чизиғи `box-shadow: inset 3px 0 0` `--c-brand` `#FF4F28` | карточканинг қаҳрамони; чапда матн устуни, ўнгда чип ёки иконка (оралиқ 8) |
| `.ck-hero__name` вазифа номи | 1 қатор 24 pt, эллипсис; устун кенглиги **182 pt** (тангали чип билан), 218 pt (`checking.svg` билан), 216 pt (`coin.png` билан) | `--t-num` 20/600, `letter-spacing −0.3` | `--c-text` `#000000` | ҳозирги (биринчи бажарилмаган) вазифа номи |
| `.ck-hero__kind` тури | 1 қатор 15 pt, эллипсис | `--t-small` 12/500 | `--c-brand` `#FF4F28`; кўк вариантда `--c-blue` `#1CB0F6`, яшилда `--c-green-2` `#58CC02` | «Amaliy vazifa · 20 daqiqa» — тури ва тахминий давомийлиги |
| `.ck-hero--blue` | ўша ўлчам | — | фон `--c-blue-soft` `#E8F6FE`, чизиқ `--c-blue` `#1CB0F6` | `awaiting-check` |
| `.ck-hero--green` | ўша ўлчам | — | фон `--c-green-soft` `#ECFFDE`, чизиқ `--c-green-2` `#58CC02` | `reward-ready`, `claimed` |
| Танга чипи `.wcard__chip--yellow` (hero ичида) | 22×60 pt | 12/600 | **фон `--c-card` `#FFFFFF`** (hero фонида ажралиб турсин), чегара `--c-yellow-2` `#E9BB36`, матн `--c-yellow-text` `#D9A621`, ичида `coin.png` 14 pt; яшил heroда чегара ва матн `--c-green-2` `#58CC02` | «+30» — иловадаги пилл; hero ичида фон оқ, каруселнинг бошқа жойидагидан фарқли |
| `.wcard__progress` | 6 pt, радиус 3, тўлиқ кенглик 273 | — | трек `--c-line-2` `#F0F0F0`, тўлдириш `--c-brand` `#FF4F28`; `--green` вариантда `--c-green` `#0CD678` | уч нуқтали степпер ўрнига; кенглик = `done/total` (0 / 33.3 % / 66.6 % / 100 %) |
| `.wcard__note` | 46 pt (2 қатор), padding 8/10, радиус 12 | 12/500 | одатий `--c-row` `#F8F8FC`; хатода `--note--pink` `--c-pink-soft` `#FFE4EA` + `x.svg` 16 pt `--c-red` | фақат `no-tasks` ва `error` да (буларда hero йўқ) |
| `.wcard__foot` | 36 pt (hint бўлса 14 pt) | — | — | пастга ёпишган (`margin-top: auto`) |
| `.wcard__btn` | 36 pt, радиус 12, padding 0 14, тўлиқ кенглик | 13/600 | `--c-brand` фон, оқ матн; `--ghost`: `--c-row` фон, `--c-text` матн | матн + `arrow_right.svg` 16 pt оқ; `--fit` — фақат `no-tasks` да |
| `.wcard__hint` | 14 pt | 11/500 | `--c-text-2`, иконка 12 pt | тугма ўрнига сабаб: «Tekshiruv tugagach +30 coin beriladi», «Ertaga yangi vazifalar bo'ladi» |
| `.wcard__art--bottom` робот | 56×56, ўнгдан 8, пастдан 8 | — | — | фақат `no-tasks` да; бошқа ҳолатларда карточкада робот йўқ — жойни вазифа блоки эгаллайди |

Баландлик ҳисоби. Асосий ҳолатлар (`not-started`, `in-progress`, `due-soon`, `reward-ready`, `loading`): 12 + 22 (бош) + 8 + **69** (тана: hero 57 + 6 + прогресс 6) + 8 + 36 (тугма) + 12 = **167**; `.wcard__body` `flex: 1` бўлгани учун тана 69 → 73 га чўзилади ва `justify-content: center` билан тепа-пастдан 2 pt бўшлиқ қолдиради — жами аниқ 171. Hintли ҳолатлар (`awaiting-check`, `claimed`): 12 + 22 + 8 + 69 + 8 + 14 + 12 = **145**, ортиқча 26 pt танага тушади. `no-tasks`: 12 + 32 + 8 + 46 + 8 + 36 + 12 = **154**. `error`: 12 + 14 + 8 + 46 + 8 + 36 + 12 = **136**. Ҳаммаси лимит ичида, ҳеч бири тошмайди.

Олиб ташланганлар (эски версиядан): уч нуқтали қадам индикатори `.ck-steps` / `.ck-step` / `.ck-track` ва улардаги `circle.svg`; катта сарлавҳа `.wcard__title` ва унинг остидаги `.wcard__sub`; бир қаторли `.ck-cap` сарлавҳача; `robot2`, `add_point`, `robot7` роботлари. `.ck-art-pad` (робот остидаги 72 pt padding) CSS'да қолган, лекин ҳозирча ишлатилмайди.

Матн узунлиги (SF Pro файллари билан ўлчанган, pt). Бош қатор: ёрлиқ `KUNLIK VAZIFALAR` 111 + нуқта ва оралиқлар 15 + вақт `7 soat qoldi` 53 + 8 + чип `0/3` 39 = **226 ≤ 273** (47 pt заҳира). RU'да `ЕЖЕДНЕВНЫЕ ЗАДАНИЯ` 143 pt — тўлиқ сатр 293 pt га чиқади ва вақт кесилади, шунинг учун RU ёрлиғи **`ЗАДАНИЯ ДНЯ`** (86 pt, сатр 236 pt). Вазифа номи 20/600 устунда 182 pt: `Blockly Dasturlash` 165, `Grafik dizayn` 117, `+30 coin olindi` 132, `Barakalla!` 88 — сиғади; RU `Графический дизайн` 199 pt `in-progress` да `…` билан кесилади (`awaiting-check` да 218 pt устунга сиғади), узун курс номлари ҳам кесилади — кутилган хатти-ҳаракат, тўлиқ ном пастки панелда. Тури 12/500: `Amaliy vazifa · oxirgisi qoldi` 144, RU `Домашнее задание · 15 минут` 162, `Практика · осталась последняя` 171 — ҳаммаси 182 га сиғади.

## 3. Ҳолатлар

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `not-started` | `groups` бор, бажарилгани 0, `reward.state` ≠ ready/claimed | чип кулранг `0/3`; бренд hero — биринчи вазифа номи ва тури, ўнгда сариқ `+30` чипи; прогресс бўш (фақат трек); тўлиқ кенгликдаги апельсин тугма | ёрлиқ «Kunlik vazifalar» · «7 soat qoldi» · «0/3» · «Blockly Dasturlash» / «Amaliy vazifa · 20 daqiqa» · «Boshlash» | «ЗАДАНИЯ ДНЯ» · «Осталось 7 часов» · «0/3» · «Blockly Dasturlash» / «Практика · 20 минут» · «Начать» |
| `in-progress` **(primary)** | 1–2 вазифа бажарилган, > 2 соат қолган | чип апельсин `1/3`; бренд hero — кейинги бажарилмаган вазифа; прогресс 33 % апельсин; тўлиқ кенгликдаги тугма | «7 soat qoldi» · «1/3» · «Grafik dizayn» / «Uy vazifasi · 15 daqiqa» · «Davom etish» | «Осталось 7 часов» · «1/3» · «Графический дизайн» (182 pt га сиғмайди — `…`) / «Домашнее задание · 15 минут» · «Продолжить» |
| `due-soon` | бажарилмаган вазифа бор ва ≤ 2 соат қолган | `in-progress` билан бир хил, фақат ёрлиқдаги вақт қизил ва қалин (`.ck-red`); прогресс 66 % | «1 soat qoldi» · «2/3» · «Blockly Dasturlash» / «Amaliy vazifa · oxirgisi qoldi» · «Davom etish» | «Остался 1 час» · «2/3» · «Blockly Dasturlash» / «Практика · осталась последняя» · «Продолжить» |
| `awaiting-check` | ҳамма вазифа юборилган, лекин камида бири текширувда (`checking`), бажарилмагани йўқ | hero кўк (`--blue`), ўнгда танга ўрнига `checking.svg` 24 pt; прогресс 66 % апельсин; тугма йўқ — сабаб hint да (`hourglass.svg` кўк) | «7 soat qoldi» · «2/3» · «Grafik dizayn» / «Vazifangiz tekshirilmoqda» · hint «Tekshiruv tugagach +30 coin beriladi» | «Осталось 7 часов» · «2/3» · «Grafik dizayn» / «Задание проверяется» · «Монеты начислятся после проверки» |
| `reward-ready` | 3/3 бажарилган, `reward.state = ready` (ёки `pending_rewards.length > 0`) | чип яшил `3/3`; hero яшил (`--green`) — табрик матни, ўнгда сариқ `+30` чипи яшил чегара ва матн билан; прогресс 100 % яшил `#0CD678`; тугма «Mukofotni olish» | «Bugun» · «3/3» · «Barakalla!» / «Barcha vazifalar bajarildi» · «Mukofotni olish» | «Сегодня» · «3/3» · «Молодец!» / «Все задания выполнены» · «Получить награду» |
| `claimed` | `reward.state = claimed` | hero яшил, ўнгда `coin.png` 26 pt; прогресс 100 % яшил; тугма йўқ, hint (`check.svg` 12 pt) | «Bugun» · «3/3» · «+30 coin olindi» / «Coinlar hisobingizga qo'shildi» · hint «Ertaga yangi vazifalar bo'ladi» | «Сегодня» · «3/3» · «+30 coin получено» / «Монеты зачислены на счёт» · «Завтра будут новые задания» |
| `no-tasks` | `groups` бўш, мукофот йўқ, лекин `active` (карточка чиқади) | ёрлиқда вақт йўқ; ўнгда «i» тугма; hero ўрнида кулранг изоҳ; робот `notification_empty` 56 pt; `--fit` тугма | «Kunlik vazifalar mavjud emas. Kurs boshlangach vazifalar shu yerda chiqadi.» · «Kurslarni ko'rish» | «Ежедневных заданий пока нет. Когда начнётся курс, задания появятся здесь.» · «Смотреть курсы» |
| `loading` | сўров кетмоқда, олдинги маълумот йўқ | `wcard--skeleton`: ёрлиқ сатри 132 pt, чип 38×22, `sk--hero` 57 pt (радиус 12), `sk--bar` 6 pt, тугма тўлиқ кенглик | — | — |
| `error` | сўров хато берди, кэш йўқ | ёрлиқ (вақтсиз) + пушти изоҳ (`x.svg` қизил) + ghost тугма | «Yuklab bo'lmadi. Internetni tekshirib, qayta urinib ko'ring.» · «Qayta urinish» | «Не удалось загрузить. Проверьте интернет и попробуйте ещё раз.» · «Повторить попытку» |

Қоидалар: hero ҳар доим **ҳозирги** вазифани кўрсатади — биринчи бажарилмаган `group`, ҳаммаси бажарилса натижа/мукофот матни; чип ҳар доим `N/3` ҳисоблагич (вақт чипга чиқмайди); вақт фақат ёрлиқда, ≤ 2 соатда қизил; кечаги маълумот бўлса `loading` ўрнига эски ҳолат кўрсатилиб, фонда янгиланади; вазифалар сони 3 бўлмаса (`groups.length` 1–5) чип `N/M` бўлади ва прогресс `done/total` бўйича ҳисобланади — степпер олиб ташлангани учун доиралар сонини мослаш керак эмас.

## 4. Ҳаракатлар

Ҳамма босиш зонаси ≥ 44 pt: 36 pt тугмаларга вертикал 4 pt hit-slop, 32 pt «i» тугмага 6 pt.

| Элемент | Ҳолатлар | Нима бўлади |
|---|---|---|
| Бутун карточка (тугмалардан ташқари) | ҳаммаси, `loading` дан бошқа | пастки панел (5-бўлим) |
| «Boshlash» / «Davom etish» | `not-started`, `in-progress`, `due-soon` | route: heroда кўрсатилган вазифанинг экрани (курс → дарс → «Amaliyot» ёки «Uy vazifasi»). Қайтганда чеклист қайта сўралади |
| «Mukofotni olish» | `reward-ready` | POST claim; тугмада спиннер, иккинчи босиш блокланади; муваффақият → `claimed` + toast «+30 coin» + баннердаги танга ҳисоблагичи янгиланади; хато → toast «Mukofotni olib bo'lmadi. Qayta urinib ko'ring», тугма қайта фаол |
| «Kurslarni ko'rish» | `no-tasks` | route: «Kurslar» экрани («Mening kurslarim»; курс йўқ бўлса «Mos kurslarni ko'rish») |
| «Qayta urinish» | `error` | қайта сўров, карточка `loading` га ўтади |
| «i» | `no-tasks` | оддий огоҳлантириш (компакт варақ): «Kunlik vazifalar» + иловадаги матн «Bugungi vazifalaringiz va ularning bajarilish holatini shu kartada kuzatishingiz mumkin.» + «Tushunarli» |
| Ёрлиқ, вақт, чип, вазифа блоки, прогресс, танга чипи, hint | — | алоҳида босилмайди — карточка босилиши ҳисобланади (вазифа блокини алоҳида босиладиган қилиш керак эмас: тугма ўша вазифага олиб боради) |

## 5. Пастки панеллар

Жами 8 та панел. Уч тури бор: **пастки панел** (пастдан чиқади), **тўлиқ экран** (календарь, вақт танлаш), **огоҳлантириш** (бир абзац матн ва тугма). Ёпиш: орқа фонга босиш, ✕ тугмаси ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Асосий тугма |
|---|---|---|---|---|
| `tasks` | пастки панел | карточка: `not-started`, `in-progress` | маълумот қаторлари, рўйхат, рангли изоҳ | Davom etish |
| `due-soon` | пастки панел | карточка: `due-soon` | рўйхат, рангли изоҳ | Davom etish |
| `checking` | пастки панел | карточка: `awaiting-check` (hint босилади) | рўйхат, рангли изоҳ | Vazifani ko'rish |
| `reward` | пастки панел | карточка: `reward-ready` | маълумот қаторлари, рангли изоҳ, робот расми | Mukofotni olish |
| `claimed` | пастки панел | карточка: `claimed`; панел: `reward` | маълумот қаторлари, рангли изоҳ, робот расми | Coinlar tarixi |
| `empty` | пастки панел | карточка: `no-tasks` | маълумот қаторлари, рангли изоҳ, робот расми | Mening kurslarim |
| `about` | огоҳлантириш | карточка: `no-tasks` | матн | Tushunarli |
| `error` | огоҳлантириш | карточка: `error` | матн | Qayta urinish |

Панелларда вазифаларнинг **тўлиқ рўйхати** ва кесилмаган номлари бор — карточкадаги hero фақат биттасини кўрсатади.

### Панелларнинг тугмалари

- **`tasks`** (Kunlik vazifalar): «Davom etish» · «Yopish»
- **`due-soon`** (Kunlik vazifalar): «Davom etish» · «Yopish»
- **`checking`** (Vazifangiz tekshirilmoqda): «Vazifani ko'rish» · «Yopish»
- **`reward`** (Barcha vazifalar bajarildi): «Mukofotni olish» · «Yopish»
- **`claimed`** (+30 coin olindi): «Coinlar tarixi» · «Yopish»
- **`empty`** (Kunlik vazifalar mavjud emas): «Mening kurslarim» · «Yopish»
- **`about`** (Kunlik vazifalar): «Tushunarli»
- **`error`** (Kunlik vazifalar yuklanmadi): «Qayta urinish» · «Keyinroq»

## 6. Расмлар ва иконкалар

| Файл | Қаерда | Ўлчам |
|---|---|---|
| `icons/arrow_right.svg` | ҳар бир асосий тугмада, матндан кейин; маска `#FFFFFF` (`.ic--white`) | 16 pt |
| `icons/checking.svg` | `awaiting-check` — кўк heroнинг ўнг чеккасида (`<img>`, кўк диск `#DEF4FF` + ёй `#199EDD`) | 24 pt |
| `icons/hourglass.svg` | `awaiting-check` hint, маска `--c-blue` `#1CB0F6` | 12 pt |
| `icons/check.svg` | `claimed` hint иконкаси (`<img>`) | 12 pt |
| `icons/x.svg` | `error` изоҳи, маска `--c-red` `#ED0000` | 16 pt |
| `images/coin.png` | сариқ чип ичида (14) ва `claimed` heroнинг ўнг чеккасида (26) | 14 / 26 pt |
| `images/notification_empty.png` | `no-tasks` (қўлини очган) | 56 pt — изоҳ блоки билан тегишмаслиги учун 64 эмас, 56 |

`check.svg` ичида яшил диск бор, шунинг учун у маска сифатида эмас, тўғридан-тўғри `<img>` сифатида ишлатилади (маска қилинса бутун диск бўялади); шу сабаб `checking.svg` ҳам `<img>`. Роботлар (`robot2`, `add_point`, `robot7`) карточкадан олиб ташланди — уларнинг жойини вазифа блоки эгаллади; `add_point` (`reward` панели) ва `robot7` (`claimed` панели) пастки панелларда қолди, `robot2` эса бу виджетда умуман ишлатилмайди. `circle.svg` бу карточкада энди ишлатилмайди (степпер билан бирга кетди).

## 7. Flutter учун изоҳлар

- Карточка: `Container` (`BoxDecoration`: радиус 18, соя `0 6 18 rgba(28,39,76,.06)`, оқ фон) → `Padding(12)` → `Stack` (робот фақат `no-tasks` да: `Positioned(right: 8, bottom: 8)`) → `Column` (`crossAxisAlignment.stretch`, оралиқ 8 `SizedBox`). Ўлчам ота каруселдан келади (297×171); тана `Expanded` (ичида `MainAxisAlignment.center`), футер пастда.
- Ёрлиқ: `Row(gap 6)` → `Text(l10n.dailyTasks.toUpperCase(), style: 11/w600, letterSpacing: .6, color: brand)` + `Container(3×3, shape: circle, color: line)` + `Flexible(Text(timeLeft, overflow: ellipsis, style: 11/w500))`. Вақт қизил бўлганда `w600` + `red`. RU'да ёрлиқ `ЗАДАНИЯ ДНЯ` (тўлиқ «ЕЖЕДНЕВНЫЕ ЗАДАНИЯ» сатрга сиғмайди).
- Чип: `Container` (баландлик 22, `StadiumBorder`, `horizontal padding: 8`). Ранги учун `enum ChecklistProgress { none, partial, complete }` → токен мапи.
- **Вазифа блоки (hero)**: чап чекка чизиғи CSS'да `inset box-shadow`, Flutter'да эса `BoxDecoration` радиус билан бир текис бўлмаган чегарага рухсат бермайди — шунинг учун `ClipRRect(borderRadius: 12)` → `Row[ Container(width: 3, color: accent), Expanded(Container(color: soft, padding: EdgeInsets.fromLTRB(10, 9, 10, 9), child: Row[Expanded(Column[name, kind]), SizedBox(8), trailing])) ]`. Баландлиги матндан келиб чиқади (24 + 15 + 18 = 57) — қаттиқ баландлик қўйилмайди. `accent`/`soft`/`kind` ранглари учун `enum ChecklistHeroTone { brand, blue, green }`.
- Ном ва тури: `Text(maxLines: 1, overflow: TextOverflow.ellipsis)`; ном `20/w600, letterSpacing: -.3`, тури `12/w500` тонга мос рангда.
- Танга чипи hero ичида: фони `--c-card` (оқ), чегараси `--c-yellow-2`, матни `--c-yellow-text`; яшил heroда чегара ва матн `--c-green-2`. `Image.asset('coin.png', width: 14)` + `Text('+30')`.
- Прогресс: `ClipRRect(borderRadius: 3)` → `LinearProgressIndicator(minHeight: 6, value: done / total, backgroundColor: line2, color: brand)`; 3/3 да `color: green` `#0CD678`. `value` ни `AnimatedBuilder`/`TweenAnimationBuilder` билан 250 мс да юмшоқ ўзгартириш мумкин.
- Тугма: `FilledButton` (`minimumSize: Size(0, 36)`, `shape: RoundedRectangleBorder(12)`, `tapTargetSize: MaterialTapTargetSize.padded` → 48 pt зона), ичида матн + `SvgPicture.asset('arrow_right.svg', 16, colorFilter: white)`; `--fit` учун `Align(alignment: centerLeft)`; ghost — `FilledButton.tonal` токен рангида.
- Скелет: `shimmer` пакети ёки `AnimatedContainer` градиент; ўлчамлар 3-бўлимдаги `loading` қатори (hero ўрнида 57 pt баландликдаги радиуси 12 блок, унинг остида 6 pt чизиқ).
- Токенлар: `ThemeExtension<JuniorTokens>` (`brand`, `brandSoft`, `green`, `green2`, `greenSoft`, `blue`, `blueSoft`, `yellowBorder`, `yellowText`, `pinkSoft`, `red`, `text2`, `row`, `line`, `line2`, радиуслар); шрифт `SFpro` 400/500/600 `TextTheme` да (`num` 20/600, `title` 15/600, `body` 13/500, `small` 12/500, `tiny` 11/500, `btn` 13/600).
- Динамик қисмлар: `done/total`, `timeLeft` (Тошкент вақти, қаттиқ UTC+5, кун охири 00:00; `Timer.periodic(1 min)` — ҳар сониялик қайта чизиш керак эмас), ҳозирги `group` нинг номи ва тури (hero матни), ҳар `group` нинг ҳолати (`pending` / `done` / `checking`), `reward.state`, `reward.amount` («+30»). `groups.length` 3 бўлмаса чип `N/M` ва прогресс улуши шунга мослашади.
- Ҳолат машинаси (`sealed class ChecklistCardState`): `loading`, `error`, `noTasks`, `notStarted`, `inProgress(dueSoon: bool)`, `awaitingCheck`, `rewardReady`, `claimed`. Кэш бўлса `loading` ўрнига эски ҳолат + фонда refetch; экран фокусга қайтганда ва вазифадан қайтганда refetch.
- Матн масштаби: `MediaQuery.textScaler.clamp(maxScaleFactor: 1.2)` — карточка баландлиги қаттиқ; масштаб оширилганда hero ичидаги икки қатор ва прогресс биринчи бўлиб сиқилади, шунинг учун hero матнлари `maxLines: 1`. `Semantics(label: 'Kunlik vazifalar, 1 dan 3 bajarildi, keyingi vazifa Grafik dizayn, uy vazifasi, 7 soat qoldi')`.
