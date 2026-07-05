/* ============================================================================
   TamilIdentity∞ — Interaction & accessibility layer (v2)
   Vanilla JS, no dependencies. Everything degrades gracefully.
   ============================================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem("ti_" + k)) ?? d; } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem("ti_" + k, JSON.stringify(v)); } catch {} },
  };

  /* ---------- Accessibility controls ---------- */
  const root = document.documentElement;
  const prefs = store.get("prefs", {});
  if (prefs.theme) root.dataset.theme = prefs.theme;
  if (prefs.contrast) root.dataset.contrast = prefs.contrast;
  if (prefs.motion) root.dataset.motion = prefs.motion;
  if (prefs.scale) root.style.setProperty("--font-scale", prefs.scale);
  if (prefs.tamil) document.body.classList.add("emph-tamil");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && !prefs.motion) root.dataset.motion = "off";
  const savePrefs = () => store.set("prefs", {
    theme: root.dataset.theme, contrast: root.dataset.contrast, motion: root.dataset.motion,
    scale: root.style.getPropertyValue("--font-scale"), tamil: document.body.classList.contains("emph-tamil"),
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
  btnMotion.addEventListener("click", () => { root.dataset.motion = root.dataset.motion === "off" ? "" : "off"; syncMotion(); savePrefs(); });
  syncMotion();

  const scales = [1, 1.15, 1.3, 0.9];
  let scaleIdx = scales.indexOf(parseFloat(prefs.scale)) >= 0 ? scales.indexOf(parseFloat(prefs.scale)) : 0;
  $("#btn-text").addEventListener("click", () => { scaleIdx = (scaleIdx + 1) % scales.length; root.style.setProperty("--font-scale", scales[scaleIdx]); savePrefs(); });

  const btnTamil = $("#btn-tamil");
  const applyTamilBoost = () => {
    const on = document.body.classList.contains("emph-tamil");
    $$(".tamil, .tt-tamil, .k-tamil, .q-tamil, .tp-tamil, .p-tamil, .cm-tamil, .f-verse").forEach(e => e.style.fontSize = on ? "1.15em" : "");
  };
  btnTamil.addEventListener("click", () => {
    document.body.classList.toggle("emph-tamil");
    btnTamil.setAttribute("aria-pressed", String(document.body.classList.contains("emph-tamil")));
    applyTamilBoost(); savePrefs();
  });
  if (document.body.classList.contains("emph-tamil")) btnTamil.setAttribute("aria-pressed", "true");

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  $$(".reveal").forEach(e => io.observe(e));

  /* ---------- Reading progress bar ---------- */
  const bar = $("#progress-bar");
  const toTop = $("#to-top");
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    bar.style.width = pct + "%";
    toTop.classList.toggle("show", h.scrollTop > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: root.dataset.motion === "off" ? "auto" : "smooth" }));

  /* ---------- Scroll-spy side navigation ---------- */
  const dotnav = $("#dotnav");
  SECTIONS.forEach(s => {
    const a = el("a"); a.href = "#" + s.id;
    a.innerHTML = `<span class="lbl">${s.label}</span><span class="dot"></span>`;
    dotnav.appendChild(a);
  });
  const navLinks = $$("a", dotnav);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(a => a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + id)));
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  SECTIONS.forEach(s => { const t = document.getElementById(s.id); if (t) spy.observe(t); });

  /* ---------- Timeline ---------- */
  const tl = $("#timeline");
  TIMELINE.forEach(t => tl.appendChild(el("div", "tl-item", `<div class="tl-when">${t.when}</div><p class="tl-what">${t.what}</p>`)));

  /* ---------- Language ---------- */
  $("#language-intro").textContent = LANGUAGE.intro;
  const lg = $("#language-grid");
  LANGUAGE.facts.forEach(f => lg.appendChild(el("div", "info-card", `<div class="ic-title">${f.k}</div><div class="ic-desc">${f.v}</div>`)));

  /* ---------- Dynasties ---------- */
  const dyn = $("#dynasties");
  DYNASTIES.forEach(d => dyn.appendChild(el("div", "triad-card",
    `<div class="emblem" aria-hidden="true">${d.emblem}</div><div class="t-name">${d.name}</div><div class="t-tamil tamil">${d.tamil}</div><div class="t-desc">${d.desc}</div>`)));

  /* ---------- Diaspora ---------- */
  const dia = $("#diaspora");
  DIASPORA.forEach(p => {
    const span = el("span", "place", `<span class="flag" aria-hidden="true">${p.flag}</span><b>${p.place}</b>`);
    span.title = p.note; span.tabIndex = 0;
    dia.appendChild(span);
  });

  /* ---------- Aintinai landscapes ---------- */
  const tabs = $("#tinai-tabs");
  const panel = $("#tinai-panel");
  function renderTinai(i) {
    const l = LANDSCAPES[i];
    panel.style.setProperty("--hue", l.hue);
    panel.innerHTML = `
      <div class="tp-head"><span class="tp-tamil tamil">${l.tamil}</span><span class="rom">${l.roman}</span><span class="tp-en">· ${l.en} · ${l.flower}</span></div>
      <div class="tp-grid">
        <div class="tp-cell"><div class="k">Akam — inner feeling</div><div class="v">${l.akam}<small>${l.akamTamil}</small></div></div>
        <div class="tp-cell"><div class="k">Puṟam — public face</div><div class="v">${l.puram}</div></div>
        <div class="tp-cell"><div class="k">Time & season</div><div class="v">${l.time}</div></div>
        <div class="tp-cell"><div class="k">Deity</div><div class="v">${l.deity}</div></div>
        <div class="tp-cell" style="grid-column:1/-1"><div class="k">Native world (karupporuḷ)</div><div class="v">${l.karu}</div></div>
      </div>
      <p class="tp-meaning">${l.meaning}</p>`;
    $$(".tinai-tab", tabs).forEach((t, j) => t.setAttribute("aria-selected", String(j === i)));
    if (document.body.classList.contains("emph-tamil")) applyTamilBoost();
  }
  LANDSCAPES.forEach((l, i) => {
    const b = el("button", "tinai-tab");
    b.setAttribute("role", "tab"); b.setAttribute("aria-selected", String(i === 0));
    b.style.setProperty("--hue", l.hue);
    b.innerHTML = `<span class="tt-tamil tamil">${l.tamil}</span><span class="tt-en">${l.en.split(" ")[0]}</span>`;
    b.addEventListener("click", () => renderTinai(i));
    b.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const next = (i + (e.key === "ArrowRight" ? 1 : -1) + LANDSCAPES.length) % LANDSCAPES.length;
        $$(".tinai-tab", tabs)[next].focus(); renderTinai(next);
      }
    });
    tabs.appendChild(b);
  });
  renderTinai(0);

  /* Aintinai theory */
  $("#aintinai-theory-body").innerHTML =
    `<p>${AINTINAI_THEORY.intro}</p><ul style="padding-left:1.1rem">` +
    AINTINAI_THEORY.layers.map(l => `<li><b>${l.k}</b> <span class="tamil">${l.tamil}</span> — ${l.v}</li>`).join("") +
    `</ul><p>${AINTINAI_THEORY.mayakkam}</p>`;

  /* Sangam poem */
  const sp = $("#sangam-poem");
  sp.innerHTML = `<p class="p-tamil tamil">${SANGAM_POEM.tamil}</p><p class="p-rom">${SANGAM_POEM.rom}</p><p class="p-en">${SANGAM_POEM.en}</p><cite>${SANGAM_POEM.cite}</cite><p class="muted" style="margin-top:0.8rem">${SANGAM_POEM.note}</p>`;

  /* Anthologies */
  $("#anthologies-body").innerHTML =
    `<p>${ANTHOLOGIES.intro}</p>
     <p><b>${ANTHOLOGIES.ettu.name}</b> <span class="tamil">${ANTHOLOGIES.ettu.tamil}</span><br>${ANTHOLOGIES.ettu.items.join(" · ")}</p>
     <p><b>${ANTHOLOGIES.pathu.name}</b> <span class="tamil">${ANTHOLOGIES.pathu.tamil}</span><br>${ANTHOLOGIES.pathu.items.join(" · ")}</p>
     <p class="muted">${ANTHOLOGIES.note}</p>`;

  /* ---------- Kinship / Aram ---------- */
  $("#yadhum-cite").textContent = `— ${YADHUM.poet}, ${YADHUM.source}`;
  $("#aram-intro").textContent = ARAM.intro;
  const as = $("#aram-structure");
  ARAM.structure.forEach(b => as.appendChild(el("div", "triad-card",
    `<div class="t-name">${b.book}</div><div class="t-tamil tamil">${b.tamil}</div><div class="t-desc"><b>${b.n}</b><br>${b.note}</div>`)));
  $("#aram-vsdharma").textContent = ARAM.vsDharma;
  $("#aram-reach").textContent = ARAM.reach;

  const strip = $("#kural-strip");
  KURALS.forEach(k => strip.appendChild(el("article", "kural-card",
    `<div class="k-n">Kuṟaḷ ${k.n} · ${k.chapter}</div><div class="k-tamil tamil">${k.tamil}</div><div class="k-rom">${k.roman}</div><div class="k-en">${k.en}</div><div class="k-theme">${k.theme}</div>`)));

  /* Cilappatikaram epic */
  $("#epic").innerHTML =
    `<p class="p-tamil tamil">${EPIC.tamil}</p><p class="p-en" style="font-size:1.15rem">${EPIC.title} — ${EPIC.meaning}</p>
     <p class="muted">${EPIC.author} · ${EPIC.date}</p><p style="margin-top:0.8rem">${EPIC.story}</p><p><b>${EPIC.why}</b></p>`;

  /* ---------- Siddhars ---------- */
  const sg = $("#siddhar-grid");
  SIDDHARS.forEach(s => sg.appendChild(el("article", "siddhar-card",
    `<div class="s-name">${s.name}<span class="s-tamil tamil">${s.tamil}</span></div><p class="s-line">${s.line}</p><p class="s-note">${s.note}</p>`)));
  $("#siddha-intro").textContent = SIDDHA_SCIENCE.intro;
  const scg = $("#siddha-grid");
  SIDDHA_SCIENCE.items.forEach(it => scg.appendChild(el("div", "info-card",
    `<div class="ic-title">${it.k}<span class="ic-tamil tamil">${it.tamil}</span></div><div class="ic-desc">${it.v}</div>`)));

  /* ---------- Body as temple ---------- */
  $("#temple-verse-tamil").textContent = BODY_TEMPLE.verse.tamil;
  $("#temple-verse-rom").textContent = BODY_TEMPLE.verse.roman;
  $("#temple-verse-en").textContent = `“${BODY_TEMPLE.verse.en}”`;
  $("#temple-verse-cite").textContent = `— ${BODY_TEMPLE.verse.poet}, ${BODY_TEMPLE.verse.source}`;
  $("#anbe-pull").innerHTML = BODY_TEMPLE.anbe;

  const templeList = $("#temple-list");
  const dotsG = $("#temple-dots");
  const dotPos = { heart: [100, 150], breath: [100, 118], pulse: [100, 165], eyes: [100, 40], vasal: [100, 90] };
  function setTemple(id) {
    $$(".temple-item", templeList).forEach(e => e.classList.toggle("active", e.dataset.id === id));
    $$(".temple-dot", dotsG).forEach(e => e.classList.toggle("active", e.dataset.id === id));
  }
  BODY_TEMPLE.parts.forEach(p => {
    const b = el("button", "temple-item",
      `<div class="ti-label">${p.label}<span class="ti-tamil tamil">${p.tamil}</span></div><div class="ti-ritual">${p.ritual}</div><div class="ti-note">${p.note}</div>`);
    b.dataset.id = p.id; b.setAttribute("role", "listitem");
    b.addEventListener("click", () => setTemple(p.id));
    templeList.appendChild(b);

    const pos = dotPos[p.id] || [100, 160];
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", pos[0]); c.setAttribute("cy", pos[1]); c.setAttribute("r", "7");
    c.setAttribute("class", "temple-dot hot"); c.dataset.id = p.id;
    c.setAttribute("tabindex", "0"); c.setAttribute("role", "button"); c.setAttribute("aria-label", p.label + " — " + p.ritual);
    c.addEventListener("click", () => setTemple(p.id));
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setTemple(p.id); } });
    dotsG.appendChild(c);
  });
  setTemple("heart");

  /* Breath guide */
  const breath = $("#breath"), breathBtn = $("#breath-toggle"), breathLabel = $("#breath-label");
  let breathTimer = null, phase = 0;
  const phases = ["Inhale…", "Hold…", "Exhale…", "Rest…"];
  breathBtn.addEventListener("click", () => {
    const on = breath.classList.toggle("on");
    breathBtn.setAttribute("aria-pressed", String(on));
    breathBtn.textContent = on ? "Pause" : "Begin breath guide";
    if (on) { phase = 0; breathLabel.textContent = phases[0]; breathTimer = setInterval(() => { phase = (phase + 1) % phases.length; breathLabel.textContent = phases[phase]; }, 2500); }
    else { clearInterval(breathTimer); breathLabel.textContent = "Vāsi — the sacred reed. Inhale as it grows, exhale as it falls."; }
  });

  /* ---------- Living culture ---------- */
  $("#mutham-intro").textContent = MUTHAMIZH.intro;
  const mt = $("#mutham");
  MUTHAMIZH.items.forEach(m => mt.appendChild(el("div", "mutham-card",
    `<div class="m-icon" aria-hidden="true">${m.icon}</div><h3>${m.k} <span class="m-tamil tamil">${m.tamil}</span></h3><p class="muted">${m.v}</p>`)));

  const arts = $("#arts");
  ARTS.forEach(a => arts.appendChild(el("div", "info-card",
    `<div class="ic-title">${a.name}<span class="ic-tamil tamil">${a.tamil}</span></div><div class="ic-desc">${a.desc}</div>`)));

  $("#bhakti-intro").textContent = BHAKTI.intro;
  const bh = $("#bhakti");
  BHAKTI.points.forEach(p => bh.appendChild(el("div", "info-card",
    `<div class="ic-title">${p.k}<span class="ic-tamil tamil">${p.tamil}</span></div><div class="ic-desc">${p.v}</div>`)));

  $("#women-intro").textContent = WOMEN.intro;
  $("#women-note").textContent = WOMEN.note;
  const wm = $("#women");
  WOMEN.figures.forEach(f => wm.appendChild(el("article", "siddhar-card",
    `<div class="s-name">${f.name}<span class="s-tamil tamil">${f.tamil}</span></div><p class="s-note">${f.note}</p>`)));

  const voices = $("#voices");
  VOICES.forEach(v => voices.appendChild(el("blockquote", "pull",
    `${v.pull}<span class="tamil" style="display:block;font-size:1rem;color:var(--gold)">${v.tamil}</span><span class="attr">${v.attr}</span>`)));

  /* ---------- Comparative matrix ---------- */
  const matrix = $("#matrix");
  const thead = el("thead", null, "<tr>" + MATRIX.cols.map(c => `<th scope="col">${c}</th>`).join("") + "</tr>");
  matrix.appendChild(thead);
  const tbody = el("tbody");
  MATRIX.rows.forEach(r => tbody.appendChild(el("tr", null, `<th scope="row">${r[0]}</th>` + r.slice(1).map(c => `<td>${c}</td>`).join(""))));
  matrix.appendChild(tbody);

  /* ---------- Behavioural change ---------- */
  const pg = $("#practice-grid");
  const pledges = store.get("pledges", {});
  const countPledges = () => { const n = Object.values(pledges).filter(Boolean).length; $("#pledge-count").textContent = n; return n; };
  PRACTICES.forEach((p, i) => pg.appendChild(el("article", "practice-card",
    `<div class="p-tamil tamil">${p.tamil}</div><h3>${p.pillar}</h3><div class="p-from">From: ${p.from}</div>
     <div class="p-prompt">${p.prompt}</div><div class="p-action">${p.action}</div>
     <label class="pledge-check"><input type="checkbox" data-i="${i}" ${pledges[i] ? "checked" : ""} /><span>I'll carry this practice.</span></label>`)));
  pg.addEventListener("change", (e) => {
    if (e.target.matches("input[type=checkbox]")) {
      pledges[e.target.dataset.i] = e.target.checked;
      store.set("pledges", pledges);
      const n = countPledges();
      if (e.target.checked) toast(n === 4 ? "All four pillars pledged — build from here. ∞" : "Pledge saved on your device.");
    }
  });
  countPledges();

  const ta = $("#reflection");
  ta.value = store.get("reflection", "");
  $("#save-reflection").addEventListener("click", () => { store.set("reflection", ta.value); $("#save-note").textContent = "Saved privately on this device."; toast("Your reflection is saved."); setTimeout(() => $("#save-note").textContent = "", 4000); });
  $("#clear-reflection").addEventListener("click", () => { ta.value = ""; store.set("reflection", ""); $("#save-note").textContent = "Cleared."; setTimeout(() => $("#save-note").textContent = "", 3000); });

  /* ---------- Sources ---------- */
  const src = $("#sources");
  SOURCES.forEach(s => src.appendChild(el("li", null, s)));

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 3200); }

  if (document.body.classList.contains("emph-tamil")) applyTamilBoost();
})();
