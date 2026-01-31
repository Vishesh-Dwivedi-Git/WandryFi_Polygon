import { Trophy, Medal, Award, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { shortenAddress } from '@/lib/utils'

// Mock leaderboard data
const leaderboardData = [
    { rank: 1, address: '0x1234567890abcdef1234567890abcdef12345678', journeys: 47, rewards: '156.8' },
    { rank: 2, address: '0xabcdef1234567890abcdef1234567890abcdef12', journeys: 42, rewards: '134.2' },
    { rank: 3, address: '0x7890abcdef1234567890abcdef1234567890abcd', journeys: 38, rewards: '118.5' },
    { rank: 4, address: '0xdef1234567890abcdef1234567890abcdef1234', journeys: 35, rewards: '98.3' },
    { rank: 5, address: '0x4567890abcdef1234567890abcdef1234567890', journeys: 31, rewards: '87.1' },
]

function getRankIcon(rank: number) {
    switch (rank) {
        case 1:
            return <Trophy className="h-5 w-5 text-accent-primary" />
        case 2:
            return <Medal className="h-5 w-5 text-gray-300" />
        case 3:
            return <Award className="h-5 w-5 text-orange-400" />
        default:
            return <span className="font-mono text-foreground-muted font-bold text-lg">#{rank}</span>
    }
}

function getRankStyle(rank: number): string {
    switch (rank) {
        case 1:
            return 'border-accent-primary/30 bg-accent-primary/5 shadow-[0_0_30px_-10px_rgba(250,204,21,0.15)]'
        case 2:
            return 'border-white/10 bg-surface-elevated'
        case 3:
            return 'border-orange-500/20 bg-orange-500/5'
        default:
            return 'border-surface-stroke bg-surface-card opacity-80'
    }
}

export default function LeaderboardPage() {
    return (
        <div className="min-h-screen pt-16">
            {/* Header */}
            <section className="border-b border-surface-stroke bg-surface-base">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Leaderboard</h1>
                        <p className="text-foreground-secondary text-lg">
                            Top travelers ranked by total rewards earned.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-accent-primary font-medium bg-accent-primary/10 px-4 py-2 rounded-full border border-accent-primary/20">
                        <TrendingUp className="h-4 w-4" />
                        Season 1 Active
                    </div>
                </div>
            </section>

            {/* Leaderboard Table */}
            <section className="py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Header Row */}
                    <div className="mb-4 grid grid-cols-12 gap-4 px-8 text-xs font-bold uppercase tracking-wider text-foreground-muted">
                        <div className="col-span-1">Rank</div>
                        <div className="col-span-5">Traveler</div>
                        <div className="col-span-3 text-right">Journeys</div>
                        <div className="col-span-3 text-right">Net Rewards</div>
                    </div>

                    {/* Entries */}
                    <div className="space-y-3">
                        {leaderboardData.map((entry) => (
                            <Card
                                key={entry.rank}
                                hover={true}
                                className={`${getRankStyle(entry.rank)} transition-all duration-300`}
                            >
                                <CardContent className="grid grid-cols-12 items-center gap-4 py-5 px-8">
                                    {/* Rank */}
                                    <div className="col-span-1 flex items-center justify-center">
                                        {getRankIcon(entry.rank)}
                                    </div>

                                    {/* Address */}
                                    <div className="col-span-5">
                                        <p className="font-mono text-sm text-white font-medium">{shortenAddress(entry.address, 6)}</p>
                                    </div>

                                    {/* Journeys */}
                                    <div className="col-span-3 text-right">
                                        <p className="font-bold text-white">{entry.journeys}</p>
                                        <p className="text-[10px] text-foreground-muted uppercase">completed</p>
                                    </div>

                                    {/* Rewards */}
                                    <div className="col-span-3 text-right">
                                        <p className="font-bold text-accent-primary text-lg">{entry.rewards}</p>
                                        <p className="text-[10px] text-foreground-muted uppercase">MATIC</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
