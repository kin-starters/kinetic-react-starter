import { KineticSdk } from '@kin-kinetic/sdk'
import { Box, MantineProvider, Progress, Stack } from '@mantine/core'
import { useEffect, useState } from 'react'
import { AppIntro } from './intro/AppIntro'
import { AppTransactions } from './transactions/AppTransactions'
import { TransactionManagerProvider } from './transactions/TransactionManagerProvider'
import { AppTutorial } from './tutorial/AppTutorial'

import { AppLayout } from './ui/AppLayout'

export function App() {
  const [sdk, setSdk] = useState<KineticSdk | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    KineticSdk.setup({ endpoint: 'http://localhost:3000', environment: 'devnet', index: 1 }).then(setSdk)
  }, [])

  if (!sdk) {
    return <Progress />
  }

  return (
    <MantineProvider theme={{ colorScheme: 'dark', primaryColor: 'violet' }} withGlobalStyles withNormalizeCSS>
      <TransactionManagerProvider sdk={sdk}>
        <AppLayout>
          <Stack>
            <AppIntro />
            <AppTransactions sdk={sdk} />
            <AppTutorial loading={loading} setLoading={setLoading} sdk={sdk} />
            <Box p="2" style={{ fontSize: '10px', marginTop: '300px' }}>
              <pre>{JSON.stringify(sdk?.config, null, 2)}</pre>
            </Box>
          </Stack>
        </AppLayout>
      </TransactionManagerProvider>
    </MantineProvider>
  )
}
