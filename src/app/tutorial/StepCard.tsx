import { Paper, Stack, Text } from '@mantine/core'
import { ReactNode } from 'react'

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
