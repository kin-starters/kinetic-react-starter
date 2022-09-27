import { Anchor, Button, Code, createStyles, Grid, Group, Paper, Stack, Text, Timeline } from '@mantine/core'
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

export function AppTutorial() {
  const [keypair, setKeypair] = useState<string | undefined>()
  const [showMnemonic, setShowMnemonic] = useState(false)
  const [createdAccount, setCreatedAccount] = useState<string | undefined>()
  const [getBalance, setBalance] = useState<string | undefined>()
  const [requestAirdrop, setRequestAirdrop] = useState<string | undefined>()
  const [makeTransfer, setMakeTransfer] = useState<string | undefined>()
  const [getTransaction, setTransaction] = useState<string | undefined>()

  const [active, setActive] = useState(0)

  const nextStep = () => {
    setActive(active + 1)
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
            {keypair}
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
              {showMnemonic
                ? 'pill tomorrow foster begin walnut borrow virtual kick shift mutual shoe scatter'
                : '**********'}
            </Code>
          </Group>
        </Stack>
      ),
      panel: (
        <StepButton
          onClick={() => {
            const keypair = 'BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y'
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
          <Anchor color="dimmed">
            View on Solana Explorer <IconExternalLink size={12} />
          </Anchor>
        </Stack>
      ),
      panel: (
        <StepButton
          onClick={() => {
            setCreatedAccount('test')
            nextStep()
          }}
        >
          Create Account
        </StepButton>
      ),
    },
    {
      title: 'Get Balance',
      description: 'Next you can get the balance of your account.',
      done: !!getBalance,
      result: (
        <Code color="gray" block>
          {getBalance}
        </Code>
      ),
      panel: (
        <StepButton
          onClick={() => {
            setBalance('0')
            nextStep()
          }}
        >
          Next
        </StepButton>
      ),
    },
    {
      title: 'Request Airdrop',
      description: 'In this step, you will request an airdrop of Kin tokens on the Solana Devnet.',
      done: !!requestAirdrop,
      result: <Stack></Stack>,
      panel: (
        <StepButton
          onClick={() => {
            setRequestAirdrop('test')
            nextStep()
          }}
        >
          Next
        </StepButton>
      ),
    },
    {
      title: 'Make Transfer',
      description: 'Now you can make a transfer of Kin tokens to another account.',
      done: !!makeTransfer,
      result: <Stack></Stack>,
      panel: (
        <StepButton
          onClick={() => {
            setMakeTransfer('signature: BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y')
            nextStep()
          }}
        >
          Next
        </StepButton>
      ),
    },
    {
      title: 'Get Transaction',
      description: 'Retrieve a transaction by its signature.',
      done: !!getTransaction,
      result: <Stack></Stack>,
      panel: (
        <StepButton
          onClick={() => {
            setTransaction('test')
            nextStep()
          }}
        >
          Next
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
