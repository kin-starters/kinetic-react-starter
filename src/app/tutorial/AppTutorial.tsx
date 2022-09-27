import { Keypair } from '@kin-kinetic/keypair'
import { KineticSdk } from '@kin-kinetic/sdk'
import { Anchor, Button, Code, Group, Loader, Paper, Stack, Text, Timeline } from '@mantine/core'
import { IconArrowBigRight, IconCheck, IconExternalLink, IconEye, IconEyeOff } from '@tabler/icons'
import { ReactNode, useState } from 'react'
import { NextSteps } from './AppNextSteps'

export function StepCard({
  active,
  description,
  title,
  children,
}: {
  active: boolean
  description: string
  title: string
  children: ReactNode
}) {
  return (
    <Paper withBorder radius="md" shadow="md" style={{ borderColor: active ? 'pink' : undefined }}>
      <Stack p="sm" style={{}} spacing={4}>
        <Text size="md" weight={500}>
          {title}
        </Text>
        <Text color="dimmed" size="xs">
          {description}
        </Text>
        {children}
      </Stack>
    </Paper>
  )
}

export function StepButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <Button variant="outline" color="pink" onClick={onClick}>
      {children}
    </Button>
  )
}

export function Wait() {
  return (
    <Group>
      <Loader size="sm" color="pink" />
      <span>Please wait...</span>
    </Group>
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
  const [keypair, setKeypair] = useState<Keypair | undefined>()
  const [showMnemonic, setShowMnemonic] = useState(false)
  const [createdAccount, setCreatedAccount] = useState<string | undefined>()
  const [getBalance, setBalance] = useState<string | undefined>()
  const [requestAirdrop, setRequestAirdrop] = useState<string | undefined>()
  const [makeTransfer, setMakeTransfer] = useState<string | undefined>()
  const [getTransaction, setTransaction] = useState<string | undefined>()
  const [showTransaction, setShowTransaction] = useState<boolean>(false)

  const [active, setActive] = useState(0)

  function ExplorerLink({ path }: { path: string }) {
    return (
      <Anchor color="dimmed" href={sdk.getExplorerUrl(path)} target="_blank">
        View on Solana Explorer <IconExternalLink size={12} />
      </Anchor>
    )
  }

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
          <ExplorerLink path={`address/${keypair?.publicKey}`} />
        </Stack>
      ),
      panel: (
        <StepButton
          onClick={async () => {
            if (!keypair) return
            setLoading(true)
            const res = await sdk.createAccount({ owner: keypair })
            setCreatedAccount(`${res.signature}`)
            nextStep()
            setLoading(false)
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
          <ExplorerLink path={`tx/${requestAirdrop}`} />
        </Stack>
      ),
      panel: (
        <StepButton
          onClick={async () => {
            if (!keypair || !createdAccount) return
            setLoading(true)
            const res = await sdk.requestAirdrop({ account: keypair.publicKey, amount: '1000' })
            setRequestAirdrop(`${res.signature}`)
            await refreshBalance()
            nextStep()
            setLoading(false)
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
          <ExplorerLink path={`tx/${makeTransfer}`} />
        </Stack>
      ),
      panel: (
        <StepButton
          onClick={async () => {
            if (!keypair || !createdAccount) return
            setLoading(true)
            const res = await sdk.makeTransfer({
              destination: 'BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y',
              amount: '500',
              owner: keypair,
            })
            setMakeTransfer(`${res.signature}`)
            await refreshBalance()
            nextStep()
            setLoading(false)
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

interface Step {
  description: string
  done: boolean
  panel: ReactNode
  result: ReactNode
  title: string
}

function Tutorial({ active, steps }: { active: number; steps: Step[] }) {
  return (
    <Stack>
      <Timeline active={active} bulletSize={30} color={'violet'}>
        {steps.map(({ description, done, panel, result, title }, index) => (
          <Timeline.Item
            key={index}
            color={done ? 'green' : active === index ? 'pink' : 'dimmed'}
            bullet={done ? <IconCheck size={16} /> : <IconArrowBigRight size={16} />}
          >
            <StepCard active={active === index} title={title} description={description}>
              {active === index ? <Group mt="xs">{panel}</Group> : done ? <Stack mt={4}>{result}</Stack> : null}
            </StepCard>
          </Timeline.Item>
        ))}
      </Timeline>
    </Stack>
  )
}
