import { createField, matchingAt, projectNode, connectionControl, INTRO_DURATION, PLAYBACK_DURATION, type Field } from '../lib/allocation-field';

const scene = document.querySelector<HTMLElement>('[data-allocation-film]');
const canvas = scene?.querySelector<HTMLCanvasElement>('canvas');
const hero = scene?.closest<HTMLElement>('.home-hero');

if (scene && canvas && hero) {
  const context = canvas.getContext('2d', { alpha: true });
  if (context) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listeners = new AbortController();
    let field: Field = createField();
    let width = 0;
    let height = 0;
    let elapsed = reduced.matches ? INTRO_DURATION : 0;
    let completed = reduced.matches;
    let inView = false;
    let hasEntered = false;
    let replayOnEnter = false;
    let cycle = 0;
    let lastTime = 0;
    let lastPaint = 0;
    let animationFrame = 0;

    const updateState = () => {
      scene.dataset.motionState = completed ? 'complete' : inView ? 'playing' : 'waiting';
      scene.dataset.motionCycle = String(cycle);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const points = field.nodes.map(node => projectNode(node, elapsed, width, height));
      const reveal = Math.max(0, Math.min(1, (elapsed - 900) / 1800));

      // A fine plane of feasible connections is visible behind the selected matching.
      context.lineWidth = .8;
      for (const edge of field.possible) {
        const a = points[edge.a];
        const b = points[edge.b];
        const c = connectionControl(a, b, edge);
        const depthFade = Math.max(.12, Math.min(.7, .52 - (a.depth + b.depth) / 2300));
        context.strokeStyle = `rgba(161,151,216,${depthFade * reveal})`;
        context.beginPath(); context.moveTo(a.x, a.y); context.quadraticCurveTo(c.x, c.y, b.x, b.y); context.stroke();
      }

      // Traversing points introduce motion without adding impossible graph edges.
      for (let i = 0; i < field.possible.length; i += 13) {
        const edge = field.possible[i];
        const a = points[edge.a];
        const b = points[edge.b];
        const travel = ((elapsed / 1900 + i * .047) % 1);
        const c = connectionControl(a, b, edge);
        const t = travel, u = 1 - t;
        const pulse = Math.sin(travel * Math.PI) * reveal * .65;
        if (elapsed < INTRO_DURATION - 1200) {
          context.fillStyle = `rgba(199,189,245,${pulse})`;
          context.beginPath(); context.arc(u*u*a.x + 2*u*t*c.x + t*t*b.x, u*u*a.y + 2*u*t*c.y + t*t*b.y, 1.5, 0, Math.PI * 2); context.fill();
        }
      }

      const matching = matchingAt(field, elapsed);
      for (const edge of matching) {
        const a = points[edge.a];
        const b = points[edge.b];
        const fade = Math.max(.22, Math.min(.95, .73 - (a.depth + b.depth) / 2500));
        const c = connectionControl(a, b, edge);
        context.strokeStyle = `rgba(0,245,155,${edge.opacity * fade})`;
        context.lineWidth = Math.max(1.2, (a.scale + b.scale) * .9);
        context.beginPath(); context.moveTo(a.x, a.y); context.quadraticCurveTo(c.x, c.y, b.x, b.y); context.stroke();
      }

      for (const node of field.nodes) {
        const point = points[node.id];
        const alpha = Math.max(.25, Math.min(.9, .72 - point.depth / 1200));
        const radius = Math.max(1.4, 2.1 * point.scale);
        context.beginPath(); context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fillStyle = node.kind ? `rgba(223,217,249,${alpha})` : `rgba(0,245,155,${alpha})`;
        context.fill();
      }
    };

    const stop = () => { cancelAnimationFrame(animationFrame); animationFrame = 0; lastTime = 0; };
    const tick = (now: number) => {
      animationFrame = 0;
      if (reduced.matches || completed || !inView || document.hidden) { lastTime = 0; return; }
      if (!lastTime) lastTime = now;
      elapsed = Math.min(INTRO_DURATION, elapsed + (now - lastTime) * INTRO_DURATION / PLAYBACK_DURATION);
      lastTime = now;
      if (now - lastPaint >= 1000 / 30 || elapsed >= INTRO_DURATION) {
        draw(); lastPaint = now;
      }
      if (elapsed >= INTRO_DURATION) { completed = true; updateState(); return; }
      animationFrame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!animationFrame && !reduced.matches && !completed && inView && !document.hidden) animationFrame = requestAnimationFrame(tick);
    };
    const replay = () => {
      stop();
      elapsed = reduced.matches ? INTRO_DURATION : 0;
      completed = reduced.matches;
      if (!reduced.matches) cycle++;
      updateState(); draw(); start();
    };

    const resize = () => {
      const bounds = scene.getBoundingClientRect();
      width = bounds.width; height = bounds.height;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      field = width < 640 ? createField(10, 6) : createField(14, 8);
      draw();
    };

    document.addEventListener('visibilitychange', () => { stop(); start(); }, { signal: listeners.signal });
    reduced.addEventListener('change', event => {
      if (event.matches) { stop(); elapsed = INTRO_DURATION; completed = true; draw(); updateState(); }
      else if (inView) replay();
    }, { signal: listeners.signal });

    const intersection = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (!entry.isIntersecting) {
        inView = false; replayOnEnter = hasEntered; stop(); updateState();
      } else if (entry.intersectionRatio >= .15 && !inView) {
        inView = true;
        if (!hasEntered || replayOnEnter) { replayOnEnter = false; replay(); }
        else start();
        hasEntered = true;
      }
    }, { threshold: [0, .15] });
    const resizeObserver = new ResizeObserver(resize);
    resize();
    scene.dataset.enhanced = 'true';
    updateState();
    resizeObserver.observe(scene);
    intersection.observe(hero);

    window.addEventListener('pageshow', event => { if (event.persisted && inView) replay(); }, { signal: listeners.signal });
    window.addEventListener('pagehide', event => {
      stop();
      if (!event.persisted) { listeners.abort(); intersection.disconnect(); resizeObserver.disconnect(); }
    }, { signal: listeners.signal });
  }
}
