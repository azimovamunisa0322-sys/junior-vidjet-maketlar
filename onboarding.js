/* Junior onboarding prototype.
 * Real ilovada window.JUNIOR_USER_ID va window.JUNIOR_ONBOARDING_CONTACTS
 * backenddan beriladi. Holat qurilmada, user + versiya bo'yicha saqlanadi.
 */
(() => {
  'use strict';

  const screen = document.querySelector('.screen');
  if (!screen) return;

  const VERSION = 'v1';
  const userId = String(window.JUNIOR_USER_ID || 'demo-user');
  const storageKey = `junior:onboarding:${userId}:${VERSION}`;

  const mascot = (extra = '') => `<img class="j-onb__mascot ${extra}" data-a="a2" alt="Junior maskoti">`;

  const slides = [
    {
      eyebrow: 'Xush kelibsan',
      title: `Salom! Men <em>Juniorman</em> 👋`,
      text: `Platformadagi eng muhim imkoniyatlarni birga ko‘rib chiqamiz. Oxirida esa birinchi darsingni boshlaysan!`,
      art: `
        <div class="j-onb__art">
          <div class="j-onb__bubble j-onb__bubble--welcome">Men har qadamda yoningda bo‘laman ✨</div>
          ${mascot('j-onb__mascot--welcome')}
        </div>`
    },
    {
      eyebrow: 'Asosiy ekran',
      title: `Muhim ma’lumotlar <em>bir joyda</em>`,
      text: `Vidjetlar yaqin darslar, to‘lov, vazifalar va yangiliklarni kerakli paytda ko‘rsatadi.`,
      art: `
        <div class="j-onb__art">
          <div class="j-onb__mini-grid">
            <div class="j-onb__mini j-onb__mini--orange"><span class="j-onb__mini-icon">📡</span><b>Keyingi vebinar</b><small>Bugun · 19:30</small><i class="j-onb__mini-badge">Jonli</i></div>
            <div class="j-onb__mini"><span class="j-onb__mini-icon">✅</span><b>Kunlik vazifalar</b><small>Bugun 3 ta vazifa</small></div>
            <div class="j-onb__mini j-onb__mini--wide j-onb__mini--navy"><span class="j-onb__mini-icon">⚡</span><b>Hammasi holatingga moslashadi</b><small>Senga hozir kerak bo‘lgan kartochka birinchi chiqadi.</small>${mascot('j-onb__mascot--corner')}</div>
          </div>
        </div>`
    },
    {
      eyebrow: 'Kurslarim',
      title: `Senga mos <em>kurslar</em> shu yerda`,
      text: `Har bir kursning mavzusi, progressi va mukofotini ko‘rasan. To‘xtagan joyingdan bir bosishda davom et.`,
      art: `
        <div class="j-onb__art">
          <div class="j-onb__course-card">
            <div class="j-onb__course-head">
              <span class="j-onb__course-thumb">💻</span>
              <span><span class="j-onb__course-name">Web dasturlash</span><span class="j-onb__course-topic">1-modul · HTML asoslari</span></span>
              <span class="j-onb__course-reward">+20 coin</span>
            </div>
            <div class="j-onb__course-progress"><i></i></div>
            <div class="j-onb__course-foot"><span>1/12 dars</span><span>Davom etish →</span></div>
            ${mascot('j-onb__mascot--corner')}
          </div>
        </div>`
    },
    {
      eyebrow: 'Streak',
      title: `Har kuni o‘qi, <em>olovni yoq</em> 🔥`,
      text: `Kamida bitta darsni tugatsang streak davom etadi. Ketma-ket kunlar — yangi rekord va ko‘proq motivatsiya.`,
      art: `
        <div class="j-onb__art">
          <div class="j-onb__streak-card">
            <div class="j-onb__streak-top"><span class="j-onb__flame">🔥</span><div><strong>1 kun</strong><span>Birinchi streaking boshlandi!</span></div></div>
            <div class="j-onb__days"><span class="j-onb__day is-hot">Du</span><span class="j-onb__day">Se</span><span class="j-onb__day">Ch</span><span class="j-onb__day">Pa</span><span class="j-onb__day">Ju</span><span class="j-onb__day">Sh</span><span class="j-onb__day">Ya</span></div>
          </div>
        </div>`
    },
    {
      eyebrow: 'CoinShop',
      title: `Biliming <em>coin’ga</em> aylanadi`,
      text: `Dars va vazifalarni bajarib coin yig‘. Keyin CoinShop’da ularni o‘zing yoqtirgan sovg‘alarga almashtir.`,
      art: `
        <div class="j-onb__art">
          <div class="j-onb__coinshop">
            <div class="j-onb__gift"><span>🎧</span><b>Junior quloqchin</b><small>1 500 coin</small></div>
            <div class="j-onb__gift"><span>🎒</span><b>Junior ryukzak</b><small>2 400 coin</small></div>
          </div>
          <div class="j-onb__bubble j-onb__bubble--right">Har bir coin — mehnating natijasi 🪙</div>
          ${mascot('j-onb__mascot--corner')}
        </div>`
    },
    {
      eyebrow: 'Mentor yordami',
      title: `Savoling bormi? <em>24/7 yoz</em>`,
      text: `Darsda tushunmagan joying bo‘lsa, mentor yordam vidjeti orqali savolingni yubor. Yordam doim yoningda.`,
      art: `
        <div class="j-onb__art">
          <div class="j-onb__mentor-card">
            <span class="j-onb__online">24/7 onlayn</span>
            <h3>Mentor yordami</h3>
            <p>“Savolim bor” tugmasini bosib, mavzu bo‘yicha yordam ol.</p>
            ${mascot('j-onb__mascot--corner')}
          </div>
        </div>`
    },
    {
      eyebrow: 'Sertifikatlar',
      title: `Marrani va <em>deadline’ni</em> ko‘rib tur`,
      text: `Sertifikat bo‘limida talablar, qolgan vaqt va progress ko‘rinadi. Taymer seni muddatni o‘tkazib yubormaslikka yordam beradi.`,
      art: `
        <div class="j-onb__art">
          <div class="j-onb__cert-card">
            <div class="j-onb__cert-row"><span class="j-onb__cert-icon">📜</span><div><h3>Web dasturlash sertifikati</h3><p>Deadline: 24-oktabr · 4/12 dars</p></div></div>
            <div class="j-onb__timer"><span>06<small>kun</small></span><span>14<small>soat</small></span><span>32<small>daqiqa</small></span></div>
          </div>
        </div>`
    },
    {
      eyebrow: 'Sening jamoang',
      title: `Kurator va <em>vebinar mentori</em>`,
      text: `Kurator o‘qish jarayonida yo‘l ko‘rsatadi, vebinar mentori esa jonli darslarni olib boradi. Ularga Telegram’da bir bosishda yozasan.`,
      art: `
        <div class="j-onb__art">
          <div class="j-onb__people">
            <div class="j-onb__person"><span class="j-onb__avatar">🧭</span><span><b>Shaxsiy kurator</b><small>Jadval, progress va tashkiliy savollar</small></span><button class="j-onb__telegram" data-telegram="curator">Telegram</button></div>
            <div class="j-onb__person"><span class="j-onb__avatar">🎙️</span><span><b>Vebinar mentori</b><small>Jonli darslar va mavzu bo‘yicha savollar</small></span><button class="j-onb__telegram" data-telegram="mentor">Telegram</button></div>
          </div>
        </div>`
    },
    {
      eyebrow: 'Birinchi qadam',
      title: `Birinchi <em>g‘alabangni</em> boshlaymiz!`,
      text: `Eng birinchi qiladigan ishing — biriktirilgan darsni tugatish. Tayyor bo‘lsang, hoziroq boshlaymiz.`,
      next: 'Birinchi darsni boshlash',
      art: `
        <div class="j-onb__art">
          <div class="j-onb__course-card">
            <div class="j-onb__course-head">
              <span class="j-onb__course-thumb">🚀</span>
              <span><span class="j-onb__course-name">1-dars · Platforma bilan tanishuv</span><span class="j-onb__course-topic">Taxminiy vaqt: 5 daqiqa</span></span>
            </div>
            <div class="j-onb__course-progress"><i style="width:0"></i></div>
            <div class="j-onb__course-foot"><span>0% bajarildi</span><span>+20 coin</span></div>
            ${mascot('j-onb__mascot--corner')}
          </div>
        </div>`
    }
  ];

  const root = document.createElement('section');
  root.className = 'j-onb';
  root.hidden = true;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-modal', 'true');
  root.setAttribute('aria-label', 'Junior platformasi bilan tanishuv');
  root.innerHTML = `
    <span class="j-onb__blob j-onb__blob--a"></span>
    <span class="j-onb__blob j-onb__blob--b"></span>
    <header class="j-onb__top">
      <span class="j-onb__brand"><span class="j-onb__brand-mark">J</span> Junior</span>
      <span class="j-onb__count"></span>
      <button class="j-onb__skip" type="button">O‘tkazib yuborish</button>
    </header>
    <div class="j-onb__progress" aria-hidden="true"></div>
    <div class="j-onb__body"></div>
    <footer class="j-onb__footer">
      <button class="j-onb__back" type="button" aria-label="Orqaga">‹</button>
      <button class="j-onb__next" type="button">Keyingisi</button>
    </footer>
    <div class="j-onb__toast" role="status"></div>`;
  screen.appendChild(root);

  const body = root.querySelector('.j-onb__body');
  const progress = root.querySelector('.j-onb__progress');
  const count = root.querySelector('.j-onb__count');
  const skip = root.querySelector('.j-onb__skip');
  const back = root.querySelector('.j-onb__back');
  const next = root.querySelector('.j-onb__next');
  const toast = root.querySelector('.j-onb__toast');
  let index = 0;
  let mode = 'slides';
  let toastTimer;

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
    toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2300);
  }

  function renderProgress(activeIndex = index) {
    progress.innerHTML = slides.map((_, i) => `<i class="${i < activeIndex ? 'is-done' : i === activeIndex ? 'is-now' : ''}"></i>`).join('');
  }

  function renderSlide() {
    mode = 'slides';
    const slide = slides[index];
    body.innerHTML = `<article class="j-onb__slide"><span class="j-onb__eyebrow">${slide.eyebrow}</span><h2 class="j-onb__title">${slide.title}</h2><p class="j-onb__text">${slide.text}</p>${slide.art}</article>`;
    count.textContent = `${index + 1}/${slides.length}`;
    skip.hidden = false;
    back.hidden = false;
    back.disabled = index === 0;
    next.textContent = slide.next || 'Keyingisi';
    renderProgress();
    body.scrollTop = 0;
    updateAssets();
  }

  function renderLesson() {
    mode = 'lesson';
    body.innerHTML = `
      <article class="j-onb__slide">
        <span class="j-onb__eyebrow">1-dars</span>
        <h2 class="j-onb__title">Platforma bilan <em>tanishuv</em></h2>
        <p class="j-onb__text">Ajoyib! Darsdagi uchta kichik qadamni bajarding. Endi natijani saqlaymiz.</p>
        <div class="j-onb__art">
          <div class="j-onb__lesson-card">
            <h3>Junior’da qanday o‘qiyman?</h3>
            <p>Qisqa video, amaliy vazifa va test — hammasi bitta dars ichida.</p>
            <div class="j-onb__lesson-progress"><i></i></div>
            <span class="j-onb__check"><i>✓</i> Qisqa videoni ko‘rding</span>
            <span class="j-onb__check"><i>✓</i> Birinchi amaliyotni bajarding</span>
            <span class="j-onb__check"><i>✓</i> Mini-testdan o‘tding</span>
          </div>
        </div>
      </article>`;
    count.textContent = 'Dars · 100%';
    skip.hidden = true;
    back.hidden = false;
    back.disabled = false;
    next.textContent = 'Darsni tugatish';
    renderProgress(slides.length);
  }

  function fireConfetti() {
    const colors = ['#ff4f28', '#ffbd2e', '#00b884', '#6c68e8', '#2ea8ff', '#ff70ad'];
    for (let i = 0; i < 78; i += 1) {
      const bit = document.createElement('i');
      bit.className = 'j-onb__confetti';
      bit.style.left = `${Math.random() * 100}%`;
      bit.style.background = colors[i % colors.length];
      bit.style.setProperty('--x', `${(Math.random() - .5) * 230}px`);
      bit.style.setProperty('--r', `${(Math.random() * 900) - 450}deg`);
      bit.style.setProperty('--dur', `${1.45 + Math.random() * .9}s`);
      bit.style.animationDelay = `${Math.random() * .22}s`;
      root.appendChild(bit);
      setTimeout(() => bit.remove(), 2600);
    }
  }

  function renderSuccess() {
    mode = 'success';
    safeSet();
    body.innerHTML = `
      <article class="j-onb__slide j-onb__success">
        <span class="j-onb__eyebrow">Birinchi natija</span>
        <h2 class="j-onb__title">Vaaau! <em>Darsni tugatding!</em> 🎉</h2>
        <p class="j-onb__text">Sen birinchi streakingni yoqding va mehnating uchun coin olding. Shu tempda davom et!</p>
        <div class="j-onb__art">
          <div class="j-onb__success-card">
            <div class="j-onb__reward"><span>🔥</span><b>+1 streak</b></div>
            <div class="j-onb__reward"><span>🪙</span><b>+20 coin</b></div>
          </div>
          ${mascot('j-onb__mascot--corner')}
        </div>
      </article>`;
    count.textContent = 'Tayyor!';
    skip.hidden = true;
    back.hidden = true;
    next.textContent = 'Yana dars qilish';
    renderProgress(slides.length);
    updateAssets();
    fireConfetti();
  }

  function closeOnboarding(markComplete = true) {
    if (markComplete) safeSet();
    root.hidden = true;
    document.querySelector('.content')?.removeAttribute('aria-hidden');
    document.querySelector('.tabbar')?.removeAttribute('aria-hidden');
  }

  function openOnboarding() {
    const phoneView = document.querySelector('[data-view="phone"]');
    if (phoneView && !phoneView.classList.contains('is-on')) phoneView.click();
    index = 0;
    mode = 'slides';
    root.hidden = false;
    document.querySelector('.content')?.setAttribute('aria-hidden', 'true');
    document.querySelector('.tabbar')?.setAttribute('aria-hidden', 'true');
    renderSlide();
    requestAnimationFrame(() => next.focus({ preventScroll: true }));
  }

  next.addEventListener('click', () => {
    if (mode === 'lesson') {
      renderSuccess();
      return;
    }
    if (mode === 'success') {
      closeOnboarding(true);
      document.querySelector('.mk__row--now .mk__card')?.focus({ preventScroll: true });
      return;
    }
    if (index === slides.length - 1) {
      renderLesson();
      return;
    }
    index += 1;
    renderSlide();
  });

  back.addEventListener('click', () => {
    if (mode === 'lesson') {
      index = slides.length - 1;
      renderSlide();
      return;
    }
    if (index > 0) {
      index -= 1;
      renderSlide();
    }
  });

  skip.addEventListener('click', () => closeOnboarding(true));

  root.addEventListener('click', (event) => {
    const telegram = event.target.closest('[data-telegram]');
    if (!telegram) return;
    const role = telegram.dataset.telegram;
    const contacts = window.JUNIOR_ONBOARDING_CONTACTS || {};
    const username = String(contacts[role] || '').replace(/^@/, '');
    if (!username) {
      showToast('Telegram username berilganda shu tugma to‘g‘ridan-to‘g‘ri chatni ochadi.');
      return;
    }
    window.open(`https://t.me/${encodeURIComponent(username)}`, '_blank', 'noopener,noreferrer');
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') next.click();
    if (event.key === 'ArrowLeft' && !back.hidden && !back.disabled) back.click();
  });

  const controlRow = document.querySelector('.ctl__row--btns');
  if (controlRow) {
    const replay = document.createElement('button');
    replay.className = 'btn btn--ghost';
    replay.type = 'button';
    replay.textContent = 'Онбординг';
    replay.addEventListener('click', openOnboarding);
    controlRow.appendChild(replay);
  }

  window.JuniorOnboarding = { open: openOnboarding, close: closeOnboarding, storageKey };

  if (!safeGet()) setTimeout(openOnboarding, 650);
})();
