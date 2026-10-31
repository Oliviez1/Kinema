/* Kinéma — couche d'améliorations (CSS + comportements). À charger APRÈS le script principal.
   Retirer la ligne <script src="polish.js"></script> d'index.html pour tout annuler. */
(function(){
'use strict';
var CSS = `
:root{--ease:cubic-bezier(.2,.8,.2,1)}
*{scrollbar-color:var(--ink) transparent}
html{scroll-padding-top:70px}
body{line-height:1.5;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased}
.skip{position:fixed;left:12px;top:-60px;z-index:10001;background:var(--hl);color:#15131a;padding:10px 16px;font-weight:800;border:2px solid #15131a;transition:top .15s}.skip:focus{top:12px}
.main:focus{outline:0}

/* --- barre de navigation --- */
.navbar{background:rgba(7,7,10,.82);-webkit-backdrop-filter:saturate(1.4) blur(14px);backdrop-filter:saturate(1.4) blur(14px)}
.lk{position:relative;transition:background .15s,color .15s}
.lk:not(.on)::after{content:'';position:absolute;left:13px;right:13px;bottom:3px;height:3px;background:var(--ac);transform:scaleX(0);transform-origin:0 50%;transition:transform .22s var(--ease)}
.lk:not(.on):hover::after{transform:scaleX(1)}
.ib{transition:transform .12s,border-color .12s,background .12s}.ib:hover{transform:translateY(-1px);background:var(--surface3)}.ib:active{transform:translateY(1px)}

/* --- formulaires et boutons --- */
input:focus,select:focus,textarea:focus{border-color:var(--ac)!important;box-shadow:0 0 0 3px rgba(var(--rgb),.25)}
.btn:active,.ml-btn:active,.mb:active{transform:translate(2px,2px);box-shadow:0 0 0 var(--ink)}
.pl,.ml-tab,.day{transition:background .15s,color .15s,transform .1s,border-color .15s}.pl:active,.ml-tab:active,.day:active{transform:translateY(1px)}
.pl.on,.day.on{box-shadow:3px 3px 0 var(--ink)}

/* --- cartes --- */
.card{border-radius:3px;transition:transform .2s var(--ease),box-shadow .2s var(--ease),border-color .2s}
.card:hover{border-color:var(--ac)}
.card img{transition:transform .55s var(--ease),filter .3s}
.card:hover img{transform:scale(1.07)}
.card .ci{background:linear-gradient(var(--surface),var(--surface2))}
.card .sc{border-radius:0 0 8px 0}
.card[data-syn]::after{content:attr(data-syn);position:absolute;left:0;right:0;top:0;aspect-ratio:2/3;display:flex;align-items:flex-end;padding:12px 11px;font-size:.72rem;line-height:1.5;color:#f2ede3;background:linear-gradient(to top,rgba(7,7,10,.96) 30%,rgba(7,7,10,.35) 70%,transparent);opacity:0;transition:opacity .22s;pointer-events:none;overflow:hidden;z-index:2}
.card[data-syn]:hover::after{opacity:1}
.card .qa,.card .inl,.card .sc,.card .tb{z-index:3}
@media(hover:none){.card[data-syn]::after{display:none}}

/* --- rangées : fondu aux bords, flèches, squelettes --- */
.row{-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 14px,#000 calc(100% - 30px),transparent 100%);mask-image:linear-gradient(90deg,transparent 0,#000 14px,#000 calc(100% - 30px),transparent 100%)}
.sec{position:relative}
.rarr{position:absolute;top:calc(50% + 18px);width:42px;height:42px;z-index:6;background:var(--bg);color:var(--text);border:2px solid var(--ink);box-shadow:3px 3px 0 var(--ink);display:grid;place-items:center;font-size:1.5rem;line-height:1;opacity:0;transform:translateY(-50%) scale(.9);transition:opacity .18s,transform .18s}
.rarr.l{left:-8px}.rarr.r{right:-8px}
.sec:hover .rarr{opacity:1;transform:translateY(-50%) scale(1)}.rarr:hover{background:var(--ac);color:#fff}
@media(hover:none){.rarr{display:none}}
@keyframes shim{to{background-position:-200% 0}}
.row>.spin{width:100%;max-width:none;height:calc(var(--cw) * 1.5 + 66px);margin:6px 0 16px;border:0;border-radius:0;animation:shim 1.3s linear infinite;background:linear-gradient(90deg,var(--surface) 0,var(--surface3) 50%,var(--surface) 100%);background-size:200% 100%;-webkit-mask-image:repeating-linear-gradient(90deg,#000 0,#000 var(--cw),transparent var(--cw),transparent calc(var(--cw) + 14px));mask-image:repeating-linear-gradient(90deg,#000 0,#000 var(--cw),transparent var(--cw),transparent calc(var(--cw) + 14px))}

/* --- apparition des sections au défilement --- */
.sec.rv{opacity:0;transform:translateY(16px)}
.sec.rv.in{opacity:1;transform:none;transition:opacity .5s var(--ease),transform .5s var(--ease)}

/* --- accueil : bandeau --- */
.hero::after{content:'';position:absolute;left:0;right:0;bottom:0;height:90px;background:linear-gradient(transparent,var(--bg));pointer-events:none;z-index:2}
@keyframes kb{from{transform:scale(1)}to{transform:scale(1.07)}}
.hs.on .hbg{animation:kb 16s ease-out forwards}
.ht{letter-spacing:-.01em;text-wrap:balance}
.dot{transition:width .25s,background .25s}
.tile{border-radius:3px}

/* --- fiche --- */
.dhc>img{transition:transform .35s var(--ease)}.dhc>img:hover{transform:rotate(0) scale(1.02)}
.dstat{transition:transform .15s,border-color .15s}.dstat:hover{transform:translateY(-3px);border-color:var(--ac)}
.ep{transition:border-color .12s,transform .12s}.ep:hover{transform:translateX(3px)}
.panel{border-radius:2px}
.prov{display:flex;gap:8px;flex-wrap:wrap}.prov img{width:44px;height:44px;border-radius:9px;border:2px solid var(--ink);background:var(--surface3)}
.cd{font-variant-numeric:tabular-nums}

/* --- ma liste, profil --- */
.ml-card{border-radius:3px}.ml-poster::after{content:'';position:absolute;inset:auto 0 0 0;height:45%;background:linear-gradient(transparent,rgba(0,0,0,.55));pointer-events:none}
.ml-bt{z-index:2}.ml-st,.ml-x{z-index:3}
.stat,.pb,.fact,.bd,.act{transition:transform .15s,border-color .15s}.stat:hover,.fact:hover{transform:translateY(-2px);border-color:var(--ac)}
.empty,.ml-empty{border-radius:4px}

/* --- fenêtres, notifications --- */
.mov{-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}
.toast{border-left:5px solid var(--ac);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
#offl{position:fixed;left:0;right:0;top:var(--nav);z-index:99;background:#d99a00;color:#15131a;text-align:center;font-weight:800;font-size:.8rem;padding:6px 12px;display:none}
#offl.show{display:block}

/* --- thème clair « papier » --- */
[data-theme=light]{--bg:#f6f1e4;--surface:#fffdf6;--surface2:#efe8d6;--surface3:#e0d6bd;--ink:#15131a;--text:#15131a;--muted:#5d5866;--gold:#d99a00;--green:#0c9b63}
[data-theme=light] body{background-image:radial-gradient(rgba(21,19,26,.07) 1px,transparent 1.7px);background-size:14px 14px}
[data-theme=light] .navbar{background:rgba(246,241,228,.88)}
[data-theme=light] .tb{background:rgba(255,253,246,.92)}[data-theme=light] .tb.movie{background:var(--gold)}
[data-theme=light] .dh,[data-theme=light] .stamp{--surface:#0e0e13;--text:#f6f1e4;--ink:#3a3846;--muted:#c9c4d6;color:#f6f1e4}
[data-theme=light] .back{color:#fff}
[data-theme=light] .card[data-syn]::after,[data-theme=light] .ml-poster::after{color:#f2ede3}
[data-theme=light] .st{color:#15131a}
[data-theme=light] .row>.spin{background:linear-gradient(90deg,var(--surface2) 0,var(--surface3) 50%,var(--surface2) 100%);background-size:200% 100%}

/* --- petits écrans --- */
@media(max-width:600px){
 .grid{grid-template-columns:repeat(auto-fill,minmax(118px,1fr));gap:16px 10px}
 .ml-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:18px 10px}
 .wrap{padding:16px 12px}.st{font-size:1.05rem}.ht{font-size:1.7rem}.hero{height:460px}
 .btn{padding:11px 16px}.row .card{flex-basis:128px}.dt{font-size:2rem}
 .tiles{grid-template-columns:repeat(2,1fr)}
}
@media(prefers-reduced-motion:reduce){.sec.rv{opacity:1;transform:none}.hs.on .hbg{animation:none}.row>.spin{animation:none}}
`;
var st = document.createElement('style'); st.id = 'polish-css'; st.textContent = CSS; document.head.appendChild(st);

/* ---------- thème clair / sombre ---------- */
var theme = 'dark'; try { theme = localStorage.getItem('kinema_theme') || 'dark'; } catch (e) {}
document.documentElement.dataset.theme = theme;
function themeBtn() {
  var nav = document.querySelector('.navbar'); if (!nav || document.getElementById('themeBtn')) return;
  var b = document.createElement('button'); b.id = 'themeBtn'; b.className = 'ib'; b.type = 'button';
  b.title = 'Thème clair / sombre'; b.setAttribute('aria-label', 'Changer de thème');
  var paint = function () { b.textContent = document.documentElement.dataset.theme === 'light' ? '🌙' : '☀️'; };
  b.onclick = function () {
    var t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = t; try { localStorage.setItem('kinema_theme', t); } catch (e) {}
    var m = document.querySelector('meta[name=theme-color]'); if (m) m.content = t === 'light' ? '#f6f1e4' : '#07070a';
    paint();
  };
  paint(); var sync = document.getElementById('sync'); nav.insertBefore(b, sync || null);
}
themeBtn();

/* ---------- lien d'évitement + bandeau hors ligne ---------- */
var main = document.querySelector('.main'); if (main) main.setAttribute('tabindex', '-1');
var skip = document.createElement('a'); skip.className = 'skip'; skip.href = '#'; skip.textContent = 'Aller au contenu';
skip.onclick = function (e) { e.preventDefault(); if (main) main.focus(); }; document.body.insertBefore(skip, document.body.firstChild);
var off = document.createElement('div'); off.id = 'offl'; off.setAttribute('role', 'status');
off.textContent = 'Hors ligne : tes changements seront enregistrés dès le retour de la connexion.'; document.body.appendChild(off);
function net() { off.classList.toggle('show', !navigator.onLine); }
addEventListener('online', net); addEventListener('offline', net); net();

/* ---------- synopsis au survol des cartes ---------- */
if (typeof card === 'function') {
  var _card = card;
  card = function (a, qa) {
    var h = _card(a, qa === undefined ? true : qa);
    var s = String((a && a.synopsis) || '').replace(/\s+/g, ' ').trim();
    if (!s) return h;
    var t = s.length > 150 ? s.slice(0, 150).replace(/\s+\S*$/, '') + '…' : s;
    return h.replace('<div class="card" ', '<div class="card" data-syn="' + esc(t) + '" ');
  };
}

/* ---------- où regarder (TMDB / JustWatch) sur les fiches de films ---------- */
async function providers(key) {
  try {
    if (!key || key.indexOf('tm:') !== 0 || !TMDB()) return;
    var d = await tm('/movie/' + key.slice(3) + '/watch/providers');
    if (location.hash.indexOf(key) < 0) return;
    var side = document.getElementById('track'); side = side && side.parentElement; if (!side || document.getElementById('prov')) return;
    var fr = d && d.results && d.results.FR;
    var img = function (p) { return '<img src="https://image.tmdb.org/t/p/w92' + p.logo_path + '" alt="' + esc(p.provider_name) + '" title="' + esc(p.provider_name) + '" loading="lazy">'; };
    var grp = function (arr, label) { return arr && arr.length ? '<div class="cs" style="margin:10px 0 6px">' + label + '</div><div class="prov">' + arr.map(img).join('') + '</div>' : ''; };
    var body = fr ? grp(fr.flatrate, 'En streaming') + grp(fr.rent, 'En location') + grp(fr.buy, 'À l\'achat') : '';
    if (!body) body = '<p class="note">Aucune offre trouvée en France pour le moment.</p>';
    var p = document.createElement('div'); p.className = 'panel'; p.id = 'prov';
    p.innerHTML = '<div class="pt2">Où regarder (France)</div>' + body + '<p class="note" style="font-size:.66rem">Données fournies par JustWatch via TMDB.</p>';
    side.insertBefore(p, side.children[1] || null);
  } catch (e) {}
}
if (typeof rDetail === 'function') {
  var _rd = rDetail;
  rDetail = async function (key) { await _rd(key); providers(key); };
}

/* ---------- flèches sur les rangées + apparition au défilement ---------- */
var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.05 }) : null;
function enhance() {
  document.querySelectorAll('.sec > .row').forEach(function (r) {
    var s = r.parentElement; if (s.querySelector(':scope > .rarr')) return;
    [-1, 1].forEach(function (d) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'rarr ' + (d < 0 ? 'l' : 'r');
      b.setAttribute('aria-label', d < 0 ? 'Précédent' : 'Suivant'); b.textContent = d < 0 ? '‹' : '›';
      b.onclick = function () { r.scrollBy({ left: d * r.clientWidth * 0.85, behavior: 'smooth' }); }; s.appendChild(b);
    });
  });
  if (io) document.querySelectorAll('.sec:not(.rv)').forEach(function (s) { s.classList.add('rv'); io.observe(s); });
  clearTimeout(enhance._t); enhance._t = setTimeout(function () { document.querySelectorAll('.sec.rv:not(.in)').forEach(function (s) { s.classList.add('in'); }); }, 2500);
}
var pending = false;
new MutationObserver(function () { if (pending) return; pending = true; requestAnimationFrame(function () { pending = false; enhance(); }); })
  .observe(document.body, { childList: true, subtree: true });
enhance();

/* ---------- bandeau d'accueil : pause au survol, balayage, flèches clavier ---------- */
var inHero = false;
document.addEventListener('mouseover', function (e) {
  var h = !!(e.target.closest && e.target.closest('.hero'));
  if (h && !inHero) { inHero = true; clearInterval(heroT); }
  else if (!h && inHero) { inHero = false; if (document.querySelector('#p-home.on') && typeof startHero === 'function') startHero(); }
});
var tx = null;
document.addEventListener('touchstart', function (e) { tx = (e.target.closest && e.target.closest('.hero')) ? e.touches[0].clientX : null; }, { passive: true });
document.addEventListener('touchend', function (e) {
  if (tx == null || !window.HERO || !HERO.length) { tx = null; return; }
  var dx = e.changedTouches[0].clientX - tx; tx = null;
  if (Math.abs(dx) > 50) goHero((hi + (dx < 0 ? 1 : HERO.length - 1)) % HERO.length);
}, { passive: true });
addEventListener('keydown', function (e) {
  var typing = /INPUT|TEXTAREA|SELECT/.test(e.target.tagName);
  if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
  if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && document.querySelector('#p-home.on') && window.HERO && HERO.length && !document.getElementById('mov')) {
    goHero((hi + (e.key === 'ArrowRight' ? 1 : HERO.length - 1)) % HERO.length);
  }
  if (e.key === '?' && typeof openGuide === 'function') { e.preventDefault(); openGuide(); }
});
})();
