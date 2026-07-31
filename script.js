/* ============================================================
   SCRIPT — scene engine + all interactions.
   You shouldn't need to edit this file; edit config.js instead.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Populate content from CONFIG ---------------- */
  document.getElementById('introTitle').innerHTML =
    `Happy <span class="accent">${CONFIG.herName}'s</span> Day`;

  const heroYou = document.getElementById('heroYou');
  const heroHer = document.getElementById('heroHer');
  const heroMerged = document.getElementById('heroMerged');
  heroYou.src = CONFIG.hero.photoYou;
  heroHer.src = CONFIG.hero.photoHer;
  heroMerged.src = CONFIG.hero.photoMerged;
  document.getElementById('heroCaption').textContent = CONFIG.hero.caption;

  const polaroidRow = document.getElementById('polaroidRow');
  CONFIG.polaroids.forEach(p => {
    const el = document.createElement('div');
    el.className = 'polaroid';
    el.innerHTML = `<img src="${p.src}" alt=""><div class="p-cap">${p.caption}</div>`;
    el.addEventListener('click', e => e.stopPropagation());
    attachLongPress(el);
    polaroidRow.appendChild(el);
  });

  const thenNowRow = document.getElementById('thenNowRow');
  thenNowRow.innerHTML = `
    <div class="tn-card"><img src="${CONFIG.thenNow.then.src}" alt=""><p>${CONFIG.thenNow.then.caption}</p></div>
    <div class="tn-divider">→</div>
    <div class="tn-card"><img src="${CONFIG.thenNow.now.src}" alt=""><p>${CONFIG.thenNow.now.caption}</p></div>
  `;
  thenNowRow.addEventListener('click', e => e.stopPropagation());

  const masonryRow = document.getElementById('masonryRow');
  CONFIG.collage.forEach(c => {
    const img = document.createElement('img');
    img.src = c.src; img.alt = c.caption || '';
    img.addEventListener('click', e => e.stopPropagation());
    attachLongPress(img);
    masonryRow.appendChild(img);
  });

  document.getElementById('letterText').dataset.full = CONFIG.letter;

  const endingLines = document.getElementById('endingLines');
  CONFIG.endingLines.forEach(line => {
    const p = document.createElement('p');
    p.className = 'end-line';
    p.textContent = line;
    endingLines.appendChild(p);
  });

  /* placeholder fallback: if an image 404s, show a soft gradient card
     with the expected filename so it's obvious what to replace */
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function onErr(){
      this.removeEventListener('error', onErr);
      const label = document.createElement('div');
      label.style.cssText = `
        width:100%; height:100%; min-height:100px; display:flex; align-items:center; justify-content:center;
        background:linear-gradient(140deg,#F1D9DC,#F3EDE4); color:#8a7078; font-family:${getComputedStyle(document.body).fontFamily};
        font-size:.72rem; text-align:center; padding:8px; border-radius:inherit;`;
      label.textContent = 'Add photo: ' + this.getAttribute('src').split('/').pop();
      this.replaceWith(label);
    });
  });

  /* ---------------- Scene engine ---------------- */
  const scenes = Array.from(document.querySelectorAll('.scene'));
  let current = 0;
  let locked = false; // true while a scene needs its own gesture (letter, questions) before advancing by tap
  const progress = document.getElementById('progress');
  scenes.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' on' : '');
    progress.appendChild(dot);
  });
  const dots = Array.from(progress.children);

  function revealChildren(scene){
    scene.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 150 + i * 140);
    });
  }

  function goToScene(index){
    if (index < 0 || index >= scenes.length || index === current) return;
    const outgoing = scenes[current];
    const incoming = scenes[index];
    outgoing.classList.add('leaving');
    outgoing.classList.remove('active');
    setTimeout(() => outgoing.classList.remove('leaving'), 700);

    incoming.classList.add('active');
    revealChildren(incoming);
    dots.forEach((d, i) => d.classList.toggle('on', i === index));
    current = index;
    handleSceneEnter(incoming.dataset.scene);
  }

  function handleSceneEnter(name){
    locked = false;
    if (name === 'hero'){
      locked = true;
      setTimeout(() => scenes[current].classList.add('merge'), 900);
      setTimeout(() => { locked = false; }, 2400);
    }
    if (name === 'letter') locked = true; // must open envelope first
    if (name === 'questions') locked = true; // must submit or explicitly move on
    if (name === 'ending'){
      const heart = document.getElementById('finalHeart');
      setTimeout(() => heart.classList.add('in'), 1200);
    }
  }

  function advance(){
    if (locked) return;
    goToScene(current + 1);
  }

  document.getElementById('stage').addEventListener('click', (e) => {
    advance();
  });

  revealChildren(scenes[0]);

  /* ---------------- Wax seal / letter ---------------- */
  const waxSeal = document.getElementById('waxSeal');
  const envelope = document.getElementById('envelope');
  const envelopeWrap = document.getElementById('envelopeWrap');
  const letterPaper = document.getElementById('letterPaper');
  const letterTextEl = document.getElementById('letterText');
  const letterContinue = document.getElementById('letterContinue');

  waxSeal.addEventListener('click', (e) => {
    e.stopPropagation();
    waxSeal.classList.add('cracked');
    envelope.classList.add('open');
    setTimeout(() => {
      envelopeWrap.classList.add('hide-envelope');
      letterPaper.classList.add('open');
      typewriter(letterTextEl, CONFIG.letter, () => {
        letterContinue.classList.add('show');
      });
    }, 500);
  });

  function typewriter(el, text, onDone){
    el.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    let i = 0;
    const speed = 18; // ms per character
    function tick(){
      if (i <= text.length){
        el.textContent = text.slice(0, i);
        el.appendChild(cursor);
        i++;
        setTimeout(tick, speed);
      } else {
        if (onDone) onDone();
      }
    }
    tick();
  }

  letterContinue.addEventListener('click', (e) => {
    e.stopPropagation();
    locked = false;
    goToScene(current + 1);
  });
  letterPaper.addEventListener('click', e => e.stopPropagation());

  /* ---------------- Questions / Formspree ---------------- */
  const qForm = document.getElementById('qForm');
  const smileAnswer = document.getElementById('smileAnswer');
  const qStatus = document.getElementById('qStatus');
  qForm.addEventListener('click', e => e.stopPropagation());

  document.querySelectorAll('.pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      smileAnswer.value = btn.dataset.value;
    });
  });

  qForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const endpoint = CONFIG.formspreeEndpoint;
    qStatus.textContent = 'Sending...';
    const submitBtn = document.getElementById('qSubmit');
    submitBtn.disabled = true;

    if (!endpoint || endpoint.includes('PASTE_YOUR')){
      qStatus.textContent = "Formspree isn't set up yet — add your endpoint in config.js.";
      submitBtn.disabled = false;
      return;
    }

    const formData = new FormData(qForm);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok){
        qStatus.textContent = 'Sent ❤️';
        locked = false;
        setTimeout(() => goToScene(current + 1), 900);
      } else {
        qStatus.textContent = 'Something went wrong — try again?';
        submitBtn.disabled = false;
      }
    } catch (err){
      qStatus.textContent = 'Something went wrong — try again?';
      submitBtn.disabled = false;
    }
  });

  /* ---------------- Ending: staggered lines + heart burst ---------------- */
  function playEndingLines(){
    document.querySelectorAll('.end-line').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 300 + i * 900);
    });
  }
  let endingPlayed = false;
  const stageObserver = new MutationObserver(muts => {
    muts.forEach(m => {
      const el = m.target;
      if (el.classList.contains('active') && el.dataset.scene === 'ending' && !endingPlayed){
        endingPlayed = true;
        setTimeout(playEndingLines, 200);
      }
    });
  });
  scenes.forEach(s => stageObserver.observe(s, { attributes:true, attributeFilter:['class'] }));

  const finalHeart = document.getElementById('finalHeart');
  let heartClicks = 0;
  let heartClickTimer = null;
  finalHeart.addEventListener('click', (e) => {
    e.stopPropagation();
    heartClicks++;
    if (heartClickTimer) clearTimeout(heartClickTimer);
    heartClickTimer = setTimeout(() => { heartClicks = 0; }, 400);
    if (heartClicks >= 2){
      heartClicks = 0;
      showEggToast(CONFIG.hiddenDoubleClickMessage);
    }
    burstHearts();
  });

  /* ---------------- Heart burst canvas ---------------- */
  const burstCanvas = document.getElementById('heartBurst');
  const bctx = burstCanvas.getContext('2d');
  function sizeBurstCanvas(){
    burstCanvas.width = window.innerWidth;
    burstCanvas.height = window.innerHeight;
  }
  sizeBurstCanvas();
  window.addEventListener('resize', sizeBurstCanvas);

  function burstHearts(){
    const rect = finalHeart.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const particles = [];
    const count = 140;
    for (let i = 0; i < count; i++){
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 6 + Math.random() * 10,
        life: 1,
        decay: 0.006 + Math.random() * 0.01,
        hue: Math.random() > .5 ? '#C17B84' : '#C6A67B',
        rot: Math.random() * Math.PI
      });
    }
    let frame = 0;
    function drawHeart(x, y, size, color, rot){
      bctx.save();
      bctx.translate(x, y);
      bctx.rotate(rot);
      bctx.scale(size / 20, size / 20);
      bctx.fillStyle = color;
      bctx.beginPath();
      bctx.moveTo(0, 6);
      bctx.bezierCurveTo(0, 2, -6, -6, -10, -2);
      bctx.bezierCurveTo(-14, 4, -6, 10, 0, 16);
      bctx.bezierCurveTo(6, 10, 14, 4, 10, -2);
      bctx.bezierCurveTo(6, -6, 0, 2, 0, 6);
      bctx.closePath();
      bctx.fill();
      bctx.restore();
    }
    function step(){
      frame++;
      bctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
      let alive = false;
      particles.forEach(p => {
        if (p.life <= 0) return;
        alive = true;
        p.vy += 0.06; // gravity
        p.x += p.vx; p.y += p.vy;
        p.life -= p.decay;
        bctx.globalAlpha = Math.max(p.life, 0);
        drawHeart(p.x, p.y, p.size * p.life, p.hue, p.rot + frame * 0.02);
      });
      bctx.globalAlpha = 1;
      if (alive) requestAnimationFrame(step);
      else bctx.clearRect(0, 0, burstCanvas.width, burstCanvas.height);
    }
    step();
  }

  /* ---------------- Long-press easter egg on photos ---------------- */
  function attachLongPress(el){
    let timer = null;
    const start = (e) => {
      timer = setTimeout(() => {
        el.classList.add('wiggle');
        showEggToast(CONFIG.longPressMessage);
        setTimeout(() => el.classList.remove('wiggle'), 650);
      }, 550);
    };
    const cancel = () => { if (timer) clearTimeout(timer); };
    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start, { passive:true });
    ['mouseup','mouseleave','touchend','touchcancel'].forEach(ev => el.addEventListener(ev, cancel));
  }

  function showEggToast(msg){
    let toast = document.querySelector('.egg-toast');
    if (!toast){
      toast = document.createElement('div');
      toast.className = 'egg-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showEggToast._t);
    showEggToast._t = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  /* ---------------- Music player ---------------- */
  const audio = document.getElementById('bgMusic');
  audio.src = CONFIG.musicSrc;
  const playPause = document.getElementById('playPause');
  const iconPlay = document.getElementById('iconPlay');
  const iconPause = document.getElementById('iconPause');
  const volume = document.getElementById('volume');
  audio.volume = 0.5;

  playPause.addEventListener('click', (e) => {
    e.stopPropagation();
    if (audio.paused){
      audio.play().catch(() => {});
      iconPlay.style.display = 'none';
      iconPause.style.display = '';
    } else {
      audio.pause();
      iconPlay.style.display = '';
      iconPause.style.display = 'none';
    }
  });
  volume.addEventListener('input', (e) => {
    e.stopPropagation();
    audio.volume = parseFloat(volume.value);
  });
  document.getElementById('player').addEventListener('click', e => e.stopPropagation());

  /* ---------------- Ambient particle field ---------------- */
  const pCanvas = document.getElementById('particles');
  const pctx = pCanvas.getContext('2d');
  function sizeParticleCanvas(){
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
  }
  sizeParticleCanvas();
  window.addEventListener('resize', sizeParticleCanvas);

  const dots2 = Array.from({ length: 34 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 1 + Math.random() * 2.2,
    speed: 0.15 + Math.random() * 0.35,
    drift: (Math.random() - 0.5) * 0.3,
    alpha: 0.15 + Math.random() * 0.35
  }));

  function animateParticles(){
    pctx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    dots2.forEach(d => {
      d.y -= d.speed;
      d.x += d.drift;
      if (d.y < -10){ d.y = pCanvas.height + 10; d.x = Math.random() * pCanvas.width; }
      pctx.beginPath();
      pctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      pctx.fillStyle = `rgba(198,166,123,${d.alpha})`;
      pctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ---------------- Keyboard support ---------------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') advance();
    if (e.key === 'ArrowLeft' && !locked) goToScene(current - 1);
  });

});
