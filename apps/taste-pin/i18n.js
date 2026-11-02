'use strict';
(() => {
  let preference = 'tr';
  try { preference = localStorage.getItem('taste-pin.locale') || 'tr'; } catch {}
  if (!['tr', 'en'].includes(preference)) preference = 'tr';
  let locale = preference;
  const t = (key, values = {}) => (window.webMessages[locale][key] || window.webMessages.en[key] || key).replace(/\{([^}]+)\}/g, (match, name) => values[name] ?? match);
  const picker = document.querySelector('.language-picker');
  const trigger = document.querySelector('#language-trigger');
  const menu = document.querySelector('#language-menu');
  const options = [...menu.querySelectorAll('[data-language]')];
  function close(restoreFocus = false) {
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus();
  }
  function open() {
    menu.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    (options.find(option => option.dataset.language === preference) || options[0]).focus();
  }
  trigger.addEventListener('click', () => menu.hidden ? open() : close());
  picker.addEventListener('keydown', event => {
    if (event.key === 'Escape') { close(true); event.preventDefault(); event.stopPropagation(); }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      if (menu.hidden) { open(); return; }
      const current = options.indexOf(document.activeElement);
      const index = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
      options[index].focus();
    }
  });
  document.addEventListener('click', event => { if (!picker.contains(event.target)) close(); });
  picker.addEventListener('focusout', event => { if (!picker.contains(event.relatedTarget)) close(); });
  function render() {
    locale = preference;
    document.documentElement.lang = locale;
    document.documentElement.dir = 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-label]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nLabel)));
    document.querySelectorAll('[data-i18n-alt]').forEach(el => el.setAttribute('alt', t(el.dataset.i18nAlt)));
    document.querySelectorAll('[data-i18n-content]').forEach(el => el.setAttribute('content', t(el.dataset.i18nContent)));
    document.querySelector('[property="og:locale"]').content = locale === 'tr' ? 'tr_TR' : 'en_US';
    const label = t('language.' + locale);
    document.querySelector('#language-current').textContent = label;
    trigger.setAttribute('aria-label', t('language.choose', { language: label }));
    options.forEach(option => option.setAttribute('aria-checked', String(option.dataset.language === preference)));
    document.dispatchEvent(new Event('localechange'));
  }
  window.webI18n = { t, get locale() { return locale; }, count: value => new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : 'en-US').format(value) };
  options.forEach(option => option.addEventListener('click', () => {
    preference = option.dataset.language;
    try { localStorage.setItem('taste-pin.locale', preference); } catch {}
    render();
    close(true);
  }));
  render();
})();
