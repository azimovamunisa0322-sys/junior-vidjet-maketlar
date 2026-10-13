(() => {
  const steps = [
    { art: '👋', title: 'Junior’ga xush kelibsiz!', text: 'Farzandingizning o‘qishi haqidagi kerakli ma’lumotlar endi siz uchun ham ko‘rinadi.', extra: '<div><span>☀️</span><b>Bugungi holat</b><small>Farzandingiz ayni paytda nimani bajarayotgani</small></div>', action: 'Keyingisi' },
    { art: '📈', title: 'Eng muhimini bir qarashda ko‘ring', text: 'Bugun nechta dars tugatgani, keyingi darsi va faolligi — hammasi bir joyda.', extra: '<div><span>✓</span><b>Bajarilgan darslar</b><small>Bugungi natija va keyingi qadam</small></div><div><span>⌁</span><b>Yordam signali</b><small>Faqat e’tibor kerak bo‘lgan paytda</small></div>', action: 'Yana bitta narsa' },
    { art: '<img src="../bugungi-reja/src/assets/robomentor.png" alt="Farzandim natijasi boti">', title: 'Farzandim natijasi', text: 'Savol tug‘ilsa, @junior_farzandim_bot sizga farzandingizning natijalari va o‘qishi haqida yordam beradi.', extra: '<div class="bot-intro"><span>✦</span><b>@junior_farzandim_bot</b><small>Natijani tez tushunish va kerakli tavsiyalar uchun</small></div>', action: 'Botni ochish', bot: true }
  ];
  let current = 0;
  const sheet = document.querySelector('.parent-sheet');
  const step = document.querySelector('[data-step]');
  const art = document.querySelector('[data-art]');
  const title = document.querySelector('[data-title]');
  const text = document.querySelector('[data-text]');
  const extra = document.querySelector('[data-extra]');
  const next = document.querySelector('[data-next]');
  function render() {
    const state = steps[current];
    sheet.classList.remove('is-stepping');
    void sheet.offsetWidth;
    sheet.classList.add('is-stepping');
    step.textContent = `${current + 1}/3`;
    document.querySelector('.sheet-progress i').style.width = `${(current + 1) * 33.333}%`;
    art.innerHTML = state.art;
    title.textContent = state.title;
    text.textContent = state.text;
    extra.innerHTML = state.extra;
    next.textContent = state.action;
    next.classList.toggle('is-bot', !!state.bot);
  }
  next.addEventListener('click', () => {
    if (steps[current].bot) location.href = 'https://t.me/junior_farzandim_bot';
    else { current += 1; render(); }
  });
  render();
})();
