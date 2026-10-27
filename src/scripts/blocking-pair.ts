import { phases, type Phase } from '../lib/blocking-pair';

const demo = document.querySelector<HTMLElement>('[data-blocking-demo]');
if (demo) {
  const buttons = demo.querySelectorAll<HTMLButtonElement>('[data-blocking-phase]');
  const caption = demo.querySelector<HTMLElement>('[data-blocking-caption]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timers: number[] = [];
  let inView = false;
  let manuallySelected = false;
  const stop = () => { timers.forEach(timer => window.clearTimeout(timer)); timers = []; };
  const show = (id: Phase) => {
    const phase = phases.find(item => item.id === id);
    if (!phase) return;
    demo.dataset.phase = id;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.blockingPhase === id)));
    if (caption) caption.textContent = phase.caption;
  };
  const play = () => {
    stop();
    if (manuallySelected) return;
    if (reduced.matches) { show('blocking'); return; }
    show('current');
    timers = [window.setTimeout(() => show('blocking'), 1450), window.setTimeout(() => show('resolved'), 3200)];
  };
  buttons.forEach(button => {
    button.disabled = false;
    button.addEventListener('click', () => {
      stop();
      manuallySelected = true;
      const id = button.dataset.blockingPhase as Phase;
      show(id);
    });
  });
  show(reduced.matches ? 'blocking' : 'current');
  const observer = new IntersectionObserver(entries => {
    const entry = entries[0];
    if (!entry.isIntersecting) { inView = false; stop(); }
    else if (entry.intersectionRatio >= .75 && !inView) { inView = true; play(); }
  }, { threshold: [0, .75] });
  observer.observe(demo.querySelector('.blocking-figure') ?? demo);
  reduced.addEventListener('change', () => { stop(); if (inView) play(); else show('blocking'); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else if (inView && !manuallySelected) show('blocking'); });
  window.addEventListener('pagehide', event => { stop(); if (!event.persisted) observer.disconnect(); });
}
