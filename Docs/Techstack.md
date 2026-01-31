# WANDERIFY

## Tech Stack. **Engineered.**

---

> Every layer optimized for speed, security, and seamless UX.
> From on-chain contracts to gasless interactions.

---

## Stack Philosophy

### "Zero-Friction Web3"

The architecture prioritizes **invisible complexity**. Users should feel like they're using a premium travel app — not wrestling with blockchain.

| Principle | Implementation |
|-----------|----------------|
| **Gasless First** | Biconomy meta-transactions on every write |
| **Progressive Web3** | Works without wallet, rewards with wallet |
| **Mobile Native** | PWA with offline navigation capability |
| **Verification Trust** | ZK proofs over raw GPS exposure |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│   │   Next.js   │    │   Mobile    │    │    PWA      │    │   Wallet    │ │
│   │   Web App   │    │  (React     │    │  (Offline   │    │  Extension  │ │
│   │             │    │   Native)   │    │   Support)  │    │  (Future)   │ │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘    └──────┬──────┘ │
│          │                  │                  │                  │        │
│          └──────────────────┴──────────────────┴──────────────────┘        │
│                                      │                                      │
└──────────────────────────────────────┼──────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐      │
│   │   REST API       │    │   Verification   │    │   Biconomy       │      │
│   │   (Express/Hono) │    │   Service        │    │   Relayer        │      │
│   │                  │    │   (Polygon ID)   │    │   (Gasless TX)   │      │
│   └────────┬─────────┘    └────────┬─────────┘    └────────┬─────────┘      │
│            │                       │                       │                 │
│            └───────────────────────┴───────────────────────┘                 │
│                                    │                                         │
└────────────────────────────────────┼─────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           BLOCKCHAIN LAYER                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐      │
│   │   WandryFi.sol   │    │   Polygon ID     │    │   Chainlink      │      │
│   │   (Core Logic)   │    │   (ZK Proofs)    │    │   (Keepers +     │      │
│   │                  │    │                  │    │    Oracles)      │      │
│   └──────────────────┘    └──────────────────┘    └──────────────────┘      │
│                                                                              │
│                         POLYGON PoS MAINNET                                  │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                            DATA LAYER                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐      │
│   │   PostgreSQL     │    │   Redis          │    │   IPFS/Pinata    │      │
│   │   (User Data,    │    │   (Session,      │    │   (NFT Metadata, │      │
│   │    Destinations) │    │    Rate Limits)  │    │    Images)       │      │
│   └──────────────────┘    └──────────────────┘    └──────────────────┘      │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Frontend Stack

### Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 15.x | App Router, SSR, API Routes |
| **React** | 19.x | UI Components (Strict Mode) |
| **TypeScript** | 5.x | Type Safety |

```json
{
  "framework": {
    "name": "Next.js 15",
    "router": "App Router",
    "rendering": "Hybrid (SSR + CSR)",
    "api": "Route Handlers"
  }
}
```

### Styling System

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | 3.4.x | Utility-first styling |
| **tailwind-merge** | 2.x | Class conflict resolution |
| **clsx** | 2.x | Conditional classes |
| **CVA** | 0.7.x | Component variants |

```javascript
// tailwind.config.ts
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          base: '#0D0D0D',
          card: '#1A1A1A',
          elevated: '#242424',
          hover: '#2A2A2A',
        },
        accent: {
          primary: '#3B8BEB',
          glow: '#4A9EFF',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

### Animation Layer

| Technology | Version | Purpose |
|------------|---------|---------|
| **GSAP** | 3.12.x | Complex timelines, ScrollTrigger |
| **Framer Motion** | 11.x | React-native micro-interactions |
| **Lottie React** | 2.x | Journey celebration animations |

```javascript
// Animation patterns
const easings = {
  standard: 'cubic-bezier(0.25, 1, 0.5, 1)',    // UI interactions
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',       // Page transitions
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',  // Success states
}
```

### UI Components

| Technology | Version | Purpose |
|------------|---------|---------|
| **shadcn/ui** | Latest | Base component primitives |
| **Radix UI** | Latest | Accessible primitives |
| **Lucide React** | 0.300.x | Icons (1.5px stroke) |

### State Management

| Technology | Version | Purpose |
|------------|---------|---------|
| **Zustand** | 4.x | Global state (minimal boilerplate) |
| **TanStack Query** | 5.x | Server state, caching |
| **nuqs** | 1.x | URL search params state |

```typescript
// stores/journey.ts
import { create } from 'zustand'

interface JourneyState {
  activeCommitment: Commitment | null
  distance: number
  zone: 'red' | 'blue' | 'orange' | 'green'
  setDistance: (d: number) => void
}

export const useJourneyStore = create<JourneyState>((set) => ({
  activeCommitment: null,
  distance: Infinity,
  zone: 'red',
  setDistance: (distance) => set({ 
    distance,
    zone: distance > 500 ? 'red' : 
          distance > 100 ? 'blue' : 
          distance > 50 ? 'orange' : 'green'
  }),
}))
```

---

## Web3 Stack

### Wallet Connection

| Technology | Version | Purpose |
|------------|---------|---------|
| **wagmi** | 2.x | React hooks for Ethereum |
| **viem** | 2.x | TypeScript Ethereum client |
| **RainbowKit** | 2.x | Wallet connection UI |

```typescript
// lib/wagmi.ts
import { createConfig, http } from 'wagmi'
import { polygon, polygonAmoy } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

export const config = getDefaultConfig({
  appName: 'Wanderify',
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
  chains: [polygon, polygonAmoy],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
})
```

### Contract Interaction

| Technology | Version | Purpose |
|------------|---------|---------|
| **ethers.js** | 6.x | Contract calls (legacy compat) |
| **Typechain** | 8.x | Type-safe contract interfaces |

```typescript
// hooks/useWanderify.ts
import { useReadContract, useWriteContract } from 'wagmi'
import { wandryfiAbi } from '@/lib/contracts/wandryfi'

export function useStake() {
  const { writeContract, isPending } = useWriteContract()
  
  const stake = async (destinationId: number, amount: bigint, travelDate: number) => {
    writeContract({
      address: WANDRYFI_ADDRESS,
      abi: wandryfiAbi,
      functionName: 'stake',
      args: [destinationId, travelDate],
      value: amount,
    })
  }
  
  return { stake, isPending }
}
```

### Gasless Transactions

| Technology | Version | Purpose |
|------------|---------|---------|
| **Biconomy SDK** | 4.x | Meta-transactions, Paymaster |
| **Account Abstraction** | ERC-4337 | Smart accounts |

```typescript
// lib/biconomy.ts
import { createSmartAccountClient } from '@biconomy/account'
import { createWalletClient, http } from 'viem'
import { polygon } from 'viem/chains'

export async function getGaslessClient(signer: WalletClient) {
  const smartAccount = await createSmartAccountClient({
    signer,
    bundlerUrl: process.env.BICONOMY_BUNDLER_URL!,
    paymasterUrl: process.env.BICONOMY_PAYMASTER_URL!,
  })
  
  return smartAccount
}
```

### ZK Verification

| Technology | Version | Purpose |
|------------|---------|---------|
| **Polygon ID SDK** | Latest | ZK identity, location credentials |
| **iden3** | Latest | ZK circuits |

```typescript
// services/verification.ts
import { PolygonIdSdk } from '@0xpolygonid/js-sdk'

export async function verifyLocation(
  userDid: string,
  destinationCoords: { lat: number; lng: number },
  userCoords: { lat: number; lng: number }
) {
  // Generate ZK proof that user is within 50m
  // without exposing exact coordinates
  const proof = await sdk.generateLocationProof({
    did: userDid,
    claim: {
      type: 'LocationProximity',
      target: destinationCoords,
      radius: 50, // meters
    },
    position: userCoords,
  })
  
  return proof
}
```

---

## Backend Stack

### API Server

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 20 LTS | Runtime |
| **Hono** | 4.x | Ultra-fast web framework |
| **Zod** | 3.x | Schema validation |

```typescript
// Alternative: Express for familiarity
// Primary: Hono for edge deployment

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()

app.use('*', cors())

// Verification endpoint
const verifySchema = z.object({
  commitmentId: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  zkProof: z.string(),
})

app.post('/api/verify', zValidator('json', verifySchema), async (c) => {
  const { commitmentId, latitude, longitude, zkProof } = c.req.valid('json')
  
  // 1. Validate ZK proof
  // 2. Check distance with Haversine
  // 3. Generate ECDSA signature
  // 4. Return signed verification
  
  return c.json({ signature, verified: true })
})

export default app
```

### Database Layer

| Technology | Version | Purpose |
|------------|---------|---------|
| **PostgreSQL** | 16.x | Primary database |
| **Prisma** | 5.x | ORM, migrations |
| **Redis** | 7.x | Caching, rate limiting, sessions |

```prisma
// prisma/schema.prisma
model User {
  id            String       @id @default(cuid())
  walletAddress String       @unique
  commitments   Commitment[]
  journeys      Journey[]
  createdAt     DateTime     @default(now())
}

model Destination {
  id          Int          @id @default(autoincrement())
  name        String
  country     String
  latitude    Float
  longitude   Float
  placeValue  Int          // 0-100 difficulty
  poolBalance BigInt       @default(0)
  commitments Commitment[]
}

model Commitment {
  id            Int         @id @default(autoincrement())
  user          User        @relation(fields: [userId], references: [id])
  userId        String
  destination   Destination @relation(fields: [destinationId], references: [id])
  destinationId Int
  amountInPool  BigInt
  travelDate    DateTime
  isProcessed   Boolean     @default(false)
  onChainId     Int?
  createdAt     DateTime    @default(now())
}

model Journey {
  id            Int      @id @default(autoincrement())
  user          User     @relation(fields: [userId], references: [id])
  userId        String
  destinationId Int
  reward        BigInt
  nftTokenId    Int?
  completedAt   DateTime @default(now())
}
```

### Caching Strategy

```typescript
// lib/redis.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
})

// Cache patterns
export const cache = {
  // Destination pools (5 min TTL)
  async getPoolBalance(destinationId: number) {
    const key = `pool:${destinationId}`
    const cached = await redis.get<string>(key)
    if (cached) return BigInt(cached)
    
    // Fetch from chain, cache result
    const balance = await fetchPoolFromChain(destinationId)
    await redis.setex(key, 300, balance.toString())
    return balance
  },
  
  // Leaderboard (1 hour TTL)
  async getLeaderboard() {
    return redis.zrevrange('leaderboard', 0, 99, { withScores: true })
  },
  
  // Rate limiting
  async checkRateLimit(ip: string, limit = 100) {
    const key = `ratelimit:${ip}`
    const current = await redis.incr(key)
    if (current === 1) await redis.expire(key, 3600)
    return current <= limit
  },
}
```

---

## Smart Contract Stack

### Development Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Foundry** | Latest | Testing, deployment, scripting |
| **Solidity** | 0.8.20+ | Contract language |
| **OpenZeppelin** | 5.x | Security primitives |

```toml
# foundry.toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc = "0.8.20"
optimizer = true
optimizer_runs = 200

[rpc_endpoints]
polygon = "${POLYGON_RPC_URL}"
amoy = "${AMOY_RPC_URL}"

[etherscan]
polygon = { key = "${POLYGONSCAN_API_KEY}" }
```

### Contract Structure

```
contracts/
├── src/
│   ├── WandryFi.sol              # Core protocol logic
│   ├── JourneyNFT.sol            # ERC-721 collectibles
│   └── interfaces/
│       ├── IWandryFi.sol
│       └── IVerifier.sol
├── script/
│   ├── Deploy.s.sol              # Deployment script
│   └── SeedDestinations.s.sol    # Initial data
├── test/
│   ├── WandryFi.t.sol
│   ├── JourneyNFT.t.sol
│   └── Integration.t.sol
└── foundry.toml
```

### Core Contract Interface

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IWandryFi {
    // ═══════════════════════════════════════════════════════════
    // EVENTS
    // ═══════════════════════════════════════════════════════════
    
    event Staked(
        uint256 indexed commitmentId,
        address indexed user,
        uint256 destinationId,
        uint256 amount,
        uint256 travelDate
    );
    
    event CheckedIn(
        uint256 indexed commitmentId,
        address indexed user,
        uint256 reward,
        uint256 nftTokenId
    );
    
    event FailureProcessed(
        uint256 indexed commitmentId,
        address indexed user,
        uint256 amountRetained
    );
    
    // ═══════════════════════════════════════════════════════════
    // CORE FUNCTIONS
    // ═══════════════════════════════════════════════════════════
    
    /// @notice Stake MATIC for a journey commitment
    /// @param destinationId The target destination
    /// @param travelDate Unix timestamp of planned arrival
    function stake(uint256 destinationId, uint256 travelDate) external payable;
    
    /// @notice Check in at destination with verification signature
    /// @param commitmentId The commitment to verify
    /// @param signature Backend verification signature
    function checkIn(uint256 commitmentId, bytes calldata signature) external;
    
    /// @notice Process failed journey (callable by anyone after window)
    /// @param commitmentId The expired commitment
    function processFailure(uint256 commitmentId) external;
    
    // ═══════════════════════════════════════════════════════════
    // VIEW FUNCTIONS
    // ═══════════════════════════════════════════════════════════
    
    function getPoolBalance(uint256 destinationId) external view returns (uint256);
    function getCommitment(uint256 commitmentId) external view returns (Commitment memory);
    function calculateReward(uint256 destinationId, uint256 stakeAmount) external view returns (uint256);
}
```

### Contract Constants

```solidity
// src/WandryFi.sol

// ═══════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════

uint256 public constant MIN_STAKE_DURATION = 15 days;
uint256 public constant CLAIM_WINDOW = 1 days;
uint256 public constant BASE_REWARD = 0.002 ether;  // 0.002 MATIC
uint256 public constant BETA = 50;                   // 0.5 scaled by 100
uint256 public constant MAX_POOL_EMISSION = 10;      // 10% max
uint256 public constant PLATFORM_FEE_PERCENT = 4;    // 4%
uint256 public constant CHECK_IN_RADIUS = 50;        // 50 meters
```

---

## Infrastructure Stack

### Deployment

| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend hosting, Edge Functions |
| **Railway** | Backend API, PostgreSQL |
| **Upstash** | Redis (serverless) |
| **Pinata** | IPFS pinning for NFT metadata |

```yaml
# vercel.json
{
  "framework": "nextjs",
  "regions": ["iad1", "sfo1", "fra1"],
  "env": {
    "NEXT_PUBLIC_CHAIN_ID": "137",
    "NEXT_PUBLIC_WANDRYFI_ADDRESS": "@wandryfi_address"
  }
}
```

### Monitoring & Analytics

| Service | Purpose |
|---------|---------|
| **Sentry** | Error tracking, performance |
| **Posthog** | Product analytics |
| **Dune Analytics** | On-chain metrics |
| **Tenderly** | Contract monitoring, alerts |

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Foundry
        uses: foundry-rs/foundry-toolchain@v1
      
      - name: Run Contract Tests
        run: forge test -vvv
      
      - name: Install Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install Dependencies
        run: pnpm install
      
      - name: Run Frontend Tests
        run: pnpm test
      
      - name: Build
        run: pnpm build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## External Services

### Maps & Navigation

| Service | Purpose |
|---------|---------|
| **Mapbox GL JS** | Interactive destination maps |
| **Mapbox Directions** | Navigation routing |
| **Turf.js** | Geospatial calculations |

```typescript
// hooks/useNavigation.ts
import * as turf from '@turf/turf'

export function useNavigation(destination: { lat: number; lng: number }) {
  const [userPosition, setUserPosition] = useState<GeolocationPosition | null>(null)
  
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      setUserPosition,
      console.error,
      { enableHighAccuracy: true, maximumAge: 5000 }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])
  
  const distance = useMemo(() => {
    if (!userPosition) return Infinity
    
    const from = turf.point([userPosition.coords.longitude, userPosition.coords.latitude])
    const to = turf.point([destination.lng, destination.lat])
    
    return turf.distance(from, to, { units: 'meters' })
  }, [userPosition, destination])
  
  return { distance, userPosition }
}
```

### Automation

| Service | Purpose |
|---------|---------|
| **Chainlink Keepers** | Automated failure processing |
| **Gelato** | Backup automation |

```solidity
// Chainlink Keeper compatible
function checkUpkeep(bytes calldata) 
    external 
    view 
    returns (bool upkeepNeeded, bytes memory performData) 
{
    // Find expired commitments
    uint256[] memory expired = getExpiredCommitments();
    upkeepNeeded = expired.length > 0;
    performData = abi.encode(expired);
}

function performUpkeep(bytes calldata performData) external {
    uint256[] memory expired = abi.decode(performData, (uint256[]));
    for (uint i = 0; i < expired.length; i++) {
        processFailure(expired[i]);
    }
}
```

---

## Security Stack

### Smart Contract Security

| Measure | Implementation |
|---------|----------------|
| **Reentrancy** | OpenZeppelin ReentrancyGuard |
| **Access Control** | Ownable + Role-based |
| **Pausability** | Emergency circuit breaker |
| **Signature Verification** | ECDSA with trusted verifier |

### API Security

| Measure | Implementation |
|---------|----------------|
| **Rate Limiting** | Redis-backed sliding window |
| **CORS** | Strict origin whitelist |
| **Input Validation** | Zod schemas on all endpoints |
| **VPN Detection** | IP geolocation matching |

### Frontend Security

| Measure | Implementation |
|---------|----------------|
| **CSP** | Strict Content Security Policy |
| **XSS Prevention** | React's built-in escaping |
| **Wallet Validation** | Address checksums, chain validation |

---

## Development Environment

### Required Tools

```bash
# Node.js (via nvm)
nvm install 20
nvm use 20

# pnpm (fast package manager)
npm install -g pnpm

# Foundry (smart contracts)
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Vercel CLI
pnpm install -g vercel
```

### Environment Variables

```bash
# .env.local

# ═══════════════════════════════════════════════════════════
# PUBLIC (exposed to browser)
# ═══════════════════════════════════════════════════════════
NEXT_PUBLIC_CHAIN_ID=137
NEXT_PUBLIC_WANDRYFI_ADDRESS=0x...
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=xxx

# ═══════════════════════════════════════════════════════════
# PRIVATE (server only)
# ═══════════════════════════════════════════════════════════
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
VERIFIER_PRIVATE_KEY=0x...
BICONOMY_BUNDLER_URL=https://...
BICONOMY_PAYMASTER_URL=https://...
POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/xxx
PINATA_JWT=xxx
```

### Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint && forge fmt --check",
    "test": "vitest && forge test",
    "test:coverage": "forge coverage",
    "deploy:contracts": "forge script script/Deploy.s.sol --rpc-url polygon --broadcast --verify",
    "db:push": "prisma db push",
    "db:generate": "prisma generate",
    "typechain": "typechain --target ethers-v6 --out-dir types out/**/*.json"
  }
}
```

---

## Dependencies Summary

### Frontend

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.3.0",
    
    "tailwindcss": "^3.4.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    
    "gsap": "^3.12.0",
    "framer-motion": "^11.0.0",
    "lottie-react": "^2.4.0",
    
    "wagmi": "^2.5.0",
    "viem": "^2.7.0",
    "@rainbow-me/rainbowkit": "^2.0.0",
    
    "@biconomy/account": "^4.0.0",
    
    "mapbox-gl": "^3.1.0",
    "react-map-gl": "^7.1.0",
    "@turf/turf": "^6.5.0",
    
    "zustand": "^4.5.0",
    "@tanstack/react-query": "^5.17.0",
    
    "lucide-react": "^0.300.0",
    "@radix-ui/react-slot": "^1.0.2",
    
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "vitest": "^1.2.0",
    "@testing-library/react": "^14.1.0",
    "typechain": "^8.3.0",
    "@typechain/ethers-v6": "^0.5.0"
  }
}
```

### Backend

```json
{
  "dependencies": {
    "hono": "^4.0.0",
    "@hono/node-server": "^1.4.0",
    "@hono/zod-validator": "^0.1.0",
    
    "@prisma/client": "^5.8.0",
    "@upstash/redis": "^1.28.0",
    
    "ethers": "^6.10.0",
    
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "prisma": "^5.8.0",
    "tsx": "^4.7.0"
  }
}
```

### Smart Contracts

```toml
# foundry.toml dependencies
[dependencies]
forge-std = "github:foundry-rs/forge-std"
openzeppelin-contracts = "github:OpenZeppelin/openzeppelin-contracts"
```

---

## Version Matrix

| Component | Version | Last Updated |
|-----------|---------|--------------|
| Next.js | 15.x | Jan 2026 |
| React | 19.x | Jan 2026 |
| Tailwind | 3.4.x | Jan 2026 |
| wagmi | 2.x | Jan 2026 |
| viem | 2.x | Jan 2026 |
| Foundry | Latest | Rolling |
| Solidity | 0.8.20 | Stable |
| Node.js | 20 LTS | Oct 2023 |
| PostgreSQL | 16.x | Sep 2023 |

---

<p align="center">
  <strong>WANDERIFY</strong><br>
  Stake. Travel. Prove. Earn.
</p>

<p align="center">
  Tech Stack v1.0 — January 2026
</p>