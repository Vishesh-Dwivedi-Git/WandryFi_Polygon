import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import 'dotenv/config'

import { verifyRoutes } from './routes/verify.js'
import { destinationsRoutes } from './routes/destinations.js'
import { usersRoutes } from './routes/users.js'
import { leaderboardRoutes } from './routes/leaderboard.js'

const app = new Hono()

// ═══════════════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════

app.use('*', logger())
app.use(
    '*',
    cors({
        origin: ['http://localhost:3000', 'https://wanderify.xyz'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
)

// ═══════════════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════════════

app.get('/', (c) => c.json({ status: 'ok', service: 'wanderify-api', version: '0.1.0' }))
app.get('/health', (c) => c.json({ status: 'healthy' }))

app.route('/api/verify', verifyRoutes)
app.route('/api/destinations', destinationsRoutes)
app.route('/api/users', usersRoutes)
app.route('/api/leaderboard', leaderboardRoutes)

// ═══════════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════

app.onError((err, c) => {
    console.error('Server error:', err)
    return c.json({ error: 'Internal server error' }, 500)
})

app.notFound((c) => c.json({ error: 'Not found' }, 404))

// ═══════════════════════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════════════════════

const port = Number(process.env.PORT) || 4000

console.log(`🚀 Wanderify API running on http://localhost:${port}`)

serve({
    fetch: app.fetch,
    port,
})

export default app
