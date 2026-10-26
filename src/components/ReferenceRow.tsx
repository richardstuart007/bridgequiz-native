//==============================================================================================
//  1) DESCRIPTION
//    ReferenceRow — one quiz in the quiz list (one per video): a QUIZ_COLOR row with a ▶ icon,
//    the video name and how many questions its quiz has. Tapping it starts the quiz.
//
//    Parameters:
//      reference     — the video; rf_desc is shown as the name
//      questionCount — questions in its quiz (already capped at QUIZ_MAXQUESTIONS)
//      onPress       — tap on the row
//
//  2) NOTES
//    Same row shape as bridgeschool-native's VideoRow; the icon is followed by U+FE0E (text
//    presentation) so phones draw a plain symbol rather than a colour emoji.
//
//  3) CHANGE HISTORY
//    2026-10-25 — was SubjectRow (subject + sb_title); now one row per video (rf_desc), so
//                 Lebensohl's 5 parts are separate quizzes
//==============================================================================================

import { Pressable, StyleSheet, Text, View } from 'react-native'

import { QUIZ_COLOR } from '@/constants'
import type { table_Reference } from '@/types'

const PLAY_ICON = '▶︎'

type Props = {
  reference: table_Reference
  questionCount: number
  onPress: () => void
}

export default function ReferenceRow(props: Props) {
  const { reference, questionCount, onPress } = props

  const countText = questionCount === 1 ? '1 question' : `${questionCount} questions`

  return (
    <Pressable onPress={onPress} style={styles.row}>
      <Text style={styles.icon}>{PLAY_ICON}</Text>
      <View style={styles.textBlock}>
        <Text style={styles.name}>{reference.rf_desc}</Text>
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
