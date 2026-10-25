//==============================================================================================
//  1) DESCRIPTION
//    SubjectsScreen — the app's home screen: one SubjectRow per subject in quiz.json, in
//    SBID_ORDER. Tapping a subject opens its Quiz. Below the list, the installed app version;
//    on Android, an update banner above the list when a newer release exists.
//
//  2) NOTES
//    The newer-release check runs once when the screen first mounts (Android only); any
//    failure simply means no banner (same as bridgeschool-native).
//==============================================================================================

import { useEffect, useState } from 'react'
import { Platform, ScrollView, StyleSheet, Text } from 'react-native'
import { router } from 'expo-router'

import SubjectRow from '@/components/SubjectRow'
import UpdateBanner from '@/components/UpdateBanner'
import { appVersion, isNewerVersion, latestReleaseVersion } from '@/appVersion'
import { orderedSubjects, subjectQuestions } from '@/quizData'

export default function SubjectsScreen() {
  const [latestVersion, setLatestVersion] = useState<string | null>(null)

  useEffect(() => {
    async function checkForUpdate() {
      if (Platform.OS !== 'android') return
      const version = await latestReleaseVersion()
      setLatestVersion(version)
    }
    checkForUpdate()
  }, [])

  const rows = orderedSubjects().map(subject => ({
    subject,
    questionCount: subjectQuestions(subject.sb_sbid).length
  }))
  const installedVersion = appVersion()
  const showUpdateBanner = latestVersion !== null && isNewerVersion(latestVersion, installedVersion)
  const bannerVersion = latestVersion ?? ''
  const versionText = `Bridge Quiz v${installedVersion}`

  return (
    <ScrollView contentContainerStyle={styles.list}>
      {showUpdateBanner && <UpdateBanner latestVersion={bannerVersion} onPress={openUpdate} />}
      {rows.map(row => (
        <SubjectRow
          key={row.subject.sb_sbid}
          subject={row.subject}
          questionCount={row.questionCount}
          onPress={() => openQuiz(row.subject.sb_sbid)}
        />
      ))}
      <Text style={styles.version}>{versionText}</Text>
    </ScrollView>
  )
}

//----------------------------------------------------------------------------------------------
//  openQuiz — navigates to the Quiz for a subject
//  Params:  sb_sbid — the subject id
//----------------------------------------------------------------------------------------------
function openQuiz(sb_sbid: number): void {
  router.push({ pathname: '/quiz/[sb_sbid]', params: { sb_sbid: String(sb_sbid) } })
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
