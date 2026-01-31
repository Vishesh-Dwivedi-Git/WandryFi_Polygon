import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Wanderify | Travel Incognito',
    description: 'The first ZK-powered Proof-of-Presence protocol. Stake assets, verify location, earn rewards. Building on Polygon.',
    keywords: ['travel', 'crypto', 'polygon', 'staking', 'nft', 'web3', 'zk-proof', 'nomad'],
    authors: [{ name: 'Wanderify Protocol' }],
    openGraph: {
        title: 'Wanderify — Travel Incognito',
        description: 'Gamified travel commitment protocol on Polygon.',
        type: 'website',
        locale: 'en_US',
        images: [{ url: '/icon.png' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wanderify',
        description: 'Stake. Travel. Prove. Earn.',
        images: ['/icon.png'],
    },
    icons: {
        icon: '/icon.png',
        shortcut: '/icon.png',
        apple: '/icon.png',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
            <body className="min-h-screen bg-surface-base font-sans" suppressHydrationWarning>
                <Providers>
                    <div className="flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    )
}
