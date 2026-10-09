/* Junior guided onboarding tour.
 * Real ilovada window.JUNIOR_USER_ID va window.JUNIOR_ONBOARDING_CONTACTS
 * backenddan beriladi. Holat qurilmada, user + versiya bo'yicha saqlanadi.
 */
(() => {
  'use strict';

  const screen = document.querySelector('.screen');
  const content = document.querySelector('.content');
  if (!screen || !content) return;

  const VERSION = 'v10-progressive-four-day';
  const userId = String(window.JUNIOR_USER_ID || 'demo-user');
  const params = new URLSearchParams(window.location.search);
  const qaDays = params.get('qa') === 'days' || params.has('day');
  const forcePushPrompt = params.get('push') === '1';
  let selectedDay = Math.max(1, Math.min(4, Number(params.get('day')) || 1));
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
      <div class="j-tour__meta"><span class="j-tour__count"></span><span class="j-tour__label">Junior sayohati</span></div>
      <div class="j-tour__bar" aria-hidden="true"><i></i></div>
      <h2 class="j-tour__title"></h2>
      <p class="j-tour__text"></p>
      <p class="j-tour__instruction" hidden><span>☝️</span><b></b></p>
      <div class="j-tour__choices" hidden aria-label="Streak maqsadini tanlash">
        <button type="button" data-streak-goal="5">5 kun</button>
        <button type="button" data-streak-goal="6">6 kun</button>
        <button type="button" data-streak-goal="7">7 kun</button>
        <button type="button" data-streak-goal="12">12 kun</button>
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
    <section class="j-tour__auth" hidden aria-label="Akkauntga qayta kirish">
      <header class="j-auth__brand"><b>J</b><span>Junior<small>academy</small></span></header>
      <section class="j-auth__panel" data-auth-stage="login">
        <small>4-KUN · XAVFSIZ KIRISH</small>
        <h2>Junior’ga kirish</h2>
        <p>Telefon raqamingiz va parolingizni kiriting.</p>
        <label>Telefon raqam<input type="tel" placeholder="+998 __ ___ __ __" autocomplete="off" data-auth-login-phone></label>
        <label>Parol<input type="password" placeholder="Parolni kiriting" autocomplete="off" data-auth-login-password></label>
        <button type="button" data-auth-forgot>Parolni unutdingizmi?</button>
      </section>
      <section class="j-auth__panel" data-auth-stage="phone" hidden>
        <small>1/2 QADAM</small>
        <h2>Raqamingizni tasdiqlang</h2>
        <p>4 xonali tasdiqlash kodini shu raqamga yuboramiz.</p>
        <label>Telefon raqam<input type="tel" placeholder="+998 __ ___ __ __" autocomplete="off" data-auth-phone></label>
        <button type="button" data-auth-send>Kodni yuborish</button>
      </section>
      <section class="j-auth__panel" data-auth-stage="code" hidden>
        <small>2/2 QADAM</small>
        <h2>Tasdiqlash kodini kiriting</h2>
        <p>+998 90 ••• •• 67 raqamiga yuborilgan 4 xonali kodni yozing.</p>
        <div class="j-auth__code" aria-label="4 xonali tasdiqlash kodi">
          <input inputmode="numeric" maxlength="1" aria-label="Kodning 1-raqami">
          <input inputmode="numeric" maxlength="1" aria-label="Kodning 2-raqami">
          <input inputmode="numeric" maxlength="1" aria-label="Kodning 3-raqami">
          <input inputmode="numeric" maxlength="1" aria-label="Kodning 4-raqami">
        </div>
        <span class="j-auth__demo">Demo kod: <b>2486</b></span>
        <button type="button" data-auth-verify disabled>Kodni tasdiqlash</button>
      </section>
      <section class="j-auth__panel j-auth__panel--success" data-auth-stage="success" hidden>
        <span class="j-auth__check">✓</span>
        <small>KIRISH TASDIQLANDI</small>
        <h2>Akkauntingizga kirishingiz mumkin!</h2>
        <p>Telefon raqamingiz muvaffaqiyatli tasdiqlandi.</p>
        <button type="button" data-auth-finish>Akkauntga kirish</button>
      </section>
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
          <div class="j-reward__coin-result" aria-live="polite"><b>+50 Coin</b><span>+100 Point ham qo‘shildi</span></div>
        </div>
        <button type="button" class="j-tour__finish" hidden>Keyingi darsga o‘tish</button>
      </section>
    </section>
    <div class="j-tour__toast" role="status"></div>`;
  screen.appendChild(root);

  const dayPicker = document.createElement('nav');
  dayPicker.className = 'j-day-picker';
  dayPicker.hidden = !qaDays;
  dayPicker.setAttribute('aria-label', 'Onboarding test kuni');
  dayPicker.innerHTML = `
    <span>TEST</span>
    <button type="button" data-tour-day="1">1-kun</button>
    <button type="button" data-tour-day="2">2-kun</button>
    <button type="button" data-tour-day="3">3-kun</button>
    <button type="button" data-tour-day="4">4-kun</button>
    <button type="button" data-tour-push aria-label="Push ruxsat oynasini ko‘rish">🔔</button>`;
  screen.appendChild(dayPicker);

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
  const title = root.querySelector('.j-tour__title');
  const text = root.querySelector('.j-tour__text');
  const instruction = root.querySelector('.j-tour__instruction');
  const instructionText = instruction.querySelector('b');
  const choices = root.querySelector('.j-tour__choices');
  const next = root.querySelector('.j-tour__next');
  const later = root.querySelector('.j-tour__later');
  const lesson = root.querySelector('.j-tour__lesson');
  const lessonBack = root.querySelector('[data-lesson-back]');
  const lessonFinish = root.querySelector('.j-lesson__finish');
  const lessonProgress = root.querySelector('.j-lesson__progress i');
  const lessonStep = root.querySelector('[data-lesson-step]');
  const lessonHint = root.querySelector('[data-lesson-hint]');
  const lessonStages = [...root.querySelectorAll('[data-lesson-stage]')];
  const auth = root.querySelector('.j-tour__auth');
  const authStages = [...root.querySelectorAll('[data-auth-stage]')];
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
  let rewardMode = 'lesson-result';
  let audioContext = null;
  let actionPending = false;
  let cardAnimationTimer = 0;
  let autoFinishTimer = 0;
  let pushPreviewTimer = 0;

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

  const streakGoalKey = `junior:streak-goal:${userId}`;

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
      [15, 'SH', 'Shohruh Qodirov', '6418'],
      [16, 'KS', 'Kamola Sattorova', '6378'],
      [17, 'IA', 'Ismoilov Abdulaziz', '6290'],
      [18, 'MY', 'Malika Yusupova', '6215'],
      [19, 'BN', 'Bekzod Nazarov', '6140']
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
      nearby.appendChild(row);
    });
    pane.querySelector('.lb-hd')?.after(nearby);
  }

  async function preparePaymentQr() {
    await goHome();
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
        id: 'coinshop-entry',
        target: 'button[data-go="coinshop"]',
        title: 'Coin Shop 🪙',
        text: 'Yig‘gan Coin’laringizni nimalarga sarflashingiz mumkinligini ko‘ring.',
        actionButton: 'Coin Shop’ni ochish',
        requireClick: true,
        prepare: goHome
      },
      {
        id: 'leaderboard',
        target: '.scr[data-screen="leaders"] .j-lb-nearby',
        fallback: '.scr[data-screen="leaders"] .lb-pane--a',
        title: 'Guruhdagi o‘rningizni ko‘ring 🏆',
        text: 'Pointlaringiz va sizga eng yaqin 5 ishtirokchi ko‘rinadi: 2 nafari yuqorida, siz va 2 nafari pastda.',
        button: 'Streak maqsadini tanlash',
        prepare: prepareLeaderboardNearby
      },
      {
        id: 'streak-goal',
        target: 'article[data-widget="streak"]',
        title: 'Streakni necha kun saqlaysiz? 🔥',
        text: 'O‘zingizga mos maqsadni tanlang. Tanlovingiz profilingizda saqlanadi.',
        choices: true,
        button: 'Maqsadni saqlash',
        prepare: () => prepareWidget('streak')
      }
    ],
    3: [
      {
        id: 'day-three-lesson',
        target: '.mk__row--now .mk__card',
        title: 'Bugungi darsingiz tayyor',
        text: 'Videodars, test va amaliy vazifani yakunlab, Coin hamda Point oling.',
        actionButton: 'Darsni boshlash',
        requireClick: true,
        action: 'lesson',
        prepare: goHome
      },
      {
        id: 'purchase-offer',
        target: 'article[data-widget="payment"]',
        fallback: '.plan__hero',
        title: 'Biz bilan doimiy qolishga tayyormisiz?',
        text: 'Yangi bilimlarni egallash va Junior’da o‘qishni davom ettirishga tayyormisiz?',
        button: 'Ha, tayyorman',
        later: 'Keyinroq',
        prepare: goHome
      },
      {
        id: 'payment-qr',
        target: '#sheetHost:not([hidden]) .sheet[data-widget="payment"][data-sheet="qr"] .s-qr',
        fallback: '#sheetHost:not([hidden]) .sheet[data-widget="payment"][data-sheet="qr"] .sheet__body',
        title: 'To‘lovni amalga oshiring',
        text: 'QR-kodni skanerlang yoki to‘lov havolasidan foydalaning va Akademiya o‘quvchisiga aylaning.',
        button: '3-kunni yakunlash',
        compact: true,
        prepare: preparePaymentQr
      }
    ],
    4: []
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
      2: ['Bugungi maqsad', 'Coin Shop, liderbord va streak maqsadingizni ko‘rib chiqing.'],
      3: ['O‘qishni davom ettiring', 'Bugungi darsni yakunlab, Junior bilan doimiy qolish imkoniyatini ko‘ring.'],
      4: ['Akkauntingiz himoyalangan', 'Parol esdan chiqsa, telefon raqamingiz orqali tezda tiklaysiz.']
    };
    const message = messages[selectedDay];
    clearTimeout(pushPreviewTimer);
    pushPreviewTitle.textContent = message[0];
    pushPreviewText.textContent = message[1];
    pushPreview.classList.toggle('has-day-picker', qaDays);
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
    auth.hidden = true;
    success.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = true; });
    updateDayPicker();
    pushPermission.querySelector('[data-push-allow]')?.focus({ preventScroll: true });
  }

  function startSelectedDay() {
    pushPermission.hidden = true;
    steps = selectedSteps();
    storageKey = `junior:onboarding:${userId}:${VERSION}:day-${selectedDay}`;
    updateDayPicker();
    if (selectedDay === 4) openPasswordRecovery();
    else startTour();
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
    selectedDay = Math.max(1, Math.min(4, Number(day) || 1));
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
    await delay(280);
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
    next.disabled = false;
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
      const tr = activeTargetRect();
      if (!tr) return;
      const isPlanHero = activeTarget.matches('.plan__hero');
      const pad = isPlanHero
        ? 0
        : activeTarget.matches('button, .plan__shortcut') ? 7 : 9;
      Object.values(shades).forEach(node => {
        node.style.background = isPlanHero ? 'transparent' : 'rgba(12, 18, 34, .68)';
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
        height = Math.max(8, Math.min(height, maxBottom - y));
      }

      setShadeLayout(x, y, width, height, sr.width, sr.height);
      Object.assign(focus.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${targetRadius + pad}px`,
        boxShadow: isPlanHero ? '0 0 0 9999px rgba(12, 18, 34, .68)' : ''
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
    auth.hidden = true;
    success.hidden = true;
    pushPermission.hidden = true;
    card.hidden = false;
    card.classList.remove('is-bubbling', 'is-leaving');
    card.classList.add('is-preparing');
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
    title.textContent = step.title;
    text.textContent = step.text;
    instruction.hidden = !step.instruction;
    instructionText.textContent = step.instruction || '';
    choices.hidden = !step.choices;
    choices.querySelectorAll('[data-streak-goal]').forEach(button => {
      button.classList.toggle('is-active', Number(button.dataset.streakGoal) === getStreakGoal());
    });
    next.hidden = (!!step.requireClick && !step.actionButton) || !!step.autoFinishAfter;
    next.textContent = step.actionButton || step.button || 'Keyingisi';
    later.hidden = !step.later;
    later.textContent = step.later || 'Keyinroq';
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
    activeTarget = activeTargets[0];
    activeTargets.forEach(node => node.classList.add('j-tour__target'));
    await revealTarget(target, step);
    screen.scrollTop = 0;
    if (token !== runToken) return;
    positionTour();
    requestAnimationFrame(() => {
      if (token !== runToken) return;
      focus.hidden = false;
      playCardBubble();
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
    steps = selectedSteps();
    if (selectedDay === 4) {
      openPasswordRecovery();
      return;
    }
    stepIndex = 0;
    activateStep(0);
  }

  function closeTour(markComplete = false) {
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
    auth.hidden = true;
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
    const config = rewardMode === 'task-accepted'
      ? {
        coin: 70,
        point: 0,
        title: 'Vazifa qabul qilindi! 🎉',
        text: 'Amaliy vazifani muvaffaqiyatli topshirdingiz. 70 Coin balansingizga qo‘shildi.'
      }
      : {
        coin: 50,
        point: 100,
        title: 'Ajoyib! Birinchi natijangiz tayyor! 🎉',
        text: 'Darsni muvaffaqiyatli yakunladingiz. 50 Coin va 100 Point balansingizga qo‘shildi.'
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
      finish.hidden = false;
      finish.focus({ preventScroll: true });
    }, 780);
  }

  async function completeLesson() {
    rewardMode = 'lesson-result';
    playSound('complete');
    await goHome();
    content.scrollTo({ top: 0, behavior: 'auto' });
    resetViewportScroll();
    lesson.hidden = true;
    auth.hidden = true;
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
    const coinKicker = success.querySelector('[data-reward-panel="coin"] .j-reward__kicker');
    if (coinKicker) coinKicker.textContent = 'Birinchi dars mukofoti';
    if (coinTitle) coinTitle.textContent = 'Mukofot sandig‘ingiz tayyor!';
    if (coinText) coinText.textContent = 'Darsni muvaffaqiyatli tugatganingiz uchun sandiqni oching.';
    const coinBadge = success.querySelector('.j-reward__coin');
    const coinResult = success.querySelector('.j-reward__coin-result b');
    const coinResultText = success.querySelector('.j-reward__coin-result span');
    if (coinBadge) coinBadge.textContent = '+50';
    if (coinResult) coinResult.textContent = '+50 Coin';
    if (coinResultText) coinResultText.textContent = '+100 Point ham qo‘shildi';
    finish.textContent = 'Amaliy vazifaga o‘tish';
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
    auth.hidden = true;
    success.hidden = false;
    card.hidden = true;
    focus.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = false; });
    setShadeLayout(0, 0, 0, 0, screen.clientWidth, screen.clientHeight);
    shades.top.style.height = `${screen.clientHeight}px`;
    shades.top.style.background = 'rgba(14, 20, 35, .66)';
    ['left', 'right', 'bottom'].forEach(key => { shades[key].style.width = '0px'; shades[key].style.height = '0px'; });
    finish.hidden = true;
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
    if (coinResultText) coinResultText.textContent = 'Balansingizga qo‘shildi';
    finish.textContent = selectedDay === 1 ? 'Davom etish' : 'Keyingi qadam';
    showRewardStage('coin');
    updateAssets();
    rewardChest?.focus({ preventScroll: true });
  }

  async function startStreakReward() {
    rewardMode = 'streak';
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
    rewardNext.textContent = 'Davom etish';
    showRewardStage('ignite');
    updateAssets();
    rewardIgnite?.focus({ preventScroll: true });
  }

  function showAuthStage(name) {
    auth.dataset.stage = name;
    authStages.forEach(stage => {
      stage.hidden = stage.dataset.authStage !== name;
      stage.classList.remove('is-entering');
      if (!stage.hidden) stage.classList.add('is-entering');
    });
    playSound(name === 'success' ? 'complete' : 'bubble');
    const active = authStages.find(stage => stage.dataset.authStage === name);
    requestAnimationFrame(() => active?.querySelector('button:not(:disabled), input:not([readonly])')?.focus({ preventScroll: true }));
  }

  function openPasswordRecovery() {
    runToken += 1;
    clearTarget();
    clearStreakFire();
    closeSheet();
    resetViewportScroll();
    root.hidden = false;
    root.classList.add('is-running');
    screen.classList.add('j-tour-scroll-locked');
    pushPermission.hidden = true;
    card.hidden = true;
    focus.hidden = true;
    lesson.hidden = true;
    success.hidden = true;
    auth.hidden = false;
    Object.values(shades).forEach(node => { node.hidden = true; });
    const codeInputs = [...auth.querySelectorAll('.j-auth__code input')];
    codeInputs.forEach(input => { input.value = ''; input.removeAttribute('aria-invalid'); });
    const loginPhone = auth.querySelector('[data-auth-login-phone]');
    const loginPassword = auth.querySelector('[data-auth-login-password]');
    const recoveryPhone = auth.querySelector('[data-auth-phone]');
    const verify = auth.querySelector('[data-auth-verify]');
    if (loginPhone) loginPhone.value = '';
    if (loginPassword) loginPassword.value = '';
    if (recoveryPhone) recoveryPhone.value = '';
    if (verify) verify.disabled = true;
    updateDayPicker();
    showAuthStage('login');
  }

  const authForgot = auth.querySelector('[data-auth-forgot]');
  const authPhone = auth.querySelector('[data-auth-phone]');
  const authSend = auth.querySelector('[data-auth-send]');
  const authVerify = auth.querySelector('[data-auth-verify]');
  const authFinish = auth.querySelector('[data-auth-finish]');
  const authCodeInputs = [...auth.querySelectorAll('.j-auth__code input')];

  authForgot?.addEventListener('click', () => showAuthStage('phone'));
  authSend?.addEventListener('click', () => {
    if (!authPhone?.value.trim()) return;
    playSound('push');
    showAuthStage('code');
  });
  authCodeInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(-1);
      input.removeAttribute('aria-invalid');
      if (input.value && authCodeInputs[index + 1]) authCodeInputs[index + 1].focus();
      authVerify.disabled = authCodeInputs.some(node => !node.value);
    });
    input.addEventListener('keydown', event => {
      if (event.key === 'Backspace' && !input.value && authCodeInputs[index - 1]) authCodeInputs[index - 1].focus();
    });
  });
  authVerify?.addEventListener('click', () => {
    const code = authCodeInputs.map(input => input.value).join('');
    if (code !== '2486') {
      playSound('wrong');
      authCodeInputs.forEach(input => input.setAttribute('aria-invalid', 'true'));
      showToast('Kod mos kelmadi. Demo kod: 2486');
      return;
    }
    playSound('correct');
    showAuthStage('success');
    fireConfetti();
  });
  authFinish?.addEventListener('click', () => {
    playSound('finish');
    closeTour(true);
  });

  choices.querySelectorAll('[data-streak-goal]').forEach(button => {
    button.addEventListener('click', () => {
      const days = Number(button.dataset.streakGoal);
      saveStreakGoal(days);
      choices.querySelectorAll('[data-streak-goal]').forEach(node => node.classList.toggle('is-active', node === button));
      next.disabled = false;
      playSound('correct');
    });
  });
  later.addEventListener('click', () => {
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
      playSound('finish');
      success.hidden = true;
      if (selectedDay === 1) activateStep(findStepIndex('teachers'));
      else closeTour(true);
      return;
    }
    showRewardStage('coin');
    playSound('bubble');
    rewardChest?.focus({ preventScroll: true });
  });
  rewardChest?.addEventListener('click', openRewardChest);
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
      if (selectedDay === 3 && !hasPurchasedCourse) {
        activateStep(findStepIndex('purchase-offer'));
        return;
      }
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
  if (forcePreview || !safeGet()) {
    if (forcePushPrompt || !getPushPreference()) showPushPermission();
    else startSelectedDay();
  }
})();
