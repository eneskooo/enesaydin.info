'use strict';

const screenChoices = document.querySelector('.screen-choices');
const productScreen = document.querySelector('#product-screen');
const screenDescription = document.querySelector('#screen-description');

screenChoices.addEventListener('click', event => {
  const choice = event.target.closest('button[data-screen]');
  if (!choice || choice.getAttribute('aria-pressed') === 'true') return;

  for (const button of screenChoices.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button === choice));
  }
  const prefix = 'landing.' + choice.dataset.screen;
  productScreen.dataset.i18nSrc = prefix + '.image';
  productScreen.dataset.i18nAlt = prefix + '.alt';
  screenDescription.dataset.i18n = prefix + '.description';
  productScreen.src = webI18n.t(productScreen.dataset.i18nSrc);
  productScreen.alt = webI18n.t(productScreen.dataset.i18nAlt);
  screenDescription.textContent = webI18n.t(screenDescription.dataset.i18n);
});
