//==============================================================================================
//  1) DESCRIPTION
//    QuizSummary — the end-of-quiz score, "7 out of 10 correct", with Try again and Back to
//    quizzes buttons. The score is not saved anywhere.
//
//    Parameters:
//      rf_desc      — the quiz (video) name
//      correctCount — answers that were right
//      total        — questions in the quiz
//      onRetry      — tap on Try again (same quiz, answers reshuffled)
//      onBack       — tap on Back to quizzes
//
//  3) CHANGE HISTORY
//    2026-10-25 — title is the video name rf_desc (was sb_title); button "Back to quizzes"
//==============================================================================================

import { Pressable, StyleSheet, Text, View } from 'react-native'

type Props = {
  rf_desc: string
  correctCount: number
  total: number
  onRetry: () => void
  onBack: () => void
}

export default function QuizSummary(props: Props) {
  const { rf_desc, correctCount, total, onRetry, onBack } = props

  const scoreText = `${correctCount} out of ${total} correct`

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{rf_desc}</Text>
      <Text style={styles.score}>{scoreText}</Text>
      <Pressable onPress={onRetry} style={[styles.button, styles.retryButton]}>
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
      <Pressable onPress={onBack} style={[styles.button, styles.backButton]}>
        <Text style={styles.buttonText}>Back to quizzes</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  block: { gap: 14, alignItems: 'stretch', paddingTop: 24 },
  title: { fontSize: 18, fontWeight: '600', textAlign: 'center' },
  score: { fontSize: 26, fontWeight: '700', textAlign: 'center' },
  button: { borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  retryButton: { backgroundColor: '#1d4ed8' },
  backButton: { backgroundColor: '#6b7280' },
  buttonText: { color: '#ffffff', fontSize: 17, fontWeight: '700' }
})
