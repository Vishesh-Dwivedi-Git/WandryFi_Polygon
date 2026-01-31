'use client'

import { useEffect, useRef } from 'react'

export function Globe() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = canvas.width = canvas.offsetWidth * 2
        let height = canvas.height = canvas.offsetHeight * 2

        const GLOBE_RADIUS = width * 0.35
        const DOT_RADIUS = 1.5
        const DOT_COUNT = 600
        const ROTATION_SPEED = 0.0015
        const CONNECTION_DISTANCE = 40 // Max distance to draw line

        let rotation = 0
        const dots: { theta: number; phi: number }[] = []

        // Fibonacci Sphere
        const phi = Math.PI * (3 - Math.sqrt(5))
        for (let i = 0; i < DOT_COUNT; i++) {
            const y = 1 - (i / (DOT_COUNT - 1)) * 2
            const theta = phi * i
            dots.push({ theta, phi: Math.acos(y) })
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height)

            rotation += ROTATION_SPEED

            // Compute 3D positions first
            const projected = dots.map(dot => {
                const x = GLOBE_RADIUS * Math.sin(dot.phi) * Math.cos(dot.theta + rotation)
                const y = GLOBE_RADIUS * Math.cos(dot.phi)
                const z = GLOBE_RADIUS * Math.sin(dot.phi) * Math.sin(dot.theta + rotation) + GLOBE_RADIUS

                const scale = 500 / (500 + z)
                const x2d = (x * scale) + width / 2
                const y2d = (y * scale) + height / 2
                const alpha = Math.max(0.1, (scale - 0.5) * 1.5)

                return { x: x2d, y: y2d, z, alpha, scale }
            })

            // Draw Connections (Line segments)
            ctx.lineWidth = 0.5
            projected.forEach((p1, i) => {
                if (p1.alpha < 0.3) return // Don't connect back-facing dots

                // Only check neighbors to save performance
                for (let j = i + 1; j < projected.length; j++) {
                    const p2 = projected[j]
                    if (p2.alpha < 0.3) continue

                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const dist = Math.sqrt(dx * dx + dy * dy)

                    if (dist < CONNECTION_DISTANCE * p1.scale) {
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * p1.alpha})`
                        ctx.stroke()
                    }
                }
            })

            // Draw Dots/Nodes
            projected.forEach(p => {
                ctx.beginPath()
                ctx.arc(p.x, p.y, DOT_RADIUS * p.scale, 0, Math.PI * 2)
                // Randomly make some dots Yellow (Nodes)
                if (Math.random() > 0.98) {
                    ctx.fillStyle = `rgba(250, 204, 21, ${p.alpha})` // Yellow accent
                } else {
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`
                }
                ctx.fill()
            })

            requestAnimationFrame(render)
        }

        const animation = requestAnimationFrame(render)
        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth * 2
            height = canvas.height = canvas.offsetHeight * 2
        }
        window.addEventListener('resize', handleResize)
        return () => {
            cancelAnimationFrame(animation)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Orbital Rings */}
            <div className="absolute w-[90%] h-[90%] border border-white/5 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />
            <div className="absolute w-[60%] h-[60%] border border-white/5 rounded-full animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />

            <canvas
                ref={canvasRef}
                className="w-full h-full relative z-10"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    )
}
