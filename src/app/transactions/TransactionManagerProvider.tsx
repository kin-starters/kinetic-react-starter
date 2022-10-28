import { KineticSdk } from '@kin-kinetic/sdk'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

export interface AppTransaction {
  signature: string
  confirmations: number
  confirmationStatus?: string
  [key: string]: unknown
}

export interface TransactionManagerProviderContext {
  addTransaction: (signature: string, cb: (signature: string) => void) => void
  transactions: AppTransaction[]
  transactionMap: Record<string, any>
  callbackCount?: number
}

const TransactionManagerContext = createContext<TransactionManagerProviderContext>(
  {} as TransactionManagerProviderContext,
)

function TransactionManagerProvider({ children, sdk }: { children: ReactNode; sdk: KineticSdk }) {
  const [transactionMap, setTransactionMap] = useState<Record<string, AppTransaction>>({})
  const [transactionCb, setTransactionCb] = useState<Record<string, (signature: string) => void>>({})
  const [paused, setPaused] = useState<boolean>(false)

  const addTransaction = (signature: string, cb: (signature: string) => void) => {
    if (!sdk) return
    // Add the Callback to the Callback Map
    setTransactionCb((map) => (map[signature] ? map : { ...map, [signature]: cb }))
    // Add the Signature to the Confirmation Map
    setTransactionMap((map) => (map[signature] ? map : { ...map, [signature]: {} as AppTransaction }))
  }

  useEffect(() => {
    const allSignatures = Object.keys(transactionMap) || []
    const signatures = allSignatures.filter(
      (signature) => transactionMap[signature]?.confirmationStatus !== 'finalized',
    )

    if (!signatures.length || paused) return
    setPaused(true)

    // console.log(`Checking ${signatures?.length} signatures ${signatures.join(', ')} `)
    sdk?.solana?.connection.getSignatureStatuses(signatures).then((res) => {
      if (!res?.value) {
        return
      }
      const result = signatures.reduce<Record<string, AppTransaction | null>>(
        (acc, curr, currentIndex) => ({
          ...acc,
          [curr]: res.value[currentIndex]
            ? ({
                signature: curr,
                ...res.value[currentIndex],
              } as AppTransaction)
            : null,
        }),
        {},
      )
      // console.log(`Result`, JSON.stringify(result, null, 2));
      setTransactionMap(
        (map) =>
          ({
            ...map,
            ...result,
          } as Record<string, AppTransaction>),
      )

      const finalizedHere = Object.keys(result).filter((sig: string) =>
        result && result[sig] ? result[sig]?.confirmationStatus === 'finalized' : false,
      )

      if (finalizedHere.length) {
        setTransactionCb((tcb) => {
          for (const finalizedSig of finalizedHere) {
            const cb = tcb[finalizedSig] ? tcb[finalizedSig] : (s: string) => console.warn(`CB not found for ${s}`)
            setTimeout(() => cb(finalizedSig), 1)
            delete tcb[finalizedSig]
          }
          return { ...tcb }
        })
      }

      setTimeout(() => setPaused(false), 1000)
    })
  }, [paused, transactionMap])

  const value = {
    addTransaction,
    callbackCount: Object.keys(transactionCb)?.length,
    transactionMap,
    transactions: Object.keys(transactionMap)
      .map((sig) => transactionMap[sig])
      .filter((items) => items && items?.signature)
      .reverse(),
  }
  return <TransactionManagerContext.Provider value={value}>{children}</TransactionManagerContext.Provider>
}

const useTransactionManager = () => useContext(TransactionManagerContext)

export { TransactionManagerProvider, useTransactionManager }
