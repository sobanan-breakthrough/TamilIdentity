/* ============================================================================
   TamilIdentity∞ — dApp layer: a self-sovereign, on-chain pledge
   Connect a Web3 wallet (EIP-1193) → cryptographically sign your pledge
   (EIP-191 personal_sign) → verify the signature in-app (ecrecover via ethers).
   Gas-free, keyless, no backend, no contract, nothing leaves the device.
   Degrades gracefully with no wallet and with no ethers (CDN) available.
   ============================================================================ */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem("ti_" + k)) ?? d; } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem("ti_" + k, JSON.stringify(v)); } catch {} },
    del: (k) => { try { localStorage.removeItem("ti_" + k); } catch {} },
  };
  const LANG = () => (document.documentElement.lang === "ta" ? "ta" : "en");
  const T = (key, en) => (LANG() === "ta" && typeof UI !== "undefined" && UI[key] != null) ? UI[key] : en;
  const short = (a) => a ? a.slice(0, 6) + "…" + a.slice(-4) : "";

  const EP = () => window.ethereum || null;   // lazy: wallets may inject late
  let account = null, chainId = null, ethersP = null, listening = false;

  const els = {
    connect: $("#dapp-connect"), status: $("#dapp-status"),
    signblock: $("#dapp-signblock"), sign: $("#dapp-sign"),
    disconnect: $("#dapp-disconnect"), receipt: $("#dapp-receipt"),
  };
  if (!els.connect) return; // section not present

  /* ---- ethers (only needed for verification + ENS) ---- */
  function loadEthers() {
    if (window.ethers) return Promise.resolve(window.ethers);
    if (ethersP) return ethersP;
    ethersP = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/ethers@6.13.4/dist/ethers.umd.min.js";
      s.async = true;
      s.onload = () => resolve(window.ethers);
      s.onerror = () => reject(new Error("ethers load failed"));
      document.head.appendChild(s);
      setTimeout(() => reject(new Error("ethers timeout")), 8000);
    }).catch(() => null);
    return ethersP;
  }

  const NETS = {
    "0x1": "Ethereum", "0x5": "Goerli", "0xaa36a7": "Sepolia",
    "0x89": "Polygon", "0x13882": "Polygon Amoy", "0xa": "Optimism",
    "0xa4b1": "Arbitrum", "0x2105": "Base", "0x14a34": "Base Sepolia",
  };
  const netName = (id) => NETS[id] || (id ? "chain " + parseInt(id, 16) : "");

  function toUtf8Hex(str) {
    const bytes = new TextEncoder().encode(str);
    let h = "0x"; for (const b of bytes) h += b.toString(16).padStart(2, "0");
    return h;
  }

  /* ---- pledge data (shared with the Build section, via localStorage) ---- */
  function pledgeSource() {
    return (LANG() === "ta" && typeof TA !== "undefined" && TA.PRACTICES) ? TA.PRACTICES
      : (typeof PRACTICES !== "undefined" ? PRACTICES : []);
  }
  function pledgedNames() {
    const p = store.get("pledges", {});
    const src = pledgeSource();
    return Object.keys(p).filter(k => p[k]).map(i => src[i] && src[i].pillar).filter(Boolean);
  }
  function reflection() { const r = store.get("reflection", ""); return (r || "").trim(); }
  function hasCommitment() { return pledgedNames().length > 0 || reflection().length > 0; }

  function buildMessage() {
    const names = pledgedNames();
    const L = [];
    L.push(T("dapp.msgTitle", "TamilIdentity∞ — Pledge of the Cāṉṟōr"));
    L.push("");
    L.push(T("dapp.msgIntro", "I commit to carry these pillars of what it means to be Tamil:"));
    (names.length ? names : [T("dapp.msgAll", "All four pillars")]).forEach(n => L.push("• " + n));
    const r = reflection();
    if (r) { L.push(""); L.push(T("dapp.msgReflect", "To me, being Tamil means:") + " " + r); }
    L.push("");
    L.push("யாதும் ஊரே யாவரும் கேளிர் · Yāthum ūrē yāvarum kēḷir");
    L.push(T("dapp.msgSignedAt", "Signed at") + " " + new Date().toISOString());
    return L.join("\n");
  }

  /* ---- rendering ---- */
  function renderConnected() {
    els.connect.hidden = true;
    els.signblock.hidden = false;
    els.status.innerHTML = `<span class="dapp-dot"></span> ${short(account)}${chainId ? " · " + netName(chainId) : ""}`;
    els.sign.textContent = T("dapp.sign", "Sign my pledge");
    els.disconnect.textContent = T("dapp.disconnect", "Disconnect");
    // enrich with ENS name if available
    loadEthers().then(async (E) => {
      if (!E || !account || !EP()) return;
      try {
        const prov = new E.BrowserProvider(EP());
        const name = await prov.lookupAddress(account);
        if (name) els.status.innerHTML = `<span class="dapp-dot"></span> ${name} · ${short(account)}`;
      } catch {}
    });
  }
  function renderDisconnected() {
    els.signblock.hidden = true;
    els.connect.hidden = false;
    els.connect.disabled = false;
    if (!EP()) {
      els.connect.textContent = T("dapp.getWallet", "Get a wallet");
      els.connect.classList.add("ghost");
      els.status.innerHTML = T("dapp.noWallet", "No Ethereum wallet detected. Install MetaMask or a compatible wallet to sign your pledge.");
    } else {
      els.connect.textContent = T("dapp.connect", "Connect wallet");
      els.connect.classList.remove("ghost");
      els.status.textContent = "";
    }
  }

  async function renderReceipt(rc, doVerify) {
    if (!rc) { els.receipt.hidden = true; els.receipt.innerHTML = ""; return; }
    els.receipt.hidden = false;
    els.receipt.innerHTML =
      `<div class="dapp-receipt-head">✓ <span>${T("dapp.sealed", "Pledge sealed")}</span></div>
       <p class="dapp-verify" id="dapp-verify">${T("dapp.verifying", "Verifying signature…")}</p>
       <div class="dapp-field"><span class="dapp-k">${T("dapp.addr", "Address")}</span><code>${short(rc.address)}</code></div>
       <div class="dapp-field"><span class="dapp-k">${T("dapp.sig", "Signature")}</span><code>${rc.signature.slice(0, 22)}…${rc.signature.slice(-6)}</code></div>
       <div class="dapp-actions">
         <button class="btn ghost" id="dapp-copy">${T("dapp.copy", "Copy attestation")}</button>
         <button class="btn ghost" id="dapp-clear">${T("dapp.clear", "Remove")}</button>
       </div>`;
    $("#dapp-copy").addEventListener("click", () => {
      navigator.clipboard.writeText(JSON.stringify(rc, null, 2)).then(() => flash("#dapp-copy", T("dapp.copied", "Copied ✓")));
    });
    $("#dapp-clear").addEventListener("click", () => { store.del("dapp_receipt"); renderReceipt(null); });

    const verifyEl = $("#dapp-verify");
    if (doVerify === false) { verifyEl.textContent = T("dapp.captured", "Signature captured — verify it anywhere against your address."); return; }
    const E = await loadEthers();
    if (!E) { verifyEl.textContent = T("dapp.captured", "Signature captured — verify it anywhere against your address."); return; }
    try {
      const recovered = E.verifyMessage(rc.message, rc.signature);
      if (recovered.toLowerCase() === rc.address.toLowerCase()) {
        verifyEl.innerHTML = `<span class="dapp-ok">✓</span> ${T("dapp.verifiedBy", "Verified — cryptographically signed by")} <code>${short(recovered)}</code>`;
      } else {
        verifyEl.innerHTML = `<span class="dapp-bad">✕</span> ${T("dapp.mismatch", "Signature does not match this address.")}`;
      }
    } catch {
      verifyEl.textContent = T("dapp.captured", "Signature captured — verify it anywhere against your address.");
    }
  }

  function flash(sel, msg) {
    const b = $(sel); if (!b) return; const old = b.textContent; b.textContent = msg;
    setTimeout(() => { if (b) b.textContent = old; }, 1800);
  }

  /* ---- actions ---- */
  function attachWalletEvents() {
    const p = EP();
    if (!p || !p.on || listening) return;
    listening = true;
    p.on("accountsChanged", (a) => { account = a && a[0] || null; if (account) renderConnected(); else disconnect(); });
    p.on("chainChanged", (id) => { chainId = id; if (account) renderConnected(); });
  }

  async function connect() {
    const p = EP();
    if (!p) { window.open("https://metamask.io/download/", "_blank", "noopener"); return; }
    els.connect.disabled = true;
    els.connect.textContent = T("dapp.connecting", "Connecting…");
    try {
      const accts = await p.request({ method: "eth_requestAccounts" });
      account = accts && accts[0] || null;
      try { chainId = await p.request({ method: "eth_chainId" }); } catch {}
      if (account) { attachWalletEvents(); loadEthers(); renderConnected(); }
      else renderDisconnected();
    } catch (e) {
      renderDisconnected();
      els.status.textContent = (e && e.code === 4001) ? T("dapp.cancelled", "Connection cancelled.") : T("dapp.connectErr", "Could not connect.");
    }
  }

  async function signPledge() {
    if (!account) return;
    if (!hasCommitment()) { els.status.textContent = T("dapp.needPledge", "Tick at least one pillar or write a reflection above first."); return; }
    const p = EP();
    if (!p) return;
    els.sign.disabled = true; els.sign.textContent = T("dapp.signing", "Check your wallet…");
    const message = buildMessage();
    try {
      const signature = await p.request({ method: "personal_sign", params: [toUtf8Hex(message), account] });
      const rc = { app: "TamilIdentity∞", address: account, chain: netName(chainId) || chainId, message, signature, signedAt: new Date().toISOString() };
      store.set("dapp_receipt", rc);
      renderReceipt(rc);
      els.status.textContent = "";
    } catch (e) {
      els.status.textContent = (e && e.code === 4001) ? T("dapp.signCancelled", "Signing cancelled.") : T("dapp.signErr", "Could not sign.");
    } finally {
      els.sign.disabled = false; els.sign.textContent = T("dapp.sign", "Sign my pledge");
    }
  }

  function disconnect() {
    // dApps can't force-revoke; we just clear local session state.
    account = null; chainId = null;
    renderDisconnected();
  }

  els.connect.addEventListener("click", connect);
  els.sign.addEventListener("click", signPledge);
  els.disconnect.addEventListener("click", disconnect);

  /* ---- language change: re-render dApp strings ---- */
  document.addEventListener("ti:langchange", () => {
    if (account) renderConnected(); else renderDisconnected();
    const rc = store.get("dapp_receipt", null);
    if (rc) renderReceipt(rc);
  });

  /* ---- init: silent session restore + prior receipt ---- */
  renderDisconnected();
  const savedRc = store.get("dapp_receipt", null);
  if (savedRc) renderReceipt(savedRc);
  const p0 = EP();
  if (p0) {
    p0.request({ method: "eth_accounts" }).then((a) => {
      if (a && a[0]) { account = a[0]; attachWalletEvents(); p0.request({ method: "eth_chainId" }).then(id => { chainId = id; renderConnected(); }).catch(renderConnected); }
    }).catch(() => {});
  }
})();
