import { Hono } from 'hono'
import { prisma } from '../lib/prisma.js'

const usersRoutes = new Hono()

/**
 * GET /api/users/:address
 * Fetch user profile and commitments
 */
usersRoutes.get('/:address', async (c) => {
    const walletAddress = c.req.param('address').toLowerCase()

    let user = await prisma.user.findUnique({
        where: { walletAddress },
        include: {
            commitments: {
                include: { destination: true },
                orderBy: { createdAt: 'desc' },
            },
            journeys: {
                include: { destination: true },
                orderBy: { completedAt: 'desc' },
            },
        },
    })

    if (!user) {
        // Create new user on first access
        user = await prisma.user.create({
            data: { walletAddress },
            include: {
                commitments: { include: { destination: true } },
                journeys: { include: { destination: true } },
            },
        })
    }

    // Calculate stats
    const activeCommitments = user.commitments.filter((c) => !c.isProcessed)
    const completedJourneys = user.journeys.length
    const totalStaked = user.commitments.reduce(
        (sum, c) => sum + BigInt(c.amountWei),
        BigInt(0)
    )
    const totalRewards = user.journeys.reduce(
        (sum, j) => sum + BigInt(j.rewardWei),
        BigInt(0)
    )

    return c.json({
        user: {
            id: user.id,
            walletAddress: user.walletAddress,
            createdAt: user.createdAt,
            stats: {
                activeCommitments: activeCommitments.length,
                completedJourneys,
                totalStaked: totalStaked.toString(),
                totalRewards: totalRewards.toString(),
            },
            commitments: user.commitments,
            journeys: user.journeys,
        },
    })
})

export { usersRoutes }
