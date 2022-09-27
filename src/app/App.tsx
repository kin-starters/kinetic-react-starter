import { MantineProvider } from '@mantine/core'
import { AppLayout } from './ui/AppLayout'

export function App() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppLayout>
        <h1>Hello World</h1>
      </AppLayout>
    </MantineProvider>
  )
}
