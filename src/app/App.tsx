import { MantineProvider, Stack } from '@mantine/core'
import { AppIntro } from './intro/AppIntro'
import { AppTutorial } from './tutorial/AppTutorial'

import { AppLayout } from './ui/AppLayout'

export function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppLayout>
        <Stack>
          <AppIntro />
          <AppTutorial />
        </Stack>
      </AppLayout>
    </MantineProvider>
  )
}
