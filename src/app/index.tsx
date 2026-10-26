//==============================================================================================
//  1) DESCRIPTION
//    QuizzesScreen — the app's home screen: one ReferenceRow per video in quiz.json (one quiz
//    per video), in RFID_ORDER. Tapping a row opens its Quiz. Below the list, the installed
//    app version; on Android, an update banner above the list when a newer release exists.
//
//  2) NOTES
//    The newer-release check runs once when the screen first mounts (Android only); any
//    failure simply means no banner (same as bridgeschool-native).
//
//  3) CHANGE HISTORY
//    2026-10-25 — one row per video (was per subject), so Lebensohl's 5 parts are listed
//                 separately; renamed SubjectsScreen → QuizzesScreen
//==============================================================================================

import { useEffect, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text } from 'react-native'
import { router } from 'expo-router'

import ReferenceRow from '@/components/ReferenceRow'
import UpdateBanner from '@/components/UpdateBanner'
import { appVersion, isNewerVersion, latestReleaseVersion } from '@/appVersion'
import { orderedReferences, referenceQuestions } from '@/quizData'

export default function QuizzesScreen() {
  const [latestVersion, setLatestVersion] = useState<string | null>(null)

  useEffect(() => {
    async function checkForUpdate() {
      if (Platform.OS !== 'android') return
      const version = await latestReleaseVersion()
      setLatestVersion(version)
    }
    checkForUpdate()
  }, [])

  const rows = orderedReferences().map(reference => ({
    reference,
    questionCount: referenceQuestions(reference.rf_rfid).length
  }))
  const installedVersion = appVersion()
  const showUpdateBanner = latestVersion !== null && isNewerVersion(latestVersion, installedVersion)
  const bannerVersion = latestVersion ?? ''
  const versionText = `Bridge Quiz v${installedVersion}`

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {showUpdateBanner && <UpdateBanner latestVersion={bannerVersion} onPress={openUpdate} />}
      {rows.map(row => (
        <ReferenceRow
          key={row.reference.rf_rfid}
          reference={row.reference}
          questionCount={row.questionCount}
          onPress={() => openQuiz(row.reference.rf_rfid)}
        />
      ))}
      <Text style={styles.version}>{versionText}</Text>
    </ScrollView>
  )
}

//----------------------------------------------------------------------------------------------
//  openQuiz — navigates to the Quiz for a video
//  Params:  rf_rfid — the video id
//----------------------------------------------------------------------------------------------
function openQuiz(rf_rfid: number): void {
  router.push({ pathname: '/quiz/[rf_rfid]', params: { rf_rfid: String(rf_rfid) } })
}

//----------------------------------------------------------------------------------------------
//  openUpdate — navigates to the Update help screen
//----------------------------------------------------------------------------------------------
function openUpdate(): void {
  router.push('/update')
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 10 },
  version: { color: '#9ca3af', fontSize: 12, textAlign: 'center', marginTop: 12 }
})
