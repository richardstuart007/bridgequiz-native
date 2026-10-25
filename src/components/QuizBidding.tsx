//==============================================================================================
//  1) DESCRIPTION
//    QuizBidding — the bidding table for a question: a North / East / South / West header and
//    one row per round of qq_rounds, each bid drawn as text plus a SuitSymbol. Draws nothing
//    when the question has no bidding.
//
//    Parameters:
//      question — the question being shown
//
//  2) NOTES
//    Bid codes are read as the web does (next-bridgeschool quiz-question/bidding.tsx):
//      'P...'      (P, PASS) — Pass
//      'X', '?'    — shown as is
//      ' ', 'n'/'N', null — blank cell
//      '1NT', '2NT' — shown as is (no suit symbol)
//      otherwise   — level (first character) + suit symbol (second character)
//    Agreed difference from the web: 'XX' (redouble) is shown as XX; the web keeps only the
//    first character and shows X.
//==============================================================================================

import { StyleSheet, Text, View } from 'react-native'

import SuitSymbol from '@/components/SuitSymbol'
import type { table_Questions } from '@/types'

const SEATS = ['North', 'East', 'South', 'West']

type ParsedBid = {
  key: string
  bid: string | null
  suit: string | null
}

type Props = {
  question: table_Questions
}

export default function QuizBidding(props: Props) {
  const { question } = props

  const rounds = (question.qq_rounds ?? []).map((round, roundIndex) => ({
    key: String(roundIndex),
    bids: round.map((bidsuit, seatIndex) => parseBid(bidsuit, `${roundIndex}-${seatIndex}`))
  }))
  const showBidding = rounds.length > 0

  return (
    showBidding && (
      <View style={styles.panel}>
        <View style={styles.row}>
          {SEATS.map(seat => (
            <Text key={seat} style={[styles.cell, styles.heading]}>
              {seat}
            </Text>
          ))}
        </View>
        {rounds.map(round => (
          <View key={round.key} style={styles.row}>
            {round.bids.map(parsed => (
              <View key={parsed.key} style={styles.cell}>
                <Text style={styles.bid}>{parsed.bid}</Text>
                {parsed.suit && <SuitSymbol suit={parsed.suit} />}
              </View>
            ))}
          </View>
        ))}
      </View>
    )
  )
}

//----------------------------------------------------------------------------------------------
//  parseBid — splits one bid code into the text and the suit to draw (see NOTES)
//  Params:  bidsuit — the bid code from qq_rounds, e.g. '1H', 'PASS', 'XX', '2NT', 'N', null
//           key     — React key for the cell
//  Returns: { key, bid, suit } — bid null for a blank cell, suit null when no symbol is drawn
//----------------------------------------------------------------------------------------------
function parseBid(bidsuit: string | null, key: string): ParsedBid {
  const parsed: ParsedBid = { key, bid: null, suit: null }
  if (typeof bidsuit !== 'string') return parsed
  const first = bidsuit.substring(0, 1)
  const second = bidsuit.substring(1, 2)
  if (first === 'P') parsed.bid = 'Pass'
  else if (bidsuit === 'XX') parsed.bid = 'XX'
  else if (first === 'X' || first === '?') parsed.bid = first
  else if (first === ' ' || first === 'n' || first === 'N') parsed.bid = null
  else if (second === 'N') parsed.bid = bidsuit
  else {
    parsed.bid = first
    parsed.suit = second
  }
  return parsed
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#86efac',
    backgroundColor: '#f0fdf4',
    paddingVertical: 6
  },
  row: { flexDirection: 'row' },
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    textAlign: 'center'
  },
  heading: { fontSize: 14, fontWeight: '700' },
  bid: { fontSize: 15 }
})
