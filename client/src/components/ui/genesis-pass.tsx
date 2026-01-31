'use client'

import React from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { QrCode, Fingerprint, ShieldCheck } from 'lucide-react'

export function GenesisPass() {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg'])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg'])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseXVal = e.clientX - rect.left
        const mouseYVal = e.clientY - rect.top
        const xPct = mouseXVal / width - 0.5
        const yPct = mouseYVal / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
            className="relative w-80 h-48 rounded-2xl cursor-pointer perspective-1000 z-50 group"
        >
            {/* Card Content */}
            <div
                style={{ transform: 'translateZ(75px)', transformStyle: 'preserve-3d' }}
                className="absolute inset-0 rounded-2xl bg-surface-card border border-white/10 p-6 flex flex-col justify-between overflow-hidden backdrop-blur-md shadow-2xl"
            >
                {/* Holographic Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/5 via-white/5 to-transparent pointer-events-none z-0" />

                {/* Top Row */}
                <div className="flex justify-between items-start z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center text-accent-primary border border-accent-primary/50">
                            <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[10px] font-mono text-foreground-secondary uppercase leading-tight">Identity<br />Protocol</p>
                        </div>
                    </div>
                    <Fingerprint className="w-8 h-8 text-white/20" />
                </div>

                {/* Middle Row - Chip */}
                <div className="flex items-center gap-4 z-10 translate-z-10">
                    <div className="w-10 h-8 rounded bg-gradient-to-br from-yellow-200 to-yellow-600 border border-yellow-400 opacity-80" />
                    <div className="font-mono text-xs text-accent-primary tracking-widest">
                        0x71C...9A2
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="flex justify-between items-end z-10">
                    <div className="text-white">
                        <p className="text-[10px] text-foreground-secondary uppercase">Status</p>
                        <p className="text-sm font-bold tracking-wide">VERIFIED</p>
                    </div>
                    <QrCode className="w-10 h-10 text-white/80" />
                </div>
            </div>

            {/* Floating Elements (Layered) */}
            <motion.div
                style={{ transform: 'translateZ(150px) translateX(-20px) translateY(-20px)' }}
                className="absolute top-0 right-0 px-2 py-0.5 bg-accent-primary text-black text-[10px] font-bold uppercase rounded-sm shadow-lg border border-white/20"
            >
                Genesis
            </motion.div>
        </motion.div>
    )
}
