# DailyChecklistWidget — `checklist` («Kunlik vazifalar»)

Файллар: карточка `design/cards/checklist.html`, токенлар `design/css/tokens.css`, умумий синфлар `design/css/card-base.css`.
Манба: веб компонент архивда йўқ (`components/Streak/DailyChecklistWidget`), шунинг учун дизайн иловадаги мавжуд «Kunlik vazifalar» карточкаси (`APP-STYLE.md`) ва бэкенд майдонлари (`groups[]`, `pending_rewards[]`, `reward.state`, `active`) асосида чизилган.

## 1. Вазифаси

Талабага бугунги учта кунлик вазифадан қанчаси бажарилганини, қанча вақт қолганини ва бажарилгандан кейинги мукофотни (`+30 coin`) бир қарашда кўрсатади. Битта тугма кейинги вазифага олиб боради ёки тайёр мукофотни олдиради; курслар бўйича тўлиқ рўйхат карточкага сиғмайди ва пастки панелга кўчирилган.

## 2. Анатомия

Карточка: 297×171 pt, ички padding 12 → ички қути 273×147 pt, радиус 18 (`--r-card`), фон `--c-card` `#FFFFFF`, соя `--shadow-card`. Ички блоклар вертикал устун, оралиқ 8 pt. Бутун карточка босилади (пастки панел очади).

| Элемент | Ўлчам | Шрифт | Ранг | Изоҳ |
|---|---|---|---|---|
| `.wcard__head` | баландлиги 18 pt (сатр билан 35 pt) | — | — | чапда сарлавҳа блоки, ўнгда чип ёки «i» тугма, оралиқ 8 |
| `.wcard__title` «Kunlik vazifalar» | 1 қатор, 18 pt | SF Pro 15/600, line 18 | `--c-text` `#000000` | иловадаги мавжуд ном, ўзгармайди |
| `.wcard__sub` | 15 pt, юқоридан 2 pt | 12/500, line 15 | одатда `--c-text-2` `#999999`; `--red` `#ED0000` — ≤ 2 соат қолганда; `--green` `--c-green-2` `#58CC02` — ҳамма вазифа бажарилганда | «7 soat qoldi» — иловадаги идиома, соат аниқлигида; ≤ 30 белги |
| `.wcard__chip` — ҳисоблагич «N/3» | 22 pt, padding 0 8, pill | 12/600 | `0/3` → фон `--c-row` `#F8F8FC`, матн `--c-text-2`; `1/3`, `2/3` → `--brand`: фон `--c-brand-soft` `#FFEDE7`, матн `--c-brand` `#FF4F28`; `3/3` → `--green`: фон `--c-green-soft` `#ECFFDE`, матн `#58CC02` | ранг қоидаси: бошланмаган = кулранг, жараёнда = апельсин (фаол), тугалланган = яшил |
| `.wcard__ibtn.ck-i` «i» | 32×32, радиус 10 | 15/600 | фон `--c-row`, матн `--c-slate` `#93A2C0` | фақат `no-tasks` да, тушунтириш очади |
| `.wcard__body` | ≤ 52 pt | — | — | степпер + бир қаторли сарлавҳача; оралиқ 6 |
| `.ck-steps` — 3 босқичли степпер | 24 pt баландлик | — | — | 3 доира + 2 йўлак + танга пилли, бир қаторда |
| `.ck-step` доира | 24×24 | — | бажарилмаган: `circle.svg` (контур `#D4DCEB`); жорий: `circle.svg` маска `--c-brand`; бажарилган: `check.svg` (`#0CD678` диск, оқ галочка); текширувда: `checking.svg` (`#DEF4FF` диск, `#199EDD` ёй) | иловадаги чеклист чекбокслари айнан шу SVG лар |
| `.ck-track` йўлак | 2 pt, мин. кенглик 8 | — | `--c-line-2` `#F0F0F0`; бажарилган қисм `--c-green` `#0CD678` | доиралар орасини тўлдиради |
| Танга пилли `.wcard__chip--yellow` | 22 pt, чапдан 8 pt | 12/600 | фон `--c-yellow-soft` `#FCF8DC`, чегара `--c-yellow-2` `#E9BB36`, матн `--c-yellow-text` `#D9A621`, ичида `coin.png` 14 pt | «+30 coin» — иловадаги пилл; мукофот олингач `--chip--green` + `check.svg` 14 pt |
| `.ck-cap` сарлавҳача | 16 pt, 1 қатор, эллипсис | 13/500 | `--c-text-2` | кейинги вазифа / ҳолат; робот бўлса ўнгдан 72 pt padding (`.ck-art-pad`) |
| `.wcard__note` | 46 pt (2 қатор), padding 8/10, радиус 12 | 12/500 | одатий `--c-row`; хатода `--note--pink` `--c-pink-soft` `#FFE4EA` + `x.svg` 16 pt `--c-red` | фақат `no-tasks` ва `error` да |
| `.wcard__foot` | 36 pt (hint бўлса 14 pt) | — | — | пастга ёпишган (`margin-top:auto`) |
| `.wcard__btn` | 36 pt, радиус 12, padding 0 14 | 13/600 | `--c-brand` фон, оқ матн; `--ghost`: `--c-row` фон, `--c-text` матн | `--fit` — робот бор ҳолатларда, кенглиги матн бўйича (≤ 213 pt) |
| `.wcard__hint` | 14 pt | 11/500 | `--c-text-2`, иконка 12 pt | тугма ўрнига сабаб: «Tekshiruv tugagach coin beriladi», «Ertaga yangi vazifalar bo'ladi» |
| `.wcard__art--bottom` робот | 64×64, ўнгдан 8, пастдан 8 | — | — | фақат тинч/ижобий ҳолатларда; унинг устидаги матнларда `padding-right:72` |

Баландлик ҳисоби (ички 147 pt): сатрли ҳолатлар 35 + 8 + 46 (24 + 6 + 16) + 8 + 36 = **133**; hint билан 35 + 8 + 46 + 8 + 14 = **111**; `no-tasks` 32 + 8 + 46 + 8 + 36 = **130**; `error` 18 + 8 + 46 + 8 + 36 = **116**; `loading` 33 + 8 + 42 + 8 + 36 = **127**. Ҳаммаси лимит ичида.

## 3. Ҳолатлар

| `data-state` | Қачон кўринади | Нима кўрсатилади | UZ матн | RU матн |
|---|---|---|---|---|
| `not-started` | `groups` бор, бажарилгани 0, `reward.state` ≠ ready/claimed | сатр кулранг, чип кулранг `0/3`; степпер: 1-доира апельсин ҳалқа, қолгани бўш; сариқ «+30 coin»; сарлавҳача кейинги вазифа; робот `robot2`; `--fit` тугма | «Kunlik vazifalar» · «7 soat qoldi» · «0/3» · «English · amaliy vazifa» · «Boshlash» | «Ежедневные задания» · «Осталось 7 часов» · «0/3» · «English · практика» · «Начать» |
| `in-progress` **(primary)** | 1–2 вазифа бажарилган, > 2 соат қолган | чип апельсин `1/3`; степпер: яшил галочка → апельсин ҳалқа → бўш; яшил йўлак фақат бажарилган қисмда; тўлиқ кенгликдаги тугма; робот йўқ | «7 soat qoldi» · «1/3» · «Keyingi: Grafik dizayn · uy vazifasi» · «Davom etish» | «Осталось 7 часов» · «1/3» · «Далее: Графический дизайн · ДЗ» (тўлиқ «домашнее задание» 273 pt га сиғмайди — эллипсис) · «Продолжить» |
| `due-soon` | бажарилмаган вазифа бор ва ≤ 2 соат қолган | `in-progress` билан бир хил, фақат сатр қизил `--sub--red` | «1 soat qoldi» · «2/3» · «Blockly Dasturlash · amaliy vazifa qoldi» · «Davom etish» | «Остался 1 час» · «2/3» · «Осталось: Blockly · практическое задание» · «Продолжить» |
| `awaiting-check` | ҳамма вазифа юборилган, лекин камида бири текширувда (`checking`), бажарилмагани йўқ | учинчи доира `checking.svg` (кўк); тугма йўқ — сабаб hint да (`hourglass.svg` кўк) | «7 soat qoldi» · «2/3» · «Grafik dizayn: vazifangiz tekshirilmoqda» · hint «Tekshiruv tugagach coin beriladi» | «Осталось 7 часов» · «2/3» · «Графический дизайн: задание проверяется» · «Монеты начислятся после проверки» |
| `reward-ready` | 3/3 бажарилган, `reward.state = ready` (ёки `pending_rewards.length > 0`) | сатр яшил, чип яшил `3/3`; степпер тўлиқ яшил; сариқ пилл; робот `add_point` (танга кўтарган); `--fit` тугма | «Barcha vazifalar bajarildi» · «3/3» · «Barakalla! +30 coin tayyor» · «Mukofotni olish» | «Все задания выполнены» · «3/3» · «Молодец! +30 coin готовы» · «Получить награду» |
| `claimed` | `reward.state = claimed` | сатр яшил; пилл яшил `check.svg` + «+30 coin»; робот `robot7` (бош бармоқ); тугма йўқ, hint | «+30 coin olindi» · «3/3» · «Coinlar hisobingizga qo'shildi» · hint «Ertaga yangi vazifalar bo'ladi» | «+30 coin получено» · «3/3» · «Монеты зачислены на счёт» · «Завтра будут новые задания» |
| `no-tasks` | `groups` бўш, мукофот йўқ, лекин `active` (карточка чиқади) | сатр йўқ; ўнгда «i» тугма; кулранг изоҳ; робот `notification_empty` (қўлини очган); `--fit` тугма | «Kunlik vazifalar mavjud emas. Kurs boshlangach vazifalar shu yerda chiqadi.» · «Kurslarni ko'rish» | «Ежедневных заданий пока нет. Когда начнётся курс, задания появятся здесь.» · «Смотреть курсы» |
| `loading` | сўров кетмоқда, олдинги маълумот йўқ | `wcard--skeleton`: сарлавҳа 118 pt, сатр 78 pt, чип 38×22, 3 доира + 2 йўлак + пилл 86×22, сарлавҳача 200 pt, тугма тўлиқ кенглик | — | — |
| `error` | сўров хато берди, кэш йўқ | сарлавҳа + пушти изоҳ (`x.svg` қизил) + ghost тугма | «Yuklab bo'lmadi. Internetni tekshirib, qayta urinib ko'ring.» · «Qayta urinish» | «Не удалось загрузить. Проверьте интернет и попробуйте ещё раз.» · «Повторить попытку» |

Қоидалар: чип ҳар доим `N/3` ҳисоблагич (вақт чипга чиқмайди); вақт фақат сатрда, ≤ 2 соатда қизил; кечаги маълумот бўлса `loading` ўрнига эски ҳолат кўрсатилиб, фонда янгиланади; вазифалар сони 3 бўлмаса (`groups.length` 1–5) степпер доиралар сони шунга мослашади, чип `N/M`.

## 4. Ҳаракатлар

Ҳамма босиш зонаси ≥ 44 pt: 36 pt тугмаларга вертикал 4 pt hit-slop, 32 pt «i» тугмага 6 pt.

| Элемент | Ҳолатлар | Нима бўлади |
|---|---|---|
| Бутун карточка (тугмалардан ташқари) | ҳаммаси, `loading` дан бошқа | пастки панел (5-бўлим) |
| «Boshlash» / «Davom etish» | `not-started`, `in-progress`, `due-soon` | route: биринчи бажарилмаган вазифанинг экрани (курс → дарс → «Amaliyot» ёки «Uy vazifasi»). Қайтганда чеклист қайта сўралади |
| «Mukofotni olish» | `reward-ready` | POST claim; тугмада спиннер, иккинчи босиш блокланади; муваффақият → `claimed` + toast «+30 coin» + баннердаги танга ҳисоблагичи янгиланади; хато → toast «Mukofotni olib bo'lmadi. Qayta urinib ko'ring», тугма қайта фаол |
| «Kurslarni ko'rish» | `no-tasks` | route: «Kurslar» экрани («Mening kurslarim»; курс йўқ бўлса «Mos kurslarni ko'rish») |
| «Qayta urinish» | `error` | қайта сўров, карточка `loading` га ўтади |
| «i» | `no-tasks` | оддий огоҳлантириш (компакт варақ): «Kunlik vazifalar» + иловадаги матн «Bugungi vazifalaringiz va ularning bajarilish holatini shu kartada kuzatishingiz mumkin.» + «Tushunarli» |
| Чип, сатр, степпер, пилл, hint | — | алоҳида босилмайди — карточка босилиши ҳисобланади |

## 5. Пастки панеллар

Жами 8 та панел. Уч тури бор: **пастки панел** (пастдан чиқади), **тўлиқ экран** (календарь, вақт танлаш), **огоҳлантириш** (бир абзац матн ва тугма). Ёпиш: орқа фонга босиш, ✕ тугмаси ёки Android «орқага».

| `data-sheet` | Тури | Қаердан очилади | Ичида нима бор | Асосий тугма |
|---|---|---|---|---|
| `tasks` | пастки панел | карточка: `not-started`, `in-progress` | маълумот қаторлари, рўйхат, рангли изоҳ | Davom etish |
| `due-soon` | пастки панел | карточка: `due-soon` | рўйхат, рангли изоҳ | Davom etish |
| `checking` | пастки панел | карточка: `awaiting-check` | рўйхат, рангли изоҳ | Vazifani ko'rish |
| `reward` | пастки панел | карточка: `reward-ready` | маълумот қаторлари, рангли изоҳ, робот расми | Mukofotni olish |
| `claimed` | пастки панел | карточка: `claimed`; панел: `reward` | маълумот қаторлари, рангли изоҳ, робот расми | Coinlar tarixi |
| `empty` | пастки панел | карточка: `no-tasks` | маълумот қаторлари, рангли изоҳ, робот расми | Mening kurslarim |
| `about` | огоҳлантириш | карточка: `no-tasks` | матн | Tushunarli |
| `error` | огоҳлантириш | карточка: `error` | матн | Qayta urinish |

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
| `icons/circle.svg` | бажарилмаган доира (`<img>`), жорий доира (маска, `--c-brand`) | 24 pt |
| `icons/check.svg` | бажарилган доира; `claimed` пилл ва hint иконкаси | 24 / 14 / 12 pt |
| `icons/checking.svg` | текширувдаги доира | 24 pt |
| `icons/hourglass.svg` | `awaiting-check` hint, маска `--c-blue` | 12 pt |
| `icons/x.svg` | `error` изоҳи, маска `--c-red` | 16 pt |
| `images/coin.png` | сариқ пилл ичида | 14 pt |
| `images/robot2.png` | `not-started` (қўлини чўзган — таклиф) | 64 pt |
| `images/add_point.png` | `reward-ready` (танга кўтарган) | 64 pt |
| `images/robot7.png` | `claimed` (бош бармоқ) | 64 pt (нисбати 700×528 → 64×48) |
| `images/notification_empty.png` | `no-tasks` (қўлини очган) | 56 pt — изоҳ блоки 98 pt гача тушади, 64 pt робот унга тегиб қоларди |

`check.svg` ичида яшил диск бор, шунинг учун у маска сифатида эмас, тўғридан-тўғри `<img>` сифатида ишлатилади (маска қилинса бутун диск бўялади). Робот `in-progress`, `due-soon`, `awaiting-check`, `error` да йўқ — улар зич ёки огоҳлантирувчи ҳолатлар.

## 7. Flutter учун изоҳлар

- Карточка: `Container` (`BoxDecoration`: радиус 18, соя `0 6 18 rgba(28,39,76,.06)`, оқ фон) → `Padding(12)` → `Stack` (робот `Positioned(right: 8, bottom: 8)`) → `Column` (`crossAxisAlignment.stretch`, оралиқ 8 `SizedBox`). Ўлчам ота каруселдан келади (297×171), ичкарида `SizedBox.expand` эмас — `Column` + `Spacer` ўрнига foot учун `Expanded` body.
- Head: `Row` → `Expanded(Column[title, sub])` + чип `Container` (22 pt, `StadiumBorder`). Чип ранги учун `enum ChecklistProgress { none, partial, complete }` → токен мапи.
- Степпер: `Row` → `SvgPicture.asset` (`flutter_svg`) 24×24 ҳар доира; жорий доира `SvgPicture.asset('circle.svg', colorFilter: ColorFilter.mode(brand, BlendMode.srcIn))`; йўлаклар `Expanded(Container(height: 2, color: ...))` мин. кенглик учун `ConstrainedBox(minWidth: 8)`; пилл `Container` + `Image.asset('coin.png', width: 14)`.
- Сарлавҳача: `Text(maxLines: 1, overflow: TextOverflow.ellipsis)`; робот бор ҳолатларда `Padding(right: 72)`.
- Тугма: `FilledButton` (`minimumSize: Size(0, 36)`, `shape: RoundedRectangleBorder(12)`, `tapTargetSize: MaterialTapTargetSize.padded` → 48 pt зона); `--fit` учун `Align(alignment: centerLeft)`; ghost — `FilledButton.tonal` токен рангида.
- Скелет: `shimmer` пакети ёки `AnimatedContainer` градиент; ўлчамлар 3-бўлимдаги `loading` қатори.
- Токенлар: `ThemeExtension<JuniorTokens>` (`brand`, `brandSoft`, `green`, `greenSoft`, `blue`, `yellowSoft`, `yellowBorder`, `yellowText`, `pinkSoft`, `red`, `text2`, `row`, `line2`, радиуслар); шрифт `SFpro` 400/500/600 `TextTheme` да (`title` 15/600, `body` 13/500, `small` 12/500, `tiny` 11/500, `btn` 13/600).
- Динамик қисмлар: `done/total`, `timeLeft` (Тошкент вақти, қаттиқ UTC+5, кун охири 00:00; `Timer.periodic(1 min)` — ҳар сониялик қайта чизиш керак эмас), ҳар `group` нинг ҳолати (`pending` / `done` / `checking`), `reward.state`, `reward.amount` («+30»), кейинги вазифа матни. `groups.length` 3 бўлмаса доиралар сони ва чип шунга мослашади.
- Ҳолат машинаси (`sealed class ChecklistCardState`): `loading`, `error`, `noTasks`, `notStarted`, `inProgress(dueSoon: bool)`, `awaitingCheck`, `rewardReady`, `claimed`. Кэш бўлса `loading` ўрнига эски ҳолат + фонда refetch; экран фокусга қайтганда ва вазифадан қайтганда refetch.
- Матн масштаби: `MediaQuery.textScaler.clamp(maxScaleFactor: 1.2)` — карточка баландлиги қаттиқ. `Semantics(label: 'Kunlik vazifalar, 1 dan 3 bajarildi, 7 soat qoldi')`.
