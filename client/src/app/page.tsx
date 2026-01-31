'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Play, MapPin, Trophy, Shield, Cpu, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Globe } from '@/components/ui/globe'
import gsap from 'gsap'

export default function HomePage() {
    const containerRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline()

            tl.from('.hero-word', {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out'
            })
                .from('.action-area', {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                }, '-=0.5')
                .from('.hud-stat', {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power2.out'
                }, '-=0.5')

        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="relative flex flex-col min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-accent-primary selection:text-black">

            {/* Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Globe centered and faint */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 scale-[2] md:scale-125 mix-blend-screen">
                    <Globe />
                </div>
                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
            </div>

            {/* Content Container - Flex Col to push footer down */}
            <div className="relative z-10 flex flex-col flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Hero Content - Centered properly */}
                <div className="flex-1 flex flex-col items-center justify-center py-20 min-h-[60vh]">

                    {/* Massive Typography Stack */}
                    <div className="flex flex-col items-center leading-none tracking-tighter cursor-default select-none mb-12">
                        <span className="hero-word text-[12vw] sm:text-8xl md:text-9xl font-black italic uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
                            Explore
                        </span>
                        <span className="hero-word text-[12vw] sm:text-8xl md:text-9xl font-black italic uppercase text-accent-primary drop-shadow-[0_0_25px_rgba(250,204,21,0.5)] z-10 relative">
                            Own
                        </span>
                        <span className="hero-word text-[12vw] sm:text-8xl md:text-9xl font-black italic uppercase text-transparent bg-clip-text bg-gradient-to-t from-white to-gray-500 drop-shadow-2xl">
                            Earn
                        </span>
                    </div>

                    {/* Action Area */}
                    <div className="action-area flex flex-col items-center gap-8">
                        <div className="flex items-center gap-3 text-accent-primary/80 font-mono text-sm uppercase tracking-[0.2em] border border-accent-primary/30 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
                            <span className="animate-pulse w-2 h-2 rounded-full bg-accent-success" />
                            System Online // Ready to Launch
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Link href="/explore" className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-yellow-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500" />
                                <Button className="relative h-16 sm:h-20 px-10 sm:px-16 bg-white text-black text-xl sm:text-2xl font-black uppercase tracking-widest hover:bg-zinc-200 hover:scale-[1.02] transition-all border-none">
                                    <Play className="w-6 h-6 sm:w-8 sm:h-8 mr-3 sm:mr-4 fill-black" />
                                    Start Quest
                                </Button>
                            </Link>

                            <Link href="/WandryFi_Polygon.pdf" target="_blank">
                                <Button variant="outline" className="h-16 sm:h-20 px-8 sm:px-12 border-white/20 bg-black/50 hover:bg-white/10 text-white text-lg sm:text-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-all backdrop-blur-sm">
                                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-accent-primary" />
                                    Whitepaper
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* HUD Footer Stats - Stays at bottom but flows naturally */}
                <footer className="w-full pb-8 pt-12 border-t border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Stat 1 */}
                        <div className="hud-stat flex flex-col gap-1 border-l-2 border-accent-primary/50 pl-4">
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
                                <Cpu className="w-3 h-3" /> Protocol
                            </div>
                            <div className="text-xl sm:text-2xl font-bold font-mono">v1.2.0</div>
                        </div>

                        {/* Stat 2 */}
                        <div className="hud-stat flex flex-col gap-1 border-l-2 border-white/10 pl-4 hover:border-accent-primary/50 transition-colors cursor-default">
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
                                <Trophy className="w-3 h-3" /> TVL
                            </div>
                            <div className="text-xl sm:text-2xl font-bold font-mono">$4.2M</div>
                        </div>

                        {/* Stat 3 */}
                        <div className="hud-stat flex flex-col gap-1 border-l-2 border-white/10 pl-4 hover:border-accent-primary/50 transition-colors cursor-default">
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
                                <MapPin className="w-3 h-3" /> Active
                            </div>
                            <div className="text-xl sm:text-2xl font-bold font-mono">1,337 Users</div>
                        </div>

                        {/* Stat 4 */}
                        <div className="hud-stat flex flex-col gap-1 border-l-2 border-white/10 pl-4 hover:border-accent-primary/50 transition-colors cursor-default">
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
                                <Shield className="w-3 h-3" /> Proofs
                            </div>
                            <div className="text-xl sm:text-2xl font-bold font-mono">89.4K</div>
                        </div>
                    </div>
                </footer>

            </div>

            {/* Decorative Corners (Fixed to viewport but behind content) */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-20">
                <div className="absolute top-24 left-6 w-8 h-8 border-l-2 border-t-2 border-white/20" />
                <div className="absolute top-24 right-6 w-8 h-8 border-r-2 border-t-2 border-white/20" />
                <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-white/20" />
                <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-white/20" />
            </div>

        </div>
    )
}
