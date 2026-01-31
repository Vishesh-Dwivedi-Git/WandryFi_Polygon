import { Hono } from 'hono'
import { cache } from '../lib/redis.js'
import { prisma } from '../lib/prisma.js'

const leaderboardRoutes = new Hono()

interface LeaderboardEntry {
    rank: number
    walletAddress: string
    journeyCount: number
    totalRewards: string
}

/**
 * GET /api/leaderboard
 * Fetch cached leaderboard or compute from database
 */
leaderboardRoutes.get('/', async (c) => {
    // Try cache first
    const cached = await cache.getLeaderboard()
    if (cached) {
        return c.json({ leaderboard: cached })
    }

    // Compute leaderboard from database
    const topUsers = await prisma.user.findMany({
        select: {
            walletAddress: true,
            journeys: {
                select: { rewardWei: true },
            },
        },
        take: 100,
    })

    const leaderboard: LeaderboardEntry[] = topUsers
        .map((user) => ({
            walletAddress: user.walletAddress,
            journeyCount: user.journeys.length,
            totalRewards: user.journeys
                .reduce((sum, j) => sum + BigInt(j.rewardWei), BigInt(0))
                .toString(),
        }))
        .sort((a, b) => Number(BigInt(b.totalRewards) - BigInt(a.totalRewards)))
        .slice(0, 100)
        .map((entry, index) => ({
            ...entry,
            rank: index + 1,
        }))

    // Cache for 1 hour
    await cache.setLeaderboard(leaderboard)

    return c.json({ leaderboard })
})

export { leaderboardRoutes }
