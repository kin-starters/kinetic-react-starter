import { KineticSdk } from '@kin-kinetic/sdk'
import { Box, MantineProvider, Progress, Stack } from '@mantine/core'
import { useEffect, useState } from 'react'
import { AppIntro } from './intro/AppIntro'
import { AppTutorial } from './tutorial/AppTutorial'

import { AppLayout } from './ui/AppLayout'

export function App() {
  const [sdk, setSdk] = useState<KineticSdk | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    KineticSdk.setup({ endpoint: 'https://sandbox.kinetic.host', environment: 'devnet', index: 1 }).then(setSdk)
  }, [])

  if (!sdk) {
    return <Progress />
  }

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppLayout>
        <Stack>
          <AppIntro />
          <AppTutorial loading={loading} setLoading={setLoading} sdk={sdk} />
        </Stack>
      </AppLayout>
    </MantineProvider>
  )
}
