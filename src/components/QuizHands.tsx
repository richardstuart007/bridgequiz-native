//==============================================================================================
//  1) DESCRIPTION
//    QuizHands — the question's hands as a table: a ♠ ♥ ♦ ♣ header and one row per seat
//    (North / East / South / West) that has a hand. Draws nothing when no seat has one.
//
//    Parameters:
//      question — the question being shown
//
//  2) NOTES
//    As the web (next-bridgeschool quiz-question/hands.tsx): a hand is four suit strings in
//    S, H, D, C order; a suit of 'n'/'N' is shown blank, and a hand that is missing or entirely
//    'n'/'N' is left out.
//==============================================================================================

import { StyleSheet, Text, View } from 'react-native'

import SuitSymbol from '@/components/SuitSymbol'
import type { table_Questions } from '@/types'

const SUITS = ['S', 'H', 'D', 'C']

type Props = {
  question: table_Questions
}

export default function QuizHands(props: Props) {
  const { question } = props

  const hands = [
    { seat: 'North', hand: question.qq_north },
    { seat: 'East', hand: question.qq_east },
    { seat: 'South', hand: question.qq_south },
    { seat: 'West', hand: question.qq_west }
  ]
    .filter(seatHand => !isEmptyHand(seatHand.hand))
    .map(seatHand => ({
      seat: seatHand.seat,
      cards: (seatHand.hand ?? []).map((cards, index) => ({
        key: String(index),
        text: cards === 'n' || cards === 'N' ? '' : cards
      }))
    }))
  const showHands = hands.length > 0

  return (
    showHands && (
      <View style={styles.panel}>
        <View style={styles.row}>
          <Text style={styles.seat} />
          {SUITS.map(suit => (
            <View key={suit} style={styles.cell}>
              <SuitSymbol suit={suit} />
            </View>
          ))}
        </View>
        {hands.map(hand => (
          <View key={hand.seat} style={styles.row}>
            <Text style={styles.seat}>{hand.seat}</Text>
            {hand.cards.map(card => (
              <View key={card.key} style={styles.cell}>
                <Text style={styles.cards}>{card.text}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  )
}

//----------------------------------------------------------------------------------------------
//  isEmptyHand — whether a seat has no hand to show
//  Params:  hand — the seat's four suit strings, or null
//  Returns: true when missing, empty, or every suit is 'n'/'N'
//----------------------------------------------------------------------------------------------
function isEmptyHand(hand: string[] | null): boolean {
  const empty = !hand || hand.length === 0 || hand.every(cards => cards === 'n' || cards === 'N')
  return empty
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#86efac',
    backgroundColor: '#f0fdf4',
    paddingVertical: 6
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  seat: { width: 56, paddingLeft: 8, fontSize: 14, fontWeight: '700' },
  cell: { flex: 1, alignItems: 'center', paddingVertical: 3 },
  cards: { fontSize: 15 }
})
