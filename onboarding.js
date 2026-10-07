/* Junior guided onboarding tour.
 * Real ilovada window.JUNIOR_USER_ID va window.JUNIOR_ONBOARDING_CONTACTS
 * backenddan beriladi. Holat qurilmada, user + versiya bo'yicha saqlanadi.
 */
(() => {
  'use strict';

  const screen = document.querySelector('.screen');
  const content = document.querySelector('.content');
  if (!screen || !content) return;

  const VERSION = 'v2-guided';
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
    <section class="j-tour__lesson" hidden aria-label="Birinchi dars">
      <header class="j-lesson__head">
        <span class="j-lesson__brand"><i>J</i> Junior</span>
        <span class="j-lesson__step">1-dars · 5 daqiqa</span>
      </header>
      <div class="j-lesson__progress"><i></i></div>
      <div class="j-lesson__body">
        <span class="j-lesson__eyebrow">Birinchi dars</span>
        <h2>Platformada o‘qishni boshlaymiz</h2>
        <p>Videoni ko‘r, amaliy vazifani bajar va mini-testdan o‘t. Shu uch qadam darsni yakunlash uchun yetarli.</p>
        <button class="j-lesson__video" type="button" aria-label="Videoni ko‘rish">
          <span class="j-lesson__play">▶</span>
          <span><b>Junior bilan tanishuv</b><small>01:24 · ko‘rib chiqildi</small></span>
          <span class="j-lesson__done">✓</span>
        </button>
        <div class="j-lesson__checks">
          <span><i>✓</i><b>Qisqa videoni ko‘rding</b></span>
          <span><i>✓</i><b>Birinchi amaliyotni bajarding</b></span>
          <span><i>✓</i><b>Mini-testdan o‘tding</b></span>
        </div>
        <div class="j-lesson__reward"><span>🔥 +1 streak</span><span>🪙 +20 coin</span></div>
      </div>
      <footer class="j-lesson__foot"><button type="button" class="j-lesson__finish">Darsni tugatish</button></footer>
    </section>
    <section class="j-tour__success" hidden role="dialog" aria-label="Birinchi natija">
      <img class="j-tour__success-mascot" data-a="a2" alt="Junior maskoti">
      <span class="j-tour__success-kicker">Birinchi natijang</span>
      <h2>Ajoyib! Birinchi darsni yakunlading 🎉</h2>
      <p>1 kunlik streak boshlandi va balansingga 20 coin qo‘shildi.</p>
      <div class="j-tour__rewards"><b>🔥 +1 streak</b><b>🪙 +20 coin</b></div>
      <button type="button" class="j-tour__finish">Keyingi darsga o‘tish</button>
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
  const card = root.querySelector('.j-tour__card');
  const count = root.querySelector('.j-tour__count');
  const bar = root.querySelector('.j-tour__bar i');
  const title = root.querySelector('.j-tour__title');
  const text = root.querySelector('.j-tour__text');
  const instruction = root.querySelector('.j-tour__instruction');
  const instructionText = instruction.querySelector('b');
  const next = root.querySelector('.j-tour__next');
  const lesson = root.querySelector('.j-tour__lesson');
  const lessonFinish = root.querySelector('.j-lesson__finish');
  const success = root.querySelector('.j-tour__success');
  const finish = root.querySelector('.j-tour__finish');
  const toast = root.querySelector('.j-tour__toast');

  let stepIndex = 0;
  let activeTarget = null;
  let positioningFrame = 0;
  let toastTimer = 0;
  let runToken = 0;

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
    await delay(20);
  }

  async function goChat() {
    closeSheet();
    click('[data-tab="ai"]');
    await delay(50);
    injectTeamCard();
  }

  async function prepareWidget(key) {
    await goHome();
    const track = document.querySelector('#track');
    const target = track?.querySelector(`article[data-widget="${key}"]`);
    if (track && target) {
      track.scrollTo({ left: target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2, behavior: 'auto' });
      await delay(30);
    }
  }

  function injectTeamCard() {
    const ai = document.querySelector('.scr[data-screen="ai"]');
    if (!ai || ai.querySelector('.j-team')) return;
    const team = document.createElement('section');
    team.className = 'j-team';
    team.setAttribute('aria-label', 'Sening jamoang');
    team.innerHTML = `
      <div class="j-team__head"><span><b>Sening jamoang</b><small>O‘qish davomida yordam beradi</small></span><i>2 mutaxassis</i></div>
      <div class="j-team__person">
        <span class="j-team__avatar j-team__avatar--curator">🧭</span>
        <span><b>Shaxsiy kurator</b><small>Jadval, progress va tashkiliy masalalar</small></span>
        <button type="button" data-j-team="curator" aria-label="Kuratorga Telegram orqali yozish">Telegram</button>
      </div>
      <div class="j-team__person">
        <span class="j-team__avatar j-team__avatar--mentor">🎙️</span>
        <span><b>Vebinar mentori</b><small>Jonli darslar va mavzuga oid savollar</small></span>
        <button type="button" data-j-team="mentor" aria-label="Vebinar mentoriga Telegram orqali yozish">Telegram</button>
      </div>`;
    const feed = ai.querySelector('.ai-feed');
    if (feed) feed.before(team);
    else ai.appendChild(team);
  }

  const steps = [
    {
      target: '.plan__hero',
      title: 'Salom! Men Juniorman 👋',
      text: 'Platforma bilan tez tanishib olamiz. Men muhim bo‘limlarni navbat bilan ko‘rsataman — sen ko‘rsatmalarga amal qil.',
      button: 'Boshlash',
      prepare: goHome
    },
    {
      target: '.plan__hero',
      title: 'Bugungi o‘quv rejang',
      text: 'Bu yerda bugun bajaradigan 2 ta darsing, kunlik natijang va yig‘adigan coinlaring ko‘rinadi.',
      button: 'Kurslarimni ko‘rish',
      prepare: goHome
    },
    {
      target: '.mk__list',
      title: 'O‘qishni shu yerdan boshlaysan',
      text: 'Kurslaring tavsiya etilgan tartibda joylashgan. Eng yuqoridagi kursni ochib, navbatdagi darsni davom ettir.',
      button: 'Muhim bo‘limlarni ko‘rish',
      prepare: goHome
    },
    {
      target: 'article[data-widget="webinar"]',
      title: 'Muhim ma’lumotlar bir joyda',
      text: 'Vebinar, vazifa va boshqa eslatmalar shu kartochkalarda chiqadi. Kerakli ma’lumotni bosh sahifadan tez topasan.',
      button: 'Streakni ko‘rish',
      prepare: () => prepareWidget('webinar')
    },
    {
      target: 'article[data-widget="streak"]',
      title: 'Streak — o‘qish odating 🔥',
      text: 'Har kuni kamida bitta darsni yakunla. Shunda streak uzilmaydi va ketma-ket o‘qigan kunlaring hisoblanadi.',
      button: 'Mentor yordamini ko‘rish',
      prepare: () => prepareWidget('streak')
    },
    {
      target: 'article[data-widget="mentor"] button',
      title: 'Savoling bo‘lsa, yolg‘iz qolmaysan',
      text: 'Mentorlar 24/7 yordam beradi. Darsdagi tushunarsiz joyni shu tugma orqali yubor.',
      instruction: '“Savolim bor” tugmasini bos',
      requireClick: true,
      prepare: () => prepareWidget('mentor')
    },
    {
      target: '.sheeth__panel',
      title: 'Savolni kerakli mentorga yubor',
      text: 'Yo‘nalishni tanla va savolingni yoz. Murojaating shu fan bo‘yicha mentorga yetib boradi.',
      button: 'Mening jamoamni ko‘rish',
      onNext: goChat
    },
    {
      target: '.j-team',
      title: 'Senga yordam beradigan jamoa',
      text: 'Kurator o‘quv jarayoningni kuzatadi, vebinar mentori esa jonli darslarni olib boradi. Telegram orqali ularga to‘g‘ridan-to‘g‘ri yozishing mumkin.',
      button: 'CoinShopga o‘tish',
      prepare: goChat,
      onNext: goHome
    },
    {
      target: 'button[data-go="coinshop"]',
      title: 'Dars qil, coin yig‘ 🪙',
      text: 'Har bir yakunlangan dars va vazifa uchun coin olasan. Yig‘ilgan coinlarni CoinShop’da ishlatishing mumkin.',
      instruction: 'CoinShop tugmasini bos',
      requireClick: true,
      prepare: goHome
    },
    {
      target: '.scr[data-screen="coinshop"] .cs-banner',
      fallback: '.scr[data-screen="coinshop"] .cs-bal',
      title: 'Coinlarni sovg‘aga almashtir',
      text: 'Joriy balansing yuqorida ko‘rinadi. Yetarli coin yig‘sang, shu yerdan o‘zing xohlagan sovg‘ani tanlaysan.',
      button: 'Sertifikatlarni ko‘rish',
      onNext: goHome
    },
    {
      target: 'button[data-go="certificates"]',
      title: 'Sertifikatgacha yo‘lingni kuzat',
      text: 'Bu bo‘limda sertifikat talablari, bajargan darslaring va qolgan muddatni ko‘rasan.',
      instruction: 'Sertifikatlar tugmasini bos',
      requireClick: true,
      prepare: goHome
    },
    {
      target: '.sheeth__panel',
      title: 'Muddatni o‘tkazib yuborma ⏱️',
      text: 'Taymer deadline’gacha qancha vaqt qolganini ko‘rsatadi. Sertifikat olish uchun qolgan darslarni vaqtida tugat.',
      button: 'Birinchi darsga o‘tish',
      onNext: goHome
    },
    {
      target: '.mk__row--now .mk__card',
      title: 'Birinchi darsni boshlash vaqti',
      text: 'Endi birinchi darsingni och. Uni tugatsang, dastlabki streak va 20 coin olasan.',
      instruction: 'Birinchi kurs kartasini bos',
      requireClick: true,
      action: 'lesson',
      prepare: goHome
    }
  ];

  async function waitForTarget(step, token) {
    for (let i = 0; i < 45; i += 1) {
      if (token !== runToken) return null;
      const found = document.querySelector(step.target) || (step.fallback && document.querySelector(step.fallback));
      if (found && found.getClientRects().length) return found;
      await delay(80);
    }
    return null;
  }

  async function revealTarget(target) {
    const track = target.closest('#track');
    if (track) {
      const cardTarget = target.closest('article') || target;
      track.scrollTo({ left: cardTarget.offsetLeft - (track.clientWidth - cardTarget.offsetWidth) / 2, behavior: 'auto' });
    }
    if (content.contains(target)) {
      const contentRect = content.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const targetTop = content.scrollTop + targetRect.top - contentRect.top;
      const centeredTop = targetTop - Math.max(10, (content.clientHeight - targetRect.height) / 2);
      content.scrollTo({ top: Math.max(0, centeredTop), behavior: 'auto' });
    }
    await delay(30);
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
      const sr = screen.getBoundingClientRect();
      const tr = activeTarget.getBoundingClientRect();
      const pad = activeTarget.matches('button, .plan__shortcut') ? 7 : 9;
      const x = Math.max(5, tr.left - sr.left - pad);
      const y = Math.max(5, tr.top - sr.top - pad);
      const width = Math.min(sr.width - x - 5, tr.width + pad * 2);
      const height = Math.min(sr.height - y - 5, tr.height + pad * 2);
      const targetRadius = parseFloat(getComputedStyle(activeTarget).borderTopLeftRadius) || 12;

      setShadeLayout(x, y, width, height, sr.width, sr.height);
      Object.assign(focus.style, {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${targetRadius + pad}px`
      });

      card.style.top = 'auto';
      card.style.bottom = '12px';
      card.style.left = '14px';
    });
  }

  function clearTarget() {
    if (activeTarget) activeTarget.classList.remove('j-tour__target');
    activeTarget = null;
  }

  async function activateStep(nextIndex) {
    const token = ++runToken;
    stepIndex = Math.max(0, Math.min(steps.length - 1, nextIndex));
    const step = steps[stepIndex];
    clearTarget();
    root.hidden = false;
    root.classList.add('is-running');
    lesson.hidden = true;
    success.hidden = true;
    card.hidden = false;
    focus.hidden = false;
    Object.values(shades).forEach(node => { node.hidden = false; });

    if (step.prepare) await step.prepare();
    if (token !== runToken) return;
    const target = await waitForTarget(step, token);
    if (!target || token !== runToken) {
      showToast('Bu qadamdagi element hali yuklanmadi. Qayta urinib ko‘ring.');
      return;
    }

    activeTarget = target;
    activeTarget.classList.add('j-tour__target');
    await revealTarget(target);
    if (token !== runToken) return;

    count.textContent = `${stepIndex + 1}/${steps.length}`;
    bar.style.width = `${((stepIndex + 1) / steps.length) * 100}%`;
    title.textContent = step.title;
    text.textContent = step.text;
    instruction.hidden = !step.requireClick;
    instructionText.textContent = step.instruction || '';
    next.hidden = !!step.requireClick;
    next.textContent = step.button || 'Keyingisi';
    card.classList.toggle('is-action-required', !!step.requireClick);
    updateAssets();
    positionTour();

    if (step.requireClick) target.focus({ preventScroll: true });
    else next.focus({ preventScroll: true });
  }

  async function advance() {
    const step = steps[stepIndex];
    if (step.onNext) await step.onNext();
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
    root.classList.remove('is-running');
    root.hidden = true;
  }

  function openLesson() {
    runToken += 1;
    clearTarget();
    card.hidden = true;
    focus.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = true; });
    lesson.hidden = false;
    success.hidden = true;
    updateAssets();
    lessonFinish.focus({ preventScroll: true });
  }

  function updateDashboardReward() {
    const coin = document.querySelector('.topbar__pills .tb-pill:first-child b');
    if (coin) {
      const value = (parseInt(coin.textContent.replace(/\s/g, ''), 10) || 0) + 20;
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

  async function completeLesson() {
    safeSet();
    updateDashboardReward();
    await goHome();
    content.scrollTo({ top: 0, behavior: 'smooth' });
    lesson.hidden = true;
    success.hidden = false;
    card.hidden = true;
    focus.hidden = true;
    Object.values(shades).forEach(node => { node.hidden = false; });
    setShadeLayout(0, 0, 0, 0, screen.clientWidth, screen.clientHeight);
    shades.top.style.height = `${screen.clientHeight}px`;
    shades.top.style.background = 'rgba(14, 20, 35, .66)';
    ['left', 'right', 'bottom'].forEach(key => { shades[key].style.width = '0px'; shades[key].style.height = '0px'; });
    updateAssets();
    fireConfetti();
    finish.focus({ preventScroll: true });
  }

  next.addEventListener('click', advance);
  lessonFinish.addEventListener('click', completeLesson);
  finish.addEventListener('click', () => {
    closeTour(true);
    const firstCourse = document.querySelector('.mk__row--now .mk__card');
    if (firstCourse) {
      const contentRect = content.getBoundingClientRect();
      const courseRect = firstCourse.getBoundingClientRect();
      const courseTop = content.scrollTop + courseRect.top - contentRect.top;
      content.scrollTo({ top: Math.max(0, courseTop - (content.clientHeight - courseRect.height) / 2), behavior: 'auto' });
    }
    firstCourse?.focus({ preventScroll: true });
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
    if (!step?.requireClick || !activeTarget || !activeTarget.contains(event.target)) return;
    if (step.action === 'lesson') setTimeout(openLesson, 120);
    else setTimeout(() => activateStep(stepIndex + 1), 240);
  }, true);

  const targetObserver = new MutationObserver(() => injectTeamCard());
  targetObserver.observe(document.querySelector('#screens') || content, { childList: true, subtree: true });
  injectTeamCard();

  content.addEventListener('scroll', positionTour, { passive: true });
  document.querySelector('#track')?.addEventListener('scroll', positionTour, { passive: true });
  window.addEventListener('resize', positionTour, { passive: true });

  const controlRow = document.querySelector('.ctl__row--btns');
  if (controlRow && !controlRow.querySelector('[data-replay-tour]')) {
    const replay = document.createElement('button');
    replay.className = 'btn btn--ghost';
    replay.type = 'button';
    replay.dataset.replayTour = '';
    replay.textContent = 'Онбординг';
    replay.addEventListener('click', startTour);
    controlRow.appendChild(replay);
  }

  window.JuniorOnboarding = { open: startTour, close: closeTour, storageKey };
  updateAssets();
  if (!safeGet()) startTour();
})();
