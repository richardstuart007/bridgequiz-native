//==============================================================================================
//  1) DESCRIPTION
//    QuizFeedback — shown under the answers once one is picked: "Correct" or "Wrong — the
//    answer is …", the question's help text when it has any, and the Next / See score button.
//
//    Parameters:
//      isCorrect     — the picked answer was qq_ans[0]
//      correctAnswer — the correct answer's text (qq_ans[0])
//      qq_help       — help text, or null / '' when there is none (then no help box)
//      nextLabel     — button text: 'Next' or 'See score' on the last question
//      onNext        — tap on the button
//==============================================================================================

import { Pressable, StyleSheet, Text, View } from 'react-native'

type Props = {
  isCorrect: boolean
  correctAnswer: string
  qq_help: string | null
  nextLabel: string
  onNext: () => void
}

export default function QuizFeedback(props: Props) {
  const { isCorrect, correctAnswer, qq_help, nextLabel, onNext } = props

  const resultText = isCorrect ? 'Correct' : `Wrong — the answer is ${correctAnswer}`
  const resultStyle = isCorrect ? styles.resultCorrect : styles.resultWrong
  const helpText = qq_help?.trim() ?? ''
  const showHelp = helpText !== ''

  return (
    <View style={styles.block}>
      <Text style={[styles.result, resultStyle]}>{resultText}</Text>
      {showHelp && (
        <View style={styles.help}>
          <Text style={styles.helpHeading}>Help</Text>
          <Text style={styles.helpText}>{helpText}</Text>
        </View>
      )}
      <Pressable onPress={onNext} style={styles.nextButton}>
        <Text style={styles.nextText}>{nextLabel}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  block: { gap: 10 },
  result: { fontSize: 17, fontWeight: '700' },
  resultCorrect: { color: '#16a34a' },
  resultWrong: { color: '#dc2626' },
  help: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#93c5fd',
    backgroundColor: '#eff6ff',
    padding: 10,
    gap: 4
  },
  helpHeading: { fontSize: 14, fontWeight: '700' },
  helpText: { fontSize: 15, lineHeight: 21 },
  nextButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center'
  },
  nextText: { color: '#ffffff', fontSize: 17, fontWeight: '700' }
})
