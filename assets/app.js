(function () {
  var cur = document.querySelector('nav.site a[aria-current]');
  if (cur && cur.scrollIntoView) cur.scrollIntoView({block: 'nearest', inline: 'center'});
  // Графы оргструктуры: открыть так, чтобы корневой узел был по центру
  [].slice.call(document.querySelectorAll('.org')).forEach(function (o) {
    var r = o.querySelector('span.n');
    if (r) o.scrollLeft = r.offsetLeft + r.offsetWidth / 2 - o.clientWidth / 2;
  });
  // Увеличение рисунков: ссылка на крупный снимок открывается поверх страницы
  var links = [].slice.call(document.querySelectorAll('figure a[href$=".webp"]'));
  if (!links.length) return;
  var lb = document.createElement('div');
  lb.id = 'lb';
  lb.setAttribute('aria-hidden', 'true');
  lb.innerHTML = '<div class="bar"><span class="t"></span><span class="cnt"></span><button type="button" data-a="x">Закрыть ✕</button></div>' +
    '<div class="frame"><img alt=""></div>' +
    '<div class="nav"><button type="button" data-a="p">←</button><button type="button" data-a="n">→</button></div>';
  document.body.appendChild(lb);
  var img = lb.querySelector('img'), t = lb.querySelector('.t'), c = lb.querySelector('.cnt'), i = 0;
  function show() {
    var a = links[i], im = a.querySelector('img');
    img.classList.remove('zoomed');
    img.src = a.getAttribute('href');
    img.alt = im ? im.alt : '';
    t.textContent = img.alt;
    c.textContent = (i + 1) + ' / ' + links.length;
  }
  function open(k) { i = k; show(); lb.classList.add('on'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function close() { lb.classList.remove('on'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  function mv(d) { i = (i + d + links.length) % links.length; show(); }
  links.forEach(function (a, k) { a.addEventListener('click', function (e) { e.preventDefault(); open(k); }); });
  lb.addEventListener('click', function (e) {
    var a = e.target.getAttribute('data-a');
    if (a === 'x') close(); else if (a === 'p') mv(-1); else if (a === 'n') mv(1);
    else if (e.target === img) img.classList.toggle('zoomed');
    else if (e.target === lb || e.target.classList.contains('frame')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') mv(1); else if (e.key === 'ArrowLeft') mv(-1);
  });
})();
