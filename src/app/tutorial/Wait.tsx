import { Group, Loader } from '@mantine/core'

export function Wait() {
  return (
    <Group>
      <Loader size="sm" color="pink" />
      <span>Please wait...</span>
    </Group>
  )
}
