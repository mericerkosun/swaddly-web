// Dil seçimi: sayfadaki dillerden yalnızca seçilen görünür (CSS:
// html[data-lang]). Sıra: adresteki #en / #tr / #ja / #ko (uygulama böyle açar), yoksa
// tarayıcının dili. Hiçbir şey saklanmaz. Bölümlerde id yok: adres #tr ile
// açılınca tarayıcı aşağı kaydırmasın. JavaScript kapalıysa bütün diller görünür.
(function () {
  var root = document.documentElement;
  // Sayfanın dilleri <html data-langs="en tr">; yoksa hepsi. Sayfada olmayan
  // bir dil istenirse (ör. gizlilik politikası #ja ile açılınca) İngilizce.
  var langs = (root.getAttribute('data-langs') || 'en tr ja ko').split(' ');

  function fromHash() {
    var hash = location.hash.slice(1);
    return langs.indexOf(hash) >= 0 ? hash : null;
  }

  function fromBrowser() {
    var lang = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
    for (var i = 1; i < langs.length; i++) {
      if (lang.indexOf(langs[i]) === 0) return langs[i];
    }
    return 'en';
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
