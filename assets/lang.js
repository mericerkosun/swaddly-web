// Dil seçimi: sayfada iki dil de var, yalnızca seçilen görünür (CSS:
// html[data-lang]). Sıra: adresteki #en / #tr (uygulama böyle açar), yoksa
// tarayıcının dili. Hiçbir şey saklanmaz. Bölümlerde id yok: adres #tr ile
// açılınca tarayıcı aşağı kaydırmasın. JavaScript kapalıysa iki dil de görünür.
(function () {
  var langs = ['en', 'tr'];
  var root = document.documentElement;

  function fromHash() {
    var hash = location.hash.slice(1);
    return langs.indexOf(hash) >= 0 ? hash : null;
  }

  function fromBrowser() {
    var lang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    return lang.toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }

  // Düğmelerin durumu ve dili taşıyan bağlantılar (logo, ana sayfa).
  function sync() {
    var lang = root.getAttribute('data-lang');
    var switches = document.querySelectorAll('a[data-switch]');
    for (var i = 0; i < switches.length; i++) {
      var on = switches[i].getAttribute('hreflang') === lang;
      if (on) switches[i].setAttribute('aria-current', 'true');
      else switches[i].removeAttribute('aria-current');
    }
    var keep = document.querySelectorAll('a[data-keep-lang]');
    for (var j = 0; j < keep.length; j++) {
      keep[j].setAttribute('href', keep[j].getAttribute('href').split('#')[0] + '#' + lang);
    }
  }

  function set(lang) {
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    if (document.readyState !== 'loading') sync();
  }

  set(fromHash() || fromBrowser());

  document.addEventListener('DOMContentLoaded', sync);

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[data-switch]');
    if (!link) return;
    event.preventDefault();
    var lang = link.getAttribute('hreflang');
    history.replaceState(null, '', '#' + lang);
    set(lang);
  });

  window.addEventListener('hashchange', function () {
    var lang = fromHash();
    if (lang) set(lang);
  });
})();
