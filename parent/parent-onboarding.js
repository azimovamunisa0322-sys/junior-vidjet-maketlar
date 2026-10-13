(() => {
  const sheet = document.querySelector('.parent-sheet');
  const shade = document.querySelector('.parent-shade');
  document.querySelector('[data-start]').addEventListener('click', () => {
    sheet.classList.add('is-dismissed');
    shade.classList.add('is-dismissed');
    document.querySelector('.phone iframe').style.pointerEvents = 'auto';
  });
})();
