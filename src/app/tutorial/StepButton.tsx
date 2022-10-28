import { Box, Button } from '@mantine/core'
import { Prism } from '@mantine/prism'
import { ReactNode } from 'react'

export function StepButton({
  children,
  onClick,
  snippet,
}: {
  children: ReactNode
  onClick: () => void
  snippet?: string
}) {
  return (
    <Box style={{ width: '100%' }}>
      {snippet ? (
        <Prism style={{ width: '100%', marginBottom: '20px' }} language="typescript">
          {snippet}
        </Prism>
      ) : null}
      <Button variant="outline" color="pink" onClick={onClick}>
        {children}
      </Button>
    </Box>
  )
}
