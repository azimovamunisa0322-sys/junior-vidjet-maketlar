(() => {
  const stages = [
    { target: '.child-switch', art: '👋', title: 'Junior’ga xush kelibsiz!', text: 'Bu yerda Azizbekning o‘qishi haqida eng kerakli ma’lumotlarni ko‘rasiz. Avval farzandingiz profilini tanib olaylik.', extra: '<div class="child-link"><span>A</span><b>Azizbek</b><small>6-sinf · profil ulangan</small><i>✓</i></div>', action: 'Farzandimni ko‘rish' },
    { target: '[data-target="today"]', art: '☀️', title: 'Bugungi holat — 10 soniyada', text: 'Har kirganingizda bugun nechta dars qilgani va keyingi qadamini shu kartada ko‘rasiz.', extra: '<div class="mini-tip"><b>Yaxshi savol:</b> “Bugun qaysi mavzu senga qiziq bo‘ldi?”</div>', action: 'Tushunarli' },
    { target: '[data-target="lesson"]', art: '🔎', title: 'Natijadan ko‘ra jarayon muhim', text: 'Qaysi mavzu tugaganini va qayerda yordam kerakligini ko‘ring. Nazorat emas — suhbat uchun signal.', extra: '<div class="lesson-tip"><span>✓</span><b>Video dars tugadi</b><small>Keyin test va amaliy vazifa bor</small></div>', action: 'Jarayonni ko‘rish' },
    { target: null, art: '🤖', title: 'Savol tug‘ilsa, Parent bot yoningizda', text: 'Bolangizga nima deyishni yoki natijani qanday tushunishni bilmasangiz — botdan so‘rang.', extra: '<div class="prompt-list"><span>“Bugun uni qanday qo‘llab-quvvatlasam bo‘ladi?”</span><span>“Qaysi mavzuda qiynalyapti?”</span></div>', action: 'Parent botni ochish' },
    { target: null, art: '🔔', title: 'Faqat muhim xabarlar', text: 'Dars qoldirilsa, topshiriq kutilsa yoki aynan sizning yordamingiz kerak bo‘lsa — xabar beramiz.', extra: '<div class="notify-row"><span>✓</span><b>Keraksiz xabarlar yo‘q</b></div>', action: 'Xabarnomalarni yoqish' },
    { target: null, art: '✨', title: 'Siz ham Junior jamoasisiz', text: 'Endi kabinet tayyor. Azizbek o‘qiydi, siz esa kerak paytda yonida bo‘lasiz.', extra: '<div class="ready-grid"><span>✓ Bugungi holat</span><span>✓ Parent bot</span><span>✓ Haftalik hisobot</span></div>', action: 'Kabinetga o‘tish', done: true }
  ];
  const params = new URLSearchParams(location.search);
  let current = Math.max(1, Math.min(6, Number(params.get('day')) || 1));
  const phone = document.querySelector('.phone');
  const shade = document.querySelector('.tour-shade');
  const focus = document.querySelector('.tour-focus');
  const sheet = document.querySelector('.parent-sheet');
  const step = document.querySelector('[data-step]');
  const art = document.querySelector('[data-art]');
  const title = document.querySelector('[data-title]');
  const text = document.querySelector('[data-text]');
  const extra = document.querySelector('[data-extra]');
  const next = document.querySelector('[data-next]');

  function setDay(day, replace = false) {
    current = day;
    const state = stages[day - 1];
    document.querySelectorAll('[data-day]').forEach(button => button.classList.toggle('is-active', Number(button.dataset.day) === day));
    step.textContent = `${day}/6`;
    document.querySelector('.sheet-progress').style.setProperty('--n', day);
    art.textContent = state.art;
    title.textContent = state.title;
    text.textContent = state.text;
    extra.innerHTML = state.extra;
    next.textContent = state.action;
    sheet.classList.toggle('is-finish', !!state.done);
    shade.classList.toggle('is-hidden', !!state.done);
    focus.style.display = state.target ? 'block' : 'none';
    if (state.target) {
      const target = phone.querySelector(state.target);
      const phoneRect = phone.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      focus.style.top = `${targetRect.top - phoneRect.top - 6}px`;
      focus.style.left = `${targetRect.left - phoneRect.left - 6}px`;
      focus.style.width = `${targetRect.width + 12}px`;
      focus.style.height = `${targetRect.height + 12}px`;
    }
    const url = new URL(location.href);
    url.searchParams.set('day', day);
    (replace ? history.replaceState : history.pushState).call(history, {}, '', url);
  }
  document.querySelectorAll('[data-day]').forEach(button => button.addEventListener('click', () => setDay(Number(button.dataset.day))));
  next.addEventListener('click', () => setDay(current === 6 ? 1 : current + 1));
  addEventListener('resize', () => setDay(current, true));
  setDay(current, true);
})();
