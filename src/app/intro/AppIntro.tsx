import { Group, Paper, Text } from '@mantine/core'

export function AppIntro() {
  return (
    <Paper withBorder p="lg" radius="md" shadow="md">
      <Group position="apart" mb="xs">
        <Text size="md" weight={500}>
          Kinetic Tutorial
        </Text>
      </Group>
      <Text color="dimmed" size="xs">
        In this tutorial you will learn how to use the Kinetic SDK and Keypair.
      </Text>
    </Paper>
  )
}
