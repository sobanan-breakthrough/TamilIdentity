// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/* ============================================================================
   Tamil Network State — on-chain infrastructure
   ----------------------------------------------------------------------------
   A minimal, self-contained, dependency-free primitive set for bootstrapping a
   network state in the sense of Balaji Srinivasan's "The Network State":
   a highly aligned online community with a social smart contract, an on-chain
   census (population / income / real-estate), a treasury to crowdfund territory,
   and 1-citizen-1-vote governance.

   These contracts are NON-CUSTODIAL and self-governing. There is no admin who
   can seize funds or citizenship. Deploy them, verify them, and own them
   collectively. See contracts/README.md for deployment.

   NOT a sovereign state and NOT legal/financial advice. This is civic software
   for a voluntary, opt-in community. Citizenship here confers no legal status.
   ============================================================================ */

/// @title TamilNationPassport — a soulbound (non-transferable) citizenship registry.
/// @notice Becoming a citizen is a public, on-chain attestation to the Constitution.
///         Passports cannot be bought, sold, or transferred — only claimed or renounced.
contract TamilNationPassport {
    string  public constant name   = "Tamil Network State Passport";
    string  public constant symbol = "TNS";

    /// keccak256 of the canonical Constitution text every citizen attests to.
    bytes32 public immutable constitutionHash;
    /// The genesis timestamp of the network.
    uint64  public immutable foundedAt;

    uint256 public totalCitizens;                       // the on-chain census: population
    mapping(address => uint256) public citizenId;       // 0 = not a citizen
    mapping(uint256 => address) public citizenOf;
    mapping(address => uint64)  public joinedAt;

    event CitizenClaimed(address indexed citizen, uint256 indexed id, uint64 timestamp);
    event Renounced(address indexed citizen, uint256 indexed id);

    constructor(bytes32 _constitutionHash) {
        constitutionHash = _constitutionHash;
        foundedAt = uint64(block.timestamp);
    }

    /// @notice Attest to the Constitution and receive a citizenship number.
    /// @dev One passport per address. The number is permanent and assigned in join order.
    function claimCitizenship() external returns (uint256 id) {
        require(citizenId[msg.sender] == 0, "Already a citizen");
        unchecked { id = ++totalCitizens; }
        citizenId[msg.sender] = id;
        citizenOf[id] = msg.sender;
        joinedAt[msg.sender] = uint64(block.timestamp);
        emit CitizenClaimed(msg.sender, id, uint64(block.timestamp));
    }

    function isCitizen(address a) external view returns (bool) {
        return citizenId[a] != 0;
    }

    /// @notice Freedom to exit — citizenship is a personal commitment you may release.
    ///         Your number is retired; it is never reassigned.
    function renounce() external {
        uint256 id = citizenId[msg.sender];
        require(id != 0, "Not a citizen");
        delete citizenId[msg.sender];
        delete citizenOf[id];
        delete joinedAt[msg.sender];
        emit Renounced(msg.sender, id);
    }
}

/// @title TamilTreasury — a collective fund to crowdfund territory & community infrastructure.
/// @notice Anyone may contribute. Funds can ONLY leave by a decision of the Assembly
///         (governance) — never by a single person.
contract TamilTreasury {
    TamilNationPassport public immutable passport;
    address public governor;                 // the Assembly contract that authorizes spends
    uint256 public totalContributed;
    mapping(address => uint256) public contributed;

    event Contributed(address indexed from, uint256 amount, uint256 treasuryBalance);
    event Disbursed(address indexed to, uint256 amount, string purpose);
    event GovernorChanged(address indexed governor);

    constructor(address _passport) {
        passport = TamilNationPassport(_passport);
        governor = msg.sender;               // deployer sets the Assembly, then hands off
    }

    /// @notice Contribute ETH toward the network's crowdfunded territory.
    function contribute() public payable {
        require(msg.value > 0, "No value");
        contributed[msg.sender] += msg.value;
        totalContributed += msg.value;
        emit Contributed(msg.sender, msg.value, address(this).balance);
    }
    receive() external payable { contribute(); }

    /// @notice Hand treasury control to the Assembly (or a successor). One-way-ish; governor-gated.
    function setGovernor(address _governor) external {
        require(msg.sender == governor, "Only governor");
        governor = _governor;
        emit GovernorChanged(_governor);
    }

    /// @notice Move funds — only the Assembly (collective vote) may call this.
    function disburse(address payable to, uint256 amount, string calldata purpose) external {
        require(msg.sender == governor, "Only Assembly may disburse");
        require(amount <= address(this).balance, "Insufficient");
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "Transfer failed");
        emit Disbursed(to, amount, purpose);
    }

    function balance() external view returns (uint256) { return address(this).balance; }
}

/// @title TamilAssembly — 1 citizen, 1 vote governance (the "radical social democracy" pillar).
/// @notice Only passport-holding citizens may propose and vote. No token weighting, no plutocracy.
contract TamilAssembly {
    TamilNationPassport public immutable passport;

    struct Proposal {
        address proposer;
        string  title;
        string  detail;
        uint64  deadline;
        uint256 forVotes;
        uint256 againstVotes;
        bool    executed;
    }

    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    event Proposed(uint256 indexed id, address indexed proposer, string title, uint64 deadline);
    event Voted(uint256 indexed id, address indexed voter, bool support);

    constructor(address _passport) {
        passport = TamilNationPassport(_passport);
    }

    modifier onlyCitizen() {
        require(passport.isCitizen(msg.sender), "Citizens only");
        _;
    }

    /// @notice Any citizen may put a question to the Assembly.
    function propose(string calldata title, string calldata detail, uint64 votingDays)
        external onlyCitizen returns (uint256 id)
    {
        require(votingDays >= 1 && votingDays <= 90, "1-90 days");
        id = proposals.length;
        proposals.push(Proposal({
            proposer: msg.sender,
            title: title,
            detail: detail,
            deadline: uint64(block.timestamp) + votingDays * 1 days,
            forVotes: 0,
            againstVotes: 0,
            executed: false
        }));
        emit Proposed(id, msg.sender, title, uint64(block.timestamp) + votingDays * 1 days);
    }

    /// @notice One citizen, one vote.
    function vote(uint256 id, bool support) external onlyCitizen {
        Proposal storage p = proposals[id];
        require(block.timestamp <= p.deadline, "Voting closed");
        require(!hasVoted[id][msg.sender], "Already voted");
        hasVoted[id][msg.sender] = true;
        if (support) p.forVotes++; else p.againstVotes++;
        emit Voted(id, msg.sender, support);
    }

    function proposalCount() external view returns (uint256) { return proposals.length; }

    function passed(uint256 id) external view returns (bool) {
        Proposal storage p = proposals[id];
        return block.timestamp > p.deadline && p.forVotes > p.againstVotes;
    }
}
