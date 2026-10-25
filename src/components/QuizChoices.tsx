//==============================================================================================
//  1) DESCRIPTION
//    QuizChoices — the question text and its answer buttons, in the shuffled order given.
//    Before an answer is picked every button can be tapped; once one is picked the buttons
//    lock, the correct answer turns green and a wrong pick turns red.
//
//    Parameters:
//      qq_detail   — the question text
//      choices     — the answers in display order: { qq_ansIndex, text } where qq_ansIndex
//                    is the answer's position in qq_ans (0 = correct)
//      pickedIndex — qq_ansIndex of the picked answer, or null before an answer is picked
//      onPick      — tap on an answer, given its qq_ansIndex
//==============================================================================================

import { Pressable, StyleSheet, Text, View } from 'react-native'

export type QuizChoice = {
  qq_ansIndex: number
  text: string
}

type Props = {
  qq_detail: string
  choices: QuizChoice[]
  pickedIndex: number | null
  onPick: (qq_ansIndex: number) => void
}

export default function QuizChoices(props: Props) {
  const { qq_detail, choices, pickedIndex, onPick } = props

  const isAnswered = pickedIndex !== null
  const buttons = choices.map(choice => ({
    choice,
    style: [styles.choice, choiceStatusStyle(choice.qq_ansIndex, pickedIndex)],
    textStyle: [styles.choiceText, choiceTextStyle(choice.qq_ansIndex, pickedIndex)]
  }))

  return (
    <View style={styles.panel}>
      <Text style={styles.detail}>{qq_detail}</Text>
      {buttons.map(button => (
        <Pressable
          key={button.choice.qq_ansIndex}
          onPress={() => onPick(button.choice.qq_ansIndex)}
          disabled={isAnswered}
          style={button.style}
        >
          <Text style={button.textStyle}>{button.choice.text}</Text>
        </Pressable>
      ))}
    </View>
  )
}

//----------------------------------------------------------------------------------------------
//  choiceStatusStyle — background for one answer button
//  Params:  qq_ansIndex — the answer's position in qq_ans (0 = correct)
//           pickedIndex — the picked answer's position, or null before answering
//  Returns: green for the correct answer and red for a wrong pick once answered; otherwise
//           the plain style
//----------------------------------------------------------------------------------------------
function choiceStatusStyle(qq_ansIndex: number, pickedIndex: number | null) {
  let style = styles.choiceOpen
  if (pickedIndex !== null) {
    if (qq_ansIndex === 0) style = styles.choiceCorrect
    else if (qq_ansIndex === pickedIndex) style = styles.choiceWrong
    else style = styles.choiceOther
  }
  return style
}

//----------------------------------------------------------------------------------------------
//  choiceTextStyle — text colour for one answer button
//  Params:  qq_ansIndex — the answer's position in qq_ans (0 = correct)
//           pickedIndex — the picked answer's position, or null before answering
//  Returns: white on the green/red buttons, otherwise the plain text style
//----------------------------------------------------------------------------------------------
function choiceTextStyle(qq_ansIndex: number, pickedIndex: number | null) {
  const isMarked = pickedIndex !== null && (qq_ansIndex === 0 || qq_ansIndex === pickedIndex)
  const style = isMarked ? styles.choiceTextMarked : styles.choiceTextPlain
  return style
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#86efac',
    backgroundColor: '#f0fdf4',
    padding: 10,
    gap: 8
  },
  detail: { fontSize: 16, fontWeight: '700', color: '#b91c1c' },
  choice: { borderRadius: 8, borderWidth: 1, paddingVertical: 12, paddingHorizontal: 14 },
  choiceOpen: { backgroundColor: '#ffffff', borderColor: '#9ca3af' },
  choiceCorrect: { backgroundColor: '#16a34a', borderColor: '#16a34a' },
  choiceWrong: { backgroundColor: '#dc2626', borderColor: '#dc2626' },
  choiceOther: { backgroundColor: '#f3f4f6', borderColor: '#e5e7eb' },
  choiceText: { fontSize: 16 },
  choiceTextPlain: { color: '#111827' },
  choiceTextMarked: { color: '#ffffff', fontWeight: '700' }
})
