# WANDERIFY — Product Requirements Document

---

> **Stake. Travel. Prove. Earn.**
> A gamified travel commitment protocol on Polygon PoS.

---

## 1. Vision & Problem Statement

### The Problem
Most people *intend* to travel but never follow through. Financial commitment is a powerful behavioral nudge—but traditional deposits offer no upside.

### The Solution
**Wanderify** lets users stake MATIC on a destination. Arrive and verify → **earn rewards from the failure pool**. Miss your trip → your stake incentivizes successful travelers.

---

## 2. User Personas

| Persona | Goals | Pain Points |
|---------|-------|-------------|
| **Wanderer (Core User)** | Visit bucket-list destinations, earn crypto rewards | Procrastination, travel costs, no accountability |
| **Collector** | Build a portfolio of Journey NFTs | Needs proof of travel, social bragging rights |
| **Explorer** | Discover new places, compare pools | Information overload, decision paralysis |

---

## 3. Core Features

### 3.1 Stake to Travel
- User selects a destination on interactive globe/map.
- Commits MATIC (minimum stake: 1 MATIC).
- Sets travel date (minimum 15 days out).
- Gasless transaction via Biconomy.

### 3.2 Navigate & Arrive
- In-app navigation using Mapbox Directions.
- Proximity zones: Red (>500m) → Blue (>100m) → Orange (>50m) → Green (≤50m).
- Real-time distance updates via GPS.

### 3.3 Verify & Earn
- User triggers "Check In" when in Green Zone.
- Backend verifies location via ZK Proof (Polygon ID).
- Smart contract releases:
  - Original stake.
  - Bonus from destination's failure pool (proportional to stake + difficulty).
- User mints **Journey NFT** as proof of visit.

### 3.4 Failure Redistribution
- If user doesn't verify within 24hr window after travel date:
  - Stake is forfeited to destination pool.
  - 4% platform fee deducted.
  - Chainlink Keepers auto-process expired commitments.

---

## 4. User Flows

### 4.1 Onboarding
1. Land on marketing page.
2. Connect Wallet (RainbowKit).
3. Optional: Create Polygon ID for ZK verification.

### 4.2 Commitment Flow
1. Explore destinations (Globe or List view).
2. Click destination → View pool, difficulty, reward estimate.
3. Click "Stake to Travel" → Select amount, confirm date.
4. Approve gasless transaction.
5. Commitment created → Appears in Dashboard.

### 4.3 Verification Flow
1. Open Dashboard on mobile.
2. Select active commitment → "Navigate".
3. Arrive at destination (Green Zone).
4. Tap "Verify Arrival".
5. Generate ZK Proof → Submit → Reward + NFT minted.

---

## 5. Information Architecture

```
/                     → Landing Page (Hero, How it Works, CTA)
/explore              → Interactive Globe, Destination Cards
/dashboard            → My Journeys, Active Commitments, Stats
/leaderboard          → Top Travelers, XP Rankings
/profile/:address     → Public profile, NFT Collection
/destination/:id      → Destination Detail, Pool Stats
```

---

## 6. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **Latency** | API responses < 200ms (p95) |
| **Uptime** | 99.9% SLA |
| **Mobile UX** | PWA, offline-capable navigation |
| **Security** | ZK verification, no raw GPS on-chain |
| **Gas Costs** | $0 for user (sponsored via Biconomy) |

---

## 7. Success Metrics

| Metric | Definition | Target (6mo) |
|--------|------------|--------------|
| **WAU** | Unique wallet connections/week | 10,000 |
| **Conversion Rate** | Visitors → Stakers | 15% |
| **Completion Rate** | Stakers who verify | 60% |
| **TVL** | Total MATIC staked | $500K |
| **NFT Mints** | Journey NFTs minted | 5,000 |

---

## 8. Roadmap

### Phase 1: MVP (Current)
- Core staking + verification flow.
- 50 curated destinations.
- Basic leaderboard.

### Phase 2: Social Layer
- Follow travelers, share journeys.
- Referral rewards.
- Destination reviews.

### Phase 3: Advanced Gamification
- Achievement badges.
- Streak bonuses.
- Tier-based rewards (Bronze → Platinum).

### Phase 4: Ecosystem Expansion
- Partner integrations (Hotels, Airlines).
- Multi-chain deployment.
- DAO governance.

---

<p align="center">
  <strong>WANDERIFY</strong><br>
  PRD v1.0 — January 2026
</p>
