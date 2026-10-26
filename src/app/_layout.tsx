//==============================================================================================
//  1) DESCRIPTION
//    RootLayout — the app's navigator: a stack of the quiz list (index), the Quiz and the
//    Update help screen. The Quiz screen sets its own title (the video name).
//
//  3) CHANGE HISTORY
//    2026-10-25 — quiz route is quiz/[rf_rfid] (one quiz per video; was quiz/[sb_sbid])
//==============================================================================================

import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Bridge Quiz' }} />
      <Stack.Screen name='quiz/[rf_rfid]' options={{ title: '' }} />
      <Stack.Screen name='update' options={{ title: 'Update Bridge Quiz' }} />
    </Stack>
  )
}
