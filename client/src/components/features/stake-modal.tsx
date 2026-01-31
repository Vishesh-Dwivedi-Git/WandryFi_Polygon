'use client'

import { useState } from 'react'
import { Wallet } from 'lucide-react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useStake } from '@/hooks/useWanderify'

interface StakeModalProps {
    destinationId: number
    destinationName: string
    trigger?: React.ReactNode
}

export function StakeModal({ destinationId, destinationName, trigger }: StakeModalProps) {
    const { isConnected } = useAccount()
    const { stake, isPending, isConfirming, isConfirmed } = useStake()

    const [amount, setAmount] = useState('')
    const [date, setDate] = useState('')
    const [open, setOpen] = useState(false)

    const handleStake = async () => {
        if (!amount || !date) return

        try {
            await stake(destinationId, amount, new Date(date))
            // Close modal after success (controlled by watcher in hook usually, or here)
            if (isConfirmed) {
                setOpen(false)
                setAmount('')
                setDate('')
            }
        } catch (e) {
            console.error(e)
        }
    }

    // Auto-close on confirmation
    if (isConfirmed && open) {
        // Timeout to show success state briefly? 
        // For now simple close
        setTimeout(() => {
            setOpen(false)
        }, 2000)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="w-full">
                        <Wallet className="mr-2 h-4 w-4" />
                        Stake to Travel
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Stake on {destinationName}</DialogTitle>
                    <DialogDescription>
                        Commit to your journey. Verification required upon arrival.
                    </DialogDescription>
                </DialogHeader>

                {!isConnected ? (
                    <div className="flex flex-col items-center justify-center py-6">
                        <p className="mb-4 text-center text-sm text-white/50">
                            Please connect your wallet to continue.
                        </p>
                        <ConnectButton />
                    </div>
                ) : isConfirmed ? (
                    <div className="flex flex-col items-center justify-center py-6 text-accent-success">
                        <p className="text-lg font-bold">Stake Successful!</p>
                        <p className="text-sm">Good luck on your journey.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="amount" className="text-sm font-medium">
                                Stake Amount (MATIC)
                            </label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="0.0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="date" className="text-sm font-medium">
                                Travel Date
                            </label>
                            <Input
                                id="date"
                                type="date"
                                value={date}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {isConnected && !isConfirmed && (
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleStake}
                            disabled={!amount || !date || isPending || isConfirming}
                            loading={isPending || isConfirming}
                        >
                            {isPending ? 'Confirming...' : isConfirming ? 'Processing...' : 'Confirm Stake'}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}
