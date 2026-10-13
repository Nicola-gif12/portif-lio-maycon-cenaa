// Progressive entrance enhancement: normal CSS always leaves content visible.
(() => {
  if (!("IntersectionObserver" in window) || !("matchMedia" in window)) return;

  const targets = document.querySelectorAll("[data-reveal] > .reveal-part, [data-reveal-image], [data-reveal-item]");
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const revealed = new WeakSet();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (preference.matches || !entry.isIntersecting || entry.intersectionRatio < 0.1 || revealed.has(entry.target)) continue;
      revealed.add(entry.target);
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.1, rootMargin: "0px 0px -4% 0px" });

  function syncMotion() {
    observer.disconnect();
    targets.forEach((target) => {
      if (preference.matches) {
        // Switching motion off finishes every entrance, including delayed ones.
        revealed.add(target);
        target.classList.remove("is-revealed");
      } else if (!revealed.has(target)) {
        observer.observe(target);
      }
    });
  }

  syncMotion();
  preference.addEventListener("change", syncMotion);
})();

// Video visibility has a separate observer because it must keep watching exits.
(() => {
  if (!("IntersectionObserver" in window) || !("matchMedia" in window)) return;
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const states = new Map();

  // Presentation only: keep the icon, tooltip and accessible name in sync.
  function syncPlaybackControl(state, playing) {
    const label = playing ? "Pausar vídeo" : "Reproduzir vídeo";
    state.buttonLabel.textContent = label;
    state.button.setAttribute("data-playing", String(playing));
    state.button.setAttribute("title", label);
  }

  function stop(state) {
    state.request += 1;
    state.wantPlaying = false;
    state.pending = false;
    state.video.pause();
    syncPlaybackControl(state, false);
  }

  async function play(state, manual = false) {
    if (state.failed || document.hidden || (!manual &&
      (preference.matches || state.userPaused || state.blocked || !state.visible))) return;
    if (state.pending || !state.video.paused) return;
    const request = ++state.request;
    state.wantPlaying = true;
    state.pending = true;
    syncPlaybackControl(state, true);
    // Every automatic start is silent; manual resume preserves explicit sound choice.
    if (!manual) setMuted(state, true);
    try {
      await state.video.play();
      // Visibility or preferences may change before play() resolves.
      if (!state.wantPlaying) state.video.pause();
    } catch {
      if (request === state.request) {
        state.blocked = true;
        state.wantPlaying = false;
        syncPlaybackControl(state, false);
      }
    } finally {
      if (request === state.request) state.pending = false;
    }
  }

  function syncAudio(state) {
    if (!state.audio) return;
    state.sound.setAttribute("aria-pressed", String(!state.video.muted));
    state.soundLabel.textContent = state.video.muted ? "Sem som" : "Com som";
    state.volume.value = String(state.video.volume);
    state.volume.setAttribute("aria-valuetext", `${Math.round(state.video.volume * 100)}%`);
  }

  function setMuted(state, muted) {
    if (!muted) {
      states.forEach((other) => {
        if (other !== state) {
          other.video.muted = true;
          syncAudio(other);
        }
      });
    }
    state.video.muted = muted;
    syncAudio(state);
  }

  document.querySelectorAll("[data-beauty-motion], [data-editorial-motion]").forEach((figure) => {
    const video = figure.querySelector("video");
    const button = figure.querySelector("button");
    const buttonLabel = button.querySelector("[data-play-label]");
    const fallback = figure.querySelector("[data-motion-fallback], .beauty-motion__fallback");
    const status = figure.querySelector("[data-motion-status], .beauty-motion__status");
    const state = { video, button, buttonLabel, visible: false, userPaused: false, blocked: false, failed: false, request: 0 };
    states.set(video, state);
    syncPlaybackControl(state, false);
    const audio = figure.querySelector("[data-motion-audio]");
    // Explicit inventory flag: unknown/no-audio assets get no custom audio UI.
    if (audio && video.dataset.hasAudio === "true") {
      Object.assign(state, {
        audio,
        sound: audio.querySelector("[data-sound-toggle]"),
        soundLabel: audio.querySelector("[data-sound-label]"),
        volume: audio.querySelector("[data-volume]"),
        volumeNote: audio.querySelector("[data-volume-note]")
      });
      audio.hidden = false;
      state.sound.addEventListener("click", () => {
        if (!state.failed) setMuted(state, !video.muted);
      });
      state.volume.addEventListener("input", () => {
        const requested = Number(state.volume.value);
        try { video.volume = requested; } catch { /* Platform owns volume. */ }
        if (Math.abs(video.volume - requested) > 0.001) {
          state.volume.disabled = true;
          state.volumeNote.hidden = false;
        }
        // Adjusting the level never unmutes implicitly.
        syncAudio(state);
      });
      video.addEventListener("volumechange", () => {
        if (!video.muted) {
          states.forEach((other) => {
            if (other !== state && !other.video.muted) setMuted(other, true);
          });
        }
        syncAudio(state);
      });
    }
    video.muted = true;
    syncAudio(state);
    video.controls = false;
    button.hidden = false;
    fallback.hidden = true;

    button.addEventListener("click", () => {
      if (video.paused && !state.wantPlaying) {
        state.userPaused = false;
        state.blocked = false;
        play(state, true);
      } else {
        state.userPaused = true;
        stop(state);
      }
    });
    video.addEventListener("play", () => { syncPlaybackControl(state, true); });
    video.addEventListener("pause", () => { syncPlaybackControl(state, false); });
    function showFailure() {
      state.failed = true;
      stop(state);
      button.hidden = true;
      if (state.audio) state.audio.hidden = true;
      fallback.hidden = false;
      status.textContent = "Este vídeo não pôde ser reproduzido neste navegador.";
      // The matching shoot photograph remains visible as a poster.
      video.poster = video.dataset.poster;
    }
    video.addEventListener("error", showFailure);
    if (video.error) showFailure();
  });

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const state = states.get(entry.target);
      state.visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      if (entry.isIntersecting && !state.video.poster) state.video.poster = state.video.dataset.poster;
      if (state.visible) play(state);
      else { stop(state); setMuted(state, true); }
    }
  }, { threshold: [0, 0.5] });
  states.forEach((state) => observer.observe(state.video));

  preference.addEventListener("change", () => {
    states.forEach((state) => {
      if (preference.matches) stop(state);
      else if (state.visible) play(state);
    });
  });
  document.addEventListener("visibilitychange", () => {
    states.forEach((state) => {
      if (document.hidden) { stop(state); setMuted(state, true); }
      else if (state.visible) play(state);
    });
  });
})();
