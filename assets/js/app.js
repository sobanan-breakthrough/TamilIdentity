/* ============================================================================
   TamilIdentity∞ — Interaction & accessibility layer
   Vanilla JS, no dependencies. Everything degrades gracefully.
   ============================================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem("ti_" + k)) ?? d; } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem("ti_" + k, JSON.stringify(v)); } catch {} },
  };

  /* ---------- Accessibility controls ---------- */
  const root = document.documentElement;

  // restore saved prefs
  const prefs = store.get("prefs", {});
  if (prefs.theme) root.dataset.theme = prefs.theme;
  if (prefs.contrast) root.dataset.contrast = prefs.contrast;
  if (prefs.motion) root.dataset.motion = prefs.motion;
  if (prefs.scale) root.style.setProperty("--font-scale", prefs.scale);
  if (prefs.tamil) document.body.classList.add("emph-tamil");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && !prefs.motion) {
    root.dataset.motion = "off";
  }
  const savePrefs = () => store.set("prefs", {
    theme: root.dataset.theme, contrast: root.dataset.contrast,
    motion: root.dataset.motion, scale: root.style.getPropertyValue("--font-scale"),
    tamil: document.body.classList.contains("emph-tamil"),
  });

  const btnTheme = $("#btn-theme");
  btnTheme.addEventListener("click", () => {
    const light = root.dataset.theme === "light";
    root.dataset.theme = light ? "dark" : "light";
    btnTheme.setAttribute("aria-pressed", String(!light));
    btnTheme.querySelector(".ic").textContent = light ? "☾" : "☀";
    savePrefs();
  });
  if (root.dataset.theme === "light") { btnTheme.setAttribute("aria-pressed", "true"); btnTheme.querySelector(".ic").textContent = "☀"; }

  const btnContrast = $("#btn-contrast");
  btnContrast.addEventListener("click", () => {
    const on = root.dataset.contrast === "high";
    root.dataset.contrast = on ? "" : "high";
    btnContrast.setAttribute("aria-pressed", String(!on));
    savePrefs();
  });
  if (root.dataset.contrast === "high") btnContrast.setAttribute("aria-pressed", "true");

  const btnMotion = $("#btn-motion");
  const syncMotion = () => btnMotion.setAttribute("aria-pressed", String(root.dataset.motion === "off"));
  btnMotion.addEventListener("click", () => {
    root.dataset.motion = root.dataset.motion === "off" ? "" : "off";
    syncMotion(); savePrefs();
  });
  syncMotion();

  const scales = [1, 1.15, 1.3, 0.9];
  let scaleIdx = scales.indexOf(parseFloat(prefs.scale)) >= 0 ? scales.indexOf(parseFloat(prefs.scale)) : 0;
  $("#btn-text").addEventListener("click", () => {
    scaleIdx = (scaleIdx + 1) % scales.length;
    root.style.setProperty("--font-scale", scales[scaleIdx]);
    savePrefs();
  });

  const btnTamil = $("#btn-tamil");
  const syncTamil = () => btnTamil.setAttribute("aria-pressed", String(document.body.classList.contains("emph-tamil")));
  btnTamil.addEventListener("click", () => {
    document.body.classList.toggle("emph-tamil");
    // Emphasise Tamil script size for readers who prefer it
    document.body.style.setProperty("--tamil-boost", document.body.classList.contains("emph-tamil") ? "1.18" : "1");
    $$(".tamil, .tt-tamil, .k-tamil, .q-tamil, .tp-tamil").forEach(el => {
      el.style.fontSize = document.body.classList.contains("emph-tamil") ? "1.18em" : "";
    });
    syncTamil(); savePrefs();
  });
  syncTamil();
  if (document.body.classList.contains("emph-tamil")) {
    $$(".tamil, .tt-tamil, .k-tamil, .q-tamil, .tp-tamil").forEach(el => el.style.fontSize = "1.18em");
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => io.observe(el));

  /* ---------- Timeline ---------- */
  const tl = $("#timeline");
  TIMELINE.forEach(t => {
    const d = document.createElement("div");
    d.className = "tl-item";
    d.innerHTML = `<div class="tl-when">${t.when}</div><p class="tl-what">${t.what}</p>`;
    tl.appendChild(d);
  });

  /* ---------- Aintinai landscapes ---------- */
  const tabs = $("#tinai-tabs");
  const panel = $("#tinai-panel");
  function renderTinai(i) {
    const l = LANDSCAPES[i];
    panel.style.setProperty("--hue", l.hue);
    panel.innerHTML = `
      <div class="tp-head">
        <span class="tp-tamil">${l.tamil}</span>
        <span class="rom">${l.roman}</span>
        <span class="tp-en">· ${l.en} · ${l.flower}</span>
      </div>
      <div class="tp-grid">
        <div class="tp-cell"><div class="k">Akam — inner feeling</div><div class="v">${l.akam}<small>${l.akamTamil}</small></div></div>
        <div class="tp-cell"><div class="k">Puram — public face</div><div class="v">${l.puram}</div></div>
        <div class="tp-cell"><div class="k">Time & season</div><div class="v">${l.time}</div></div>
        <div class="tp-cell"><div class="k">Presiding deity</div><div class="v">${l.deity}</div></div>
      </div>
      <p class="tp-meaning">${l.meaning}</p>`;
    $$(".tinai-tab", tabs).forEach((t, j) => t.setAttribute("aria-selected", String(j === i)));
  }
  LANDSCAPES.forEach((l, i) => {
    const b = document.createElement("button");
    b.className = "tinai-tab"; b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", String(i === 0));
    b.style.setProperty("--hue", l.hue);
    b.innerHTML = `<span class="tt-tamil">${l.tamil}</span><span class="tt-en">${l.en.split(" ")[0]}</span>`;
    b.addEventListener("click", () => renderTinai(i));
    b.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const next = (i + dir + LANDSCAPES.length) % LANDSCAPES.length;
        $$(".tinai-tab", tabs)[next].focus();
        renderTinai(next);
      }
    });
    tabs.appendChild(b);
  });
  renderTinai(0);

  /* ---------- Kaniyan quote cite ---------- */
  $("#yadhum-cite").textContent = `— ${YADHUM.poet}, ${YADHUM.source}`;

  /* ---------- Kural cards ---------- */
  const strip = $("#kural-strip");
  KURALS.forEach(k => {
    const c = document.createElement("article");
    c.className = "kural-card";
    c.innerHTML = `
      <div class="k-n">Kuṟaḷ ${k.n} · ${k.book}</div>
      <div class="k-tamil tamil">${k.tamil}</div>
      <div class="k-rom">${k.roman}</div>
      <div class="k-en">${k.en}</div>
      <div class="k-theme">${k.theme}</div>`;
    strip.appendChild(c);
  });

  /* ---------- Siddhar voices ---------- */
  const sg = $("#siddhar-grid");
  SIDDHARS.forEach(s => {
    const c = document.createElement("article");
    c.className = "siddhar-card";
    c.innerHTML = `
      <div class="s-name">${s.name}<span class="s-tamil tamil">${s.tamil}</span></div>
      <p class="s-line">${s.line}</p>
      <p class="s-note">${s.note}</p>`;
    sg.appendChild(c);
  });

  /* ---------- Body as temple ---------- */
  $("#temple-verse-tamil").textContent = BODY_TEMPLE.verse.tamil;
  $("#temple-verse-rom").textContent = BODY_TEMPLE.verse.roman;
  $("#temple-verse-en").textContent = `“${BODY_TEMPLE.verse.en}”`;
  $("#temple-verse-cite").textContent = `— ${BODY_TEMPLE.verse.poet}, ${BODY_TEMPLE.verse.source}`;

  const templeList = $("#temple-list");
  const dotsG = $("#temple-dots");
  const dotPos = { heart: [100, 150], breath: [100, 118], pulse: [100, 165], eyes: [100, 40], vasal: [100, 90] };
  let activeTemple = null;
  function setTemple(id) {
    activeTemple = id;
    $$(".temple-item", templeList).forEach(el => el.classList.toggle("active", el.dataset.id === id));
    $$(".temple-dot", dotsG).forEach(el => el.classList.toggle("active", el.dataset.id === id));
  }
  BODY_TEMPLE.parts.forEach(p => {
    const b = document.createElement("button");
    b.className = "temple-item"; b.dataset.id = p.id; b.setAttribute("role", "listitem");
    b.innerHTML = `
      <div class="ti-label">${p.label}<span class="ti-tamil tamil">${p.tamil}</span></div>
      <div class="ti-ritual">${p.ritual}</div>
      <div class="ti-note">${p.note}</div>`;
    b.addEventListener("click", () => setTemple(p.id));
    templeList.appendChild(b);

    const pos = dotPos[p.id] || [100, 160];
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("class", "hot");
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", pos[0]); c.setAttribute("cy", pos[1]); c.setAttribute("r", "7");
    c.setAttribute("class", "temple-dot"); c.dataset.id = p.id;
    c.setAttribute("tabindex", "0"); c.setAttribute("role", "button");
    c.setAttribute("aria-label", p.label + " — " + p.ritual);
    c.addEventListener("click", () => setTemple(p.id));
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setTemple(p.id); } });
    dotsG.appendChild(c);
  });
  setTemple("heart");

  /* ---------- Breath guide ---------- */
  const breath = $("#breath");
  const breathBtn = $("#breath-toggle");
  const breathLabel = $("#breath-label");
  let breathTimer = null, phase = 0;
  const phases = ["Inhale…", "Hold…", "Exhale…", "Rest…"];
  breathBtn.addEventListener("click", () => {
    const on = breath.classList.toggle("on");
    breathBtn.setAttribute("aria-pressed", String(on));
    breathBtn.textContent = on ? "Pause" : "Begin breath guide";
    if (on) {
      phase = 0;
      breathLabel.textContent = phases[0];
      breathTimer = setInterval(() => { phase = (phase + 1) % phases.length; breathLabel.textContent = phases[phase]; }, 2500);
    } else {
      clearInterval(breathTimer);
      breathLabel.textContent = "Vāsi — the sacred reed. Inhale as it grows, exhale as it falls.";
    }
  });

  /* ---------- Comparative matrix ---------- */
  const matrix = $("#matrix");
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr>" + MATRIX.cols.map((c, i) => `<th scope="col">${c}</th>`).join("") + "</tr>";
  matrix.appendChild(thead);
  const tbody = document.createElement("tbody");
  MATRIX.rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<th scope="row">${r[0]}</th>` + r.slice(1).map(c => `<td>${c}</td>`).join("");
    tbody.appendChild(tr);
  });
  matrix.appendChild(tbody);

  /* ---------- Behavioural change: practices & pledges ---------- */
  const pg = $("#practice-grid");
  const pledges = store.get("pledges", {});
  function countPledges() {
    const n = Object.values(pledges).filter(Boolean).length;
    $("#pledge-count").textContent = n;
    return n;
  }
  PRACTICES.forEach((p, i) => {
    const c = document.createElement("article");
    c.className = "practice-card";
    const checked = pledges[i] ? "checked" : "";
    c.innerHTML = `
      <div class="p-tamil tamil">${p.tamil}</div>
      <h3>${p.pillar}</h3>
      <div class="p-from">From: ${p.from}</div>
      <div class="p-prompt">${p.prompt}</div>
      <div class="p-action">${p.action}</div>
      <label class="pledge-check">
        <input type="checkbox" data-i="${i}" ${checked} />
        <span>I'll carry this practice.</span>
      </label>`;
    pg.appendChild(c);
  });
  pg.addEventListener("change", (e) => {
    if (e.target.matches("input[type=checkbox]")) {
      pledges[e.target.dataset.i] = e.target.checked;
      store.set("pledges", pledges);
      const n = countPledges();
      if (e.target.checked) toast(n === 4 ? "All four pillars pledged — build from here. ∞" : "Pledge saved on your device.");
    }
  });
  countPledges();

  /* ---------- Reflection journal ---------- */
  const ta = $("#reflection");
  ta.value = store.get("reflection", "");
  $("#save-reflection").addEventListener("click", () => {
    store.set("reflection", ta.value);
    $("#save-note").textContent = "Saved privately on this device.";
    toast("Your reflection is saved.");
    setTimeout(() => { $("#save-note").textContent = ""; }, 4000);
  });
  $("#clear-reflection").addEventListener("click", () => {
    ta.value = ""; store.set("reflection", "");
    $("#save-note").textContent = "Cleared.";
    setTimeout(() => { $("#save-note").textContent = ""; }, 3000);
  });

  /* ---------- Sources ---------- */
  const src = $("#sources");
  SOURCES.forEach(s => { const li = document.createElement("li"); li.textContent = s; src.appendChild(li); });

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  }
})();
