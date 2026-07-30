/* ============================================================================
   Tamil Network State — deployment configuration
   ----------------------------------------------------------------------------
   Leave addresses empty for GENESIS MODE: the Constitution + signature-based
   founding citizenship work with no contracts and no funds ever moved.

   Once the community deploys contracts/TamilNetworkState.sol (see
   contracts/README.md), paste the addresses here and the census, on-chain
   citizenship, treasury, and voting go LIVE — read and written straight from
   each citizen's own wallet.
   ============================================================================ */
window.TNS_CONFIG = {
  chainId: "",        // e.g. "0x2105" (Base) or "0x14a34" (Base Sepolia)
  chainName: "",      // e.g. "Base"
  passport: "",       // TamilNationPassport address
  treasury: "",       // TamilTreasury address
  assembly: "",       // TamilAssembly address
  explorer: "",       // e.g. "https://basescan.org"
  rpc: "",            // optional public RPC URL to read the census without a wallet
  // Crowdfunded physical nodes (the "archipelago") — a manually-curated list
  // until an on-chain land registry exists. Genesis: empty.
  nodes: []           // e.g. [{ name: "Chennai hub", kind: "co-living", url: "" }]
};
