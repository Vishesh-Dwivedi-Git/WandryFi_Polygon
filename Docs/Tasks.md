# Project Tasks: Wanderify

Derived from `Docs/PRD.md`, `Docs/Techstack.md`, and `Docs/Desgin.md`.

---

## Phase 1: Infrastructure & Environment Setup

- [ ] **Repository Initialization**
  - [ ] Initialize Git repository.
  - [ ] Configure `.gitignore` for Node.js, Foundry, and Environment files.
  - [ ] Set up folder structure: `client/`, `contracts/`, `server/`, `Docs/`.

- [ ] **CI/CD Pipeline**
  - [ ] Create `.github/workflows/deploy.yml`.
  - [ ] Configure "Test" job (Foundry tests, Vitest).
  - [ ] Configure "Deploy" job (Vercel frontend, Railway backend).
  - [ ] Add secrets (`VERCEL_TOKEN`, `POLYGON_RPC`, `BICONOMY_*`).

- [ ] **Developer Experience**
  - [ ] Install Prettier + ESLint with strict configs.
  - [ ] Set up Husky for pre-commit hooks.
  - [ ] Create `.env.example` templates.

---

## Phase 2: Smart Contracts (Polygon PoS)

**Stack**: Solidity 0.8.20+, Foundry, OpenZeppelin.

- [ ] **Foundry Setup**
  - [ ] Initialize Foundry project.
  - [ ] Configure `foundry.toml` (optimizer: 200, solc: 0.8.20).
  - [ ] Install: `openzeppelin-contracts`, `forge-std`.

- [ ] **Core Logic: `WandryFi.sol`**
  - [ ] Define Constants (`MIN_STAKE_DURATION=15 days`, `CLAIM_WINDOW=1 day`, `BASE_REWARD=0.002 MATIC`).
  - [ ] Implement `stake(destinationId, travelDate)`.
  - [ ] Implement `checkIn(commitmentId, signature)`.
  - [ ] Implement `processFailure(commitmentId)` for expired stakes.
  - [ ] View functions: `getPoolBalance`, `getCommitment`, `calculateReward`.
  - [ ] Events: `Staked`, `CheckedIn`, `FailureProcessed`.
  - [ ] Chainlink Keepers: `checkUpkeep`, `performUpkeep`.

- [ ] **NFT: `JourneyNFT.sol`**
  - [ ] ERC-721 implementation.
  - [ ] Metadata URI → IPFS.
  - [ ] Minting restricted to `WandryFi.sol`.

- [ ] **Testing & Deployment**
  - [ ] `test/WandryFi.t.sol`: Unit tests (stake, success, failure).
  - [ ] `test/Integration.t.sol`: End-to-end tests.
  - [ ] `script/Deploy.s.sol`: Deployment to Polygon/Amoy.
  - [ ] `script/SeedDestinations.s.sol`: Initial 50 destinations.

---

## Phase 3: Backend API (Hono + Railway)

**Stack**: Node.js 20, Hono, PostgreSQL (Prisma), Redis, Zod.

- [ ] **Server Initialization**
  - [ ] Initialize Hono project.
  - [ ] CORS + Security headers.
  - [ ] Zod Validator middleware.

- [ ] **Database Layer**
  - [ ] Initialize Prisma.
  - [ ] Schema: `User`, `Destination`, `Commitment`, `Journey`.
  - [ ] Seed 50 curated destinations.

- [ ] **Caching & Rate Limiting (Redis)**
  - [ ] Upstash Redis client.
  - [ ] `cache.getPoolBalance` (5 min TTL).
  - [ ] `cache.getLeaderboard` (1 hr TTL).
  - [ ] IP-based rate limiting middleware.

- [ ] **API Endpoints**
  - [ ] `POST /api/verify`: ZK proof validation, Haversine check (<50m), ECDSA sig.
  - [ ] `GET /api/destinations`: Destinations with pool data.
  - [ ] `GET /api/user/:address`: Profile + commitments.
  - [ ] `GET /api/leaderboard`: Top travelers by XP.

---

## Phase 4: Frontend Application (Next.js)

**Stack**: Next.js 15, Tailwind, Shadcn UI, Wagmi, Framer Motion.

### 4.1 Foundation
- [ ] **Project Bootstrapping**
  - [ ] Create Next.js app (TS, Tailwind, ESLint).
  - [ ] Strict `tsconfig.json`.
  - [ ] Configure `tailwind.config.ts` with Design System tokens.

- [ ] **Design System Implementation**
  - [ ] Colors: `surface-*`, `accent-*` from Desgin.md.
  - [ ] Typography: Inter + JetBrains Mono.
  - [ ] Spacing: 8px grid system.
  - [ ] Component patterns: Holographic glass cards.

- [ ] **Component Library**
  - [ ] Install Shadcn UI: `button`, `card`, `dialog`, `input`, `toast`.
  - [ ] Build `MainLayout` (Navbar, Footer).
  - [ ] Build `PageWrapper` for consistent margins.
  - [ ] Lucide React icons (1.5px stroke).

### 4.2 Web3 Integration
- [ ] **Wallet Connection**
  - [ ] Wagmi config (Polygon, Amoy chains).
  - [ ] RainbowKit provider setup.
  
- [ ] **Gasless Transactions**
  - [ ] Biconomy SDK integration.
  - [ ] `useGasless` hook.

- [ ] **Contract Hooks**
  - [ ] `useStake`: Connect to `WandryFi.stake`.
  - [ ] `useCheckIn`: Connect to `WandryFi.checkIn`.
  - [ ] `usePoolBalance`: Fetch destination pool.

### 4.3 Feature Pages

- [ ] **Landing Page (`/`)**
  - [ ] Hero section with CTA.
  - [ ] "How it Works" (3-step visual).
  - [ ] Feature highlights.
  - [ ] GSAP ScrollTrigger animations.

- [ ] **Explore Page (`/explore`)**
  - [ ] Interactive Mapbox globe.
  - [ ] Destination markers (clickable).
  - [ ] Destination cards with pool/difficulty/reward.
  - [ ] "Stake to Travel" modal workflow.

- [ ] **Dashboard (`/dashboard`)**
  - [ ] My Journeys: Active vs Past.
  - [ ] User Stats: Total distance, reputation.
  - [ ] "TVL Over Time" chart.
  - [ ] Quick actions: Navigate, Verify.

- [ ] **Leaderboard (`/leaderboard`)**
  - [ ] Top Travelers table.
  - [ ] XP rankings.
  - [ ] NFT collection preview.

- [ ] **Verification Flow (Mobile-first)**
  - [ ] Proximity zones UI: Red → Blue → Orange → Green.
  - [ ] Real-time distance display.
  - [ ] Location permission handling.
  - [ ] "Check In" button (Green Zone only).
  - [ ] ZK Proof generation feedback.
  - [ ] Success celebration animation.

### 4.4 Animation & Polish
- [ ] Framer Motion page transitions (500ms, `ease-smooth`).
- [ ] Micro-interactions (hover, loading states).
- [ ] Glow pulse on active elements.
- [ ] Lottie animations for journey celebration.


---

## Phase 5: Verification & Deployment

- [ ] **Final Checks**
  - [ ] Run full test suite (`forge test`, `pnpm test`).
  - [ ] Verify all env vars in Vercel/Railway.
  - [ ] Security audit for hardcoded secrets.

- [ ] **Deployment**
  - [ ] Deploy contracts to Polygon Mainnet (verify on PolygonScan).
  - [ ] Deploy backend to Railway.
  - [ ] Deploy frontend to Vercel (Production).

- [ ] **Post-Deployment**
  - [ ] Fund Biconomy Paymaster.
  - [ ] E2E sanity check: Stake → Travel → Verify flow.
  - [ ] Monitor with Sentry + Posthog.

---

## Phase 6: Post-MVP (Roadmap)

- [ ] **Social Layer**
  - [ ] Follow travelers.
  - [ ] Share journeys.
  - [ ] Referral rewards.

- [ ] **Advanced Gamification**
  - [ ] Achievement badges.
  - [ ] Streak bonuses.
  - [ ] Tier system (Bronze → Platinum).

- [ ] **Ecosystem Expansion**
  - [ ] Partner integrations (Hotels, Airlines).
  - [ ] Multi-chain deployment.
  - [ ] DAO governance.

---

<p align="center">
  <strong>WANDERIFY</strong><br>
  Tasks v1.1 — January 2026
</p>
