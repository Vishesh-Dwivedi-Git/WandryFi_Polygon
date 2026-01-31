'use client'

import { MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { StakeModal } from '@/components/features/stake-modal'

// Mock destinations for now
const destinations = [
    {
        id: 1,
        name: 'Eiffel Tower',
        country: 'France',
        latitude: 48.8566,
        longitude: 2.3522,
        placeValue: 30,
        poolBalance: '12500000000000000000',
        imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=400',
    },
    {
        id: 2,
        name: 'Colosseum',
        country: 'Italy',
        latitude: 41.8902,
        longitude: 12.4922,
        placeValue: 35,
        poolBalance: '8200000000000000000',
        imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
    },
    {
        id: 3,
        name: 'Machu Picchu',
        country: 'Peru',
        latitude: -13.1631,
        longitude: -72.545,
        placeValue: 80,
        poolBalance: '45000000000000000000',
        imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400',
    },
    {
        id: 4,
        name: 'Great Wall',
        country: 'China',
        latitude: 40.4319,
        longitude: 116.5704,
        placeValue: 70,
        poolBalance: '32100000000000000000',
        imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400',
    },
    {
        id: 5,
        name: 'Taj Mahal',
        country: 'India',
        latitude: 27.175,
        longitude: 78.0421,
        placeValue: 50,
        poolBalance: '18700000000000000000',
        imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400',
    },
    {
        id: 6,
        name: 'Santorini',
        country: 'Greece',
        latitude: 36.3932,
        longitude: 25.4615,
        placeValue: 40,
        poolBalance: '15300000000000000000',
        imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400',
    },
]

function formatPool(weiValue: string): string {
    const matic = Number(BigInt(weiValue)) / 1e18
    return matic.toFixed(2)
}

function getDifficultyColor(value: number): string {
    if (value >= 70) return 'text-accent-danger'
    if (value >= 50) return 'text-accent-warning'
    return 'text-accent-success'
}

export default function ExplorePage() {
    return (
        <div className="min-h-screen pt-16">
            {/* Header */}
            <section className="border-b border-surface-stroke bg-surface-base">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Explore Destinations</h1>
                    <p className="text-foreground-secondary text-lg">
                        Choose your next adventure. <span className="text-accent-primary">Stake to commit.</span>
                    </p>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {destinations.map((dest) => (
                            <Card key={dest.id} className="group overflow-hidden p-0 border border-surface-stroke bg-surface-card hover:border-accent-primary/50 transition-colors">
                                <div className="relative h-56 overflow-hidden">
                                    <div className="absolute inset-0 bg-surface-elevated animate-pulse" />
                                    <img
                                        src={dest.imageUrl}
                                        alt={dest.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent" />
                                    <div className="absolute bottom-4 left-6">
                                        <p className="text-sm font-medium text-accent-primary mb-1 uppercase tracking-wide">{dest.country}</p>
                                        <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-surface-elevated rounded-lg p-3 border border-surface-stroke">
                                            <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Pool Balance</p>
                                            <p className="text-lg font-bold text-white font-mono">
                                                {formatPool(dest.poolBalance)} <span className="text-xs text-foreground-muted">MATIC</span>
                                            </p>
                                        </div>
                                        <div className="bg-surface-elevated rounded-lg p-3 border border-surface-stroke">
                                            <p className="text-xs text-foreground-muted uppercase tracking-wider mb-1">Difficulty</p>
                                            <p className={`text-lg font-bold ${getDifficultyColor(dest.placeValue)}`}>
                                                {dest.placeValue}<span className="text-xs text-foreground-muted">/100</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-foreground-secondary font-mono mb-6">
                                        <MapPin className="h-3 w-3" />
                                        {dest.latitude.toFixed(4)}, {dest.longitude.toFixed(4)}
                                    </div>

                                    <StakeModal
                                        destinationId={dest.id}
                                        destinationName={dest.name}
                                    />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
