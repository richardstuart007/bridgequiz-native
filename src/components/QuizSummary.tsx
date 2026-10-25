//==============================================================================================
//  1) DESCRIPTION
//    QuizSummary — the end-of-quiz score, "7 out of 10 correct", with Try again and Back to
//    subjects buttons. The score is not saved anywhere.
//
//    Parameters:
//      sb_title     — the subject name
//      correctCount — answers that were right
//      total        — questions in the quiz
//      onRetry      — tap on Try again (same subject, answers reshuffled)
//      onBack       — tap on Back to subjects
//==============================================================================================

import { Pressable, StyleSheet, Text, View } from 'react-native'

type Props = {
  sb_title: string
  correctCount: number
  total: number
  onRetry: () => void
  onBack: () => void
}

export default function QuizSummary(props: Props) {
  const { sb_title, correctCount, total, onRetry, onBack } = props

  const scoreText = `${correctCount} out of ${total} correct`

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{sb_title}</Text>
      <Text style={styles.score}>{scoreText}</Text>
      <Pressable onPress={onRetry} style={[styles.button, styles.retryButton]}>
        <Text style={styles.buttonText}>Try again</Text>
      </Pressable>
      <Pressable onPress={onBack} style={[styles.button, styles.backButton]}>
        <Text style={styles.buttonText}>Back to subjects</Text>
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
