/* ============================================================================
   Tamil Network State — front-end infrastructure
   Constitution · on-chain census · soulbound citizenship · treasury · assembly.
   Genesis mode (no contracts) works today via signatures; goes fully on-chain
   the moment ns-config.js has deployed addresses. No transaction is ever sent
   without the citizen's own wallet confirmation; nothing is custodial.
   ============================================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
  const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem("ti_" + k)) ?? d; } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem("ti_" + k, JSON.stringify(v)); } catch {} },
    del: (k) => { try { localStorage.removeItem("ti_" + k); } catch {} },
  };
  const root = $("#network-state");
  if (!root) return;

  const CFG = window.TNS_CONFIG || {};
  const configured = () => !!(CFG.passport && CFG.passport.length === 42);
  const LANG = () => (document.documentElement.lang === "ta" ? "ta" : "en");
  const T = (k, en) => (LANG() === "ta" && typeof UI !== "undefined" && UI[k] != null) ? UI[k] : en;
  const EP = () => window.ethereum || null;
  const short = (a) => a ? a.slice(0, 6) + "…" + a.slice(-4) : "";

  /* language-aware content (sparse TA overlay merged over EN) */
  function dm(base, over) {
    if (over === undefined) return base;
    if (Array.isArray(base)) return base.map((b, i) => dm(b, over && over[i]));
    if (base && typeof base === "object") { const o = Object.assign({}, base); for (const k in over) o[k] = dm(base[k], over[k]); return o; }
    return over;
  }
  const NS = () => (LANG() === "ta" && typeof TA !== "undefined" && TA.NETWORK_STATE)
    ? dm(NETWORK_STATE, TA.NETWORK_STATE) : NETWORK_STATE;

  /* Canonical (language-independent) Constitution text → stable hash for signing/deploy */
  const CANON = "Constitution of the Tamil Network State\n\n" +
    NETWORK_STATE.constitution.map(a => `${a.n}. ${a.title} — ${a.text}`).join("\n");
  window.TNS_CONSTITUTION_TEXT = CANON;

  /* ---- ethers (verify + on-chain reads/writes) ---- */
  let ethersP = null;
  function ethersLib() {
    if (window.ethers) return Promise.resolve(window.ethers);
    if (ethersP) return ethersP;
    ethersP = new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/ethers@6.13.4/dist/ethers.umd.min.js";
      s.async = true; s.onload = () => res(window.ethers); s.onerror = () => rej();
      document.head.appendChild(s); setTimeout(rej, 8000);
    }).catch(() => null);
    return ethersP;
  }
  const ABI_PASSPORT = ["function totalCitizens() view returns (uint256)", "function isCitizen(address) view returns (bool)", "function citizenId(address) view returns (uint256)", "function claimCitizenship() returns (uint256)"];
  const ABI_TREASURY = ["function balance() view returns (uint256)", "function contribute() payable"];

  async function reader() {
    const E = await ethersLib(); if (!E) return null;
    if (CFG.rpc) return new E.JsonRpcProvider(CFG.rpc);
    if (EP()) return new E.BrowserProvider(EP());
    return null;
  }

  /* ---- wallet ---- */
  let account = null;
  async function connect() {
    const p = EP();
    if (!p) { window.open("https://metamask.io/download/", "_blank", "noopener"); return null; }
    try { const a = await p.request({ method: "eth_requestAccounts" }); account = a && a[0] || null; return account; }
    catch { return null; }
  }

  /* ======================= RENDER ======================= */
  function renderStatic() {
    const d = NS();
    $("#ns-thesis").textContent = d.thesis;
    $("#ns-commandment-label").textContent = d.commandmentLabel;
    $("#ns-commandment").textContent = d.commandment;

    const c = $("#ns-constitution"); c.innerHTML = "";
    d.constitution.forEach(a => c.appendChild(el("div", "ns-article",
      `<div class="ns-art-n">${a.n}</div><div class="ns-art-body"><h4>${a.title}</h4><p>${a.text}</p></div>`)));

    const rm = $("#ns-roadmap"); rm.innerHTML = "";
    d.roadmap.forEach(r => rm.appendChild(el("div", "ns-phase" + (r.done ? " done" : ""),
      `<div class="ns-phase-n">${r.phase}</div><div class="ns-phase-t">${r.title}${r.done ? ' <span class="ns-tick">✓</span>' : ""}</div><div class="ns-phase-d">${r.detail}</div>`)));

    const gv = $("#ns-gov"); gv.innerHTML = "";
    d.proposals.forEach(p => gv.appendChild(el("div", "ns-prop",
      `<h4>${p.title}</h4><p>${p.detail}</p><span class="ns-prop-tag">${T("ns.founding", "Founding proposal")}</span>`)));
  }

  function renderCensus(data) {
    const d = NS();
    const box = $("#ns-census"); box.innerHTML = "";
    const vals = data || {};
    d.census.forEach(m => {
      let v = "—", sub = T("ns.genesisMetric", "Genesis — deploy to begin");
      if (m.key === "territory") { v = String((CFG.nodes || []).length); sub = m.hint; }
      else if (vals[m.key] != null) { v = vals[m.key]; sub = m.hint; }
      box.appendChild(el("div", "ns-metric",
        `<div class="ns-metric-v">${v}</div><div class="ns-metric-l">${m.label}</div><div class="ns-metric-h">${sub}</div>`));
    });
  }

  async function refreshCensus() {
    renderCensus(null); // genesis placeholders first
    if (!configured()) return;
    const prov = await reader(); if (!prov) return;
    try {
      const E = window.ethers;
      const pass = new E.Contract(CFG.passport, ABI_PASSPORT, prov);
      const out = {};
      out.population = (await pass.totalCitizens()).toString();
      if (CFG.treasury && CFG.treasury.length === 42) {
        const tre = new E.Contract(CFG.treasury, ABI_TREASURY, prov);
        out.treasury = (+E.formatEther(await tre.balance())).toFixed(4) + " ETH";
      }
      renderCensus(out);
    } catch { /* keep genesis view */ }
  }

  /* ---- citizenship ---- */
  function toHex(str) { const b = new TextEncoder().encode(str); let h = "0x"; for (const x of b) h += x.toString(16).padStart(2, "0"); return h; }

  function oathText(hash) {
    const d = NS();
    return `${T("ns.oath1", "I attest to the Constitution of the Tamil Network State")}\n` +
      d.constitution.map(a => `${a.n}. ${a.title}`).join("\n") +
      `\n\n${d.commandment}\n${T("ns.oathHash", "Constitution hash")}: ${hash}\n${T("ns.oathAt", "Attested at")} ${new Date().toISOString()}`;
  }

  function renderCitizen(cred) {
    const wrap = $("#ns-citizen");
    if (!cred) {
      wrap.innerHTML =
        `<button class="btn" id="ns-join">${EP() ? T("ns.join", "Become a founding citizen") : T("ns.getWallet", "Get a wallet to join")}</button>
         <span class="ns-note" id="ns-joinnote" aria-live="polite"></span>`;
      $("#ns-join").addEventListener("click", join);
      return;
    }
    wrap.innerHTML =
      `<div class="ns-passport">
         <div class="ns-pp-top"><span class="ns-pp-flag">∞</span><span class="ns-pp-title">${T("ns.passport", "Tamil Network State · Passport")}</span></div>
         <div class="ns-pp-role">${cred.onchainId ? "#" + cred.onchainId + " · " + T("ns.citizen", "Citizen") : T("ns.founding2", "Founding Citizen")}</div>
         <div class="ns-pp-addr">${cred.ens ? cred.ens + " · " : ""}${short(cred.address)}</div>
         <div class="ns-pp-meta"><span id="ns-verify">${T("ns.verifying", "Verifying…")}</span></div>
         <div class="ns-pp-actions">
           ${configured() && !cred.onchainId ? `<button class="btn" id="ns-claim">${T("ns.claim", "Claim on-chain")}</button>` : ""}
           <button class="btn ghost" id="ns-export">${T("ns.export", "Export passport")}</button>
           <button class="btn ghost" id="ns-renounce">${T("ns.renounce", "Renounce")}</button>
         </div>
       </div>`;
    $("#ns-export").addEventListener("click", () => navigator.clipboard.writeText(JSON.stringify(cred, null, 2)).then(() => flash("#ns-export", T("ns.copied", "Copied ✓"))));
    $("#ns-renounce").addEventListener("click", () => { store.del("ns_citizen"); renderCitizen(null); });
    const claimBtn = $("#ns-claim"); if (claimBtn) claimBtn.addEventListener("click", claimOnChain);
    verifyCred(cred);
  }

  async function verifyCred(cred) {
    const vEl = $("#ns-verify"); if (!vEl) return;
    const E = await ethersLib();
    if (!E) { vEl.textContent = T("ns.captured", "Attestation stored — verifiable against your address."); return; }
    try {
      const rec = E.verifyMessage(cred.message, cred.signature);
      vEl.innerHTML = (rec.toLowerCase() === cred.address.toLowerCase())
        ? `<span class="ns-ok">✓</span> ${T("ns.verified", "Verified citizen signature")}`
        : `<span class="ns-bad">✕</span> ${T("ns.mismatch", "Signature mismatch")}`;
    } catch { vEl.textContent = T("ns.captured", "Attestation stored — verifiable against your address."); }
  }

  async function join() {
    const note = $("#ns-joinnote");
    const acc = await connect();
    if (!acc) { if (note) note.textContent = T("ns.connErr", "Connect a wallet to continue."); return; }
    if (note) note.textContent = T("ns.signing", "Sign the Constitution in your wallet…");
    const E = await ethersLib();
    const hash = E ? E.keccak256(E.toUtf8Bytes(CANON)) : "0x" + "0".repeat(64);
    const message = oathText(hash);
    try {
      const signature = await EP().request({ method: "personal_sign", params: [toHex(message), acc] });
      const cred = { citizenOf: "Tamil Network State", address: acc, constitutionHash: hash, message, signature, joinedAt: new Date().toISOString() };
      // best-effort ENS
      if (E && EP()) { try { const name = await new E.BrowserProvider(EP()).lookupAddress(acc); if (name) cred.ens = name; } catch {} }
      // if already a citizen on-chain, capture the id
      if (configured()) { try { const prov = await reader(); const id = await new E.Contract(CFG.passport, ABI_PASSPORT, prov).citizenId(acc); if (id && id.toString() !== "0") cred.onchainId = id.toString(); } catch {} }
      store.set("ns_citizen", cred);
      renderCitizen(cred);
    } catch (e) {
      if (note) note.textContent = (e && e.code === 4001) ? T("ns.cancelled", "Attestation cancelled.") : T("ns.signErr", "Could not sign.");
    }
  }

  async function claimOnChain() {
    const btn = $("#ns-claim"); if (!btn) return;
    const acc = account || await connect(); if (!acc) return;
    const E = await ethersLib(); if (!E || !EP()) return;
    btn.disabled = true; btn.textContent = T("ns.claiming", "Confirm in your wallet…");
    try {
      const signer = await new E.BrowserProvider(EP()).getSigner();
      const pass = new E.Contract(CFG.passport, ["function claimCitizenship() returns (uint256)", "function citizenId(address) view returns (uint256)"], signer);
      const tx = await pass.claimCitizenship(); await tx.wait();
      const id = (await pass.citizenId(acc)).toString();
      const cred = store.get("ns_citizen", null) || { address: acc };
      cred.onchainId = id; store.set("ns_citizen", cred); renderCitizen(cred); refreshCensus();
    } catch (e) {
      btn.disabled = false; btn.textContent = T("ns.claim", "Claim on-chain");
    }
  }

  function flash(sel, msg) { const b = $(sel); if (!b) return; const o = b.textContent; b.textContent = msg; setTimeout(() => { if (b) b.textContent = o; }, 1600); }

  /* ---- deploy kit visibility ---- */
  function renderMode() {
    $("#ns-mode").textContent = configured() ? T("ns.live", "Live on-chain") : T("ns.genesis", "Genesis phase");
    $("#ns-mode").className = "ns-mode" + (configured() ? " live" : "");
  }

  /* ---- init + language re-render ---- */
  function build() { renderStatic(); renderMode(); renderCensus(null); renderCitizen(store.get("ns_citizen", null)); refreshCensus(); }
  document.addEventListener("ti:langchange", () => { renderStatic(); renderMode(); renderCitizen(store.get("ns_citizen", null)); refreshCensus(); });
  build();
})();
