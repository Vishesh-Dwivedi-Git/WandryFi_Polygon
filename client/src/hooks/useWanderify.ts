import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import { WANDRYFI_ADDRESS } from '@/lib/wagmi'
import WandryFiJson from '@/lib/abi/WandryFi.json'

// Extract the ABI from the JSON
const WandryFiABI = WandryFiJson.abi

export function useStake() {
    const { data: hash, writeContract, isPending, error } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const stake = async (destinationId: number, amount: string, travelDate: Date) => {
        // Convert date to unix timestamp
        const timestamp = Math.floor(travelDate.getTime() / 1000)

        writeContract({
            address: WANDRYFI_ADDRESS,
            abi: WandryFiABI,
            functionName: 'stake',
            args: [BigInt(destinationId), BigInt(timestamp)],
            value: parseEther(amount),
        })
    }

    return {
        stake,
        isPending,
        isConfirming,
        isConfirmed,
        hash,
        error
    }
}

export function useCheckIn() {
    const { data: hash, writeContract, isPending, error } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const checkIn = async (commitmentId: number, signature: `0x${string}`) => {
        writeContract({
            address: WANDRYFI_ADDRESS,
            abi: WandryFiABI,
            functionName: 'checkIn',
            args: [BigInt(commitmentId), signature],
        })
    }

    return {
        checkIn,
        isPending,
        isConfirming,
        isConfirmed,
        hash,
        error
    }
}

export function usePoolBalance(destinationId: number) {
    const { data, isError, isLoading } = useReadContract({
        address: WANDRYFI_ADDRESS,
        abi: WandryFiABI,
        functionName: 'getPoolBalance',
        args: [BigInt(destinationId)],
    })

    return {
        balance: data ? BigInt(data as bigint) : BigInt(0),
        isError,
        isLoading
    }
}

export function useUserCommitments() {
    const { address } = useAccount()

    const { data: commitmentIds, isLoading } = useReadContract({
        address: WANDRYFI_ADDRESS,
        abi: WandryFiABI,
        functionName: 'getUserCommitments',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    }) as { data: bigint[] | undefined, isLoading: boolean }

    return {
        commitmentIds: commitmentIds ? commitmentIds.map(id => Number(id)) : [],
        isLoading
    }
}

export function useCommitment(commitmentId: number) {
    const { data, isLoading } = useReadContract({
        address: WANDRYFI_ADDRESS,
        abi: WandryFiABI,
        functionName: 'getCommitment',
        args: [BigInt(commitmentId)],
    }) as { data: any, isLoading: boolean }

    // Parse struct
    const commitment = data ? {
        id: Number(data.id),
        destinationId: Number(data.destinationId),
        amount: data.amount.toString(),
        travelDate: new Date(Number(data.travelDate) * 1000),
        isProcessed: data.isProcessed,
        isSuccess: data.isSuccess
    } : undefined

    return { commitment, isLoading }
}
