//==============================================================================================
//  1) DESCRIPTION
//    SubjectRow — one subject in the Subjects list: a QUIZ_COLOR row with a ▶ icon, the
//    subject name and how many questions its quiz has. Tapping it starts the quiz.
//
//    Parameters:
//      subject       — the subject; sb_title is shown as the name
//      questionCount — questions in its quiz (already capped at QUIZ_MAXQUESTIONS)
//      onPress       — tap on the row
//
//  2) NOTES
//    Same row shape as bridgeschool-native's VideoRow; the icon is followed by U+FE0E (text
//    presentation) so phones draw a plain symbol rather than a colour emoji.
//==============================================================================================

import { Pressable, StyleSheet, Text, View } from 'react-native'

import { QUIZ_COLOR } from '@/constants'
import type { table_Subject } from '@/types'

const PLAY_ICON = '▶︎'

type Props = {
  subject: table_Subject
  questionCount: number
  onPress: () => void
}

export default function SubjectRow(props: Props) {
  const { subject, questionCount, onPress } = props

  const countText = questionCount === 1 ? '1 question' : `${questionCount} questions`

  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.icon}>{PLAY_ICON}</Text>
      <View style={styles.textBlock}>
        <Text style={styles.name}>{subject.sb_title}</Text>
        <Text style={styles.status}>{countText}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 12,
    backgroundColor: QUIZ_COLOR
  },
  icon: { color: '#ffffff', fontSize: 22, width: 24, textAlign: 'center' },
  textBlock: { flex: 1, gap: 4 },
  name: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  status: { color: '#ffffff', fontSize: 13 }
})
