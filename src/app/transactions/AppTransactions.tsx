import { KineticSdk } from '@kin-kinetic/sdk'
import { Group, Paper, Progress, Stack, Text } from '@mantine/core'
import { ExplorerLink } from '../tutorial/AppTutorial'
import { AppTransaction, useTransactionManager } from './TransactionManagerProvider'

export function AppTransactions({ sdk }: { sdk: KineticSdk }) {
  const { transactions } = useTransactionManager()
  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group position="apart" mb="xs">
        <Text size="md" weight={500}>
          Transactions
        </Text>
      </Group>
      <Stack>
        {!transactions.length && (
          <Text color="dimmed" size="xs">
            No transactions yet.
          </Text>
        )}
        {transactions.map((transaction) => (
          <AppTransactionItem key={transaction.signature} sdk={sdk} transaction={transaction} />
        ))}
      </Stack>
    </Paper>
  )
}

export function AppTransactionItem({ sdk, transaction }: { sdk: KineticSdk; transaction: AppTransaction }) {
  const done = transaction.confirmationStatus === 'finalized'
  const percent = (transaction.confirmations * 100) / 32
  return (
    <Stack>
      <Group>
        <ExplorerLink sdk={sdk} path={`tx/${transaction?.signature}`} />
        <Text color="dimmed" size="xs">
          {transaction.signature}
        </Text>
      </Group>
      <Progress color={done ? 'green' : 'violet'} value={done ? 100 : percent} />
    </Stack>
  )
}
