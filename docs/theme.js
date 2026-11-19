/* Тема сайта «Ставка»: ставит сохранённую тему до отрисовки страницы и строит переключатель (три кружка) в каждом элементе .themes.
   Выбор запоминается в localStorage этого сайта и общий для страницы «Скачать» и справки; если хранилище недоступно — просто работает тёмная.
   Новая тема: блок в theme.css + строка в THEMES. */
(function () {
  var THEMES = [['dark', 'Тёмная'], ['light', 'Светлая'], ['pink', 'Розовая']];
  var KEY = 'stavka-theme';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* хранилище закрыто — остаёмся на тёмной */ }
  var current = THEMES.some(function (t) { return t[0] === saved; }) ? saved : 'dark';
  document.documentElement.setAttribute('data-theme', current);

  function mark() {
    document.querySelectorAll('.themes .sw').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-theme-set') === current ? 'true' : 'false');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.themes').forEach(function (box) {
      THEMES.forEach(function (t) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'sw sw-' + t[0];
        b.setAttribute('data-theme-set', t[0]);
        b.title = t[1] + ' тема';
        b.setAttribute('aria-label', t[1] + ' тема');
        b.addEventListener('click', function () {
          current = t[0];
          document.documentElement.setAttribute('data-theme', current);
          try { localStorage.setItem(KEY, current); } catch (e) { /* не страшно: тема применится до перезагрузки */ }
          mark();
        });
        box.appendChild(b);
      });
    });
    mark();
  });
})();
