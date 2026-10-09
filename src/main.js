/* ==========================================================================
   MAIN — logique de l'invitation (les textes se modifient dans src/config.js)
   ========================================================================== */
import './styles.css';
import { BIRTHDAY_CONFIG as C } from './config.js';
import { ICONS } from './icons.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmall = window.innerWidth < 600;

// Palette lavande, blanc, or
const PALETTE = ['#B49BE3', '#D8C6F3', '#C9A227', '#EBD38A', '#FFFFFF', '#9677D1', '#E2D6F8'];

// ---------- Utilitaires ----------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const rand = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const pad = (n) => String(n).padStart(2, '0');

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Lit une valeur de config via un chemin "a.b.c"
function get(path) {
  return path.split('.').reduce((obj, key) => (obj == null ? undefined : obj[key]), C);
}

// Remplit les éléments [data-bind] avec les textes de la config
function bindTexts() {
  $$('[data-bind]').forEach((el) => {
    const value = get(el.dataset.bind);
    if (value !== undefined && value !== null) el.textContent = value;
  });
}

// ---------- Décorations flottantes ----------
function createFloaters() {
  const layer = $('#floatLayer');
  if (reduceMotion || !layer) return;

  const counts = {
    balloons: isSmall ? 12 : 24,
    hearts: isSmall ? 8 : 14,
    stars: isSmall ? 12 : 22
  };

  for (let i = 0; i < counts.balloons; i++) {
    const b = document.createElement('span');
    b.className = 'balloon';
    const size = isSmall ? rand(40, 68) : rand(52, 110);
    b.style.setProperty('--s', size + 'px');
    b.style.setProperty('--c', pick(PALETTE));
    b.style.setProperty('--dur', rand(14, 26) + 's');
    b.style.setProperty('--sway', rand(-60, 60) + 'px');
    b.style.setProperty('--rot', rand(-12, 12) + 'deg');
    b.style.left = rand(0, 94) + '%';
    b.style.animationDelay = rand(-26, 0) + 's';
    layer.appendChild(b);
  }

  for (let i = 0; i < counts.hearts; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.innerHTML = ICONS.crown;
    h.style.color = pick(['#B49BE3', '#C9A227', '#D8C6F3']);
    h.style.setProperty('--s', rand(16, 34) + 'px');
    h.style.setProperty('--dur', rand(12, 22) + 's');
    h.style.setProperty('--sway', rand(-40, 40) + 'px');
    h.style.setProperty('--rot', rand(-20, 20) + 'deg');
    h.style.left = rand(0, 96) + '%';
    h.style.animationDelay = rand(-22, 0) + 's';
    layer.appendChild(h);
  }

  for (let i = 0; i < counts.stars; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    s.innerHTML = ICONS.sparkle;
    s.style.setProperty('--s', rand(12, 26) + 'px');
    s.style.setProperty('--delay', rand(0, 3) + 's');
    s.style.left = rand(0, 98) + '%';
    s.style.top = rand(0, 98) + '%';
    layer.appendChild(s);
  }
}

// Confettis qui éclatent depuis le centre
function burst(count = 60) {
  if (reduceMotion) return;
  const layer = $('#floatLayer');
  if (!layer) return;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'confetti';
    p.style.setProperty('--dx', rand(-42, 42) + 'vw');
    p.style.setProperty('--dy', rand(-55, -12) + 'vh');
    p.style.setProperty('--rot', rand(-720, 720) + 'deg');
    p.style.background = pick(PALETTE);
    p.style.animationDelay = rand(0, 0.15) + 's';
    if (Math.random() > 0.6) {
      p.style.borderRadius = '50%';
      p.style.width = p.style.height = rand(7, 11) + 'px';
    }
    layer.appendChild(p);
    setTimeout(() => p.remove(), 2600);
  }
}

// ---------- Musique d'ambiance ----------
// Le navigateur n'autorise le son qu'après un clic : on la lance à l'ouverture de la carte.
let audio = null;

function setupMusic() {
  const btn = $('#musicBtn');
  const src = get('music.src');
  if (!btn) return;
  if (!src) {
    btn.classList.add('is-hidden');
    return;
  }

  audio = new Audio(src);
  audio.loop = true;
  audio.volume = get('music.volume') ?? 0.3;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      setMusicButton(true);
    } else {
      audio.pause();
      setMusicButton(false);
    }
  });
  setMusicButton(false);
}

function setMusicButton(playing) {
  const btn = $('#musicBtn');
  btn.innerHTML = `<span class="music-icon">${playing ? ICONS.volume : ICONS.mute}</span>`;
  btn.setAttribute('aria-label', playing ? 'Couper la musique' : 'Lancer la musique');
}

function startMusicFromGesture() {
  if (!audio) return;
  const tryPlay = () => audio.play()
    .then(() => { setMusicButton(true); return true; })
    .catch(() => { setMusicButton(false); return false; });

  tryPlay().then((ok) => {
    if (ok) return;
    // Certains navigateurs bloquent le premier essai : on réessaie au prochain clic
    const retry = () => {
      tryPlay().then((played) => { if (played) document.removeEventListener('pointerdown', retry); });
    };
    document.addEventListener('pointerdown', retry);
  });
}

// ---------- Intro : ouverture de la carte ----------
let opening = false;

function openInvitation() {
  if (opening) return;
  opening = true;

  const envelope = $('#envelope');
  const intro = $('#intro');
  envelope.classList.add('open');

  burst(reduceMotion ? 0 : 90);
  startMusicFromGesture();

  setTimeout(() => intro.classList.add('leave'), reduceMotion ? 0 : 1300);
  setTimeout(() => {
    intro.classList.add('is-hidden');
    showGate();
  }, reduceMotion ? 50 : 2000);
}

function showSite() {
  $('#site').classList.add('show');
  document.body.classList.add('site-on');
  window.scrollTo(0, 0);
  setupRevealOnScroll();
}

// ---------- Verrou : le décret ne s'ouvre qu'après le mystère de l'âge ----------
function showGate() {
  const gate = $('#gate');
  if (!gate) {
    showSite();
    return;
  }
  gate.classList.add('show');
  const input = $('#gateInput');
  if (input) setTimeout(() => input.focus(), 300);
}

function setupGate() {
  const form = $('#gateForm');
  const input = $('#gateInput');
  const msg = $('#gateMsg');
  const hint = $('#gateHint');
  const submit = $('#gateSubmit');
  const gate = $('#gate');
  if (!form || !input || !gate) return;

  const accepted = (C.gate?.answers || []).map(normalizeAnswer);
  let attempts = 0;
  let unlocked = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (unlocked) return;
    const guess = normalizeAnswer(input.value);
    if (!guess) {
      input.focus();
      return;
    }

    if (accepted.includes(guess)) {
      unlocked = true;
      input.disabled = true;
      submit.disabled = true;
      showReward(msg, C.gate.success);
      burst(80);
      setTimeout(() => {
        gate.classList.add('leave');
        setTimeout(() => {
          gate.classList.remove('show', 'leave');
          gate.classList.add('is-hidden');
          showSite();
        }, 900);
      }, 900);
      return;
    }

    attempts += 1;
    msg.textContent = C.gate.wrong;
    if (attempts >= 2 && hint) hint.classList.remove('is-hidden');
    if (!reduceMotion) {
      input.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
        { duration: 280 }
      );
    }
    input.select();
  });
}

// ---------- Puzzle royal : photo en 3×3 à remettre dans l'ordre ----------
function setupPuzzle() {
  const grid = $('#puzzleGrid');
  const movesEl = $('#puzzleMoves');
  const msg = $('#puzzleMsg');
  const resetBtn = $('#puzzleReset');
  if (!grid) return;
  const image = C.puzzle?.image || '';
  const EMPTY = 8;

  let tiles = [];
  let moves = 0;
  let solved = false;

  function isSolved() {
    return tiles.every((t, i) => t === i);
  }

  function render() {
    grid.innerHTML = tiles.map((t, pos) => {
      if (t === EMPTY) return `<span class="puzzle-tile is-empty" aria-hidden="true"></span>`;
      const row = Math.floor(t / 3);
      const col = t % 3;
      const style = image
        ? `background-image:url('${image}');background-position:${col * 50}% ${row * 50}%`
        : '';
      return `<button type="button" class="puzzle-tile" data-pos="${pos}" style="${style}" aria-label="Morceau ${t + 1}">${image ? '' : t + 1}</button>`;
    }).join('');
  }

  function adjacent(a, b) {
    const ar = Math.floor(a / 3), ac = a % 3;
    const br = Math.floor(b / 3), bc = b % 3;
    return Math.abs(ar - br) + Math.abs(ac - bc) === 1;
  }

  function build() {
    // Départ depuis la solution, puis mélange par des coups légaux (toujours résoluble)
    tiles = [0, 1, 2, 3, 4, 5, 6, 7, EMPTY];
    let empty = 8;
    for (let k = 0; k < 120; k++) {
      const options = [];
      for (let p = 0; p < 9; p++) if (adjacent(p, empty)) options.push(p);
      const pick2 = options[Math.floor(Math.random() * options.length)];
      [tiles[empty], tiles[pick2]] = [tiles[pick2], tiles[empty]];
      empty = pick2;
    }
    moves = 0;
    solved = false;
    movesEl.textContent = '0';
    msg.textContent = '';
    render();
  }

  grid.addEventListener('click', (event) => {
    const btn = event.target.closest('.puzzle-tile');
    if (!btn || solved) return;
    const pos = Number(btn.dataset.pos);
    const empty = tiles.indexOf(EMPTY);
    if (!adjacent(pos, empty)) return;

    [tiles[pos], tiles[empty]] = [tiles[empty], tiles[pos]];
    moves += 1;
    movesEl.textContent = String(moves);
    render();

    if (isSolved()) {
      solved = true;
      showReward(msg, C.puzzle?.win || 'Puzzle terminé !');
      burst(70);
    }
  });

  resetBtn.addEventListener('click', build);
  build();
}

// ---------- Apparition au scroll ----------
function setupRevealOnScroll() {
  const items = $$('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  items.forEach((el) => observer.observe(el));
}

// ---------- Rendu des sections ----------
function card(inner) {
  return `<article class="card reveal">${inner}</article>`;
}

function renderCards(containerId, items, toHtml) {
  const el = $(containerId);
  if (!el || !Array.isArray(items)) return;
  el.innerHTML = items.map((item, i) => card(toHtml(item, i))).join('');
}

function renderPrestations() {
  renderCards('#prestationsList', C.prestations, (p) => `
    <span class="card-emoji" aria-hidden="true">${esc(p.emoji)}</span>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.text)}</p>`);
}

function renderSteps() {
  renderCards('#stepsList', C.steps, (s) => `
    <span class="step-number">${esc(s.number)}</span>
    <h3>${esc(s.title)}</h3>
    <p>${esc(s.text)}</p>`);
}

function renderFeatures() {
  renderCards('#featuresList', C.features, (f) => `
    <span class="card-icon" aria-hidden="true">${ICONS[f.icon] || ICONS.sparkle}</span>
    <h3>${esc(f.title)}</h3>
    <p>${esc(f.text)}</p>`);
}

// Bandeau défilant : la liste est répétée pour boucler sans coupure
function renderMarquee() {
  const track = $('#marqueeTrack');
  if (!track) return;
  const items = C.marquee || [];
  if (!items.length) {
    track.parentElement.classList.add('is-hidden');
    return;
  }
  const once = items.map((t) => `<span>${esc(t)}</span><i aria-hidden="true"></i>`).join('');
  track.innerHTML = once + once;
}

// Nuage de mots : chaque mot a sa taille, sa couleur et sa vitesse
function renderWords() {
  const cloud = $('#wordsCloud');
  if (!cloud) return;
  const colors = ['#5B3F94', '#9677D1', '#C9A227', '#7A5CC0', '#B08D1E', '#3B2A5C'];
  cloud.innerHTML = (C.words || []).map((w, i) => `
    <span class="word reveal" style="--wc:${colors[i % colors.length]};--wd:${(i * 0.37 % 3 + 3).toFixed(2)}s;--wr:${i % 2 ? -4 : 3}deg">${esc(w)}</span>`
  ).join('');
}

function renderAboutBullets() {
  const ul = $('#aboutBullets');
  if (!ul) return;
  (C.about?.bullets || []).forEach((b) => {
    const li = document.createElement('li');
    li.textContent = b;
    ul.appendChild(li);
  });
}

function renderPartners() {
  const el = $('#partnersList');
  if (!el) return;
  el.innerHTML = (C.partners || []).map((p) => `<span class="partner-pill">${esc(p)}</span>`).join('');
}

function renderSchedule() {
  const list = $('#schedule');
  if (!list) return;
  (C.programme?.items || []).forEach((item) => {
    const li = document.createElement('li');
    li.className = 'tl-item reveal';
    li.innerHTML = `
      <span class="tl-time">${esc(item.time)}</span>
      <span class="tl-dot" aria-hidden="true"></span>
      <div class="tl-body"><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></div>`;
    list.appendChild(li);
  });
}

function photoMarkup(src, caption, emptyLabel) {
  return src
    ? `<img src="${esc(src)}" alt="${esc(caption || 'Photo')}" loading="lazy">`
    : `<div class="photo-empty"><span class="ico" aria-hidden="true">${ICONS.camera}</span><small>${esc(emptyLabel)}</small></div>`;
}

function renderPhotos() {
  const grid = $('#photoGrid');
  if (!grid) return;
  (C.photos || []).forEach((photo, i) => {
    const wrap = document.createElement('figure');
    wrap.className = 'reveal';
    wrap.innerHTML = `
      <div class="polaroid ${i % 2 ? 'tilt-r' : 'tilt-l'}">
        <div class="photo-frame">${photoMarkup(photo.src, photo.caption, 'Photo à ajouter')}</div>
        <figcaption>${esc(photo.caption || '')}</figcaption>
      </div>`;
    grid.appendChild(wrap);
  });
}

function renderStoryImage() {
  const frame = $('#storyFrame');
  if (!frame) return;
  frame.innerHTML = photoMarkup(get('story.image'), 'Photo', 'Ajoute une photo ici 📷');
}

// Vidéo : lien YouTube/Vimeo (iframe) ou fichier local (balise video)
function renderVideo() {
  const frame = $('#videoFrame');
  if (!frame) return;
  const embed = get('video.embedUrl');
  const src = get('video.src');
  const poster = get('video.poster');

  if (embed) {
    frame.innerHTML = `
      <div class="video-embed">
        <iframe src="${esc(embed)}" title="${esc(get('video.title') || 'Vidéo')}"
          loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe>
      </div>`;
  } else if (src) {
    frame.innerHTML = `
      <video class="video-player" controls playsinline preload="metadata"
        ${poster ? `poster="${esc(poster)}"` : ''}>
        <source src="${esc(src)}">
        Ton navigateur ne peut pas lire cette vidéo.
      </video>`;
  } else {
    frame.innerHTML = `
      <div class="video-placeholder">
        <span aria-hidden="true">🎬</span>
        <p>Vidéo à venir</p>
        <small>Ajoute un fichier dans public/assets/video/ ou un lien YouTube dans src/config.js</small>
      </div>`;
  }
}

function setupMapLink() {
  const link = $('#mapLink');
  if (!link) return;
  const url = get('event.mapUrl');
  if (url) {
    link.href = url;
  } else {
    link.classList.add('is-hidden');
  }
}

// ---------- Compte à rebours ----------
function setupCountdown() {
  const box = $('#countdownBox');
  const done = $('#cdDone');
  const target = new Date(C.targetDate).getTime();

  if (!box || isNaN(target)) {
    if (box) box.classList.add('is-hidden');
    return;
  }

  const els = {
    days: $('#cdDays'),
    hours: $('#cdHours'),
    minutes: $('#cdMinutes'),
    seconds: $('#cdSeconds')
  };

  let timer = null;

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      box.classList.add('is-hidden');
      done.classList.remove('is-hidden');
      if (timer) clearInterval(timer);
      return;
    }
    els.days.textContent = String(Math.floor(diff / 86400000));
    els.hours.textContent = pad(Math.floor(diff / 3600000) % 24);
    els.minutes.textContent = pad(Math.floor(diff / 60000) % 60);
    els.seconds.textContent = pad(Math.floor(diff / 1000) % 60);
  }

  tick();
  timer = setInterval(tick, 1000);
}

// ---------- Formulaire ----------
// Pour recevoir les réponses : renseigne form.endpoint dans src/config.js (ex. Formspree)
function setupForm() {
  const form = $('#rsvpForm');
  if (!form) return;
  const errorEl = $('#formError');
  const thanks = $('#formThanks');
  const submit = $('#formSubmit');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorEl.textContent = '';

    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.nom || !data.nom.trim()) {
      errorEl.textContent = "Dis-nous ton prénom et nom, s'il te plaît 🙏";
      form.elements.nom.focus();
      return;
    }

    const payload = {
      nom: data.nom.trim(),
      telephone: (data.telephone || '').trim(),
      presence: data.presence,
      personnes: data.personnes,
      message: (data.message || '').trim(),
      envoye_le: new Date().toISOString()
    };

    const endpoint = get('form.endpoint');
    submit.disabled = true;
    submit.textContent = 'Envoi...';

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
      }
      form.classList.add('is-hidden');
      thanks.textContent = payload.presence === 'oui'
        ? `Super, merci ${payload.nom} ! On a hâte de te voir 💕🎈`
        : `Merci ${payload.nom}, on pensera à toi 😢💌`;
      if (payload.presence === 'oui') burst(40);
    } catch (err) {
      errorEl.textContent = "Oups, l'envoi n'a pas marché. Réessaie dans un instant.";
      submit.disabled = false;
      submit.textContent = 'Envoyer 💌';
    }
  });
}

// ---------- Nouvelles sections : menu, activités, couleurs ----------
function renderImageCards(containerId, items) {
  const el = $(containerId);
  if (!el || !Array.isArray(items)) return;
  el.innerHTML = items.map((item) => `
    <article class="card reveal">
      <div class="card-visual"><img src="${esc(item.image)}" alt="" loading="lazy"></div>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.text)}</p>
    </article>`).join('');
}

function renderMenu() {
  renderImageCards('#menuList', C.menu?.items);
}

function renderActivities() {
  renderImageCards('#activitiesList', C.activities?.items);
}

function renderSwatches() {
  const el = $('#swatches');
  if (!el) return;
  el.innerHTML = (C.dresscode?.colors || []).map((c) => `
    <div class="swatch reveal">
      <span class="swatch-dot" style="background:${esc(c.hex)}"></span>
      <span class="swatch-name">${esc(c.name)}</span>
    </div>`).join('');
}

// ---------- Icônes : remplace les [data-icon] par le SVG correspondant ----------
function injectIcons() {
  $$('[data-icon]').forEach((el) => {
    const svg = ICONS[el.dataset.icon];
    if (svg) el.innerHTML = svg;
  });
}

// ---------- Curseur personnalisé (souris / trackpad uniquement) ----------
function setupCursor() {
  const isFine = window.matchMedia('(pointer: fine)').matches;
  if (!isFine || reduceMotion) return;

  const dot = $('#cursorDot');
  const ring = $('#cursorRing');
  if (!dot || !ring) return;

  document.body.classList.add('has-cursor');

  let mx = -100, my = -100;   // position réelle
  let rx = -100, ry = -100;   // position de l'anneau (suit avec un léger retard)

  window.addEventListener('pointermove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    dot.classList.remove('is-hidden');
    ring.classList.remove('is-hidden');
  });

  (function follow() {
    rx += (mx - rx) * 0.2;
    ry += (my - ry) * 0.2;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    requestAnimationFrame(follow);
  })();

  const HOVER = 'a, button, .btn, .card, .info-card, .radio-pill, .envelope, .polaroid, .swatch, .music-btn, label';
  document.addEventListener('pointerover', (e) => {
    const target = e.target.closest(HOVER);
    ring.classList.toggle('is-hover', !!target);
    dot.classList.toggle('is-hover', !!target);
  });

  // Dans un champ de saisie, on garde le curseur texte natif et on cache le cercle
  document.addEventListener('pointerover', (e) => {
    const isField = e.target.closest('input, textarea, select');
    ring.classList.toggle('is-field', !!isField);
    dot.classList.toggle('is-field', !!isField);
  });

  document.addEventListener('pointerout', (e) => {
    if (!e.relatedTarget) {
      dot.classList.add('is-hidden');
      ring.classList.add('is-hidden');
    }
  });
}

// ---------- Dossier de l'agent : photo et évaluation ----------
function renderAgent() {
  const frame = $('#agentPhoto');
  if (frame) frame.innerHTML = photoMarkup(get('agent.photo'), get('agent.name'), 'Photo de l\'agent');

  const stats = $('#agentStats');
  if (!stats) return;
  const rows = (C.agentStats || []).map((s) => {
    const value = Math.max(0, Math.min(100, Number(s.value) || 0));
    return `
      <div class="stat-row">
        <div class="stat-head"><span>${esc(s.label)}</span><span class="stat-pct">${value}%</span></div>
        <div class="stat-bar"><span class="bar-fill" style="--v:${value}%"></span></div>
      </div>`;
  }).join('');
  stats.innerHTML = `<h3 class="stats-title">Évaluation de l'agent</h3>${rows}`;
}

// ---------- Avis de l'agent (citations) ----------
function renderQuotes() {
  const el = $('#quotesList');
  if (!el) return;
  el.innerHTML = (C.quotes?.items || []).map((q) => `
    <blockquote class="quote-card reveal">${esc(q)}</blockquote>`).join('');
}

// ---------- Test d'agent (mini-jeu) ----------
function setupQuiz() {
  const wrap = $('#quizOptions');
  const feedback = $('#quizFeedback');
  if (!wrap || !feedback) return;

  const options = C.quiz?.options || [];
  wrap.innerHTML = options.map((o, i) =>
    `<button type="button" class="quiz-btn" data-i="${i}">${esc(o.label)}</button>`).join('');

  let solved = false;
  wrap.addEventListener('click', (event) => {
    const btn = event.target.closest('.quiz-btn');
    if (!btn || solved) return;
    const option = options[Number(btn.dataset.i)];

    if (option.correct) {
      solved = true;
      btn.classList.add('is-correct');
      feedback.textContent = C.quiz.success;
      if (C.quiz.reward) {
        const reward = document.createElement('span');
        reward.className = 'quiz-reward';
        reward.textContent = C.quiz.reward;
        feedback.appendChild(reward);
      }
      feedback.classList.add('is-ok');
      wrap.querySelectorAll('.quiz-btn').forEach((b) => { b.disabled = true; });
      burst(70);
    } else {
      btn.classList.add('is-wrong');
      feedback.textContent = C.quiz.wrong;
      if (!reduceMotion) {
        btn.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
          { duration: 280 }
        );
      }
    }
  });
}

// ---------- Énigme royale (saisie libre) ----------
function normalizeAnswer(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

function setupRiddle() {
  const form = $('#riddleForm');
  const input = $('#riddleInput');
  const feedback = $('#riddleFeedback');
  const hint = $('#riddleHint');
  const submit = $('#riddleSubmit');
  if (!form || !input) return;

  const accepted = (C.riddle?.answers || []).map(normalizeAnswer);
  let attempts = 0;
  let solved = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (solved) return;
    const guess = normalizeAnswer(input.value);
    if (!guess) {
      input.focus();
      return;
    }

    if (accepted.includes(guess)) {
      solved = true;
      input.disabled = true;
      submit.disabled = true;
      hint.classList.add('is-hidden');
      feedback.textContent = C.riddle.success;
      feedback.classList.add('is-ok');
      const reward = document.createElement('span');
      reward.className = 'quiz-reward';
      reward.textContent = C.riddle.reward;
      feedback.appendChild(reward);
      burst(70);
      return;
    }

    attempts += 1;
    feedback.textContent = C.riddle.wrong;
    if (attempts >= 2) {
      hint.textContent = C.riddle.hint;
      hint.classList.remove('is-hidden');
    }
    if (!reduceMotion) {
      input.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
        { duration: 280 }
      );
    }
    input.select();
  });
}

// ---------- Moments : trois photos isolées ----------
function renderMoments() {
  const el = $('#momentsList');
  if (!el) return;
  el.innerHTML = (C.moments?.items || []).map((m, i) => `
    <figure class="moment reveal">
      <div class="polaroid ${i % 2 ? 'tilt-r' : 'tilt-l'}">
        <div class="photo-frame">${photoMarkup(m.src, m.caption, 'Photo à ajouter')}</div>
        <figcaption>${esc(m.caption || '')}</figcaption>
      </div>
    </figure>`).join('');
}

// ---------- Animations : titre du hero, lettre par lettre ----------
function animateHeroTitle() {
  const el = $('.hero-title > span:first-child');
  if (!el || reduceMotion) return;
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.innerHTML = [...text].map((ch, i) =>
    `<span class="letter-anim" aria-hidden="true" style="animation-delay:${(0.2 + i * 0.09).toFixed(2)}s">${esc(ch)}</span>`
  ).join('');
}

// ---------- Animations : relief qui suit la souris sur les cartes ----------
function setupTilt() {
  if (reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
  $$('.card, .info-card, .quote-card, .game-card').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-3px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

// ---------- Jeu 1 : attrape les couronnes ----------
function setupCatchGame() {
  const startBtn = $('#catchStart');
  const arena = $('#catchArena');
  if (!startBtn || !arena) return;
  const scoreEl = $('#catchScore');
  const timeEl = $('#catchTime');
  const msg = $('#catchMsg');
  const cfg = C.games?.catch || { target: 10, duration: 20, win: '', lose: '' };

  let score = 0;
  let left = cfg.duration;
  let running = false;
  let spawnTimer = null;
  let clockTimer = null;

  function clearFalling() {
    arena.querySelectorAll('.falling-crown').forEach((n) => n.remove());
  }

  function finish(won) {
    running = false;
    clearInterval(spawnTimer);
    clearInterval(clockTimer);
    clearFalling();
    msg.textContent = won ? cfg.win : cfg.lose.replace('{score}', score);
    startBtn.disabled = false;
    startBtn.textContent = 'Rejouer';
    if (won) burst(70);
  }

  function spawnCrown() {
    const crown = document.createElement('button');
    crown.type = 'button';
    crown.className = 'falling-crown';
    crown.setAttribute('aria-label', 'Attraper la couronne');
    crown.innerHTML = ICONS.crown;
    crown.style.left = rand(4, 84) + '%';
    crown.style.animationDuration = rand(2.4, 3.6).toFixed(2) + 's';
    crown.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (!running) return;
      score += 1;
      scoreEl.textContent = score;
      crown.remove();
      if (score >= cfg.target) finish(true);
    });
    crown.addEventListener('animationend', () => crown.remove());
    arena.appendChild(crown);
  }

  startBtn.addEventListener('click', () => {
    if (running) return;
    running = true;
    score = 0;
    left = cfg.duration;
    scoreEl.textContent = '0';
    timeEl.textContent = String(left);
    clearFalling();
    msg.textContent = '';
    startBtn.disabled = true;
    startBtn.textContent = 'En cours...';
    spawnTimer = setInterval(spawnCrown, 650);
    clockTimer = setInterval(() => {
      left -= 1;
      timeEl.textContent = String(Math.max(left, 0));
      if (left <= 0) finish(score >= cfg.target);
    }, 1000);
  });
}

// ---------- Jeu 2 : mémoire royale ----------
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function setupMemoryGame() {
  const grid = $('#memoryGrid');
  if (!grid) return;
  const movesEl = $('#memoryMoves');
  const msg = $('#memoryMsg');
  const resetBtn = $('#memoryReset');
  const symbols = ['cake', 'gift', 'crown', 'moon', 'heart', 'sparkle', 'target', 'smile'];

  let first = null;
  let lock = false;
  let moves = 0;
  let matched = 0;

  function build() {
    const deck = shuffleArray([...symbols, ...symbols]);
    grid.innerHTML = deck.map((key) => `
      <button type="button" class="mem-card" data-k="${key}" aria-label="Carte cachée">
        <span class="mem-face mem-back">✦</span>
        <span class="mem-face mem-front">${ICONS[key]}</span>
      </button>`).join('');
    first = null;
    lock = false;
    moves = 0;
    matched = 0;
    movesEl.textContent = '0';
    msg.textContent = '';
  }

  grid.addEventListener('click', (event) => {
    const card = event.target.closest('.mem-card');
    if (!card || lock) return;
    if (card.classList.contains('is-open') || card.classList.contains('is-matched')) return;

    card.classList.add('is-open');
    if (!first) {
      first = card;
      return;
    }

    moves += 1;
    movesEl.textContent = String(moves);
    lock = true;

    if (first.dataset.k === card.dataset.k) {
      first.classList.add('is-matched');
      card.classList.add('is-matched');
      first = null;
      lock = false;
      matched += 1;
      if (matched === symbols.length) {
        showReward(msg, C.games?.memory?.win || 'Mémoire royale parfaite !');
        burst(70);
      }
    } else {
      const previous = first;
      setTimeout(() => {
        previous.classList.remove('is-open');
        card.classList.remove('is-open');
        first = null;
        lock = false;
      }, 800);
    }
  });

  resetBtn.addEventListener('click', build);
  build();
}

// ---------- Jeu 3 : le coffre secret (trois molettes) ----------
function setupSafeGame() {
  const wrap = $('#safeDials');
  const openBtn = $('#safeOpen');
  const msg = $('#safeMsg');
  if (!wrap || !openBtn) return;
  const cfg = C.games?.safe || { code: '000', win: '', fail: '' };
  const values = [0, 0, 0];

  wrap.innerHTML = values.map((v, i) => `
    <div class="dial" data-i="${i}">
      <button type="button" class="dial-btn" data-dir="1" aria-label="Chiffre suivant">${ICONS['chevron-down']}</button>
      <span class="dial-val">${v}</span>
      <button type="button" class="dial-btn" data-dir="-1" aria-label="Chiffre précédent">${ICONS['chevron-down']}</button>
    </div>`).join('');

  wrap.addEventListener('click', (event) => {
    const btn = event.target.closest('.dial-btn');
    if (!btn) return;
    const i = Number(btn.closest('.dial').dataset.i);
    values[i] = (values[i] + Number(btn.dataset.dir) + 10) % 10;
    wrap.querySelector(`.dial[data-i="${i}"] .dial-val`).textContent = String(values[i]);
    msg.textContent = '';
  });

  openBtn.addEventListener('click', () => {
    if (openBtn.disabled) return;
    if (values.join('') === String(cfg.code)) {
      showReward(msg, cfg.win);
      openBtn.disabled = true;
      wrap.querySelectorAll('.dial-btn').forEach((b) => { b.disabled = true; });
      burst(70);
    } else {
      msg.textContent = cfg.fail;
      if (!reduceMotion) {
        wrap.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(8px)' }, { transform: 'translateX(0)' }],
          { duration: 300 }
        );
      }
    }
  });
}

// ---------- Jeu 4 : les boîtes cadeaux (un présent par boîte) ----------
function setupGiftGame() {
  const grid = $('#giftGrid');
  const msg = $('#giftMsg');
  const resetBtn = $('#giftReset');
  if (!grid) return;
  const prizes = C.games?.gifts?.prizes || [];

  let picked = false;

  function build() {
    picked = false;
    msg.textContent = '';
    const order = shuffleArray(prizes.map((_, i) => i));
    grid.innerHTML = prizes.map((_, i) => `
      <button type="button" class="gift-box" data-p="${order[i]}" aria-label="Boîte cadeau ${i + 1}">
        <span class="gift-lid">${ICONS.gift}</span>
        <span class="gift-num">${i + 1}</span>
      </button>`).join('');
  }

  grid.addEventListener('click', (event) => {
    const box = event.target.closest('.gift-box');
    if (!box || picked) return;
    picked = true;
    box.classList.add('is-open');
    msg.textContent = prizes[Number(box.dataset.p)];
    grid.querySelectorAll('.gift-box').forEach((b) => {
      if (b !== box) b.disabled = true;
    });
    burst(40);
  });

  resetBtn.addEventListener('click', build);
  build();
}

// ---------- Récompense : message doux tiré au hasard après chaque victoire ----------
function showReward(el, text) {
  el.textContent = text;
  const reward = document.createElement('span');
  reward.className = 'quiz-reward';
  reward.textContent = pick(C.rewards || ['Bravo !']);
  el.appendChild(reward);
}

// ---------- Initialisation ----------
bindTexts();
injectIcons();
createFloaters();
renderMarquee();
renderAgent();
renderQuotes();
setupGate();
renderWords();
renderAboutBullets();
renderVideo();
renderStoryImage();
renderSchedule();
renderMenu();
renderActivities();
renderSwatches();
renderFeatures();
renderPhotos();
renderMoments();
renderPartners();
setupMapLink();
setupCountdown();
setupMusic();
setupForm();
animateHeroTitle();
setupPuzzle();
setupMemoryGame();
setupTilt();
setupSafeGame();
setupCursor();
$('#envelope').addEventListener('click', openInvitation);
