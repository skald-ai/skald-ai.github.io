// Skald AI lookbook: reveals, video player dialog, song tiles, process accordion, Telegram brief.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- staggered reveals: never leaves content hidden ----------
  document.querySelectorAll('[data-stagger]').forEach((group) => {
    [...group.children].forEach((el, i) => {
      if (el.matches('.row')) {
        [...el.children].forEach((fig, j) => { fig.setAttribute('data-reveal', ''); fig.style.setProperty('--i', j); });
      } else {
        el.setAttribute('data-reveal', '');
        el.style.setProperty('--i', i % 8);
      }
    });
  });
  const targets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach((el) => { if (!el.matches('.shutter')) io.observe(el); });
    // a shutter starts fully clipped, which Chromium's observer reads as invisible: watch its parent instead
    const sio = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) {
        e.target.querySelectorAll(':scope > .shutter[data-reveal]').forEach((s) => requestAnimationFrame(() => s.classList.add('is-in')));
        sio.unobserve(e.target);
      }
    }, { threshold: 0.05 });
    document.querySelectorAll('.shutter[data-reveal]').forEach((s) => sio.observe(s.parentElement));
    addEventListener('load', () => setTimeout(() => {
      targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in'); });
    }, 2500));
  } else {
    targets.forEach((el) => el.classList.add('is-in'));
  }

  // ---------- loops: play only while visible ----------
  const loops = document.querySelectorAll('video[autoplay]');
  if ('IntersectionObserver' in window) {
    const vio = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !reduce && !document.hidden) e.target.play().catch(() => {});
        else e.target.pause();
      }
    }, { threshold: 0.05 });
    loops.forEach((v) => vio.observe(v));
  }
  if (reduce) loops.forEach((v) => { v.removeAttribute('autoplay'); v.pause(); });

  // ---------- songs: one at a time ----------
  const audio = new Audio();
  audio.preload = 'none';
  let current = null;
  const songs = document.querySelectorAll('[data-song]');
  const capOf = (tile) => tile.querySelector('.cap');
  songs.forEach((tile) => { tile.dataset.cap = capOf(tile).innerHTML; tile.setAttribute('role', 'button'); tile.setAttribute('aria-pressed', 'false'); });
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`; // taste-skill-ignore: playback clock m:ss
  const reset = (tile) => {
    if (!tile) return;
    tile.classList.remove('is-playing');
    tile.setAttribute('aria-pressed', 'false');
    capOf(tile).innerHTML = tile.dataset.cap;
    tile.querySelector('.bar').style.transform = '';
  };
  songs.forEach((tile) => tile.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (current === tile && !audio.paused) { audio.pause(); reset(tile); return; }
    reset(current);
    if (current !== tile) audio.src = tile.dataset.song;
    current = tile;
    stopPlayer();
    audio.play().then(() => {
      tile.classList.add('is-playing');
      tile.setAttribute('aria-pressed', 'true');
    }).catch(() => { location.href = tile.dataset.song; });
  }));
  audio.addEventListener('timeupdate', () => {
    if (!current || !audio.duration) return;
    current.querySelector('.bar').style.transform = `scaleX(${audio.currentTime / audio.duration})`;
    capOf(current).innerHTML = `Играет отрывок · <span class="nums">${fmt(audio.currentTime)}</span> · нажмите, чтобы остановить`;
  });
  audio.addEventListener('ended', () => { reset(current); current = null; });

  // ---------- video player dialog ----------
  const dlg = document.getElementById('player');
  const vid = document.getElementById('player-video');
  const ttl = document.getElementById('player-title');
  function stopPlayer() { if (dlg.open) dlg.close(); }
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-play]');
    if (!btn) return;
    ev.preventDefault();
    if (!audio.paused) { audio.pause(); reset(current); }
    ttl.textContent = btn.dataset.title || '';
    vid.poster = btn.dataset.poster || '';
    vid.src = btn.dataset.play;
    if (typeof dlg.showModal === 'function') {
      dlg.showModal();
      vid.play().catch(() => {});
    } else {
      window.open(btn.dataset.play, '_blank', 'noopener');
    }
  });
  dlg.addEventListener('close', () => { vid.pause(); vid.removeAttribute('src'); vid.load(); });
  dlg.addEventListener('click', (ev) => {
    if (ev.target !== dlg) return;
    const r = dlg.getBoundingClientRect();
    const inside = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
    if (!inside) dlg.close();
  });

  // ---------- process accordion ----------
  const stages = document.querySelectorAll('.stage');
  stages.forEach((st) => st.querySelector('.stage-tab').addEventListener('click', () => {
    stages.forEach((s) => {
      const open = s === st;
      s.classList.toggle('is-open', open);
      s.querySelector('.stage-tab').setAttribute('aria-expanded', String(open));
    });
  }));

  // ---------- phone menu ----------
  const mbtn = document.querySelector('.t-menu');
  const mnav = document.getElementById('mnav');
  const setMenu = (open) => { mbtn.setAttribute('aria-expanded', String(open)); mnav.hidden = !open; };
  mbtn.addEventListener('click', () => setMenu(mnav.hidden));
  mnav.addEventListener('click', (ev) => { if (ev.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && !mnav.hidden) { setMenu(false); mbtn.focus(); } });

  // ---------- contact strip marquee ----------
  const strip = document.querySelector('.strip');
  if (strip && !reduce) {
    const track = strip.querySelector('.strip-track');
    [...track.children].forEach((n) => track.appendChild(n.cloneNode(true)));
    strip.classList.add('is-moving');
  }

  // ---------- brief to Telegram ----------
  const form = document.querySelector('.brief');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const what = form.querySelector('#fmt').value;
    const details = form.querySelector('#details').value.trim();
    const text = `Здравствуйте! Пишу с сайта Skald AI.\nНужно: ${what}.` + (details ? `\nПодробности: ${details}` : '');
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    const note = form.querySelector('[data-copied]');
    note.classList.add('is-flash');
    window.open(`https://t.me/Romheimr?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
})();
