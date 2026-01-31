import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { ethers } from 'ethers'

const verifyRoutes = new Hono()

// ═══════════════════════════════════════════════════════════════════════════
// SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════

const verifySchema = z.object({
    commitmentId: z.number(),
    userAddress: z.string(),
    destinationId: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    zkProof: z.string().optional(), // Polygon ID ZK proof
})

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Haversine formula to calculate distance between two coordinates
 */
function haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371000 // Earth radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
}

// ═══════════════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * POST /api/verify
 * Verify user location and generate signature for on-chain check-in
 */
verifyRoutes.post('/', zValidator('json', verifySchema), async (c) => {
    const { commitmentId, userAddress, destinationId, latitude, longitude, zkProof } =
        c.req.valid('json')

    // TODO: Get destination coordinates from database
    // For now, using placeholder
    const destLat = 48.856614 // Eiffel Tower
    const destLon = 2.352222

    // Calculate distance
    const distance = haversineDistance(latitude, longitude, destLat, destLon)
    const CHECK_IN_RADIUS = 50 // meters

    if (distance > CHECK_IN_RADIUS) {
        return c.json(
            {
                verified: false,
                error: 'Too far from destination',
                distance: Math.round(distance),
                required: CHECK_IN_RADIUS,
            },
            400
        )
    }

    // TODO: Validate ZK proof with Polygon ID SDK
    // if (zkProof) {
    //   const isValidProof = await validatePolygonIdProof(zkProof)
    //   if (!isValidProof) return c.json({ error: 'Invalid ZK proof' }, 400)
    // }

    // Generate signature for smart contract
    const verifierPrivateKey = process.env.VERIFIER_PRIVATE_KEY
    if (!verifierPrivateKey) {
        return c.json({ error: 'Server configuration error' }, 500)
    }

    const wallet = new ethers.Wallet(verifierPrivateKey)

    // Create message hash matching contract expectation
    const messageHash = ethers.solidityPackedKeccak256(
        ['uint256', 'address', 'uint256'],
        [commitmentId, userAddress, destinationId]
    )

    const signature = await wallet.signMessage(ethers.getBytes(messageHash))

    return c.json({
        verified: true,
        signature,
        distance: Math.round(distance),
        commitmentId,
        destinationId,
    })
})

export { verifyRoutes }
