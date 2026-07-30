# Tamil Network State — On-Chain Infrastructure

The deployable primitives that turn TamilIdentity∞ from a *sense of national
consciousness* into a **network state** in the sense of Balaji Srinivasan's
[*The Network State*](https://thenetworkstate.com/): a highly aligned online
community with a social smart contract, an on-chain census, a treasury to
crowdfund territory, and collective governance.

> **This is civic software, not a sovereign state.** Citizenship here is a
> voluntary, opt-in commitment and confers **no legal status**. Nothing here is
> legal or financial advice. Deploy and use at your own discretion, and comply
> with the laws of your jurisdiction.

## Contracts (`TamilNetworkState.sol`)

| Contract | Role | Network-state primitive |
|---|---|---|
| `TamilNationPassport` | Soulbound (non-transferable) citizenship registry | **On-chain census — population** |
| `TamilTreasury` | Collective fund; spends only by Assembly vote | **On-chain census — income** |
| `TamilAssembly` | 1 citizen = 1 vote proposals & voting | **Consensual government / social smart contract** |

Design principles:
- **Non-custodial** — no admin key can seize funds or citizenship.
- **Soulbound** — passports cannot be bought, sold, or transferred, only claimed or renounced (freedom to exit).
- **1 citizen, 1 vote** — no token weighting, embodying the *radical social democracy* pillar.

## Deploy (Remix — no local setup)

1. Open [remix.ethereum.org](https://remix.ethereum.org), create `TamilNetworkState.sol`, paste the file.
2. Compile with Solidity `0.8.20+`.
3. Compute the Constitution hash. In the browser console of the live site (or any ethers 6 environment):
   ```js
   ethers.keccak256(ethers.toUtf8Bytes(window.TNS_CONSTITUTION_TEXT))
   ```
   `window.TNS_CONSTITUTION_TEXT` is exposed by the site's `network-state.js`.
4. Deploy `TamilNationPassport(constitutionHash)`. Copy its address.
5. Deploy `TamilTreasury(passportAddress)` and `TamilAssembly(passportAddress)`.
6. Call `treasury.setGovernor(assemblyAddress)` so only the Assembly can disburse funds.
7. (Recommended) Verify all three contracts on the block explorer so citizens can audit them.

Start on a testnet (**Base Sepolia** or **Sepolia**) before mainnet.

## Deploy (Foundry)

```bash
forge create contracts/TamilNetworkState.sol:TamilNationPassport \
  --constructor-args <CONSTITUTION_HASH> --rpc-url <RPC> --private-key <KEY>
# then TamilTreasury and TamilAssembly with the passport address, then setGovernor
```

## Connect the front-end

Put the deployed addresses into [`assets/js/ns-config.js`](../assets/js/ns-config.js):

```js
window.TNS_CONFIG = {
  chainId: "0x2105",              // e.g. Base mainnet; "0x14a34" = Base Sepolia
  chainName: "Base",
  passport:  "0x…",               // TamilNationPassport
  treasury:  "0x…",               // TamilTreasury
  assembly:  "0x…",               // TamilAssembly
  explorer:  "https://basescan.org"
};
```

The moment these are set, the site's **Network State** section goes live: the
census reads real population and treasury balance on-chain, citizens can claim
their passport, contribute to the treasury, and vote — all directly from their
own wallet. Until then the section runs in **genesis mode** (constitution +
signature-based founding citizenship, no funds ever moved).

## Security notes

- Audit before mainnet. These contracts are intentionally small and readable, but unaudited.
- `TamilTreasury.disburse` is the only exit for funds and is gated to the Assembly; set the governor to the Assembly immediately after deployment and consider renouncing the deployer's ability to change it via a further `setGovernor` to a timelock.
- Consider a timelock/multisig as the initial governor while the citizen base is small.
