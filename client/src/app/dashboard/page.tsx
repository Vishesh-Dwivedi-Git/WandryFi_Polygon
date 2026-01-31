'use client'

import { Navigation, CheckCircle, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatMatic } from '@/lib/utils'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useUserCommitments, useCommitment } from '@/hooks/useWanderify'

function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

function getDaysUntil(date: Date): number {
    return Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

const CommitmentCard = ({ id }: { id: number }) => {
    const { commitment, isLoading } = useCommitment(id)

    if (isLoading || !commitment) return <div className="animate-pulse h-32 bg-surface-elevated rounded-xl border border-surface-stroke" />

    // Placeholder destination name lookup
    const destName = `Destination #${commitment.destinationId}`
    const country = "Unknown Location"

    if (commitment.isProcessed && commitment.isSuccess) return null

    return (
        <Card className="hover:border-accent-primary/30">
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                        <h3 className="font-bold text-white text-lg">{destName}</h3>
                    </div>
                    <p className="text-sm text-foreground-secondary mb-3">{country}</p>
                    <div className="flex items-center gap-4 text-sm font-mono bg-surface-elevated inline-flex px-3 py-1 rounded-md border border-surface-stroke">
                        <span className="text-white font-bold">
                            {formatMatic(commitment.amount)} MATIC
                        </span>
                        <span className="text-surface-stroke">|</span>
                        <span className={getDaysUntil(commitment.travelDate) < 3 ? 'text-accent-danger' : 'text-foreground-secondary'}>
                            {getDaysUntil(commitment.travelDate)} days left
                        </span>
                    </div>
                </div>
                <Button variant="secondary" size="sm" className="h-10">
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                </Button>
            </CardContent>
        </Card>
    )
}

const JourneyCard = ({ id }: { id: number }) => {
    const { commitment, isLoading } = useCommitment(id)

    if (isLoading || !commitment) return null

    if (!commitment.isProcessed || !commitment.isSuccess) return null

    return (
        <Card hover={false} className="border-surface-stroke bg-surface-base/50 opacity-70 hover:opacity-100 transition-opacity">
            <CardContent className="flex items-center justify-between p-6">
                <div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-accent-success" />
                        <h3 className="font-semibold text-foreground">Destination #{commitment.destinationId}</h3>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-sm font-mono">
                        <span className="text-accent-success bg-accent-success/10 px-2 py-0.5 rounded">
                            Completed
                        </span>
                        <span className="text-foreground-muted">{formatDate(commitment.travelDate)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default function DashboardPage() {
    const { isConnected, address } = useAccount()
    const { commitmentIds, isLoading } = useUserCommitments()

    if (!isConnected) {
        return (
            <div className="flex min-h-screen items-center justify-center pt-16">
                <Card className="max-w-md text-center p-8 bg-surface-card border-surface-stroke">
                    <CardContent className="py-6">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-elevated text-accent-primary">
                            <Wallet className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
                        <p className="mt-2 text-foreground-secondary mb-8">
                            Connect your wallet to view your journeys and commitments.
                        </p>
                        <div className="flex justify-center">
                            <ConnectButton />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-16">
            <section className="border-b border-surface-stroke bg-surface-base">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Dashboard</h1>
                    <p className="font-mono text-sm text-foreground-muted bg-surface-elevated inline-block px-3 py-1 rounded border border-surface-stroke">
                        {address}
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                {/* Active Commitments */}
                <section className="mb-16">
                    <h2 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
                        Active Commitments
                        <span className="text-xs font-normal text-foreground-muted bg-surface-elevated px-2 py-0.5 rounded-full border border-surface-stroke">
                            {isLoading ? '...' : commitmentIds.length}
                        </span>
                    </h2>
                    <div className="grid gap-4 lg:grid-cols-2">
                        {isLoading ? (
                            <div className="col-span-2 text-center py-12 text-foreground-muted">Loading blockchain data...</div>
                        ) : commitmentIds.length > 0 ? (
                            commitmentIds.map((id) => <CommitmentCard key={id} id={id} />)
                        ) : (
                            <div className="col-span-2 border border-dashed border-surface-stroke rounded-xl p-12 text-center">
                                <p className="text-foreground-muted">No active commitments found.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Past Journeys */}
                <section>
                    <h2 className="mb-6 text-xl font-bold text-white opacity-50">History</h2>
                    <div className="grid gap-4 lg:grid-cols-2">
                        {isLoading ? (
                            <div className="text-foreground-muted">Syncing...</div>
                        ) : commitmentIds.length > 0 ? (
                            commitmentIds.map((id) => <JourneyCard key={id} id={id} />)
                        ) : (
                            <p className="text-foreground-muted text-sm">No history available.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}
