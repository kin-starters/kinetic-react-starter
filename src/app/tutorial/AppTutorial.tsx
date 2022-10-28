import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdk } from '@kin-kinetic/sdk'
import { Commitment } from '@kin-kinetic/solana'
import { Anchor, Button, Code, Group, Stack, Text } from '@mantine/core'
import { IconExternalLink, IconEye, IconEyeOff } from '@tabler/icons'
import { useState } from 'react'
import { useTransactionManager } from '../transactions/TransactionManagerProvider'
import { NextSteps } from './AppNextSteps'
import { StepButton } from './StepButton'
import { Step, Tutorial } from './Tutorial'
import { Wait } from './Wait'

export function ExplorerLink({ sdk, path }: { sdk: KineticSdk; path: string }) {
  return (
    <Anchor color="dimmed" href={sdk.getExplorerUrl(path)} target="_blank">
      View on Solana Explorer <IconExternalLink size={12} />
    </Anchor>
  )
}

export function AppTutorial({
  loading,
  setLoading,
  sdk,
}: {
  loading: boolean
  setLoading: (loading: boolean) => void
  sdk: KineticSdk
}) {
  const { addTransaction } = useTransactionManager()
  const [keypair, setKeypair] = useState<Keypair | undefined>()
  const [showMnemonic, setShowMnemonic] = useState(false)
  const [createdAccount, setCreatedAccount] = useState<string | undefined>()
  const [getBalance, setBalance] = useState<string | undefined>()
  const [requestAirdrop, setRequestAirdrop] = useState<string | undefined>()
  const [makeTransfer, setMakeTransfer] = useState<string | undefined>()
  const [getTransaction, setTransaction] = useState<string | undefined>()
  const [showTransaction, setShowTransaction] = useState<boolean>(false)

  const [active, setActive] = useState(0)

  const nextStep = () => {
    setActive(active + 1)
  }

  const refreshBalance = async () => {
    if (!keypair) return
    setBalance(`Loading...`)
    const balance = await sdk.getBalance({ account: keypair.publicKey })
    setBalance(`${balance.balance}`)
  }

  const steps: Step[] = [
    {
      title: 'Create a keypair',
      description: 'Create a keypair to use for the rest of the tutorial.',
      done: !!keypair,
      result: (
        <Stack spacing={12}>
          <Text size="sm">This is your Public Key. It is the identity of your account on the Solana Blockchain.</Text>
          <Code block color="gray">
            {keypair?.publicKey}
          </Code>
          <Text size="sm">
            Below you can find your memoized mnemonic. This is a secret phrase that can be used to recover your keypair.
          </Text>
          <Group spacing={4}>
            <Button
              variant="outline"
              color="gray"
              leftIcon={showMnemonic ? <IconEyeOff size={20} /> : <IconEye size={20} />}
              onClick={() => setShowMnemonic(!showMnemonic)}
            >
              {showMnemonic ? 'Hide' : 'Show'} Mnemonic
            </Button>
            <Code block color="gray">
              {showMnemonic ? keypair?.mnemonic : '**********'}
            </Code>
          </Group>
        </Stack>
      ),
      panel: (
        <StepButton
          snippet={`const keypair = Keypair.random() `}
          onClick={() => {
            const keypair = Keypair.random()
            setKeypair(keypair)
            nextStep()
          }}
        >
          Create Keypair
        </StepButton>
      ),
    },
    {
      title: 'Create an account',
      description: 'In this step, you will create an account on the Solana Blockchain.',
      done: !!createdAccount,
      result: (
        <Stack spacing={2}>
          <ExplorerLink sdk={sdk} path={`address/${keypair?.publicKey}`} />
        </Stack>
      ),
      panel: (
        <StepButton
          snippet={`const tx = await sdk.createAccount({ owner: keypair })`}
          onClick={async () => {
            if (!keypair) return
            setLoading(true)
            const res = await sdk.createAccount({ owner: keypair })
            addTransaction(`${res.signature}`, () => {
              setCreatedAccount(`${res.signature}`)
              nextStep()
              setLoading(false)
              refreshBalance()
            })
          }}
        >
          {loading ? <Wait /> : 'Create Account'}
        </StepButton>
      ),
    },
    {
      title: 'Get Balance',
      description: 'Next you can get the balance of your account.',
      done: !!getBalance,
      result: (
        <Group>
          <Button variant="outline" color="gray" size={'sm'} onClick={refreshBalance}>
            Refresh
          </Button>
          <Code color="gray" block>
            {getBalance}
          </Code>
        </Group>
      ),
      panel: (
        <StepButton
          snippet={`const balance = await sdk.getBalance({ account: keypair.publicKey })`}
          onClick={async () => {
            await refreshBalance()
            nextStep()
            setLoading(false)
          }}
        >
          {loading ? <Wait /> : 'Get Balance'}
        </StepButton>
      ),
    },
    {
      title: 'Request Airdrop',
      description: 'In this step, you will request an airdrop of Kin tokens on the Solana Devnet.',
      done: !!requestAirdrop,
      result: (
        <Stack>
          <Code color="gray" block>
            {requestAirdrop}
          </Code>
          <ExplorerLink sdk={sdk} path={`tx/${requestAirdrop}`} />
        </Stack>
      ),
      panel: (
        <StepButton
          snippet={`const tx = await sdk.requestAirdrop({ account: keypair.publicKey, amount: '1000' })`}
          onClick={async () => {
            if (!keypair || !createdAccount) return
            setLoading(true)
            const res = await sdk.requestAirdrop({
              account: keypair.publicKey,
              amount: '1000',
              commitment: Commitment.Confirmed,
            })
            addTransaction(`${res.signature}`, () => {
              setRequestAirdrop(`${res.signature}`)
              refreshBalance()
              nextStep()
              setLoading(false)
            })
          }}
        >
          {loading ? <Wait /> : 'Request Airdrop'}
        </StepButton>
      ),
    },
    {
      title: 'Make Transfer',
      description: 'Now you can make a transfer of Kin tokens to another account.',
      done: !!makeTransfer,
      result: (
        <Stack>
          <Code color="gray" block>
            {makeTransfer}
          </Code>
          <ExplorerLink sdk={sdk} path={`tx/${makeTransfer}`} />
        </Stack>
      ),
      panel: (
        <StepButton
          snippet={`const tx = await sdk.makeTransfer({
  amount: '1000',
  destination: 'BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y',
  owner: keypair,
})`}
          onClick={async () => {
            if (!keypair || !createdAccount) return
            setLoading(true)
            const res = await sdk.makeTransfer({
              destination: 'BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y',
              amount: '1000',
              owner: keypair,
            })
            addTransaction(`${res.signature}`, () => {
              setMakeTransfer(`${res.signature}`)
              refreshBalance()
              nextStep()
              setLoading(false)
            })
          }}
        >
          {loading ? <Wait /> : 'Make Transfer'}
        </StepButton>
      ),
    },
    {
      title: 'Get Transaction',
      description: 'Retrieve a transaction by its signature.',
      done: !!getTransaction,
      result: (
        <Stack>
          <Button color={'gray'} variant={'outline'} onClick={() => setShowTransaction(!showTransaction)}>
            Show Transaction
          </Button>
          <pre>{showTransaction ? getTransaction : ''}</pre>
        </Stack>
      ),
      panel: (
        <StepButton
          snippet={`const txDetails = await sdk.getTransaction({ signature: tx.signature })`}
          onClick={async () => {
            if (!keypair || !makeTransfer) return
            setLoading(true)
            const res = await sdk.getTransaction({ signature: makeTransfer })
            setTransaction(JSON.stringify(res, null, 2))
            nextStep()
            setLoading(false)
          }}
        >
          {loading ? <Wait /> : 'Get Transaction'}
        </StepButton>
      ),
    },
    {
      title: 'You are done!',
      description:
        'You now have a basic understanding of how to use the Kin SDK and you can start building your own app.',
      done: !!getTransaction,
      result: <Stack></Stack>,
      panel: <NextSteps />,
    },
  ]

  return <Tutorial active={active} steps={steps} />
}
