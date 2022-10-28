import { Group, Stack, Timeline } from '@mantine/core'
import { IconArrowBigRight, IconCheck } from '@tabler/icons'
import { ReactNode } from 'react'
import { StepCard } from './StepCard'

export interface Step {
  description: string
  done: boolean
  panel: ReactNode
  result: ReactNode
  title: string
}

export function Tutorial({ active, steps }: { active: number; steps: Step[] }) {
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
