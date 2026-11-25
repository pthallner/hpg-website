/*
 * Year in Review banner (home page).
 *
 * A slim, dismissible bar along the bottom of the screen that invites
 * visitors to take the 2026 Year in Review. Self-contained: it adds its
 * own styles and markup, so the home page only needs one <script> tag.
 *
 * It stops showing on its own at the end of Dec 31, 2026, US Eastern
 * (midnight EST = 05:00 UTC on Jan 1, 2027). After that this file and
 * its <script> tag can be deleted at any convenient time.
 *
 * A visitor who closes it won't see it again on that browser.
 */
(function () {
  var ENDS_AT = Date.UTC(2027, 0, 1, 5, 0, 0); // Jan 1, 2027 00:00 EST
  var KEY = 'hpg-yir-banner-dismissed';
  var HREF = '/year-in-review/';

  if (Date.now() >= ENDS_AT) return;
  if (location.pathname.indexOf('/year-in-review') === 0) return;
  try { if (localStorage.getItem(KEY)) return; } catch (e) {}

  var css =
    '#hpg-yir{position:fixed;left:0;right:0;bottom:0;z-index:95;background:#1A365D;color:#FDFCFA;' +
    'font-family:Inter,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;' +
    'border-top:3px solid #68A063;box-shadow:0 -8px 28px rgba(26,54,93,0.22);' +
    'transform:translateY(100%);transition:transform 320ms cubic-bezier(0.4,0,0.2,1);}' +
    '#hpg-yir.in{transform:translateY(0);}' +
    '#hpg-yir .yir-wrap{max-width:1200px;margin:0 auto;padding:14px 32px;display:flex;align-items:center;gap:20px;}' +
    '#hpg-yir .yir-text{flex:1;margin:0;font-size:15px;line-height:1.5;color:rgba(253,252,250,0.92);}' +
    '#hpg-yir .yir-text b{color:#FDFCFA;font-weight:600;}' +
    '#hpg-yir .yir-cta{flex:none;background:#0070F3;color:#FDFCFA;padding:11px 20px;border-radius:8px;' +
    'font-size:14px;font-weight:600;text-decoration:none;white-space:nowrap;' +
    'transition:transform 200ms cubic-bezier(0.4,0,0.2,1),box-shadow 200ms cubic-bezier(0.4,0,0.2,1);}' +
    '#hpg-yir .yir-cta:hover{transform:translateY(-1px);box-shadow:0 8px 26px rgba(0,112,243,0.34);}' +
    '#hpg-yir .yir-close{flex:none;background:none;border:0;cursor:pointer;color:rgba(253,252,250,0.7);' +
    'font-size:24px;line-height:1;padding:6px 8px;border-radius:6px;}' +
    '#hpg-yir .yir-close:hover{color:#FDFCFA;}' +
    '#hpg-yir a:focus-visible,#hpg-yir button:focus-visible{outline:2px solid #9FD195;outline-offset:2px;}' +
    '@media (max-width:768px){#hpg-yir .yir-wrap{padding:12px 16px 12px 20px;gap:12px;flex-wrap:wrap;}' +
    '#hpg-yir .yir-text{flex-basis:calc(100% - 48px);font-size:14px;}' +
    '#hpg-yir .yir-close{order:2;align-self:flex-start;margin-top:-4px;}' +
    '#hpg-yir .yir-cta{order:3;}}' +
    '@media (prefers-reduced-motion:reduce){#hpg-yir{transition:none;}}' +
    '@media print{#hpg-yir{display:none!important;}}';

  function mount() {
    if (document.getElementById('hpg-yir')) return;

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('aside');
    bar.id = 'hpg-yir';
    bar.setAttribute('aria-label', '2026 Year in Review');
    bar.innerHTML =
      '<div class="yir-wrap">' +
        '<p class="yir-text"><b>How did your firm’s structure hold up in 2026?</b> ' +
        'A free five-minute year-end review for firm leaders, with your results right away.</p>' +
        '<a class="yir-cta" href="' + HREF + '">Take the review</a>' +
        '<button class="yir-close" type="button" aria-label="Close">&times;</button>' +
      '</div>';
    document.body.appendChild(bar);

    // Keep the bottom of the page (footer, contact form) clear of the bar.
    var basePad = parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
    function pad() { document.body.style.paddingBottom = (basePad + bar.offsetHeight) + 'px'; }
    pad();
    window.addEventListener('resize', pad);

    requestAnimationFrame(function () { requestAnimationFrame(function () { bar.classList.add('in'); }); });

    bar.querySelector('.yir-close').addEventListener('click', function () {
      try { localStorage.setItem(KEY, '1'); } catch (e) {}
      window.removeEventListener('resize', pad);
      document.body.style.paddingBottom = basePad ? basePad + 'px' : '';
      bar.parentNode.removeChild(bar);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
