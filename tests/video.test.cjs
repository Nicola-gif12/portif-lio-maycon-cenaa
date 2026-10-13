// Node built-ins only. Browser rendering and codec playback are separate checks.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const code = fs.readFileSync('assets/js/script.js', 'utf8');
function setup({ delayed = false, error = null, count = 1, hasAudio = true, lockedVolume = false } = {}) {
  let observe;
  const listeners = {};
  const preference = { matches: false, addEventListener: (k, f) => { listeners.motion = f; } };
  function element() { return { events: {}, attributes: {}, hidden: true, addEventListener(k,f) { this.events[k] = f; }, setAttribute(k,v) { this.attributes[k] = v; } }; }
  const items = Array.from({ length: count }, () => {
    let resolvePlay, volumeValue = 1;
    const video = { ...element(), paused: true, error, poster: '', dataset: { poster: 'session.jpeg', hasAudio: hasAudio ? 'true' : 'false' },
      get volume() { return volumeValue; }, set volume(v) { if (!lockedVolume) volumeValue = v; },
      play() {
        if (delayed) return new Promise(resolve => { resolvePlay = () => { this.paused = false; this.events.play(); resolve(); }; });
        this.paused = false; this.events.play(); return Promise.resolve();
      },
      pause() { this.paused = true; this.events.pause?.(); }
    };
    const button = element(), buttonLabel = element(), fallback = element(), status = element(), sound = element(), soundLabel = element(), volume = element(), volumeNote = element();
    const playIcon = element();
    let buttonChildren = [playIcon, buttonLabel], replacementText = '';
    // Model DOM textContent: assigning it removes the SVG and label children.
    Object.defineProperty(button, 'textContent', {
      get() { return buttonChildren.length ? buttonLabel.textContent : replacementText; },
      set(value) { buttonChildren = []; replacementText = value; }
    });
    button.querySelector = s => s === '[data-play-label]' && buttonChildren.includes(buttonLabel) ? buttonLabel : s === 'svg' && buttonChildren.includes(playIcon) ? playIcon : null;
    const audio = { ...element(), querySelector: s => ({ '[data-sound-toggle]': sound, '[data-sound-label]': soundLabel, '[data-volume]': volume, '[data-volume-note]': volumeNote })[s] };
    const figure = { querySelector: s => s === 'video' ? video : s === 'button' ? button : s === '[data-motion-audio]' ? audio : s.includes('fallback') ? fallback : status };
    return { video, button, buttonLabel, fallback, status, sound, soundLabel, volume, volumeNote, audio, figure, resolve: () => resolvePlay() };
  });
  const document = { hidden: false, querySelectorAll: s => s.includes('[data-reveal]') ? [] : items.map(i => i.figure), addEventListener: (k,f) => { listeners[k] = f; } };
  vm.runInNewContext(code, { window: { IntersectionObserver: true, matchMedia: () => preference }, document,
    IntersectionObserver: class { constructor(cb, options) { if (Array.isArray(options.threshold)) observe = cb; } observe() {} disconnect() {} }
  });
  return { ...items[0], items, preference, document, listeners,
    visibility: (ratio, index = 0) => observe([{ target: items[index].video, isIntersecting: ratio > 0, intersectionRatio: ratio }]) };
}
test('visibility, mute, manual pause persists and tab exits stop playback', async () => {
  const s = setup(); s.visibility(.4); assert(s.video.paused);
  s.visibility(.6); await Promise.resolve(); assert(!s.video.paused); assert(s.video.muted);
  s.button.events.click(); s.visibility(.8); assert(s.video.paused);
  s.button.events.click(); await Promise.resolve(); assert(!s.video.paused);
  s.document.hidden = true; s.listeners.visibilitychange(); assert(s.video.paused);
  s.document.hidden = false; s.listeners.visibilitychange(); await Promise.resolve();
  s.visibility(0); assert(s.video.paused);
});
test('reduced motion prevents automatic play but permits manual playback', async () => {
  const s = setup(); s.preference.matches = true; s.listeners.motion(); s.visibility(1);
  assert(s.video.paused); s.button.events.click(); await Promise.resolve(); assert(!s.video.paused);
});
test('manual pause cancels a pending play request, including late resolution', async () => {
  const s = setup({ delayed: true }); s.visibility(1); s.button.events.click();
  s.resolve(); await new Promise(setImmediate); assert(s.video.paused);
  assert.equal(s.buttonLabel.textContent, "Reproduzir vídeo");
  assert.equal(s.button.attributes['data-playing'], 'false');
});
test('codec failure keeps photograph and original link available', () => {
  const s = setup(); s.video.events.error(); assert(s.button.hidden); assert.equal(s.fallback.hidden, false);
  assert(s.status.textContent); assert.equal(s.video.poster, 'session.jpeg');
});
test('failure already present at initialization also exposes fallback', () => {
  const s = setup({ error: { code: 4 } }); assert(s.button.hidden); assert.equal(s.fallback.hidden, false);
});
test('autoplay rejection allows a manual retry', async () => {
  const s = setup(); s.video.play = () => Promise.reject(new Error('blocked'));
  s.visibility(1); await new Promise(setImmediate); assert(s.video.paused);
  assert.equal(s.button.attributes['data-playing'], 'false');
  assert.equal(s.buttonLabel.textContent, 'Reproduzir vídeo');
  s.video.play = () => { s.video.paused = false; return Promise.resolve(); };
  s.button.events.click(); await Promise.resolve(); assert(!s.video.paused);
});

test('blocked autoplay retains the SVG and attached accessible label during manual retry', async () => {
  const s = setup();
  const icon = s.button.querySelector('svg');
  const resume = s.video.play.bind(s.video);
  s.video.play = () => Promise.reject(new Error('NotAllowedError'));
  s.visibility(1); await new Promise(setImmediate);
  assert.equal(s.button.querySelector('svg'), icon);
  assert.equal(s.button.querySelector('[data-play-label]'), s.buttonLabel);
  assert.equal(s.button.querySelector('[data-play-label]').textContent, 'Reproduzir vídeo');
  s.video.play = resume;
  s.button.events.click(); await Promise.resolve();
  assert.equal(s.button.querySelector('svg'), icon);
  assert.equal(s.button.querySelector('[data-play-label]').textContent, 'Pausar vídeo');
  s.button.events.click();
  assert.equal(s.button.querySelector('[data-play-label]').textContent, 'Reproduzir vídeo');
});

test('playback icon, tooltip and accessible name track playback, manual pause and viewport exit', async () => {
  const s = setup();
  const check = playing => {
    const label = playing ? 'Pausar vídeo' : 'Reproduzir vídeo';
    assert.equal(s.button.attributes['data-playing'], String(playing));
    assert.equal(s.button.attributes.title, label);
    assert.equal(s.buttonLabel.textContent, label);
  };
  check(false);
  s.visibility(1); await Promise.resolve(); check(true);
  s.button.events.click(); check(false);
  s.button.events.click(); await Promise.resolve(); check(true);
  s.visibility(0); check(false);
  s.video.events.error(); check(false); assert(s.button.hidden);
});

test('explicit sound toggle preserves volume; slider never implicitly unmutes', async () => {
  const s = setup(); s.visibility(1); await Promise.resolve();
  assert(s.video.muted); assert.equal(s.sound.attributes['aria-pressed'], 'false');
  s.volume.value = '0.35'; s.volume.events.input(); assert.equal(s.video.volume, .35); assert(s.video.muted);
  s.sound.events.click(); assert(!s.video.muted); assert.equal(s.video.volume, .35);
  assert.equal(s.sound.attributes['aria-pressed'], 'true');
  s.visibility(.8); assert(!s.video.muted); // no new start while already playing
  s.sound.events.click(); assert(s.video.muted); assert.equal(s.video.volume, .35);
});
test('only one video can be unmuted; volume changes preserve exclusivity', () => {
  const s = setup({ count: 2 }); const second = s.items[1];
  s.sound.events.click(); second.sound.events.click();
  assert(s.video.muted); assert(!second.video.muted);
  assert.equal(s.sound.attributes['aria-pressed'], 'false');
  s.video.muted = false; s.video.events.volumechange(); assert(second.video.muted);
});
test('manual resume retains sound but automatic viewport/visibility resume is muted', async () => {
  const s = setup(); s.visibility(1); await Promise.resolve(); s.sound.events.click();
  s.button.events.click(); s.button.events.click(); await Promise.resolve(); assert(!s.video.muted);
  s.visibility(0); assert(s.video.paused); assert(s.video.muted);
  s.visibility(1); await Promise.resolve(); assert(s.video.muted);
  s.sound.events.click(); s.document.hidden = true; s.listeners.visibilitychange(); assert(s.video.muted);
});
test('no verified audio track means no misleading controls', () => {
  const s = setup({ hasAudio: false }); assert(s.audio.hidden); assert.equal(s.sound.events.click, undefined);
});
test('restricted platform volume disables slider and explains hardware controls', () => {
  const s = setup({ lockedVolume: true }); s.volume.value = '0.2'; s.volume.events.input();
  assert(s.volume.disabled); assert.equal(s.volume.value, '1'); assert.equal(s.volumeNote.hidden, false);
  s.sound.events.click(); assert(!s.video.muted); s.sound.events.click(); assert(s.video.muted);
});
test('zero volume is valid and audio UI disappears on playback failure', () => {
  const s = setup(); s.volume.value = '0'; s.volume.events.input(); assert.equal(s.video.volume, 0);
  s.sound.events.click(); assert.equal(s.video.volume, 0);
  s.video.events.error(); assert(s.audio.hidden);
});
