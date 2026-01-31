'use client'

import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { MapPin, LayoutDashboard, Trophy, Menu, X, Globe, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
    { href: '/explore', label: 'Explore', icon: MapPin },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
            <nav
                className={cn(
                    "relative flex h-16 w-full max-w-5xl items-center justify-between rounded-2xl sm:rounded-full border px-4 sm:px-6 transition-all duration-300",
                    scrolled
                        ? "bg-surface-elevated/80 border-surface-stroke/50 backdrop-blur-xl shadow-2xl"
                        : "bg-surface-base/50 border-white/5 backdrop-blur-md"
                )}
            >
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 group shrink-0">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-surface-card border border-white/10 group-hover:border-accent-primary/50 transition-colors overflow-hidden">
                        <div className="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <MapPin className="h-4 w-4 text-white group-hover:text-accent-primary transition-colors relative z-10" />
                    </div>
                    <span className="font-mono font-bold tracking-tight text-lg text-white hidden sm:block">
                        Wanderify<span className="text-accent-primary">.OS</span>
                    </span>
                </Link>

                {/* Desktop Navigation - Centered */}
                <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "relative px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wide transition-all group overflow-hidden",
                                    isActive ? "text-black" : "text-foreground-secondary hover:text-white"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-accent-primary rounded-full" />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    {label}
                                </span>
                            </Link>
                        )
                    })}
                </div>

                {/* Right Side: Wallet & Mobile Toggle */}
                <div className="flex items-center gap-3 shrink-0">
                    {/* Wallet Button - Full on Desktop, Icon on Mobile */}
                    <div className="scale-90 sm:scale-100 flex shadow-glow rounded-xl overflow-hidden">
                        <ConnectButton
                            showBalance={{ smallScreen: false, largeScreen: true }}
                            chainStatus={{ smallScreen: 'none', largeScreen: 'icon' }}
                            accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
                        />
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex md:hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface-card text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-2 animate-in slide-in-from-top-2 fade-in duration-200 origin-top">
                        <div className="rounded-2xl border border-surface-stroke bg-surface-elevated/95 backdrop-blur-2xl p-2 shadow-2xl flex flex-col gap-1">
                            {navLinks.map(({ href, label, icon: Icon }) => {
                                const isActive = pathname === href
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center justify-between rounded-xl px-4 py-3 transition-colors",
                                            isActive ? "bg-accent-primary/10 text-accent-primary border border-accent-primary/20" : "text-foreground-secondary hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className="h-4 w-4" />
                                            <span className="font-medium text-sm">{label}</span>
                                        </div>
                                        {isActive && <ChevronRight className="h-4 w-4" />}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
