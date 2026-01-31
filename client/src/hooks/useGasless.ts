import { useState, useCallback } from 'react'
import { useWalletClient } from 'wagmi'
import { createSmartAccountClient, BiconomySmartAccountV2 } from '@biconomy/account'

export function useGasless() {
    const { data: walletClient } = useWalletClient()
    const [smartAccount, setSmartAccount] = useState<BiconomySmartAccountV2 | null>(null)
    const [isInitializing, setIsInitializing] = useState(false)

    const initSmartAccount = useCallback(async () => {
        if (!walletClient) return

        try {
            setIsInitializing(true)
            const bundlerUrl = process.env.NEXT_PUBLIC_BICONOMY_BUNDLER_URL
            const paymasterUrl = process.env.NEXT_PUBLIC_BICONOMY_PAYMASTER_URL

            if (!bundlerUrl || !paymasterUrl) {
                console.warn('Biconomy URLs not configured')
                return
            }

            const smartAccount = await createSmartAccountClient({
                signer: walletClient,
                bundlerUrl,
                paymasterUrl,
            })

            setSmartAccount(smartAccount)
        } catch (error) {
            console.error('Failed to init smart account:', error)
        } finally {
            setIsInitializing(false)
        }
    }, [walletClient])

    return {
        smartAccount,
        initSmartAccount,
        isInitializing,
        isConnected: !!smartAccount
    }
}
