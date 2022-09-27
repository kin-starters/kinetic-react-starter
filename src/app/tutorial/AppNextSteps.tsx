import { Anchor, Container, createStyles, Group, Image, SimpleGrid, Text, ThemeIcon } from '@mantine/core'
import { ReactNode } from 'react'

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: 30,
    paddingBottom: 50,
  },

  item: {
    display: 'flex',
  },

  itemIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },

  itemTitle: {
    marginBottom: theme.spacing.xs / 2,
  },

  supTitle: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 800,
    fontSize: theme.fontSizes.sm,
    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    letterSpacing: 0.5,
  },

  title: {
    lineHeight: 1,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },

  description: {
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },

  highlight: {
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    padding: 5,
    paddingTop: 0,
    borderRadius: theme.radius.sm,
    display: 'inline-block',
    color: theme.colorScheme === 'dark' ? theme.white : 'inherit',
  },
}))

type SdkType = 'android' | 'dart' | 'python' | 'ios' | 'typescript' | 'unity'

interface FeaturedSdk {
  type: SdkType
  image: string
  title: ReactNode
  description: ReactNode
  docsUrl: string
  starterUrl: string
}

export function NextSteps() {
  const { classes } = useStyles()

  const supTitle = 'Explore our SDKs'
  const description = 'Learn more about Kinetic and how to use it.'
  const docsUrl = (sdk: SdkType) => `https://kinetic.kin.org/docs/sdk/${sdk}`
  const starterUrl = (sdk: SdkType) => `https://github.com/kin-starters/kinetic-${sdk}-starter`

  const data: FeaturedSdk[] = [
    {
      type: 'typescript',
      title: 'Kinetic TypeScript SDK',
      image: 'https://314-refactor-for-kinetic.kin-developer-docs.pages.dev/91b9d53d.svg',
      description: 'Use the Kinetic TypeScript SDK in Node.js, the browser or React Native.',
      docsUrl: docsUrl('typescript'),
      starterUrl: starterUrl('typescript'),
    },
    {
      type: 'python',
      title: 'Kinetic Python SDK',
      image: 'https://314-refactor-for-kinetic.kin-developer-docs.pages.dev/b135ecce.png',
      description: 'The Kinetic Python SDK is a Python wrapper for the Kinetic API.',
      docsUrl: docsUrl('python'),
      starterUrl: starterUrl('python'),
    },
    {
      type: 'unity',
      title: 'Kinetic Unity SDK',
      image: 'https://314-refactor-for-kinetic.kin-developer-docs.pages.dev/dd042af3.svg',
      description: 'Building games? Use the Kinetic Unity SDK to integrate Kin into your game.',
      docsUrl: docsUrl('unity'),
      starterUrl: starterUrl('unity'),
    },
    {
      type: 'android',
      title: 'Kinetic Android SDK',
      image: 'https://314-refactor-for-kinetic.kin-developer-docs.pages.dev/f218ff11.png',
      description: 'Integrate Kin into your Android app with the Kinetic Android SDK.',
      docsUrl: docsUrl('android'),
      starterUrl: starterUrl('android'),
    },
    {
      type: 'ios',
      title: 'Kinetic iOS SDK',
      image: 'https://314-refactor-for-kinetic.kin-developer-docs.pages.dev/2955d422.png',
      description: 'Integrate Kin into your iOS app with the Kinetic iOS SDK.',
      docsUrl: docsUrl('ios'),
      starterUrl: starterUrl('ios'),
    },
    {
      type: 'dart',
      title: 'Kinetic Dart SDK',
      image: 'https://314-refactor-for-kinetic.kin-developer-docs.pages.dev/cbace63e.png',
      description: 'Use the Kinetic Dart SDK to integrate Kin into your Flutter app.',
      docsUrl: docsUrl('dart'),
      starterUrl: starterUrl('dart'),
    },
  ]

  const items = data.map((item) => (
    <div className={classes.item} key={item.image}>
      <ThemeIcon color="dark" className={classes.itemIcon} size={60} radius="md">
        <Image src={item.image} />
      </ThemeIcon>

      <div>
        <Text weight={700} size="lg" className={classes.itemTitle}>
          {item.title}
        </Text>
        <Text color="dimmed">{item.description}</Text>
        <Group>
          <Anchor target="_blank" href={item.docsUrl} size={14}>
            Documentation
          </Anchor>
          <Anchor target="_blank" href={item.starterUrl} size={14}>
            Starter
          </Anchor>
        </Group>
      </div>
    </div>
  ))

  return (
    <Container className={classes.wrapper}>
      <Text className={classes.supTitle}>Explore our SDKs</Text>
      <Container size={660} p={0}>
        <Text color="dimmed" className={classes.description}>
          Learn more about Kinetic and how to use it.
        </Text>
      </Container>

      <SimpleGrid
        cols={2}
        spacing={50}
        breakpoints={[{ maxWidth: 550, cols: 1, spacing: 40 }]}
        style={{ marginTop: 30 }}
      >
        {items}
      </SimpleGrid>
    </Container>
  )
}
