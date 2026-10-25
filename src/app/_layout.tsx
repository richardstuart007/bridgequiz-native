//==============================================================================================
//  1) DESCRIPTION
//    RootLayout — the app's navigator: a stack of the Subjects list (index), the Quiz and the
//    Update help screen. The Quiz screen sets its own title (the subject name).
//==============================================================================================

import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Bridge Quiz' }} />
      <Stack.Screen name='quiz/[sb_sbid]' options={{ title: '' }} />
      <Stack.Screen name='update' options={{ title: 'Update Bridge Quiz' }} />
    </Stack>
  )
}
