/* High Peaks Group: small shared behaviors. No dependencies. */
(function () {
  document.documentElement.classList.add('js');

  // Mobile menu
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Hero drawing: give each growth line its own length so it draws once
  document.querySelectorAll('.draw .s-new').forEach(function (p) {
    if (p.getTotalLength) p.style.setProperty('--len', Math.ceil(p.getTotalLength()));
  });

  // Record which page a form was sent from
  document.querySelectorAll('input[name="source"][data-auto]').forEach(function (i) {
    i.value = window.location.pathname;
  });

  // Insights category filter. Buttons only appear when there is more than one category.
  var list = document.querySelector('[data-posts]');
  var bar = document.querySelector('[data-filters]');
  if (list && bar) {
    var items = Array.prototype.slice.call(list.querySelectorAll('li[data-cat]'));
    var cats = [];
    items.forEach(function (li) { if (cats.indexOf(li.dataset.cat) < 0) cats.push(li.dataset.cat); });
    if (cats.length > 1) {
      ['All'].concat(cats).forEach(function (c, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = c;
        b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        b.addEventListener('click', function () {
          bar.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          items.forEach(function (li) { li.hidden = !(c === 'All' || li.dataset.cat === c); });
        });
        bar.appendChild(b);
      });
    }
  }
})();
