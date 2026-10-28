/* Junior guided onboarding tour.
 * Real ilovada window.JUNIOR_USER_ID va window.JUNIOR_ONBOARDING_CONTACTS
 * backenddan beriladi. Holat qurilmada, user + versiya bo'yicha saqlanadi.
 */
(() => {
  'use strict';

  const screen = document.querySelector('.screen');
  const content = document.querySelector('.content');
  if (!screen || !content) return;

  const VERSION = 'v15-sales-reminder';
  const userId = String(window.JUNIOR_USER_ID || 'demo-user');
  const params = new URLSearchParams(window.location.search);
  const qaDays = params.get('qa') === 'days' || params.has('day');
  const forcePushPrompt = params.get('push') === '1';
  const availableDays = new Set([1, 2, 3, 5, 6, 7]);
  const normalizeDay = value => {
    const day = Number(value) || 1;
    return availableDays.has(day) ? day : 1;
  };
  let selectedDay = normalizeDay(params.get('day'));
  if (params.has('day') && Number(params.get('day')) !== selectedDay) {
    const normalizedUrl = new URL(window.location.href);
    normalizedUrl.searchParams.set('day', String(selectedDay));
    history.replaceState(null, '', normalizedUrl);
  }
  const hasPurchasedCourse = window.JUNIOR_HAS_COURSE === true || params.get('paid') === '1';
  let storageKey = `junior:onboarding:${userId}:${VERSION}:day-${selectedDay}`;
  const pushStorageKey = `junior:push-permission:${userId}:${VERSION}`;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const nextPaint = () => new Promise(resolve => requestAnimationFrame(() => resolve()));

  const root = document.createElement('section');
  root.className = 'j-tour';
  root.hidden = true;
  root.setAttribute('aria-label', 'Junior platformasi bo‘ylab sayohat');
  root.innerHTML = `
    <div class="j-tour__shade j-tour__shade--top"></div>
    <div class="j-tour__shade j-tour__shade--left"></div>
    <div class="j-tour__shade j-tour__shade--right"></div>
    <div class="j-tour__shade j-tour__shade--bottom"></div>
    <div class="j-tour__focus" aria-hidden="true"><i></i></div>
    <div class="j-tour__streak-fire" hidden aria-hidden="true">🔥</div>
    <aside class="j-push-preview" hidden role="status">
      <span class="j-push-preview__icon">🔔</span>
      <span><b></b><small></small></span>
    </aside>
    <section class="j-push-permission" hidden role="dialog" aria-modal="true" aria-label="Push xabarlarga ruxsat">
      <div class="j-push-permission__card">
        <span class="j-push-permission__bell">🔔</span>
        <small>JUNIOR XABARLARI</small>
        <h2>Muhim xabarlarni o‘tkazib yubormang</h2>
        <p>Dars, mentor javobi va jonli dars vaqti haqida push xabar yuborishimizga ruxsat berasizmi?</p>
        <button type="button" data-push-allow>Ruxsat berish</button>
        <button type="button" data-push-later>Hozir emas</button>
      </div>
    </section>
    <aside class="j-tour__card" role="dialog" aria-live="polite">
      <div class="j-tour__meta"><span class="j-tour__count"></span><span class="j-tour__label">Junior sayohati</span><button class="j-tour__skip" type="button">O‘tkazib yuborish</button></div>
      <div class="j-tour__bar" aria-hidden="true"><i></i></div>
      <div class="j-streak-goal__chrome" hidden>
        <div class="j-streak-goal__status" aria-hidden="true"><b>9:41</b><span>▮▮▮⌁▰</span></div>
        <div class="j-streak-goal__brand">
          <img data-a="a28" alt="Junior">
          <span><b>🪙</b> 0</span><span><b>⚡</b> 0</span>
        </div>
        <div class="j-streak-goal__speech">
          <b data-streak-goal-title>O‘rganish odati shakllanmoqda!</b>
          <span data-streak-goal-text>O‘qish kundalik odatga aylanishi uchun har kuni ozgina vaqt ajrating.</span>
        </div>
      </div>
      <div class="j-tour__guide" aria-hidden="true">
        <img data-a="a2" alt="">
        <p><b></b><small></small></p>
      </div>
      <h2 class="j-tour__title"></h2>
      <p class="j-tour__text"></p>
      <p class="j-tour__instruction" hidden><span>☝️</span><b></b></p>
      <div class="j-streak-goal__visual" hidden aria-hidden="true">
        <span class="j-streak-goal__calendar"><b data-streak-preview>7</b><small>KUN</small></span>
        <img data-a="a2" alt="">
      </div>
      <div class="j-tour__choices" hidden aria-label="Streak maqsadini tanlash">
        <button type="button" data-streak-goal="7"><b>7 - kun</b><small>🪙 +10 coin</small></button>
        <button type="button" data-streak-goal="14"><b>14 - kun</b><small>🪙 +20 coin</small></button>
        <button type="button" data-streak-goal="30"><b>30 - kun</b><small>🪙 +40 coin</small></button>
        <button type="button" data-streak-goal="60"><b>60 - kun</b><small>🪙 +60 coin</small></button>
      </div>
      <div class="j-tour__actions">
        <img class="j-tour__mascot" data-a="a2" alt="Junior maskoti">
        <button class="j-tour__next" type="button"></button>
      </div>
      <button class="j-tour__later" type="button" hidden>Keyinroq</button>
    </aside>
    <section class="j-tour__lesson" hidden aria-label="Bootstrap kursi">
      <header class="j-course__top">
        <button class="j-course__back" type="button" data-lesson-back aria-label="Ortga"><span>‹</span><b>Ortga</b></button>
        <div class="j-course__balances" aria-label="Balans">
          <span><i>⚡</i><b>15091</b></span>
          <span><i>🪙</i><b>15321</b></span>
        </div>
        <span class="j-course__step" aria-hidden="true"><b data-lesson-step>1</b>/3</span>
      </header>
      <div class="j-lesson__progress"><i></i></div>
      <div class="j-lesson__body">
        <section class="j-platform__video" data-lesson-stage="video">
          <h1>Bootstrapda matnlar bilan ishlash</h1>
          <button type="button" class="j-platform__player" data-video-play aria-label="Video darsni ko‘rish">
            <span class="j-platform__video-brand"><i>J</i><b>JUNIOR</b><small>academy</small></span>
            <span class="j-platform__video-title">Web dasturlash</span>
            <span class="j-platform__video-play">▶</span>
            <span class="j-platform__video-time"><b data-video-time>0:00</b> / 13:52</span>
            <span class="j-platform__video-controls">🔊 &nbsp; ⛶ &nbsp; ⋮</span>
            <span class="j-platform__video-seek"><i></i></span>
          </button>
          <div class="j-platform__slide-preview" aria-label="Video taqdimoti">
            <span class="j-platform__slide-person"><i></i><b>&lt;/&gt;</b></span>
            <span class="j-platform__slide-copy"><small>● BOOTSTRAP</small><b>BOOTSTRAPDA<br>MATNLAR BILAN<br>ISHLASH</b></span>
            <i class="j-platform__slide-dot j-platform__slide-dot--one"></i>
            <i class="j-platform__slide-dot j-platform__slide-dot--two"></i>
          </div>
        </section>

        <section class="j-platform__quiz" data-lesson-stage="test" hidden>
          <div class="j-platform__quiz-head">
            <div class="j-platform__quiz-steps" aria-hidden="true">
              <i class="is-active"></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
            <time>17m : 52s</time>
          </div>
          <h2>Matn pastki qatorga o‘tmasligi uchun qaysi class ishlatiladi?</h2>
          <div class="j-lesson__answers">
            <button type="button" data-lesson-answer="correct">text-nowrap</button>
            <button type="button" data-lesson-answer="wrong">text-wrap</button>
            <button type="button" data-lesson-answer="wrong">text-break</button>
          </div>
          <p data-lesson-feedback>To‘g‘ri javobni tanlang.</p>
        </section>

        <section class="j-lesson__stage j-lesson__stage--reward" data-lesson-stage="reward" hidden>
          <div class="j-lesson__result-confetti" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="j-lesson__praise-mascot" aria-hidden="true"><img data-a="a2" alt=""></div>
          <small>Dars muvaffaqiyatli yakunlandi</small>
          <h2>Natijangiz tayyor!</h2>
          <p>Sizdek o‘quvchimiz borligidan faxrlanamiz. Ajoyib boshlanish!</p>
          <div class="j-lesson__praise-checks"><span>✓ Video dars</span><span>✓ Test 1/1</span></div>
        </section>

        <section class="j-platform__task" data-lesson-stage="practice" hidden>
          <div class="j-platform__task-hero">
            <div class="j-platform__task-copy">
              <small><i></i> BOOTSTRAP</small>
              <h2>Amaliy vazifa</h2>
              <ol>
                <li>Bootstrapni ulab oling</li>
                <li>Har bir yozgan matningizga <b>rang</b> bering</li>
                <li>Matnlarda <b>fw</b>, <b>fs</b> yoki <b>fst</b> classini ishlating</li>
                <li>Natijani namunadagi ko‘rinishga keltiring</li>
              </ol>
            </div>
            <img data-a="a2" alt="Junior yordamchisi">
          </div>
          <div class="j-platform__code-card">
            <strong>Salom, meni ismim <span>Jamoliddin</span></strong>
            <s>Bu men xarid qilgan narsalar ro‘yxati</s>
            <ul><li>Kitob 1</li><li>Kitob 2</li><li>Kitob 3</li></ul>
            <p>Men endi <b>Bootstrap</b>dan foydalanishni o‘rgandim</p>
          </div>
        </section>
      </div>
      <footer class="j-lesson__foot"><span data-lesson-hint>Videoni ko‘ring</span><button type="button" class="j-lesson__finish" disabled>Davom etish</button></footer>
    </section>
    <section class="j-tour__success" hidden role="dialog" aria-label="Birinchi dars mukofoti">
      <section class="j-reward__panel j-reward__panel--ignite" data-reward-panel="ignite">
        <iframe class="j-reward__ignite-frame" data-streak-ignite-frame src="./ignite-streak.html?v=20261021-4" title="Streak olovini yoqish"></iframe>
      </section>
      <section class="j-reward__panel j-reward__panel--streak" data-reward-panel="streak" hidden>
        <div class="j-reward__status" aria-hidden="true"><b>9:41</b><span>▮▮▮⌁▰</span></div>
        <div class="j-reward__brand"><span><i>••</i> Junior</span><em>🪙 0</em><em>⚡ 0</em></div>
        <div class="j-reward__speech"><b>O‘rganish odati shakllanmoqda!</b><span data-streak-speech>O‘qish kundalik odatga aylanishi uchun har kuni ozgina vaqt ajrating.</span></div>
        <div class="j-reward__hero">
          <div class="j-reward__result-flame" aria-hidden="true"><iframe src="./ignite-streak.html?preview=lit&v=20261021-4" tabindex="-1" title=""></iframe></div>
          <img data-a="a2" alt="Junior maskoti">
        </div>
        <strong class="j-reward__number" data-streak-number>1</strong>
        <h2 data-streak-title>1 kunlik seriya</h2>
        <div class="j-reward__week" aria-label="7 kunlik streak maqsadi">
          <span data-streak-day="1"><b>Du</b><i>✓</i></span>
          <span data-streak-day="2"><b>Se</b><i></i></span><span data-streak-day="3"><b>Ch</b><i></i></span><span data-streak-day="4"><b>Pa</b><i></i></span>
          <span data-streak-day="5"><b>Ju</b><i></i></span><span data-streak-day="6"><b>Sh</b><i></i></span><span data-streak-day="7"><b>Ya</b><i></i></span>
        </div>
        <button type="button" class="j-reward__primary" data-reward-next>Davom etish&nbsp;&nbsp; →</button>
      </section>
      <section class="j-reward__panel j-reward__panel--coin" data-reward-panel="coin" hidden>
        <div class="j-reward__coin-content">
          <span class="j-reward__kicker">Birinchi dars mukofoti</span>
          <h2 data-coin-title>Mukofot sandig‘ingiz tayyor!</h2>
          <p data-coin-text>Darsni muvaffaqiyatli tugatganingiz uchun sandiqni oching.</p>
          <button type="button" class="j-reward__chest" data-reward-chest aria-label="Mukofot sandig‘ini ochish">
            <img class="j-reward__chest-art j-reward__chest-art--closed" src="../bugungi-reja/src/assets/reward-chest-closed.png" alt="Yopiq mukofot sandig‘i">
            <img class="j-reward__chest-art j-reward__chest-art--open" src="../bugungi-reja/src/assets/reward-chest-open.png" alt="Coinlarga to‘la ochilgan sandiq">
            <span class="j-reward__chest-prompt">Ekranni bosing!</span>
          </button>
          <div class="j-reward__coin-result" aria-live="polite"><b>+32 coin</b><span>+32 point</span></div>
        </div>
        <button type="button" class="j-tour__finish" hidden>Keyingi darsga o‘tish</button>
        <section class="j-coinshop-modal" hidden role="dialog" aria-modal="true" aria-labelledby="j-coinshop-modal-title">
          <div class="j-coinshop-modal__card">
            <span class="j-coinshop-modal__icon" aria-hidden="true">🛍️</span>
            <img data-a="a2" alt="Junior maskoti">
            <small>COIN SHOP</small>
            <h2 id="j-coinshop-modal-title">Coin’larni qayerga sarflashni bilasizmi?</h2>
            <p>Yig‘gan Coin’laringizni Coin Shop’da sovg‘alarga almashtirishingiz mumkin.</p>
            <span class="j-coinshop-modal__balance">🪙 Birinchi 50 Coin tayyor</span>
            <button type="button" data-coinshop-modal-next>Coin Shop’ni ochish</button>
          </div>
        </section>
      </section>
    </section>
    <div class="j-tour__toast" role="status"></div>`;
  screen.appendChild(root);

  const paymentPlans = {
    debt: [
      { lessons: 12, amount: '1 200 000 UZS' },
      { lessons: 24, amount: '2 400 000 UZS' },
      { lessons: 56, amount: '5 600 000 UZS' }
    ],
    zero: [
      { lessons: 12, amount: '1 200 000 UZS' },
      { lessons: 36, amount: '3 600 000 UZS' },
      { lessons: 56, amount: '5 600 000 UZS' }
    ]
  };
  let paymentPageState = params.get('payment_state') === 'zero' ? 'zero' : 'debt';
  let selectedPaymentPlan = 0;
  const paymentPage = document.createElement('section');
  paymentPage.className = 'j-payment-page';
  paymentPage.hidden = true;
  paymentPage.setAttribute('aria-label', 'To‘lov ma’lumotlari');
  paymentPage.innerHTML = `
    <div class="j-payment-page__status" aria-hidden="true"><b>9:41</b><span>▮▮▮⌁▰</span></div>
    <header class="j-payment-page__top">
      <button type="button" data-payment-page-back aria-label="Ortga">←</button>
      <h1>To’lov</h1>
      <button type="button" data-payment-page-state aria-label="To‘lov holatini almashtirish">↶</button>
    </header>
    <section class="j-payment-page__student">
      <div class="j-payment-page__id"><span>Talaba ID</span><b>1234567</b></div>
      <dl>
        <div><dt>Talaba:</dt><dd>Toshpo’latov Toshmuhammad</dd></div>
        <div><dt>Kurs:</dt><dd>Web-dasturlash</dd></div>
        <div><dt>Guruh:</dt><dd>GW30</dd></div>
        <div><dt>Filial:</dt><dd>Yashnabod</dd></div>
        <div><dt>Balans</dt><dd data-payment-balance></dd></div>
      </dl>
    </section>
    <div class="j-payment-page__plans" role="group" aria-label="Darslar soni"></div>
    <section class="j-payment-page__invoice">
      <header><span>Hisob: <b>№123453</b></span><i aria-hidden="true">☷</i></header>
      <div><span data-payment-summary-lessons></span><b data-payment-summary-amount></b></div>
      <button type="button" data-payment-page-pay>To’lash</button>
    </section>
    <i class="j-payment-page__home" aria-hidden="true"></i>`;
  screen.appendChild(paymentPage);

  function renderPaymentPage() {
    const isDebt = paymentPageState === 'debt';
    const plans = paymentPlans[paymentPageState];
    const balance = paymentPage.querySelector('[data-payment-balance]');
    const planList = paymentPage.querySelector('.j-payment-page__plans');
    const summaryLessons = paymentPage.querySelector('[data-payment-summary-lessons]');
    const summaryAmount = paymentPage.querySelector('[data-payment-summary-amount]');
    paymentPage.dataset.state = paymentPageState;
    balance.textContent = isDebt ? '-240 000 UZS' : '0 UZS';
    balance.classList.toggle('is-negative', isDebt);
    planList.innerHTML = plans.map((plan, index) => `
      <button type="button" data-payment-plan="${index}" class="${index === selectedPaymentPlan ? 'is-active' : ''}">
        ${plan.lessons} ta dars
      </button>`).join('');
    summaryLessons.textContent = `${plans[selectedPaymentPlan].lessons} dars`;
    summaryAmount.textContent = plans[selectedPaymentPlan].amount;
  }

  function openDay3PaymentPage() {
    renderPaymentPage();
    paymentPage.hidden = false;
    requestAnimationFrame(() => paymentPage.classList.add('is-open'));
  }

  function closeDay3PaymentPage() {
    paymentPage.classList.remove('is-open');
    setTimeout(() => { paymentPage.hidden = true; }, 240);
  }

  paymentPage.addEventListener('click', event => {
    if (event.target.closest('[data-payment-page-back]')) {
      closeDay3PaymentPage();
      return;
    }
    if (event.target.closest('[data-payment-page-state]')) {
      paymentPageState = paymentPageState === 'debt' ? 'zero' : 'debt';
      selectedPaymentPlan = 0;
      renderPaymentPage();
      return;
    }
    const plan = event.target.closest('[data-payment-plan]');
    if (plan) {
      selectedPaymentPlan = Number(plan.dataset.paymentPlan) || 0;
      renderPaymentPage();
      return;
    }
    if (event.target.closest('[data-payment-page-pay]')) openDay3Payment();
  });

  const paymentAddress = '0xbf88b57b5b831fd72a9f597c4a7753fff';
  const day3Payment = document.createElement('section');
  day3Payment.className = 'j-day3-payment';
  day3Payment.hidden = true;
  day3Payment.setAttribute('role', 'dialog');
  day3Payment.setAttribute('aria-modal', 'true');
  day3Payment.setAttribute('aria-labelledby', 'j-day3-payment-title');
  day3Payment.innerHTML = `
    <button class="j-day3-payment__scrim" type="button" data-day3-payment-close aria-label="To‘lov oynasini yopish"></button>
    <section class="j-day3-payment__sheet">
      <header class="j-day3-payment__header">
        <div>
          <h2 id="j-day3-payment-title">Boshqa qurilmadan to’lash</h2>
          <p>Muddat: 15 sentyabr 2026</p>
        </div>
        <button type="button" data-day3-payment-close aria-label="Yopish">
          <img src="./assets/payment/payment-close.svg" alt="">
        </button>
      </header>
      <img class="j-day3-payment__qr" src="./assets/payment/payment-qr.png" alt="To‘lov uchun QR kod">
      <p class="j-day3-payment__notice">Kurslarni qayta faollashtirish uchun to’lovni amalga oshiring</p>
      <img class="j-day3-payment__divider" src="./assets/payment/payment-divider.svg" alt="">
      <div class="j-day3-payment__summary">
        <div class="j-day3-payment__total"><span>Jami</span><b>450 000 so’m</b></div>
        <div class="j-day3-payment__address">
          <span>Deposit adress</span>
          <b>${paymentAddress}</b>
        </div>
      </div>
      <div class="j-day3-payment__actions">
        <button type="button" data-day3-payment-copy>
          <img src="./assets/payment/payment-copy.svg" alt=""><span>Nusxalash</span>
        </button>
        <button type="button" data-day3-payment-share>
          <img src="./assets/payment/payment-share.svg" alt=""><span>Ulashish</span>
        </button>
      </div>
      <i class="j-day3-payment__home" aria-hidden="true"></i>
    </section>`;
  screen.appendChild(day3Payment);

  function openDay3Payment() {
    day3Payment.hidden = false;
    requestAnimationFrame(() => day3Payment.classList.add('is-open'));
  }

  function closeDay3Payment() {
    day3Payment.classList.remove('is-open');
    setTimeout(() => { day3Payment.hidden = true; }, 260);
  }

  day3Payment.addEventListener('click', async event => {
    if (event.target.closest('[data-day3-payment-close]')) {
      closeDay3Payment();
      return;
    }
    const copyButton = event.target.closest('[data-day3-payment-copy]');
    if (copyButton) {
      try { await navigator.clipboard.writeText(paymentAddress); } catch (_) {}
      const label = copyButton.querySelector('span');
      if (label) label.textContent = 'Nusxalandi';
      setTimeout(() => { if (label) label.textContent = 'Nusxalash'; }, 1400);
      return;
    }
    if (event.target.closest('[data-day3-payment-share]')) {
      const shareData = { title: 'Junior Academy to‘lovi', text: `To‘lov manzili: ${paymentAddress}` };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch (_) {}
      } else {
        try { await navigator.clipboard.writeText(shareData.text); } catch (_) {}
        const label = day3Payment.querySelector('[data-day3-payment-share] span');
        if (label) label.textContent = 'Nusxalandi';
        setTimeout(() => { if (label) label.textContent = 'Ulashish'; }, 1400);
      }
    }
  });

  if (qaDays && selectedDay === 3 && params.get('payment') === '1') {
    setTimeout(openDay3Payment, 220);
  }
  if (qaDays && selectedDay === 3 && params.get('payment_page') === '1') {
    setTimeout(openDay3PaymentPage, 220);
  }

  const dayPicker = document.createElement('nav');
  dayPicker.className = 'j-day-picker';
  dayPicker.hidden = !qaDays;
  dayPicker.setAttribute('aria-label', 'Onboarding test kuni');
  dayPicker.innerHTML = `
    <span>TEST</span>
    <button type="button" data-tour-day="1">1-kun</button>
    <button type="button" data-tour-day="2">2-kun</button>
    <button type="button" data-tour-day="3">3-kun</button>
    <button type="button" data-tour-day="5">5-kun</button>
    <button type="button" data-tour-day="6">6-kun</button>
    <button type="button" data-tour-day="7">7-kun</button>
    <button type="button" data-tour-push aria-label="Push ruxsat oynasini ko‘rish">🔔</button>`;
  // QA boshqaruvi ilova ekranining bir qismi emas: uni telefon maketidan
  // tashqarida ushlaymiz, shunda platforma headeri bilan ustma-ust tushmaydi.
  const stage = document.querySelector('#stage');
  const phoneWrap = document.querySelector('#phoneWrap');
  if (stage && phoneWrap) stage.insertBefore(dayPicker, phoneWrap);
  else screen.appendChild(dayPicker);

  const shades = {
    top: root.querySelector('.j-tour__shade--top'),
    left: root.querySelector('.j-tour__shade--left'),
    right: root.querySelector('.j-tour__shade--right'),
    bottom: root.querySelector('.j-tour__shade--bottom')
  };
  const focus = root.querySelector('.j-tour__focus');
  const streakFire = root.querySelector('.j-tour__streak-fire');
  const pushPreview = root.querySelector('.j-push-preview');
  const pushPreviewTitle = pushPreview.querySelector('b');
  const pushPreviewText = pushPreview.querySelector('small');
  const pushPermission = root.querySelector('.j-push-permission');
  const card = root.querySelector('.j-tour__card');
  const count = root.querySelector('.j-tour__count');
  const tourLabel = root.querySelector('.j-tour__label');
  const bar = root.querySelector('.j-tour__bar i');
  const guide = root.querySelector('.j-tour__guide');
  const guideTitle = guide.querySelector('b');
  const guideText = guide.querySelector('small');
  const title = root.querySelector('.j-tour__title');
  const text = root.querySelector('.j-tour__text');
  const instruction = root.querySelector('.j-tour__instruction');
  const instructionText = instruction.querySelector('b');
  const streakGoalChrome = root.querySelector('.j-streak-goal__chrome');
  const streakGoalTitle = root.querySelector('[data-streak-goal-title]');
  const streakGoalText = root.querySelector('[data-streak-goal-text]');
  const streakVisual = root.querySelector('.j-streak-goal__visual');
  const streakPreview = root.querySelector('[data-streak-preview]');
  const choices = root.querySelector('.j-tour__choices');
  const next = root.querySelector('.j-tour__next');
  const skip = root.querySelector('.j-tour__skip');
  const later = root.querySelector('.j-tour__later');
  const lesson = root.querySelector('.j-tour__lesson');
  const lessonBack = root.querySelector('[data-lesson-back]');
  const lessonFinish = root.querySelector('.j-lesson__finish');
  const lessonProgress = root.querySelector('.j-lesson__progress i');
  const lessonStep = root.querySelector('[data-lesson-step]');
  const lessonHint = root.querySelector('[data-lesson-hint]');
  const lessonStages = [...root.querySelectorAll('[data-lesson-stage]')];
  const success = root.querySelector('.j-tour__success');
  const finish = root.querySelector('.j-tour__finish');
  const coinShopModal = root.querySelector('.j-coinshop-modal');
  const coinShopModalNext = root.querySelector('[data-coinshop-modal-next]');
  const rewardPanels = [...root.querySelectorAll('[data-reward-panel]')];
  const igniteFrame = root.querySelector('[data-streak-ignite-frame]');
  const rewardNext = root.querySelector('[data-reward-next]');
  const rewardChest = root.querySelector('[data-reward-chest]');
  const toast = root.querySelector('.j-tour__toast');

  let stepIndex = 0;
  let activeTarget = null;
  let activeTargets = [];
  let positioningFrame = 0;
  let toastTimer = 0;
  let runToken = 0;
  let streakFireTarget = null;
  let streakFireTimer = 0;
  let lessonStageIndex = 0;
  let videoCompleted = false;
  let rewardLocked = false;
  let rewardMode = 'lesson-result';
  let audioContext = null;
  let actionPending = false;
  let cardAnimationTimer = 0;
  let autoFinishTimer = 0;
  let pushPreviewTimer = 0;
  let awaitingCoinShopReturn = false;

  function ensureAudio() {
    if (!audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      audioContext = new AudioContext();
    }
    return audioContext;
  }

  function soundNote(frequency, start = 0, duration = .1, type = 'sine', volume = .025, endFrequency = null) {
    const ctx = audioContext;
    if (!ctx || ctx.state !== 'running') return;
    const at = ctx.currentTime + start;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, at);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, at + duration);
    gain.gain.setValueAtTime(.0001, at);
    gain.gain.exponentialRampToValueAtTime(volume, at + Math.min(.018, duration / 3));
    gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(at);
    oscillator.stop(at + duration + .025);
  }

  function playSound(name) {
    if (!audioContext || audioContext.state !== 'running') return;
    if (name === 'tap') soundNote(520, 0, .055, 'triangle', .018, 410);
    if (name === 'bubble') {
      soundNote(360, 0, .085, 'sine', .014, 520);
      soundNote(610, .045, .08, 'triangle', .012, 760);
    }
    if (name === 'transition') {
      soundNote(310, 0, .12, 'sine', .012, 390);
      soundNote(470, .08, .14, 'triangle', .01, 560);
    }
    if (name === 'push') {
      soundNote(740, 0, .1, 'sine', .02);
      soundNote(988, .09, .16, 'sine', .018);
    }
    if (name === 'video') {
      soundNote(330, 0, .08, 'triangle', .02, 470);
      soundNote(590, .07, .1, 'sine', .018, 690);
    }
    if (name === 'correct') {
      soundNote(523, 0, .12, 'sine', .028);
      soundNote(659, .085, .13, 'sine', .03);
      soundNote(784, .17, .17, 'sine', .032);
    }
    if (name === 'wrong') {
      soundNote(210, 0, .12, 'square', .018, 175);
      soundNote(160, .11, .15, 'square', .014, 138);
    }
    if (name === 'whoosh') {
      soundNote(150, 0, .48, 'sawtooth', .015, 820);
      soundNote(330, .16, .32, 'triangle', .016, 1060);
    }
    if (name === 'streak') {
      soundNote(392, 0, .16, 'sine', .026);
      soundNote(523, .1, .18, 'sine', .028);
      soundNote(659, .21, .22, 'triangle', .028);
      soundNote(784, .34, .24, 'sine', .025);
    }
    if (name === 'chest') {
      soundNote(105, 0, .2, 'sine', .04, 82);
      soundNote(330, .12, .18, 'triangle', .022, 470);
      soundNote(620, .25, .18, 'sine', .02, 920);
    }
    if (name === 'coin') {
      [880, 1100, 1320, 1560].forEach((frequency, index) => soundNote(frequency, index * .055, .12, 'sine', .021));
    }
    if (name === 'complete') {
      soundNote(440, 0, .14, 'triangle', .025);
      soundNote(554, .1, .16, 'triangle', .026);
      soundNote(659, .21, .2, 'sine', .029);
    }
    if (name === 'finish') {
      soundNote(659, 0, .12, 'sine', .024);
      soundNote(988, .1, .2, 'sine', .026);
    }
  }

  function unlockAudioAndPlay(name = 'tap') {
    const ctx = ensureAudio();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().then(() => playSound(name)).catch(() => {});
    else playSound(name);
  }

  function safeGet() {
    try { return localStorage.getItem(storageKey); } catch (_) { return null; }
  }

  function safeSet() {
    try { localStorage.setItem(storageKey, 'completed'); } catch (_) {}
  }

  function getPushPreference() {
    try { return localStorage.getItem(pushStorageKey); } catch (_) { return null; }
  }

  function setPushPreference(value) {
    try { localStorage.setItem(pushStorageKey, value); } catch (_) {}
  }

  function updateAssets() {
    if (typeof window.__fixImgs === 'function') window.__fixImgs();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2400);
  }

  function click(selector) {
    const node = document.querySelector(selector);
    if (node) node.click();
  }

  function closeSheet() {
    const close = document.querySelector('#sheetHost:not([hidden]) [data-close]');
    if (close) close.click();
  }

  async function goHome() {
    closeSheet();
    click('.tab[data-tab="home"]');
    await nextPaint();
  }

  async function goChat() {
    closeSheet();
    click('[data-tab="ai"]');
    await nextPaint();
    injectTeamCard();
  }

  async function goScreen(key) {
    closeSheet();
    click(`[data-go="${key}"]`);
    click(`.tab[data-tab="${key}"]`);
    await nextPaint();
  }

  async function prepareWidget(key) {
    await goHome();
  }

  async function prepareCoinShop() {
    closeSheet();
    await nextPaint();
    closeSheet();
    await nextPaint();
  }

  async function prepareCertificates() {
    await goScreen('certificates');
    closeSheet();
    await nextPaint();
  }

  function injectTeamCard() {
    // Chat ichidagi «Sizga biriktirilgan ustozlar» bloki mahsulot oqimidan olib tashlandi.
    document.querySelectorAll('.scr[data-screen="ai"] .j-team').forEach(node => node.remove());
  }

  function polishProgressiveScreens() {
    const leadersEnd = document.querySelector('.scr[data-screen="leaders"] .lb-end');
    if (leadersEnd) leadersEnd.textContent = 'Sizdan oldinda yana 6 nafar o‘quvchi bor';

    const profile = document.querySelector('.scr[data-screen="profile"]');
    if (profile && !profile.querySelector('.p-mobile')) {
      profile.innerHTML = `
        <section class="p-mobile" aria-label="Profil">
          <div class="p-mobile__hero">
            <img class="p-mobile__avatar" data-a="a2" alt="Junior maskoti">
            <h1>Tursunov Shodimurod</h1><p>Junior o‘quvchisi</p>
          </div>
          <div class="p-mobile__stats" aria-label="O‘quvchi statistikasi">
            <div class="p-mobile__stat"><i>♙</i><span>Liderlarda</span><b>5008</b></div>
            <div class="p-mobile__stat"><i>▣</i><span>Faollik</span><b>1</b></div>
            <div class="p-mobile__stat"><i>●</i><span>Status</span><b>Faol</b></div>
          </div>
          <h2 class="p-mobile__section">Sozlamalar</h2>
          <div class="p-mobile__rows">
            <button class="p-mobile__row" type="button" data-toast="Til sozlamalari ochilmoqda"><span class="p-mobile__icon">◎</span><b>Til</b><small>O‘zbek tili&nbsp; ›</small></button>
            <button class="p-mobile__row" type="button" data-toast="Coinlar tarixi ochilmoqda"><span class="p-mobile__icon">◴</span><b>Coinlar tarixi</b><span class="p-mobile__chev">›</span></button>
            <button class="p-mobile__row" type="button" data-go="help"><span class="p-mobile__icon">?</span><b>Yordam</b><span class="p-mobile__chev">›</span></button>
            <button class="p-mobile__row" type="button" data-toast="Sozlamalar ochilmoqda"><span class="p-mobile__icon">⚙</span><b>Sozlamalar</b><span class="p-mobile__chev">›</span></button>
            <button class="p-mobile__row p-mobile__row--exit" type="button" data-toast="Hisobdan chiqish oynasi ochilmoqda"><span class="p-mobile__icon">↪</span><b>Chiqish</b><span class="p-mobile__chev">›</span></button>
          </div>
        </section>`;
      updateAssets();
    }
  }

  // Faollik kalendaridagi yozuvlar faqat webinar bo'lgan kunlarda ko'rinadi.
  // Keyinchalik bu ro'yxat backenddan o'sha kunning recordinglari bilan keladi.
  const activityRecordings = {
    '2-sentabr': [
      { id: 'responsive', label: 'Vebinar yozuvi', title: 'Responsive dizayn: mobilga moslashuv', course: 'Dasturlash kursi' }
    ],
    '3-sentabr': [
      { id: 'html', label: 'TA booking yozuvi', title: 'Amaliy ish. HTML nima va nega kerak?', course: 'Dasturlash kursi' }
    ],
    '5-sentabr': [
      { id: 'position', label: 'Vebinar yozuvi', title: 'Position xususiyati (Qiyinlashtirilgan mavzu)', course: 'Dasturlash kursi' },
      { id: 'html', label: 'TA booking yozuvi', title: 'Amaliy ish. HTML nima va nega kerak?', course: 'Dasturlash kursi' }
    ]
  };

  function renderRecordingPlayer(recording) {
    const slot = document.querySelector('#sheetSlot');
    if (!slot || !recording) return;
    slot.innerHTML = `
      <section class="sheet j-recording-screen" data-widget="activity" data-sheet="recording">
        <header class="sheet__head">
          <div class="sheet__title">Yozuvni ko‘rish</div>
          <div class="sheet__sub sheet__sub--brand">${recording.label}</div>
        </header>
        <div class="sheet__body">
          <div class="j-recording-player" aria-label="${recording.title} videosi">
            <span>YOZUV</span><button type="button" data-toast="Yozuv ijro etilmoqda" aria-label="Yozuvni ijro etish">▶</button>
          </div>
          <h3>${recording.title}</h3>
          <p>${recording.course}</p>
          <div class="j-recording-note">Yozuv saqlangan — istalgan vaqtda shu kalendardan qayta ko‘rishingiz mumkin.</div>
        </div>
        <footer class="sheet__foot">
          <button class="s-btn s-btn--ghost" type="button" data-open="calendar">Kalendarga qaytish</button>
        </footer>
      </section>`;
  }

  function syncActivityRecordings() {
    const slot = document.querySelector('#sheetSlot');
    const sheet = slot?.querySelector('.sheet[data-widget="activity"]');
    if (!sheet || ['calendar', 'recording'].includes(sheet.dataset.sheet) || sheet.querySelector('.j-recording-list')) return;
    const title = sheet.querySelector('.sheet__title')?.textContent?.trim().toLowerCase().split(',')[0];
    const recordings = activityRecordings[title];
    if (!recordings?.length) return;

    const list = document.createElement('section');
    list.className = 'j-recording-list';
    list.setAttribute('aria-label', 'Ushbu kunning yozuvlari');
    list.innerHTML = recordings.map(recording => `
      <article class="j-recording-card">
        <span class="j-recording-card__type">${recording.label}</span>
        <b>${recording.title}</b>
        <small>${recording.course}</small>
        <button type="button" data-recording-id="${recording.id}">Yozuvni ko‘rish <span>↗</span></button>
      </article>`).join('');
    sheet.querySelector('.sheet__body')?.appendChild(list);
  }

  function installActivityRecordings() {
    const observer = new MutationObserver(syncActivityRecordings);
    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-recording-id]');
      if (!button) return;
      const recording = Object.values(activityRecordings).flat().find(item => item.id === button.dataset.recordingId);
      if (recording) renderRecordingPlayer(recording);
    });
    syncActivityRecordings();
  }

  const streakGoalKey = `junior:streak-goal:${userId}:${VERSION}`;

  function getStreakGoal() {
    try { return Number(localStorage.getItem(streakGoalKey)) || 0; }
    catch (_) { return 0; }
  }

  function injectProfileGoal() {
    const body = document.querySelector('.scr[data-screen="profile"] .scr__body');
    if (!body) return;
    let row = body.querySelector('.j-profile-goal');
    if (!row) {
      row = document.createElement('div');
      row.className = 'j-profile-goal';
      row.innerHTML = '<span>🔥</span><span><b>Streak maqsadi</b><small></small></span>';
      body.prepend(row);
    }
    const goal = getStreakGoal();
    row.querySelector('small').textContent = goal ? `${goal} kun ketma-ket dars` : 'Hali tanlanmagan';
  }

  function saveStreakGoal(days) {
    try { localStorage.setItem(streakGoalKey, String(days)); } catch (_) {}
    injectProfileGoal();
  }

  async function prepareLeaderboardNearby() {
    await goScreen('leaders');
    const pane = document.querySelector('.scr[data-screen="leaders"] .lb-pane--a');
    if (!pane) return;
    pane.querySelector('.j-lb-nearby')?.remove();
    pane.querySelectorAll('.lb-pod, .lb-list, .lb-end, .lb-mewrap').forEach(node => { node.hidden = true; });
    const template = pane.querySelector('.lb-r');
    const me = pane.querySelector('.lb-me');
    if (!template || !me) return;
    const nearby = document.createElement('div');
    nearby.className = 'lb-list j-lb-nearby';
    const students = [
      [1, 'SH', 'Shohruh Qodirov', '7420'],
      [2, 'KS', 'Kamola Sattorova', '7010'],
      [3, 'IA', 'Ismoilov Abdulaziz', '6680'],
      [4, 'MY', 'Malika Yusupova', '6415'],
      [5, 'BN', 'Bekzod Nazarov', '6140']
    ];
    students.forEach(([rank, initials, name, points], index) => {
      const row = (index === 2 ? me : template).cloneNode(true);
      row.classList.toggle('j-lb-nearby__me', index === 2);
      const rankNode = row.querySelector('.lb-r__n, .lb-me__n');
      const avatar = row.querySelector('.lb-av');
      const nameNode = row.querySelector('.lb-r__t, .lb-me__nm');
      const pointsNode = row.querySelector('.lb-pts');
      if (rankNode) rankNode.textContent = index === 2 ? `${rank} o‘rin` : String(rank);
      if (avatar) avatar.textContent = initials;
      if (nameNode) nameNode.textContent = name;
      if (pointsNode) pointsNode.textContent = points;
      if (index === 2) {
        [...row.querySelectorAll('*')]
          .filter(node => !node.children.length && /o['‘’]ringacha/i.test(node.textContent || ''))
          .forEach(node => node.remove());
      }
      nearby.appendChild(row);
    });
    pane.querySelector('.lb-hd')?.after(nearby);
  }

  async function preparePaymentQr() {
    await goHome();
    if (selectedDay === 3) {
      openDay3PaymentPage();
      return;
    }
    const paymentGroup = [...document.querySelectorAll('.sheets__g')]
      .find(group => group.querySelector('code')?.textContent.trim() === 'payment');
    const qrButton = [...(paymentGroup?.querySelectorAll('button') || [])]
      .find(button => button.textContent.trim() === 'Бошқа қурилмадан');
    qrButton?.click();
    await delay(80);
    const note = document.querySelector('#sheetHost .sheet[data-widget="payment"][data-sheet="qr"] .s-note');
    if (note) note.textContent = 'To‘lovni amalga oshiring va Akademiya o‘quvchisiga aylaning.';
  }

  const legacySteps = [
    {
      target: '.plan__hero',
      title: 'Xush kelibsiz! Boshlaymizmi? 👋',
      text: 'Junior’dagi asosiy imkoniyatlarni birgalikda ko‘rib chiqamiz. Men yo‘l ko‘rsataman — siz ko‘rsatmalarga amal qiling.',
      button: 'Boshlash',
      prepare: goHome
    },
    {
      target: '.plan__hero',
      title: 'Bugungi o‘quv rejangiz',
      text: 'Bu yerda bugun bajaradigan 2 ta darsingiz, kunlik natijangiz va yig‘adigan coinlaringiz ko‘rinadi.',
      button: 'Kurslarimni ko‘rish',
      prepare: goHome
    },
    {
      target: '.mk__list',
      title: 'O‘qishni shu yerdan boshlaysiz',
      text: 'Kurslaringiz tavsiya etilgan tartibda joylashgan. Eng yuqoridagi kursni ochib, navbatdagi darsni davom ettiring.',
      button: 'Muhim bo‘limlarni ko‘rish',
      prepare: goHome
    },
    {
      target: 'article[data-widget="webinar"]',
      title: 'Muhim ma’lumotlar bir joyda',
      text: 'Vebinar, vazifa va boshqa eslatmalar shu vidjetlarda chiqadi. Kerakli ma’lumotni bosh sahifadan tez topasiz.',
      button: 'Streakni ko‘rish',
      compact: true,
      prepare: () => prepareWidget('webinar')
    },
    {
      target: 'article[data-widget="streak"]',
      title: 'Streak — o‘qish odatingiz 🔥',
      text: 'Har kuni kamida bitta darsni yakunlang. Shunda streak uzilmaydi va ketma-ket o‘qigan kunlaringiz hisoblanadi.',
      button: 'Mentor yordamini ko‘rish',
      effect: 'streak-fire',
      cardPosition: 'top',
      compact: true,
      prepare: () => prepareWidget('streak')
    },
    {
      target: 'article[data-widget="mentor"] button',
      title: 'Savolingiz bo‘lsa, yolg‘iz qolmaysiz',
      text: 'Mentorlar 24/7 yordam beradi. Darsdagi tushunarsiz joyni shu tugma orqali yuboring.',
      actionButton: 'Savolim bor',
      requireClick: true,
      prepare: () => prepareWidget('mentor')
    },
    {
      target: '#sheetHost:not([hidden]) .sheeth__panel .m-pick--sel',
      fallback: '#sheetHost:not([hidden]) .sheeth__panel .m-pick',
      title: 'Savolni kerakli mentorga yuboring',
      text: 'Yo‘nalishingizdagi mentorni tanlang. Savolingiz shu mutaxassisga yuboriladi.',
      actionButton: 'Mentorga yozish',
      requireClick: true,
      cardPosition: 'top',
      compact: true
    },
    {
      target: '.scr[data-screen="ai"] .ai-bar',
      fallback: '.scr[data-screen="ai"] .ai-feed[data-aiview="chat"]',
      title: 'Mentor bilan chat ochildi',
      text: 'Savolingizni pastdagi maydonga yozing va yuborish tugmasini bosing. Mentor javobi shu chatda ko‘rinadi.',
      button: 'Ustozlarimni ko‘rish',
      cardPosition: 'top',
      compact: true,
      prepare: goChat
    },
    {
      target: '.j-team',
      title: 'Sizga biriktirilgan ustozlar',
      text: 'Kurator o‘quv jarayoningizni kuzatadi, mentor esa jonli darslarni olib boradi. Telegram orqali ularga to‘g‘ridan-to‘g‘ri yozishingiz mumkin.',
      button: 'Liderlar jadvalini ko‘rish',
      prepare: goChat,
      onNext: () => goScreen('leaders')
    },
    {
      target: '.scr[data-screen="leaders"] .lb',
      fallback: '.scr[data-screen="leaders"] .scr__body',
      title: 'Natijangizni liderlar bilan solishtiring 🏆',
      text: 'Bu yerda akademiyadagi o‘rningiz va to‘plagan ballaringiz ko‘rinadi. Faol o‘qing, ball yig‘ing va yuqori o‘ringa ko‘tariling.',
      button: 'Xabarlarni ko‘rish',
      prepare: () => goScreen('leaders'),
      onNext: () => goScreen('notifications')
    },
    {
      target: '.scr[data-screen="notifications"] .nf-row',
      targetGroup: '.scr[data-screen="notifications"] .nf-row',
      targetGroupLimit: 4,
      title: 'Muhim xabarlarni o‘tkazib yubormang 🔔',
      text: 'Push-xabarlar orqali yangi dars, vebinar, vazifa va muddatlar haqida eslatma olasiz. Yangi xabarlar shu bo‘limda saqlanadi.',
      button: 'CoinShopga o‘tish',
      prepare: () => goScreen('notifications'),
      onNext: goHome
    },
    {
      target: 'button[data-go="coinshop"]',
      title: 'Dars qiling, coin yig‘ing 🪙',
      text: 'Har bir yakunlangan dars va vazifa uchun coin olasiz. Yig‘ilgan coinlarni CoinShop’da ishlatishingiz mumkin.',
      actionButton: 'CoinShopni ochish',
      requireClick: true,
      prepare: goHome
    },
    {
      target: '.scr[data-screen="coinshop"] .cs-banner',
      fallback: '.scr[data-screen="coinshop"] .cs-bal',
      title: 'Coin qanday yig‘ilishini bilib oling',
      text: 'Coin ishlash usullarini ko‘rish uchun yuqoridagi yo‘riqnoma bannerini oching.',
      actionButton: 'Yo‘riqnomani ochish',
      requireClick: true,
      prepare: prepareCoinShop
    },
    {
      target: '#sheetHost:not([hidden]) .sheet[data-widget="coinshop"][data-sheet="earn"] .cs-rule',
      targetGroup: '#sheetHost:not([hidden]) .sheet[data-widget="coinshop"][data-sheet="earn"] .cs-rule',
      targetGroupLimit: 2,
      fallback: '#sheetHost:not([hidden]) .sheet[data-widget="coinshop"][data-sheet="earn"] .sheet__body',
      title: 'Coin yig‘ishning 3 ta yo‘li',
      text: 'Testni birinchi urinishda to‘liq bajarsangiz 30 coin, amaliy vazifa uchun 70 coin, do‘stingizni taklif qilsangiz 1000 coin olasiz.',
      button: 'Sertifikatlarni ko‘rish',
      compact: true,
      onNext: goHome
    },
    {
      target: 'button[data-go="certificates"]',
      title: 'Sertifikatgacha yo‘lingizni kuzating',
      text: 'Bu bo‘limda sertifikat talablari, bajargan darslaringiz va qolgan muddatni ko‘rasiz.',
      actionButton: 'Sertifikatlarni ochish',
      requireClick: true,
      prepare: goHome
    },
    {
      target: '#sheetHost:not([hidden]) .sheeth__panel .cd-cd',
      fallback: '#sheetHost:not([hidden]) .sheeth__panel .s-hint',
      title: 'Muddatni o‘tkazib yubormang ⏱️',
      text: 'Taymer deadline’gacha qancha vaqt qolganini ko‘rsatadi. Sertifikat olish uchun qolgan darslarni vaqtida tugating.',
      button: 'Birinchi darsga o‘tish',
      compact: true,
      onNext: goHome
    },
    {
      target: '.mk__row--now .mk__card',
      targetGroup: '.mk__row--now > .mk__num, .mk__row--now > .mk__card',
      title: 'Birinchi darsni boshlash vaqti',
      text: 'Endi birinchi darsingizni oching. Uni tugatsangiz, dastlabki streak va 20 coin olasiz.',
      actionButton: 'Birinchi darsni boshlash',
      requireClick: true,
      action: 'lesson',
      prepare: goHome
    }
  ];

  const daySteps = {
    1: [
      {
        id: 'welcome',
        target: '.plan__hero',
        title: 'Xush kelibsiz! 👋',
        text: 'Men Junior yordamchisiman. Platformadagi kerakli imkoniyatlarni o‘z vaqtida ko‘rsatib boraman.',
        button: 'Birinchi darsga o‘tish',
        prepare: goHome
      },
      {
        id: 'lesson-entry',
        target: '.mk__row--now .mk__card',
        targetGroup: '.mk__row--now > .mk__num, .mk__row--now > .mk__card',
        title: 'Birinchi darsingiz tayyor',
        text: 'Darsni muvaffaqiyatli yakunlab, birinchi Coin va Pointlaringizni olasiz.',
        actionButton: 'Darsni boshlash',
        requireClick: true,
        action: 'lesson',
        prepare: goHome
      },
      {
        id: 'teachers',
        target: '.j-team',
        title: 'Ustozlaringiz doim yoningizda',
        text: 'Kurator tashkiliy masalalarda, mentor esa dars va amaliy vazifalarda yordam beradi.',
        autoFinishAfter: 4500,
        prepare: goChat
      }
    ],
    2: [
      {
        id: 'day-two-lesson',
        target: '.mk__row--now .mk__card',
        targetGroup: '.mk__row--now > .mk__num, .mk__row--now > .mk__card',
        title: 'Ikkinchi kun — davom etamiz! ✨',
        text: 'Kecha boshlagan yo‘lingizni davom ettiring: bugungi videodars, test va Coin hamda Point sizni kutmoqda.',
        actionButton: 'Darsni boshlash',
        requireClick: true,
        action: 'lesson',
        prepare: goHome
      },
      {
        id: 'coinshop-preview',
        target: '.scr[data-screen="coinshop"] .scr__body',
        fallback: '.scr[data-screen="coinshop"]',
        title: 'Coin Shop ochildi 🛍️',
        text: 'Yig‘gan Coin’laringizni shu yerda sovg‘alarga almashtirasiz. Endi amaliy vazifaga o‘tamiz.',
        button: 'Amaliy vazifaga o‘tish',
        compact: true,
        hideFocus: true,
        noShade: true,
        manualNext: true,
        onNext: async () => {
          awaitingCoinShopReturn = false;
          await openPracticalTask();
        },
        prepare: () => goScreen('coinshop')
      },
      {
        id: 'leaderboard',
        target: '.scr[data-screen="leaders"] .j-lb-nearby',
        fallback: '.scr[data-screen="leaders"] .lb-pane--a',
        title: 'Pointlaringiz sizni yuqoriga olib chiqadi 🏆',
        text: 'Hozir siz 3-o‘rindasiz. Yaqin raqiblaringiz natijasini ko‘rib, keyingi marraga intiling.',
        button: 'Davom etish',
        prepare: prepareLeaderboardNearby
      }
    ],
    3: [
      {
        id: 'day-three-lesson',
        target: '.mk__row--now .mk__card',
        targetGroup: '.mk__row--now > .mk__num, .mk__row--now > .mk__card',
        title: 'Uchinchi kun — marraga yaqinmiz! 🚀',
        text: 'Ikki kunlik mehnatingizni davom ettiring: bugun 3-darsni ko‘ring, test va amaliy vazifani yakunlang.',
        actionButton: 'Darsni boshlash',
        requireClick: true,
        action: 'lesson',
        prepare: goHome
      },
      {
        id: 'streak-goal',
        target: 'article[data-widget="streak"]',
        title: 'Streak maqsadini tanlang',
        text: 'Har kuni dars qilish uchun o‘zingizga mos maqsad qo‘yamiz!',
        choices: true,
        hideFocus: true,
        fullDim: true,
        button: 'Davom etish  →',
        prepare: () => prepareWidget('streak')
      },
      {
        id: 'streak-confirmed',
        target: 'article[data-widget="streak"]',
        title: () => `${getStreakGoal()} kunlik maqsad — zo‘r tanlov! 🔥`,
        text: () => `Kelishdik! Endi har bir dars sizni ${getStreakGoal()} kunlik marrangizga yaqinlashtiradi. Olg‘a, siz buni uddalaysiz!`,
        celebration: true,
        hideFocus: true,
        fullDim: true,
        button: 'Davom etish',
        prepare: () => prepareWidget('streak')
      },
      {
        id: 'purchase-offer',
        target: 'article[data-widget="payment"]',
        fallback: '.plan__hero',
        title: 'Biz bilan doimiy qolishga tayyormisiz?',
        text: 'Yangi bilimlarni egallash va Junior’da o‘qishni davom ettirishga tayyormisiz?',
        button: 'Ha, tayyorman',
        later: 'Keyinroq',
        openPayment: true,
        hideFocus: true,
        fullDim: true,
        prepare: goHome
      }
    ]
  };

  function selectedSteps() {
    if (selectedDay === 3 && hasPurchasedCourse) return daySteps[3].slice(0, 1);
    return daySteps[selectedDay] || [];
  }

  let steps = selectedSteps();

  function updateDayPicker() {
    dayPicker.querySelectorAll('[data-tour-day]').forEach(button => {
      const active = Number(button.dataset.tourDay) === selectedDay;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function showDayPush() {
    const messages = {
      1: ['Birinchi darsingiz tayyor', 'Bugun video, qisqa test va amaliy vazifa sizni kutmoqda.'],
      2: ['Bugungi darsingiz tayyor', 'Avval darsni yakunlab Coin va Point oling. Keyin yangi imkoniyatlarni ko‘rsatamiz.'],
      3: ['Uchinchi kun darsi tayyor', 'Bugun 3-darsni yakunlang — keyin Junior bilan keyingi qadamingizni tanlaysiz.']
    };
    const message = messages[selectedDay];
    clearTimeout(pushPreviewTimer);
    pushPreviewTitle.textContent = message[0];
    pushPreviewText.textContent = message[1];
    pushPreview.classList.remove('has-day-picker');
    pushPreview.hidden = false;
    requestAnimationFrame(() => pushPreview.classList.add('is-visible'));
    playSound('push');
    pushPreviewTimer = setTimeout(() => {
      pushPreview.classList.remove('is-visible');
      setTimeout(() => { pushPreview.hidden = true; }, 360);
    }, 4300);
  }

  function showPushPermission() {
    runToken += 1;
    clearTarget();
    clearStreakFire();
    closeSheet();
    root.hidden = false;
    root.classList.add('is-running');
    screen.classList.add('j-tour-scroll-locked');
    pushPreview.hidden = true;
    pushPermission.hidden = false;
    card.hidden = true;
    focus.hidden = true;
    lesson.hidden = true;
    success.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = true; });
    updateDayPicker();
    pushPermission.querySelector('[data-push-allow]')?.focus({ preventScroll: true });
  }

  function startSelectedDay() {
    if (selectedDay !== 6) clearPaymentExpiredState();
    window.__closeModuleConsultation?.();
    window.__closeSalesReminder?.();
    pushPermission.hidden = true;
    steps = selectedSteps();
    root.dataset.figmaStyle = String(selectedDay >= 1 && selectedDay <= 3);
    root.dataset.tourDay = String(selectedDay);
    storageKey = `junior:onboarding:${userId}:${VERSION}:day-${selectedDay}`;
    updateDayPicker();
    if (selectedDay === 5 || selectedDay === 7) {
      showPlainApp();
      return;
    }
    if (selectedDay === 6) {
      showExpiredPaymentApp();
      return;
    }
    startTour();
  }

  async function choosePushPermission(allow) {
    unlockAudioAndPlay(allow ? 'correct' : 'tap');
    let result = allow ? 'requested' : 'later';
    if (allow && 'Notification' in window) {
      try { result = await Notification.requestPermission(); } catch (_) { result = 'unavailable'; }
    }
    setPushPreference(result);
    startSelectedDay();
  }

  function selectDay(day) {
    selectedDay = normalizeDay(day);
    const url = new URL(window.location.href);
    url.searchParams.set('qa', 'days');
    url.searchParams.set('day', String(selectedDay));
    history.replaceState(null, '', url);
    playSound('transition');
    startSelectedDay();
  }

  function findStepIndex(id) {
    const index = steps.findIndex(step => step.id === id);
    return index < 0 ? 0 : index;
  }

  async function transitionCurrentStep() {
    if (card.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    card.classList.add('is-leaving');
    focus.classList.add('is-leaving');
    playSound('transition');
    await delay(340);
  }

  async function waitForTarget(step, token) {
    for (let i = 0; i < 30; i += 1) {
      if (token !== runToken) return null;
      const found = document.querySelector(step.target) || (step.fallback && document.querySelector(step.fallback));
      if (found && found.getClientRects().length) return found;
      await delay(20);
    }
    return null;
  }

  function applyCardPlacement(step) {
    const atTop = step.cardPosition === 'top';
    card.classList.toggle('is-top', atTop);
    card.classList.toggle('is-compact', !!step.compact);
    card.classList.toggle('is-lowered', !!step.lowerCard);
    card.style.top = atTop ? '6px' : 'auto';
    card.style.bottom = atTop ? 'auto' : '6px';
    card.style.left = '14px';
    card.style.setProperty('--bubble-x', atTop ? '12%' : '88%');
    card.style.setProperty('--bubble-y', atTop ? '12%' : '88%');
  }

  async function revealTarget(target, step) {
    const track = target.closest('#track');
    if (track) {
      const cardTarget = target.closest('article') || target;
      const nextLeft = cardTarget.offsetLeft - (track.clientWidth - cardTarget.offsetWidth) / 2;
      if (Math.abs(track.scrollLeft - nextLeft) > 3) {
        track.scrollTo({ left: nextLeft, behavior: 'auto' });
      }
    }
    if (content.contains(target)) {
      const contentRect = content.getBoundingClientRect();
      const targetRect = activeTargetRect() || target.getBoundingClientRect();
      const screenRect = root.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const gap = 18;
      const availableTop = step.cardPosition === 'top' ? cardRect.bottom + gap : screenRect.top + 8;
      const availableBottom = step.cardPosition === 'top' ? screenRect.bottom - 8 : cardRect.top - gap;
      const availableHeight = Math.max(44, availableBottom - availableTop);
      const desiredViewportTop = targetRect.height > availableHeight
        ? availableBottom - targetRect.height
        : availableTop + (availableHeight - targetRect.height) / 2;
      const targetTop = content.scrollTop + targetRect.top - contentRect.top;
      const nextTop = Math.max(0, targetTop - (desiredViewportTop - contentRect.top));
      if (Math.abs(content.scrollTop - nextTop) > 3) {
        content.scrollTo({ top: nextTop, behavior: 'auto' });
      }
    }
    await nextPaint();
  }

  function playCardBubble() {
    clearTimeout(cardAnimationTimer);
    card.classList.remove('is-preparing');
    card.classList.add('is-bubbling');
    next.disabled = !!steps[stepIndex]?.choices && !getStreakGoal();
    playSound('bubble');
    cardAnimationTimer = setTimeout(() => card.classList.remove('is-bubbling'), 500);
  }

  function activeTargetRect() {
    const rects = activeTargets
      .filter(node => node?.getClientRects().length)
      .map(node => node.getBoundingClientRect());
    if (!rects.length) return activeTarget?.getBoundingClientRect() || null;
    const left = Math.min(...rects.map(rect => rect.left));
    const top = Math.min(...rects.map(rect => rect.top));
    const right = Math.max(...rects.map(rect => rect.right));
    const bottom = Math.max(...rects.map(rect => rect.bottom));
    return { left, top, right, bottom, width: right - left, height: bottom - top };
  }

  function setShadeLayout(x, y, width, height, screenWidth, screenHeight) {
    Object.assign(shades.top.style, { left: '0px', top: '0px', width: `${screenWidth}px`, height: `${Math.max(0, y)}px` });
    Object.assign(shades.bottom.style, { left: '0px', top: `${y + height}px`, width: `${screenWidth}px`, height: `${Math.max(0, screenHeight - y - height)}px` });
    Object.assign(shades.left.style, { left: '0px', top: `${y}px`, width: `${Math.max(0, x)}px`, height: `${height}px` });
    Object.assign(shades.right.style, { left: `${x + width}px`, top: `${y}px`, width: `${Math.max(0, screenWidth - x - width)}px`, height: `${height}px` });
  }

  function positionTour() {
    cancelAnimationFrame(positioningFrame);
    positioningFrame = requestAnimationFrame(() => {
      if (root.hidden || !activeTarget || card.hidden) return;
      const step = steps[stepIndex];
      applyCardPlacement(step);
      const sr = root.getBoundingClientRect();
      if (step.noShade) {
        Object.values(shades).forEach(node => { node.hidden = true; });
        focus.hidden = true;
        return;
      }
      if (step.fullDim) {
        Object.values(shades).forEach(node => { node.hidden = true; });
        shades.top.hidden = false;
        Object.assign(shades.top.style, {
          left: '0px',
          top: '0px',
          width: `${sr.width}px`,
          height: `${sr.height}px`,
          background: 'rgba(12, 18, 34, .68)'
        });
        focus.hidden = true;
        return;
      }
      const tr = activeTargetRect();
      if (!tr) return;
      const isPlanHero = activeTarget.matches('.plan__hero');
      const pad = isPlanHero
        ? 0
        // Figma'dagi ramka kartochkaning o'ziga yopishib turadi. Oldingi
        // 7–9px tashqi oraliq qorong'i fonni "uzilib qolgan" chiziqdek
        // ko'rsatardi.
        : 0;
      Object.values(shades).forEach(node => {
        node.style.background = 'transparent';
      });
      const edgeInset = 12;
      const rawLeft = tr.left - sr.left - pad;
      const rawTop = tr.top - sr.top - pad;
      const rawRight = tr.right - sr.left + pad;
      const rawBottom = tr.bottom - sr.top + pad;
      const x = Math.max(edgeInset, rawLeft);
      let y = Math.max(edgeInset, rawTop);
      const width = Math.max(8, Math.min(sr.width - edgeInset, rawRight) - x);
      let height = Math.max(8, Math.min(sr.height - edgeInset, rawBottom) - y);
      const targetRadius = parseFloat(getComputedStyle(activeTarget).borderTopLeftRadius) || 12;
      const cardRect = card.getBoundingClientRect();
      const gap = 18;

      if (step.cardPosition === 'top') {
        const minY = cardRect.bottom - sr.top + gap;
        const currentBottom = y + height;
        if (y < minY) {
          y = minY;
          height = Math.max(8, currentBottom - y);
        }
      } else {
        const maxBottom = cardRect.top - sr.top - gap;
        const availableHeight = maxBottom - y;
        // Pastki sheet maqsad elementini yopib qo'ysa, 8px balandlikdagi
        // "uzilib qolgan" ramkani chizmaymiz. Figma'dagidek faqat dim
        // fon va sheet qoladi.
        if (availableHeight < 20) {
          Object.values(shades).forEach(node => { node.hidden = true; });
          shades.top.hidden = false;
          Object.assign(shades.top.style, {
            left: '0px', top: '0px', width: `${sr.width}px`, height: `${sr.height}px`,
            background: 'rgba(19, 27, 47, .72)'
          });
          root.dataset.focusBlocked = 'true';
          focus.hidden = true;
          return;
        }
        height = Math.min(height, availableHeight);
      }

      setShadeLayout(x, y, width, height, sr.width, sr.height);
      Object.assign(focus.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${targetRadius + pad}px`,
        boxShadow: '0 0 0 9999px rgba(12, 18, 34, .68)'
      });
    });
  }

  function clearTarget() {
    activeTargets.forEach(node => node.classList.remove('j-tour__target'));
    activeTargets = [];
    activeTarget = null;
  }

  function clearStreakFire() {
    clearTimeout(streakFireTimer);
    streakFire.classList.remove('is-flying');
    streakFire.hidden = true;
    if (streakFireTarget) {
      streakFireTarget.classList.remove('j-tour__fire-destination', 'j-tour__fire-landed');
      streakFireTarget = null;
    }
  }

  function animateStreakFire(target, token) {
    const destination = target.querySelector('.stc__fire') || target.querySelector('.stc__ico--fire');
    if (!destination || token !== runToken) return;
    streakFireTarget = destination;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      destination.classList.add('j-tour__fire-landed');
      streakFireTimer = setTimeout(() => destination.classList.remove('j-tour__fire-landed'), 900);
      return;
    }

    const screenRect = root.getBoundingClientRect();
    const destinationRect = destination.getBoundingClientRect();
    const startX = screenRect.width * .5;
    const startY = screenRect.height * .35;
    const endX = destinationRect.left - screenRect.left + destinationRect.width / 2;
    const endY = destinationRect.top - screenRect.top + destinationRect.height / 2;
    const endScale = Math.max(.22, Math.min(.38, destinationRect.height / 72));

    streakFire.style.setProperty('--fire-dx', `${endX - startX}px`);
    streakFire.style.setProperty('--fire-dy', `${endY - startY}px`);
    streakFire.style.setProperty('--fire-end-scale', String(endScale));
    destination.classList.add('j-tour__fire-destination');
    streakFire.hidden = false;
    void streakFire.offsetWidth;
    streakFire.classList.add('is-flying');
    playSound('whoosh');
  }

  streakFire.addEventListener('animationend', () => {
    streakFire.classList.remove('is-flying');
    streakFire.hidden = true;
    if (!streakFireTarget) return;
    streakFireTarget.classList.remove('j-tour__fire-destination');
    streakFireTarget.classList.add('j-tour__fire-landed');
    const landedTarget = streakFireTarget;
    streakFireTimer = setTimeout(() => landedTarget.classList.remove('j-tour__fire-landed'), 1100);
  });

  async function activateStep(nextIndex) {
    const token = ++runToken;
    stepIndex = Math.max(0, Math.min(steps.length - 1, nextIndex));
    const step = steps[stepIndex];
    actionPending = false;
    clearTimeout(cardAnimationTimer);
    clearTimeout(autoFinishTimer);
    clearTarget();
    clearStreakFire();
    root.hidden = false;
    root.classList.add('is-running');
    screen.classList.add('j-tour-scroll-locked');
    screen.scrollTop = 0;
    lesson.hidden = true;
    success.hidden = true;
    pushPermission.hidden = true;
    card.hidden = false;
    card.classList.remove('is-bubbling', 'is-leaving');
    card.classList.add('is-preparing');
    root.dataset.focusBlocked = 'false';
    next.disabled = true;
    focus.classList.remove('is-leaving');
    focus.hidden = true;
    Object.values(shades).forEach(node => {
      node.hidden = false;
      node.style.background = 'rgba(12, 18, 34, .68)';
    });

    count.textContent = `${stepIndex + 1}/${steps.length}`;
    tourLabel.textContent = `${selectedDay}-kun sayohati`;
    bar.style.width = `${((stepIndex + 1) / steps.length) * 100}%`;
    title.textContent = typeof step.title === 'function' ? step.title() : step.title;
    text.textContent = typeof step.text === 'function' ? step.text() : step.text;
    guideTitle.textContent = title.textContent;
    guideText.textContent = text.textContent;
    instruction.hidden = !step.instruction;
    instructionText.textContent = step.instruction || '';
    streakGoalChrome.hidden = step.id !== 'streak-goal';
    if (step.id === 'streak-goal') {
      const hasGoal = getStreakGoal() > 0;
      streakGoalTitle.textContent = hasGoal ? 'O‘zingga maqsad qo‘y!' : 'O‘rganish odati shakllanmoqda!';
      streakGoalText.textContent = hasGoal
        ? 'Necha kun ketma-ket o‘rganishni xohlaysan? Maqsadingni tanla va intil!'
        : 'O‘qish kundalik odatga aylanishi uchun har kuni ozgina vaqt ajrating.';
    }
    streakVisual.hidden = step.id !== 'streak-goal' && !step.celebration;
    if (step.id === 'streak-goal' || step.celebration) streakPreview.textContent = String(getStreakGoal() || 7);
    choices.hidden = !step.choices;
    choices.querySelectorAll('[data-streak-goal]').forEach(button => {
      button.classList.toggle('is-active', Number(button.dataset.streakGoal) === getStreakGoal());
    });
    next.hidden = (!!step.requireClick && !step.actionButton) || !!step.autoFinishAfter || !!step.hideNext;
    next.textContent = step.actionButton || step.button || 'Keyingisi';
    later.hidden = !step.later;
    later.textContent = step.later || 'Keyinroq';
    next.classList.toggle('j-tour__next--action', !!step.requireClick && !!step.actionButton);
    card.classList.toggle('is-action-required', !!step.requireClick);
    card.classList.toggle('is-streak-goal', step.id === 'streak-goal');
    card.classList.toggle('is-streak-confirmed', !!step.celebration);
    applyCardPlacement(step);
    updateAssets();

    try {
      if (step.prepare) await step.prepare();
    } catch (_) {
      /* Ko‘rinish yuklanmasa ham kartani qotirib qo‘ymaymiz. */
    }
    screen.scrollTop = 0;
    if (token !== runToken) return;
    const target = await waitForTarget(step, token);
    if (!target || token !== runToken) {
      card.classList.remove('is-preparing');
      next.disabled = !!step.choices && !getStreakGoal();
      focus.hidden = true;
      showToast('Bu qadamdagi element hali yuklanmadi. Qayta urinib ko‘ring.');
      return;
    }

    const groupedTargets = step.targetGroup
      ? [...document.querySelectorAll(step.targetGroup)]
        .filter(node => node.getClientRects().length)
        .slice(0, step.targetGroupLimit || 99)
      : [];
    activeTargets = groupedTargets.length ? groupedTargets : [target];
    activeTarget = target;
    activeTargets.forEach(node => node.classList.add('j-tour__target'));
    await revealTarget(target, step);
    screen.scrollTop = 0;
    if (token !== runToken) return;
    positionTour();
    requestAnimationFrame(() => {
      if (token !== runToken) return;
      focus.hidden = !!step.hideFocus;
      playCardBubble();
      if (step.celebration) {
        fireConfetti();
        playSound('streak');
      }
    });
    setTimeout(() => {
      if (token === runToken && !root.hidden && activeTarget) positionTour();
    }, 180);
    if (step.effect === 'streak-fire') {
      requestAnimationFrame(() => animateStreakFire(target, token));
    }

    if (step.autoFinishAfter) {
      autoFinishTimer = setTimeout(() => {
        if (token !== runToken || root.hidden) return;
        playSound('finish');
        closeTour(true);
      }, step.autoFinishAfter);
    }

    next.disabled = !!step.choices && !getStreakGoal();

    if (step.autoFinishAfter) card.focus({ preventScroll: true });
    else if (step.requireClick && !step.actionButton) target.focus({ preventScroll: true });
    else next.focus({ preventScroll: true });
  }

  async function advance() {
    const step = steps[stepIndex];
    await transitionCurrentStep();
    if (step.openPayment) {
      playSound('bubble');
      safeSet();
      closeTour(false);
      await preparePaymentQr();
      return;
    }
    if (step.flow === 'streak') {
      await startStreakReward();
      return;
    }
    if (step.onNext) await step.onNext();
    if (step.manualNext) return;
    if (stepIndex >= steps.length - 1) {
      playSound('finish');
      closeTour(true);
      return;
    }
    activateStep(stepIndex + 1);
  }

  function startTour() {
    if (selectedDay !== 6) clearPaymentExpiredState();
    awaitingCoinShopReturn = false;
    steps = selectedSteps();
    if (selectedDay === 5 || selectedDay === 7) {
      showPlainApp();
      return;
    }
    if (selectedDay === 6) {
      showExpiredPaymentApp();
      return;
    }
    stepIndex = 0;
    activateStep(0);
  }

  function closeTour(markComplete = false) {
    awaitingCoinShopReturn = false;
    runToken += 1;
    if (markComplete) safeSet();
    clearTarget();
    clearStreakFire();
    clearTimeout(cardAnimationTimer);
    clearTimeout(autoFinishTimer);
    clearTimeout(pushPreviewTimer);
    pushPreview.classList.remove('is-visible');
    pushPreview.hidden = true;
    pushPermission.hidden = true;
    root.classList.remove('is-running');
    screen.classList.remove('j-tour-scroll-locked');
    root.hidden = true;
    // Kunlik ma'lumot tugagach, foydalanuvchini ochiq qolgan ichki sahifada
    // (masalan, mentor chatida) qoldirmaymiz — odatiy bosh sahifaga qaytaramiz.
    if (markComplete) {
      goHome()
        .then(resetViewportScroll)
        .catch(resetViewportScroll);
    }
  }

  // 5 va 7-kun QA holati: ilovaning o‘zi, onboarding qatlamlarisiz.
  function showPlainApp(paymentExpired = false) {
    awaitingCoinShopReturn = false;
    runToken += 1;
    clearTarget();
    clearStreakFire();
    closeSheet();
    clearTimeout(cardAnimationTimer);
    clearTimeout(autoFinishTimer);
    clearTimeout(pushPreviewTimer);
    pushPreview.classList.remove('is-visible');
    pushPreview.hidden = true;
    pushPermission.hidden = true;
    card.hidden = true;
    focus.hidden = true;
    lesson.hidden = true;
    success.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = true; });
    root.classList.remove('is-running');
    root.hidden = true;
    screen.classList.remove('j-tour-scroll-locked');
    // 5-kun bosh sahifadan boshlanadi. Jadval faqat «Dars jadvali» yorlig'i
    // bosilganda ochilishi mumkin.
    window.__closeModuleConsultation?.();
    window.__closeSalesReminder?.();
    window.__closeSchedule?.();
    goHome()
      .then(() => {
        resetViewportScroll();
        if (paymentExpired) setPaymentExpiredState();
        else clearPaymentExpiredState();
        if (selectedDay === 5 && params.get('consult') === '1') {
          setTimeout(() => window.__openModuleConsultation?.(), 180);
        }
        if (selectedDay === 7 && params.get('sales') !== '0') {
          setTimeout(() => window.__openSalesReminder?.(), 180);
        }
      })
      .catch(resetViewportScroll);
  }

  function showExpiredPaymentApp() {
    showPlainApp(true);
  }

  function clearPaymentExpiredState() {
    document.body.classList.remove('j-payment-expired');
    document.querySelector('.j-expired-banner')?.remove();
    document.querySelectorAll('.j-course-locked').forEach(card => {
      card.classList.remove('j-course-locked');
      card.removeAttribute('aria-disabled');
    });
  }

  function setPaymentExpiredState() {
    document.body.classList.add('j-payment-expired');
    const home = document.querySelector('.scr[data-screen="home"]');
    const topbar = home?.querySelector('.topbar');
    if (home && !home.querySelector('.j-expired-banner')) {
      const banner = document.createElement('aside');
      banner.className = 'j-expired-banner';
      banner.innerHTML = '<span class="j-expired-banner__icon">⌛</span><span><b>O‘qish muddati tugagan</b><small>Kurslar saqlangan. Davom etish uchun qayta faollashtiring.</small></span><button type="button" data-reactivate>Qayta faollashtirish</button>';
      (topbar || home.firstElementChild)?.after(banner);
    }
    document.querySelectorAll('.scr[data-screen="home"] .mk__card, .scr[data-screen="courses"] .plan__course').forEach(card => {
      card.classList.add('j-course-locked');
      card.setAttribute('aria-disabled', 'true');
    });
  }

  function installPaymentExpiredFlow() {
    if (document.querySelector('.j-expired-modal')) return;
    const modal = document.createElement('section');
    modal.className = 'j-expired-modal';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Kursni qayta faollashtirish');
    modal.innerHTML = `
      <div class="j-expired-modal__scrim" data-expired-close></div>
      <div class="j-expired-modal__card">
        <span class="j-expired-modal__lock">🔒</span>
        <div data-expired-view="continue">
          <small>O‘QISHNI DAVOM ETTIRISH</small>
          <h2>Sizni uzoq kutdik!</h2>
          <p>Darslarni davom ettiramizmi? Kurslaringiz, natijalaringiz va Coin’laringiz saqlab qolingan.</p>
          <button type="button" data-expired-pay>Ha, davom ettiraman</button>
          <button type="button" data-expired-close>Hozir emas</button>
        </div>
        <div data-expired-view="sales" hidden>
          <small>QAYTA FAOLLASHTIRISH</small>
          <h2>Sotuv bo‘limi yordam beradi</h2>
          <p>Raqamingizni qoldiring — mutaxassisimiz sizga qulay to‘lov havolasini yuboradi.</p>
          <label>Telefon raqam<input name="phone" inputmode="tel" placeholder="+998 90 123 45 67"></label>
          <button type="button" data-expired-send>Telefon raqam qoldirish</button>
          <button type="button" data-expired-close>Bekor qilish</button>
        </div>
        <div data-expired-view="sent" hidden>
          <span class="j-expired-modal__sent">✓</span>
          <h2>Telefon raqamingiz qabul qilindi</h2>
          <p>Sotuv bo‘limi siz bilan bog‘lanib, to‘lov havolasini yuboradi.</p>
          <button type="button" data-expired-close>Tushunarli</button>
        </div>
      </div>`;
    document.body.appendChild(modal);

    const showView = name => modal.querySelectorAll('[data-expired-view]').forEach(view => {
      view.hidden = view.dataset.expiredView !== name;
    });
    const open = mode => {
      showView(mode);
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add('is-open'));
    };
    const close = () => {
      modal.classList.remove('is-open');
      modal.hidden = true;
    };
    modal.addEventListener('click', async event => {
      if (event.target.closest('[data-expired-close]')) { close(); return; }
      if (event.target.closest('[data-expired-pay]')) {
        close();
        await preparePaymentQr();
        const note = document.querySelector('#sheetHost .sheet[data-widget="payment"] .s-note');
        if (note) note.textContent = 'Kurslarni qayta faollashtirish uchun to‘lovni amalga oshiring.';
        return;
      }
      if (event.target.closest('[data-expired-send]')) {
        const phone = modal.querySelector('input[name="phone"]')?.value.trim();
        window.dispatchEvent(new CustomEvent('junior:sales-lead', { detail: { phone, source: 'payment-expired' } }));
        if (typeof window.JUNIOR_CREATE_SALES_LEAD === 'function') window.JUNIOR_CREATE_SALES_LEAD({ phone, source: 'payment-expired' });
        showView('sent');
      }
    });
    document.addEventListener('click', event => {
      if (selectedDay !== 6) return;
      if (event.target.closest('[data-reactivate]')) {
        event.preventDefault(); event.stopImmediatePropagation(); open('sales'); return;
      }
      if (event.target.closest('.j-course-locked')) {
        event.preventDefault(); event.stopImmediatePropagation(); open('continue');
      }
    }, true);
  }

  function installModuleConsultationFlow() {
    if (screen.querySelector('.j-module-consult')) return;
    const modal = document.createElement('section');
    modal.className = 'j-module-consult';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'j-module-consult-title');
    modal.innerHTML = `
      <div class="j-module-consult__scrim" data-module-consult-close></div>
      <article class="j-module-consult__card">
        <button class="j-module-consult__close" type="button" data-module-consult-close aria-label="Yopish">×</button>
        <div data-module-consult-view="form">
          <div class="j-module-consult__hero">
            <span class="j-module-consult__done"><i>✓</i><small>1-MODUL</small><b>To‘liq yakunlandi!</b></span>
            <img data-a="a2" alt="Junior maskoti">
          </div>
          <small class="j-module-consult__eyebrow">KEYINGI BOSQICH</small>
          <h2 id="j-module-consult-title">2-modulga birga o‘tamizmi?</h2>
          <p>Keyingi modulni boshlashdan oldin sotuv bo‘limi mutaxassisi sizga mos o‘qish rejasini tanlashga yordam beradi.</p>
          <div class="j-module-consult__benefits">
            <span>✓ Bepul konsultatsiya</span><span>✓ Sizga mos reja</span>
          </div>
          <label>Telefon raqamingiz
            <input name="module-consult-phone" inputmode="tel" autocomplete="tel" placeholder="+998 90 123 45 67">
          </label>
          <button class="j-module-consult__primary" type="button" data-module-consult-send>Konsultatsiyaga yozilish</button>
          <button class="j-module-consult__later" type="button" data-module-consult-close>Keyinroq</button>
        </div>
        <div class="j-module-consult__success" data-module-consult-view="success" hidden>
          <span>✓</span>
          <small>SO‘ROV QABUL QILINDI</small>
          <h2>2-modul sari bir qadam qoldi!</h2>
          <p>Sotuv bo‘limi mutaxassisi tez orada siz bilan bog‘lanib, keyingi qadamlarni tushuntiradi.</p>
          <button class="j-module-consult__primary" type="button" data-module-consult-close>Tushunarli</button>
        </div>
      </article>`;
    screen.appendChild(modal);
    updateAssets();

    const showView = name => modal.querySelectorAll('[data-module-consult-view]').forEach(view => {
      view.hidden = view.dataset.moduleConsultView !== name;
    });
    const open = () => {
      if (selectedDay !== 5) return;
      showView('form');
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add('is-open'));
      updateAssets();
    };
    const close = () => {
      modal.classList.remove('is-open');
      modal.hidden = true;
    };
    window.__openModuleConsultation = open;
    window.__closeModuleConsultation = close;

    modal.addEventListener('click', event => {
      if (event.target.closest('[data-module-consult-close]')) { close(); return; }
      if (event.target.closest('[data-module-consult-send]')) {
        const phone = modal.querySelector('[name="module-consult-phone"]')?.value.trim() || '';
        window.dispatchEvent(new CustomEvent('junior:sales-lead', {
          detail: { phone, source: 'module-2-consultation' }
        }));
        showView('success');
      }
    });

    const bindSecondModuleCard = () => {
      const cards = [...document.querySelectorAll('.scr[data-screen="home"] .mk__card')];
      const secondModuleCard = cards[1];
      if (!secondModuleCard || secondModuleCard.dataset.moduleConsultBound === '1') return;
      secondModuleCard.dataset.moduleConsultBound = '1';
      secondModuleCard.addEventListener('click', event => {
        if (selectedDay !== 5) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        open();
      }, true);
    };
    bindSecondModuleCard();
    new MutationObserver(bindSecondModuleCard).observe(content, { childList: true, subtree: true });
  }

  function installSalesReminderFlow() {
    if (screen.querySelector('.j-sales-reminder')) return;
    const modal = document.createElement('section');
    modal.className = 'j-sales-reminder';
    modal.hidden = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'j-sales-reminder-title');
    modal.innerHTML = `
      <div class="j-sales-reminder__scrim" data-sales-reminder-close></div>
      <article class="j-sales-reminder__card">
        <button class="j-sales-reminder__close" type="button" data-sales-reminder-close aria-label="Yopish">×</button>
        <div data-sales-reminder-view="info">
          <div class="j-sales-reminder__hero">
            <span><i>✓</i><small>1-DARS</small><b>Muvaffaqiyatli yakunlandi!</b></span>
            <img data-a="a2" alt="Junior maskoti">
          </div>
          <small class="j-sales-reminder__eyebrow">YANGI O‘QUVCHI UCHUN ESLATMA</small>
          <h2 id="j-sales-reminder-title">Savolingiz bo‘lsa, biz yoningizdamiz</h2>
          <p>Sotuv bo‘limi faqat to‘lov uchun emas — o‘qishni qulay davom ettirishingizga ham yordam beradi.</p>
          <div class="j-sales-reminder__help">
            <span><i>🎯</i><b>To‘g‘ri kurs va tarifni tanlash</b></span>
            <span><i>💳</i><b>To‘lov bo‘yicha savollarga javob</b></span>
            <span><i>🗓️</i><b>Guruh va dars jadvalini aniqlash</b></span>
          </div>
          <button class="j-sales-reminder__primary" type="button" data-sales-reminder-send>Sotuv bo‘limiga yozilish</button>
          <button class="j-sales-reminder__later" type="button" data-sales-reminder-close>Tushunarli</button>
        </div>
        <div class="j-sales-reminder__success" data-sales-reminder-view="success" hidden>
          <span>✓</span>
          <small>SO‘ROV QABUL QILINDI</small>
          <h2>Mutaxassisimiz siz bilan bog‘lanadi</h2>
          <p>Profilingizdagi telefon raqami orqali sizga qulay vaqtda bog‘lanamiz.</p>
          <button class="j-sales-reminder__primary" type="button" data-sales-reminder-close>Davom etish</button>
        </div>
      </article>`;
    screen.appendChild(modal);
    updateAssets();

    const showView = name => modal.querySelectorAll('[data-sales-reminder-view]').forEach(view => {
      view.hidden = view.dataset.salesReminderView !== name;
    });
    const open = () => {
      if (selectedDay !== 7) return;
      showView('info');
      modal.hidden = false;
      requestAnimationFrame(() => modal.classList.add('is-open'));
      updateAssets();
    };
    const close = () => {
      modal.classList.remove('is-open');
      modal.hidden = true;
    };
    window.__openSalesReminder = open;
    window.__closeSalesReminder = close;

    modal.addEventListener('click', event => {
      if (event.target.closest('[data-sales-reminder-close]')) { close(); return; }
      if (event.target.closest('[data-sales-reminder-send]')) {
        window.dispatchEvent(new CustomEvent('junior:sales-lead', {
          detail: { source: 'first-lesson-sales-reminder' }
        }));
        showView('success');
      }
    });

    const bindFirstLessonCard = () => {
      const firstLessonCard = document.querySelector('.scr[data-screen="home"] .mk__card');
      if (!firstLessonCard || firstLessonCard.dataset.salesReminderBound === '1') return;
      firstLessonCard.dataset.salesReminderBound = '1';
      firstLessonCard.addEventListener('click', event => {
        if (selectedDay !== 7) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        open();
      }, true);
    };
    bindFirstLessonCard();
    new MutationObserver(bindFirstLessonCard).observe(content, { childList: true, subtree: true });
  }

  function resetViewportScroll() {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    screen.scrollTop = 0;
  }

  function showLessonStage(index) {
    lessonStageIndex = Math.max(0, Math.min(3, index));
    const names = ['video', 'test', 'reward', 'practice'];
    const visibleSteps = [1, 2, 2, 3];
    const progress = [33.333, 66.666, 66.666, 100];
    const hints = ['Videoni ko‘ring', 'To‘g‘ri javobni tanlang', 'Natijangiz bilan faxrlanamiz', 'Amaliy vazifani bajaring'];
    const buttons = ['Davom etish', 'Javobni tanlang', 'Mukofotni ochish', 'Vazifani topshirish'];
    lesson.dataset.stage = names[lessonStageIndex];
    lessonStages.forEach(stage => { stage.hidden = stage.dataset.lessonStage !== names[lessonStageIndex]; });
    lessonStep.textContent = String(visibleSteps[lessonStageIndex]);
    lessonProgress.style.width = `${progress[lessonStageIndex]}%`;
    lessonHint.textContent = hints[lessonStageIndex];
    lessonFinish.textContent = buttons[lessonStageIndex];
    lessonFinish.disabled = lessonStageIndex === 0 ? !videoCompleted : lessonStageIndex === 1;
    const lessonBody = lesson.querySelector('.j-lesson__body');
    if (lessonBody) lessonBody.scrollTo({ top: 0, behavior: 'auto' });
    resetViewportScroll();
    if (lessonStageIndex === 1) {
      lesson.querySelectorAll('[data-lesson-answer]').forEach(button => button.classList.remove('is-correct', 'is-wrong'));
      const feedback = lesson.querySelector('[data-lesson-feedback]');
      if (feedback) feedback.textContent = 'To‘g‘ri javobni tanlang.';
    }
    if (lessonStageIndex > 0) playSound('bubble');
    if (lessonStageIndex === 2) fireConfetti();
  }

  function openLesson() {
    runToken += 1;
    resetViewportScroll();
    screen.classList.remove('j-tour-scroll-locked');
    clearTarget();
    card.hidden = true;
    focus.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = true; });
    lesson.hidden = false;
    success.hidden = true;
    videoCompleted = false;
    const player = lesson.querySelector('[data-video-play]');
    player?.classList.remove('is-playing', 'is-complete');
    if (player) player.disabled = false;
    const videoTime = lesson.querySelector('[data-video-time]');
    if (videoTime) videoTime.textContent = '0:00';
    showLessonStage(0);
    updateAssets();
    player?.focus({ preventScroll: true });
  }

  function updateDashboardReward(coinAmount = 0, pointAmount = 0) {
    const balances = [...document.querySelectorAll('.topbar__pills .tb-pill b')];
    [[balances[0], coinAmount], [balances[1], pointAmount]].forEach(([balance, amount]) => {
      if (!balance || !amount) return;
      clearInterval(balance.__cnt);
      const current = Number(balance.dataset.count) || parseInt(balance.textContent.replace(/\s/g, ''), 10) || 0;
      const value = current + amount;
      balance.textContent = String(value);
      balance.dataset.count = String(value);
      balance.closest('.tb-pill')?.classList.add('j-tour__coin-pop');
    });
    const ring = document.querySelector('.plan__ringtxt b');
    if (ring) ring.innerHTML = '1<i>/2</i>';
  }

  function fireConfetti() {
    const colors = ['#ff4f28', '#ffbd2e', '#00b884', '#6c68e8', '#2ea8ff', '#ff70ad'];
    for (let i = 0; i < 44; i += 1) {
      const bit = document.createElement('i');
      bit.className = 'j-tour__confetti';
      bit.style.left = `${Math.random() * 100}%`;
      bit.style.background = colors[i % colors.length];
      bit.style.setProperty('--x', `${(Math.random() - .5) * 230}px`);
      bit.style.setProperty('--r', `${(Math.random() * 900) - 450}deg`);
      bit.style.setProperty('--dur', `${1.45 + Math.random() * .9}s`);
      bit.style.animationDelay = `${Math.random() * .22}s`;
      root.appendChild(bit);
      setTimeout(() => bit.remove(), 2700);
    }
  }

  function showRewardStage(name) {
    success.dataset.rewardStage = name;
    rewardPanels.forEach(panel => {
      const active = panel.dataset.rewardPanel === name;
      panel.hidden = !active;
      panel.classList.remove('is-entering');
      if (active) panel.classList.add('is-entering');
    });
  }

  function fireCoinBurst() {
    const panel = success.querySelector('[data-reward-panel="coin"]');
    if (!panel) return;
    for (let i = 0; i < 12; i += 1) {
      const coin = document.createElement('i');
      coin.className = 'j-reward__coin-particle';
      coin.textContent = 'J';
      coin.style.setProperty('--coin-x', `${(Math.random() - .5) * 230}px`);
      coin.style.setProperty('--coin-y', `${-70 - Math.random() * 150}px`);
      coin.style.setProperty('--coin-r', `${(Math.random() * 520) - 260}deg`);
      coin.style.animationDelay = `${Math.random() * .16}s`;
      panel.appendChild(coin);
      setTimeout(() => coin.remove(), 1500);
    }
  }

  function igniteRewardStreak() {
    if (rewardLocked || success.dataset.rewardStage !== 'ignite') return;
    rewardLocked = true;
    playSound('whoosh');
    setTimeout(() => {
      showRewardStage('streak');
      fireConfetti();
      playSound('streak');
      rewardLocked = false;
      rewardNext?.focus({ preventScroll: true });
    }, 1250);
  }

  function openRewardChest() {
    const panel = success.querySelector('[data-reward-panel="coin"]');
    if (!panel || panel.classList.contains('is-opened')) return;
    const config = rewardMode === 'task-accepted'
      ? {
        coin: 70,
        point: 0,
        title: 'Vazifa qabul qilindi! 🎉',
        text: 'Amaliy vazifani muvaffaqiyatli topshirdingiz. 70 Coin balansingizga qo‘shildi.'
      }
      : {
        coin: 32,
        point: 32,
        title: 'Mukofot sandig‘ingiz tayyor!',
        text: 'Darsni muvaffaqiyatli tugatganingiz uchun sandiqni oching.'
      };
    panel.classList.add('is-opened');
    playSound('chest');
    updateDashboardReward(config.coin, config.point);
    fireCoinBurst();
    setTimeout(fireConfetti, 120);
    setTimeout(() => playSound('coin'), 230);
    setTimeout(() => {
      const coinTitle = panel.querySelector('[data-coin-title]');
      const coinText = panel.querySelector('[data-coin-text]');
      if (coinTitle) coinTitle.textContent = config.title;
      if (coinText) coinText.textContent = config.text;
      if (selectedDay === 2 && rewardMode === 'lesson-result') {
        coinShopModal.hidden = false;
        updateAssets();
        coinShopModalNext?.focus({ preventScroll: true });
      } else {
        finish.hidden = false;
        finish.focus({ preventScroll: true });
      }
    }, 780);
  }

  async function completeLesson() {
    rewardMode = 'lesson-result';
    playSound('complete');
    await goHome();
    content.scrollTo({ top: 0, behavior: 'auto' });
    resetViewportScroll();
    lesson.hidden = true;
    success.hidden = false;
    card.hidden = true;
    focus.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = false; });
    setShadeLayout(0, 0, 0, 0, screen.clientWidth, screen.clientHeight);
    shades.top.style.height = `${screen.clientHeight}px`;
    shades.top.style.background = 'rgba(14, 20, 35, .66)';
    ['left', 'right', 'bottom'].forEach(key => { shades[key].style.width = '0px'; shades[key].style.height = '0px'; });
    rewardLocked = false;
    finish.hidden = true;
    coinShopModal.hidden = true;
    success.querySelector('[data-reward-panel="ignite"]')?.classList.remove('is-igniting');
    success.querySelector('[data-reward-panel="coin"]')?.classList.remove('is-opened');
    const coinTitle = success.querySelector('[data-coin-title]');
    const coinText = success.querySelector('[data-coin-text]');
    const coinKicker = success.querySelector('[data-reward-panel="coin"] .j-reward__kicker');
    if (coinKicker) coinKicker.textContent = 'Birinchi dars mukofoti';
    if (coinTitle) coinTitle.textContent = 'Mukofot sandig‘ingiz tayyor!';
    if (coinText) coinText.textContent = 'Darsni muvaffaqiyatli tugatganingiz uchun sandiqni oching.';
    const coinBadge = success.querySelector('.j-reward__coin');
    const coinResult = success.querySelector('.j-reward__coin-result b');
    const coinResultText = success.querySelector('.j-reward__coin-result span');
    if (coinBadge) coinBadge.textContent = '+32';
    if (coinResult) coinResult.textContent = '+32 coin';
    if (coinResultText) coinResultText.textContent = '+32 point';
    finish.textContent = 'Davom etish';
    showRewardStage('coin');
    updateAssets();
    rewardChest?.focus({ preventScroll: true });
  }

  async function showTaskAcceptedReward() {
    rewardMode = 'task-accepted';
    playSound('complete');
    await goHome();
    content.scrollTo({ top: 0, behavior: 'auto' });
    resetViewportScroll();
    lesson.hidden = true;
    success.hidden = false;
    card.hidden = true;
    focus.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = false; });
    setShadeLayout(0, 0, 0, 0, screen.clientWidth, screen.clientHeight);
    shades.top.style.height = `${screen.clientHeight}px`;
    shades.top.style.background = 'rgba(14, 20, 35, .66)';
    ['left', 'right', 'bottom'].forEach(key => { shades[key].style.width = '0px'; shades[key].style.height = '0px'; });
    finish.hidden = true;
    coinShopModal.hidden = true;
    const panel = success.querySelector('[data-reward-panel="coin"]');
    panel?.classList.remove('is-opened');
    const kicker = panel?.querySelector('.j-reward__kicker');
    const coinTitle = panel?.querySelector('[data-coin-title]');
    const coinText = panel?.querySelector('[data-coin-text]');
    const coinBadge = panel?.querySelector('.j-reward__coin');
    const coinResult = panel?.querySelector('.j-reward__coin-result b');
    const coinResultText = panel?.querySelector('.j-reward__coin-result span');
    if (kicker) kicker.textContent = 'Amaliy vazifa mukofoti';
    if (coinTitle) coinTitle.textContent = '70 Coin mukofotingiz tayyor!';
    if (coinText) coinText.textContent = 'Vazifangiz qabul qilindi. Sandiqni oching.';
    if (coinBadge) coinBadge.textContent = '+70';
    if (coinResult) coinResult.textContent = '+70 Coin';
    if (coinResultText) coinResultText.textContent = 'Balansda';
    finish.textContent = 'Davom etish';
    showRewardStage('coin');
    updateAssets();
    rewardChest?.focus({ preventScroll: true });
  }

  async function startStreakReward() {
    rewardMode = 'streak';
    const streakCount = Math.min(Math.max(selectedDay, 1), 7);
    const streakSpeech = success.querySelector('[data-streak-speech]');
    const streakNumber = success.querySelector('[data-streak-number]');
    const streakTitle = success.querySelector('[data-streak-title]');
    const copy = {
      1: ['O‘qish kundalik odatga aylanishi uchun har kuni ozgina vaqt ajrating.', '1 kunlik seriya'],
      2: ['Ikki kun ketma-ket dars qildingiz. Shu tempni saqlab qoling!', '2 kunlik seriya'],
      3: ['Uch kunlik odat shakllanmoqda. Har kuni ozgina qadam tashlang!', '3 kunlik seriya']
    }[streakCount] || ['Har kuni ozgina vaqt ajrating va seriyangizni davom ettiring.', `${streakCount} kunlik seriya`];
    if (streakSpeech) streakSpeech.textContent = copy[0];
    if (streakNumber) streakNumber.textContent = String(streakCount);
    if (streakTitle) streakTitle.textContent = copy[1];
    success.querySelectorAll('[data-streak-day]').forEach(day => {
      day.classList.toggle('is-done', Number(day.dataset.streakDay) <= streakCount);
    });
    playSound('complete');
    await goHome();
    content.scrollTo({ top: 0, behavior: 'auto' });
    resetViewportScroll();
    lesson.hidden = true;
    success.hidden = false;
    card.hidden = true;
    focus.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = false; });
    setShadeLayout(0, 0, 0, 0, screen.clientWidth, screen.clientHeight);
    shades.top.style.height = `${screen.clientHeight}px`;
    shades.top.style.background = 'rgba(14, 20, 35, .66)';
    ['left', 'right', 'bottom'].forEach(key => { shades[key].style.width = '0px'; shades[key].style.height = '0px'; });
    rewardLocked = false;
    rewardNext.innerHTML = 'Davom etish&nbsp;&nbsp; →';
    if (igniteFrame) igniteFrame.src = `./ignite-streak.html?v=20261021-4&run=${Date.now()}`;
    showRewardStage('ignite');
    updateAssets();
  }

  async function openPracticalTask() {
    await goHome();
    success.hidden = true;
    card.hidden = true;
    focus.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = true; });
    lesson.hidden = false;
    showLessonStage(3);
    updateAssets();
    lessonFinish.focus({ preventScroll: true });
  }

  choices.querySelectorAll('[data-streak-goal]').forEach(button => {
    button.addEventListener('click', () => {
      const days = Number(button.dataset.streakGoal);
      saveStreakGoal(days);
      streakPreview.textContent = String(days);
      streakGoalTitle.textContent = 'O‘zingga maqsad qo‘y!';
      streakGoalText.textContent = 'Necha kun ketma-ket o‘rganishni xohlaysan? Maqsadingni tanla va intil!';
      choices.querySelectorAll('[data-streak-goal]').forEach(node => node.classList.toggle('is-active', node === button));
      next.disabled = false;
      playSound('correct');
    });
  });
  later.addEventListener('click', () => {
    playSound('finish');
    closeTour(true);
  });
  skip.addEventListener('click', () => {
    playSound('finish');
    closeTour(true);
  });

  next.addEventListener('click', () => {
    if (next.disabled || actionPending) return;
    const step = steps[stepIndex];
    if (step?.requireClick && step.actionButton && activeTarget) {
      activeTarget.click();
      return;
    }
    actionPending = true;
    next.disabled = true;
    advance();
  });
  screen.addEventListener('pointerdown', event => {
    if (!event.target.closest('button, a, input, select, [role="button"], .wcard')) return;
    unlockAudioAndPlay('tap');
  }, true);
  const videoPlayer = lesson.querySelector('[data-video-play]');
  videoPlayer?.addEventListener('click', () => {
    if (lessonStageIndex !== 0 || videoCompleted || videoPlayer.classList.contains('is-playing')) return;
    playSound('video');
    videoPlayer.classList.add('is-playing');
    videoPlayer.disabled = true;
    lessonHint.textContent = 'Video dars ko‘rilmoqda…';
    const videoTime = lesson.querySelector('[data-video-time]');
    setTimeout(() => {
      videoPlayer.classList.remove('is-playing');
      videoPlayer.classList.add('is-complete');
      videoPlayer.disabled = false;
      videoCompleted = true;
      if (videoTime) videoTime.textContent = '13:52';
      lessonHint.textContent = 'Video yakunlandi ✓';
      lessonFinish.disabled = false;
      playSound('correct');
      lessonFinish.focus({ preventScroll: true });
    }, 1100);
  });
  lessonBack?.addEventListener('click', () => {
    if (lessonStageIndex > 0) {
      showLessonStage(lessonStageIndex - 1);
      return;
    }
    lesson.hidden = true;
    activateStep(findStepIndex('lesson-entry'));
  });
  lesson.querySelectorAll('[data-lesson-answer]').forEach(button => {
    button.addEventListener('click', () => {
      if (lessonStageIndex !== 1) return;
      const feedback = lesson.querySelector('[data-lesson-feedback]');
      lesson.querySelectorAll('[data-lesson-answer]').forEach(node => node.classList.remove('is-correct', 'is-wrong'));
      if (button.dataset.lessonAnswer === 'correct') {
        playSound('correct');
        button.classList.add('is-correct');
        if (feedback) feedback.textContent = 'To‘g‘ri! Keyingi qadamga o‘tamiz.';
        lessonHint.textContent = 'Javobingiz to‘g‘ri ✓';
        setTimeout(() => showLessonStage(2), 360);
      } else {
        playSound('wrong');
        button.classList.add('is-wrong');
        if (feedback) feedback.textContent = 'Yana bir bor o‘ylab ko‘ring.';
      }
    });
  });
  lessonFinish.addEventListener('click', () => {
    if (lessonFinish.disabled) return;
    if (lessonStageIndex === 0 && videoCompleted) {
      showLessonStage(1);
      return;
    }
    if (lessonStageIndex === 2) {
      completeLesson();
      return;
    }
    if (lessonStageIndex === 3) {
      showTaskAcceptedReward();
    }
  });
  window.addEventListener('message', event => {
    if (event.origin !== window.location.origin) return;
    if (!igniteFrame || event.source !== igniteFrame.contentWindow) return;
    if (event.data?.type === 'junior-streak-ignited') igniteRewardStreak();
  });
  rewardNext?.addEventListener('click', () => {
    if (rewardMode === 'streak') {
      playSound('finish');
      success.hidden = true;
      if (selectedDay === 1) activateStep(findStepIndex('teachers'));
      else if (selectedDay === 2) activateStep(findStepIndex('leaderboard'));
      else if (selectedDay === 3) activateStep(findStepIndex('streak-goal'));
      else closeTour(true);
      return;
    }
    showRewardStage('coin');
    playSound('bubble');
    rewardChest?.focus({ preventScroll: true });
  });
  rewardChest?.addEventListener('click', openRewardChest);
  coinShopModalNext?.addEventListener('click', async () => {
    if (coinShopModalNext.disabled) return;
    coinShopModalNext.disabled = true;
    actionPending = true;
    playSound('bubble');
    coinShopModal.hidden = true;
    success.hidden = true;
    card.hidden = true;
    focus.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = true; });
    screen.classList.remove('j-tour-scroll-locked');
    root.classList.remove('is-running');
    root.hidden = true;
    awaitingCoinShopReturn = true;
    await goScreen('coinshop');
    await activateStep(findStepIndex('coinshop-preview'));
    actionPending = false;
    coinShopModalNext.disabled = false;
  });
  finish.addEventListener('click', () => {
    playSound('finish');
    if (rewardMode === 'lesson-result') {
      success.hidden = true;
      card.hidden = true;
      focus.hidden = true;
      Object.values(shades).forEach(node => { node.hidden = true; });
      lesson.hidden = false;
      showLessonStage(3);
      updateAssets();
      lessonFinish.focus({ preventScroll: true });
      return;
    }
    if (rewardMode === 'task-accepted') {
      success.hidden = true;
      if (selectedDay === 1) {
        startStreakReward();
        return;
      }
      if (selectedDay === 2) {
        startStreakReward();
        return;
      }
      if (selectedDay === 3 && !hasPurchasedCourse) {
        startStreakReward();
        return;
      }
    }
    closeTour(true);
  });

  document.addEventListener('click', event => {
    if (awaitingCoinShopReturn && event.target.closest('.scr[data-screen="coinshop"] [data-back]')) {
      awaitingCoinShopReturn = false;
      setTimeout(() => { openPracticalTask(); }, 0);
    }

    const telegram = event.target.closest('[data-j-team]');
    if (telegram) {
      const contacts = window.JUNIOR_ONBOARDING_CONTACTS || {};
      const username = String(contacts[telegram.dataset.jTeam] || '').replace(/^@/, '');
      if (!username) {
        event.preventDefault();
        showToast('Telegram username berilganda bu tugma chatni ochadi.');
      } else {
        window.open(`https://t.me/${encodeURIComponent(username)}`, '_blank', 'noopener,noreferrer');
      }
    }

    if (root.hidden || lesson.hidden === false || success.hidden === false) return;
    const step = steps[stepIndex];
    const clickedTarget = activeTargets.some(node => node.contains(event.target));
    if (!clickedTarget) return;
    if (actionPending) return;
    if (!step?.requireClick) {
      event.preventDefault();
      event.stopPropagation();
      showToast('Sayohatni davom ettirish uchun pastdagi tugmani bosing.');
      return;
    }
    actionPending = true;
    (async () => {
      await transitionCurrentStep();
      if (step.action === 'lesson') requestAnimationFrame(openLesson);
      else requestAnimationFrame(() => activateStep(stepIndex + 1));
    })();
  }, true);

  pushPermission.querySelector('[data-push-allow]')?.addEventListener('click', () => choosePushPermission(true));
  pushPermission.querySelector('[data-push-later]')?.addEventListener('click', () => choosePushPermission(false));
  dayPicker.querySelectorAll('[data-tour-day]').forEach(button => {
    button.addEventListener('click', () => selectDay(button.dataset.tourDay));
  });
  dayPicker.querySelector('[data-tour-push]')?.addEventListener('click', showPushPermission);

  const targetObserver = new MutationObserver(() => injectTeamCard());
  targetObserver.observe(document.querySelector('#screens') || content, { childList: true, subtree: true });
  injectTeamCard();
  polishProgressiveScreens();
  installActivityRecordings();
  installPaymentExpiredFlow();
  installModuleConsultationFlow();
  installSalesReminderFlow();
  // Ichki ekran qayta chizilsa ham 6-kundagi cheklov va qayta faollashtirish
  // banneri yo'qolib ketmasin.
  const paymentExpiredObserver = new MutationObserver(() => {
    if (selectedDay === 6) setPaymentExpiredState();
  });
  paymentExpiredObserver.observe(content, { childList: true, subtree: true });

  content.addEventListener('scroll', positionTour, { passive: true });
  document.querySelector('#track')?.addEventListener('scroll', positionTour, { passive: true });
  window.addEventListener('resize', positionTour, { passive: true });
  screen.addEventListener('scroll', () => {
    if (!root.hidden && screen.scrollTop !== 0) screen.scrollTop = 0;
  }, { passive: true });
  const stopManualTourScroll = event => {
    if (!root.hidden && lesson.hidden && success.hidden) event.preventDefault();
  };
  screen.addEventListener('wheel', stopManualTourScroll, { passive: false });
  screen.addEventListener('touchmove', stopManualTourScroll, { passive: false });

  const controlRow = document.querySelector('.ctl__row--btns');
  if (controlRow && !controlRow.querySelector('[data-replay-tour]')) {
    const replay = document.createElement('button');
    replay.className = 'btn btn--ghost';
    replay.type = 'button';
    replay.dataset.replayTour = '';
    replay.textContent = 'Onboarding';
    replay.addEventListener('click', startTour);
    controlRow.appendChild(replay);
  }

  window.JuniorOnboarding = {
    open: startTour,
    close: closeTour,
    selectDay,
    showPushPermission,
    get day() { return selectedDay; },
    get storageKey() { return storageKey; }
  };
  updateAssets();
  updateDayPicker();
  const forcePreview = params.get('onboarding') === '1';
  if (selectedDay === 5 || selectedDay === 7) {
    showPlainApp();
  } else if (selectedDay === 6) {
    showExpiredPaymentApp();
  } else if (forcePreview || !safeGet()) {
    if (forcePushPrompt || !getPushPreference()) showPushPermission();
    else startSelectedDay();
  }
})();
