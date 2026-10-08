/* Junior guided onboarding tour.
 * Real ilovada window.JUNIOR_USER_ID va window.JUNIOR_ONBOARDING_CONTACTS
 * backenddan beriladi. Holat qurilmada, user + versiya bo'yicha saqlanadi.
 */
(() => {
  'use strict';

  const screen = document.querySelector('.screen');
  const content = document.querySelector('.content');
  if (!screen || !content) return;

  const VERSION = 'v7-progressive-praise-reward';
  const userId = String(window.JUNIOR_USER_ID || 'demo-user');
  const storageKey = `junior:onboarding:${userId}:${VERSION}`;
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

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
    <aside class="j-tour__card" role="dialog" aria-live="polite">
      <div class="j-tour__meta"><span class="j-tour__count"></span><span class="j-tour__label">Junior sayohati</span></div>
      <div class="j-tour__bar" aria-hidden="true"><i></i></div>
      <h2 class="j-tour__title"></h2>
      <p class="j-tour__text"></p>
      <p class="j-tour__instruction" hidden><span>☝️</span><b></b></p>
      <div class="j-tour__actions">
        <img class="j-tour__mascot" data-a="a2" alt="Junior maskoti">
        <button class="j-tour__next" type="button"></button>
      </div>
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
          <div class="j-platform__mentor-note">
            <span>🎙️</span>
            <p><b>Yordam kerak bo‘lsa, mentor yoningizda</b><small>Amaliy vazifada xato chiqsa, savolingizni mentorga yuborasiz.</small></p>
          </div>
        </section>
      </div>
      <footer class="j-lesson__foot"><span data-lesson-hint>Videoni ko‘ring</span><button type="button" class="j-lesson__finish" disabled>Davom etish</button></footer>
    </section>
    <section class="j-tour__success" hidden role="dialog" aria-label="Birinchi dars mukofoti">
      <section class="j-reward__panel j-reward__panel--ignite" data-reward-panel="ignite">
        <span class="j-reward__kicker">Birinchi streak</span>
        <div class="j-reward__flame-wrap" aria-hidden="true">
          <i class="j-reward__spark j-reward__spark--one"></i>
          <i class="j-reward__spark j-reward__spark--two"></i>
          <i class="j-reward__spark j-reward__spark--three"></i>
          <div class="j-reward__flame"><i></i></div>
        </div>
        <h2>O‘qish olovini yoqing</h2>
        <p>Olovni yuqoriga suring yoki pastdagi tugmani bosing.</p>
        <button type="button" class="j-reward__ignite" data-reward-ignite><span>↑</span> Olovni yoqish</button>
      </section>
      <section class="j-reward__panel j-reward__panel--streak" data-reward-panel="streak" hidden>
        <div class="j-reward__speech">Zo‘r! Birinchi kun bajarildi 🎉 Har kuni bitta dars tugatsangiz, streakingiz o‘sib boradi.</div>
        <div class="j-reward__hero">
          <div class="j-reward__flame j-reward__flame--lit" aria-hidden="true"><i></i></div>
          <img data-a="a2" alt="Junior maskoti">
        </div>
        <strong class="j-reward__number">1</strong>
        <h2>kunlik streak — zo‘r boshlanish!</h2>
        <div class="j-reward__week" aria-label="7 kunlik streak maqsadi">
          <span class="is-done"><b>1</b><i>✓</i></span>
          <span><b>2</b><i></i></span><span><b>3</b><i></i></span><span><b>4</b><i></i></span>
          <span><b>5</b><i></i></span><span><b>6</b><i></i></span><span><b>7</b><i></i></span>
        </div>
        <button type="button" class="j-reward__primary" data-reward-next>Davom etish</button>
      </section>
      <section class="j-reward__panel j-reward__panel--coin" data-reward-panel="coin" hidden>
        <div class="j-reward__coin-content">
          <span class="j-reward__kicker">Birinchi dars mukofoti</span>
          <h2 data-coin-title>Mukofot sandig‘ingiz tayyor!</h2>
          <p data-coin-text>Darsni muvaffaqiyatli tugatganingiz uchun sandiqni oching.</p>
          <button type="button" class="j-reward__chest" data-reward-chest aria-label="Mukofot sandig‘ini ochish">
            <span class="j-reward__chest-glow"></span>
            <span class="j-reward__chest-lid"></span>
            <span class="j-reward__chest-body"></span>
            <span class="j-reward__chest-lock">J</span>
            <span class="j-reward__coin">+20</span>
          </button>
          <div class="j-reward__coin-result" aria-live="polite"><b>+20 coin</b><span>Balansingizga qo‘shildi</span></div>
        </div>
        <button type="button" class="j-tour__finish" hidden>Keyingi darsga o‘tish</button>
      </section>
    </section>
    <div class="j-tour__toast" role="status"></div>`;
  screen.appendChild(root);

  const shades = {
    top: root.querySelector('.j-tour__shade--top'),
    left: root.querySelector('.j-tour__shade--left'),
    right: root.querySelector('.j-tour__shade--right'),
    bottom: root.querySelector('.j-tour__shade--bottom')
  };
  const focus = root.querySelector('.j-tour__focus');
  const streakFire = root.querySelector('.j-tour__streak-fire');
  const card = root.querySelector('.j-tour__card');
  const count = root.querySelector('.j-tour__count');
  const bar = root.querySelector('.j-tour__bar i');
  const title = root.querySelector('.j-tour__title');
  const text = root.querySelector('.j-tour__text');
  const instruction = root.querySelector('.j-tour__instruction');
  const instructionText = instruction.querySelector('b');
  const next = root.querySelector('.j-tour__next');
  const lesson = root.querySelector('.j-tour__lesson');
  const lessonBack = root.querySelector('[data-lesson-back]');
  const lessonFinish = root.querySelector('.j-lesson__finish');
  const lessonProgress = root.querySelector('.j-lesson__progress i');
  const lessonStep = root.querySelector('[data-lesson-step]');
  const lessonHint = root.querySelector('[data-lesson-hint]');
  const lessonStages = [...root.querySelectorAll('[data-lesson-stage]')];
  const success = root.querySelector('.j-tour__success');
  const finish = root.querySelector('.j-tour__finish');
  const rewardPanels = [...root.querySelectorAll('[data-reward-panel]')];
  const rewardIgnite = root.querySelector('[data-reward-ignite]');
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
  let rewardSwipeStart = null;
  let rewardMode = 'first-coin';
  let audioContext = null;
  let actionPending = false;

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
    await delay(28);
  }

  async function goChat() {
    closeSheet();
    click('[data-tab="ai"]');
    await delay(42);
    injectTeamCard();
  }

  async function goScreen(key) {
    closeSheet();
    click(`[data-go="${key}"]`);
    click(`.tab[data-tab="${key}"]`);
    await delay(48);
  }

  async function prepareWidget(key) {
    await goHome();
  }

  async function prepareCoinShop() {
    closeSheet();
    await delay(32);
    closeSheet();
    await delay(24);
  }

  async function prepareCertificates() {
    await goScreen('certificates');
    closeSheet();
    await delay(80);
  }

  function injectTeamCard() {
    const ai = document.querySelector('.scr[data-screen="ai"]');
    if (!ai || ai.querySelector('.j-team')) return;
    const team = document.createElement('section');
    team.className = 'j-team';
    team.setAttribute('aria-label', 'Sizga biriktirilgan ustozlar');
    team.innerHTML = `
      <div class="j-team__head"><span><b>Sizga biriktirilgan ustozlar</b><small>O‘qish davomida yordam beradi</small></span><i>2 ustoz</i></div>
      <div class="j-team__person">
        <span class="j-team__avatar j-team__avatar--curator">🧭</span>
        <span><b>Shaxsiy kurator</b><small>Jadval, progress va tashkiliy masalalar</small></span>
        <button type="button" data-j-team="curator" aria-label="Kuratorga Telegram orqali yozish">Telegram</button>
      </div>
      <div class="j-team__person">
        <span class="j-team__avatar j-team__avatar--mentor">🎙️</span>
        <span><b>Mentor</b><small>Jonli darslar va mavzuga oid savollar</small></span>
        <button type="button" data-j-team="mentor" aria-label="Mentorga Telegram orqali yozish">Telegram</button>
      </div>`;
    const feed = ai.querySelector('.ai-feed');
    if (feed) feed.before(team);
    else ai.appendChild(team);
  }

  function polishProgressiveScreens() {
    const leadersEnd = document.querySelector('.scr[data-screen="leaders"] .lb-end');
    if (leadersEnd) leadersEnd.textContent = 'Sizdan oldinda yana 6 nafar o‘quvchi bor';
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
      title: 'Birinchi darsni boshlash vaqti',
      text: 'Endi birinchi darsingizni oching. Uni tugatsangiz, dastlabki streak va 20 coin olasiz.',
      actionButton: 'Birinchi darsni boshlash',
      requireClick: true,
      action: 'lesson',
      prepare: goHome
    }
  ];

  const steps = [
    {
      target: '.plan__hero',
      title: 'Xush kelibsiz! 👋',
      text: 'Men Junior yordamchisiman. Kerakli imkoniyatlarni aynan vaqti kelganda ko‘rsatib boraman.',
      button: 'Bugungi rejani ko‘rish',
      prepare: goHome
    },
    {
      target: '.plan__hero',
      title: 'Bugun birinchi natijangizni olasiz',
      text: 'Avval video darsni ko‘rasiz, qisqa test yechasiz va birinchi coiningizni olasiz.',
      button: 'Birinchi darsni topish',
      prepare: goHome
    },
    {
      target: '.mk__row--now .mk__card',
      title: 'Birinchi darsingiz tayyor',
      text: 'Faol kursni oching. Dars jarayonini platformaning o‘zida bajarasiz.',
      actionButton: 'Darsni boshlash',
      requireClick: true,
      action: 'lesson',
      prepare: goHome
    },
    {
      target: 'article[data-widget="mentor"] button',
      title: 'Xatoni mentor bilan tuzating',
      text: 'Amaliy vazifada xato chiqdi. Savolingizni bir marta yuboring — mentor to‘g‘ri yo‘nalish beradi.',
      actionButton: 'Savolim bor',
      requireClick: true,
      prepare: () => prepareWidget('mentor')
    },
    {
      target: '.scr[data-screen="ai"] .ai-bar',
      fallback: '.scr[data-screen="ai"] .ai-feed[data-aiview="chat"]',
      title: 'Mentor yo‘nalish berdi',
      text: 'Bitta savolga aniq yo‘nalish oldingiz. Endi xatoni tuzatib, vazifani topshiring.',
      button: 'Tavsiyani qo‘llash',
      flow: 'streak',
      cardPosition: 'top',
      compact: true,
      lowerCard: true,
      prepare: goChat
    },
    {
      target: 'button[data-go="coinshop"]',
      title: 'Coinlarni ishlatishni o‘rganamiz 🪙',
      text: 'Dars va amaliy vazifadan olgan coinlaringizni CoinShopdagi sovg‘alarga almashtirishingiz mumkin.',
      actionButton: 'CoinShopni ochish',
      requireClick: true,
      prepare: goHome
    },
    {
      target: '.scr[data-screen="coinshop"] .cs-banner',
      fallback: '.scr[data-screen="coinshop"] .cs-bal',
      title: 'CoinShop doim shu yerda',
      text: 'Balansingiz yuqorida ko‘rinadi. Coin yetarli bo‘lsa, kerakli sovg‘ani tanlaysiz.',
      actionButton: 'Yo‘riqnomani ochish',
      requireClick: true,
      prepare: prepareCoinShop
    },
    {
      target: 'article[data-widget="webinar"]',
      title: 'Bugun jonli darsga qatnashasizmi?',
      text: 'Vebinar vidjetida jonli dars vaqti, mavzusi va unga qancha vaqt qolgani ko‘rinadi.',
      button: 'Ustozlarimni bilish',
      compact: true,
      prepare: () => prepareWidget('webinar')
    },
    {
      target: '.j-team',
      title: 'Sizga biriktirilgan ustozlar',
      text: 'Kurator tashkiliy masalalarda, mentor esa dars va amaliy vazifalarda yordam beradi.',
      button: 'Keyingi bosqichga o‘tish',
      prepare: goChat
    },
    {
      target: 'button[data-go="certificates"]',
      title: 'Modul yakunlangach',
      text: 'Birinchi modulning oxirgi darsini tugatsangiz, sertifikatlar bo‘limi ochiladi.',
      actionButton: 'Sertifikatlar bo‘limini ko‘rish',
      requireClick: true,
      prepare: goHome
    },
    {
      target: '.scr[data-screen="certificates"] .ct-c[data-ctstate="done"]',
      fallback: '.scr[data-screen="certificates"] .ct-c',
      title: 'Sertifikatingiz shu yerda saqlanadi',
      text: 'Modulni yakunlaganingizdan keyin sertifikat shu bo‘limda ko‘rinadi. Uni istalgan payt ochib ko‘rishingiz mumkin.',
      button: 'Kun natijasini ko‘rish',
      compact: true,
      prepare: prepareCertificates,
      onNext: () => goScreen('leaders')
    },
    {
      target: '.scr[data-screen="leaders"] .lb',
      fallback: '.scr[data-screen="leaders"] .scr__body',
      title: 'Kun oxirida natijangizni solishtiring 🏆',
      text: 'Liderbordda o‘rningiz va to‘plagan ballaringiz ko‘rinadi. Har bir yakunlangan dars sizni yuqoriga olib chiqadi.',
      button: 'Tanishuvni yakunlash',
      prepare: () => goScreen('leaders')
    }
  ];

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
    let moved = false;
    const track = target.closest('#track');
    if (track) {
      const cardTarget = target.closest('article') || target;
      const nextLeft = cardTarget.offsetLeft - (track.clientWidth - cardTarget.offsetWidth) / 2;
      if (Math.abs(track.scrollLeft - nextLeft) > 3) {
        track.scrollTo({ left: nextLeft, behavior: 'auto' });
        moved = true;
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
        moved = true;
      }
    }
    await delay(moved ? 55 : 20);
  }

  function playCardBubble() {
    card.classList.remove('is-preparing', 'is-bubbling');
    void card.offsetWidth;
    card.classList.add('is-bubbling');
    next.disabled = false;
    playSound('bubble');
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
      const tr = activeTargetRect();
      if (!tr) return;
      const pad = activeTarget.matches('button, .plan__shortcut') ? 7 : 9;
      const x = Math.max(5, tr.left - sr.left - pad);
      let y = Math.max(5, tr.top - sr.top - pad);
      const width = Math.min(sr.width - x - 5, tr.width + pad * 2);
      let height = Math.min(sr.height - y - 5, tr.height + pad * 2);
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
        height = Math.max(8, Math.min(height, maxBottom - y));
      }

      setShadeLayout(x, y, width, height, sr.width, sr.height);
      Object.assign(focus.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${targetRadius + pad}px`
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
    clearTarget();
    clearStreakFire();
    root.hidden = false;
    root.classList.add('is-running');
    screen.classList.add('j-tour-scroll-locked');
    screen.scrollTop = 0;
    lesson.hidden = true;
    success.hidden = true;
    card.hidden = false;
    card.classList.remove('is-bubbling');
    card.classList.add('is-preparing');
    next.disabled = true;
    focus.hidden = false;
    Object.values(shades).forEach(node => {
      node.hidden = false;
      node.style.background = 'transparent';
    });

    count.textContent = `${stepIndex + 1}/${steps.length}`;
    bar.style.width = `${((stepIndex + 1) / steps.length) * 100}%`;
    title.textContent = step.title;
    text.textContent = step.text;
    instruction.hidden = !step.instruction;
    instructionText.textContent = step.instruction || '';
    next.hidden = !!step.requireClick && !step.actionButton;
    next.textContent = step.actionButton || step.button || 'Keyingisi';
    next.classList.toggle('j-tour__next--action', !!step.requireClick && !!step.actionButton);
    card.classList.toggle('is-action-required', !!step.requireClick);
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
      next.disabled = false;
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
    activeTarget = activeTargets[0];
    activeTargets.forEach(node => node.classList.add('j-tour__target'));
    await revealTarget(target, step);
    screen.scrollTop = 0;
    if (token !== runToken) return;
    positionTour();
    [120, 280].forEach(wait => setTimeout(() => {
      if (token === runToken && !root.hidden && activeTarget) positionTour();
    }, wait));
    requestAnimationFrame(() => requestAnimationFrame(playCardBubble));
    if (step.effect === 'streak-fire') {
      requestAnimationFrame(() => requestAnimationFrame(() => animateStreakFire(target, token)));
    }

    if (step.requireClick && !step.actionButton) target.focus({ preventScroll: true });
    else next.focus({ preventScroll: true });
  }

  async function advance() {
    const step = steps[stepIndex];
    if (step.flow === 'streak') {
      await startStreakReward();
      return;
    }
    if (step.onNext) await step.onNext();
    if (stepIndex >= steps.length - 1) {
      playSound('finish');
      closeTour(true);
      return;
    }
    activateStep(stepIndex + 1);
  }

  function startTour() {
    stepIndex = 0;
    activateStep(0);
  }

  function closeTour(markComplete = false) {
    runToken += 1;
    if (markComplete) safeSet();
    clearTarget();
    clearStreakFire();
    root.classList.remove('is-running');
    screen.classList.remove('j-tour-scroll-locked');
    root.hidden = true;
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
    const hints = ['Videoni ko‘ring', 'To‘g‘ri javobni tanlang', 'Natijangiz bilan faxrlanamiz', 'Xato chiqsa, mentordan yordam oling'];
    const buttons = ['Davom etish', 'Javobni tanlang', 'Mukofotni ochish', 'Mentordan yordam olish'];
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

  function updateDashboardReward(amount = 20) {
    const coin = document.querySelector('.topbar__pills .tb-pill:first-child b');
    if (coin) {
      const value = (parseInt(coin.textContent.replace(/\s/g, ''), 10) || 0) + amount;
      coin.textContent = String(value);
      coin.dataset.count = String(value);
      coin.closest('.tb-pill')?.classList.add('j-tour__coin-pop');
    }
    const ring = document.querySelector('.plan__ringtxt b');
    if (ring) ring.innerHTML = '1<i>/2</i>';
  }

  function fireConfetti() {
    const colors = ['#ff4f28', '#ffbd2e', '#00b884', '#6c68e8', '#2ea8ff', '#ff70ad'];
    for (let i = 0; i < 82; i += 1) {
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
      if (active) {
        void panel.offsetWidth;
        panel.classList.add('is-entering');
      }
    });
  }

  function fireCoinBurst() {
    const panel = success.querySelector('[data-reward-panel="coin"]');
    if (!panel) return;
    for (let i = 0; i < 18; i += 1) {
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
    const panel = success.querySelector('[data-reward-panel="ignite"]');
    panel?.classList.add('is-igniting');
    setTimeout(() => {
      panel?.classList.remove('is-igniting');
      showRewardStage('streak');
      fireConfetti();
      playSound('streak');
      rewardLocked = false;
      rewardNext?.focus({ preventScroll: true });
    }, 900);
  }

  function openRewardChest() {
    const panel = success.querySelector('[data-reward-panel="coin"]');
    if (!panel || panel.classList.contains('is-opened')) return;
    panel.classList.add('is-opened');
    playSound('chest');
    updateDashboardReward();
    fireCoinBurst();
    setTimeout(fireConfetti, 120);
    setTimeout(() => playSound('coin'), 230);
    setTimeout(() => {
      const coinTitle = panel.querySelector('[data-coin-title]');
      const coinText = panel.querySelector('[data-coin-text]');
      if (coinTitle) coinTitle.textContent = 'Ajoyib! 20 coin sizniki! 🎉';
      if (coinText) coinText.textContent = 'Birinchi dars — birinchi g‘alaba! Coin balansingizga qo‘shildi.';
      finish.hidden = false;
      finish.focus({ preventScroll: true });
    }, 780);
  }

  async function completeLesson() {
    rewardMode = 'first-coin';
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
    rewardSwipeStart = null;
    finish.hidden = true;
    success.querySelector('[data-reward-panel="ignite"]')?.classList.remove('is-igniting');
    success.querySelector('[data-reward-panel="coin"]')?.classList.remove('is-opened');
    const coinTitle = success.querySelector('[data-coin-title]');
    const coinText = success.querySelector('[data-coin-text]');
    if (coinTitle) coinTitle.textContent = 'Mukofot sandig‘ingiz tayyor!';
    if (coinText) coinText.textContent = 'Darsni muvaffaqiyatli tugatganingiz uchun sandiqni oching.';
    const coinBadge = success.querySelector('.j-reward__coin');
    const coinResult = success.querySelector('.j-reward__coin-result b');
    if (coinBadge) coinBadge.textContent = '+20';
    if (coinResult) coinResult.textContent = '+20 coin';
    finish.textContent = 'Amaliy vazifaga o‘tish';
    showRewardStage('coin');
    updateAssets();
    rewardChest?.focus({ preventScroll: true });
  }

  async function startStreakReward() {
    rewardMode = 'streak';
    playSound('complete');
    updateDashboardReward(70);
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
    rewardSwipeStart = null;
    rewardNext.textContent = 'Davom etish';
    showRewardStage('streak');
    updateAssets();
    setTimeout(() => {
      fireConfetti();
      playSound('streak');
    }, 140);
    rewardNext?.focus({ preventScroll: true });
  }

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
    activateStep(2);
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
      playSound('bubble');
      lesson.hidden = true;
      activateStep(3);
    }
  });
  rewardIgnite?.addEventListener('click', igniteRewardStreak);
  success.querySelector('[data-reward-panel="ignite"]')?.addEventListener('pointerdown', event => {
    rewardSwipeStart = event.clientY;
  });
  success.querySelector('[data-reward-panel="ignite"]')?.addEventListener('pointerup', event => {
    if (rewardSwipeStart !== null && rewardSwipeStart - event.clientY > 34) igniteRewardStreak();
    rewardSwipeStart = null;
  });
  rewardNext?.addEventListener('click', () => {
    if (rewardMode === 'streak') {
      playSound('bubble');
      success.hidden = true;
      activateStep(5);
      return;
    }
    showRewardStage('coin');
    playSound('bubble');
    rewardChest?.focus({ preventScroll: true });
  });
  rewardChest?.addEventListener('click', openRewardChest);
  finish.addEventListener('click', () => {
    playSound('finish');
    if (rewardMode === 'first-coin') {
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
    closeTour(true);
  });

  document.addEventListener('click', event => {
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
    if (step.action === 'lesson') setTimeout(openLesson, 90);
    else setTimeout(() => activateStep(stepIndex + 1), 170);
  }, true);

  const targetObserver = new MutationObserver(() => injectTeamCard());
  targetObserver.observe(document.querySelector('#screens') || content, { childList: true, subtree: true });
  injectTeamCard();
  polishProgressiveScreens();

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

  window.JuniorOnboarding = { open: startTour, close: closeTour, storageKey };
  updateAssets();
  const forcePreview = new URLSearchParams(window.location.search).get('onboarding') === '1';
  if (forcePreview || !safeGet()) startTour();
})();
