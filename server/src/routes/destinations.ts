import { Hono } from 'hono'
import { prisma } from '../lib/prisma.js'
import { cache } from '../lib/redis.js'

const destinationsRoutes = new Hono()

/**
 * GET /api/destinations
 * Fetch all active destinations with cached pool data
 */
destinationsRoutes.get('/', async (c) => {
    const destinations = await prisma.destination.findMany({
        where: { isActive: true },
        orderBy: { placeValue: 'asc' },
    })

    // Enrich with cached pool balances
    const enriched = await Promise.all(
        destinations.map(async (dest) => {
            const poolBalance = await cache.getPoolBalance(dest.id)
            return {
                ...dest,
                poolBalance: poolBalance?.toString() ?? dest.poolBalance.toString(),
            }
        })
    )

    return c.json({ destinations: enriched })
})

/**
 * GET /api/destinations/:id
 * Fetch single destination by ID
 */
destinationsRoutes.get('/:id', async (c) => {
    const id = parseInt(c.req.param('id'))

    const destination = await prisma.destination.findUnique({
        where: { id },
        include: {
            _count: {
                select: { commitments: true, journeys: true },
            },
        },
    })

    if (!destination) {
        return c.json({ error: 'Destination not found' }, 404)
    }

    const poolBalance = await cache.getPoolBalance(id)

    return c.json({
        destination: {
            ...destination,
            poolBalance: poolBalance?.toString() ?? destination.poolBalance.toString(),
            totalCommitments: destination._count.commitments,
            totalJourneys: destination._count.journeys,
        },
    })
})

export { destinationsRoutes }
